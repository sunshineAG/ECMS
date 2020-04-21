<style lang="less" scoped>
    .customer-list {
        // background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 20px;
        }
        .content {
            padding: 0 20px;
        }
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .clr:after {
        display: block;
        height: 0;
        content: "";
        visibility: hidden;
        clear: both;
    }
    .headNav {
        padding: 10px 20px;
        height: 70px;
        line-height: 50px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .groupMsg {
        /* height: 260px; */
        margin-top: 10px;
        padding: 10px 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .groupMsg-fn {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px dashed #ccc;
    }
    .groupMsg-fn:nth-child(2){
        border:1px solid #000;
    }

    .groupMsg-content{
        padding-top:20px;
        padding-left:20px
    }
    .tipFlg{
        /* width:120px; */
        padding:0 10px;
        height:30px;
        line-height:30px;
        background:rgba(0, 0, 0, .8);
        position:absolute;
        top:-4px;
        left:100px;
        border-radius:6px;
        color:#fff;
        text-align:center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .edit,.edit_notice{
        cursor: pointer;
        font-size:18px;
        margin-left:10px;
    }
    .edit_notice{
        margin-top:10px;
    }
    .atrUrlImg{
        width:50px;
        height:50px;
        display:inline-block;
        border:1px solid #ccc;
        border-radius:5px;
    }
    .groupNotic{
        width:330px;
    }
    .groupNoticOther{
        border:1px solid #40a9ff;
        padding:2px;
        border-radius:10px;
    }
    @media all and (max-width:1024px){
        .atrUrlImg{color:#f00;}
        .groupNotic{
            width:170px;
        }
    }
    .tag{
        border:1px solid #40a9ff;
        border-radius:2px;
        padding:4px;
        margin-right:2px;
        /* height:20px;
        line-height:20px; */
    }
    .tag-close{
        color:#40a9ff;
        cursor: pointer;
    }
    .ant-input-disabled{
        background:#fff;
        border:1px solid #fff;
        color:#000;
    }
    .goGrouptext{
        text-decoration:none;
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
    .input-content1 {
        // min-height: 100px;
        padding: 0 0 10px 0;
        width: 100%;
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
            width: 100%;
            #groupNotice {
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
</style>
<style>
    .room_notice_width .ant-form-item-control-wrapper {
        width: calc(100% - 80px);
    }
    .room_notice_width p img {
        vertical-align: middle;
    }
</style>
<template>
    <div class="customer-list">
        <div>
            <a-button type="default" icon="left" @click="goBack">返回</a-button>
        </div>
        <br>
        <div class="headNav">
            <div style="display: inline-block;">
                <img src="../../assets/room_avatar.png" @error="imgExists($event)" style="width: 48px;height: 48px;border-radius: 5px;margin-right: 25px">
                <a-input style="width: 200px" length="10"   @blur="titleShow"  @keyup.enter="changeRoomName" v-model="roomName_Notice" v-if="inptFlg"></a-input>
                <a-button type="primary" style="margin-left:6px;" @click="changeRoomName()" v-if="inptFlg">保存</a-button>
                <span  v-if="!inptFlg">{{room_name}} <a-icon type="edit" @click="changeText" class="edit" size="18"></a-icon></span>
            </div>
            <div style="display: inline-block;float: right">
                <span>所属：{{$store.state.user.user.department.name}}</span>
                <span style="padding:0 10px 0 50px">建群时间：{{created}}</span>
            </div>
        </div>
        <a-form
            layout="inline"
            :form="form"
        >
            <div class="groupMsg">
                <div class="groupMsg-fn clr">
                    <span class="fl">群信息</span>
                    <a-button type="primary" class="fr" style="margin-top:6px;" @click="editGroupMsg()" v-if="!grpMsgFlg">编辑</a-button>
                    <a-button type="primary" class="fr" style="margin-top:6px;" @click="saveGroup()" v-if="grpMsgFlg">保存</a-button>
                </div>
                <div class="groupMsg-content">
                    <a-row>
                        <a-col span="12">
                            <a-form-item  label="群主" style="display:block">
                                {{assistant_nickname}}
                            </a-form-item>
                            <a-form-item label="群标签" class="clr">
                                <a-tag v-for="(item,index) in label_own" :closable="true" :key="index"  @close="closeTag($event,item,index)" style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">{{item.label_name}}</a-tag>
                                <a-tag @click="addTag('1')">添加<a-icon type="plus" style="margin-right: 2px"/></a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-item label="群公告" icon="edit" style="width: 100%" class="room_notice_width">
                                <div class="clr">
                                    <p v-if="!grpMsgFlg" v-html="RoomNotice.text" style="max-height: 100px;overflow: auto"></p>
                                    <!--<a-input v-else type="textarea"   v-model="RoomNotice" class="groupNotic" style="min-width:100px;padding-top:8px;" :autosize="{ minRows: 4, maxRows: 6 }" placeholder='暂无公告内容'/>-->
                                    <div class="input-content1" :style="{'position': 'relative','visibility':grpMsgFlg?'visible':'hidden','height':grpMsgFlg?'auto':'0'}">
                                        <div class="tools">
                                            <div>
                                                <a-icon type="smile" @click="showEmoji()" id="showEmoji" />
                                                <div v-if="emojiFlag" id="emoji">
                                                    <a href="javascript:;" v-for="(item,index) in emojiList"  v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-content-area" >
                                            <div-edit-area id="groupNotice" :formItem="RoomNotice" ref="groupNotice" @change='getSel()' style="height: 70px;min-height: auto;"></div-edit-area>
                                        </div>
                                    </div>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col span="4">
                            <a-form-item label="群码">
                                <div style="width: 100px;height: 100px;display: inline-block;vertical-align: top;margin-right: 5px;border-radius: 8px;position: relative">
                                    <img :src="qr_code" alt="" style="width: 100px;height: 100px;">
                                    <div v-if="!is_expire_time" style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,0.4);z-index: 10;">
                                        <div style="width: 24px;height: 24px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 11;background: #ffffff;cursor: pointer" @click="roomQrcodeRefresh()">
                                            <a-icon type="reload" style="font-size: 20px;color: #000000;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"/>
                                        </div>
                                    </div>
                                </div>
                                <!--<img :src="qr_code" alt="" style="width: 100px;height: 100px"/>-->
                            </a-form-item>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="groupMsg">
                <div class="groupMsg-fn">
                    <span>托管信息</span>
                </div>
                <div class="groupMsg-content">
                     <a-row>
                        <a-col span="24">
                            <a-form-item label="欢迎语" >
                                <a-tag v-for="(item,index) in welcome_own" :closable="true" :key="index"  @close="closeWelcome($event,item,index)" style="margin-bottom: 10px">{{item.name}}</a-tag>
                                <a-tag @click="addTag('2')" style="padding: 0 20px">{{welcome_own.length=='0'?'添加':'更改'}}</a-tag>
                            </a-form-item>

                        </a-col>

                    </a-row>
                    <a-row>
                        <a-col span="24">
                            <a-form-item label="关键词回复" style="display:block">
                                <a-tag v-for="(item,index) in auto_reply_own" :closable="true" :key="index"  @close="closeKeyWord($event,item,index)" style="margin-bottom: 10px">{{item.class_name}}</a-tag>
                                <a-tag @click="addTag('3')" style="padding: 0 20px">{{auto_reply_own.length=='0'?'添加':'更改'}}</a-tag>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-form>
        <div style="margin-bottom:4px;background:#fff;margin-top:10px;">
            <div>
                <a-table
                    filterMultiple="true"
                    type="checkbox "
                    :columns="columns"
                    :dataSource="room_user"
                    :pagination="false"
                >
                    <template
                        slot="header_img_url"
                        slot-scope="text, record, index"
                    >
                        <div>
                            <img
                                :src="text"
                                @error="imgExists($event)"
                                style="width: 48px;height: 48px;border-radius: 5px"
                            />
                        </div>
                    </template>
                    <template
                        slot="avatar_type"
                        slot-scope="text, record, index"
                    >
                        <div style="position:relative">
                            <a-tooltip placement="right">
                                <template slot='title'>
                                    <a-avatar :size="30" :src="record.inviter_id.header_img_url" style="vertical-align: middle"/>
                                    <span style="display: inline-block;vertical-align: middle">{{record.inviter_id.nickname}}</span>
                                </template>
                                <a href="javascript:;" class="goGrouptext">
                                    {{record.inviter_text}}
                                </a>
                            </a-tooltip>
                            <!--<span v-else style="color: rgb(16, 16, 16)">扫码入群</span>-->
                        </div>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <a-popconfirm title="你确定要添加吗？" placement="top" @confirm="addFriend(record)" okText="确定" cancelText="取消" v-if="record.role=='2'&&room_owner!=record.username&&record.username.indexOf('@openim')=='-1'">
                            <a href="javascript:void(0);" style="padding-right: 15px;" >添加好友</a >
                        </a-popconfirm>
                        <a-popconfirm :title="record.in_black_list=='1'?'你确定要移除黑名单吗？':'你确定要加入黑名单吗？'" placement="top" @confirm="blackFriend(record)" okText="确定" cancelText="取消" v-if="room_owner!=record.username">
                            <a href="javascript:void(0);"style="padding-right: 15px;">
                                <span v-if="record.in_black_list=='1'" style="color: rgba(242, 126, 117, 1)">移除黑名单</span>
                                <span v-if="record.in_black_list=='0'" style="color: rgba(89, 88, 88, 1) ">加入黑名单</span>
                            </a>
                        </a-popconfirm>
                        <a-popconfirm title="你确定要踢出吗？" placement="top" @confirm="deletefriend(record)" okText="确定" cancelText="取消"  v-if="room_owner!=record.username">
                            <a href="javascript:void(0);" style="padding-right: 15px;color: rgba(89, 88, 88, 1)" >踢出</a >
                        </a-popconfirm>
                    </template>
                </a-table>
                <br />
                <a-pagination
                    showQuickJumper
                    showSizeChanger
                    :showTotal="total => `总共${total}条`"
                    v-model="page"
                    :pageSize="page_size"
                    :total="total"
                    :pageSizeOptions="['10', '20', '30', '40', '50']"
                    @change="onChange"
                    @showSizeChange="onShowSizeChange"
                    style="text-align: right"
                />
                <br/>
            </div>
        </div>
        <a-modal :title="modalFlg === '1'?'选择标签':modalFlg === '2'?'选择欢迎语':'选择关键词'" @ok="handleTagOk"  :visible="com_visible" @cancel="com_handleCancel" width="50%" style="padding-bottom:20px">
            <div class="tag-modal">
                <a-checkable-tag v-for="(item,index) in modalFlg === '1' ? label_all:modalFlg === '2' ? welcome_all : auto_reply_all"  :key="index" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked)" :class="['tag-color' + item.color_id]">
                    {{modalFlg === '1'?item.title:modalFlg === '2'?item.name:item.class_name}}
                </a-checkable-tag>
            </div>
        </a-modal>
    </div>
</template>
<script>
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
    import divEditArea from '../../components/dataManage/divEditArea.vue'
    export default {
        name: "",
        components:{divEditArea},
        data() {
            return {
                // form: this.$form.createForm(this),
                id:this.$route.query.id,
                department_id:this.$route.query.department_id,
                user_id:this.$route.query.user_id,
                inptFlg:false,
                grpMsgFlg:false,
                hasMsgFlg:false,
                modalFlg:'',
                com_visible:false,
                room_name:'',
                qr_code:'',//群二维码
                created:'',//建群时间
                RoomNotice:{
                    text:''
                },//群公告
                label_all:[],
                label_own:[],//选择标签数据
                welcome_all:[],//欢迎语list
                welcome_own:{},//选择欢迎语
                auto_reply_all:[],//关键词列表
                auto_reply_own:[],//选择的选择的关键词
                room_user: [],//群成员列表
                room_owner:'',
                room_wx_id:'',
                assistant_nickname:'',
                columns: [
                    {
                        title: "微信头像",
                        dataIndex: "header_img_url",
                        align: "center",
                        scopedSlots: {
                            customRender: "header_img_url"
                        }
                    },
                    {
                        title: "微信号",
                        align: "center",
                        dataIndex: "username"
                    },
                    {
                        title: "微信昵称",
                        align: "center",
                        dataIndex: "nickname"
                    },
                    {
                        title: "微信备注",
                        align: "center",
                        dataIndex: "remark"
                    },
                    {
                        title: "进群时间",
                        align: "center",
                        dataIndex: "created"
                    },
                    {
                        title: "进群方式",
                        dataIndex: "avatar_type",
                        align: "center",
                        scopedSlots: {
                            customRender: "avatar_type"
                        }
                    },
                    {
                        title: "操作",
                        dataIndex: "action",
                        align: "center",
                        scopedSlots: {
                            customRender: "action"
                        }
                    }
                ],
                page_size: 10,
                page: 1,
                total: 0,
                roomName_Notice:'',
                is_expire_time:1,
                emojiList: emoji.emojiList,
            };
        },
        mounted() {
            this.$store.dispatch("setting/getBreadcrumb", this.$route);
            this.globalClick(this.closeEmoji);
        },
        updated() {
            this.$store.dispatch("setting/getBreadcrumb", this.$route);
        },
        computed: {
            emojiFlag() {
                return this.$store.state.liveChat.emojiFlag
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this);
            this.form.getFieldDecorator('notic', {
                initialValue: ['']
            });
        },
        methods: {
            goBack() {
                this.$router.push({ path: "/home/groupList" });
            },
            titleShow(){
                setTimeout(_=>{
                    this.inptFlg = false;
                },300)
            },
            changeRoomName() {
                comConf.isOfflineRobot(this.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2018,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.room_owner,
                    cmdData:{
                        username:this.room_wx_id,
                        nickname :this.roomName_Notice
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2018=(wsMsg)=> {
                    if(wsMsg.status==2) {
                        this.$message.success('修改群名成功')
                        this.room_name = this.roomName_Notice
                    }else if(wsMsg.status==4){
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:wsMsg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                        this.room_name = this.roomName_Notice
                    }
                }
            },
            changeText(){
                this.inptFlg = true;
                this.roomName_Notice = this.room_name
            },
            editGroupMsg(idx){
                //编辑群信息
                this.grpMsgFlg = true
                this.roomName_Notice = this.RoomNotice.text
            },
            saveGroup(idx){
                // if(this.RoomNotice.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
                //     this.$message.warning('不能发送空白公告')
                //     return
                // }
                this.grpMsgFlg = false
                comConf.isOfflineRobot(this.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2021,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.room_owner,
                    cmdData:{
                        username:this.room_wx_id,
                        noticeContent :emoji.htmlToString(this.RoomNotice.text)
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2021=(wsMsg)=> {
                    if(wsMsg.status==2||wsMsg.status==3) {
                        if(wsMsg.callbackMsg=='公告发送成功') {
                            this.$message.success('修改公告成功')
                        }
                        this.RoomNotice = {
                            text:this.RoomNotice.text
                        };
                    }else if(wsMsg.status==4){
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:wsMsg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                        this.RoomNotice.text = this.roomName_Notice
                    }else if(wsMsg.status!=1){
                        this.RoomNotice.text = this.roomName_Notice
                    }
                }
            },
            addTag(idx){
                if(idx=='1') {
                    this.label_all.forEach(el=>{
                        this.label_own.forEach(item=>{
                            if(el.id==item.label_id) {
                                el.check = true
                            }
                        })
                    })
                } else if(idx=='2') {
                    this.welcome_all.forEach(el=>{
                        this.welcome_own.forEach(item=>{
                            if(el.id==item.id) {
                                el.check = true
                            }
                        })
                    })
                }else if(idx=='3') {
                    this.auto_reply_all.forEach(el=>{
                        this.auto_reply_own.forEach(item=>{
                            if(el.id==item.id) {
                                el.check = true
                            }
                        })
                    })
                }
                this.com_visible = true;
                this.modalFlg = idx;
            },
            handleTagChange(item,index,checked) {
                if(this.modalFlg=='1') {
                    item.check = checked
                    this.$set(this.label_all,index,item)
                } else if(this.modalFlg=='2') {
                    this.welcome_all.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.welcome_all[index],'check',checked)
                }else if(this.modalFlg=='3') {
                    this.auto_reply_all.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.auto_reply_all[index],'check',checked)
                }
                this.$forceUpdate()
            },
            handleTagOk() {
                let _this =this
                if(this.modalFlg=='1') {
                    let labelIds = []
                    this.label_all.forEach(el=>{
                        if(el.check) {
                            labelIds.push(el.id)
                        }
                    })
                    if(labelIds.length==0) {
                        this.$message.warning('请选择对应的标签')
                        return
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/customer/room-label-up',
                        data:{
                            roomId:this.id,
                            labelIds:labelIds
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.com_visible=false
                            this.$message.success('设置标签成功')
                            this.getRoomDetails()
                        }else{
                        this.$message.warn(udata.msg)
                    }
                    });
                } else if(this.modalFlg=='2') {
                    let welcomeId = []
                    this.welcome_all.forEach(el=>{
                        if(el.check) {
                            welcomeId.push(el.id)
                        }
                    })
                    if(welcomeId.length==0) {
                        this.$message.warning('请选择对应的欢迎语')
                        return
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/sale/bind-room',
                        data:{
                            roomIds:[this.id],
                            welcomeId:welcomeId[0]
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.com_visible=false
                            this.$message.success('设置欢迎语成功')
                            this.getRoomDetails()
                        }else{
                        this.$message.warn(udata.msg)
                    }
                    });
                }else if(this.modalFlg=='3') {
                    let replyId = []
                    this.auto_reply_all.forEach(el=>{
                        if(el.check) {
                            replyId.push(el.id)
                        }
                    })
                    if(replyId.length==0) {
                        this.$message.warning('请选择对应的关键词')
                        return
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/sale/bind-room',
                        data:{
                            roomIds:[this.id],
                            replyId:replyId[0]
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.com_visible=false
                            this.$message.success('设置关键词成功')
                            this.getRoomDetails()
                        }else{
                        this.$message.warn(udata.msg)
                    }
                    });
                }

            },
            com_handleCancel(){
            //modal 关闭
                this.com_visible = false;
            },
            addFriend(item) {
                comConf.isOfflineRobot(this.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2037,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.room_owner,
                    cmdData:{
                        username:item.username,
                        roomId :this.room_wx_id,
                        type:14,
                        verMsg:''
                    }
                }
                this.$ws.sendMsgFun(data)
            },
            deletefriend(item) {
                comConf.isOfflineRobot(this.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2015,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.room_owner,
                    cmdData:{
                        username:this.room_wx_id,
                        memberIds :[item.username],
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2015=(wsMsg)=> {
                    if(wsMsg.status==2) {
                        this.$message.success('已移除群聊')
                    }else if(wsMsg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:wsMsg.callbackMsg
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
            blackFriend(item) {
                let data;
                if(item.in_black_list=='0') {
                    data = {
                        department_id:this.department_id,
                        nickname:item.nickname
                    }
                }else {
                    data = {
                        department_id:this.department_id,
                        nickname:item.nickname,
                        del:'1'
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-update',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(item.in_black_list=='0') {
                            item.in_black_list = 1
                        }else {
                            item.in_black_list = 0
                        }
                        this.$message.success('操作成功')
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            imgExists(e) {
                console.log("imgLoadError");
                let imgUrl = this.$store.state.user.user.default_url;
                let img = new Image();
                //判断图片大小是否大于0 或者 图片高度与宽度都大于0
                img.onload = function() {
                    if (img.filesize > 0 || (img.width > 0 && img.height > 0)) {
                        e.target.src = imgUrl;
                        img = null;
                    }
                };
                img.src = imgUrl;
            },
            getRoomDetails() {
                this.$axios({
                    method: "GET",
                    url: "/index.php?r=uc/customer/room-details",
                    params: {
                        roomId:this.id,
                        department_id:this.department_id,
                        user_id:this.user_id,
                    }
                }).then(res => {
                    let udata = res.data;
                    if (udata.status == 1) {
                        this.room_name = udata.data.room_name;
                        this.qr_code = udata.data.qr_code;
                        this.created = udata.data.created;
                        this.RoomNotice = {
                            text:emoji.stringToHtml(udata.data.RoomNotice)
                        };
                        this.label_all = udata.data.label_all;
                        this.label_own = udata.data.label_own;
                        this.welcome_all = udata.data.welcome_all;
                        this.welcome_own = udata.data.welcome_own;
                        this.auto_reply_all = udata.data.auto_reply_all;
                        this.auto_reply_own = udata.data.auto_reply_own;
                        this.room_owner = udata.data.room_owner;
                        this.room_wx_id = udata.data.room_wx_id;
                        this.assistant_nickname = udata.data.assistant_nickname
                        this.is_expire_time = comConf.compareTime(udata.data.qr_code_expire_time,comConf.formatDate(new Date()))
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            closeTag(e,item,index) {
                let _this =this;
                e.preventDefault()
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/room-label-del',
                    data:{
                        roomId:this.id,
                        labelId:item.label_id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.label_own.splice(index,1)
                        this.$message.success('删除成功')
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            closeWelcome(e,item,index) {
                let _this =this;
                e.preventDefault()
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/room-trusteeship-del',
                    data:{
                        room_id:this.id,
                        welcome_id:item.id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.welcome_own.splice(index,1)
                        this.$message.success('删除成功')
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            closeKeyWord(e,item,index) {
                let _this =this;
                e.preventDefault()
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/room-trusteeship-del',
                    data:{
                        room_id:this.id,
                        auto_reply_id:item.id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.auto_reply_own.splice(index,1)
                        this.$message.success('删除成功')
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            getRoomUser() {
                this.$axios({
                    method: "GET",
                    url: "/index.php?r=uc/customer/room-details-user",
                    params: {
                        roomId:this.id,
                        p:this.page,
                        n:this.page_size,
                    }
                }).then(res => {
                    let udata = res.data;
                    if (udata.status == 1) {
                        this.room_user = udata.data.room_user;
                        this.total = parseInt(udata.data.room_user_count);
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getRoomUser()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getRoomUser()
            },
            roomQrcodeRefresh() {
                this.$ws.cmd2020 = null
                let data = {
                    cmd:2020,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.room_owner,//指令消息的接收者。发送给对应的客户端连接ID
                    cmdData:{
                        username:this.room_wx_id
                    },
                    priority:0
                }
                comConf.isOfflineRobot(this.room_owner,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2020 = msg=>{
                    if(msg.callbackMsg=='成功'){
                        this.getRoomDetails()
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
            /*表情 start*/
            showEmoji() {
                this.$store.commit('liveChat/setEmojiFlag', !this.emojiFlag)
            },
            closeEmoji() {
                this.$store.commit('liveChat/setEmojiFlag', false)
            },
            emojiAdd(e) {
                document.getElementById('groupNotice').focus()
                let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='" + e.currentTarget.attributes.title_name.nodeValue + "'>"
                this.emojiAddInPosition(html)
                this.$refs.groupNotice.changeTxt()
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
                    let x = document.getElementById('groupNotice')
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
                let x = document.getElementById('groupNotice')
                var e, t;
                document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            /*表情 end*/
        },
        created() {
            this.getRoomDetails()
            this.getRoomUser()
            this.$ws.cmd2037=(wsMsg)=> {
                if(wsMsg.status==2) {
                    this.$message.info(wsMsg.callbackMsg)
                }else if(wsMsg.status==4) {
                    this.$notification.warning({
                        message: h=>{
                            return h('div', {
                                domProps: {
                                    innerHTML:wsMsg.callbackMsg
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
        beforeDestroy() {
            this.$ws.cmd2015 = null
            this.$ws.cmd2018 = null
            this.$ws.cmd2020 = null
            this.$ws.cmd2021 = null
            this.$ws.cmd2037 = null
        }
    };
</script>
