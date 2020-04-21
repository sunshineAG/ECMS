<template>
	<div class="background-color">

		<a-row style="padding: 20px 20px 0 20px">
			<a-col span="12" style="text-align: left;">
				<a-select v-model="select_id" placeholder="请选择类别" style="width: 150px;margin-right: 20px;" @change="selChange">
			      <a-select-option v-for="(item,index) in selectList" :key="item.id">{{item.title}}</a-select-option>
			    </a-select>
				<a-input-search placeholder="请输入货号、名称搜索" style="width: 220px;margin-bottom: 20px;" @search="onSearch" enterButton/>
			</a-col>
			<a-col span="12" style="text-align: right;">
				<a-button type="primary" @click="new_create">新建</a-button>
			</a-col>
		</a-row>
		
		
		<div class="tab">
			<a-table :columns="columns" :dataSource="dataList"  @change="onShowSizeChange" :pagination="pagination" :locale="locale">
				<template slot="src" slot-scope="text, record, index">
					<a-popover  trigger="hover" placement="right" v-if="record.src.length>0?true:false">
					    <template slot="content">
					       <img :src="record.src[0].src" alt="" width="200px"  />
					    </template>
					    <img v-if="record.src[0].src" :src="record.src[0].src" alt="" width="60px"  height="60px" />
					</a-popover>
				</template>
				
				<template slot="operation" slot-scope="text, record, index">
					<div class='editable-row-operations'>
						<span style="margin-right: 10px;">
				          	<a @click="() => editFn(record)">编辑</a>
				        </span>
				        <span>
				        	<a-popconfirm title="你确定要删除吗？" placement="top" @confirm="deleteFn(record.id)" okText="确定" cancelText="取消">
							    <a href="javascript:void(0);">删除</a>
							</a-popconfirm>
				        </span>
					</div>
				</template>
			</a-table>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!dataList.length" ></data-status> -->
		</div>

		<a-modal title="设置产品信息" :footer="null" :visible="visible" @cancel="com_handleCancel">
			<a-form @submit="com_handleOk" :form="form">
				<a-form-item
						:labelCol="labelCol"
						:wrapperCol="wrapperCol"
						label="选择类别："
						:validateStatus='saveFlag?"success":paramsObj.class_id?"success":"error"'
						:help='saveFlag?"":paramsObj.class_id?"":"请选择产品类别"'
				>
					<a-select
							v-model="paramsObj.class_id"
							placeholder="请选择类别"
							style="width: 150px;margin-right: 20px;"
							@change="selEditChange"
					>
						<a-select-option v-for="(item,index) in editSelectList" :key="item.id">{{item.title}}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item
						:labelCol="labelCol"
						:wrapperCol="wrapperCol"
						label="产品名称："
						:validateStatus='saveFlag?"success":paramsObj.title?"success":"error"'
						:help='saveFlag?"":paramsObj.title?"":"请输入产品名称"'
				>
					<a-input placeholder="请输入产品名称" v-model="paramsObj.title" maxlength="15"/>
				</a-form-item>
				<a-form-item
						:labelCol="labelCol"
						:wrapperCol="wrapperCol"
						label="产品价格："
						:validateStatus='saveFlag?"success":paramsObj.price?"success":"error"'
						:help='saveFlag?"":paramsObj.price?"":"请输入产品价格"'
				>
					<a-input-number
							style="width: 100%;"
							placeholder="请输入产品价格（元）"
							v-model="paramsObj.price"
					/>
				</a-form-item>

				<a-form-item
						:labelCol="labelCol"
						:wrapperCol="wrapperCol"
						label="产品图片："
				>
					<a-upload class="up-content2" name="file" :headers="headers" @change="handleChange" listType="picture-card" :showUploadList="false" :beforeUpload="beforeUpload" action="/index.php?r=uc/user/upload">
						<div>
							<a-icon type="plus" style="fontSize:20px"/>
							<div class="ant-upload-text">上传图片</div>
						</div>
						<div class="up-img-content"  v-if="paramsObj.src!=''">
							<img :src="paramsObj.src" alt="" style="">
						</div>
						<div class="up-img-modal" v-if="paramsObj.src!=''">
							<a-icon type="form" class="img-btn1"/>
							<a-icon class="img-btn2" type="delete" @click="deleteImg($event)"/>
						</div>
					</a-upload>
				</a-form-item>

				<a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
					<a-button @click="com_handleCancel">取消</a-button>
					<a-button type='primary' htmlType='submit' style="margin-left: 10px;">提交</a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script>
    var storage = require("../../common/store");
	import dataStatus from '../../components/pageConfig/dataStatus'
	const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            align:'center',
            scopedSlots: {
                customRender: 'title'
            },
        },
