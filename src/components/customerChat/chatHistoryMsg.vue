<style lang="less" scoped>
    .header-date {
        text-align: center;
        color: rgb(181,181,181);
    }
    .msg-other {
        display: flex;
        align-items: flex-start;
        .content-left {
            display: inline-block;
            margin-right: 12px;
        }
        .content-right {
            display: inline-block;
            width: calc(~"100% - 50px");
            position: relative;
            &::before {
                content: ' ';
                width: 1px;
                border-left: 1px solid #d9d9d9;
                height: 100%;
                position: absolute;
                left: 5px;
                top:-3px;
                margin: 22px 0;
            }
            &-time {
                color: rgb(181,181,181);
                margin-bottom: 5px;
                .red-circle,.g-circle {
                    display: inline-block;
                    width: 11px;
                    height: 11px;
                    border-radius: 50%;
                    border: 2px solid ;
                    vertical-align: middle;
                }
                .red-circle {
                    background: rgb(239, 65, 52);
                    border-color: rgb(239, 65, 52);
                }
                .g-circle {
                    background:#f8f8f8;
                    border-color: rgb(149, 146, 146);
                }
            }
            &-msg {
                padding-left: 60px;
                .text-content {
                    display: inline-block;
                    max-width: 90%;
                    border-radius: 5px;
                    position: relative;
                    color: rgb(16,16,16);
                    white-space: normal;
                    /*word-break: break-all;*/
                    word-break: break-word;
                }
                .img-content {
                    height: 100px;
                    max-width: 200px;
                    cursor: pointer;
                }
                .link-content {
                    display: inline-block;
                    width: 260px;
                    background: #fff;
                    padding: 10px;
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
                        right: 0;
                        transform: translateY(-50%);
                    }
                }
                .mini-program-content{
                    display: inline-block;
                    text-align: left;
                    width: 260px;
                    background: #fff;
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
                    background: #fff;
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
                .audio-content {
                    max-width: 200px;
                    min-width: 100px;
                    height: 40px;
                    line-height: 40px;
                    display: inline-block;
                    background: #fff;
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
                        left: calc(~"100% + 10px");
                        bottom: -10px;
                        color: #b5b5b5;
                    }
                }
                .audio-content-play {
                    background-image: url("../../assets/sound_play.gif") ;
                }
            }
        }
    }
    .hidden {
        display: none!important;
    }

    .img_modal {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.65);
        height: 100%;
        z-index: 1000;
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
    }
    .system-msg {
        text-align: center;
        position: relative;
        &::before {
            content: ' ';
            width: 1px;
            border-left: 1px solid #d9d9d9;
            height: 200%;
            position: absolute;
            left: 5px;
            top:-10px;
            margin: 22px 0;
        }
    }
</style>
<style>
    .text-content > .qqemoji {
        width: 20px!important;
        height: 20px!important;
    }
