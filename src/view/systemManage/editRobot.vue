<template>
	<div class="background-color">
		<div class="mag_push_title">
			详情
			<a-button type="default" icon="left" @click="back()" style="float:right;z-index: 1;position: relative;top: -4px">返回</a-button>
		</div>
		<div class="info">
			<div class="info-header">
				<span>微信信息</span>
				<a-button class="fr" type='primary' @click="edit_save" style="width: 70px">{{editStatus?'保存':'编辑'}}</a-button>
			</div>
			<div class="info-content">
				<div style="width: 400px;display: inline-block;vertical-align: middle">
					<a-form @submit.prevent="com_handleOk" :form="form">
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='编号：'>
							<span v-if="!editStatus">{{queryForm.mobile_serial_name}}</span>
							<a-input v-else placeholder='请输入编号' v-model="queryForm.mobile_serial_name"  maxlength="15"/>
						</a-form-item>
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='昵称：'>
							<span v-if="!editStatus">{{queryForm.nickname}}</span>
							<a-input v-else placeholder='请输入昵称' v-model="queryForm.nickname"  maxlength="10"/>
						</a-form-item>
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='电话：'>
							<span v-if="!editStatus">{{queryForm.tel}}</span>
							<a-input v-else placeholder='请输入手机号' @change="input_tel" v-model="queryForm.tel"  maxlength="11" />
						</a-form-item>
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='头像：'>
							<img v-if="!editStatus" :src="mediapath" alt="" style="width: 100px;height: 100px">
							<a-upload v-else class="up-content3" name="file" :headers="headers" @change="handleChange" listType="picture-card" :showUploadList="false" :beforeUpload="beforeUpload" action="/index.php?r=uc/user/upload">
								<div>
									<a-icon type="plus" style="fontSize:20px"/>
									<div class="ant-upload-text">上传图片</div>
								</div>
								<div class="up-img-content"  v-if="mediapath!=''">
									<img :src="mediapath" alt="" style="">
								</div>
								<div class="up-img-modal" v-if="mediapath!=''">
									<a-icon type="form" class="img-btn1"/>
									<a-icon class="img-btn2" type="delete" @click="deleteFn($event,'1')"/>
								</div>
							</a-upload>
						</a-form-item>
					</a-form>
				</div>
				<div style="width: calc(100% - 450px);display: inline-block;text-align: right">
					<img :src="robotInfo.qrcode" alt="" style="width: 180px;height: 180px">
				</div>
			</div>
		</div>
		<div class="info">
			<div class="info-header">
				<span>微信标签</span>
				<a-button class="fr" type='primary' style="width: 70px" @click="addTag">打标签</a-button>
			</div>
			<div class="info-content">
				<a-tag v-for="(item,index) in robotLabel" :key="item.id" style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">
					{{item.title}}
				</a-tag>
			</div>
		</div>
		<div class="info" style="border-bottom: none">
			<div class="info-header">
				<span>其他信息</span>
				<a-button class="fr" type='primary' style="width: 70px" @click="refreshGroup()">刷新</a-button>
			</div>
			<div class="info-content">
				<a-row>
					<a-col :xl='3' :md="6"  :xs="12">
						<span >
							所属部门：{{robotInfo.department}}
						</span>
					</a-col>
					<a-col :xl='3' :md="6"  :xs="12">
						<span >
							所属用户：
							<img v-if="!!robotInfo.user_avatar" :src="robotInfo.user_avatar" alt="" style="width: 30px;height: 30px;vertical-align: middle">
							<span>{{robotInfo.user}}</span>
						</span>
					</a-col>
				</a-row>
				<a-row>
					<a-col :xl='3' :md="6"  :xs="12">
						<span >
							App版本：{{robotInfo.vision}}
						</span>
					</a-col>
					<a-col :xl='3' :md="6"  :xs="12">
						<span >
							绑定时间：{{robotInfo.created}}
						</span>
					</a-col>
					<a-col :xl='3' :md="6"  :xs="12">
						<span >
							心跳状态：
							<div v-if="robotInfo.status=='1'" style="display: inline-block">
								<span style="width: 10px;height: 10px;display: inline-block;border-radius: 50%;background: #259B24;margin-right: 5px"></span>
								<span>已连接</span>
							</div>
							<div v-else style="display: inline-block">
								<span style="width: 10px;height: 10px;display: inline-block;border-radius: 50%;background: #BCBCBD;margin-right: 5px"></span>
								<span>未连接</span>
							</div>
						</span>
					</a-col>
					<a-col :xl='3' :md="6"  :xs="12">
						<span >
							上次心跳：{{robotInfo.active_time}}
						</span>
					</a-col>
				</a-row>
			</div>
		</div>


		<!--<a-row>-->
			<!--<a-col span="14">-->
				<!--<a-form @submit.prevent="com_handleOk" :form="form">-->
					<!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='编号：' :validateStatus='queryForm.mobile_serial_name?"success":"error"' :help='queryForm.mobile_serial_name?"":"请输入编号。。。"'>-->
						<!--<a-input placeholder='请输入编号' v-model="queryForm.mobile_serial_name"  maxlength="15"/>-->
					<!--</a-form-item>-->
					<!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='昵称：'>-->
						<!--<a-input placeholder='请输入昵称' v-model="queryForm.nickname"  maxlength="10"/>-->
					<!--</a-form-item>-->
		<!---->
					<!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='手机号：'>-->
						<!--<a-input placeholder='请输入手机号' @change="input_tel"   v-model="queryForm.tel"  maxlength="11" />-->
					<!--</a-form-item>-->
		<!---->
					<!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='头像：'>-->
						<!--<a-upload  name="file" :headers="headers" @change="handleChange" :beforeUpload="beforeUpload" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload" >-->
							<!--<a-button>-->
						      <!--<a-icon type="upload" /> Upload-->
						    <!--</a-button>-->
						<!--</a-upload>-->
					<!--</a-form-item>-->
					<!--<div class="ant-upload-list ant-upload-list-picture-card upload" v-if="mediapath">-->
						<!--<a-icon class="up_loading" type="loading" v-if="loading"/>-->
						<!--<div class="ant-upload-list-item ant-upload-list-item-done" v-if="mediapath">-->
							<!--<div class="ant-upload-list-item-info">-->
								<!--<span>-->
									<!--<a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">-->
										<!--<img  :src="mediapath" alt="mediapath">-->
									<!--</a>-->
								<!--</span>-->
							<!--</div>-->
							<!--<span class="ant-upload-list-item-actions">-->
								<!--<a href="javascript:void(0)">-->
									<!--<a-icon type="eye" @click="handlePreview(mediapath)"></a-icon>-->
								<!--</a>-->
								<!--<a-icon type="delete"  @click="deleteFn()"></a-icon>-->
							<!--</span>-->
						<!--</div>-->
					<!--</div>-->
					<!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='选择标签：'>-->
						<!--<a-select :allowClear="true" v-model="queryForm.robotLabel" placeholder="请选择。。。" @change="changeRobot" mode="multiple">-->
							<!--<a-select-option :key="items.id" v-for="(items,index) in robotLabelAll">-->
								<!--{{items.title}}-->
							<!--</a-select-option>-->
						<!--</a-select>-->
					<!--</a-form-item>-->
					<!--<a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false" style="text-align: right">-->
						<!--<a-button type='primary' htmlType='submit' style="margin-right: 10px">提交</a-button>-->
					<!--</a-form-item>-->
				<!--</a-form>-->
			<!--</a-col>-->
		<!--</a-row>-->
		<!--<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">-->
			<!--<img alt="example" style="width: 100%" :src="mediapath" />-->
		<!--</a-modal>-->

		<!--添加标签-->
		<a-modal
				title="选择标签"
				cancelText="取消"
				okText="确定"
				:visible="selectTagFlag"
				@ok="handleTagOk"
				@cancel="selectTagFlag=false"
		>
			<div class="tag-modal">
				<a-checkable-tag v-for="(item,index) in robotLabelAll"  :key="item.id" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked)" style="margin-bottom: 5px" :class="['tag-color' + item.color_id]">
					{{item.title}}
				</a-checkable-tag>
			</div>
		</a-modal>
	</div>