//        {
//			title: '货号',
//			dataIndex: 'item_number',
//			align:'center',
//			scopedSlots: {
//				customRender: 'item_number'
//			},
//		},
	{
		title: '图片',
		dataIndex: 'src',
		align:'center',
		scopedSlots: {
			customRender: 'src'
		},
	},
	{
		title: '类别',
		dataIndex: 'class_name',
		align:'center',
		scopedSlots: {
			customRender: 'class_name'
		},
	}, 
	{
		title: '单价（元）',
		dataIndex: 'price',
		align:'center',
		scopedSlots: {
			customRender: 'price'
		},
	}, 
	{
		title: '操作',
		dataIndex: 'operation',
		align:'center',
		scopedSlots: {
			customRender: 'operation'
		},
	}]
	export default {
		name: "productInfo",
		components: {
            dataStatus
		},
		data() {
			return {
				columns,
				searchKey: '',
				select_id:'',//分类id
				dataList:[],
                selectList:[],//分类列表
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
				},
				pagination:{
					showQuickJumper:true,
					showSizeChanger:true,
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
			        pageSize: 10,
			        total: 0,
			        showTotal:function(total, range){
			        	return `共 ${total} 项`
			        }
				},
                visible:false,
                form : this.$form.createForm(this),
                paramsObj: {
				    id:'',
                    title:'',
                    src:'',
                    class_id:'',
                    price:'',
				}, //所有内容编辑参数集合
                labelCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 5
                    }
                },
                wrapperCol: {
                    xs: {
                        span: 24
                    },
                    sm: {
                        span: 19
                    }
                },
                saveFlag:true,
                headers: {
                    Authorization: storage.store.get("token")
                },
                editSelectList:[],

			}
		},
		methods: {
			onShowSizeChange(obj) {
				this.pagination.current = obj.current;
				this.pagination.pageSize = obj.pageSize;
				this.refreshGroup();
			},
			onSearch(value) {
				this.searchKey = value;
				this.refreshGroup();
			},
			
			selChange(value){
				this.select_id = value;//分类id
				this.refreshGroup();
			},
			deleteFn (id) {//删除
		   		let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/product/goods-del',
					data:  {
						'id':id,
						'status':'10'//0-正常；10-删除
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$message.success('删除成功', 2);
						that.refreshGroup();
					}
				});
		    },
		    batch_create(){//批量新建
		    	this.$router.push({path:'/productManage/batch_add'});
		    },
			new_create() {//新建
//				this.$router.push({path:'/productManage/new_add',query:{'create':'1','id':0}});
                this.getEditSelect()
                this.paramsObj = {
                    id: '',
                    title: '',
                    src: '',
                    class_id: '',
                    price: '',
                }
                this.visible = true
			},
			editFn(record){//编辑
                this.getEditSelect()
                this.paramsObj = {
                    id: record.id,
                    title: record.title,
                    src: record.src[0].src,
                    class_id: record.class_id,
                    price: record.price,
                }
                this.visible = true
//				this.$router.push({path:'/productManage/new_add',query:{'create':'2','id':id}});
			},
			getSelect(){
				let that = this;
				this.$axios({//请求分类下拉列表
					method: 'GET',
					url: '/index.php?r=uc/product/get-class',
					params:{}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
                        that.selectList = udata.data;
                        that.selectList.unshift({'id':0,title:'全部'})
						that.select_id = that.selectList[0].id;
						that.refreshGroup();
					}
				});
			},
			refreshGroup(){
				let that = this;
				this.$axios({
					method: 'GET',
					url: '/index.php?r=uc/product/goods-list',
					params:{
						'p':that.pagination.current,			//页码
						'n':that.pagination.pageSize,			//每页条数
						'key':that.searchKey,
						'class_id':that.select_id				//分类id
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.pagination.total = parseInt(udata.data.count);
						that.dataList = udata.data.list;
                        if(udata.data.list.length==0&&that.pagination.current>1) {
                            that.pagination.current -= 1
                            that.refreshGroup()
                        }
					}
				});
			},
            com_handleCancel() {
                this.paramsObj = {
                    id: '',
                    title: '',
                    src: '',
                    class_id: '',
                    price: '',
                }
                this.visible = false;
            },
            com_handleOk(e) {
                e.preventDefault()
                if (
                    !this.paramsObj.price ||
                    !this.paramsObj.class_id ||
                    !this.paramsObj.title
                ) {
                    this.saveFlag = false
                    return false;
                }
                let params = JSON.parse(JSON.stringify(this.paramsObj))
                params.src = [this.paramsObj.src]
                this.$axios({
                    method: "POST",
                    url: "/index.php?r=uc/product/goods-add",
                    data: Object.assign({ data: [params] }) // 参数
                }).then(d=> {
                    // 响应成功回调
                    var udata = d.data;
                    if (udata.status == 1) {
                        this.$message.success('保存成功');
                        this.saveFlag = true
                        this.visible = false;
                        this.refreshGroup();
                        this.paramsObj = {
                            id: '',
                            title: '',
                            src: '',
                            class_id: '',
                            price: '',
                        }
                    }
                });
			},
            handleChange(info) {
                let that = this;
                if (info.file.status === "uploading") {
                    return;
                }
                if (info.file.status === "done") {
                    if (info.file.response.status == 1) {
                        this.paramsObj.src = info.file.response.data.path;
                    } else {
                        that.$notification["warning"]({
                            message: "上传错误",
                            description: info.file.response.msg
                        });
                    }
                } else if (info.file.status === "error") {
                    that.$notification["warning"]({
                        message: "上传失败",
                        description: "文件" + info.file.name + "上传失败"
                    });
                }
            },
            beforeUpload(file) {
                console.log(file.type === "image/jpeg");
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
            getEditSelect() {
                let that = this;
                this.$axios({
                    //请求分类下拉列表
                    method: "GET",
                    url: "/index.php?r=uc/product/get-class",
                    params: {}
                }).then(function(d) {
                    // 响应成功回调
                    var udata = d.data;
                    if (udata.status == 1) {
                        that.editSelectList = udata.data;
                    }
                })
			},
            selEditChange(value) {
                this.paramsObj.class_id = value; //分类id
            },
			deleteImg(e) {
                e.stopPropagation();
                this.paramsObj.src = ''
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
		created() {
			this.getSelect();
		}
	}
</script>
<style scoped lang="less">
	.tab {
		margin: 0px 20px 50px 20px;
        position:relative;
	}
	.background-color {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
		background: #fff;
	}
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
	.up-content2 {
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
	.up-content2 .ant-upload.ant-upload-select-picture-card {
		width: 70px;
		height: 70px;
	}
</style>