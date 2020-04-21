<template>
    <div class="companyStyle">
        <div class='company-header' ref="header">
            <a-form   layout="inline" :form="form" >
                <a-row class="clr" type="flex" align="middle">
                    <div>
                        <a-form-item label="选择部门">
                            <a-tree-select
                                class="selectCommon"
                                :treeData="departmentList"
                                :treeDefaultExpandAll="true"
                                v-model="queryParam.department_id"
                                @select="onSelect"
                                style="width:200px;"
                            >
                            </a-tree-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="客户经理">
                            <a-select class="selectCommon" v-model="queryParam.user_id" @change="managerChange" placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power" style="width:150px;">
                                <a-select-option  v-for="(item,idx) in managerList" :key="item.id" >
                                    {{item.user_name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="微信号">
                            <a-select class="selectCommon" v-model="queryParam.weChat" @change="choseWechat" placeholser="选择企业号" style="width:150px;">
                                <a-select-option v-for="(item,index) in weChatList" :key="index">   
                                    {{item.nickname}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="聊天对象">
                            <a-select class="selectCommon" v-model="queryParam.type" @change="changeType" placeholser="选择客户类型" style="width:150px;">
                                <a-select-option v-for="(item,index) in typeList" :key="index">   
                                    {{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="最后聊天时间:">
                            <a-radio-group @change="dateTypeChange" v-model="queryParam.dateType">
                                <a-radio-button value="1">今天</a-radio-button>
                                <a-radio-button value="2">近7天</a-radio-button>
                                <a-radio-button value="3">近30天</a-radio-button>
                                <a-radio-button value="0">全部</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item>
                            <span class="right">
                                <a-input-search  v-model="queryParam.key" :placeholder="queryParam.type==0?'请输入客户名称':'请输入群名称'"  maxlength="15" enterButton  @search="handleSubmit" style="width:300px;"/>
                            </span>
                        </a-form-item>
                    </div>
                </a-row>
            </a-form>
        </div>
        <div class="company-content askHistory">
            <a-table ref="table" :columns="columns" :dataSource="customerList" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'   :pagination="false" :loading='loading'  :locale='locale'   :scroll="{y:sheight,x:false}">
                <template slot="avatar_url" slot-scope="text,record,index">
                    <div>
                        <img :src="record.type===20?pngFlag:record.type===10?record.avatar_url:'../../assets/defalute.svg'" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.type===10? record.remark  || record.name: record.name || "未命名的群"}}
                        </span>
                        <img v-if="record.type===20&&record.user_id.search(/@im.chatroom/)!=(-1)" src="../../assets/companyWx.png" style="height: 17px;border-radius: 5px">
                    </div>
                </template>
                <template slot="user_avatar" slot-scope="text,record,index">
                    <div>
                        <img :src="text?text:'../../assets/defalute.svg'" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.user_name}}
                        </span>
                    </div>
                </template>
                <template slot="robot_avatar" slot-scope="text,record,index">
                    <div>
                        <img :src="text?text:'../../assets/defalute.svg'" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.robot_name}}
                        </span>
                    </div>
                </template>
                <template slot="action" slot-scope="text,record,index">
                    <div>
                        <span class="history" @click="getHistory(record,true)">聊天历史</span>
                    </div>
                </template>
            </a-table>
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="customerList.length" >
                    <a-pagination v-if="customerList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="聊天记录"
            :visible="historyFlag"
            :footer="null"
            :confirmLoading="confirmLoading"
            @cancel="cancelLabel"
            width='846px'
            :bodyStyle="{
                padding:'14px 24px',
                height:'470px',
            }"
        >
            <div class="historyHeader">
                <a-radio-group style="width: 385px" v-model="radio_group" @change="changRadioGroup">
                    <a-radio value="0">全部</a-radio>
                    <a-radio value="1">文件</a-radio>
                    <a-radio value="2">图片/视频</a-radio>
                    <a-radio value="3">链接</a-radio>
                </a-radio-group>
                <a-input-search  placeholder='输入聊天内容'  maxlength="15" enterButton style="width:200px;margin-right: 20px" v-model="searchKey" @search="searchChatHistory()"></a-input-search>
                <a-date-picker placeholder="请选择时间" format="YYYY-MM-DD" @change="onChangeDate" ref='dateRange'></a-date-picker>
            </div>
            <div ref="historyContent" class="historyContext">
                <div style="text-align:center;">
                    <a-spin style="font-size: 14px;" type="loading" :spinning="listSpinning"/>
                </div>
                <div v-for="(item,index) in askList" :key="index">
                    <div class="clearFloat">
                        <a-avatar :src="item.send_by===0?item.avatar_url:item.robot_avatar_url" :size="40" shape="square" class="leftAvatar"/>
                        <div class="askRight">
                            <div class="clearFloat">
                                <span class="floatLeft" v-if="item.chat_type=='10'">{{item.send_by===0?item.nickname:item.robot_nickname}}</span>
                                <span class="floatLeft" v-if="item.chat_type=='20'">{{item.send_by!=0?item.robot_nickname:item.remark?item.remark:item.room_user_nickname?item.room_user_nickname:item.nickname}}</span>
                                <!--<span class="floatLeft">{{item.send_by===0?item.nickname:item.robot_nickname}}</span>-->
                                <span class="rightTime">{{item.created}}</span>
                            </div>
                            <p class="askMsg">
                                <!--文字-->
                                <span v-if="item.type==1" :id="item.id" :class="['text-content',item.status==80?'text-retract':'']"  v-html="item.content"></span>
                                <!--图片及表情包-->
                                <img v-else-if="item.type==3||item.type==47" class="img-content unselect" :src="item.iconurl" @click="showModal(item)">
                                <!--1:文件-->
                                <span v-if="item.type==6" class="link-content"  style="cursor: default" ondragstart="return false">
                                    <div style="width: 75%;word-break: break-all;color: #101010;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.title}}</div>
                                    <div style="position: relative;margin-top: 10px">
                                        <span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{item.descs}}</span>
                                    </div>
                                    <div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 20px;transform: translateY(-50%);border-radius: 4px">
                                        <img v-if="item.mediapath==''" src="../../assets/file-img1.png" alt="" style="position: static;transform: translateY(0);width: 48px;height: 48px">
                                        <img v-if="item.mediapath!=''" :src="item.mediapath" alt="" style="position: static;transform: translateY(0);width: 48px;height: 48px">
                                    </div>
                                </span>
                                <!--2:视频消息-->
                                <span v-if="item.type==43">
                                    <video controls  style="width:150px;" id="upVideo" v-if="item.mediapath!=''">
                                        <source :src="item.mediapath" type="video/mp4">
                                    </video>
                                    <img v-else :src="item.iconurl" style="width:150px;height:200px;object-fit: cover">
                                </span>
                                <!--3:链接-->
                                <span v-if="item.type==5" class="link-content" @click="navToLink(item.url)">
                                    <div style="color:#222;font-size:14px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden;">{{item.title}}</div>
                                    <div style="position: relative;margin-top: 10px">
                                        <span style="width: 180px;font-size: 12px;color: #999999;min-height: 40px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.descs}}</span>
                                        <img v-if="item.mediapath==''" src="../../assets/link-img.png" alt="">
                                        <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                    </div>
                                </span>
                                <!--33:小程序-->
                                <span v-if="item.type==33" class="mini-program-content" ondragstart="return false">
                                    <div class="title">
                                        <img :src="item.iconurl" alt="">
                                        <span>{{item.title}}</span>
                                    </div>
                                    <div class="content" style="max-height: 240px;overflow: hidden">
                                        <span>{{item.desc}}</span>
                                        <img  :src="item.mediapath" alt="">
                                    </div>
                                    <div style="border-top: 1px solid #e5e5e5;color: #999999;font-size: 12px;height: 25px;line-height: 25px">
                                        <img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
                                        小程序,请在手机上查看
                                    </div>
                                </span>
                                <!--34:语音-->
                                <span v-else-if="item.type==34" ondragstart="return false" :class="['audio-content',!!item.played?'audio-content-play':'']"  @click="playPauseAudio(item,index)">
                                    <span style="display: none">
                                        <audio :src="item.mediapath" controlsList="nodownload" oncontextmenu="return false" :ref="'audio-div'+chatIndex">
                                            您的浏览器不支持 audio 标签 。
                                        </audio>
                                    </span>
                                    <span class="audio-time">{{item.audio_time}}</span>
                                </span>
                                <!--42:个人名片/公众号名片-->
                                <span v-if="item.type==42" class="card-content" ondragstart="return false">
                                    <div style="position: relative;height: 60px;line-height: 40px;padding: 10px">
                                        <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                        <img v-if="item.mediapath==''" src="../../assets/cardIcon.png" alt="">
                                        <span style="display: inline-block;margin-left: 50px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;overflow: hidden;width: calc(100% - 50px)">{{item.title}}</span>
                                    </div>
                                    <div style="border-top: 1px solid #e5e5e5;padding: 0 10px;color: #999999;font-size: 12px;height: 25px;line-height: 25px">{{item.appid.substring(0,3)=='v1_'?'个人名片':'公众号名片'}}</div>
                                </span>
                                <!--红包消息-->
                                <span v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==0" class="redpacket-content">
                                    <span class="money-text">{{item.title}}</span>
                                </span>
                                <span v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==1" class="redpacket-content1">
                                    <span class="money-text">{{item.title}}<br>已领取 ￥{{item.chatRedPacket.money/100 }}</span>
                                </span>
                                <span v-else-if="item.type==48&&item.send_by!=0&&item.chatRedPacket.inner_type==0" class="redpacket-content" >
                                    <span class="money-text">{{item.title}}</span>
                                </span>
                                <span v-else-if="item.type==48&&item.send_by!=0&&item.chatRedPacket.inner_type==1" class="redpacket-content1">
                                    <span class="money-text">{{item.title}}<br>已领取 ￥{{item.chatRedPacket.money/100 }}</span>
                                </span>
                                <!--转账消息-->
                                <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==1" class="money-content">
                                    <span class="money-text">{{item.chatTransferMoney.type==0?'点击确认收钱':''}}<br>{{item.content}}</span>
                                </span>
                                <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1">
                                    <span class="money-text">{{item.chatTransferMoney.type==0?'已领取':'对方已收钱'}}<br>{{item.content}}</span>
                                </span>
                                <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==4" class="money-content1">
                                    <span class="money-text">已退款<br>{{item.content}}</span>
                                </span>
                                <span v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==1" class="money-content">
                                    <span class="money-text">{{item.chatTransferMoney.type==0?'':'对方未领取'}}<br>{{item.content}}</span>
                                </span>
                                <span v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1">
                                    <span class="money-text">{{item.chatTransferMoney.type==0?'已收钱':'对方已领取'}}<br>{{item.content}}</span>
                                </span>
                                <span v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==4" class="money-content1">
                                    <span class="money-text">已退款<br>{{item.content}}</span>
                                </span>
                            </p>
                        </div>                   
                    </div>
                </div>
                <div v-if="modalShow" @click="modalShow=false" class="img_modal" style="">
                    <div class="img_content" ondragstart="return false" unselectable="on">
                        <a-spin size="large" :spinning="imgSpinning"/>
                        <img :src="modal_img" @mousewheel="bigimg($event)" class="unselect"  ref="modalImg">
                    </div>
                </div>
            </div>
            <div v-if="!askList.length" class="pacepage" >
                <data-status :width="120"></data-status>
            </div>
        </a-modal>
    </div>    
