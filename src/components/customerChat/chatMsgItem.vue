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
            &-time {
                color: rgb(181,181,181);
                margin-bottom: 5px;
            }
            &-msg {
                .text-content {
                    display: inline-block;
                    max-width: 65%;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    position: relative;
                    color: rgb(16,16,16);
                    white-space: normal;
                    word-break: break-all;
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fff;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
                    }
                }
                .text-retract {
                    background: #DDDDDD;
                    color: #ffffff;
                    &::before {
                        border-right-color: #DDDDDD;
                    }
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
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        top:50%;
                        right: 0;
                        transform: translateY(-50%);
                    }
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fff;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fff;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fff;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #f99d3a;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fee0c4;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fa9e3b;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fce1c3;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-right-color: #fff;
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        margin-left: -18px;
                    }
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
            }
        }
    }
    div.msg-self {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex-direction:row-reverse;
        text-align: right;
        .content-left {
            display: inline-block;
            margin-left: 12px;
        }
        .content-right {
            display: inline-block;
            width: calc(~"100% - 50px");
            &-time {
                color: rgb(181,181,181);
                margin-bottom: 5px;
            }
            &-msg {
                .text-content {
                    display: inline-block;
                    max-width: 65%;
                    background: #5AA9CD;
                    padding: 10px;
                    border-radius: 5px;
                    position: relative;
                    text-align: left;
                    color: #ffffff;
                    white-space: normal;
                    word-break: break-all;
                    &::after {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #5AA9CD;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
                    }
                    .qqemoji {
                        width: 20px!important;
                        height: 20px!important;
                    }
                }
                .text-retract {
                    background: #DDDDDD;
                    color: #ffffff;
                    &::after {
                        border-left-color: #DDDDDD;
                    }
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
                    color: #ffffff;
                    white-space: normal;
                    word-break: break-all;
                    cursor: pointer;
                    text-align: left;
                    border: 1px solid #f0f0f0;
                    img {
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        top:50%;
                        right: 0;
                        transform: translateY(-50%);
                    }
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #fff;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
                    }
                }
                .mini-program-content{
                    display: inline-block;
                    text-align: left;
                    width: 260px;
                    background: #fff;
                    border-radius: 5px;
                    position: relative;
                    color: #ffffff;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #fff;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
                    }
                }
                .card-content {
                    display: inline-block;
                    text-align: left;
                    width: 220px;
                    background: #fff;
                    border-radius: 5px;
                    position: relative;
                    color: #ffffff;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #fff;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-left: -18px;
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
                    &::after {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #f99d3a;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #fee0c4;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #fa9e3b;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
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
                    &::before {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #fce1c3;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
                    }
                }
                .audio-content {
                    max-width: 200px;
                    min-width: 100px;
                    height: 40px;
                    line-height: 40px;
                    display: inline-block;
                    background: #5AA9CD;
                    padding: 10px;
                    border-radius: 5px;
                    position: relative;
                    text-align: left;
                    color: rgb(16,16,16);
                    background-image: url("../../assets/sound_play1.png") ;
                    background-repeat: no-repeat;
                    background-position:95% 7px;
                    background-size: 26px;
                    cursor: pointer;
                    &::after {
                        margin-top: 8px;
                        border: 10px solid transparent;
                        border-left-color: #5AA9CD;
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        margin-right: -18px;
                    }
                    .audio-time {
                        position: absolute;
                        right: calc(~"100% - 20px");
                        bottom: 0;
                        color: #2A2A2A;
                        font-size: 14px;
                    }
                }
                .audio-content-play {
                    background-image: url("../../assets/sound_play-1.gif") ;
                }
            }
        }
    }
    .hidden {
        display: none!important;
    }
    .chat-history {
        .content-right {
            width: 100%!important;
            .text-content,.audio-content,.link-content,.mini-program-content,.card-content {
                /*background: #f0f2f5!important;*/
                &::after {
                    border-color: transparent!important;
                }
                &::before {
                    border-color: transparent!important;
                }
            }
            .redpacket-content,.redpacket-content1,.money-content,.money-content1 {
                &::after {
                    border-color: transparent!important;
                }
                &::before {
                    border-color: transparent!important;
                }
            }
            .text-retract {
                color: #101010!important;
            }
        }
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
    .user-item {
        height: 30px;
        line-height: 30px;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        width: 160px;
        background: #F2F2F2;
        position: fixed;
        transform: translateY(-100%);
        &:hover {
            background: #DDDDDD;
            cursor: pointer;
        }
        span {
            margin-left: 10px;
        }
    }
    .msg-retract {
        height: 30px;
        line-height: 30px;
        background: #F2F2F2;
        position: fixed;
        padding: 0 10px;
        &:hover {
            background: #DDDDDD;
            cursor: pointer;
        }
    }
   .msg-action{
        position:fixed;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
        border-radius:5px;
        padding:10px;
        background:#fff;
        z-index:9999;
        .list{
            height:30px;
            line-height:30px;
            // text-align:center;
            width:100px;
            cursor:pointer;
            background:#fff;
            .icon-i{
                margin-right:16px;
            }
            &:hover{
             color:#0b8cff;
            }
        }
    }
    
</style>
<style>
    .text-content > .qqemoji {
        width: 20px!important;
        height: 20px!important;
    }
    .msg-self .content-right-msg .ant-spin .ant-spin-dot i {
        background-color: #d4cbcb;
    }
    .msg-other .content-right-msg .ant-spin .ant-spin-dot i {
        background-color: #d4cbcb;
    }
</style>
<template>
    <div >
        <div class="header-date" v-if="style_type=='1'">
            {{chatMsg.key}}
        </div> 
        <!-- user-item :style="{'top':atTop+'px','left':atLeft+'px'}"-->
        <div id="liveChatAction" class="msg-action" v-if="liveChatAction&&!!selectMsg"  :style="{'top':atTop+'px','left':atLeft+'px'}">  
            <div  class="list " @click="selectUser()" v-if="at" >
            <p style="text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden;"><a-icon type="user" class="icon-i" ></a-icon> @ {{selectItem.nickname}}</p>
            </div>
            <div @click="copyCode" id='btn' :data-clipboard-text='selectMsg.type=="1"?selectMsg.content:selectMsg.type=="5"?selectMsg.url:selectMsg.iconurl' class="list" v-if='copy' ><a-icon type="copy" class="icon-i"></a-icon> 复制</div>
            <div  v-if="(selectMsg.type=='1'||selectMsg.type=='3'||selectMsg.type=='5'||selectMsg.type=='33'||(selectMsg.type=='42'&&selectMsg.appid.substring(0,3)!='v1_')||selectMsg.type=='47')||(selectMsg.send_by!='0'&&(selectMsg.type=='43'))" class="list" @click='foward'><a-icon class="icon-i" type="retweet" ></a-icon> 转发</div>
            <!-- <div class="list"  @click="downFiles" v-if='down'><a-icon class="icon-i" type="download"></a-icon>  下载</div> -->
            <div v-if="(selectMsg.type=='1'||selectMsg.type=='3'||selectMsg.type=='5'||selectMsg.type=='33'||(selectMsg.type=='42'&&selectMsg.appid.substring(0,3)!='v1_')||selectMsg.type=='47')||(selectMsg.send_by!='0'&&(selectMsg.type=='43'))" class="list" @click="svMaterial(selectMsg)"><a-icon class="icon-i" type="save"></a-icon> 保存素材</div>
            <div class="list" @click="checkboxMenue"><a-icon class="icon-i" type="filter" ></a-icon> 多选</div>
            <div id="msgRetract" class="list" v-if="msgRetract&&!!selectMsg" @click="msgRetractFn" ><a-icon class="icon-i" type="login" ></a-icon> 撤回</div>
        </div>
        <div style="padding-bottom: 10px" ondragstart="return false">
            <!-- <a-checkbox :checked="item.checkedFlg" @change="checkedBox"></a-checkbox> -->
            <!-- <a-checkbox-group @change='choseGroupList' v-model="chatUserListChose" style="width:100%;"> -->
            <div v-for="(item,index) in chatMsg.data" :key="index" style="padding-bottom: 5px">
                <div v-if="item.status==70||(item.status==90)" style="text-align: center">
                    <!--系统提示消息-->
                    <span v-if="item.status==70||style_type=='0'" style="background: #d4d2d2;border-radius: 2px;padding: 2px 10px;display: inline-block;word-break: break-all;color: #ffffff;font-size: 12px" v-html="item.content"></span>
                </div>
                <div v-else :class="[item.send_by!=0?'msg-self':'msg-other',style_type=='1'?'chat-history':'',item.flag==true?'position_div':'']">
                    <div :class="[style_type=='1'?'hidden':'','content-left']" style="position:relative;">
                        <!--<a-avatar :src="item.send_by==0?item.avatar_url:item.robot_avatar_url" :size="54" style="border-radius: 10px"/>-->
                        <a-checkbox :checked="item.checkedFlg" v-if="forWardSelect" :disabled="(item.type=='34'||item.type=='48'||item.type=='49'||item.type=='6')||((item.type=='43')&&item.send_by=='0')||(item.type=='42'&&item.appid.substring(0,3)=='v1_')" @change="checkedBox(item,index)" :ref="'checkbx'+chatIndex"  :style="{position:'absolute',left:item.send_by==0?'-19px':'56px',top:item.send_by==0?'16px':'16px'}"  ></a-checkbox>
                        <img :src="item.send_by==0?item.avatar_url:item.robot_avatar_url" @error="imgExists($event)" style="display:inline-block;width: 54px;height: 54px;border-radius: 10px" class="unselect"  ondragstart="return false"/>
                    </div>
                    <div class="content-right" >
                        <div class="content-right-time">
                            <!--<span v-if="item.send_by==0&&item.friend_user_name.search(/@chatroom/)!=(-1)" style="color: rgb(16,16,16)">{{item.remark?item.remark:item.room_nickname?item.room_nickname:item.nickname}}</span>-->
                            <!--<span v-if="item.send_by==0&&item.friend_user_name.search(/@chatroom/)==(-1)" :class="[style_type=='0'?'hidden':'']" style="color: rgb(16,16,16)">{{item.nickname}}</span>-->
                            <span v-if="item.send_by==0&&$store.state.liveChat.selectContact.chat_type!='10'" style="color: rgb(16,16,16)">{{item.remark?item.remark:item.room_nickname?item.room_nickname:item.nickname}}</span>
                            <span v-if="item.send_by==0&&$store.state.liveChat.selectContact.chat_type=='10'" :class="[style_type=='0'?'hidden':'']" style="color: rgb(16,16,16)">{{item.nickname}}</span>

                            <!--<span v-if="item.friend_user_name.search(/@chatroom/)!=(-1)&&style_type=='0'">{{item.created.slice(10)}}</span>-->
                            <span v-if="style_type=='1'">{{item.created}}</span>
                            <span v-if="item.send_by!=0" :class="[style_type=='0'?'hidden':'']"  style="color: rgb(16,16,16)">我</span>

                            <!--<span v-if="item.send_by==0" :class="[style_type=='0'?'hidden':'']" style="color: rgb(16,16,16)">{{item.nickname}}</span>-->
                            <!--<span >{{item.created}}</span>-->
                            <!--<span v-if="item.send_by!=0" :class="[style_type=='0'?'hidden':'']"  style="color: rgb(16,16,16)">我</span>-->
                        </div>
                        <div class="content-right-msg">
                            <!--文字-->
                            <span v-if="item.status==80&&item.send_by!=0" ondragstart="return false">
                                已撤回
                            </span>
                            <a-popconfirm placement="left" title="重新发送消息" okText="是" cancelText="否" @confirm="confirm(item)"  v-if="item.status==60&&item.send_by!=0">
                                <a-icon slot="icon" type="info-circle" theme="filled" style="color: #FF9800"/>
                                <a href="#">
                                    <a-icon  type="info-circle" theme="filled" style="color: #F98380;margin-right: 5px"/>
                                </a>
                            </a-popconfirm>
                            <a-spin v-if='(!!item.completes||item.status==20)&&item.send_by!=0' size="small" style="margin-right: 5px"/>
                            <span v-if="item.type==1"  :id="item.id" :class="['text-content',item.status==80?'text-retract':'']"  v-html="item.content"  @contextmenu="showMsgRetract($event,item)"></span>
                            <!--图片及表情包-->
                            <img v-else-if="item.type==3||item.type==47" class="img-content unselect" :src="item.iconurl" @click="showModal(item)" @contextmenu="showMsgRetract($event,item)">
                            <!--5:链接-->
                            <span v-if="item.type==5" class="link-content" @click="navToLink(item.url)" @contextmenu="showMsgRetract($event,item)">
                                <div style="color:#222;font-size:14px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden;">{{item.title}}</div>
                                <div style="position: relative;margin-top: 10px">
                                    <span style="width: 180px;font-size: 12px;color: #999999;min-height: 40px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.desc}}</span>
                                    <img v-if="item.mediapath==''" src="../../assets/link-img.png" alt="">
                                    <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                </div>
                            </span>
                            <!--6:文件-->
                            <span v-if="item.type==6" class="link-content"  style="cursor: default" @contextmenu="showMsgRetract($event,item)" ondragstart="return false">
                                <!--<div style="width: 80%;word-break: break-all">{{item.title}}</div>-->
                                <!--<div style="position: relative;margin-top: 10px">-->
                                    <!--<span style="display: inline-block;width: 180px;font-size: 12px;color: #999999;">{{item.desc}}</span>-->
                                    <!--<img v-if="item.mediapath==''" src="../../assets/file-img1.png" alt="" style="top: 0">-->
                                    <!--<img v-if="item.mediapath!=''" :src="item.mediapath" alt="" style="top: 0">-->
                                <!--</div>-->
                                <div style="width: 75%;word-break: break-all;color: #101010;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.title}}</div>
                                <div style="position: relative;margin-top: 10px">
                                    <span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{item.desc}}</span>
                                </div>
                                <div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 20px;transform: translateY(-50%);border-radius: 4px">
                                    <img v-if="item.mediapath==''" src="../../assets/file-img1.png" alt="" style="position: static;transform: translateY(0);width: 48px;height: 48px">
                                    <img v-if="item.mediapath!=''" :src="item.mediapath" alt="" style="position: static;transform: translateY(0);width: 48px;height: 48px">
                                </div>
                            </span>
                            <!--33:小程序-->
                            <span v-if="item.type==33" class="mini-program-content" @contextmenu="showMsgRetract($event,item)" ondragstart="return false">
                                <div class="title">
                                    <img :src="item.iconurl" alt="">
                                    <span style="text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: calc(100% - 25px);overflow: hidden;display: inline-block;vertical-align: middle">{{item.title}}</span>
                                </div>
                                <div class="content" style="max-height: 260px;overflow: hidden">
                                    <span style="color: #000000;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;padding-bottom: 0">{{item.desc}}</span>
                                    <img  style="padding-top: 10px" :src="item.mediapath" alt="">
                                </div>
                                <div style="border-top: 1px solid #e5e5e5;color: #999999;font-size: 12px;height: 25px;line-height: 25px">
                                    <img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
                                    小程序,请在手机上查看
                                    <!--小程序 <span style="float: right;font-size: 12px">详细信息请在手机端查看</span>-->
                                </div>
                            </span>
                            <!--34:语音-->
                            <span v-else-if="item.type==34" ondragstart="return false" :class="['audio-content',!!item.played?'audio-content-play':'']"  @click="playPauseAudio(item,index)" @contextmenu="showMsgRetract($event,item)">
                                <span style="display: none">
                                    <audio :src="item.mediapath" controlsList="nodownload" oncontextmenu="return false" :ref="'audio-div'+chatIndex">
                                        您的浏览器不支持 audio 标签 。
                                    </audio>
                                </span>
                                <span class="audio-time">{{item.audio_time}}</span>
                            </span>
                            <!--42:个人名片/公众号名片-->
                            <span v-if="item.type==42" class="card-content" @contextmenu="showMsgRetract($event,item)" ondragstart="return false">
                                <div style="position: relative;height: 60px;line-height: 40px;padding: 10px">
                                    <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                    <img v-if="item.mediapath==''" src="../../assets/cardIcon.png" alt="">
                                    <span style="display: inline-block;margin-left: 50px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;overflow: hidden;width: calc(100% - 50px);color: #999999">{{item.title}}</span>
                                </div>

                                <div style="border-top: 1px solid #e5e5e5;padding: 0 10px;color: #999999;font-size: 12px;height: 25px;line-height: 25px">{{item.appid.substring(0,3)=='v1_'?'个人名片':'公众号名片'}}</div>
                                <!--<div style="border-top: 1px solid #999999;padding: 0 10px;color: #999999;font-size: 12px">{{item.certFlag=='24'?'公众号名片':'个人名片'}}</div>-->
                            </span>
                            <!--视频消息-->
                            <span v-if="item.type==43" @contextmenu="showMsgRetract($event,item)" >
                                <video controls  style="width:150px;" id="upVideo" v-if="item.mediapath!=''">
                                    <source :src="item.mediapath" type="video/mp4">
                                </video>
                                <img v-else :src="item.iconurl" style="width:150px;height:200px;object-fit: cover">
                            </span>
                            <!--红包消息-->
                            <span v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==0" class="redpacket-content" @click="receiveRedPacket(item)">
                                <span class="money-text">{{item.title}}</span>
                            </span>
                            <span v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==1" class="redpacket-content1" @click="receiveRedPacket(item)">
                                <span class="money-text">{{item.title}}<br>已领取 ￥{{item.chatRedPacket.money/100 }}</span>
                            </span>
                            <span v-else-if="item.type==48&&item.send_by!=0&&item.chatRedPacket.inner_type==0" class="redpacket-content" >
                                <span class="money-text">{{item.title}}</span>
                            </span>
                            <span v-else-if="item.type==48&&item.send_by!=0&&item.chatRedPacket.inner_type==1" class="redpacket-content1">
                                <span class="money-text">{{item.title}}<br>已领取 ￥{{item.chatRedPacket.money/100 }}</span>
                            </span>
                            <!--转账消息-->
                            <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==1" class="money-content" @click="receiveTransfeMoney(item)">
                                <span class="money-text">{{item.chatTransferMoney.type==0?'点击确认收钱':''}}<br>{{item.content}}</span>
                            </span>
                            <span v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1" @click="receiveTransfeMoney(item)">
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
                            <span v-if="item.status==80&&item.send_by==0">
                                已撤回
                            </span>
                            <a-spin v-if="!!item.complete&&item.send_by==0" size="small" style="margin-right: 5px"/>
                            <!-- 视频消息  -->
                            <!-- <div v-if="dataItem.type=='11'" style="text-align: center;max-height: 120px;overflow:hidden;position:relative;" class="mediaImg">
                                <div class="video">
                                    <a-icon type="play-circle" class="vidoIcon"></a-icon>
                                </div>
                                <video   style="width:100%" >
                                    <source :src="dataItem.mediapath" type="video/mp4">
                                </video>
                            </div> -->
                        </div>
                    </div>
                </div>
                 
            </div>
            <!-- </a-checkbox-group> -->
        </div>
        <div v-if="modalShow" @click="modalShow=false" class="img_modal" style="">
            <div class="img_content" ondragstart="return false" unselectable="on">
                <a-spin size="large" :spinning="imgSpinning"/>
                <img :src="modal_img" @mousewheel="bigimg($event)" class="unselect"  ref="modalImg">
            </div>
        </div>
        <!--群@用户-->
        <!-- <div id="msgAt" class="user-item" @click="selectUser()" v-if="msgAtStatus&&!!selectItem" :style="{'top':atTop+'px','left':atLeft+'px'}">
            <span><a-icon type="user"></a-icon> @ {{selectItem.nickname}}</span>
        </div> -->
        <!--撤回消息-->
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
    export default {
        name: 'chatMsgItem',
        props: {
            chatMsg: {
                type: Object,
                required: true
            },
            style_type:{
                type: String,
                default:'0'
            },
            chatIndex:{
                type: Number,
                default:0
            },
            msgAtStatus:{
                type:Boolean,
                default:false
            },
            msgRetract:{
                type:Boolean,
                default:false
            },
            liveChatAction:{
                type:Boolean,
                default:false
            },
            forWardSelect:{
                type:Boolean,
                default:false
            },
            selectNumflg:{
                type:Boolean,
                default:false
            },
            groupSelestList:{
                type:Array,
                default:() => []
            }
        },
        data () {
            return {
                modalShow:false,
                modal_img:'',
                imgSpinning:false,
                selectItem:null,
                atTop:0,
                atLeft:0,
                selectMsg:null,
                copy:false,
                down:false,
                at:false,
                //forWardSelect:false,
                chatUserListChose:[],
                chatListGroup:[],
                groupSelestsList:[],
                setTime:true
            }
        },
        watch:{
            chatMsg:{
                handler: function(value,value2) {
                    this.sleep(value)
				},
				deep: true
            }
        },
        computed: {
            
        },
        methods:{
            svMaterial(item){
                this.$emit('material',item)
            },
            sleep(value){
                const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
                async function f(){
                    await delay(8000);
                    return 'GO'
                }
                f().then(v => {
                    if(v){
                        this.chatMsg.data.forEach(items=>{
                            if(items.complete){
                                items.completes = true
                            }else{
                                items.completes = false
                            }
                        })
                    }
                });
            },
            showModal(item) {
                if(item.status==80) {
                    return
                }
                let _this = this
                if(this.$store.state.liveChat.selectWx.wx_type=='10') {
                    this.modal_img = item.bigImg==''?item.iconurl:item.bigImg;
                }else {
                    this.modal_img = item.iconurl;
                }
                this.imgSpinning = false
                this.modalShow = true
                if(item.type==3&&item.bigImg==''&&this.$store.state.liveChat.selectWx.wx_type=='10') {
                    this.imgSpinning = true
//                    当还未获取大图时，发送指令
                    comConf.isOfflineRobot(this.$store.state.liveChat.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    let data = {
                        cmd:2024,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.$store.state.liveChat.selectContact.robot_username,
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
            receiveTransfeMoney(item) {
                this.$parent.receiveTransfeMoney(item)
            },
            receiveRedPacket(item) {
                this.$parent.receiveRedPacket(item)
            },
            navToLink(url) {
                let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
                window.open(reg1.test(url)?url:'//'+url)
            },
            playPauseAudio(item,index) {
//                开始/暂停语音播放
                if(!item.mediapath || item.mediapath == '') {
                    this.$set(item,'complete',true)
                    this.$forceUpdate()
//                    item.complete = true
                    return
                }
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
            },
            contextmenu(e,item) {
                //群
                if(item.send_by==0&&item.friend_user_name.search(/@chatroom/)!=(-1)) {
                    //e.preventDefault()
                    //this.selectItem = item
                    //this.$parent.msgAtStatus = true
                    //this.$parent.msgRetract = false
                    // this.atTop = e.clientY
                    // this.atLeft = e.clientX
                    //this.$emit('rightClick',{index:this.chatIndex,type:2})
                }
            },
            selectUser() {
                this.$emit('select',{
                    nickname:this.selectItem.nickname,
                    username:this.selectItem.toUsername
                })
                 this.$parent.liveChatAction = false
                this.selectItem =null
            },
            liveChatActionFn(){

            },
            checkboxMenue(){
                this.$parent.forWardSelect = true
                this.$parent.liveChatAction = false
                 this.selectItem =null
            },
            checkedBox(item,index){
                let itemFlag = true;
                this.groupSelestList.length&&this.groupSelestList.forEach((el,idx)=>{
                    if(el.data.msgSvrId === item.msgSvrId){
                        this.$emit('forWardItem',{index:idx})
                        itemFlag = false
                    }
                })
                if(this.selectNumflg&&itemFlag){
                    item.checkedFlg = item.checkedFlg
                    this.$message.warn(`最多可选择5条信息`)
                }else{
                    item.checkedFlg = !item.checkedFlg;
                    this.$forceUpdate()
//                    this.chatMsg.data.forEach((el,idx)=>{
//                        if(el.msgSvrId === item.msgSvrId&&(el.status!='70'&&el.status!='90')){
//                            this.$set(this.chatMsg.data,idx,item)
//                        }
//                    })
                    if(itemFlag){
                        this.$emit('forWardItem',{data:item,type:'2'})
                    }
                }
            },
            clearCheck() {
                this.chatMsg.data.forEach((el,idx)=>{
                    el.checkedFlg = false
                })
            },
            choseGroupList(item){
                if(item[0].friend_user_name.search(/@chatroom/)===(-1)||item[0].friend_user_name.search(/@im.chatroom/)!=(-1)){
                    if(this.chatUserListChose.length>5){
                        this.chatUserListChose.pop()
                        this.$message.warn(`最多可选择5条信息`)
                        return
                    }
                    if( !this.chatUserListChose){
                        this.$emit('forWardItem', '0')
                    }else{
                        this.$emit('forWardItem', this.chatUserListChose)
                    }   
                }
            },
            copyCode () {
                if(this.selectMsg.type=="1"||this.selectMsg.type=="5") {
                    let clipboard = new Clipboard('#btn')
                    let _this = this;
                    clipboard.on('success', function (e) {
                        _this.$message.success(`复制成功`)
                        clipboard.destroy()
                    })
                }else {
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    let img = new Image;//通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
                    img.crossOrigin = 'Anonymous';
                    //要先确保图片完整获取到，这是个异步事件
                    img.onload = _=>{
                        canvas.height = img.height;//确保canvas的尺寸和图片一样
                        canvas.width = img.width;
                        ctx.drawImage(img,0,0);//将图片绘制到canvas中
                        let dataURL = canvas.toDataURL('image/png');//转换图片为dataURL,传第二个参数可压缩图片,前提是图片格式jpeg或者webp格式的
                        canvas = null;
                        //将base64复制到剪贴板
                        let oInput = document.createElement('input');
                        oInput.value = dataURL;
                        document.body.appendChild(oInput);
                        oInput.select(); // 选择对象
                        document.execCommand("Copy"); // 执行浏览器复制命令
                        oInput.className = 'oInput';
                        oInput.style.display='none';
//                        this.$parent.pasteImg(dataURL)
                    };
                    img.src = this.selectMsg.bigImg || this.selectMsg.iconurl;
                }
                this.$parent.liveChatAction = false
                this.selectItem =null
            },

            foward(){
                this.$emit('forWardObj',this.selectMsg )
            },
            msgRetractFn() {
                if(!this.selectMsg.msgSvrId) {
                    return
                }
                let data = {
                    cmd:2061,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.$store.state.liveChat.selectContact.robot_username,
                    cmdData:{
                        msgSvrId:this.selectMsg.msgSvrId,
                        talker:this.selectMsg.friend_user_name,
                    }
                }
                this.$ws.sendMsgFun(data)
                this.selectMsg.complete = true
                this.$parent.msgRetract = false
                this.$parent.liveChatAction = false
                this.$ws.cmd2061 = msg=>{
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
            },
            showMsgRetract(e,item) {
                this.at = false
                if(item.send_by==0&&(item.friend_user_name.search(/@chatroom/)!=(-1)||item.friend_user_name.search(/@im.chatroom/)!=(-1))&&item.toUsername != item.username ) {
                    e.preventDefault()
                    this.at = true
                    this.selectItem = item
                    this.$parent.msgAtStatus = true
                    this.$parent.msgRetract = false
                    this.atTop = e.clientY
                    this.atLeft = e.clientX
                    this.$emit('rightClick',{index:this.chatIndex,type:2})
                }
                if(item.send_by!=0&&item.status!=80&&item.status!=60) {
                    e.preventDefault()
                    this.$parent.liveChatAction = true
                    if((new Date().getTime()-new Date(item.created).getTime())>120000) {
                        this.$parent.msgRetract = false
                        //return
                    }else{
                        this.$parent.msgRetract = true
                    }
                    item.type == '1'||item.type == '3'||item.type == '5'?this.copy = true:this.copy = false;
                    this.selectMsg = item
                    this.$parent.msgAtStatus = false
                    this.atTop = e.clientY
                    this.atLeft = e.clientX
                    this.$emit('rightClick',{index:this.chatIndex,type:1})
                }else{
                    e.preventDefault()
                    this.$parent.msgRetract = false
                    this.$parent.msgAtStatus = false
                    this.$parent.liveChatAction = true
                    this.selectMsg = item
                    item.type == '1'||item.type == '3'||item.type == '5'?this.copy = true:this.copy = false;
//                    item.type === '6'?this.down = true:this.down = false;
                    this.atTop = e.clientY
                    this.atLeft = e.clientX
                    this.$emit('rightClick',{index:this.chatIndex,type:1})
                }
                
            },
            confirm(item) {
                if(item.complete) {
                    this.$message.info('正在重发中，请稍候再试')
                    return
                }
                item.status = '10'
                if(!item.msgId||item.msgId=='0') {
//                    此时可能是插入的消息超时或者刷新出来的消息超时,重发消息
                    this.resendMsg(item)
                    return
                }
                comConf.isOfflineRobot(this.$store.state.liveChat.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2062,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.$store.state.liveChat.selectContact.robot_username,
                    cmdData:{
                        msgId:item.msgId,
                    },
                    pageKey:item.pageKey
                }
                this.$ws.sendMsgFun(data)
                item.complete = true
                this.$ws.cmd2062 = msg=>{
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
            },
            resendMsg(item) {
                let data = {
                    cmd:0,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.$store.state.liveChat.selectContact.robot_username,
                    cmdData:{},
                    pageKey:item.pageKey
                }
                switch (item.type) {
                    case '1':
//                        文字
                        data.cmd = 2003
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            content:emoji.htmlToString(item.content),
                        }
                        break
                    case '3':
                    case '47':
//                        图片
                        data.cmd = 2004
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            imgpath:[item.mediapath],
                        }
                        break
                    case '5':
//                        链接
                        data.cmd = 2007
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            title:item.title,
                            description:item.desc,
                            url:item.url,
                            imgUrl:item.mediapath,
                        }
                        break
                    case '42':
//                        公众号
                        data.cmd = 2006
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            primeval:item.orginid,
                            nickname:item.title,
                            alias:item.alias,
                        }
                        break
                    case '33':
//                        小程序
                        data.cmd = 2005
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            title:item.title,
                            description:item.desc,
                            url:item.url,
                            primeval:item.orginid,
                            appid:item.appid,
                            smallIconUrl:item.iconurl,
                            imgUrl:item.mediapath
                        }
                        break
                    case '6':
                        data.cmd = 2056
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            fileUrl:item.mediapath,
                            fileName:item.title
                        }
                        break
                    case '43':
                        // 视频素材
                        data.cmd = 2057
                        data.cmdData = {
                            toUser:this.$store.state.liveChat.selectContact.friend_user_name,
                            videoUrl:item.mediapath,
                            thumbUrl:item.mediapath+'?vframe/jpg/offset/1/w/200/h/200',
                            videoLength:10
                        }
                        break
                }
                comConf.isOfflineRobot(this.$store.state.liveChat.selectContact.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$set(item,'complete',true)
                this.$forceUpdate()
//                item.complete = true
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
//            setTimeout(_=>{
//                let index1 = 0
//                this.chatMsg.data.forEach((el,index)=>{
//                    if(el.type==34) {
//                        el.audio_time = !!that.$refs['audio-div' + that.chatIndex][index1].duration?Math.round(that.$refs['audio-div' + that.chatIndex][index1].duration):''
//                        index1 += 1
//                    }
//                })
//            },1500)
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
                el.checkedFlg = false
                el.type==1&&!!el.content&&(el.content = emoji.stringToHtml(el.content))
            })
        }
    }
</script>