</style>
<template>
    <div >
        <div style="padding-bottom: 10px">
            <div v-for="(item,index) in chatMsg.data" :key="index" style="padding-bottom: 5px">
                <div v-if="item.status==70||(item.status==90)" class="system-msg">
                    <!--系统提示消息-->
                    <span v-if="item.status==70" style="background: #d4d2d2;border-radius: 2px;padding: 2px 10px;display: inline-block;word-break: break-all;color: #ffffff;max-width: 90%" v-html="item.content"></span>
                </div>
                <div v-else :class="['msg-other']">
                    <div class="content-right" >
                        <div class="content-right-time">
                            <span :class="[item.warn==1?'red-circle':'g-circle']" style="margin-right: 17px"></span>
                            <span v-if="item.send_by!=0" style="color: rgba(32, 122, 242, 1)">我</span>
                            <span v-if="item.send_by==0" style="color: rgba(37, 155, 36, 1)">{{item.remark || item.nickname}}</span>
                            <span :style="{color:item.send_by!=0?'rgba(32, 122, 242, 1)':'rgba(37, 155, 36, 1)',marginLeft:'10px'}">{{item.created}}</span>
                        </div>
                        <div class="content-right-msg">
                            <!--文字-->
                            <span v-if="item.status==80&&item.send_by!=0">
                                已撤回
                            </span>
                            <a-icon v-if="item.status==60&&item.send_by!=0" type="info-circle" theme="filled" style="color: #F98380;margin-right: 5px"/>
                            <span v-if="item.type==1" class="text-content" v-html="item.content"></span>
                            <!--图片及表情包-->
                            <img v-else-if="item.type==3||item.type==47" class="img-content" :src="item.iconurl" @click="showModal(item)">
                            <!--5:链接-->
                            <span v-if="item.type==5" class="link-content" @click="navToLink(item.url)">
                                <div style="color:#222;font-size:14px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden;">{{item.title}}</div>
                                <div style="position: relative;margin-top: 10px">
                                    <span style="width: 180px;font-size: 12px;color: #999999;min-height: 40px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.desc}}</span>
                                    <img v-if="item.mediapath==''" src="../../assets/link-img.png" alt="">
                                    <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                </div>
                            </span>
                            <!--6:文件-->
                            <span v-if="item.type==6" class="link-content"  style="cursor: default">
                                <div style="width: 80%;word-break: break-all;color: #101010">{{item.title}}</div>
                                <div style="position: relative;margin-top: 10px">
                                    <span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{item.desc}}</span>
                                </div>
                                <div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 20px;transform: translateY(-50%);border-radius: 4px">
                                    <img v-if="item.mediapath==''" src="../../assets/file-img1.png" alt="" style="position: static;transform: translateY(0)">
                                    <img v-if="item.mediapath!=''" :src="item.mediapath" alt="" style="position: static;transform: translateY(0)">
                                </div>
                            </span>
                            <!--33:小程序-->
                            <span v-if="item.type==33" class="mini-program-content">
                                <div class="title">
                                    <img :src="item.iconurl" alt="">
                                    <span>{{item.alias}}</span>
                                </div>
                                <div class="content" style="max-height: 240px;overflow: hidden">
                                    <span>{{item.title}}</span>
                                    <img  :src="item.mediapath" alt="">
                                </div>
                                <div style="border-top: 1px solid #e5e5e5;color: #999999;font-size: 12px;height: 25px;line-height: 25px">
                                    <img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
                                    小程序,请在手机上查看
                                    <!--小程序 <span style="float: right;font-size: 12px">详细信息请在手机端查看</span>-->
                                </div>
                            </span>
                            <!--34:语音-->
                            <span v-else-if="item.type==34" :class="['audio-content',!!item.played?'audio-content-play':'']"  @click="playPauseAudio(item,index)">
                                <span style="display: none">
                                    <audio :src="item.mediapath" controlsList="nodownload" oncontextmenu="return false" :ref="'audio-div'+chatIndex">
                                        您的浏览器不支持 audio 标签 。
                                    </audio>
                                </span>
                                <span class="audio-time">{{item.audio_time}}</span>
                            </span>
                            <!--42:个人名片/公众号名片-->
                            <span v-if="item.type==42" class="card-content">
                                <div style="position: relative;height: 60px;line-height: 40px;padding: 10px">
                                    <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                    <img v-if="item.mediapath==''" src="../../assets/cardIcon.png" alt="">
                                    <span style="display: inline-block;margin-left: 50px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;overflow: hidden;width: calc(100% - 50px)">{{item.title}}</span>
                                </div>

                                <div style="border-top: 1px solid #e5e5e5;padding: 0 10px;color: #999999;font-size: 12px;height: 25px;line-height: 25px">{{item.appid.substring(0,3)=='v1_'?'个人名片':'公众号名片'}}</div>
                                <!--<div style="border-top: 1px solid #999999;padding: 0 10px;color: #999999;font-size: 12px">{{item.certFlag=='24'?'公众号名片':'个人名片'}}</div>-->
                            </span>
                            <!--视频消息-->
                            <span v-if="item.type==43">
                                <video controls  style="width:150px;" id="upVideo" v-if="item.mediapath!=''">
                                    <source :src="item.mediapath" type="video/mp4">
                                </video>
                                <img v-else :src="item.iconurl" style="width:150px;height:200px;object-fit: cover">
                            </span>
                            <!--红包消息-->
                            <span v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==0" class="redpacket-content">
                                <span class="money-text">{{item.title}}</span>
                            </span>
                            <span v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==1" class="redpacket-content1" >
                                <span class="money-text">{{item.title}}<br>已领取 ￥{{item.chatRedPacket.money/100 }}</span>
                            </span>

                            <!--转账消息-->
                            <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==1" class="money-content">
                                <span class="money-text">{{item.chatTransferMoney.type==0?'点击确认收钱':''}}<br>{{item.content}}</span>
                            </span>
                            <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1">
                                <span class="money-text">{{item.chatTransferMoney.type==0?'已领取':'对方已收钱'}}<br>{{item.content}}</span>
                            </span>

                            <span v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==1" class="money-content">
                                <span class="money-text">{{item.chatTransferMoney.type==0?'':'对方未领取'}}<br>{{item.content}}</span>
                            </span>
                            <span v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1">
                                <span class="money-text">{{item.chatTransferMoney.type==0?'已收钱':'对方已领取'}}<br>{{item.content}}</span>
                            </span>
                            <span v-if="item.status==80&&item.send_by==0">
                                已撤回
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="modalShow" @click="modalShow=false" class="img_modal" style="">
            <div class="img_content">
                <a-spin size="large" :spinning="imgSpinning" style="position: "/>
                <img :src="modal_img" @mousewheel="bigimg($event)" ref="modalImg">
            </div>
        </div>
    </div>
