<style scoped lang="less">
	.group{
		padding: 12px 0;
	}
	.container {
		position: relative;
	}

	.box {
		position: absolute;
		width: 100px;
		height: 30px;
		top: -32px;
		margin-left: -43px;
		z-index: 978;
		color: rgb(255, 255, 255);
		background-color: rgb(16, 142, 233);
		border-radius: 5px;
		font-size: 14px;
		padding: 1px;
		border-width: 0px;
		text-align: center;
		line-height: 30px;
		font-weight: normal;
		font-style: normal;
		opacity: 0.85;
	}

	.arrow {
		position: absolute;
		bottom: -22px;
		left: 50%;
		margin-left: -20px;
	}

	.bottom-arrow:before {
		content: "";
		border: 7px solid rgb(16, 142, 233);
		border-bottom: none;
		border-right-color: transparent;
		border-left-color: transparent;
		position: relative;
		top: 9px;
		left: 6px;
		border-radius: 2px;
	}
	.private {
		padding: 0 20px 20px 0;
		margin: 0!important;
		.send-header {
			color: #101010;
			border-left: 4px solid #5AA9CD;
		}
		.send-content {
			background: #EAEEF0;
			display: flex;
			width: 100%;
			.dynamic-delete-button svg{
				font-size: 18px;
			}
			.material_content {
				width: 60%;
			}
		}
		.ant-form-item {
			margin-bottom: 0;
		}
	}
	.friend-circle {
		margin-top: 50px!important;
	}
	.modal_tabs {
		.text {
			// min-height: 120px;
			max-height:120px;
			display:block;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.div-edit {
			border: 1px solid #D9D9D9;
			height: 120px;
			padding: 10px;
			overflow-y: initial;
			word-break: break-all;
			word-wrap: break-word;
			white-space: pre-wrap;
			max-width: initial;
			margin: 0;
			display:block;
			overflow: hidden;
			text-overflow: ellipsis;
			border-radius: 5px;
		}
	}
	.video{
		width:100%;
		height:100%;
		background:rgba(0, 0, 0, .6);
		position:absolute;
		color:#fff;
		text-align:center;
		line-height:130px;
	}
	.vidoIcon{
		font-size:24px;

	}
	.fl {
		float: left;
	}
	.fr {
		float: right;
	}
	.contentSmall{
		cursor: pointer;
		padding:6px 10px 0;
		border:1px solid #d9d9d9;
	}
	.contentSmall:after{
		display:block;
		visibility: hidden;
		clear: both;
		height: 0;
		content: "";
	}
	.publicCard{
		border:1px solid #D9D9D9;
		border-radius:5px;
	}
</style>
<style lang="less">
	.send-content {
		.ant-form-item-label {
			text-align: left;
			label {
				color: #828282;
			}
		}
		.view-material {
			background: inherit!important;
			margin-left: -10px!important;
		}
	}
	.material_content {
		.ant-form-item-children {
			position: static;
		}
	}

	.ant-checkbox-wrapper-checked  {
		.img_box,.link_box,.card_box {
			// background: #5AA9CD !important;
			border:1px solid #5AA9CD!important;
			color: #222 !important;
		}
		.text {
			>div {
				border-color: #5AA9CD!important;
			}
		}
	}
	.modal_tabs {
		margin-top: 20px;
		.ant-tabs-content {
			height: 360px;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.ant-list-grid .ant-list-item {
			margin-bottom: 0;
		}
		.ant-card-cover {
			height: 100%;
			position: static;
		}

	}

	.modal_tabs .ant-radio {
		float: right;
	}
	.check_ck .ant-radio {
		position: absolute;
		top: 0;
		z-index: 10;
		width: 97px;
		display: inline-block;
		height: 36px;
		opacity: 0;
	}
	.ant-card-cover img {
		// width: 50%;
		height: 100%;
	}
	.ant-radio-wrapper-checked .link_box  .ant-card-meta-detail div{
		color: #fff !important;
	}
	.checkbox_content .ant-checkbox,.checkbox_content .ant-radio{
		opacity: 0 !important;
	}
</style>
<template>
	<div :class="[type==1?'private':'friend-circle']">
		<!--私聊推送-->
		<div v-if="type==1">
			<a-form :form="form">
				<div class="send-header">
					<div style="padding: 10px 20px 20px;border-bottom: 4px solid #f0f2f5">
						<a-form-item  label="推送进度"  v-bind="formItemLayout">
							<a-progress :percent="dataSource.progress" status="active" style="width: calc(100% - 400px)"/>
							<div style="float: right">
								<span style="margin-right: 20px">推送人数：{{dataSource.num}}</span>
								<span>开始时间：{{dataSource.send_time}}</span>
							</div>
						</a-form-item>
					</div>
					<div style="padding: 10px 20px;position: relative">
						<div>
							<!--<a-form-item  label="推送部门"  v-bind="formItemLayout">-->

							<!--</a-form-item>-->
							<a-form-item  label="推送标签"  v-bind="formItemLayout">
								<span v-for="item in dataSource.label" style="margin-right: 10px;color: rgb(16, 16, 16)">{{item.label_name}}</span>
							</a-form-item>
						</div>
						<div style="display: inline-block;position: absolute;top: 50%;right: 20px;transform: translateY(-50%)">
							<!--todo  发送内容修改-->
							<!--<span style="display: inline-block;width: 35px;height: 35px;background: #3787FB;border-radius: 50%;position: relative;cursor: pointer;margin-left: 15px" @click="editContent">-->
								<!--<a-icon type="edit" style="color:#ffffff;font-size: 20px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)"/>-->
							<!--</span>-->
							<span style="display: inline-block;width: 35px;height: 35px;background: #3787FB;border-radius: 50%;position: relative;cursor: pointer;margin-left: 15px" v-if="dataSource.status==30" @click="taskChange('0')">
								<a-icon type="caret-right" style="color:#ffffff;font-size: 20px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)"/>
							</span>
							<span style="display: inline-block;width: 35px;height: 35px;background: #3787FB;border-radius: 50%;position: relative;cursor: pointer;margin-left: 15px" v-if="dataSource.status==10" @click="taskChange('4')">
								<a-icon type="pause" style="color:#ffffff;font-size: 20px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)"/>
							</span>
							<span style="display: inline-block;width: 35px;height: 35px;background: #959595;border-radius: 50%;position: relative;cursor: pointer;margin-left: 15px" v-if="!!dataSource.id" @click="taskChange('5')">
								<a-icon type="close" style="color:#ffffff;font-size: 20px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)"/>
							</span>
						</div>
					</div>
				</div>
				<div class="send-content">
					<div style="width:calc(100% - 310px);display: inline-block;padding: 16px 27px;height: 100%;max-height: 500px;overflow-y: auto">
						<a-form-item  label="推送内容"  v-bind="{labelCol: {lg: { span: 24 },xl: { span: 2 },},wrapperCol: {lg: { span: 24 },xl: { span: 22 },},}">
							<a-form-item v-for="(k,index) in content" :required="false" :key="index" class="material_content">
								<div v-if="k.type!=1">
									<view-material  :dataItem="k" @click="delMaterial(index)" isPush="0" showDel="1" isInSending="1"></view-material>
								</div>
								<a-textarea v-else v-model="k.content" :autosize="{'minRows': 4, 'maxRows': 6 }" :maxlength="500" :disabled="!editStatus"/>
								<a-icon
										v-if="index > 0&&editStatus"
										class='dynamic-delete-button'
										type='minus-circle-o'
										@click="() => remove(index)"
										:style="{position:' absolute',left:k.type==2?'470px':'870px',top: '50%',transform: 'translateY(-50%)',cursor: 'pointer'}"
								/>
								<a-button v-if="editStatus" :style="{position:' absolute',left:k.type==2?'370px':'770px',top: '50%',transform: 'translateY(-50%)',cursor: 'pointer'}" @click="useMaterial(index)">使用素材</a-button>
							</a-form-item>
							<a-button v-if="editStatus" type="dashed" @click.native="addTextarea" block icon="plus">添加</a-button>
							<div v-if="editStatus">
								<a-button type="primary" style="margin-right:20px;" @click="">确认修改</a-button>
								<a-button type="primary" style="background: #A2A0A0;border-color: #A2A0A0" @click="">取消</a-button>
							</div>
						</a-form-item>
					</div>
					<!-- <div style="width:300px;flex: 0 0 300px;vertical-align: top;padding:  16px 15px;;border-left: 5px solid #F7F7F7;height: 100%;max-height: 500px;overflow-y: auto">
						<div>
							推送详情：
						</div>
						<div style="padding: 5px">
							<a-input placeholder="搜索微信昵称/备注名" v-model="searchKey" ref="searchKey"  @keyup.enter="searchPushDetails(true)" >
								<a-icon slot="prefix" type="search" style="color:#ccc;cursor: pointer" @click="searchPushDetails(true)"/>
								<a-icon v-if="searchKey!=''" slot="suffix" type="close-circle" style="color: #ccc;cursor: pointer" theme = "filled" @click="emitEmpty" />
							</a-input>
						</div>
						<div style="padding: 5px">
							<a-select v-model="detailKey" @change="handleKeyChange">
								<a-select-option v-for="(item,index) in detailList" :key="item.id">
									{{item.name}}
								</a-select-option>
							</a-select>
						</div>
						<div style="overflow-y: auto;padding: 5px">
							<div v-for="item in detailUserList" style="padding: 5px 0">
								<div style="display: inline-block;margin-right: 10px">
									<img  :src="item.avatar_url || $store.state.user.user.default_url" style="width: 40px;height: 40px;vertical-align: initial;">
								</div>
								<div style="display: inline-block;width: calc(100% - 55px);color: #948D8D">
									<span style="width:100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;color:#101010">
										{{!item.remark?item.nickname:item.remark}}
									</span>
									<span  style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap;height: 21px">
										<span v-if="item.status==2" style="color: #8BC34A;font-size: 12px">成功</span>
										<span v-if="item.status==0" style="color: #FF9800;font-size: 12px">待推送</span>
										<span v-if="item.status==3" style="color: #F4524E;font-size: 12px">
											失败
											<a-icon type="exclamation-circle" theme="filled" style="color: #F4524E"/>
										</span>
										<span v-if="item.status==3" style="text-decoration: underline;color: #5AA9CD;font-size: 12px;float: right;cursor: pointer" @click="reSend(item)">重发</span>
									</span>
								</div>
							</div>
							<div style="color: #5AA9CD;font-size: 12px;text-align: center" v-if="showMore">
								<span @click="loadMore">加载更多</span>
							</div>
						</div>
					</div> -->
				</div>
			</a-form>
		</div>
		<!--朋友圈推送-->
		<div v-if="type==2">
			<a-row type="flex" justify="start" class="group">
				<a-col span="2">
					<span>发送进度</span>
				</a-col>
				<a-col span="15" class="container">
					<div class="box" :style="{left: dataSource.progress+'%'}">
						<div class="arrow bottom-arrow"></div>
						<div class="text">已发送{{dataSource.sending_number}}人</div>
					</div>
					<a-progress :percent="dataSource.progress" status="active"/>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" class="group">
				<a-col span="2">
					<span>选择分组</span>
				</a-col>
				<a-col span="15" class="container">
					<span>{{dataSource.label_names}}</span>
				</a-col>
			</a-row>

			<a-row type="flex" justify="start" class="group">
				<a-col span="2">
					<span>发送总人数</span>
				</a-col>
				<a-col span="15" class="container">
					<span>{{dataSource.num}}</span>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" class="group">
				<a-col span="2">
					<span>发送内容</span>
				</a-col>
				<a-col span="15" class="container">
					<a-row type="flex" justify="start">
						<a-col span="7">
							<span  v-html="dataSource.content"></span>
						</a-col>
					</a-row>
				</a-col>
			</a-row>
		</div>
		<a-modal title="使用素材" :footer="null" :visible="visible" @cancel="visible = false" width="80%" >
			<a-row>
				<a-col :xl="{span:8}" :lg="{span:12}">
					<a-input-search placeholder="请输入搜索内容。。。" style="width: 100%" v-model="materialSearchKey" @search="onSearch" enterButton/>
				</a-col>

				<a-col :xl="{span:16}" :lg="{span:24}" class="pagination_box">
					<a-pagination showQuickJumper showSizeChanger :pageSizeOptions="pagination.pageSizeOptions" :pagination="pagination" :total="pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="pagination.pageSize" v-model="pagination.current" @change="onShowSizeChange" @showSizeChange="optionChange"  />
				</a-col>
			</a-row>
			<a-form :form="form" class="useMaterial">
				<a-checkbox-group  @change="sel_Material" v-model="modalIsChecked" style="margin: 0 5px 0 0;width: 100%;" class="checkbox_content sel_material">
					<a-tabs @change="tab_callback" type="card" class="modal_tabs" :activeKey="activeKey">
						<a-tab-pane tab="文本" key="1">
							<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="textData" style="margin-bottom: 0">
								<a-list-item slot="renderItem" slot-scope="item, index">
									<a-checkbox :value="item.id" style="width: 100%;">
										<div class="text">
											<div class="div-edit" v-html="item.content"></div>
										</div>
									</a-checkbox>
								</a-list-item>
							</a-list>
						</a-tab-pane>
						<a-tab-pane tab="图片" key="2">
							<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="imgData">
								<a-list-item slot="renderItem" slot-scope="item, index">
									<a-checkbox :value="item.id" style="width: 100%;">
										<a-card hoverable class="img_box" style="width: 100%;height: 0;padding-bottom: 93%;position: relative;border-radius: 5px">
											<img alt="example" :src="item.mediapath" slot="cover" style="position: absolute;width:100%;height:100%;left: 0;top:0;object-fit: cover;padding: 4px"/>
										</a-card>
									</a-checkbox>
								</a-list-item>
							</a-list>
						</a-tab-pane>
						<a-tab-pane tab="链接" key="3">
							<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="linkData">
								<a-list-item slot="renderItem" slot-scope="item, index">
									<a-checkbox :value="item.id" style="width: 100%;">
										<a-card hoverable class="link_box push-link-style" style="border-radius: 5px">
											<div style="color:#222;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden">{{item.title}}</div>
											<div class="crl">
												<div class="fl"  style="margin-top: 15px;max-width: calc(100% - 70px);font-size:12px;color:#838383;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.desc}}</div>
												<img class="fr" :src="item.mediapath" style="width:50px;height:50px;display: inline-block;border-radius: 5px" />
											</div>
										</a-card>
									</a-checkbox>
								</a-list-item>
							</a-list>
						</a-tab-pane>
						<a-tab-pane tab="名片" key="4">
							<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="cardData">
								<a-list-item slot="renderItem" slot-scope="item, index">
									<a-checkbox :value="item.id" style="width: 100%;">
										<div class="publicCard link_box" style="border-radius: 5px">
											<div style="height:56px;line-height: 56px;text-align: left;padding: 0 10px">
												<img src="../../assets/cardIcon.png" alt="" style="width: 30px;height: 30px">
												<span style="margin-right: 20px;color: #101010">{{item.title}}</span>
											</div>
											<div style="line-height: 25px;height: 25px;border-top: 1px solid #F0F0F0;color:#7D7D7D;padding: 0 10px;font-size: 12px">
												公众号名片
											</div>
										</div>
									</a-checkbox>
								</a-list-item>
							</a-list>
						</a-tab-pane>
						<a-tab-pane tab="小程序" key="5">
							<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="programData">
								<a-list-item slot="renderItem" slot-scope="item, index">
									<a-checkbox :value="item.id" style="width: 100%;">
										<div class="contentSmall link_box" style="border-radius: 5px">
											<div style="line-height: 40px;height: 40px">
												<img :src="item.iconurl" style="width:20px;height: 20px;border-radius: 50%;vertical-align: middle" />
												<span style="color:#717171;">{{item.title}}</span>
											</div>
											<div style="color:#222;max-height: 200px;overflow: hidden">
												{{item.desc}}
												<img :src="item.mediapath" style="width:100%;display: block;padding-top: 10px" />
											</div>
											<div style="color:#717171;height: 25px;line-height: 25px;width: calc(100% + 20px);margin-left: -10px;border-top:  1px solid #f0f0f0;font-size: 12px">
												<img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
												小程序,请在手机上查看
											</div>
										</div>
									</a-checkbox>
								</a-list-item>
							</a-list>
						</a-tab-pane>
						<a-tab-pane tab="视频素材" key="7" >
							<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="videoData">
								<a-list-item slot="renderItem" slot-scope="item, index">
									<a-checkbox :value="item.id" style="width: 100%;">
										<a-card hoverable class="link_box push-friend" style="border-radius: 5px">
											<div class="ant-card-meta" style="text-align: center;max-height: 120px;overflow:hidden;position:relative;">
												<div class="video" >
													<a-icon type="play-circle" class="vidoIcon"></a-icon>
												</div>
												<video   style="width:100%" >
													<source :src="item.mediapath" type="video/mp4">
												</video>
											</div>
										</a-card>
									</a-checkbox>
								</a-list-item>
							</a-list>
						</a-tab-pane>
					</a-tabs>
				</a-checkbox-group>
			</a-form>
		</a-modal>

	</div>
</template>

<script>
    import viewMaterial from './viewMaterial'
    var emoji = require('../../common/emojiMap');
	export default {
		props: ['dataSource','type'],
        components: {
            viewMaterial
        },
		data() {
			return {
                form: this.$form.createForm(this),
                formItemLayout: {
                    labelCol: {
                        lg: { span: 24 },
                        xl: { span: 1 },
                    },
                    wrapperCol: {
                        lg: { span: 24 },
                        xl: { span: 23 },
                    },
                },
				editStatus:false,
                searchKey:'',
				detailList:[
					{id:0,name:'全部'},
                    {id:2,name:'推送成功'},
                    {id:3,name:'推送失败'},
                    {id:1,name:'待推送'}
				],
				detailKey:0,
				detailUserList:[],
                page:1,
                page_size:10,
                selectMateriaIndex:0,
                selectMateria:null,
                visible:false,
                programData: [],//小程序素材
                cardData: [],//名片素材
                linkData: [],//链接素材
                textData: [],//文字素材
                imgData: [],//图片素材
                videoData:[],//视频素材
                pagination: { //素材分页
                    pageSizeOptions: ['10', '20', '30', '40', '50'],
                    current: 1,
                    pageSize: 10,
                    total: 0,
                },
                activeKey: '1',//tabs组件 当前激活 tab 面板的 key
                modalIsChecked:[],
                materialSearchKey:'',
				content:[], //发送内容
                showMore:false
			}
		},
        watch: {
            'dataSource.id':{
                handler(newValue, oldValue) {
                    if(this.type==1) {
                        this.getContent()
					}
                }
            },
//            'dataSource.success_num':{
//                handler(newValue, oldValue) {
//                    if(this.type==1) {
//						this.searchPushDetails(true)
//                    }
//                }
//            }
        },
		methods: {
            searchPushDetails(bool) {
                if(bool) {
                    this.page =1
				}
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/sending-list',
                    data:{
                        p:this.page,
                        n:this.page_size,
                        status:this.detailKey,
                        username:this.searchKey,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(bool) {
                            this.detailUserList = []
						}
                        if(udata.data.length!=10) {
                            this.showMore = false
						}else {
                            this.showMore = true
						}
                        this.detailUserList = this.detailUserList.concat(udata.data);
                    }
                });
			},
            emitEmpty() {
                this.searchKey = ''
				this.searchPushDetails(true)
			},
            handleKeyChange(value) {
                this.detailKey = value
				this.searchPushDetails(true)
            },
            reSend(item) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/re-send',
                    data:{
                        task_id:this.dataSource.id,
                        friend_id:item.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
						item.status = 0
                    }
                });
			},
            loadMore() {
                this.page+=1
                this.searchPushDetails(false)
			},
            remove(index){//删除输入框
				this.content.splice(index,1)
            },
            delMaterial(index){//删除素材
                this.content[index].type= '1'
            },
            addTextarea() {
                this.content.push({
                    type:'1',
                    content:'',
                })
            },
            useMaterial(index) {
                this.selectMateriaIndex = index
				this.selectMateria = null
                this.getMaterialData();
                this.visible = true;
			},
            editContent() {
                this.editStatus = true
			},
            getMaterialData() { //获取所有素材接口
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/material/material',
                    data: {
                        'department_id': that.$store.state.user.user.department.id,
                        'all': 1,
                        'searchKey':that.materialSearchKey,
                        'p': that.pagination.current,
                        'n': that.pagination.pageSize,
                        'type':that.activeKey==1?1:that.activeKey==2?2:that.activeKey==3?3:that.activeKey==4?7:that.activeKey==5?8:that.activeKey==6?9:that.activeKey==7?11:"",
                    }
                }).then(function(d) {
                    // 响应成功回调
                    var udata = d.data;
                    if(udata.status == 1) {
                        that.pagination.total = parseInt(udata.data.total); //数据总条数
                        !!udata.data.list.textData&&(that.textData = udata.data.list.textData)
                        !!udata.data.list.imgData&&(that.imgData = udata.data.list.imgData)
                        !!udata.data.list.linkData&&(that.linkData = udata.data.list.linkData)
                        !!udata.data.list.cardData&&(that.cardData = udata.data.list.cardData)
                        !!udata.data.list.programData&&(that.programData = udata.data.list.programData)
                        !!udata.data.list.videoData&&(that.videoData= udata.data.list.videoData)
                        for(let i = 0; i < that.textData.length; i++) {
                            that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
                        }
                    }
                });
            },
            optionChange(current, pageSize) {//素材分页
                this.pagination.current = current;
                this.pagination.pageSize = pageSize;
                this.getMaterialData();
            },
            onShowSizeChange(page, pageSize) {//素材分页
                this.pagination.current = page;
                this.getMaterialData();
            },
            sel_Material(checkedValue) {
//                this.modalIsChecked = checkedValue
                this.visible = false;
                let arr = [].concat(this.textData,this.imgData,this.linkData,this.cardData,this.programData,this.videoData)
                arr.forEach(el=>{
					if(el.id ==this.selectMateriaIndex) {
						this.content[this.selectMateriaIndex] = el
					}
                })
                this.content[this.selectMateriaIndex].type = '2';
                this.content[this.selectMateriaIndex].material_id = checkedValue[0]
            },
            onSearch(value) { //modal弹出框搜索
                this.materialSearchKey = value;
                this.getMaterialData();
            },
            tab_callback(key) {//model tab切换
                this.activeKey = key;
                this.getMaterialData();
            },
            taskChange(status) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/push-stop',
                    data: {
                        task_id:this.dataSource.id,
						status:status
                    }
                }).then(d=> {
                    // 响应成功回调
                    var udata = d.data;
                    if(udata.status == 1) {
                        switch (status) {
							case '0':
                                this.$parent.$parent.$parent.$parent.$parent.sendData.status = '10'
								break
                            case '4':
                                this.$parent.$parent.$parent.$parent.$parent.sendData.status = '30'
                                break
                            case '5':
                                this.$parent.$parent.$parent.$parent.$parent.sendData.status = '40'
								this.content = []
								this.detailUserList = []
                                break
						}
                    }
                });
			},
			getContent() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/sending-content',
                }).then(d=> {
                    // 响应成功回调
                    var udata = d.data;
                    if(udata.status == 1) {
						this.content = udata.data
                    }
                });
                
			}
		},
		created() {

		}
	}
</script>
