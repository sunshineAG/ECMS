<style lang="less" scoped>
   .customer-list {
        background: #ffffff;
        position: relative;
        padding:0 14px;
        border-radius:3px;
        height: calc(~"100vh - 90px");
        .header {
            padding: 12px 0;
            background:#fff;
        }
        .content {
            position:relative;
        }
    }
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .clr:after{
        display: block;
        height:0;
        content:'';
        visibility: hidden;
        clear:both;
    }
    .input-content {
        // min-height: 100px;
        padding: 0 0 10px 0;
        height: auto;
        border-top: none;
        .tools {
            position: absolute;
            bottom: -14px;
            left: -10px;
            display: flex;
            >div {
                padding: 0 10px;
                cursor: pointer;
                .anticon svg {
                    font-size: 20px;
                }
                #emoji {
                    position: absolute;
                    top: -165px;
                    width: 390px;
                    height: 155px;
                    left: 0;
                    border: 1px solid #cccccc;
                    padding: 5px;
                    z-index: 10;
                    line-height: 1;
                    background: #ffffff;
                    box-shadow: 0px 1px 10px 3px #ccc;
                    &::after {
                        margin-top: -1px;
                        border: 7px solid transparent;
                        border-top-color: #fff;
                        content: "";
                        position: absolute;
                        left: 16px;
                        top: 100%;
                        margin-left: -5px;
                    }
                }
            }
        }
        .input-content-area {
            word-wrap: break-word;
            white-space: normal;
            #notice_area {
                border:1px solid #ccc;
            }
            #emoji {
                position: absolute;
                top: -160px;
                width: 390px;
                height: 155px;
                left: 0;
                border: 1px solid #cccccc;
                padding: 5px;
                z-index: 10;
                line-height: 1;
                background: #ffffff;
            }
        }
    }
    .tag-modal {
        .ant-tag:hover {
            background: #5AA9CD;
            color: #ffffff;
        }
        .ant-tag-checkable{
            border: 1px solid #d9d9d9;
            background: #fafafa;
        }
        .ant-tag-checkable-checked {
            background: #5AA9CD;
        }
    }
    .ant-tag:hover {
        background: #5AA9CD;
        color: #ffffff;
        opacity: 1;
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    //.bottomPage{
//     width: 100%;
//     background:#fff;
//     height:50px;
//     padding:8px 34px 0 0;
//     color:#222;
//     border-bottom:1px solid #E6E5E5;
// }
// .bottomPageK{
//     position:absolute;
//     bottom:0;
//     color:#fff;
//     height:50px;
//     width: 100%;
//     padding:8px 34px 0 0;
//     background:rgba(34, 34, 34, 0.7);
//     border-bottom:1px solid #E6E5E5;
//     .col{
//         color:#fff;
//     }
// }
// .bottomPage::after,.bottomPageK::after{
//     display: block;
//     clear:both;
//     height:0;
//     content:'';
//     visibility: hidden;
// }

</style>
<style>
  
</style>
<template>
    <div class="customer-list">
        <div class="header" ref='header'>
            <a-form @submit.prevent="handleSubmit" layout="inline" :form="form" >
                <a-row class="clr">
                    <a-col :span="24">
                        <div class="fl">
                            <a-form-item label="选择部门">
                                <a-tree-select
                                    :treeData="departmentList"
                                    :treeDefaultExpandAll="true"
                                    v-model="queryParam.department_id"
                                    @select="onSelect"
                                    style="min-width: 200px"
                                >
                                </a-tree-select>
                            </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item label="客户经理">
                                <a-select v-model="queryParam.user_id " @change="managerChange"  style="width: 150px;"  placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                                    <a-select-option  v-for="(item,idx) in managerList" :key="item.id">
                                        {{item.user_name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item label="微信">
                                <a-select v-model="queryParam.weChat" @change="choseWeChat" style="width:150px;" placeholder="选择微信号">
                                    <a-select-option v-for="(item,index) in weChatList" :key="index">
                                        {{item.nickname?item.nickname:'未命名'}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item label='搜索群名'>
                                <a-input v-model="queryParam.key" placeholder='请输入群名关键字' style="width: 200px;" />
                            </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item label='选择标签'>
                                <a-select mode="multiple"  v-model="queryParam.label" style="min-width:200px;" placeholder="全部"  >
                                    <a-select-option  v-for="(item,index) in labelList" :key='item.id'>{{item.title}}</a-select-option >
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item>
                                <a-button type='primary' htmlType='submit'>搜索</a-button>
                                <a-button @click="clear" style="margin-left: 8px">重置</a-button>
                            </a-form-item>
                        </div>
                    </a-col>
                    <!--<a-col :span="6" style="height: 39px;line-height: 39px;text-align: left">-->
                        <!--<div class="fr">-->
                            <!--<a-button type='primary' htmlType='submit'>搜索</a-button>-->
                            <!--<a-button @click="clear" style="margin-left: 8px">重置</a-button>-->
                            <!--&lt;!&ndash;<a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">&ndash;&gt;-->
                                <!--&lt;!&ndash;<span>{{expand?'收起':'展开'}}</span>&ndash;&gt;-->
                                <!--&lt;!&ndash;<a-icon :type="expand ? 'up' : 'down'" />&ndash;&gt;-->
                            <!--&lt;!&ndash;</a>&ndash;&gt;-->
                        <!--</div>-->
                    <!--</a-col>-->
                </a-row>
                <!--<a-row v-show="expand" style="padding-top: 5px" class="clr">-->
                    <!--<a-col :span="18">-->
                        <!--<div class="fl">-->
                            <!--<a-form-item label="客户经理">-->
                                <!--<a-select v-model="queryParam.user_id "  style="width: 150px;"  placeholder='选择客户经理'>-->
                                    <!--<a-select-option  v-for="(item,idx) in managerList" :key="item.id">-->
                                            <!--{{item.user_name}}-->
                                    <!--</a-select-option>-->
                                <!--</a-select>-->
                            <!--</a-form-item>-->
                        <!--</div>-->
                    <!--</a-col>-->
                    <!--&lt;!&ndash;<a-col :span="6" style="height: 39px;line-height: 39px;text-align: left">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="fr" style="margin-right:86px;">&ndash;&gt;-->
                            <!--&lt;!&ndash;<a-button type='primary' @click="exportContact">导出群列表</a-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
                <!--</a-row>-->
            </a-form>
            <!--<div style="margin:10px 0;padding-left: 24px;">-->
             <!--<a-button type="primary" @click="upInfo" style="margin-top:10px">刷新</a-button>-->
             <!--<a-button type="primary" @click="noticeSendAll">公告</a-button>-->
             <!--<a-button type="primary" @click="collocationAll" >托管</a-button>-->
           <!--</div>-->
        </div>
        <div class="content" >
            <a-table  filterMultiple='true' ref="table" type="checkbox" :class='[heightFlg?"scrollheade":"scrollheader"]' :scroll="{y:sheight}" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :columns="columns" :locale="locale" :dataSource="roomList" :pagination="false"  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id" >
                <template slot="avatar_url" slot-scope="text, record, index">
                    <div>
                        <img src="../../assets/room_avatar.png" @error="imgExists($event)" style="width: 38px;height: 38px;border-radius: 5px">
                    </div>
                </template>
                <template slot="room_name" slot-scope="text, record, index">
                    <div>
                        <span>{{text==''?'未命名的群':text}}</span>
                        <img v-if="record.room_wx_id.search(/@im.chatroom/)!=(-1)" src="../../assets/companyWx.png" style="height: 17px;border-radius: 5px">
                    </div>
                </template>
                <template slot="qr_code" slot-scope="text, record, index">
                    <div>
                        <a-button v-if='!qrExpireTime(record.qr_code_expire_time)' type="primary" @click='getExpireQR(record)'>获取群二维码</a-button>
                        <a-tooltip placement="left" v-else>
                            <template slot="title">
                                <img :src="text" style="width: 300px;height: 300px;border-radius: 5px">
                            </template>
                            <img :src="text" style="width: 60px;height: 60px;border-radius: 5px">
                        </a-tooltip>
                    </div>
                </template>
                <template slot="trusteeship" slot-scope="text, record, index">
                    <div style="position: relative">
                        <div style="display: inline-block">
                            <a-tag v-for="(item,index) in record.welcome.list" :key="index" style="margin-bottom: 10px;background: #5AA9CD;color: #ffffff">
                                {{item.name}}
                            </a-tag>
                        </div>
                        <div style="display: inline-block">
                            <a-tag v-for="(item,index) in record.auto_reply.list" :key="index" style="background: #5AA9CD;color: #ffffff">
                                {{item.class_name}}
                            </a-tag>
                        </div>
                        <a-icon type="setting" theme="filled" style="position: absolute;right: 0;top: 50%;transform: translateY(-50%);cursor: pointer;color:#fff;background:#5AA9CD;padding:1px;" @click="collocationOne(record)"/>
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
                        <a v-if="queryParam.department_id==$store.state.user.user.department.id" href="javascript:void(0);" @click="sendMsg(record.id,record.user_id,record.room_owner)" style="padding-right: 15px;">发消息</a>
                        <a href="javascript:void(0);" @click="getDetail(record)" style="padding-right: 15px;">详细信息</a>
                        <a href="javascript:void(0);" @click="notice(record)" style="padding-right: 15px;">公告</a>
                        <a href="javascript:void(0);" @click="collocation(record)" >
                            <span v-if="record.trusteeship=='1'" style="color: rgb(223, 166, 156)">关闭托管</span>
                            <span v-else>开启托管</span>
                        </a>
                    </div>
                </template>
            </a-table>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!roomList.length"></data-status> -->
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="roomList.length" >
                    <span style="vertical-align: middle;" >
                        <a-button type="primary" style="float: left;margin-left:15px;margin-right: 10px" @click="collocationAll" v-if="selectedRowKeys.length" :disabled="selectedRowKeys.length>1?false:true">托管</a-button>
                        <a-button type="primary" style="float: left" @click="noticeSendAll" v-if="selectedRowKeys.length" :disabled="selectedRowKeys.length>1?false:true">公告</a-button>
                        <!--<a-button type="primary" @click="upInfo" style="float: left" v-if="selectedRowKeys.length">刷新</a-button>-->
                    </span>
                    <a-pagination   showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float: right"/>
                </div>
            </div>
        </div>
        <a-modal title="公告" :footer="null" :visible="com_visible" @cancel="com_handleCancel" width="50%">
            <div class="input-content" style="position: relative">
                <div class="tools">
                    <div>
                        <a-icon type="smile" @click="showEmoji()" id="showEmoji" />
                        <div v-if="emojiFlag" id="emoji">
                            <a href="javascript:;" v-for="(item,index) in emojiList"  v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
                        </div>
                    </div>
                </div>
                <div class="input-content-area" >
                    <div-edit-area id="notice_area" :formItem="noticeObj" ref="div_edit" @change='getSel()'></div-edit-area>
                </div>
            </div>
            <div style="padding-top: 25px;text-align: right">
                <a-button @click="com_handleCancel">取消</a-button>
                <a-button type='primary' style="margin-left: 10px;" @click="roomNotice()">确定</a-button>
            </div>
        </a-modal>

        <a-modal title="托管" :visible="collocation_visible" @cancel="collocation_visible=false" width="50%" @ok="handleTagOk">
            <div>
                <span>欢迎语：</span>
                <div class="tag-modal">
                    <a-checkable-tag v-for="(item,index) in welcomeList"  :key="index" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked,'1')">
                        {{item.name}}
                    </a-checkable-tag>
                </div>
            </div>
            <div style="margin-top: 50px">
                <span>关键词回复：</span>
                <div class="tag-modal">
                    <a-checkable-tag v-for="(item,index) in replyList"  :key="index" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked,'2')">
                        {{item.class_name}}
                    </a-checkable-tag>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
    import moment from 'moment';
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
    var storage = require('../../common/store')
    import divEditArea from '../../components/dataManage/divEditArea.vue'
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'
    export default {
        name: "",
        components:{divEditArea,dataStatus}
        ,data(){
            return{
                form: this.$form.createForm(this),
                heightFlg:false,
                sheight:'',
                com_visible:false,
                collocation_visible:false,
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                weChatList:['微信测试1','微信测试2'],
                queryParam:{
                    department_id:'',
                    user_id:'0',
                    key:'',
                    label:[],
                    weChat:'',
                    assistant_id:'0'
                },
                managerList:[],
                labelList:[],
                expand:false,   //搜索状态，展开还是收起
                roomList:[],
                columns:[
                    {
                        title: '群头像',
                        width: '10%',
                        dataIndex: 'avatar_url',
                        align:'left',
                        scopedSlots: {
                            customRender: 'avatar_url'
                        }
                    },
                    {
                        title: '群名称',
                        width: '20%',
                        align:'left',
                        dataIndex: 'room_name',
                        scopedSlots: {
                            customRender: 'room_name'
                        },
//                        customRender:function (text, record, index) {
//                            if(text=='') {
//                                return '未命名的群'
//                            }else {
//                                return text
//                            }
//                        }
                    },
                    {
                        title: '群主',
                        align:'left',
                        width: '15%',
                        dataIndex: 'nickname'
                    },
                    {
                        title: '群码',
                        align:'left',
                        width: '15%',
                        dataIndex: 'qr_code',
                        scopedSlots: {
                            customRender: 'qr_code'
                        }
                    },
                    {
                        title: '托管信息',
                        width: '20%',
                        align:'center',
                        dataIndex: 'trusteeship',
                        scopedSlots: {
                            customRender: 'trusteeship'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        width: '20%',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                page_size:10,
                page:1,
                total:0,
                selectedRowKeys:[],
                noticeObj:{
                    text:'',
                    room_id:[]
                },
                emojiList: emoji.emojiList,
                replyList:[],
                welcomeList:[],
                collocationStatus:'',
                selectRoomId:'',
                departmentList:[],
                disableDepartment:true,
                clientHeight:''
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            this.globalClick(this.closeEmoji);
            window.addEventListener('resize',this.autoHeight,false)
        },
        watch:{
            roomList:function(){
                let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
                let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部 
                this.$nextTick(function(){
                    if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                        this.heightFlg = true;
                        this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight + 45;
                    }else{
                        this.heightFlg = false;
                    }
                });
            }
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        computed: {
            emojiFlag() {
                return this.$store.state.liveChat.emojiFlag
            },
            
        },
        methods: {
            moment,
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
             managerChange(val){
                //选择客户经理
                 this.queryParam.user_id = val;
                 this.page = 1
                 this.page_size = 10
                 this.getWeChat(val)
            },
            choseWeChat(index){//选择微信号
                this.queryParam.assistant_id = this.weChatList[index].username;
                this.page = 1
                this.page_size = 10
                this.getRoomList()
            },
            qrExpireTime(expire_time){
                return comConf.compareTime(expire_time,comConf.formatDate(new Date()))
            },
            getExpireQR(el){
                comConf.isOfflineRobot(el.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2020,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:el.room_owner,//指令消息的接收者。发送给对应的客户端连接ID
                    cmdData:{
                        username:el.room_wx_id
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2020 = msg=>{
                    if(msg.status==2&&msg.callbackMsg=='成功'){
                        this.getRoomList()
                    }else if(msg.status==4) {
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
            },
            toggle() {
                this.expand = !this.expand
            },
            clear() {
                this.disableDepartment = true
                this.queryParam = {
                    department_id:this.$store.state.user.user.department.id || this.departmentList[0].key,
                    user_id:'0',
                    key:'',
                    label:[],
                    weChat:'',
                    assistant_id:'0'
                }
                //this.getRoomList()
                this.getUserList()
            },
            exportContact() {
                location.href = '/index.php?r=uc/customer/export-friends&key=' + this.queryParam.key +  '&label='+  this.queryParam.label
            },
            collocation(record){
                //托管
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/room-switch',
                    data:{
                        roomId:record.id,
                        status:record.trusteeship=='1'?'10':'0'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.getRoomList()
                    }
                });
            },
            collocationAll(){
                this.collocationStatus = '1'
                if(this.selectedRowKeys.length==0) {
                    this.$message.warning('请选择对应的群')
                    return
                }
                this.welcomeList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.replyList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.getWelcomeList()
                this.getReplyList()
                this.collocation_visible = true;
            },
            collocationOne(record) {
                this.selectRoomId = record.id
                this.collocationStatus = '2'
                this.welcomeList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.replyList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.getWelcomeList(record)
                this.getReplyList(record)
                this.collocation_visible = true;
            },
            notice(item){
                //公告
                this.noticeObj.room_id = []
                this.com_visible = true;
                this.noticeObj.room_id.push(item.id)
                this.$nextTick(_=>{
                    this.$refs.div_edit.clearContent()
                    this.$forceUpdate()
                })
            },
            noticeSendAll(){
                if(this.selectedRowKeys.length==0) {
                    this.$message.warning('请选择对应的群')
                    return
                }
                this.com_visible = true;
                this.noticeObj.room_id = this.selectedRowKeys
            },
            roomNotice() {
                let _this =this
                if(this.noticeObj.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
                    this.$message.warning('不能发送空白公告')
                    return
                }
                let arr = []
                this.roomList.forEach(el=>{
                    this.noticeObj.room_id.forEach(item=>{
                        if(el.id==item) {
                            arr.push(el)
                        }
                    })
                })
                arr.forEach(el=>{
                    comConf.isOfflineRobot(el.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    let data = {
                        cmd:2021,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:el.room_owner,
                        cmdData:{
                            username:el.room_wx_id,
                            noticeContent :emoji.htmlToString(this.noticeObj.text)
                        }
                    }
                    this.$ws.sendMsgFun(data)
                })
                this.$ws.cmd2021 = msg=>{
                    if(msg.status==4) {
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
                this.com_visible = false
                this.noticeObj = {
                    text:'',
                    room_id:[]
                }
                this.selectedRowKeys = []
            },
            com_handleCancel(){
                this.com_visible = false;
            },
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.selectedRowKeys = []
                this.getRoomList()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.selectedRowKeys = []
                this.getRoomList()
            },
            handleSubmit() {
                this.page = 1
                this.page_size = 10
                this.getRoomList()
            },
            getAllRoomLabel() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/room-label-all',
                    data:{
                        department_id:this.queryParam.department_id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.labelList = udata.data
                    }
                });
            },
            getRoomList() {
                console.log(this.queryParam)
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/room-list',
                    data:Object.assign(this.queryParam,{p:this.page,n:this.page_size})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.roomList = udata.data.list
                        this.total = parseInt(udata.data.count)
                    } else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            getDetail(record) {
                this.$router.push({path:'/home/groupDetails',query:{'id':record.id,'department_id':this.queryParam.department_id,'user_id':record.user_id}});
            },
            sendMsg(id,user_id,username) {
                storage.store.set('menuNav','聚合聊天')
                this.$router.push({path:'/liveChat',query:{'id':id,'user_id':user_id,type:'room',username:username}});
            },
            upInfo() {
                this.getRoomList()
            },
            imgExists(e) {
                console.log('imgLoadError')
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
            /*表情 start*/
            showEmoji() {
                this.$store.commit('liveChat/setEmojiFlag', !this.emojiFlag)
            },
            closeEmoji() {
                this.$store.commit('liveChat/setEmojiFlag', false)
            },
            emojiAdd(e) {
                document.getElementById('notice_area').focus()
                let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='" + e.currentTarget.attributes.title_name.nodeValue + "'>"
                this.emojiAddInPosition(html)
                this.$refs.div_edit.changeTxt()
            },
            emojiAddInPosition(html, t) {
                let sel, range;
                if(t || this.getRange(), window.getSelection) {
                    !t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)), range.deleteContents();
                    sel = window.getSelection(); //返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
                    let frag, node, lastNode;
                    if(range.createContextualFragment) {
                        frag = range.createContextualFragment(html)
                    } else {
                        let el = document.createElement("div");
                        el.innerHTML = html;
                        frag = document.createDocumentFragment()
                        while((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                    }
                    let ran = frag.lastChild;
                    range.insertNode(frag);
                    range.setStartAfter(ran); //重新定位range（光标位置）
                    sel.removeAllRanges(); //清除所有选中
                    sel.addRange(range); //将新定位的range加入
                    let x = document.getElementById('notice_area')
                    let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
                    x.scrollTop < l && (x.scrollTop = l)
                } else if(document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            getSel() {
                window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
            },
            getRange() {
                this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
            },
            setRange() {
                let x = document.getElementById('notice_area')
                var e, t;
                document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            /*表情 end*/
            getWelcomeList(record) {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/welcome-list',
                    params:{
                        departmentId:this.queryParam.department_id,
                        all:'1',
                        type:'20'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.welcomeList = udata.data.list
                        if(this.selectedRowKeys.length==1&&this.collocationStatus=='1') {
                            let id= ''
                            this.roomList.forEach(el=>{
                                if(el.id==this.selectedRowKeys[0]) {
                                    id = el.welcome.list.length&&el.welcome.list[0].id
                                }
                            })
                            this.welcomeList.forEach(el=>{
                                if(el.id==id) {
                                    this.$set(el,'check',true)
                                }
                            })
                        }
                        if(this.collocationStatus=='2'&&record.welcome.list.length!=0) {
                            this.welcomeList.forEach(el=>{
                                if(el.id==record.welcome.list[0].id) {
                                    this.$set(el,'check',true)
                                }
                            })
                        }
                    }
                });
            },
            getReplyList(record) {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/reply-list',
                    params:{
                        departmentId:this.queryParam.department_id,
                        all:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.replyList = udata.data.list
                        if(this.selectedRowKeys.length==1&&this.collocationStatus=='1') {
                            let id= ''
                            this.roomList.forEach(el=>{
                                if(el.id==this.selectedRowKeys[0]) {
                                    id = el.auto_reply.length&&el.auto_reply.list[0].id
                                }
                            })
                            this.replyList.forEach(el=>{
                                if(el.id==id) {
                                    this.$set(el,'check',true)
                                }
                            })
                        }
                        if(this.collocationStatus=='2'&&record.auto_reply.list.length!=0) {
                            this.replyList.forEach(el=>{
                                if(el.id==record.auto_reply.list[0].id) {
                                    this.$set(el,'check',true)
                                }
                            })
                        }
                    }
                });
            },
            handleTagChange(item,index,checked,type) {
                if(type=='1') {
                    this.welcomeList.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.welcomeList[index],'check',checked)
                } else if(type=='2') {
                    this.replyList.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.replyList[index],'check',checked)
                }
                this.$forceUpdate()
            },
            handleTagOk() {
                let _this =this
                let welcomeId = []
                let replyId =[]
                this.welcomeList.forEach(el=>{
                    if(el.check) {
                        welcomeId.push(el.id)
                    }
                })
                this.replyList.forEach(el=>{
                    if(el.check) {
                        replyId.push(el.id)
                    }
                })
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/bind-room',
                    data:{
                        roomIds:this.collocationStatus=='1'?this.selectedRowKeys:[this.selectRoomId],
                        welcomeId:welcomeId[0],
                        replyId:replyId[0],
                        type:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.collocation_visible=false
                        this.$message.success('设置成功')
                        this.selectedRowKeys = []
                        this.getRoomList()
                    }
                });
            },
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                console.log(this.$store.state.user.department)
                this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
                this.getAllRoomLabel()
                this.getUserList()
            },
            listToTree(list,val) {
//              将部门列表转换为tree所用数据
                let array = []
                list.forEach((el,idx)=>{
                    if(el.children && el.children.length > 0) {
                        el.children =this.listToTree(el.children,idx)
                    }
                    array.push({title:el.name,key:el.id,value:el.id,children:el.children})
                })
                return array
            },
            onSelect(selectedKeys, info) {
                this.$store.state.user.user.department.id===selectedKeys?this.disableDepartment = true:this.disableDepartment = false;
                this.page = 1
                this.page_size = 10
                this.queryParam.label = []
                this.queryParam.department_id = selectedKeys
                this.getUserList(selectedKeys)
                this.getAllRoomLabel()
            },
            getWeChat(val){
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/user-assistant',
                    data:{user_id:val}
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        this.weChatList = udata.data;
                        this.weChatList.length?this.queryParam.assistant_id = udata.data[0].username:this.queryParam.assistant_id='0';
                        this.weChatList.length?this.queryParam.weChat = 0:this.queryParam.weChat = '无匹配结果'
                        this.getRoomList()
                    }
                })
            },
            getUserList(){
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
        }
        ,created(){
//          this.getAllRoomLabel()
//          this.getRoomList()
            this.treeList()
//            this.$ws.cmd2020 = msg=> {
//                if(msg.callbackMsg=='成功'){
//                    this.getRoomList()
//                }
//            }
        },
        beforeDestroy() {
            this.$ws.cmd2020 = null
            this.$ws.cmd2021 = null
            window.removeEventListener('resize')
        }
    }
</script>