</template>
<script>
    var comConf = require('../../common/comConfig');
    import moment from 'moment';
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { concatMsgArr } from '@/common/util'
    var emoji = require('../../common/emojiMap');
    export default {
        name:'',
        components:{
            dataStatus,
            chatIndex:{
                type: Number,
                default:0
            },
        },
    data(){
        return{
            form: this.$form.createForm(this),
            pngFlag:require('../../assets/room_avatar.png'),
            disableDepartment:true,//权限控制
            heightFlg:false,//表格样式控制
            loading:false,
            sheight:'',//表格高度
            historyFlag:false,
            selectRecord:{},
            confirmLoading:true,
            modalShow:false,
            imgSpinning:false,
            page_size:10,
            page:1,
            total:0,
            id:'',
            radio_group:'0',
            searchKey:'',
            dateCon:'',
            locale:{
                filterConfirm:'',
                filterReset:'',
                emptyText:''
            },
            queryParam:{
                department_id:'',
                user_id:'选择客户经理',
                weChat:'',
                type:0,
                key:'',
                assistant_id:'',
                dateType:"1"
            },
            departmentList:[],//部门list
            managerList:[],//客户经理
            weChatList:[],//企业号list
            typeList:[
                {
                    id:10,
                    name:'客户'
                },
                {
                    id:20,
                    name:'群聊'
                }
            ],//客户类型
            columns:[
                {
                    title: '客户/群聊',
                    dataIndex: 'avatar_url',
                    align:'left',
                    width: 120,
                    scopedSlots: {
                        customRender: 'avatar_url'
                    }
                },
//                {
//                    title: '客户/群聊类型',
//                    width: 120,
//                    dataIndex: 'type',
//                    align:'center',
//                    customRender:(text)=>{
//                        return text===10?'客户':'群聊'
//                    }
//                },
                {
                    title: '所属部门',
                    width: 120,
                    dataIndex: 'department',
                    align:'center',
                },
                {
                    title: '所属客户经理',
                    width: 120,
                    dataIndex: 'user_avatar',
                    align:'center',
                    scopedSlots: {
                        customRender: 'user_avatar'
                    }
                },
                {
                    title: '所属微信号',
                    width: 120,
                    dataIndex: 'robot_avatar',
                    align:'center',
                    scopedSlots: {
                        customRender: 'robot_avatar'
                    }
                },
                {
                    title: '最后聊天时间',
                    width: 120,
                    dataIndex: 'last_time',
                    align:'center',
                },
                {
                    title: '操作',
                    width: 100,
                    dataIndex: 'action',
                    align:'center',
                    scopedSlots: {
                        customRender: 'action'
                    }
                },
            ],
            customerList:[],//表格数据
            askList:[],
            historyScrollFlag:false,
            contentPage:1,
            listSpinning:false,
        }
    },
    mounted(){
        window.addEventListener('resize',this.autoHeight,false);
        let that = this
        if(!!this.$refs['audio-div' + this.chatIndex]) {
            [].forEach.call(this.$refs['audio-div' + this.chatIndex], function (i) {
                i.addEventListener("play", that.pauseAll.bind(i));
                i.addEventListener("ended", that.endAudio.bind(i));
            })
        }
    },
    computed:{

    },
    watch:{
        customerList:function(){
            let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
            let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部 
            this.$nextTick(function(){
                if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                    this.heightFlg = true;
                    this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight - 10;
                }else{
                    this.heightFlg = false;
                }
            });
        }
    },
    methods:{
        clear() {
            this.$refs.dateRange.$children[0].$children[0].handleChange(null)
            this.dateCon = ''
            this.searchKey = ''
            this.radio_group = '0'
            this.$forceUpdate()
        },
        autoHeight(){
            let that = this
            let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
            if(obj){
                that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight - 40:''
                that.heightFlg = obj.heightFlg
            }
        },
        addEventScroll(){},
        onSelect(selectedKeys, info) {
            this.$store.state.user.user.department.id===selectedKeys?this.disableDepartment = true:this.disableDepartment = false;
            this.page = 1
            this.page_size = 10
            this.queryParam.department_id = selectedKeys
            this.customerList = []
            this.getUserList(selectedKeys)
        },
        managerChange(val){
            //选择客户经理
            this.queryParam.user_id = val;
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.getWeChat(val)
        },
        dateTypeChange() {
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.refreshGroup()
        },
        choseWechat(idx){
            //选择个人号
            this.queryParam.assistant_id = this.weChatList[idx].id;
            this.page = 1
            this.page_size = 10
            //this.customerList = []
            this.refreshGroup()
            this.getAllCustonerLabel()
        },
        changeType(val){
            //选择客户 类型
            this.queryParam.type = val
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.refreshGroup()
        },
        onChangeDate(val,time){
            this.dateCon = time
            this.getHistory(null,true)
        },
        handleSubmit(){
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.refreshGroup()
        },
        getHistory(record,bool,is_scroll){
            //聊天历史记录
            this.historyFlag = true
            this.historyScrollFlag = true
            if(record) {
                this.selectRecord = record
                setTimeout(()=>{   //控制往上翻数据加载出来的时间
                     this.$refs.historyContent.addEventListener('scroll', () => {
                         if(this.$refs.historyContent.scrollTop== 0 && !this.historyScrollFlag && !!this.selectRecord.id) {
                             this.listSpinning = true
                             this.getHistory(null,false,true)
                         }
                     }, false)
                 },1000)
            }
            
            bool&&(this.contentPage = 1)
            if(is_scroll) {
                this.contentPage += 1
            }
            
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/chatlogscontent?',
                data:{
                    p:this.contentPage,
                    n:'20',
                    id:this.selectRecord.id,
                    userid:this.selectRecord.user_id,
                    robotid:this.selectRecord.assistant_id,
                    type:this.radio_group,
                    searchKey:this.searchKey,
                    dateCon:this.dateCon,
                    chatType:this.selectRecord.type
                }
            }).then(d=>{
                let udata = d.data;
                if (udata.status == 1) {
                    if(udata.data.list.length == 0){  //数据
                        bool&&(this.askList = udata.data.list)
                        setTimeout(()=>{
                            this.historyScrollFlag = true
                            
                        },0)
                        this.imgSpinning = flase
                        return
                    }
                    bool&&(this.askList = udata.data.list)
                    !bool&&(this.askList = [].concat(udata.data.list,this.askList))
                    this.askList.forEach(elItem=>{   //表情转义
                        elItem.type==1&&!!elItem.content&&(elItem.content = emoji.stringToHtml(elItem.content))
                    })
                    let scroll_top = this.$refs.historyContent.scrollHeight
                    setTimeout(()=>{  //控制一进来数据就在最下面显示
                        if(!is_scroll) {
                            this.$refs.historyContent.scrollTop < (this.$refs.historyContent.scrollHeight - this.$refs.historyContent.offsetHeight)
                            &&(this.$refs.historyContent.scrollTop = this.$refs.historyContent.scrollHeight - this.$refs.historyContent.offsetHeight)
                        } else {
                            this.$refs.historyContent.scrollTop = this.$refs.historyContent.scrollHeight - scroll_top
                        }
                        this.historyScrollFlag = false
                        this.listSpinning = false
                    },0)
                }
            }).catch(_=>{
                this.listSpinning = false
            });
        },
        cancelLabel(){
            //取消
            this.clear()
            this.historyFlag = false
            this.askList = []
        },
        getDetail(id,user_id){
            this.$router.push({path:'/incCustomerManage/incListDetails'});
        },
        onChange(page,pageSize){
            //分页
            this.page = page
            this.page_size = pageSize
            this.refreshGroup();
        },
        onShowSizeChange(page,pageSize){
            //分页条数
            this.page = page
            this.page_size = pageSize
            this.refreshGroup();
        },
        changRadioGroup(val){
            this.radio_group = val.target.value
            this.getHistory(null,true)
        },
        searchChatHistory() {
            this.getHistory(null,true)
        },
        getTreeList(){
            //获取部门数据
            this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
//            this.queryParam.department_id  = this.departmentList[0].key
            this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
            this.getUserList()
        },
        listToTree(list,val) {
            //将部门列表转换为tree所用数据
            let array = []
            list.forEach((el,idx)=>{
                if(el.children && el.children.length > 0) {
                    el.children =this.listToTree(el.children,idx)
                }
                array.push({title:el.name,key:el.id,value:el.id,children:el.children})
            })
            return array
        },
        getUserList(){
            //获取客户经理
            this.$axios({
                method: 'post',
                url: '/index.php?r=uc/organization/user',
                data:{department_id:this.queryParam.department_id,type:1}
            }).then(d=> {
                // 响应成功回调
                let udata = d.data;
                if (udata.status == 1) {
                    this.managerList = udata.data.userList
                    let user_id = ''
                    this.managerList.forEach(el=>{
                        if(el.id === this.$store.state.user.user.user_id){
                                user_id = this.$store.state.user.user.user_id;
                        }
                    })
                    user_id? this.queryParam.user_id = user_id: this.managerList[0]&&this.managerList[0].id?this.queryParam.user_id = this.managerList[0].id:(this.managerList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.queryParam.user_id = '0')
                    user_id?this.getWeChat(user_id):this.managerList[0]?this.getWeChat(this.managerList[0].id):this.getWeChat(0);
                }
            })
        },
        getWeChat(val){
            //获取客户经理下个人号
            this.$axios({
                method:'POST',
                url:'/index.php?r=uc/communication/user-assistant',
                data:{user_id:val}
            }).then(res=>{
                let udata = res.data;
                if(udata.status === 1){
                    this.weChatList = udata.data;
                    this.weChatList.length?this.queryParam.assistant_id = udata.data[0].id:this.queryParam.assistant_id='';
                    this.weChatList.length?this.queryParam.weChat = 0:this.queryParam.weChat = '无匹配结果'
                    if(this.weChatList.length){
                        this.refreshGroup()
                        this.getAllCustonerLabel();
                    }
                }else{
                    this.$message.warn(udata.msg)
                }
            })
        },
        getAllCustonerLabel() {
            this.$axios({
                method: 'POST',
                url: '/index.php?r=uc/material/customer-label',
                data:{
                    department_id:this.queryParam.department_id ,
                    assistant_ids:this.queryParam.assistant_id,
                    company:1
                }
            }).then(res=> {
                let udata = res.data
                if (udata.status == 1) {
                    this.labelList = udata.data
                    this.allLabel = udata.data
                }else{
                    this.$message.warn(udata.msg)
                }
            });
        },
        refreshGroup(){
            //页面数据
            let data = {
                p:this.page,
                n:this.page_size,
                userid:this.queryParam.user_id,
                robotid:this.weChatList[this.queryParam.weChat].id,
                type:this.typeList[this.queryParam.type].id,
                key:this.queryParam.key,
                department_id:this.queryParam.department_id,
                dateType:this.queryParam.dateType,
            }
            this.$axios({
                method:'post',
                url:'/qiyewxapi/chatlogs?',
                data:data
            }).then(res=>{    
                let udata = res.data;
                if(udata.status === 1){
                    this.customerList =  udata.data.list
                    this.total = parseInt(udata.data.count)
                }
            })
        },
        imgExists(e) {
            let imgUrl = this.$store.state.user.user.default_url;
            let img = new Image();
            //判断图片大小是否大于0 或者 图片高度与宽度都大于0
            img.onload = function() {
                if(img.filesize>0||(img.width>0&&img.height>0)){
                    e.target.src = imgUrl;
                    img = null
                }
            }
            img.src=imgUrl;
        },
        showModal(item) {
            if(item.status==80) {
                return
            }
            this.imgSpinning = false
            let _this = this
            this.modal_img = item.bigImg==''?item.iconurl:item.bigImg;
            this.modalShow = true
            if(item.type==3&&item.bigImg=='') {
                this.imgSpinning = true
                //当还未获取大图时，发送指令
                let data = {
                    cmd:2024,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.robot_username,
                    cmdData:{
                        msgId:item.msgId,
                        msgSvrId:item.msgSvrId,
                        toUsername:item.friend_user_name,
                        imageId:item.imgId
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2024 = function (msg) {
                    if(msg.callbackMsg=='成功') {
                        _this.modal_img = msg.cmdData.image
                        item.bigImg =  msg.cmdData.image
                        _this.imgSpinning = false
                        _this.$forceUpdate()
                    } else if(msg.callbackMsg=='图片不存在,可能已经被清理!'){
                        _this.$message.warning(msg.callbackMsg)
                        _this.imgSpinning = false
                    } else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
                }
            }
        },
        bigimg(event) {
            let zoom = parseInt(this.$refs.modalImg.style.zoom,10)||100;
            zoom += event.wheelDelta / 6;
            if(zoom > 0 ) {
                this.$refs.modalImg.style.zoom=zoom+'%';
            }
        },
        navToLink(url) {
            let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
            window.open(reg1.test(url)?url:'//'+url)
        },
        playPauseAudio(item,index) {
            //开始/暂停语音播放
            if(!item.mediapath || item.mediapath == '') {
                this.$set(item,'complete',true)
                this.$forceUpdate()
                return
            }
            let audioIndex = 0
            this.askList.forEach((el,index1)=>{
                if(index1<index&&el.type!='34') {
                    audioIndex += 1
                }
            })
            if(!!this.$refs['audio-div' + this.chatIndex][index - audioIndex].error) {
                return
            }
            if (this.$refs['audio-div' + this.chatIndex][index - audioIndex].paused){
                this.$refs['audio-div' + this.chatIndex][index - audioIndex].play();
                this.askList.forEach((el,index)=>{
                    if(el.type==34) {
                        this.$set(el,'played',false)
                    }
                })
                this.$set(item,'played',true)
            }
            else{
                this.$refs['audio-div' + this.chatIndex][index - audioIndex].currentTime = 0;
                this.$refs['audio-div' + this.chatIndex][index - audioIndex].pause();
                this.$set(item,'played',false)
            }
        },
        pauseAll(ii) {
            let that = this;
            [].forEach.call(this.$refs['audio-div' + this.chatIndex], function (i) {
                if(i !== ii.target) {
                    i.currentTime = 0;
                    i.pause()
                }
            })
        },
        endAudio(ii) {
            let index1 = 0;
            let audioIndex = 0;
            [].forEach.call(this.$refs['audio-div' + this.chatIndex], function (i,index) {
                if(i == ii.target) {
                    index1 = index
                }
            })
            this.askList.forEach((el)=>{
                if(el.type=='34') {
                    if(audioIndex == index1) {
                        console.log('el',el)
                        this.$set(el,'played',false)
                    }
                    audioIndex += 1
                }
            })
        },
    },
    updated() {
        let that =this;
        if(!!this.$refs['audio-div' + this.chatIndex]&&this.$refs['audio-div' + this.chatIndex].length!=0) {
            [].forEach.call(this.$refs['audio-div' + this.chatIndex], function (i) {
                i.addEventListener("play", that.pauseAll.bind(i));
                i.addEventListener("ended", that.endAudio.bind(i));
            })
        }
    },
    created(){
        this.addEventScroll()
        this.getTreeList()
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.autoHeight,false)
    }
}
</script>
<style lang="less">
    /*.askHistory .scrollheade .ant-table-body{*/
        /*padding-bottom:60px;*/
    /*}*/
