<style scoped lang="less">
    /*清除浮动代码*/
    .hide {
        display: none;
    }
    .clearFloat:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }
    .clearFloat {
        zoom: 1
    }
    .fr {
        float: right;
    }
    .fl {
        float: left;
    }
    .friend-circle{
        .col-margin {
            .alert {
                height: 25px;
                line-height: 25px;
                width: 40%;
                text-align: center;
                margin: 18px auto ;
                background: #E6F7FF;
                border-radius: 5px;
                border: 1px solid #108EE9;
                cursor: pointer;
                .icon {
                    height: 25px;
                    line-height: 2;
                    margin-right: 40px;
                }
            }
            .comment_box {
                height: calc(~"100vh - 270px");
                overflow-y: auto;
                overflow-x: hidden;
                padding: 20px 0;
                >div:after {
                    content: "";
                    width: 24%;
                }
                .circle-content {
                    margin-bottom: 20px;
                    flex:0 0 24%;
                    width: 24%;
                    position: absolute;
                    margin-top: -15px;
                }
                .comment_con {
                    /*height: calc(~"100% - 50px");*/
                    padding: 20px;
                    background: #fff;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    color: rgb(16,16,16);

                    word-break: break-all;
                    .avatar {
                        .user-info {
                            display: inline-block;
                            height: 54px;
                            line-height: 27px;
                            vertical-align: middle;
                        }
                    }
                    .content-info {
                        width: 100%;
                        .content_text {
                            padding: 2px 0;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            word-break: break-all;
                            display: -webkit-box;
                        }
                        .albumList {
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            &:after {
                                width: 32%;
                                content: "";
                            }
                            .media {
                                position: relative;
                                cursor: pointer;
                                width: 32%;
                                padding-bottom: 32%;
                                height: 0;
                                margin-bottom: 5px;
                                img {
                                    position: absolute;
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                }
                                .play_btn {
                                    height: 30px;
                                    width: 30px;
                                    position: absolute;
                                    top: 50%;
                                    margin-top: -15px;
                                    left: 50%;
                                    margin-left: -15px;
                                    z-index: 10;
                                }
                                &:after {
                                    content: "";
                                    width: 32%;
                                }
                            }
                            /*.link-content {*/
                                /*display: inline-block;*/
                                /*padding: 10px;*/
                                /*border-radius: 5px;*/
                                /*position: relative;*/
                                /*color: rgb(16,16,16);*/
                                /*background: #e6e5e5;*/
                                /*cursor: pointer;*/
                                /*img {*/
                                    /*width: 40px;*/
                                    /*height: 40px;*/
                                /*}*/
                            /*}*/
                            .link-content {
                                display: inline-block;
                                width: 100%;
                                height: 56px;
                                background: #f0f0f0;
                                padding: 10px;
                                border-radius: 5px;
                                position: relative;
                                color: rgb(16,16,16);
                                white-space: normal;
                                word-break: break-all;
                                cursor: pointer;
                                text-align: left;
                                img {
                                    width: 40px;
                                    height: 40px;
                                    position: absolute;
                                    top:50%;
                                    left: 10px;
                                    transform: translateY(-50%);
                                }
                            }
                        }
                        .likeList {
                            color: #108EE9;
                            line-height: 20px;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            word-break: break-all;
                            display: -webkit-box;
                        }
                        .commentList {
                            margin-top: 6px;
                            .comment_dec {
                                /*height: 24px;*/
                                /*display: -webkit-box;*/
                                /*-webkit-box-orient: vertical;*/
                                /*-webkit-line-clamp: 1;*/
                                /*overflow: hidden;*/
                                /*padding-bottom: 6px;*/
                                .comment_reply {
                                    padding-bottom: 2px;
                                    .nick_name {
                                        color: #108EE9;
                                    }
                                    .text {}
                                }
                            }
                        }
                    }
                }
                .btn_group {
                    text-align: center;
                    border-top: 1px solid #f0f0f0;
                    background: #fff;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                    height: 50px;
                    line-height: 50px;
                    .btn-item {
                        display: inline-block;
                        border-right: 1px solid #f0f0f0;
                        flex: 1;
                        cursor: pointer;
                        svg {
                            font-size: 20px;
                            vertical-align: sub;
                        }
                        &:last-child {
                            border-right: none;
                        }
                    }
                }

            }
        }
        .friend-circle-page {
            text-align: right;
            margin-top: 10px;
            /*position: absolute;*/
            /*right: 0;*/
            /*width: 100%;*/
            /*background: #f0f2f5;*/
            /*bottom: -52px;*/
            /*padding: 10px 0;*/
            /*z-index: 1000;*/
        }
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
     .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    @media only screen and (max-width: 1500px) {
        .comment_box {
            .circle-content {
                width: 32%!important;
                flex:0 0 32%!important;
            }
            >div:after {
                content: "";
                width: 32%!important;
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        .comment_box {
            .circle-content {
                width: 48%!important;
                flex:0 0 48%!important;
            }
            >div:after {
                content: "";
                width: 48%!important;
            }
        }
    }
    .checkbox{
        position:absolute;
        right:0;
        width: 20px;
        height: 20px;
        border-radius: 0 5px  0 0;
    }
    
    .checkBody{
        position:relative;
        .checkboxIcon{
            position:absolute;
            right:0;
            top:0;
            width: 20px;
            height: 20px;
            z-index:999;
            border-color:  transparent #dfdfdf;
            border-width: 0 50px 50px 0;
            border-style: solid;
            text-align:center;
            .check{
            width:26px;
            position:absolute;
            color:#fff;
            right:-48px;
            top:2px;
            z-index:999;
        }
        }
        .ant-checkbox{
            display:none !important;
        }
    }
    .ant-checkbox-wrapper-checked{
        .checkboxIcon{
            border-color:  transparent #5AA9CD;
        }
    }
    .thumbsUp{
        position:absolute;
        right:26px;
        bottom:100px;
        z-index:9999;
        .thumbsNav{
            float:left;
            margin-top:5px;
            margin-right:10px;
            line-height:40px;
            background:#108EE9;
            display: flex;
            width: 420px;
            height:40px;
            border-radius:4px;
            z-index:990;
            div{
                flex: 1;
                text-align:center;
                cursor: pointer;
                color:#fff;
                &:nth-child(1){
                 border-radius:4px 0 0 4px ;
                 background:#108EE9; 
                }
            }
            .caretIcon{
                position:absolute;
                right:50px;
                top:17px;
                color:#108EE9;
            }
        }
        .bg{
            background:rgb(23, 136, 218);
        }
        .thumbsIcon{
            float:right;
            background:url('../../assets/badge.svg') no-repeat center;
            background-size: cover;
            background-color: #108EE9;
            border-radius:50px;
            width:50px;
            height:50px;
            padding: 6px;
            cursor: pointer;
        }
        .fade-enter,.fade-leave-to {
            opacity: 0;
        }
        .fade-enter-active ,.fade-leave-active {
            transition: opacity 10s;
        }
        
    }
</style>

<template>
    <div class="friend-circle">
        <div class="col-margin">
            <a-form @submit.prevent="handleSubmit" layout="inline" style="padding: 10px;background: #fff" class="clearFloat" id="serachForm">
                <div style="float: left">
                      <a-form-item label="选择部门">
                        <a-tree-select
                                :treeData="departmentList"
                                :treeDefaultExpandAll="true"
                                v-model="queryParam.department_id"
                                @select="onSelect"
                                style="min-width: 150px"
                        >
                        </a-tree-select>
                    </a-form-item>
                    <a-form-item label="客户经理">
                        <a-select v-model="queryParam.user_id" @change="managerChange"  style="width: 150px;"  placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                            <a-select-option  v-for="(item,idx) in managerList" :key="item.id">
                                {{item.user_name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="微信">
                        <a-select v-model="queryParam.weChat" @change="choseWeChat" style="width:150px;" pleaceholder="选择微信号">
                            <a-select-option v-for="(item,index) in weChatList" :key="index">
                                {{item.nickname?item.nickname:'未命名'}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-input v-model="queryParam.searchKey"  placeholder='请输入微信昵称/微信备注' style="width: 200px;" />
                    </a-form-item>
                    <!-- <a-form-item>
                        <a-range-picker :placeholder="['开始时间', '结束时间']"  @change="onChangeDate" style="width:250px;"/>
                    </a-form-item> -->
                    <a-form-item>
                        <a-checkbox v-model="queryParam.is_comment" @change="handleSubmit()">未评</a-checkbox>
                    </a-form-item>
                    <a-form-item>
                        <a-checkbox v-model="queryParam.is_like" @change="handleSubmit()">未赞</a-checkbox>
                    </a-form-item>
                </div>
                <div style="float: left">
                     <a-form-item style="float: right">
                        <a-button type='primary' @click="thumbchose">点赞本页</a-button>
                    </a-form-item>
                    <a-form-item style="float: right">
                        <a-button type='primary' @click="refresh" :disabled="refreshStatus">刷新</a-button>
                    </a-form-item>
                    <a-form-item style="float: right">
                        <a-button type='primary' htmlType='submit'>搜索</a-button>
                    </a-form-item>
                </div>
            </a-form>
            <div style="margin-top: -10px" v-if="refreshStatus">
                <a-progress :percent="refreshProcess" strokeColor="#5aa9cd"/>
            </div>
            <div style="height: 26px"  v-if="newMsgCount==0">
            </div>
            <div class="alert clearFloat" @click="go_newMsg()" v-if="!!newMsgCount">
                {{newMsgCount}} 条新消息
                <a-icon type="right" class="fr icon" />
            </div>

            <!--评论列表 start-->
            <div class="comment_box" :style="{'height': contentHeight}">
                <p v-if="friendCircleList.length==0" style="text-align: center;font-size: 16px;position:relative;">
                     <data-status :width="200" :hieght="330" class="stausPage" ></data-status>
                </p>
                <!-- <a-checkbox-group class="clearFloat"  @change="checkInfo" v-model="checklist" style="position: relative;width:100%;"> -->
                <div class="clearFloat" style="display: flex;justify-content: space-between;flex-wrap: wrap;position: relative" v-show="friendCircleList.length!=0" id="circleBox">
                
                <div class="circle-content" v-for="(item,index) in friendCircleList"  :key="index" >
                    <!-- <div class="checkBody">
                        <a-checkbox   :value="item.id" class="checkbox">
                            <div class="checkboxIcon">
                                <img src="../../assets/iconOk.png" alt="" class="check">
                            </div>
                        </a-checkbox>
                    </div> -->
                        <div class="comment_con">
                            <div class="avatar">
                                <img :src="item.avatar_url" @error="imgExists($event)" style="width: 54px;height: 54px;border-radius: 10px;margin-right: 5px">
                                <div class="user-info">
                                    <span style="">
                                        {{item.nickname}}
                                    </span>
                                    <br>
                                    <span style="color: #B3B2B2;font-size: 12px">
                                        {{item.send_time}}
                                    </span>
                                </div>
                            </div>
                            <div class="content-info">
                                <div class="content_text" v-html="item.content_text"></div>
                                <div class="albumList">
                                    <div v-for="(media_item,media_index) in item.albumList" class="media"  v-if="!item.share_url">
                                        <img :src="media_item.src" v-if="media_item.type==0" @click="previewPic(media_index,item.albumList)" />

                                        <video  v-if="media_item.type==20" style="object-fit: fill;">
                                            <source :src="media_item.src" type="video/mp4" />
                                            <source :src="media_item.src" type="video/ogg" />
                                        </video>
                                        <img src="../../assets/play.png" :class="!video_playPause?'hide':'play_btn'" @click="playPauseVideo(media_index,item.albumList)" v-if="media_item.type==20" />
                                    </div>

                                    <div v-if="!!item.share_url" class="link-content" @click="navToLink(item.share_url)">
                                        <img v-if="item.albumList.length==0" src="../../assets/link-img.png" alt="">
                                        <img v-else :src="item.albumList[0].src" alt="">
                                        <span style="margin-left: 50px;display: inline-block;font-size: 12px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden; word-break: break-all;display: -webkit-box;position: absolute;top: 50%;transform: translateY(-50%)">{{item.share_title}}</span>
                                    </div>

                                    <!--<div v-if="!!item.share_url" class="link-content" @click="navToLink(item.share_url)">-->
                                        <!--<div style="margin-right: 50px">{{item.share_title}}</div>-->
                                        <!--<div style="position: relative;margin-top: 10px;margin-right: 50px">-->
                                            <!--<span style="display: inline-block;font-size: 12px;color: #999999;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden; word-break: break-all;display: -webkit-box;">{{item.share_text}}</span>-->
                                        <!--</div>-->
                                        <!--<img v-if="item.albumList.length==0" src="../../assets/link-img.png" alt="">-->
                                        <!--<img v-else :src="item.albumList[0].src" alt="">-->
                                    <!--</div>-->

                                </div>
                                <div class="likeList" v-if="item.likeList.length>0">
                                    <a-icon type="heart" />
                                    <span v-for="(like_item,like_index) in item.likeList">
                                        {{like_item.nickname}}{{like_index+1==item.likeList.length?'':'，'}}
                                    </span>
                                </div>
                                <div class="commentList">
                                    <div class="comment_dec" ref="liCon">
                                        <!--<div class="comment_reply" v-for="(reply_item,reply_index) in item.commentList">-->
                                            <!--<span class="nick_name">{{reply_item.nickname}}：</span>-->
                                            <!--<span class="text">{{reply_item.comment}}</span>-->
                                        <!--</div>-->
                                        <div class="comment_reply" v-if="item.commentList.length>0">
                                            <span class="nick_name">{{item.commentList[0].nickname}}：</span>
                                            <span class="text" v-html="item.commentList[0].comment"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn_group" >
                            <div class="btn-item" @click="com_like(item)" >
                                <a-icon type="heart" v-if="item.is_like=='0'"/>
                                <a-icon type="heart" v-if="item.is_like=='1'" theme="filled" :style="{color: '#FF4949'}"/>
                                {{item.is_like=='1'?'已点赞':'点赞'}}
                            </div>
                            <div class="btn-item" @click="com_showModal(item)" >
                                <a-icon type="message" v-if="item.is_comment=='0'" />
                                <a-icon type="message" v-if="item.is_comment=='1'" theme="filled"/>
                                评论
                            </div>
                            <div class="btn-item" @click="com_detail(item.id)">
                                <a-icon type="info-circle" theme="filled"/>
                                详情
                            </div>
                        </div>
                    
                    </div>
               
                             
                </div>
                <!-- </a-checkbox-group>   -->
            </div>
            <!--评论列表 end-->
            <!-- <div class="thumbsUp">
                <transition >
                    <div  v-if="thumbflg" class="thumbsNav">
                        <div style="color:#f0f0f0;">已选中{{checklist.length}}条</div>
                        <div :class="[thumbIdx===index?'bg':'']" v-for="(item,index) in thumbsList" :key="index" @click="thumbchose(index)">{{item.title}}</div>
                        <a-icon type="caret-right" class="caretIcon"></a-icon>
                    </div>
                </transition>
                    <div class="thumbsIcon" @click="thumbNav"></div>
            </div>   -->
        </div>

        <a-pagination class="friend-circle-page" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '50', '100', '200']" @change="onChange" @showSizeChange="onShowSizeChange"/>

        <a-modal :visible="visible" @cancel="handleCancel" :footer="null">
            <carousel_img :imgList="selectImgList" :pos="pos"></carousel_img>
        </a-modal>

        <a-modal title="评论朋友圈" :footer="null"  :visible="com_visible" @cancel="com_handleCancel">
            <!--<a-form @submit="com_handleOk" :form="form">-->
                <!--<a-form-item  :wrapperCol="{span: 24}">-->
                    <!--<a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" placeholder='请输入评论。。。' v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]" maxlength="500"/>-->
                <!--</a-form-item>-->
                <!--<a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">-->
                    <!--<a-button @click="com_handleCancel">取消</a-button>-->
                    <!--<a-button type='primary' htmlType='submit' style="margin-left: 10px;">提交</a-button>-->
                <!--</a-form-item>-->
            <!--</a-form>-->
            
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
                    <div-edit-area id="friendComment1" :formItem="commentObj" ref="div_edit" @change='getSel()' ></div-edit-area>
                </div>
            </div>
            <div style="padding-top: 25px;text-align: right">
                <a-button @click="com_handleCancel">取消</a-button>
                <a-button type='primary' style="margin-left: 10px;" @click="com_handleOk()">确定</a-button>
            </div>
            
        </a-modal>
    </div>
</template>
<script>
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
    import carousel_img from '../../components/customerChat/carousel_img.vue'
    import divEditArea from '../../components/dataManage/divEditArea.vue'
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'
    export default {
        name: "friendCircle",
        components: {
            carousel_img,
            divEditArea,
            dataStatus
        },
        data(){

            return{
                thumbflg:false,
                thumbIdx:'',
                friendCircleList: [],
                checklist:[],
                thumbsList:[{
                    title:'全选(本页)',
                },
                {
                    title:'取消选中',
                },
                {
                    title:'一键点赞',
                }],
                weChatList:[],
                queryParam: { // 搜索参数
                    searchKey: '',
                    is_comment: false,
                    startTime: '',
                    endTime: '',
                    is_like:false,
                    department_id:'',
                    user_id:'0',
                    weChat:'0',
                    assistant_id:''
                },
                checkFlg:false,
                video_playPause: true, //视频播放
                visible: false,
                liConHeight: 24, // 两行文字的高度
                com_visible: false,
                form: this.$form.createForm(this),
                newMsgCount:'',
                robotList:[],
                selecetComment:{},
                page_size:20,
                page:1,
                total:0,
                refreshStatus:false,
                refreshProcess:0,
                selectImgList:[],
                pos:0,
                emojiList: emoji.emojiList,
                commentObj:{
                    text:'',
                },
                departmentList:[],
                managerList:[],
                contentHeight:'calc(100vh - 270px)',
                disableDepartment:true
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            this.globalClick(this.closeEmoji);
            window.addEventListener('resize',this.waterFall,false);
            window.addEventListener('resize',this.getScale,false);
            this.getScale()
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        computed: {
            emojiFlag() {
                return this.$store.state.liveChat.emojiFlag
            }
        },
        methods:{
            choseWeChat(idx){//选择微信号
                this.queryParam.assistant_id = this.weChatList[idx].id;
                this.page = 1
                this.getFriendZone()
            },
            checkInfo(item){
                this.checklist = item;
            },
            thumbchose(){
                let data;
                this.friendCircleList.forEach(item=>{
                    if(item.is_like=='0'){
                        this.$set(item,'is_like','1')
                        this.$forceUpdate()
                        comConf.isOfflineRobot(item.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        data = {
                            cmd:2050,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:item.robot_username,
                            cmdData:{
                                snsId:item.snsId,
                                type:1
                            },
                            priority:0
                        }
                        this.$ws.sendMsgFun(data)
                    }
                })
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==2) {
                        this.getFriendZone();
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
            // thumbNav(){
            //     this.thumbflg = !this.thumbflg ;
            // },
            selFiles(){},
            handleSubmit(e) { ///点击搜索
                this.page = 1
                this.getFriendZone()
            },
            refresh() {
                if(this.refreshStatus) {
                    return
                }
                this.refreshStatus = true
                let _this = this;
                this.weChatList.forEach(el=>{
                    if(el.id === this.queryParam.assistant_id){
                        comConf.isOfflineRobot(el.username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        let data = {
                            cmd:2044,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:el.username,
                            cmdData:{
                                lastSnsId:'-1',
                            },
                            priority:0
                        }
                        this.$ws.sendMsgFun(data)
                    }
                })
                this.refreshProcess = 0
                let set = setInterval(_ => {
                    this.refreshProcess++;
                    if (this.refreshProcess == 100) {
                        clearInterval(set);
                        this.refreshStatus = false
                        this.getFriendZone();
                    }
                }, 100)
            },
            onChangeDate(date, dateString) {
                this.queryParam.startTime = dateString[0]; //朋友圈开始时间
                this.queryParam.endTime = dateString[1]; //朋友圈结束时间
            },
            previewPic(index,list) {
                this.selectImgList = list
                this.pos = index
                this.visible = true
            },
            playPauseVideo(index,list) {
                this.selectImgList = list
                this.pos = index
                this.visible = true
                this.video_playPause = false;
            },
            handleCancel(e) {
                this.visible = false
                this.video_playPause = true;
            },
            com_detail(id){
                this.$router.push({path:'/customerChat/friendCircleDetail',query:{'id':id,'assistant_id':this.queryParam.assistant_id}});
            },
            com_like(item){
                if(item.is_like==1) {
                    // item.is_like = '0'
                    this.$message.info('已经点赞，无法再次点赞')
                    return
                }
                item.is_like = 1
                let _this = this;
                comConf.isOfflineRobot(item.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.robot_username,
                    cmdData:{
                        snsId:item.snsId,
                        type:1
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==2) {
                        this.getFriendZone()
                        this.$message.success('点赞成功', 2);
                    }
                    else if(msg.status==4) {
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
            com_showModal(item) {
                this.com_visible = true
                this.selecetComment = item
            },
            com_handleOk(e){
                if(this.commentObj.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
                    this.$message.warning('不能发送空白评论')
                    return
                }
                comConf.isOfflineRobot(this.selecetComment.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selecetComment.robot_username,
                    cmdData:{
                        snsId:this.selecetComment.snsId,
                        type:2,
                        comment:emoji.htmlToString(this.commentObj.text)
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.com_visible = false;
                this.commentObj = {
                    text:'',
                }
                this.$refs.div_edit.clearContent()
                this.$ws.cmd2050 = msg=>{
                    if(msg.status==2) {
                        this.getFriendZone()
                        this.$message.success('评论成功', 2);
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
            com_handleCancel(){
                this.com_visible = false;
                this.$refs.div_edit.clearContent();
            },
            //更新总时间
            updateTotalTime(index) {
                var totalLabel = document.getElementById("total_time" + index);
                var audio = document.getElementById('audio' + index);
                if(!totalLabel.innerHTML) {
                    var time = Math.round(audio.duration);
                    if(isNaN(time)) {
                        time = '';
                    }
                    totalLabel.innerHTML = time + '"';
                }
            },
            audio_end(index) {
                var audio = document.getElementById('audio' + index);
                audio.parentElement.lastChild.setAttribute('class', 'audio-status')
            },
            go_newMsg(){
                this.$router.push({path:'/customerChat/newMsg',query:{'num':this.newMsgCount,'assistant_id':this.queryParam.assistant_id}});
            },
            getFriendZone() {
                let params = JSON.parse(JSON.stringify(this.queryParam))
                params.is_comment = params.is_comment?'1':'0'
                params.is_like = params.is_like?'1':'0'
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/friend-zone',
                    data:Object.assign(params,{p:this.page,n:this.page_size})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.total = parseInt(udata.data.count)
                        this.friendCircleList = udata.data.friendCircleList
                        this.newMsgCount = udata.data.newMsgCount
                        this.robotList = udata.data.robotList
                        !!this.friendCircleList&&this.friendCircleList.forEach(el=>{
                            el.checkFlg = false;
                            !!el.content_text&&(el.content_text = emoji.stringToHtml(el.content_text))
                            el.commentList.forEach(item=>{
                                item.comment = emoji.stringToHtml(item.comment)
                            })
                        })
                        this.$nextTick(() => {
                            this.waterFall()
                        })
                    }
                });
            },
            onChange(page,pageSize) {
                this.friendCircleList = []
                this.page = page
                this.page_size = pageSize
                this.getFriendZone()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getFriendZone()
            },
            navToLink(url) {
                let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
                window.open(reg1.test(url)?url:'//'+url)
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
                document.getElementById('friendComment1').focus()
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
                    let x = document.getElementById('friendComment1')
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
                let x = document.getElementById('friendComment1')
                var e, t;
                document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            /*表情 end*/
            /*瀑布流 start*/
            waterFall() {
                let box = document.getElementById('circleBox');
                let items = box.children;
                if(items.length==0) {
                    return
                }
                let windowWidth=(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
                let gap = 0
                let pageWidth = document.getElementById('circleBox').offsetWidth;
                let itemWidth = items[0].offsetWidth;
                let columns = 0
                if(windowWidth>1500) {
                    gap = parseInt(pageWidth * 0.04/3)
                    columns = parseInt(pageWidth / (itemWidth + gap *3/4));
                }else if(1000<windowWidth<1500) {
                    gap = parseInt(pageWidth * 0.04/2)
                    columns = parseInt(pageWidth / (itemWidth + gap *2/3));
                }else {
                    gap = parseInt(pageWidth * 0.04)
                    columns = parseInt(pageWidth / (itemWidth + gap /2));
                }
                let arr = [];
                for (var i = 0; i < items.length; i++) {
                    if (i < columns) {
                        // 2- 确定第一行
                        items[i].style.top = 0;
                        items[i].style.left = (itemWidth + gap) * i + 'px';
                        arr.push(items[i].offsetHeight);

                    } else {
                        // 其他行
                        // 3- 找到数组中最小高度  和 它的索引
                        var minHeight = arr[0];
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (minHeight > arr[j]) {
                                minHeight = arr[j];
                                index = j;
                            }
                        }
                        // 4- 设置下一行的第一个盒子位置
                        // top值就是最小列的高度 + gap
                        items[i].style.top = arr[index] + gap + 'px';
                        // left值就是最小列距离左边的距离
                        items[i].style.left = items[index].offsetLeft + 'px';

                        // 5- 修改最小列的高度
                        // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                        arr[index] = arr[index] + items[i].offsetHeight + gap;
                    }
                }
            },
            /*瀑布流 end*/
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
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
                this.page_size = 20
                this.queryParam.department_id = selectedKeys
                this.getUserList(selectedKeys)
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
                        this.weChatList.length?this.queryParam.assistant_id = udata.data[0].id:this.queryParam.assistant_id='';
                        this.weChatList.length?this.queryParam.weChat = 0:this.queryParam.weChat = '无匹配结果'
                        this.page = 1
                        this.getFriendZone()
                    }else{
                        this.$message.warn(udata.msg)
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
                        // this.managerList.unshift({id: '0', user_name: '全部'});
                        //this.queryParam.user_id = this.$store.state.user.user.user_id
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
            managerChange(val){
                //选择客户经理
                this.queryParam.user_id = val;
                this.getWeChat(val)
                // this.getFriendZone()
            },
            getScale() {
                let height = 200 + document.getElementById('serachForm').clientHeight
                this.contentHeight = 'calc(100vh - '+ height +'px)'
            },
        },
        created(){
            this.treeList()
//            this.getFriendZone()
            let _this = this
            this.$ws.cmd1001 = function (msg) {
                if(msg.status==2) {
                    _this.$store.commit('user/addMenuBadge', {name:msg.callbackMsg,badge:1})
                    if(msg.callbackMsg =='客户朋友圈'&&(_this.$router.currentRoute.path=='/customerChat/FriendsCircle'||_this.$router.currentRoute.path=='/personal/customerChat/FriendsCircle')) {
                        _this.weChatList.forEach(el=>{
                            if(el.id === _this.queryParam.assistant_id&&el.username == msg.fromClientId){
                                _this.newMsgCount+=1
                            }
                        })
                    }
                }
            }
        },
        beforeDestroy() {
            this.$ws.cmd2050 = null
            window.removeEventListener('resize',this.getScale,false)
            window.removeEventListener('resize',this.waterFall,false);
        }
    }
</script>