</template>
<script>
	var storage = require('../../common/store')
    var comConf = require('../../common/comConfig');
	export default {
        components: {},
        name: "editRobot",
		data() {
			return {
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 6
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 18
					},
				},
				mediapath: '',
				queryForm: { // 搜索参数
                    mobile_serial_name:'',
					nickname:'',
					tel:'',
				},
				previewVisible: false,
				loading: false,
				form: this.$form.createForm(this),
				headers: {
					Authorization: storage.store.get('token')
				},
				robotLabelAll:[],
                robotLabel:[],
				is_number:false,
				tip:'请输入11位手机号码',
                selectTagFlag:false,
                robotInfo:{},
                editStatus:false,
			}
		},
		methods: {
			input_tel(e){
				const { value } = e.target
				let that = this;
				this.queryForm.tel = value;
				const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
				if ((!isNaN(value) && reg.test(value))) {
			        if(value.length>11){
			        	that.queryForm.tel = value.slice(0,value.length-1);
			        }else if(value.length==11){
			        	that.is_number = true;
			        	that.tip = ''
			        }else if(value.length<11){
			        	that.tip = '请输入11位手机号码';
			        	that.is_number = false;
			        }
				}else{
			      	that.is_number = false;
			      	that.tip = '请输入11位手机号码';
			      	del();
			    }
		       	function del(){
					var regNum = /^[0-9]+.?[0-9]*$/;
					 if (!regNum.test(value.charAt(value.length - 1) ) ) {
					 	console.log(value.charAt(value.length - 1) )
					 	that.queryForm.tel = value.split(value.charAt(value.length - 1)).join('')
				    }
		      	}
			},
            back() {
				this.$router.push({
					path: '/systemManage/robotManage'
				})
			},
			handleChange(info) {
				if(info.file.status === 'uploading') {
					this.loading = true
					return
				}
				if(info.file.status === 'done') {
					if(info.file.response.status == 1) {
						this.mediapath = info.file.response.data.path;
						this.loading = false;
					} else {
						this.$notification['warning']({
							message: '上传错误',
							description: info.file.response.msg,
						});
					}
				} else if(info.file.status === 'error') {
					this.$notification['warning']({
						message: '上传失败',
						description: '文件' + info.file.name + '上传失败',
					});
				}
			},

			beforeUpload(file) {
				console.log(file.type === 'image/jpeg')
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
//			handlePreview(img) {
//				this.mediapath = img;
//				this.previewVisible = true
//			},
//			handleCancel() {
//				this.previewVisible = false
//			},
			deleteFn() {
				this.mediapath = '';
			},
			com_handleOk(e) {
				let that = this;
				if(!that.queryForm.mobile_serial_name){
					return false;
				}
				if(that.mediapath){//更换头像
					let avatar_url_data = {
	                    cmd:2031,
	                    fromClientId:this.$store.state.user.user.user_id,
	                    toClientId:that.queryForm.username,
	                    cmdData:{
	                        headImage :that.mediapath
	                    },
	                    priority:0
                	}
                    comConf.isOfflineRobot(that.queryForm.username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
	                this.$ws.sendMsgFun(avatar_url_data);
	                this.$ws.cmd2031= msg=> {
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
				}
				if(that.queryForm.nickname){//更换昵称
					let nickname_data = {
	                    cmd:2027,
	                    fromClientId:this.$store.state.user.user.user_id,
	                    toClientId:that.queryForm.username,
	                    cmdData:{
	                        nickname :that.queryForm.nickname
	                    },
	                    priority:0
                	}
                    comConf.isOfflineRobot(that.queryForm.username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
	                this.$ws.sendMsgFun(nickname_data);
	                this.$ws.cmd2027=msg=> {
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
				}
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot-update',
					data: Object.assign(that.queryForm, {
						'avatar_url': that.mediapath,
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$notification['success']({
							message: '成功',
							description: '保存成功',
							duration: 1
						});
						setTimeout(() => {
							that.$router.push({
								path: '/systemManage/robotManage'
							})
						}, 1000);
					}
				});
			},
			refreshGroup(){
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot-detail',
					data: {
                        robot_id: that.$route.query.id,
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
					    that.robotInfo = udata.data.robot;
						that.robotLabel = udata.data.robotLabel;
						that.queryForm.mobile_serial_name = udata.data.robot.mobile_serial_name;
						that.queryForm.nickname = udata.data.robot.nickname;
						that.queryForm.tel = udata.data.robot.tel;
						that.mediapath = udata.data.robot.avatar_url;
						that.queryForm.username =  udata.data.robot.username;
						that.queryForm.id =  udata.data.robot.id;
						that.robotLabelAll = udata.data.robotLabelAll;
					}
				});
			},
            addTag() {
                this.robotLabelAll.forEach(el=>{
                    this.robotLabel.forEach(item=>{
                        if(el.id==item.id) {
                            el.check = true
                        }
                    })
                })
                this.selectTagFlag = true
            },
            deleteFn(e,type) {
                e.stopPropagation();
				this.mediapath  = '';
            },
            edit_save() {
                if(this.editStatus) {
					this.com_handleOk()
                } else {
                    this.editStatus = !this.editStatus
                }
            },
            handleTagChange(item,index,checked) {
                item.check = checked
                this.$set(this.robotLabelAll,index,item)
            },
            handleTagOk() {
                let selectTag = []
                this.robotLabelAll.forEach(el=>{
                    if(el.check) {
                        selectTag.push(el.id)
                    }
                })
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/robot-save-label',
                    data: {
                        id:this.$route.query.id,
                        robotLabel:selectTag
					}
                }).then(d=> {
                    // 响应成功回调
                    var udata = d.data;
                    if(udata.status == 1) {
                        this.selectTagFlag = false
						this.refreshGroup()
                        this.$message.success('保存成功')
                    }
                });
			}
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		created: function() {
			this.refreshGroup();
		},
        beforeDestroy() {
            this.$ws.cmd2027 = null
            this.$ws.cmd2031 = null
        }
	}
