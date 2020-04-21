<template>
	<div class="background-color">
		<a-row style="padding: 20px 20px 0 20px">
			<a-col span="12" style="text-align: left;">
				<a-input-search placeholder="请输入编号、类别搜索" style="width: 220px;margin-bottom: 20px;" @search="onSearch" enterButton/>
			</a-col>
			<a-col span="12" style="text-align: right;">

				<a-button type="primary" @click="new_create">新建</a-button>

			</a-col>
		</a-row>
		<div class="tab product-sort">
			<a-table :columns="columns" :dataSource="dataList"  @change="onShowSizeChange" :pagination="pagination" style="width:100%;" :locale="locale">
				<template slot="operation" slot-scope="text, record, index">
					<div class='editable-row-operations'>
						<span style="margin-right: 10px;">
				          	<a @click="() => editFn(record.id,record.title,record.desc)">编辑</a>
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
		

		<a-modal :title="robotFlag==1?'添加产品类别':'修改产品类别'" :footer="null" :visible="visible" @cancel="com_handleCancel">
			<a-form @submit="com_handleOk" :form="form">
				<a-form-item :wrapperCol="{span: 24}" label="类别名称：">
					<a-input @change="this.input_name" autocomplete='off' placeholder='请输入产品类别'  v-decorator="[ 'title', {rules: [{ required: true, message: '不能为空' }]}]" maxlength="15"/>
				</a-form-item>

				<a-form-item :wrapperCol="{span: 24}" label="类别描述：">
					<a-input @change="this.desc" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" placeholder='请输入类别描述。。。' v-decorator="[ 'desc']" style="text-align:left;" maxlength="50"/>
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
	import dataStatus from '../../components/pageConfig/dataStatus'
	import { powerObject } from '@/common/util'	
	const columns = [{
		title: '名称',
		dataIndex: 'title',
		align:'center',
		width:200
//		scopedSlots: {
//			customRender: 'title'
//		},
	}, 
	{
		title: '数量',
		dataIndex: 'goodsNum',
		align:'center',
        width:150
//		scopedSlots: {
//			customRender: 'goodsNum'
//		},
	},
	{
		title: '描述',
		dataIndex: 'desc',
		align:'left',
//		scopedSlots: {
//			customRender: 'desc'
//		},
	}, 
	{
		title: '操作',
		dataIndex: 'operation',
		align:'center',
        width:300,
		scopedSlots: {
			customRender: 'operation'
		},
	}]
	export default {
		name: "productSort",
		components: {
            dataStatus
		},
		data() {
			return {
				columns,
				visible: false,
				searchKey: '',
				edit_id:'',//编辑ID
				robotFlag:1,  //产品类别 -->区分新建还是编辑 1：新建   2：编辑
                dataList:[],
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
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);
			this.form.getFieldDecorator('desc', {
				initialValue: ['']
			});
			this.form.getFieldDecorator('title', {
				initialValue: ['']
			});
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
			com_handleCancel() {
				this.visible = false;
			},
			desc(value) {
				this.form.setFieldsValue({
					desc: value,
				})
			},
			input_name(value) {
				this.form.setFieldsValue({
					title: value,
				})
			},
			deleteFn (id) {//删除
		   		let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/product/class-del',
					data:  {
						'id':id
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
			new_create() {//新建
				this.visible = true;
				this.edit_id = '';
				this.robotFlag = 1;//产品类别 -->区分新建还是编辑 1：新建   2：编辑
                console.log(this.form)
				this.form.setFieldsValue({
					title: '',
					desc: '',
				})
			},
			editFn(id,title,desc){//编辑
				this.robotFlag = 2;//产品类别 -->区分新建还是编辑 1：新建   2：编辑
				this.edit_id = id;
				this.form.setFieldsValue({
					title: title,
				})
				this.form.setFieldsValue({
					desc: desc,
				})
				
				this.visible = true;
			},
			com_handleOk(e) {
				let that = this;
				e.preventDefault()
				this.form.validateFields((err, values) => {
					if(err) {
						console.log('Received values of form: ', values)
						return false;
					}
				
				
					this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/product/class-add',
						data:  Object.assign(values,{
							'id':that.robotFlag==2?that.edit_id:''   //编辑时传标签ID
						})
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.$message.success(that.robotFlag == 1?'新建成功':'保存成功', 2);
							that.visible = false;
							that.refreshGroup();
						}
					});
				
				})
			},
			refreshGroup(){
				let that = this;
				
				this.$axios({
					method: 'GET',
					url: '/index.php?r=uc/product/category',
					params:{
						'p':that.pagination.current,			//页码
						'n':that.pagination.pageSize,			//每页条数
						'key':that.searchKey
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
			this.refreshGroup();
		}
	}
</script>
<style>
	.product-sort .ant-table-thead > tr > th{
		text-align: center !important;
	}
	.background-color {
		background: #fff;
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
	.ant-table-tbody>tr>td{
		text-align: left;
	}
</style>
<style scoped>
	.tab {
		margin: 0px 20px 50px 20px;
        position:relative;
	}
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
</style>