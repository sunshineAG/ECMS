<template>
    <!-- <div></div> -->
    <a-dropdown
        style="display: inline-block; height: 100%; vertical-align: initial"
        :visible="dropdownFlg ? true : false"
        ondragstart="return false"
    >
        <div style="cursor: pointer;" class="clr" ondragstart="return false">
            <a-tooltip>
                <template slot="title">
                    帮助手册
                </template>
                <span style="float:left;margin-right:20px;padding-top:2px;"  @click="navToHelp()" >
               <a-icon type="question-circle" class="question" theme='filled'></a-icon>
            </span>
            </a-tooltip>
            <!--<span style="float:left;margin-right:20px;padding-top:2px;"  @click="navToHelp()" >-->
               <!--<a-icon type="question-circle" class="question" theme='filled'></a-icon>-->
                <!--帮助手册-->
            <!--</span>-->
            <div  @click="tagger" style="float:right" ondragstart="return false">
                <a-avatar class="avatar" shape="circle" :src="currUser.avatar" />
                <span style="position: relative">
                    <span class="login-nickname">{{ currUser.nickname }}</span>
                    <span class="login-status" :style="{'color':login_status=='1'?'#259B24':login_status=='2'?'#F9AF2C':'#919191','font-size':'12px'}">{{userStatus.text}}</span>
                </span>
                <a-icon
                    :type="dropdownFlg ? 'up' : 'down'"
                    style="font-size:14px;"
                ></a-icon>
            </div>
        </div >
        <a-menu
            style="width: 228px;display:block;padding:0;"
            slot="overlay"
            :style="{ width: userSet||replySet ? '430px' : '228px' }"
        >
            <a-menu-item class="topTitle">
                <div>
                    <span>{{ currUser.nickname }}</span>
                    <a-dropdown  style="display: inline-block; height: 100%; vertical-align: initial;">
                        <span style="float: right;">
                            <a-icon :type="userStatus.icon" theme="filled" :class="[userStatus.clas]" style="margin-right: 6px"></a-icon>
                            <span style="margin-right: 8px">{{userStatus.text}}</span>
                            <a-icon type="caret-down"  style="font-size:14px;float:right;padding-top:8px;"  ></a-icon>
                        </span>
                        <a-menu slot="overlay" style="display:block;padding:0;background:#0b515d;color:#fff;box-shadow:0 0 2px rgba(12,176,160,.1);margin-left: -12px;width: 80px">
                            <a-menu-item  class="tipMenu" @click="changeStatus(1)" v-if="login_status!=1">
                                <div> <a-icon type="check-circle" theme="filled" class="onlineIcon"></a-icon> 在线</div>
                            </a-menu-item>
                            <a-menu-item  class="tipMenu" @click="changeStatus(2)" v-if="login_status!=2">
                                <div> <a-icon type="minus-circle" theme="filled" class="busyIcon"></a-icon> 忙碌</div>
                            </a-menu-item>
                            <a-menu-item  class="tipMenu" @click="changeStatus(0)" v-if="login_status!=0">
                                <div> <a-icon type="close-circle" theme="filled" class="outlinIcon" ></a-icon> 离线</div>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
                <div>{{ currUser.tel }}</div>
            </a-menu-item>
            <!-- <a-menu-item v-if="!flg">
                <div @click.stop="change">
                    <span>聊天转接</span>
                    <a-icon type="right" class="icon" />
                </div>
            </a-menu-item> -->
            <a-menu-item v-if="mangflg" class="userSet">
                <p
                    @click.stop="change"
                    style="font-size:18px;padding:4px 0;margin-bottom:2px;"
                >
                    <a-icon type="left"></a-icon>
                    <span>转接客户经理</span>
                </p>
                <div>
                    <a-select
                        @change="handleLabelChange"
                        style="width: 200px;"
                        placeholder="请选择客户经理"
                    >
                        <a-select-option
                            v-for="(item, idx) in managerList"
                            :key="item.id"
                        >
                            {{ item.user_name }}
                        </a-select-option>
                    </a-select>
                </div>
            </a-menu-item>
            <a-menu-item v-if="!flg">
                <div @click.stop="handleSubmitChange('1')">
                    <span>个人设置</span>
                    <a-icon type="right" class="icon" />
                </div>
            </a-menu-item>
            <a-menu-item v-if="!flg">
                <div @click.stop="handleSubmitChange('2')">
                    <span>自动回复</span>
                    <a-icon type="right" class="icon" />
                </div>
            </a-menu-item>
            <a-menu-item v-if="!flg" @click="navToHelp()">
                <span>使用教程</span>
            </a-menu-item>
            <a-menu-item v-if="flg&&userSet" class="userSet">
                 <p style="font-size:18px;padding:4px 0;" @click.stop="handleBack('1')">
                    <a-icon type="left"></a-icon>
                    <span class="icon" style="padding-left:330px">个人设置</span>
                </p>
                <div class="userInfo">
                    <a-form @submit.stop="handleSubmit" :form="form">
                        <a-form-item
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 18 }"
                            label="用户名"
                            style="margin-bottom: 5px"
                        >
                            <a-input
                                v-model="userInfo.user_name"
                                placeholder="请输入用户名"
                                style="width: 80%;"
                                maxlength="11"
                                :validateStatus="
                                    savFlg
                                        ? ''
                                        : userInfo.user_name
                                        ? 'success'
                                        : 'error'
                                "
                                :help="
                                    savFlg
                                        ? ''
                                        : userInfo.user_name
                                        ? ''
                                        : '请输入密码'
                                "
                            />
                        </a-form-item>
                        <!--<a-form-item-->
                            <!--:labelCol="{ span: 5 }"-->
                            <!--:wrapperCol="{ span: 18 }"-->
                            <!--label="旧密码"-->
                            <!--style="margin-bottom: 5px"-->
                            <!--:validateStatus="-->
                                <!--savFlg-->
                                    <!--? ''-->
                                    <!--: userInfo.pass_word_old-->
                                    <!--? 'success'-->
                                    <!--: 'error'-->
                            <!--"-->
                            <!--:help="-->
                                <!--savFlg-->
                                    <!--? ''-->
                                    <!--: userInfo.pass_word_old-->
                                    <!--? ''-->
                                    <!--: '请输入旧密码'-->
                            <!--"-->
                        <!--&gt;-->
                            <!--<a-input-->
                                <!--v-model="userInfo.pass_word_old"-->
                                <!--placeholder="请输入旧密码"-->
                                <!--style="width: 80%;"-->
                                <!--maxlength="16"-->
                            <!--/>-->
                        <!--</a-form-item>-->
                        <a-form-item
                            :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 18 }"
                            label="新密码"
                            style="margin-bottom: 5px"
                            :validateStatus="
                                savFlg
                                    ? ''
                                    : userInfo.pass_word
                                    ? 'success'
                                    : 'error'
                            "
                            :help="
                                savFlg
                                    ? ''
                                    : userInfo.pass_word
                                    ? ''
                                    : '请输入新密码'
                            "
                        >
                            <a-input
                                v-model="userInfo.pass_word"
                                placeholder="请输入新密码"
                                style="width: 80%;"
                                maxlength="16"
                            />
                        </a-form-item>
                        <a-form-item
                                style="margin-bottom: 0"
                                :labelCol="{ span: 5 }"
                                :wrapperCol="{ span: 18 }"
                                label="上传头像"
                                :validateStatus="
                                savFlg
                                    ? ''
                                    : userInfo.avatar
                                    ? 'success'
                                    : 'error'
                            "
                                :help="
                                savFlg
                                    ? ''
                                    : userInfo.avatar
                                    ? ''
                                    : '请上传头像。。。'
                            "
                        >
                            <a-upload
                                    class="avatar"
                                    name="file"
                                    :headers="headers"
                                    @change="handleChange"
                                    listType="picture-card"
                                    :beforeUpload="beforeUpload"
                                    :showUploadList="false"
                                    action="/index.php?r=uc/user/upload"
                            >
                                <div className="ant-upload-text">
                                    <div
                                            :style="{
                                            background:
                                                'url(' +
                                                userInfo.avatar +
                                                ') no-repeat center/50%',
                                            backgroundSize: 'contain',
                                            width: '100px'
                                        }"
                                            class="avatar"
                                    >
                                        <!-- <a-icon type="plus"  class="avatar-uploader-trigger" v-if="userInfo.avatar?false:true" size="30" /> -->
                                    </div>
                                </div>
                            </a-upload>
                        </a-form-item>
                        <a-form-item style="text-align:center;margin-top: -80px">
                             <a-button type='primary' htmlType='submit' style="margin-left: 10px;margin-left: -190px">保存</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-menu-item>
            <a-menu-item v-if='flg&&replySet' class="userSet">
                <p style="font-size:18px;padding:4px 0;" @click.stop="handleBack('2')">
                    <a-icon type="left"></a-icon>
                    <span class="icon" style="padding-left:330px">自动回复</span>
                </p>
                <auto-reply :personalItem="personalItem" @close="handleBack('2')"></auto-reply>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item v-if="!flg" @click="logout">
                <!--<a-icon type="poweroff" />-->
                <span style="color: #FE5606">退出登录</span>
            </a-menu-item>
            <!-- <a-menu-item @click="change" v-if="!flg">...</a-menu-item> -->
        </a-menu>
    </a-dropdown>
