<template>
    <a-locale-provider :locale="zh_CN">
    <global-layout>
        <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
        <a-tabs
            @contextmenu.native="e => onContextmenu(e)"
            v-if  ="multipage"
            :active-key="activePage"
            style="margin-top: -8px; margin-bottom: 8px"
            :hide-add="true"
            type="editable-card"
            @change="changePage"
            @edit="editPage">
            <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList">
                  <span slot="tab" :pagekey="page.fullPath">{{page.name}}</span>
            </a-tab-pane>
        </a-tabs>
        <transition name="page-toggle">
            <keep-alive v-if="multipage">
                  <router-view />
            </keep-alive>
            <router-view v-else />
        </transition>
        <span style="display: none">
            <audio src="static/img_file/notice.wav" controlsList="nodownload" oncontextmenu="return false" ref="noticeAudio">
                您的浏览器不支持 audio 标签 。
            </audio>
        </span>
    </global-layout>
    </a-locale-provider>
</template>

<script>
import GlobalLayout from './GlobalLayout'
import Contextmenu from '../components/menu/Contextmenu'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
var storage = require('../common/store')
var comConf=require('../common/comConfig')
var emoji = require('../common/emojiMap');
export default {
    name: 'MenuView',
    components: {Contextmenu, GlobalLayout},
    data () {
        return {
            pageList: [],
            linkList: [],
            activePage: '',
            menuVisible: false,
            menuItemList: [
                { key: '1', icon: 'arrow-left', text: '关闭左侧' },
                { key: '2', icon: 'arrow-right', text: '关闭右侧' },
                { key: '3', icon: 'close', text: '关闭其它' }
            ],
            zh_CN,
            isStopTime:true
        }
    },
    computed: {
        multipage () {
              return this.$store.state.setting.multipage
        }
    },
    created () {
        this.pageList.push(this.$route)
        this.linkList.push(this.$route.fullPath)
        this.activePage = this.$route.fullPath
        this.getSocketAddress()
    },
    destroyed: function() {
        //页面销毁时关闭长连接
        this.isStopTime = false
        this.$ws.close()
    },
    watch: {
        '$route': function (newRoute, oldRoute) {
            this.activePage = newRoute.fullPath
            if (!this.multipage) {
                this.linkList = [newRoute.fullPath]
                this.pageList = [newRoute]
            } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
                this.linkList.push(newRoute.fullPath)
                this.pageList.push(newRoute)
            }
        },
        'activePage': function (key) {
            this.$router.push(key)
        },
        'multipage': function (newVal, oldVal) {
            if (!newVal) {
                this.linkList = [this.$route.fullPath]
                this.pageList = [this.$route]
            }
        }
    },
    methods: {
        changePage (key) {
            this.activePage = key
        },
        editPage (key, action) {
            this[action](key)
        },
        remove (key) {
            if (this.pageList.length === 1) {
                this.$message.warning('这是最后一页，不能再关闭了啦')
                return
            }
            this.pageList = this.pageList.filter(item => item.fullPath !== key)
            let index = this.linkList.indexOf(key)
            this.linkList = this.linkList.filter(item => item !== key)
            index = index >= this.linkList.length ? this.linkList.length - 1 : index
            this.activePage = this.linkList[index]
        },
        onContextmenu (e) {
            const pagekey = this.getPageKey(e.target)
            if (pagekey !== null) {
                e.preventDefault()
                this.menuVisible = true
            }
        },
        /**
         * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
         * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
         * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
         * @param target 查询开始目标
         * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
         * @returns {String}
         */
        getPageKey (target, depth) {
            depth = depth || 0
            if (depth > 2) {
                return null
            }
            let pageKey = target.getAttribute('pagekey')
            pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null)
            return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
        },
        onMenuSelect (key, target) {
            let pageKey = this.getPageKey(target)
            switch (key) {
                case '1':
                    this.closeLeft(pageKey)
                    break
                case '2':
                    this.closeRight(pageKey)
                    break
                case '3':
                    this.closeOthers(pageKey)
                    break
                default:
                    break
            }
        },
        closeOthers (pageKey) {
            let index = this.linkList.indexOf(pageKey)
            this.linkList = this.linkList.slice(index, index + 1)
            this.pageList = this.pageList.slice(index, index + 1)
            this.activePage = this.linkList[0]
        },
        closeLeft (pageKey) {
            let index = this.linkList.indexOf(pageKey)
            this.linkList = this.linkList.slice(index)
            this.pageList = this.pageList.slice(index)
            if (this.linkList.indexOf(this.activePage) < 0) {
                  this.activePage = this.linkList[0]
            }
        },
        closeRight (pageKey) {
            let index = this.linkList.indexOf(pageKey)
            this.linkList = this.linkList.slice(0, index + 1)
            this.pageList = this.pageList.slice(0, index + 1)
            if (this.linkList.indexOf(this.activePage < 0)) {
                this.activePage = this.linkList[this.linkList.length - 1]
            }
        },
        audioPlay () {
            if(this.$store.state.user.user.new_msg_audio_status=='0'||!this.$store.state.user.user.new_msg_audio_status) {
                return
            }
            if(this.$refs['noticeAudio'].paused) {
                this.$refs['noticeAudio'].play()
            }
        },
        getSocketAddress() {
//            获取当前公司socket地址
            this.$axios({
                method: 'get',
                url: '/index.php?r=uc/user/company-info'
            }).then(res=> {
                let udata = res.data
                if (udata.status == 1) {
                    this.$store.commit('user/setCompany', udata.data)
                    storage.store.set('companyInfo',udata.data)
                    this.$ws.initFun({
                        wsAdd:'ws://' + this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port + '/ecms',
//                        wsAdd:'ws://192.168.0.138:6786/ecms',//本地,邵琪
                        fromClientId:this.$store.state.user.user.user_id,
                        token:storage.store.get('goToken')
                    })
                    this.sendGetRobotstatus()
                    this.$ws.msgStatusChange()
//                    this.$ws.delDbData()
                    this.$ws.msgCmdGet()
                }
            })
            this.responseWs()
        },
        sendGetRobotstatus(){
            if(this.isStopTime) {
                let tineout=setTimeout(()=>{
                    if(this.isStopTime) {
                        let data3002 = {
                            cmd:3002,
                            fromClientId:this.$store.state.user.user.user_id
                        }
                        this.$ws.sendMsgFun(data3002)
                        clearTimeout(tineout);
                        this.sendGetRobotstatus()
                    }
                },20000)
            }else {
                return
            }
        },
        responseWs() {
            let _this = this
            this.$ws.cmd1001 = function (msg) {
                if(msg.status==2) {
                    _this.$store.commit('user/addMenuBadge', {name:msg.callbackMsg,badge:1})
                }
            }
            this.$ws.cmd1002 = function (msg) {
                _this.$store.commit('user/addMenuBadge', {name:'新的客户',badge:1})
            }
            this.$ws.cmd1501 = function (msg) {
                _this.$store.commit('user/addMenuBadge', {name:'新的客户 ',badge:1})
            }
            this.$ws.cmd1000 = function (msg) {
//                根据当前router确定不同行为
//                如果在实时聊天界面，需要插入数据
                console.log('1000',msg)
                if(_this.$router.currentRoute.path=='/liveChat') {
                    if(msg.status==2) {
                        let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
//                        let datekey = timestamp.getFullYear()+ '-' + (timestamp.getMonth()+1)+ '-' + timestamp.getDate() //go的时间戳转换
                        let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        let datekey = datetime.slice(0,10)
                                     //     msg.callbackMsg   0是页面  1手机
                        if(_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.talker&&_this.$store.state.liveChat.selectContact.robot_username==msg.fromClientId&&msg.callbackMsg!='0') {
                            if(msg.cmdData.isNewMsg=='1') {
                                let content = ''
                                let type = '1'
                                let newMsg = {
                                    key:datekey,
                                    data:[{
                                        id:_this.$store.state.liveChat.selectContact.id,
                                        avatar_url:_this.$store.state.liveChat.selectContact.avatar_url,
                                        nickname:_this.$store.state.liveChat.selectContact.nickname,
                                        created:datetime,//从go获取
                                        content:msg.cmdData.type==1?(emoji.stringToHtml(msg.cmdData.content)):'',
                                        type:msg.cmdData.type,
                                        send_by:'0',
                                        friend_user_name: _this.$store.state.liveChat.selectContact.friend_user_name,
                                        robot_avatar_url: _this.$store.state.liveChat.selectContact.robot_avatar_url,
                                        msgSvrId:msg.cmdData.msgSvrId,
                                        toUsername:msg.cmdData.talker,
                                        msgId:msg.cmdData.msgId
                                    }]
                                }
                                if(msg.cmdData.talker.search(/@chatroom/)!=(-1) ||msg.cmdData.talker.search(/@im.chatroom/)!=(-1)) {
                                    newMsg.data[0].avatar_url = msg.cmdData.avatarUrl
                                    newMsg.data[0].nickname = msg.cmdData.nickName
                                    newMsg.data[0].toUsername = msg.cmdData.roomFromUsername
                                    newMsg.data[0].usernmae = msg.fromClientId
                                }
                                switch (msg.cmdData.type) {
                                    case '1':
                                        content = emoji.stringToHtml(msg.cmdData.content)
                                        break
                                    case '3':
                                        type = '3'
                                        content = '[图片]'
                                        newMsg.data[0].msgId = msg.cmdData.msgId
                                        newMsg.data[0].imgId = msg.cmdData.imgId
                                        newMsg.data[0].iconurl = msg.cmdData.smallImg || ''
                                        newMsg.data[0].bigImg = ''
                                        newMsg.data[0].complete = true
                                        newMsg.data[0].completes = false
                                        break
                                    case '5':
                                        newMsg.data[0].title = msg.cmdData.title
                                        newMsg.data[0].mediapath = msg.cmdData.bigImg
                                        newMsg.data[0].desc = msg.cmdData.descript
                                        newMsg.data[0].url = msg.cmdData.url
                                        newMsg.data[0].mediapath = "https://roomfission.youdd.wang/default_link_img.png"
//                                        newMsg.data[0].complete = true
//                                        newMsg.data[0].completes = false
                                        content = '[链接]'
                                        type = '5'
                                        break
                                    case '6':
                                        newMsg.data[0].title = msg.cmdData.title
                                        newMsg.data[0].desc = msg.cmdData.descript
                                        newMsg.data[0].mediapath =''
                                        content = '[文件]'
                                        type = '6'
                                        break
                                    case '33':
                                        newMsg.data[0].iconurl = msg.cmdData.smallImg
                                        newMsg.data[0].alias = msg.cmdData.sourceDisplayName
                                        newMsg.data[0].title = msg.cmdData.title
                                        newMsg.data[0].desc = msg.cmdData.descript
                                        newMsg.data[0].mediapath = msg.cmdData.bigImg
                                        newMsg.data[0].appid = msg.cmdData.appid
                                        newMsg.data[0].url = msg.cmdData.url
                                        newMsg.data[0].orginid = msg.cmdData.sourceUsername
                                        newMsg.data[0].complete = true
                                        newMsg.data[0].completes = false
                                        content = '[小程序]'
                                        type = '33'
                                        break
                                    case '34':
                                        content = '[语音]'
                                        newMsg.data[0].mediapath = msg.cmdData.url
                                        newMsg.data[0].audio_time = msg.cmdData.title
                                       //newMsg.data[0].complete = true
                                        type = '34'
                                        break
                                    case '42':
                                        newMsg.data[0].title = msg.cmdData.friendCard.nickname
                                        newMsg.data[0].mediapath = msg.cmdData.friendCard.headImageUrl
                                        newMsg.data[0].appid = msg.cmdData.friendCard.username
                                        newMsg.data[0].certFlag = msg.cmdData.friendCard.certFlag
                                        content = '[名片]'
                                        type = '42'
                                        break
                                    case '43':
                                        newMsg.data[0].iconurl = msg.cmdData.smallImg
                                        newMsg.data[0].mediapath = msg.cmdData.bigImg || ''
                                        newMsg.data[0].complete = true
                                        newMsg.data[0].completes = false
                                        content = '[视频]'
                                        type = '43'
                                        break
                                    case '47':
                                        newMsg.data[0].iconurl = msg.cmdData.content
                                        newMsg.data[0].bigImg = ''
                                        if(!msg.cmdData.bigImg) {
                                            newMsg.data[0].complete = true
                                            newMsg.data[0].completes = false
                                        }
                                        content = '[表情包]'
                                        type = '47'
                                        break
                                    case '48':
                                        newMsg.data[0].id = msg.msgId
                                        newMsg.data[0].title = msg.cmdData.redPacket.receiverTitle
                                        newMsg.data[0].chatRedPacket = {
                                            inner_type:'0',
                                            native_url:msg.cmdData.redPacket.nativeUrl,
                                            chat_type:(msg.cmdData.talker.search(/@chatroom/)!=(-1)||msg.cmdData.talker.search(/@im.chatroom/)!=(-1))?'20':'10'
                                        }
                                        content = '[红包]'
                                        type = '48'
                                        _this.$set(_this.$store.state.liveChat.selectContact,'red_packet',1)
                                        break
                                    case '49':
                                        newMsg.data[0].id = msg.msgId
                                        content = msg.cmdData.transferMoney.feeDesc
                                        type = '49'
                                        newMsg.data[0].content = msg.cmdData.transferMoney.feeDesc
                                        newMsg.data[0].chatTransferMoney = {
                                            pay_sub_type:'1',
                                            transc_ation_id:msg.cmdData.transferMoney.transcAtionId,
                                            transfer_id:msg.cmdData.transferMoney.transferId,
                                            invalid_time:msg.cmdData.transferMoney.invalidTime,
                                            type:'0'
                                        }
                                        _this.$set(_this.$store.state.liveChat.selectContact,'transfer_money',1)
                                        break
                                }
                                _this.$set(_this.$store.state.liveChat.selectContact,'content',content)
                                _this.$set(_this.$store.state.liveChat.selectContact,'type',type)
                                _this.$store.state.liveChat.selectContact.created = datetime.slice(10)
                                _this.$store.commit('liveChat/insertContactList',_this.$store.state.liveChat.selectContact)
                                if(msg.callbackMsg=='1') {
                                    newMsg.data[0].send_by = '1'
                                    if(msg.cmdData.status==5) {
                                        newMsg.data[0].status = 60
                                    }
                                }
                                if(!!msg.cmdData.transferMoney&&msg.cmdData.type=='49') {
                                    let pay_sub_type = '1'
                                    let index_1 = 0
                                    let index_2 = 0
                                    _this.$store.state.liveChat.chatMsgList.forEach((el,index)=>{
                                        el.data.forEach((item,index1)=> {
                                            if(item.type=='49'&&!!item.chatTransferMoney.transfer_id&&(item.chatTransferMoney.transfer_id == msg.cmdData.transferMoney.transferId)) {
                                                pay_sub_type = item.chatTransferMoney.pay_sub_type
                                                index_1 = index
                                                index_2 = index1
                                            }
                                        })
                                    })
                                    if(msg.callbackMsg=='成功') {
                                        if(msg.cmdData.transferMoney.paySubType=='1'||msg.cmdData.transferMoney.paySubType=='7') {
                                            //说明是用户发给机器人的转账消息
                                            newMsg.data[0].send_by = '0'
                                            newMsg.data[0].chatTransferMoney.pay_sub_type = '1'
                                            newMsg.data[0].chatTransferMoney.type = '0'
                                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                        }else if(msg.cmdData.transferMoney.paySubType=='3'||msg.cmdData.transferMoney.paySubType=='5'){
                                            //机器人发出的转账，对方点击领取
                                            newMsg.data[0].send_by = '0'
                                            newMsg.data[0].chatTransferMoney.pay_sub_type = '3'
                                            newMsg.data[0].chatTransferMoney.type = '1'
                                            !!_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney&&(_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney.pay_sub_type = '3')
                                            _this.$forceUpdate()
                                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                        }else if(msg.cmdData.transferMoney.paySubType=='4'){
//                                            机器人发出的转账，对方点击退还
                                            newMsg.data[0].send_by = '0'
                                            newMsg.data[0].chatTransferMoney.pay_sub_type = '4'
                                            newMsg.data[0].chatTransferMoney.type = '1'
                                            !!_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney&&(_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney.pay_sub_type = '4')
                                            _this.$forceUpdate()
                                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                        }
                                    }
                                    if(msg.callbackMsg=='1') {
                                        if(msg.cmdData.transferMoney.paySubType=='1'||msg.cmdData.transferMoney.paySubType=='7') {
                                            //机器人手机发送转账消息
                                            newMsg.data[0].send_by = '1'
                                            newMsg.data[0].chatTransferMoney.pay_sub_type = '1'
                                            newMsg.data[0].chatTransferMoney.type = '1'
                                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                        }else if(msg.cmdData.transferMoney.paySubType=='3'||msg.cmdData.transferMoney.paySubType=='5'){
                                            //机器人接受用户发送的转账消息,现在2055不处理添加消息，在1000中处理,所以手机点击和页面点击都要添加消息
                                            newMsg.data[0].send_by = '1'
                                            newMsg.data[0].chatTransferMoney.pay_sub_type = '3'
                                            newMsg.data[0].chatTransferMoney.type = '0'
                                            !!_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney&&(_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney.pay_sub_type = '3')
                                            _this.$forceUpdate()
                                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                        }else if(msg.cmdData.transferMoney.paySubType=='4') {
//                                            用户发过来转账，机器人点击退款
                                            newMsg.data[0].send_by = '1'
                                            newMsg.data[0].chatTransferMoney.pay_sub_type = '4'
                                            newMsg.data[0].chatTransferMoney.type = '0'
                                            !!_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney&&(_this.$store.state.liveChat.chatMsgList[index_1].data[index_2].chatTransferMoney.pay_sub_type = '4')
                                            _this.$forceUpdate()
                                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                        }
                                    }
                                }else {
                                    _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                }
                                setTimeout(()=>{
                                    document.getElementById('contactList').scrollTop = 0
                                    document.getElementById('chatContent').scrollTop = document.getElementById('chatContent').scrollHeight - document.getElementById('chatContent').offsetHeight
                                },0)
                                _this.audioPlay();
                            }else {
                                _this.$store.state.liveChat.chatMsgList.forEach(el=>{
                                    el.data.forEach(item=> {
                                        if(item.msgSvrId!='0'&&!!item.msgSvrId&&item.msgSvrId ==msg.cmdData.msgSvrId) {
                                             _this.$set(item,'complete',false)
                                            _this.$set(item,'msgSvrId',msg.cmdData.msgSvrId)
                                            if(msg.cmdData.status==5) {
                                                _this.$set(item,'status',60)
                                            }
                                            switch (msg.cmdData.type) {
                                                case '1':
//                                                    文字
                                                    break
                                                case '3':
//                                                    图片
                                                    _this.$set(item,'iconurl',msg.cmdData.smallImg)
                                                    _this.$set(item,'bigImg','')
                                                    break
                                                case '5':
//                                                    链接
                                                    _this.$set(item,'mediapath',msg.cmdData.bigImg)
                                                    break
                                                case '6':
//                                                    文件
                                                    break
                                                case '33':
//                                                    小程序
                                                    _this.$set(item,'iconurl',msg.cmdData.smallImg)
                                                    _this.$set(item,'mediapath',msg.cmdData.bigImg)
                                                    break
                                                case '34':
//                                                    语音
                                                    _this.$set(item,'mediapath',msg.cmdData.url)
                                                    _this.$set(item,'audio_time',msg.cmdData.title)
                                                    break
                                                case '42':
//                                                    名片
                                                    break
                                                case '43':
//                                                    视频
                                                    _this.$set(item,'iconurl',msg.cmdData.smallImg)
                                                    _this.$set(item,'mediapath',msg.cmdData.bigImg||'')
                                                    break
                                                case '47':
//                                                    表情包
                                                    _this.$set(item,'iconurl',msg.cmdData.content)
                                                    _this.$set(item,'bigImg','')
                                                    break
                                                case '48':
//                                                    红包
                                                    break
                                                case '49':
//                                                    转账
                                                    break
                                            }
                                            _this.$forceUpdate()
                                        }
                                    })
                                })
                            }
                        }else if(_this.$store.state.liveChat.selectContact.robot_username==msg.fromClientId&&_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.talker&&msg.callbackMsg=='0') {
//                            界面上发送回来的消息
                            _this.$store.state.liveChat.chatMsgList.forEach(el=>{
                                el.data.forEach(item=> {
                                    if(!!item.pageKey&&(item.pageKey == msg.pageKey)) {
                                        _this.$set(item,'complete',false)
                                        _this.$set(item,'msgSvrId',msg.cmdData.msgSvrId ||'')
                                        _this.$set(item,'msgId',msg.cmdData.msgId || '')
                                        if(msg.cmdData.status==5||((!msg.cmdData.msgId||msg.cmdData.msgId=='0')&&msg.cmdData.isNewMsg==2)) {
                                            _this.$set(item,'status',60)
                                        }
                                        if((!!msg.cmdData.msgId&&msg.cmdData.msgId!='0')&&msg.cmdData.status!=5) {
                                            _this.$set(item,'status',10)
                                        }
                                        _this.$forceUpdate()
                                    }
                                })
                            })
                        }
                        else {
                            let flag =false
                            _this.$store.state.liveChat.contactList.forEach(el=>{
                                if((el.friend_user_name==msg.cmdData.talker&&el.robot_username==msg.fromClientId&&msg.cmdData.isNewMsg=='1')) {
                                    flag = true
                                    let content = ''
                                    let type = '1'
                                    switch (msg.cmdData.type) {
                                        case '1':
                                            content = emoji.stringToHtml(msg.cmdData.content)
                                            break
                                        case '3':
                                            type = '3'
                                            content = '[图片]'
                                            break
                                        case '5':
                                            content = '[链接]'
                                            type = '5'
                                            break
                                        case '6':
                                            content = '[文件]'
                                            type = '6'
                                            break
                                        case '33':
                                            content = '[小程序]'
                                            type = '33'
                                            break
                                        case '34':
                                            content = '[语音]'
                                            type = '34'
                                            break
                                        case '42':
                                            content = '[名片]'
                                            type = '42'
                                            break
                                        case '43':
                                            content = '[视频]'
                                            type = '43'
                                            break
                                        case '47':
                                            content = '[表情包]'
                                            type = '47'
                                            break
                                        case '48':
                                            content = '[红包]'
                                            type = '48'
//                                            _this.$set(el,'red_packet',1)
                                            el.red_packet = 1
                                            break
                                        case '49':
                                            content = msg.cmdData.transferMoney.feeDesc
                                            type = '49'
//                                            _this.$set(el,'transfer_money',1)
                                            el.transfer_money = 1
                                            break
                                    }
                                    el.content = content
                                    el.type = type
                                    el.created = datetime.slice(10)
                                    if(msg.callbackMsg=='0'||msg.callbackMsg=='1') {

                                    } else {
                                        if(el.no_hint=='0') {
                                            el.num = parseInt(el.num) + 1
                                            _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                                            _this.$store.commit('liveChat/addWxListNum',{username:el.robot_username,badge:1})
                                            _this.$store.commit('liveChat/addLiveChatManage',{user_id:_this.$store.state.liveChat.selectUser.id,badge:1})
                                            _this.audioPlay();
                                        }
                                        _this.$store.commit('liveChat/insertContactList',el)
                                    }
                                }
                            })
                            if(!flag) {
                                //利用接口去请求联系人信息
                                if(msg.fromClientId == _this.$store.state.liveChat.selectWx.username&&msg.cmdData.isNewMsg=='1') {
                                    _this.$axios({
                                        method: 'POST',
                                        url: '/index.php?r=uc/communication/talk-now',
                                        data:{username:msg.fromClientId,friend_username:msg.cmdData.talker,department_id:_this.$store.state.user.user.department.id,user_id:_this.$store.state.user.user.user_id}
                                    }).then(res=>{
                                        let udata = res.data
                                        if (udata.status == 1) {
                                            if(!!udata.data) {
                                                if(udata.data.no_hint=='0') {
                                                    _this.$store.commit('liveChat/addWxListNum',{username:udata.data.robot_username,badge:1})
                                                    _this.$store.commit('liveChat/addLiveChatManage',{user_id:udata.data.user_id,badge:1})
                                                    if(udata.data.user_id == _this.$store.state.liveChat.selectUser.id) {
                                                        _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                                                    }
                                                    _this.audioPlay();
                                                }
                                                if(udata.data.user_id!=_this.$store.state.liveChat.selectUser.id) {
                                                    return
                                                }
                                                if(_this.$store.state.liveChat.selectGroup.id!='0'&&udata.data.group_id!=_this.$store.state.liveChat.selectGroup.id) {
                                                    return
                                                }
//                                                前端赋值type和content，避免后端查速度慢
                                                let content = ''
                                                let type = '1'
                                                switch (msg.cmdData.type) {
                                                    case '1':
                                                        content = emoji.stringToHtml(msg.cmdData.content)
                                                        break
                                                    case '3':
                                                        type = '3'
                                                        content = '[图片]'
                                                        break
                                                    case '5':
                                                        content = '[链接]'
                                                        type = '5'
                                                        break
                                                    case '6':
                                                        content = '[文件]'
                                                        type = '6'
                                                        break
                                                    case '33':
                                                        content = '[小程序]'
                                                        type = '33'
                                                        break
                                                    case '34':
                                                        content = '[语音]'
                                                        type = '34'
                                                        break
                                                    case '42':
                                                        content = '[名片]'
                                                        type = '42'
                                                        break
                                                    case '43':
                                                        content = '[视频]'
                                                        type = '43'
                                                        break
                                                    case '47':
                                                        content = '[表情包]'
                                                        type = '47'
                                                        break
                                                    case '48':
                                                        content = '[红包]'
                                                        type = '48'
                                                        udata.data.red_packet = 1
                                                        break
                                                    case '49':
                                                        content = msg.cmdData.transferMoney.feeDesc
                                                        type = '49'
                                                        udata.data.transfer_money = 1
                                                        break
                                                }
                                                udata.data.content = content
                                                udata.data.type = type
                                                udata.data.num = parseInt(udata.data.num) + 1
                                                _this.$store.commit('liveChat/insertContactList',udata.data);
                                            }
                                        }
                                    })
                                }else if(msg.cmdData.isNewMsg=='1'&&msg.callbackMsg=='成功'){
                                    if(msg.cmdData.noHint!='1') {
                                        _this.$store.commit('liveChat/addLiveChatManage',{user_id:msg.cmdData.userId,badge:1})
                                        if(msg.cmdData.userId == _this.$store.state.liveChat.selectUser.id) {
                                            _this.$store.commit('liveChat/addWxListNum',{username:msg.fromClientId,badge:1})
                                            _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                                        }else {
                                            _this.$store.commit('liveChat/addOtherWxListNum',{username:msg.fromClientId,badge:1,user_id:msg.cmdData.userId})
                                        }
                                        _this.audioPlay();
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if(msg.cmdData.isNewMsg=='1'&&msg.cmdData.noHint!='1'&&msg.callbackMsg=='成功') {
                        _this.$store.commit('liveChat/addLiveChatManage',{user_id:msg.cmdData.userId,badge:1})
                        if(msg.cmdData.userId == _this.$store.state.liveChat.selectUser.id) {
                            _this.$store.commit('liveChat/addWxListNum',{username:msg.fromClientId,badge:1})
                            _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                        }else {
                            _this.$store.commit('liveChat/addOtherWxListNum',{username:msg.fromClientId,badge:1,user_id:msg.cmdData.userId})
                        }
                        _this.audioPlay();
                    }
                }
            }
            this.$ws.cmd1500 = function (msg) {
//                根据当前router确定不同行为
//                如果在实时聊天界面，需要插入数据
                console.log('1500',msg)
                if(_this.$router.currentRoute.path=='/liveChat') {
                    if(msg.status==2) {
                        let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                        let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        let datekey = datetime.slice(0,10)
                        if(_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.talker&&_this.$store.state.liveChat.selectContact.robot_username==msg.fromClientId&&msg.callbackMsg!='0') {
                            if(msg.cmdData.isNewMsg=='1') {
                                let content = ''
                                let type = '1'
                                let newMsg = {
                                    key:datekey,
                                    data:[{
                                        id:_this.$store.state.liveChat.selectContact.id,
                                        avatar_url:_this.$store.state.liveChat.selectContact.avatar_url,
                                        nickname:_this.$store.state.liveChat.selectContact.nickname,
                                        created:datetime,//从go获取
                                        content:'',
                                        type:'',
                                        send_by:'0',
                                        friend_user_name: _this.$store.state.liveChat.selectContact.friend_user_name,
                                        robot_avatar_url: _this.$store.state.liveChat.selectContact.robot_avatar_url,
                                        msgSvrId:msg.cmdData.id,
                                        toUsername:msg.cmdData.talker,
                                        msgId:msg.cmdData.msgId
                                    }]
                                }
//                            说明是群
                                if(msg.cmdData.conversationType==1) {
                                    newMsg.data[0].avatar_url = msg.cmdData.avatarUrl
                                    newMsg.data[0].nickname = msg.cmdData.nickName
                                    newMsg.data[0].toUsername = msg.cmdData.sender
                                }
                                switch (msg.cmdData.contentType) {
                                    case 0:
                                    case 2:
                                        newMsg.data[0].type = '1'
                                        newMsg.data[0].content = emoji.stringToHtml(msg.cmdData.msg.content)
                                        content = emoji.stringToHtml(msg.cmdData.msg.content)
                                        break
                                    case 7:
                                    case 14:
                                    case 101:
                                        type = '3'
                                        content = '[图片]'
                                        newMsg.data[0].type = '3'
                                        newMsg.data[0].iconurl = msg.cmdData.msg.url
                                        newMsg.data[0].complete = true
                                        newMsg.data[0].completes = false
                                        break
                                    case 1002:
                                    case 1003:
                                    case 1006:
                                    case 1011:
                                        newMsg.data[0].status = 70
                                        newMsg.data[0].content = emoji.stringToHtml(msg.cmdData.msg.content)
                                        break
                                    default:
                                        newMsg.data[0].type = '1'
                                        newMsg.data[0].content = emoji.stringToHtml(msg.cmdData.msg.content)
                                        content = emoji.stringToHtml(msg.cmdData.msg.content)
                                        break
                                }
                                _this.$set(_this.$store.state.liveChat.selectContact,'content',content)
                                _this.$set(_this.$store.state.liveChat.selectContact,'type',type)
                                _this.$store.state.liveChat.selectContact.created = datetime.slice(10)
                                _this.$store.commit('liveChat/insertContactList',_this.$store.state.liveChat.selectContact)
                                if(msg.callbackMsg=='1') {
                                    newMsg.data[0].send_by = '1'
                                    if(msg.cmdData.status==5) {
                                        newMsg.data[0].status = 60
                                    }
                                }
                                _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                                setTimeout(()=>{
                                    document.getElementById('contactList').scrollTop = 0
                                    document.getElementById('chatContent').scrollTop = document.getElementById('chatContent').scrollHeight - document.getElementById('chatContent').offsetHeight
                                },0)
                                _this.audioPlay();
                            }else {
                                _this.$store.state.liveChat.chatMsgList.forEach(el=>{
                                    el.data.forEach(item=> {
                                        if(item.msgSvrId!='0'&&!!item.msgSvrId&&item.msgSvrId ==msg.cmdData.id) {
                                            _this.$set(item,'complete',false)
                                            _this.$set(item,'msgSvrId',msg.cmdData.id)
//                                            if(msg.cmdData.status==5) {
//                                                _this.$set(item,'status',60)
//                                            }
                                            switch (msg.cmdData.contentType) {
                                                case 0:
                                                case 2:
                                                    break
                                                case 7:
                                                case 14:
                                                case 101:
                                                    _this.$set(item,'iconurl',msg.cmdData.msg.url)
                                                    break
                                                case 1002:
                                                case 1003:
                                                case 1006:
                                                case 1011:
                                                    break
                                            }
                                            _this.$forceUpdate()
                                        }
                                    })
                                })
                            }
                        }
                        else if(_this.$store.state.liveChat.selectContact.robot_username==msg.fromClientId&&_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.talker&&msg.callbackMsg=='0') {
//                            界面上发送回来的消息
                            _this.$store.state.liveChat.chatMsgList.forEach(el=>{
                                el.data.forEach(item=> {
                                    if(!!item.pageKey&&(item.pageKey == msg.pageKey)) {
                                        _this.$set(item,'complete',false)
                                        _this.$set(item,'msgSvrId',msg.cmdData.msgSvrId ||'')
                                        _this.$set(item,'msgId',msg.cmdData.msgId || '')
//                                        if(msg.cmdData.status==5||((!msg.cmdData.msgId||msg.cmdData.msgId=='0'))) {
//                                            _this.$set(item,'status',60)
//                                        }
//                                        if((!!msg.cmdData.msgId&&msg.cmdData.msgId!='0')&&msg.cmdData.status!=5) {
//                                            _this.$set(item,'status',10)
//                                        }
                                        _this.$forceUpdate()
                                    }
                                })
                            })
                        }
                        else {
                            let flag =false
                            if(msg.cmdData.isNewMsg!='1') {
                                return
                            }
                            _this.$store.state.liveChat.contactList.forEach(el=>{
                                if((el.friend_user_name==msg.cmdData.talker&&el.robot_username==msg.fromClientId)) {
                                    flag = true
                                    let content = ''
                                    let type = '1'
                                    let reFlag = false
                                    switch (msg.cmdData.contentType) {
                                        case 0:
                                        case 2:
                                            content = emoji.stringToHtml(msg.cmdData.msg.content)
                                            break
                                        case 7:
                                        case 14:
                                        case 101:
                                            type = '3'
                                            content = '[图片]'
                                            break
                                        case 1002:
                                        case 1003:
                                        case 1006:
                                        case 1011:
                                            reFlag = true
                                            break
                                        default:
                                            content = emoji.stringToHtml(msg.cmdData.msg.content)
                                            break
                                    }
                                    if(reFlag) {
                                        return
                                    }
                                    el.content = content
                                    el.type = type
                                    el.created = datetime.slice(10)
                                    if(msg.callbackMsg=='0'||msg.callbackMsg=='1') {

                                    } else {
                                        if(el.no_hint=='0') {
                                            el.num = parseInt(el.num) + 1
                                            _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                                            _this.$store.commit('liveChat/addWxListNum',{username:el.robot_username,badge:1})
                                            _this.$store.commit('liveChat/addLiveChatManage',{user_id:_this.$store.state.liveChat.selectUser.id,badge:1})
                                            _this.audioPlay();
                                        }
                                        _this.$store.commit('liveChat/insertContactList',el)
                                    }
                                }
                            })
                            if(!flag) {
                                //利用接口去请求联系人信息
                                if(msg.fromClientId == _this.$store.state.liveChat.selectWx.username) {
                                    let content = ''
                                    let type = '1'
//                                    let reFlag = false
                                    switch (msg.cmdData.contentType) {
                                        case 0:
                                        case 2:
                                            content = emoji.stringToHtml(msg.cmdData.msg.content)
                                            break
                                        case 7:
                                        case 14:
                                        case 101:
                                            type = '3'
                                            content = '[图片]'
                                            break
                                        case 1002:
                                        case 1003:
                                        case 1006:
                                        case 1011:
                                            content = emoji.stringToHtml(msg.cmdData.msg.content)
//                                            reFlag = true
                                            break
                                        default:
                                            content = emoji.stringToHtml(msg.cmdData.msg.content)
                                            break
                                    }
//                                    if(reFlag) {
//                                        return
//                                    }
                                    _this.$axios({
                                        method: 'POST',
                                        url: '/index.php?r=uc/communication/talk-now',
                                        data:{username:msg.fromClientId,friend_username:msg.cmdData.talker,department_id:_this.$store.state.user.user.department.id,user_id:_this.$store.state.user.user.user_id,wx_type: _this.$store.state.liveChat.selectWx.wx_type}
                                    }).then(res=>{
                                        let udata = res.data
                                        if (udata.status == 1) {
                                            if(!!udata.data) {
                                                if(udata.data.no_hint=='0') {
                                                    _this.$store.commit('liveChat/addWxListNum',{username:udata.data.robot_username,badge:1})
                                                    _this.$store.commit('liveChat/addLiveChatManage',{user_id:udata.data.user_id,badge:1})
                                                    if(udata.data.user_id == _this.$store.state.liveChat.selectUser.id) {
                                                        _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                                                    }
                                                    _this.audioPlay();
                                                }
                                                if(udata.data.user_id!=_this.$store.state.liveChat.selectUser.id) {
                                                    return
                                                }
                                                if(_this.$store.state.liveChat.selectGroup.id!='0'&&udata.data.group_id!=_this.$store.state.liveChat.selectGroup.id) {
                                                    return
                                                }
                                                udata.data.content = content
                                                udata.data.type = type
                                                udata.data.num = parseInt(udata.data.num) + 1
                                                _this.$store.commit('liveChat/insertContactList',udata.data);
                                            }
                                        }
                                    })
                                }else {
                                    if(msg.cmdData.noHint!='1'&&msg.callbackMsg=='成功') {
                                        _this.$store.commit('liveChat/addLiveChatManage',{user_id:msg.cmdData.userId,badge:1})
                                        if(msg.cmdData.userId == _this.$store.state.liveChat.selectUser.id) {
                                            _this.$store.commit('liveChat/addWxListNum',{username:msg.fromClientId,badge:1})
                                            _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                                        }else {
                                            _this.$store.commit('liveChat/addOtherWxListNum',{username:msg.fromClientId,badge:1,user_id:msg.cmdData.userId})
                                        }
                                        _this.audioPlay();
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if(msg.cmdData.noHint!='1'&&msg.cmdData.isNewMsg=='1'&&msg.callbackMsg=='成功') {
                        _this.$store.commit('liveChat/addLiveChatManage',{user_id:msg.cmdData.userId,badge:1})
                        if(msg.cmdData.userId == _this.$store.state.liveChat.selectUser.id) {
                            _this.$store.commit('liveChat/addWxListNum',{username:msg.fromClientId,badge:1})
                            _this.$store.commit('user/addMenuBadge', {name:'聚合聊天',badge:1})
                        }else {
                            _this.$store.commit('liveChat/addOtherWxListNum',{username:msg.fromClientId,badge:1,user_id:msg.cmdData.userId})
                        }
                        _this.audioPlay();
                    }
                }
            }
            this.$ws.cmd1003 = function (msg) {
                console.log(msg)
                if(msg.status==2) {
                    let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                    let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                    let datekey = datetime.slice(0,10)
                    if(_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.fromUsername&&_this.$store.state.liveChat.selectContact.robot_username==msg.fromClientId) {
                        if(msg.cmdData.type==5) {
                            _this.$store.state.liveChat.chatMsgList.forEach(el=>{
                                el.data.forEach(item=> {
                                    if(item.msgSvrId ==msg.cmdData.msg) {
                                        _this.$set(item,'status','80')
                                        _this.$set(item,'complete',false)
                                        _this.$forceUpdate()
                                    }
                                })
                            })
                        }else {
                            let newMsg = {
                                key:datekey,
                                data:[{
                                    id:_this.$store.state.liveChat.selectContact.id,
                                    avatar_url:_this.$store.state.liveChat.selectContact.avatar_url,
                                    nickname:_this.$store.state.liveChat.selectContact.nickname,
                                    created:datetime,//从go获取
                                    content:msg.cmdData.msg,
                                    type:'1',
                                    send_by:'0',
                                    friend_user_name:_this.$store.state.liveChat.selectContact.friend_user_name,
                                    status:'70'
                                }]
                            }
                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                        }
                        if(msg.cmdData.type==0) {
                            _this.$set(_this.$store.state.liveChat.selectContact,'roomname',msg.cmdData.toUsername)
                        }
                    }else if(_this.$store.state.liveChat.selectContact.robot_username==msg.cmdData.fromUsername&&_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.toUsername&&_this.$store.state.liveChat.selectContact.robot_username==msg.fromClientId&&(msg.cmdData.type==6||msg.cmdData.type==7)) {
                        let newMsg = {
                            key:datekey,
                            data:[{
                                id:_this.$store.state.liveChat.selectContact.id,
                                avatar_url:_this.$store.state.liveChat.selectContact.avatar_url,
                                nickname:_this.$store.state.liveChat.selectContact.nickname,
                                created:datetime,//从go获取
                                content:msg.cmdData.msg,
                                type:'1',
                                send_by:'0',
                                friend_user_name:_this.$store.state.liveChat.selectContact.friend_user_name,
                                status:'70'
                            }]
                        }
                        if(msg.cmdData.type==6) {
                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                        }else {
                            _this.$store.commit('liveChat/insertChatMsgList_new',newMsg)
                        }
                    } else {
                        if(msg.cmdData.type==0) {
                            _this.$store.state.liveChat.contactList.forEach(el=>{
                                if((el.friend_user_name==msg.cmdData.fromUsername&&el.robot_username==msg.fromClientId)) {
                                    _this.$set(el,'roomname',msg.cmdData.toUsername)
                                }
                            })
                        }
                    }

                }
            }
//            获取断线机器人列表
            this.$ws.cmd3002 = msg=> {
                if(msg.status==1) {
                    let array = []
                    if(msg.cmdData.errorRobotList) {
                        msg.cmdData.errorRobotList.forEach(el=>{
                            array.push({
                                id:el.id,
                                username:el.username,
                                mobile_serial_name:el.mobileSerialName,
                                nickname:el.nickname,
                                userId:el.userId,
                            })
                        })
                    }
                    _this.$store.commit('user/setOfflineRobot',array)
                }else if(msg.status==2){
                    _this.$store.commit('user/setOfflineRobot',[])
                }
            }
            /*机器人断开连接及连接上的通知*/
/*            this.$ws.cmd3003 = msg=>{
                if(msg.cmdData.type=='1') {
                    //断开
                    this.$notification.warning({
                        key:msg.cmdData.username,
                        placement:'bottomRight',
                        message: h=>{
                            return h('div',[
                                h('span',{
                                    style :{
                                        fontWeight:'700',
                                    }
                                },'机器人掉线通知！'),
                                h('span',{
                                    style :{
                                        color:'#8C8C8C',
                                        position:'absolute',
                                        right:'50px'
                                    }
                                },msg.cmdData.time)
                            ])
                        },
                        description: '[' + msg.cmdData.nickname +'] 已断开连接',
                        duration: 0
                    });
                }else {
                    //重连
                    this.$notification.close(msg.cmdData.username)
                }
//                _this.$store.commit('user/setOfflineRobot_single',msg.cmdData)
            }*/
        }
    }
}
</script>

