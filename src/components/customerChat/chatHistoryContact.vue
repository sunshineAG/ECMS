<style lang="less" scoped>
    .contact-item1 {
        height: 60px;
        padding: 13px;
        color: rgb(16,16,16);
        display: flex;
        justify-content:space-between;
        align-items: center;
        overflow: hidden;
        position: relative;
    }
    div.select-item1 {
        background:#dadada;
    }
    .contact-item1:hover{
        cursor: pointer;
        background:rgb(235, 235, 235);
    }
</style>
<style>
</style>
<template>
    <div class="contact-item1" style=" cursor: pointer;" :class="[(contact.friend_user_name==selectChatHistoryContact.friend_user_name)&&(contact.robot_username==selectChatHistoryContact.robot_username)?'select-item1':'']" @click="select()">
        <div style="display: flex;vertical-align: middle;align-items: center;z-index: 10;width: 90%">
            <div style="display: inline-block;margin-right: 10px">
                <img v-if="contact.chat_type!=20" :src="contact.avatar_url" @error="imgExists($event)" style="width: 40px;height: 40px;border-radius: 10px">
                <img v-if="contact.chat_type==20" src="../../assets/room_avatar.png" alt="" style="width: 40px;height: 40px;border-radius: 10px">
            </div>
            <div style="display: inline-block;width: calc(100% - 54px);color: #585858">
                <span style="width:90%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">{{contact.chat_type=='20'?(contact.roomname||'未命名的群'):(contact.remark==''||contact.remark==undefined)?contact.nickname:contact.remark}}</span>
                <!-- <span style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;font-size: 12px;color: rgba(153, 153, 153, 1) ">消息条数{{contact.chat_number}}</span> -->
            </div>
        </div>
        <div style="position: absolute;top: 50%;right: 10px;transform: translateY(-50%)" v-if="contact.display_status=='1'">
            <img src="static/img_file/warning.svg" alt="" style="width: 20px">
            <!--<a-icon type="warning" style="color: #f44321"/>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: 'chatHistoryContact',
        props: {
            contact: {
                type: Object,
                required: true
            }
        },
        data () {
            return {

            }
        },
        watch: {

        },
        computed: {
            selectChatHistoryContact () {
                return this.$store.state.liveChat.selectChatHistoryContact
            }
        },
        methods:{
            select() {
                this.$emit('select', this.contact)
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
        created:function () {
        }
    }
</script>