</template>

<script>
var storage = require("../common/store");
import autoReply from '../components/setting/autoReply'
export default {
    name: "HeaderAvatar",
    components: {autoReply},
    data() {
        return {
            form: this.$form.createForm(this),
            flg: false,
            loading: false,
            dropdownFlg: false,
            mangflg: false,
            userSet: false,
            replySet:false,
            userStatus:{
                icon:'check-circle',
                text:'在线',
                clas:'onlineIcon'
            },
            userInfo: {
                avatar: "",
                user_name:'',
                pass_word_old:'',
                pass_word:''
            },
            savFlg: true,
            headers: {
                Authorization: storage.store.get("token")
            },
            login_status:'',
            personalItem:{
                new_msg_audio_status:false,
                auto_reply_status:false,
                busy_auto_reply:'',
                busy_auto_reply_image:'',
                offline_auto_reply:'',
                offline_auto_reply_image:''
            }
        };
    },
    computed: {
        currUser() {
            return this.$store.state.user.user;
        }
    },
    mounted() {},
    methods: {
        logout() {
            this.$axios({
                method: 'get',
                url: '/index.php?r=uc/user/logout',
            }).then(res=>{
                let udata = res.data
                if (udata.status == 1) {
                    this.$ws&&this.$ws.close()
                    this.$store.commit("user/setToken", "");
                    this.$store.commit("user/setGoToken", "");
                    this.$store.commit("user/clearPermission");
                    storage.store.clear()
                    this.$router.push("/login");
                }
            })
        },
        getloginStatus(){
            this.login_status = this.$store.state.user.user.login_status;
            if(this.login_status=='0'){
                this.userStatus={
                    icon:'close-circle',
                    text:'离线',
                    clas:'outlinIcon'
                }
            }else if(this.login_status=='1'){
                this.userStatus={
                    icon:'check-circle',
                    text:'在线',
                    clas:'onlineIcon'
                }
            }else if(this.login_status =='2'){
                this.userStatus={
                    icon:'minus-circle',
                    text:'忙碌',
                    clas:'busyIcon'
                }
            }
        },
        changeStatus(val){
            if(val == this.login_status) {
                return
            }
            let that = this;
            this.$axios({
                method:'POST',
                url:'/index.php?r=uc/user/switch-login-status',
                data:{login_status:val}
            }).then(function(d){
                let udata = d.data;
                if(udata.status === 1){
                    that.login_status = val
                    if(!val){
                        that.userStatus={
                            icon:'close-circle',
                            text:'离线',
                            clas:'outlinIcon'
                        }
                    }else if(val===1){
                        that.userStatus={
                            icon:'check-circle',
                            text:'在线',
                            clas:'onlineIcon'
                        }
                    }else{
                        that.userStatus={
                            icon:'minus-circle',
                            text:'忙碌',
                            clas:'busyIcon'
                        }
                    }
                }else{
                    this.$message.error("网络异常！");
                }
            })
        },
        tagger() {
            if(!this.dropdownFlg){
                this.flg =false;
                this.userSet = false;
                this.replySet = false
            }
            this.dropdownFlg = !this.dropdownFlg;
        },
        handleChange(info) {
            this.loading = true;
            if (info.file.status === "uploading") {
                this.loading = true;
                return;
            }
            if (info.file.status === "done") {
                if (info.file.response.status == 1) {
                    this.userInfo.avatar = info.file.response.data.path;
                    this.loading = false;
                } else {
                    this.$notification["warning"]({
                        message: "上传错误",
                        description: info.file.response.msg
                    });
                }
            } else if (info.file.status === "error") {
                this.$notification["warning"]({
                    message: "上传失败",
                    description: "文件" + info.file.name + "上传失败"
                });
            }
        },
        beforeUpload(file) {
            // console.log(file.type === 'image/jpeg')
            const isJPG =
                file.type === "image/jpeg"
                    ? true
                    : file.type === "image/png"
                    ? true
                    : file.type === "image/jpg"
                    ? true
                    : false;
            if (!isJPG) {
                this.$notification["warning"]({
                    message: "文件格式不正确",
                    description: "文件格式不正确，请选择JPG或PNG。"
                });
            }
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.$notification["warning"]({
                    message: "超出文件大小限制",
                    description: "图像不能大于1MB！"
                });
                this.$message.error("图像不能大于1MB！");
            }
            return isJPG && isLt2M;
        },
        handleSubmit() {
//            if(!((this.userInfo.pass_word_old&&this.userInfo.pass_word)||(!this.userInfo.pass_word_old&&!this.userInfo.pass_word))) {
//                if(this.userInfo.pass_word_old=='') {
//                    this.$message.warning('请输入旧密码')
//                }else {
//                    this.$message.warning('请输入新密码')
//                }
//                return false
//            }
            if(this.userInfo.pass_word&&!/^[A-Za-z0-9]{6,16}$/.test(this.userInfo.pass_word)) {
                this.$message.warning('请输入6位以上的大小写字母、数字组成的密码')
                return false
            }
            this.$axios({
                method: 'POST',
                url: '/index.php?r=uc/organization/user-update',
                data:Object.assign(this.userInfo,{
                    id:this.$store.state.user.user.user_id,
                    reset:'1'
                })
            }).then(res=>{
                let udata = res.data
                if (udata.status == 1) {
                    this.dropdownFlg = !this.dropdownFlg;
                    this.userSet = !this.userSet;
                    this.flg = !this.flg;
                    this.userInfo.pass_word_old = '';
                    this.userInfo.pass_word = '';
                    this.$axios({
                        method: 'GET',
                        url: '/index.php?r=uc/user/list',
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$store.commit('user/setUser',udata.data.user)
                            this.$store.commit('user/setManager',udata.data.manager)
                            this.$store.commit('user/setDepartment',udata.data.department)
                        }
                    });
                }
            })
        },
        handleSubmitChange(type) {
            if(type==1) {
                this.userInfo.user_name = this.$store.state.user.user.nickname;
                this.userInfo.avatar = this.$store.state.user.user.avatar;
                this.flg = true;
                this.userSet = true;
                this.replySet = false;
            }else {
                this.flg = true;
                this.userSet = false;
                this.replySet = true;
                this.getPersonalInfo()
            }
        },
        getPersonalInfo() {
            this.$axios({
                method: 'POST',
                url: '/index.php?r=uc/system/get-user-setting-info'
            }).then(res=> {
                let udata = res.data
                if (udata.status == 1&&udata.data!=false) {
                    udata.data.new_msg_audio_status=udata.data.new_msg_audio_status=='1'?true:false
                    udata.data.auto_reply_status=udata.data.auto_reply_status=='1'?true:false
                    this.personalItem = udata.data
                }
            });
        },
        handleBack(type){
            this.flg = false;
            if(type==1) {
                this.userSet = !this.userSet;
            }else {
                this.replySet = !this.replySet;
            }
        },
        handleLabelChange(val) {
            this.$router.push({
                path: "/customerChat/liveChat",
                query: { id: val, user_id: val, type: "friend" }
            });
            this.dropdownFlg = !this.dropdownFlg;
            this.flg = !this.flg;
            this.mangflg = !this.mangflg;
        },
        change() {
            this.flg = !this.flg;
            this.mangflg = !this.mangflg;
        },
        visible(val) {
            console.log(val);
        },
        navToHelp() {
            window.open('https://shimo.im/docs/V5qeWOrDDdCbF8AJ')
        }
    },
    created() {
        this.managerList = JSON.parse(
            JSON.stringify(this.$store.state.user.manager)
        );
        this.getloginStatus()
    }
};
</script>

