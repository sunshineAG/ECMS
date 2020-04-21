/**
 * Created by Administrator on 2017/4/6.
 * 基于websocket的消息处理方法
 */
var ProtoBuf=require("protobufjs");

const logger=console;

var jsonDescriptor = require("./protobuf.json"); // exemplary for node

var root = ProtoBuf.Root.fromJSON(jsonDescriptor);

var getProtoBufType=cmd=>{ //获取子级的对应指令的pb格式对象
    //let root= await ProtoBuf.load("/static/probuf.proto")
    if(!cmd){
        return root.lookupType("protocol.Cmd");
    }
    return root.lookupType("protocol.CmdData"+cmd);
}
var getProtoBufMsg=type=>{ //获取子级的对应指令的pb格式对象
    return root.lookupType("protocol."+type);
}
import store from '@/store/store'
import erroeCollect from '@/common/errorCollect'
import WebSqlClass from '@/websocket/webSql'
// 数据库操作

let db = new WebSqlClass({
    dbName: 'ecmsDb',
    tableName: 'task' //golang指令表
});
function connectDb() {
    db.connectDataBase().then((result)=>{
        console.log(result);
    // 创建表(如果不存在的话,则创建,存在的话, 不会创建,但是还是会执行回调)
    // status状态为0位刚插入的，为1是发送过的，为2是接收到go的回应的
        let sql =
            `create table if not exists ${db.tableName}(
                pageId varchar(25),
                msgContent varchar(1000),
                status varchar(10),
                send_time timestamp,
                created timestamp,
                updated timestamp
            );`;
        return db.executeSql(sql,[],"create");
    }).then((result)=>{
            console.log(result);
    }).catch((err)=>{
            console.error(err);
    });
}
connectDb()


