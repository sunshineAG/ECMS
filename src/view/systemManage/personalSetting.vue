<style lang="less" scoped>
	.personal-setting {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
		background: #fff;
		.set-title {
			padding: 20px;
			border-bottom: 1px solid #E9E9E9;
			color: #101010;
		}
		.set-content {
			padding: 20px;
		}
	}
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
<template>
	<div class="personal-setting">
		<div class="set-title">
			系统 / 个人设置
		</div>
		<div class="set-content">
			<div style="font-size: 16px;color: #101010">
				通知
			</div>
			<div style="padding: 20px 0">
				<a-switch v-model="personalItem.new_msg_audio_status" size="small"></a-switch>
				<span style="display: inline-block;vertical-align: middle;margin-left: 10px">新消息提示音</span>
			</div>
			<div style="font-size: 16px;color: #101010">
				自动回复设置
			</div>
			<div style="padding: 20px 0">
				<div>
					<a-switch v-model="personalItem.busy_auto_reply_status" size="small"></a-switch>
					<span style="display: inline-block;vertical-align: middle;margin-left: 10px">账号忙碌时自动回复（100字以内）</span>
				</div>
				<div style="padding: 20px">
					<a-textarea v-model="personalItem.busy_auto_reply" placeholder="请输入自动回复内容" autosize :maxlength="100" style="width: 50%;height: 102px;vertical-align: top;margin-right: 10px"/>
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
					<a-switch v-model="personalItem.offline_auto_reply_status" size="small"></a-switch>
					<span style="display: inline-block;vertical-align: middle;margin-left: 10px">账号离线时自动回复（100字以内）</span>
				</div>
				<div style="padding: 20px">
					<a-textarea v-model="personalItem.offline_auto_reply" placeholder="请输入自动回复内容" autosize :maxlength="100" style="width: 50%;height: 102px;vertical-align: top;margin-right: 10px"/>
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
			<div style="margin-left: 20px">
				<a-button  type="primary" @click="save()">保存</a-button>
				<a-button  @click="getPersonalInfo()">取消</a-button>
			</div>
		</div>
	</div>
</template>
<script>
	var storage = require('../../common/store')
	import { powerObject } from '@/common/util'	
	export default {
		name: "monitorSetting",
		data() {
			return {
				personalItem:{
                    new_msg_audio_status:false,
                    busy_auto_reply_status:false,
                    busy_auto_reply:'',
                    busy_auto_reply_image:'',
                    offline_auto_reply_status:false,
                    offline_auto_reply:'',
                    offline_auto_reply_image:''
				},
                headers:{
                    Authorization: storage.store.get('token')
                },
			}
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed: {
		},
		methods: {
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
                data.busy_auto_reply_status = data.busy_auto_reply_status?'1':'0'
                data.offline_auto_reply_status = data.offline_auto_reply_status?'1':'0'
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
						this.getPersonalInfo()
                    }
                });
			}
		},
		created: function() {
			this.getPersonalInfo()
		},
		mounted() {},
		beforeUpdate() {}
	}
</script>
