<template>
	<div class="background-color">
		<div class="head">
			<a-button type="primary" @click="create()" style="float: right">企业授权</a-button>
		</div>
		<div class="main-content" >
			<a-table :columns="columns" :dataSource="companyList" :pagination="false">
				<template slot="action" slot-scope="text, record, index">
					<div style="text-align:center;">
						<!--<a href="javascript:void(0);" @click="edit($event,record)"   style="text-align:center;margin-right:10px;color: #5AA9CD" >编辑</a>-->
						<a href="javascript:void(0);" @click="view(record)"   style="text-align:center;margin-right:10px;color: #5AA9CD">查看员工</a>
						<span style="text-align:center">
							<a-popconfirm title="清除所有记录，确定移除？" placement="top" @confirm="del(record)" okText="确定" cancelText="取消">
								<a href="javascript:void(0);" style="color: #8D938D;">移除</a>
							</a-popconfirm>
						</span>
					</div>
				</template>
			</a-table>
			<!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!companyList.length" ></data-status> -->
		</div>

		<a-modal title="企业授权" :footer="null" :visible="visible" @cancel="com_handleCancel">
			<a-form :form="form">
				<a-form-item :wrapperCol="{span: 24}" label="企业名称：">
					<a-input  autocomplete="off" placeholder='请输入企业名称'  v-decorator="['name', {rules: [{required: true,message: '不能为空'}]}]"/>
				</a-form-item>
				<a-form-item :wrapperCol="{span: 24}" label="企业ID：">
					<a-input  autocomplete="off" placeholder='请输入企业ID' v-decorator="['appid', {rules: [{ required: true,message: '不能为空'}]}]"/>
				</a-form-item>
				<a-form-item :wrapperCol="{span: 24}" label="应用秘钥：">
					<a-input  autocomplete="off" placeholder='请输入应用秘钥' v-decorator="['appSecret', {rules: [{ required: true,message: '不能为空'}]}]"/>
				</a-form-item>
				<a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
					<a-button @click="com_handleCancel">取消</a-button>
					<a-button :loading="loading" @click="com_handleOk" type='primary'  style="margin-left: 10px;">确定</a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script>
	import dataStatus from '../../components/pageConfig/dataStatus'
    var comConf = require('../../common/comConfig');
	export default {
        name: "companyWxAuth",
        components: {
            dataStatus
		},
		data() {
			return {
                visible: false,
                columns:[
                    {
                        title: '企业名称',
                        align:'center',
                        dataIndex: 'corpname'
                    },
                    {
                        title: '企业ID',
                        align:'center',
                        dataIndex: 'corpid',
                    },
                    {
                        title: '应用秘钥',
                        align:'center',
                        dataIndex: 'corpsecret'
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
				companyList:[],
				companyInfo:{
                    id:'',
                    name:'',
					appid:'',
                    appSecret:''
				},
                loading:false,
                editid:''
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
            com_handleCancel() {
                this.visible = false;
            },
            create() {
                this.editid=''
                this.form.setFieldsValue({
                    'name':'',
                    'appid':'',
                    'appSecret':''
                })
                this.visible = true;
			},
            com_handleOk() {
                this.form.validateFields(err => {
                    if (!err) {
                        this.logging = true
                        this.$axios({
                            method: 'POST',
                            url: '/qiyewxapi/addconfig?',
                            data: {
                                cid:this.editid,
                                corpname: this.form.getFieldValue('name'),
                                corpid: this.form.getFieldValue('appid'),
                                corpsecret:this.form.getFieldValue('appSecret'),
                                action:this.editid!=''?'edit':'add',
								host:this.$store.state.user.company.ecms_name
                            }
                        }).then(res=> {
                            this.logging = false
                            let udata = res.data
                            if (udata.status == 1) {
                                this.$message.success('授权成功')
								if(this.editid=='') {
                                    this.syncUser(udata.data)
								}
                                this.getData()
                                this.visible = false;
                            }
                        }).catch(error=> {
                            this.logging = false
                        });
                    }else {
                        this.$message.warn('请补全信息')
					}
                });
			},
            syncUser(id) {
                this.$axios({
                    method: 'get',
                    url: '/qiyewxapi/syncemployee?',
                    params: {
                        cid:id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('同步员工成功')
                    }
                });
			},
            edit(e,record){
                e.stopPropagation();
                this.editid = record.id
                this.form.setFieldsValue({
                    name: record.corpname,
                    appid: record.corpid,
                    appSecret:record.corpsecret
                })
                this.visible = true;
            },
            del(record){
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/addconfig?',
                    data: {
                        cid:record.id,
						action:'del'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
						this.getData()
                    }
                });
			},
            view(record) {
                this.$router.push({path:'/systemManage/companyUser',query:{'id':record.id}});
			},
            getData() {
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/getcorlist?',
                    data: {}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
						this.companyList = udata.data
                    }
                });
			}
		},
		created: function() {
            this.getData()
             console.log(this.$router)
		},
        beforeCreate() {
            this.form = this.$form.createForm(this);
            this.form.getFieldDecorator('name', {
                initialValue: ['']
            });
            this.form.getFieldDecorator('appid', {
                initialValue: ['']
            });
            this.form.getFieldDecorator('appSecret', {
                initialValue: ['']
            });
        },
        beforeDestroy() {

        },
	}
</script>
<style lang="less" scoped>
	.background-color {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
		background: #fff;
		.head {
			width:100%;
			padding:20px 20px 0 20px;
			background:#fff;
			margin-bottom:20px;
		}
		.main-content {
			width:100%;
			min-height:460px;
			height:calc(~'100vh - 270px');
			background:#fff;
			padding:30px 30px;
			overflow-y:auto;
		}
	}
</style>