</template>

<script>
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
    export default {
        name: 'chatHistoryMsgItem',
        props: {
            chatMsg: {
                type: Object,
                required: true
            },
            chatIndex:{
                type: Number,
                default:0
            },
        },
        data () {
            return {
                modalShow:false,
                modal_img:'',
                imgSpinning:false
            }
        },
        computed: {

        },
        methods:{
            showModal(item) {
                if(item.status==80) {
                    return
                }
                let _this = this
                this.modal_img = item.bigImg==''?item.iconurl:item.bigImg;
                this.modalShow = true
                if(item.type==3&&item.bigImg=='') {
                    this.imgSpinning = true
//                    当还未获取大图时，发送指令
                    comConf.isOfflineRobot(this.$store.state.liveChat.selectChatHistoryContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    let data = {
                        cmd:2024,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.$store.state.liveChat.selectChatHistoryContact.robot_username,
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
//                            _this.modal_img = 'data:image/jpeg;base64,'+ encodeURI(msg.cmdData.image)
//                            item.bigImg =  'data:image/jpeg;base64,'+ encodeURI(msg.cmdData.image)
                            _this.modal_img = msg.cmdData.image
                            item.bigImg =  msg.cmdData.image
                            _this.imgSpinning = false
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
//                开始/暂停语音播放
                let audioIndex = 0
                this.chatMsg.data.forEach((el,index1)=>{
                    if(index1<index&&el.type!='34') {
                        audioIndex += 1
                    }
                })
//                item.audio_time = Math.round(this.$refs['audio-div' + this.chatIndex][index - audioIndex].duration) || 0
                if(!!this.$refs['audio-div' + this.chatIndex][index - audioIndex].error) {
                    return
                }
                if (this.$refs['audio-div' + this.chatIndex][index - audioIndex].paused){
                    this.$refs['audio-div' + this.chatIndex][index - audioIndex].play();
                    this.chatMsg.data.forEach((el,index)=>{
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
                this.chatMsg.data.forEach((el)=>{
                    if(el.type=='34') {
                        if(audioIndex == index1) {
                            console.log('el',el)
                            this.$set(el,'played',false)
                        }
                        audioIndex += 1
                    }
                })
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
            }
        },
        mounted () {
            let that = this
            if(!!this.$refs['audio-div' + this.chatIndex]) {
                [].forEach.call(this.$refs['audio-div' + this.chatIndex], function (i) {
                    i.addEventListener("play", that.pauseAll.bind(i));
                    i.addEventListener("ended", that.endAudio.bind(i));
                })
            }
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
        created() {
            this.chatMsg.data.forEach((el,index)=>{
                el.type==1&&!!el.content&&(el.content = emoji.stringToHtml(el.content))
            })
        },
        beforeDestroy() {
            this.$ws.cmd2024 = null
        },
    }
</script>


