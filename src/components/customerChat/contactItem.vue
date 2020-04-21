<style lang="less" scoped>
    .contact-item {
        height: 80px;
        padding: 13px;
        color: rgb(16,16,16);
        display: flex;
        justify-content:space-between;
        align-items: center;
        overflow: hidden;
        position: relative;
        &:hover {
            .transfer-img {
                img {
                    display: none!important;
                }
                img.show-img {
                    display: inline-block!important;
                }
            }
        }
    }
    div.money {
        color: #fff;
        background: #fa9c3e;
    }
    div.select-item {
        background: rgba(90, 169, 205, 0.2);
        /*background:#D9D9D9;*/
        // #d4d2d2;
    }
    .top_set {
        background: #E1E1E1;
    }
    .width-4 {
        width: calc(~"calc(100% - 120px)");
    }
    .width-n4 {
        width: calc(~"calc(100% - 70px)");
    }
    .friendsList{
        height: 100%;
        vertical-align: middle;
        text-align: right;
        line-height: 27px;
        margin-right: 6px;
        display: inline-block;
    }
    .close-icon {
        visibility: hidden;
    }
    .menu{
        cursor: pointer;
        margin:0;
        height:44px;
        line-height:44px;
        padding:0 10px;
        &:hover{
            color:#5AA9CD;
        }
    }
</style>
<style>
    .contact-item .qqemoji {
        width: 20px!important;
        height: 20px!important;
    }
    .contact-item:hover{
        cursor: pointer;
        background: rgba(90, 169, 205, 0.32)!important;
        /*background:#d1d0d0!important;*/
    }
    .window:hover .close-icon {
        visibility: visible;
    }
    .close-icon:hover .menuRight{
        visibility: visible;
    }