export default {
    // msgBackFunList:{}, //组存回调的对象
    fromClientId: "ecmsPage",
    ws:null
    ,initCallback:null//初始化后的回调方法
    ,heartbeatInt:0
    ,timeout:null //心跳记时器
    ,option:null
    ,token:''
    ,reConnectSocket:0  //重连次数

    ,initFun:function(option){ //初始化法
        if(this.ws!=null){
            this.ws.close()
            this.ws.onclose=null;
            this.ws.onerror=null;
            this.ws=null;
            delete this.ws
        }
        var that=this
        this.option=option
        this.initCallback=option.callback||function(){}
        this.wsAdd=option.wsAdd||'ws://192.168.0.228:6788/robotApi'
        this.handleClose=false; //手动关闭连接时不进行重连
        this.fromClientId= option.fromClientId||"ecmsPage"
        this.heartbeatInt=0;
        this.token = option.token
        this.ws = new WebSocket(this.wsAdd,[encodeURIComponent(this.token)]);
        this.ws.binaryType = 'arraybuffer'
        this.timeoutset = setTimeout(_=>{
            logger.info('ReWebSocket', '连接超时！！！');
            this.onClose();
        },20000);
        // this.ws.nowTime = new Date().getTime()
        this.ws.onopen=e=>{this.onOpen(e)}
        this.ws.onclose=e=>{this.onClose(e)};
        this.ws.onmessage=function(e){
            that.onMessage(e)
        };
        /*收到的消息处理代码段*/
        this.ws.onerror=e=>{this.onError(e)};
        if(this.reConnectSocket>3) {
            store.commit('user/setSocketStatus','0')
        }
        this.reConnectSocket++
    }
    ,onOpen(evt){
        //已经建立连接
        this.timeout&&clearTimeout(this.timeout);
        this.timeoutset&&clearTimeout(this.timeoutset);
        this.handleClose=false;
        if(evt.returnValue){
            logger.info('已经建立连接')
            this.reConnectSocket = 0
            store.commit('user/setSocketStatus','1')
          /*  this.sendMsgFun({
                cmd:1,
                fromClientId:this.fromClientId,
                cmdData:{
                    username:this.fromClientId,
                    nickname:"API测试",
                    channel:2,
                    mobileSerial:'API测试编号'
                }
            })*/
            // this.heartbeat() //开始心跳
        }
    }
    ,async onMessage(e){
        // this.heartbeatInt=0
       /* var message = await Chatmsg.then(chatmsg=>{
            return chatmsg.decode(new Uint8Array(e.data))
        });*/
        let protobufCmd=await getProtoBufType()
        var message=protobufCmd.decode(new Uint8Array(e.data))

        if(!!message.cmdData&&message.cmdData.length>0){
            let cmdDataType=await getProtoBufType(message.cmd)
            let cmdDataObj=cmdDataType.decode(message.cmdData)
            let cmdData = cmdDataObj.toJSON()
            message=message.toJSON();
            message["cmdData"]=cmdData;
            if(message.cmd==1500) {
                let msgType
                let text = ''
                switch (message.cmdData.contentType) {
                    case 0:
                    case 2:
                        text ='WeworkTextMsg'
                        break
                    case 7:
                    case 14:
                    case 101:
                        text ='WeworkImageMsg'
                        break
                    default:
                        text ='WeworkTextMsg'
                        break
                }
                msgType = await getProtoBufMsg(text)
                let msgData=msgType.decode(cmdDataObj.msg).toJSON()
                message["cmdData"]["msg"]=msgData;
            }
        }
        if(message.cmd==9999&&message.pageId) {
            // 先改状态，之后一起删掉这些数据

            // db.executeSql(
            //     `update ${db.tableName} set status = ? where pageId = ?`,
            //     ['2', message.pageId],
            //     'update'
            // ).then((res)=>{
            //     // console.log("收到cmd9999修改状态为2成功")
            // }).catch((err)=>{
            //     logger.error('收到cmd9999修改状态为2报错:'+err)
            // });
            // 直接删掉这条数据,不做定时
            db.executeSql(
                `delete from ${db.tableName} where pageId = ?`,
                [message.pageId],
                'delete'
            ).then((res)=>{

            }).catch((err)=>{
                logger.error('收到cmd9999删除失败:'+err)
            });
        }
        logger.info(JSON.stringify(message))
        if(message&&message.cmd){
            setTimeout(_=>{
                this['cmd'+message.cmd]&&this['cmd'+message.cmd](message)
            },0)
        }
        // if(message.localId&&message.status==1){ //只有当前发出的的信息才有localId 服务端推送的不用回调处理，按消息处理
        //     var callbakcFun=this.msgBackFunList[message.localId]&&this.msgBackFunList[message.localId]['callback']
        //     callbakcFun&&callbakcFun(message) //执行回调函数
        //     this.msgBackFunList[message.localId]=null;
        //     delete this.msgBackFunList[message.localId];
        // }
    }
    ,onClose(e){
        logger.info('触发onClose',this.handleClose)
        !!e&&erroeCollect.errSocket(e)
        this.heartbeatInt=0
        clearTimeout(this.timeout);
        if(!this.handleClose){
            this.timeout=setTimeout(_=>{
                clearTimeout(this.timeout);
                this.initFun(this.option);
            }, 5000);
        }else{
            this.handleClose=false;
        }
    }
    ,sendMsgFun:async function(msg,callback){
        //发送消息的公用方法
        //type为消息的类型
        if(!msg.cmd) return false;
        msg.pageId = msg.pageId||(new Date().getTime().toString()+Math.floor(Math.random()*9000+1000))
        msg.cmd!=1&&logger.info('sendMsgFun:',JSON.stringify(msg))
        let msgObj = JSON.parse(JSON.stringify(msg))
        if(msg.cmdData!=null){
            let cmdDataType=await getProtoBufType(msg.cmd)
            msg.cmdData=cmdDataType.encode(cmdDataType.create(msg.cmdData)).finish()
        }
        let protobufCmd= await getProtoBufType()
        var buffer1=protobufCmd.encode(protobufCmd.create(msg)).finish()
        //缓存回调函数
        // this.msgBackFunList[msg.localId]={}
        // this.msgBackFunList[msg.localId]['msg']=msg;
        // this.msgBackFunList[msg.localId]['callback']=callback||function(msg){};
        switch (msg.cmd) {
            case 2:
            case 3002:
                if(this.ws.readyState==1){
                    try {
                        this.ws.send(buffer1)
                        logger.info('发送成功')
                    }catch(e) {
                        this.onError();
                        logger.info('发送消息失败 catch',e.message)
                    }
                }else{
                    try{
                        if(msg.cmd!=2&&msg.cmd!=3002) {
                            this.onError();
                        }
                    }catch(e){
                        logger.info('执行onError catch:'+e.message)
                    }
                }
                break;
            default:
                /*将数据插入到数据库中，给与相应权重，status为0*/
                this.addTask(msgObj);
                break
        }


        // if(this.ws.readyState==1){
        //     try {
        //         this.ws.send(buffer1)
        //         logger.info('发送成功')
        //     }catch(e) {
        //         logger.info('发送消息失败 catch',e.message)
        //     }
        // }else{
        //     try{
        //         if(msg.cmd!=2&&msg.cmd!=3002) {
        //             this.onError();
        //         }
        //     }catch(e){
        //         logger.info('执行onError catch:'+e.message)
        //     }
        // }
    }
    ,onError:function(e){
        try{
            logger.info('触发onError:',e)
            this.onClose(e);
        }catch(e){
            logger.error('执行onClose catch:'+e.message)
        }
    }
    ,close:function(){
        if(this.ws){
            this.handleClose=true;//手动关闭
            logger.info('触发close:',this.handleClose)
            this.timeout&&clearTimeout(this.timeout);
            this.timeoutset&&clearTimeout(this.timeoutset);
            this.ws.close();
        }
    },
     //心跳
    heartbeat() {
        if(this.heartbeatInt>20&&!this.handleClose){
            this.sendMsgFun({
                cmd: 2,
                fromClientId: this.fromClientId,
            });
            this.heartbeatInt=0
        }else{
            this.heartbeatInt++
        }
        this.timeout=setTimeout(_=>{
            clearTimeout(this.timeout)
            this.heartbeat()
        },1000)
    },
    // 数据库操作
    async addTask(msg) {
        let _this =this;
        let msgContent = JSON.stringify(msg)
        // let nowTime =new Date().getTime().toString();
        let nowTime = new Date(+new Date() +8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
        if(db.db.version=='') {
            // 说明db不存在了
            console.log('db消失，进行重建')
            await connectDb()
            this.msgCmdGet()
            this.msgStatusChange()
        }
        db.executeSql(
            `insert into ${db.tableName} (pageId, msgContent,status ,send_time,created, updated) values(?, ?, ?, ?, ?, ?)`,
            [msg["pageId"], msgContent, '0',nowTime ,nowTime,nowTime],
            "insert"
        ).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log('插入task表指令报错:'+err);
        })
    },
    //修改20s未收到回应消息的状态
    msgStatusChange:function () {
        let _this=this;
        //发送消息的方法
        let setTime3=setTimeout(()=>{
            // 重新发送消息
            let nowTime2 = new Date(+new Date() +8*3600*1000 - 20000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
            let nowTime = new Date(+new Date() +8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
            db.executeSql(
                `update ${db.tableName} set status = ?,updated = ? where status = ? and send_time between ? and ? `,
                ['0', nowTime, '1','0000-00-00 00:00:00',nowTime2],
                'update'
            ).then((res)=>{
                // console.log(res);
                clearTimeout(setTime3);
                _this.msgStatusChange()
            }).catch((err)=>{
                logger.error('修改20s未收到回应消息的状态:'+err)
                clearTimeout(setTime3);
                _this.msgStatusChange()
            });
        },20000)
    },
    delDbData:function () {
        let _this=this;
        //删除数据库数据
        let setTime1=setTimeout(_=>{
            db.executeSql(
                `delete from ${db.tableName} where status = ?`,
                ['2'],
                'delete'
            ).then((res)=>{
                clearTimeout(setTime1);
                _this.delDbData()
            }).catch((err)=>{
                logger.error('删除数据库数据出错:'+err)
                clearTimeout(setTime1);
                _this.delDbData()
            });
        },60000)
    },
    msgCmdGet:function () {
        let _this=this;
        //200ms发送数据库数据
        let setTime2=setTimeout(()=>{
            db.executeSql(
                `select * from ${db.tableName} where (status = ?) limit 0,1`,
                ['0'],
                'select'
            ).then((res)=>{
                if(res.rows.length!=0) {
                    _this.msgCmdSend(res.rows[0])
                }
                clearTimeout(setTime2);
                _this.msgCmdGet()
            }).catch((err)=>{
                console.log('发送数据库消息失败:'+err)
                clearTimeout(setTime2);
                _this.msgCmdGet()
            });
        },200)
    },
    async msgCmdSend(res) {
        // let nowTime = new Date().getTime().toString();
        let nowTime = new Date(+new Date() +8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
        db.executeSql(
            `update ${db.tableName} set status = ?,updated = ?,send_time = ? where pageId = ?`,
            ['1', nowTime, nowTime, res.pageId],
            "update"
        ).then((res)=>{

        }).catch((e)=>{
            logger.error('发送消息之前修改状态为1报错:',e.message)
        });

        let msg = JSON.parse(res.msgContent)
        if(msg.cmdData!=null){
            let cmdDataType=await getProtoBufType(msg.cmd)
            msg.cmdData=cmdDataType.encode(cmdDataType.create(msg.cmdData)).finish()
        }
        let protobufCmd= await getProtoBufType()
        let buffer2=protobufCmd.encode(protobufCmd.create(msg)).finish()
        if(this.ws.readyState==1){
            try {
                this.ws.send(buffer2)
                logger.info('DB指令发送成功',res.msgContent)
            }catch(e) {
                this.onError();
                logger.info('DB指令发送成功 catch',e.message)
            }
        }else{
            try{
                this.onError();
            }catch(e){
                logger.info('DB指令发送执行onError111 catch:'+e.message)
            }
        }
    }
}





