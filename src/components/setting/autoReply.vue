<style lang="less" scoped>
    .up-content {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        .up-img-content{
            position: absolute;
            top: 1px;
            left: 1px;
            right: 9px;
            bottom: 9px;
            background: #ffffff;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                vertical-align: top;
                position: relative;
            }
        }
        .up-img-modal {
            position: absolute;
            top: 1px;
            left: 1px;
            right: 9px;
            bottom: 9px;
            z-index: 10;
            visibility: hidden;
            .img-btn1 {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                left: 20%;
                font-size: 20px;
            }
            .img-btn2 {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                left: 65%;
                font-size: 20px;
            }
        }
        &:hover {
            .up-img-modal {
                background: rgba(250,250,250,0.51);
                visibility: visible;
            }
        }

    }
</style>
<style>
    .up-content .ant-upload.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
    }
</style>
<template>
    <div class="personal-setting">
        <div class="set-content">
            <div style="padding-bottom: 20px">
                <span style="color: #595959;display: inline-block;vertical-align: middle;margin-left: 10px">新消息提示音：</span>
                <a-switch v-model="personalItem.new_msg_audio_status" size="small"></a-switch>
            </div>
            <div>
                <span style="color: #595959;display: inline-block;vertical-align: middle;margin-left: 10px">自动回复：</span>
                <a-switch v-model="personalItem.auto_reply_status" size="small"></a-switch>
            </div>
            <div>
                <div style="padding: 20px 0">
                    <span style="color: #595959;display: inline-block;vertical-align: top;margin-left: 10px">忙碌状态：</span>
                    <a-textarea v-model="personalItem.busy_auto_reply" placeholder="请输入自动回复内容" autosize :maxlength="100" style="width: 50%;height: 60px;vertical-align: top;margin-right: 10px"/>
                    <a-upload class="up-content" name="file" :headers="headers" @change="handleChange1" listType="picture-card" :showUploadList="false" :beforeUpload="beforeUpload" action="/index.php?r=uc/user/upload">
                        <div>
                            <a-icon type="plus" style="fontSize:20px"/>
                            <div class="ant-upload-text">上传图片</div>
                        </div>
                        <div class="up-img-content"  v-if="personalItem.busy_auto_reply_image!=''">
                            <img :src="personalItem.busy_auto_reply_image" alt="" style="">
                        </div>
                        <div class="up-img-modal" v-if="personalItem.busy_auto_reply_image!=''">
                            <a-icon type="form" class="img-btn1"/>
                            <a-icon class="img-btn2" type="delete" @click="deleteFn($event,'1')"/>
                        </div>
                    </a-upload>
                </div>
                <div>
                    <span style="color: #595959;display: inline-block;vertical-align: top;margin-left: 10px">离线状态：</span>
                    <a-textarea v-model="personalItem.offline_auto_reply" placeholder="请输入自动回复内容" autosize :maxlength="100" style="width: 50%;height: 60px;vertical-align: top;margin-right: 10px"/>
                    <a-upload class="up-content" name="file" :headers="headers" @change="handleChange2" listType="picture-card" :showUploadList="false" :beforeUpload="beforeUpload" action="/index.php?r=uc/user/upload">
                        <div>
                            <a-icon type="plus" style="fontSize:20px"/>
                            <div class="ant-upload-text">上传图片</div>
                        </div>
                        <!--<img :src="personalItem.offline_auto_reply_image" alt="" style="width: 102px;height: 102px;object-fit: cover;vertical-align: top;border: 1px solid #d9d9d9">-->
                        <div class="up-img-content"  v-if="personalItem.offline_auto_reply_image!=''">
                            <img :src="personalItem.offline_auto_reply_image" alt="" style="">
                        </div>
                        <div class="up-img-modal" v-if="personalItem.offline_auto_reply_image!=''">
                            <a-icon type="form" class="img-btn1"/>
                            <a-icon class="img-btn2" type="delete" @click="deleteFn($event,'2')"/>
                        </div>
                    </a-upload>

                </div>
            </div>
            <div style="text-align: right">
                <a-button  type="primary" @click="save()">保存</a-button>
                <!--<a-button  @click="getPersonalInfo()">取消</a-button>-->
            </div>
        </div>
    </div>
</template>

<script>
    var storage = require('../../common/store')
    export default {
        name: 'autoReply',
        props: {
            personalItem: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                headers:{
                    Authorization: storage.store.get('token')
                },
            }
        },
        watch: {

        },
        computed: {

        },
        methods:{
            handleChange1(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true
                    return
                }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
                        this.personalItem.busy_auto_reply_image  = info.file.response.data.path;
                        this.loading = false;
                    } else {
                        this.$notification['warning']({
                            message: '上传错误',
                            description: info.file.response.msg,
                        });
                    }
                } else if (info.file.status === 'error') {
                    this.$notification['warning']({
                        message: '上传失败',
                        description: '文件'+ info.file.name +'上传失败',
                    });
                }
            },
            handleChange2(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true
                    return
                }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
                        this.personalItem.offline_auto_reply_image  = info.file.response.data.path;
                        this.loading = false;
                    } else {
                        this.$notification['warning']({
                            message: '上传错误',
                            description: info.file.response.msg,
                        });
                    }
                } else if (info.file.status === 'error') {
                    this.$notification['warning']({
                        message: '上传失败',
                        description: '文件'+ info.file.name +'上传失败',
                    });
                }
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg' ? true : file.type === 'image/png' ? true : file.type === 'image/jpg' ? true : false
                if(!isJPG) {
                    this.$notification['warning']({
                        message: '文件格式不正确',
                        description: '文件格式不正确，请选择JPG或PNG。',
                    });
                }
                const isLt2M = file.size / 1024 / 1024 < 1
                if(!isLt2M) {
                    this.$notification['warning']({
                        message: '超出文件大小限制',
                        description: '图像不能大于1MB！',
                    });
                    this.$message.error('图像不能大于1MB！')
                }
                return isJPG && isLt2M
            },
            deleteFn(e,type) {
                e.stopPropagation();
                if(type=='1') {
                    this.personalItem.busy_auto_reply_image  = '';
                }else {
                    this.personalItem.offline_auto_reply_image  = '';
                }
            },
            getPersonalInfo() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/get-user-setting-info',
                    data:this.personalItem
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1&&udata.data!=false) {
                        udata.data.new_msg_audio_status=udata.data.new_msg_audio_status=='1'?true:false
                        udata.data.busy_auto_reply_status=udata.data.busy_auto_reply_status=='1'?true:false
                        udata.data.offline_auto_reply_status=udata.data.offline_auto_reply_status=='1'?true:false
                        this.personalItem = udata.data
                    }
                });
            },
            save() {
                let data = JSON.parse(JSON.stringify(this.personalItem))
                data.new_msg_audio_status = data.new_msg_audio_status?'1':'0'
                data.auto_reply_status = data.auto_reply_status?'1':'0'
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/edit-user-setting',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        let data1 = JSON.parse(JSON.stringify(this.$store.state.user.user))
                        data1.new_msg_audio_status = data.new_msg_audio_status
                        this.$store.commit('user/setUser',data1)
                        this.$message.success('保存成功')
                        this.$emit('close')
                    }
                });
            }
        },
        created:function () {

        }
    }
</script>