</style>
<template>
<div>
    <div class='window' style="position:relative;overflow:hidden">
        <div class="close-icon" style="position: absolute;right: 16px;z-index:999;margin-top: 42px;cursor:pointer;" >
           <a-popover tigger="hover" placement="right" v-model="showAction">
               <template slot="content">
                   <p @click="onAction(contact,'1')"  class="menu"><a-icon type="export" style="margin-right:16px;"></a-icon>移至分组</p>
                   <p @click="onAction(contact,'2')"  class="menu"><a-icon :type="contact.top_set=='1'?'vertical-align-bottom':'to-top'" style="margin-right:16px;"></a-icon>{{contact.top_set=='1'?'取消置顶':'消息置顶'}}</p>
                   <p @click="onAction(contact,'3')"  class="menu"><a-icon type="delete" style="margin-right:16px;"></a-icon>移除对话</p>
                   <p @click="onAction(contact,'4')"  class="menu"><a-icon type="bell" style="margin-right:16px;"></a-icon>{{contact.no_hint=='1'?'关闭免打扰':'开启免打扰'}}</p>
               </template>
               <a-icon type="ellipsis" style="font-size: 20px;color:#5AA9CD"></a-icon>
           </a-popover>
        </div>
        <div class="contact-item" style=" cursor: pointer;" :class="[contact.red_packet==1||contact.transfer_money==1?'money':'',(contact.friend_user_name==selectContact.friend_user_name)&&(contact.robot_username==selectContact.robot_username)?'select-item':'',contact.top_set=='1'?'top_set':'']" @click="select()">
            <div style="display: flex;vertical-align: middle;align-items: center;z-index: 10;" :class="contact.type==49||contact.type==48||contact.red_packet==1||contact.transfer_money==1?'width-4':'width-n4'">
                <div style="display: inline-block;margin-right: 10px">
                    <!--<a-avatar v-if="contact.chat_type!=20" chat_type :src="contact.avatar_url" :size="54" style="border-radius: 10px"/>-->
                    <img v-if="contact.chat_type!=20" :src="contact.avatar_url" @error="imgExists($event)" style="width: 54px;height: 54px;border-radius: 10px">
                    <img v-if="contact.chat_type==20" src="../../assets/room_avatar.png" alt="" style="width: 54px;height: 54px;border-radius: 10px">
                </div>
                <div style="display: inline-block;width: calc(100% - 54px);color: #948D8D;position: relative">
                    <span style="width:90%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;color:#101010">
                        {{contact.chat_type=='20'?(contact.roomname||'未命名的群'):(contact.remark==''||contact.remark==undefined)?contact.nickname:contact.remark}}
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>{{contact.corp_name}}</span>
                            </template>
                            <span v-if="contact.wx_type=='20'&&contact.chat_type=='10'" style="color:#FF9800">@{{contact.corp_name}}</span>
                        </a-tooltip>
                        <img v-if="contact.chat_type=='20'&&contact.friend_user_name.search(/@im.chatroom/)!=(-1)" src="../../assets/companyWx.png" alt="" style="height: 17px">
                    </span>
                    <img src="../../assets/bell-off.png" alt="" v-if="contact.no_hint=='1'" style="width: 15px;height: 15px;vertical-align: middle;position: absolute;top: 25px;right: -15px">
                    <!--<span style="width:90%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">{{contact.nickname}}</span>-->
                    <span v-if="contact.type==1" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;height: 21px " v-html="contact.content"></span>
                    <span v-else-if="contact.type==3" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[图片]</span>
                    <span v-else-if="contact.type==5" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[链接]</span>
                    <span v-else-if="contact.type==6" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[文件]</span>
                    <span v-else-if="contact.type==33" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[小程序]</span>
                    <span v-else-if="contact.type==34" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[语音]</span>
                    <span v-else-if="contact.type==42" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[名片]</span>
                    <span v-else-if="contact.type==43" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[视频]</span>
                    <span v-else-if="contact.type==47" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[表情包]</span>
                    <span v-else-if="contact.type==48" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[红包]</span>
                    <span v-else-if="contact.type==49" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[转账]{{contact.content}}</span>
                </div>
            </div>
            <div v-if="contact.type==48||contact.red_packet==1" style="display: inline-block">
                <img src="../../assets/red-packet.png" alt="" style="width: 30px">
            </div>
            <div v-else-if="contact.type==49||contact.transfer_money==1" style="display: inline-block" class="transfer-img">
                <img v-if="(contact.friend_user_name==selectContact.friend_user_name)&&(contact.robot_username==selectContact.robot_username)" src="../../assets/money-1.png" alt="">
                <img v-else src="../../assets/money.png" alt="">
                <img class="show-img" style="display: none" src="../../assets/money-1.png" alt="">
            </div>
            <div class="friendsList">
                <span style="display: block;color: #948D8D">{{contact.created}}</span>
            </div>
            <a-badge  v-if="contact.no_hint=='0'" :numberStyle="{padding:'0',boxShadow:'none',backgroundColor:'#FF6B6B'}" :count="contact.num" :overflowCount="99" style="position: absolute;top: 6px;left: 5px"/>
            <!-- <a-icon class="close-icon" theme="filled" type="close-circle" style="position: absolute;right: 16px;bottom: 10px;font-size: 16px" @click="clearContact($event)"/> -->
            
        </div>
      <!-- </a-popover> -->
    </div>
</div>
</template>

<script>
    var emoji = require('../../common/emojiMap');
    export default {
        name: 'contactItem',
        props: {
            contact: {
                type: Object,
                required: true
            },
            searchKey: {
                type:String,
                default:''
            },
            index:{
                type:Number,
                required: true
            }
        },
        data () {
            return {
                showAction:false
            }
        },
        watch: {

        },
        computed: {
            selectContact () {
                return this.$store.state.liveChat.selectContact
            }
        },
        methods:{
            select() {
                this.$emit('select', this.contact)
            },
            onAction(item,type){
                this.$emit('action',item,type)
                this.showAction = false
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
            clearContact(e) {
                e.stopPropagation();
                this.$emit('clear',this.contact,this.index)
            }
        },
        created:function () {

            this.contact.type==1&&(this.contact.content = emoji.stringToHtml(this.contact.content))
        }
    }
</script>