</script>
<style scoped lang="less">
	.fr {
		float: right;
	}
	.background-color{
		background: #fff;
		height: calc(~'100vh - 110px');
		overflow-y: auto;
	}
	.mag_push_title {
		border-bottom: 10px solid #efefef;
		padding: 17px 25px;
		font-size: 16px;
		background: #fff;
		font-weight: 700;
	}
	
	.upload{
		position: relative;
		height: 112px;
		width: 112px;
		margin-left: 25%;
		float: none !important;
		.up_loading{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -7px;
			margin-left: -7px;
		}
		svg{
			font-size: 22px;
		}
	}
	
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -7px;
		margin-left: -7px;
	}
	.info {
		background: #ffffff;
		border-bottom: 10px solid #efefef;
		.info-header {
			padding: 10px 25px;
			border-bottom: 2px solid #f0f2f5;
			height: 52px;
			line-height: 32px;
			span {
				font-weight: 700;
				font-size: 16px;
			}
		}
		.info-content {
			padding: 10px 25px;
			.ant-tag:hover {
				background: #5AA9CD;
				color: #ffffff;
				opacity: 1;
			}
			.ant-form-item {
				margin-bottom: 12px;
			}
		}
	}
	.up-content3 {
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
	.up-content3 .ant-upload.ant-upload-select-picture-card {
		width: 100px;
		height: 100px;
	}
</style>