<style lang="less" scoped>
    .question{
        font-size:20px;
        vertical-align: middle;
        color:#c8c8c8;
        padding-bottom:4px;
    }
    .clr:after{
        display:block;
        content:'';
        height:'';
        visibility: hidden;
        clear:both;
    }
    .tipMenu:hover{
        background:#0f6c7c;
        border-radius: 5px;
    }
    .outlinIcon{
        color:#ccc;
        margin-right:6px;
    }
    .onlineIcon{
        color:greenyellow;
        margin-right:6px;
        color: #8BC34A;
    }
    .busyIcon{
        color:orange;
        margin-right:6px;
    }
    .tipMenu{
        color:#fff;
        background: #5AA9CD;
    }
    .topTitle {
        background: #5AA9CD;
        border-radius: 5px 5px 0 0;
        color: #fff;
        height: 80px;
    }
    .topTitle > div {
        line-height: 30px;
    }
    .icon {
        padding-left: 130px;
        color: #afafaf;
    }
    .topTitle:hover {
        background: #5AA9CD;
        border-radius: 5px 5px 0 0;
    }
    .userSet:hover {
        background: #fff;
    }
    .avatar {
        //margin: 20px 4px 20px 0;
        color: #5AA9CD;
        background: hsla(0, 0%, 100%, 0.85);
        margin-right: 5px;
        vertical-align: middle;
    }
    .userInfo .avatar-uploader,
    .userInfo .avatar-uploader-trigger,
    .userInfo .avatar {
        width: 50px;
        height: 50px;
    }
    .userInfo .avatar-uploader {
        display: block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
    }
    .userInfo .avatar-uploader-trigger {
        display: table-cell;
        vertical-align: middle;
        font-size: 30px;
        color: rgb(111, 150, 255);
        height: 50px;
        line-height: 50px;
    }
    .login-nickname {
        position: relative;
        top: -4px;
        min-width: 30px;
        max-width: 100px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space:nowrap;
        line-height: initial;
    }
    .login-status {
        position: absolute;
        left: 0;
        top:-10px;
    }
</style>