</style>
<style lang="less" scoped>
    .history{
        cursor: pointer;
        color: #5AA9CD;
    }
    .selectTag{
        margin-right:30px;
    }
    .pickTIime{
        width:190px;
    }
    .search-a{
        margin-left:10px;
        width:58px;
        height:31px;
        text-align:center;
    }
    .modalFoot{
        text-align:right;
        height:44px;
        line-height:62px;
        border-top:1px solid #f0f0f0;
        margin-top: 10px;
    }
    .actionIcon{
        width: 36px;
        height:36px;
        cursor: pointer;
    }
    .historyHeader{
        padding-bottom: 12px;
        border-bottom:1px solid #f0f0f0;
    }
    .historyContext{
        max-height:390px;
        overflow:auto;
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    .leftAvatar{
        float:left;
        width: 45px;
        height: 45px; 
        margin:10px 0 0 0; 
        display:block;
    }
    .askRight{
        float:right;
        width:735px; 
        border-bottom:1px solid #f0f0f0;
        padding:10px 0 10px 0;
    }
    .floatLeft{
        color:#8A8A8A; 
        font-weight:400
    }
    .rightTime{
        float:right;
        margin-right:10px; 
        color:#8A8A8A; 
        font-weight:400
    }
    .askMsg{
        margin-bottom:0;
    }
    .pacepage{
        margin-top: 120px;
        margin-left: 42px;
    }
    .img_content {
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        img {
            z-index: 1001;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            max-width: 500px;
            width: 100%;
        }
        .ant-spin {
            z-index: 1002;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
    .img-content {
        height: 100px;
        max-width: 200px;
        cursor: pointer;
    }
    .text-content {
        display: inline-block;
        max-width: 65%;
        background: #fff;
        border-radius: 5px;
        position: relative;
        color: rgb(16,16,16);
        white-space: normal;
        word-break: break-all;
    }
    .text-retract {
        background: #DDDDDD;
        color: #ffffff;
    }
    .link-content {
        display: inline-block;
        width: 260px;
        background: #F8F8F8;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        color: rgb(16,16,16);
        white-space: normal;
        word-break: break-all;
        cursor: pointer;
        border: 1px solid #f0f0f0;
        img {
            width: 50px;
            height: 50px;
            position: absolute;
            top:50%;
            right: 0;
            transform: translateY(-50%);
        }
    }
    .mini-program-content{
        display: inline-block;
        text-align: left;
        width: 260px;
        background: #F8F8F8;
        border-radius: 5px;
        position: relative;
        color: rgb(16,16,16);
        white-space: normal;
        word-break: break-all;
        border: 1px solid #f0f0f0;
        .title {
            padding: 10px 10px 0 10px;
            span {
                color: #999999;
                font-size: 12px;
            }
            img {
                width: 20px;
                height: 20px;
            }
        }
        .content {
            padding: 0 10px 10px 10px;
            span {
                display: inline-block;
                padding: 10px 0;
            }
            img {
                width: 100%;
            }
        }
    }
    .card-content {
        display: inline-block;
        width: 220px;
        background: #F8F8F8;
        border-radius: 5px;
        position: relative;
        color: rgb(16,16,16);
        white-space: normal;
        word-break: break-all;
        cursor: pointer;
        border: 1px solid #f0f0f0;
        img {
            width: 40px;
            height: 40px;
            position: absolute;
            top:50%;
            left: 10px;
            transform: translateY(-50%);
        }
    }
    .audio-content {
        max-width: 200px;
        min-width: 100px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        background: #F8F8F8;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        color: rgb(16,16,16);
        background-image: url("../../assets/sound_play.png") ;
        background-repeat: no-repeat;
        background-position:5% 7px;
        background-size: 26px;
        cursor: pointer;
        .audio-time{
            display: inline;
            position: absolute;
            left: calc(~"100% - 20px");
            bottom: 0;
            color: #2A2A2A;
            font-size: 14px;
        }
    }
    .audio-content-play {
        background-image: url("../../assets/sound_play.gif") ;
    }
    .redpacket-content {
        width: 210px;
        height: 82px;
        background: url('../../assets/redpacket1.png') no-repeat;
        background-size: 100%;
        display: inline-block;
        cursor: pointer;
        position: relative;
        .money-text {
            color: #ffffff;
            font-size: 14px;
            font-size: 700;
            position: absolute;
            top: 10px;
            left: 60px;
        }
    }
    .redpacket-content1 {
        width: 210px;
        height: 82px;
        background: url('../../assets/redpacket2.png') no-repeat;
        background-size: 100%;
        display: inline-block;
        cursor: pointer;
        position: relative;
        .money-text {
            color: #ffffff;
            font-size: 14px;
            font-size: 700;
            position: absolute;
            top: 10px;
            left: 60px;
        }
    }
    .money-content {
        width: 210px;
        height: 82px;
        background: url('../../assets/transfer-money1.png') no-repeat;
        background-size: 100%;
        display: inline-block;
        cursor: pointer;
        position: relative;
        .money-text {
            color: #ffffff;
            font-size: 14px;
            font-size: 700;
            position: absolute;
            top: 10px;
            left: 60px;
        }
    }
    .money-content1 {
        width: 210px;
        height: 82px;
        background: url('../../assets/transfer-money2.png') no-repeat;
        background-size: 100%;
        display: inline-block;
        cursor: pointer;
        position: relative;
        .money-text {
            color: #ffffff;
            font-size: 14px;
            font-size: 700;
            position: absolute;
            top: 10px;
            left: 60px;
        }
    }
</style>