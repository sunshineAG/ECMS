<template>
	<div class="company-user">
		<div class="header" ref='header'>
			<a-form  layout="inline" :form="form" >
				<a-row class="clr">
					<a-col :span="24">
						<div class="fl">
							<a-form-item label="选择部门">
								<!--<a-tree-select-->
										<!--:treeData="departmentList"-->
										<!--:treeDefaultExpandAll="true"-->
										<!--v-model="queryParam.department_id"-->
										<!--@select="onSelect"-->
										<!--style="min-width: 200px"-->
								<!--&gt;-->
								<!--</a-tree-select>-->
                                <a-select v-model="queryParam.department_id" @change="onSelect"  style="width: 200px;"  placeholder='选择部门'>
                                    <a-select-option  v-for="(item,idx) in departmentList" :key="item.id" >
                                        {{item.name}}
                                    </a-select-option>
                                </a-select>
							</a-form-item>
                        </div>
						<div class="fl">
							<a-form-item label="选择用户">
								<a-select v-model="queryParam.user_id" @change="managerChange"  style="width: 200px;"  placeholder='选择用户'>
									<a-select-option  v-for="(item,idx) in managerList" :key="item.id" >
										{{item.user_name}}
									</a-select-option>
								</a-select>
							</a-form-item>
						</div>
						<div class="fl">
							<a-form-item label="">
								<a-input-search v-model="queryParam.key" placeholder="输入企业微信姓名" style="width: 220px;" @search="search()" enterButton/>
							</a-form-item>
						</div>
						<div class="fr">
							<a-button type="primary" @click="syncUser()" :loading="syncLoading">同步</a-button>
							<a-button  @click="back" icon="left" style="padding: 0 10px">返回</a-button>
						</div>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div class="content" >
			<a-table ref="table" :columns="columns" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="companyUserList" :pagination="false" :loading='loading'   type="checkbox"   :scroll="{y:sheight,x:false}">
				<template slot="avatar" slot-scope="text, record, index">
					<div>
						<img v-if="!!text" :src="text"  style="width: 30px;height: 30px;border-radius:100%">
						<span style="display: inline-block;vertical-align: middle">
							<span style="display: block;text-align: left">{{record.name }}</span>
							<span style="color: #FF9800;display: block">@{{record.corpname}}</span>
                        </span>
					</div>
				</template>
                <template slot="ecms_avatar" slot-scope="text, record, index">
                    <div>
                        <img v-if="!!text" :src="text"  style="width: 30px;height: 30px;border-radius:100%">
                        <span>{{record.ecms_name}}</span>
                    </div>
                </template>
				<template slot="robot_active" slot-scope="text, record, index">
					<div>
						<div v-if="text==2">
							<span style="display: inline-block;border-radius: 50%;width: 15px;height: 15px;background: #259B24;vertical-align: middle"></span>
							<span style="vertical-align: middle;display: inline-block">已连接</span>
						</div>
						<div v-else >
							<span style="display: inline-block;border-radius: 50%;width: 15px;height: 15px;background: #8A8A8A;vertical-align: middle"></span>
							<span style="vertical-align: middle;display: inline-block;position: relative">
								{{text=='1'?'未连接':'未激活'}}
								<a-tooltip placement="left" v-if="text==0" style="position: absolute;right: -25px;top: 50%;transform: translateY(-50%)">
									<template slot="title">
										<span>请下载猎鲸App、登录企业微信完成激活！</span>
									</template>
									<a-icon type="info-circle" theme="filled" style="color: #333333;"/>
								</a-tooltip>
							</span>
						</div>

					</div>
				</template>
				<template slot="action" slot-scope="text, record, index">
					<div>
						<a v-if="record.ecms_status=='0'&&record.robot_active!='0'" href="javascript:void(0);" @click="assign(record)" style="text-align:center;margin-right:10px;color: #5AA9CD" >分配</a>
						<span v-if="record.ecms_status=='1'" style="text-align:center">
							<a-popconfirm title="你确定取消分配吗？" placement="top" @confirm="cancelAssign(record)" okText="确定" cancelText="取消">
								<a href="javascript:void(0);" style="color: #FE6354;">取消分配</a>
							</a-popconfirm>
						</span>
					</div>
				</template>
			</a-table>
			<div ref="bottomPage">
				<div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="companyUserList.length" >
					<a-pagination v-if="companyUserList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
				</div>
			</div>
		</div>
		<a-modal title="分配用户" :footer="null" :visible="visible" @cancel="com_handleCancel">
			<a-form :form="form">
				<a-form-item :wrapperCol="{span: 24}" label="选择部门：">
					<!--<a-tree-select-->
							<!--:treeData="assignDepartmentList"-->
							<!--:treeDefaultExpandAll="true"-->
							<!--v-model="assignParam.department_id"-->
							<!--@select="assignSelect"-->
							<!--style="min-width: 200px"-->
					<!--&gt;-->
					<!--</a-tree-select>-->
                    <a-select v-model="assignParam.department_id" @change="assignSelect"  placeholder='选择部门'>
                        <a-select-option  v-for="(item,idx) in assignDepartmentList" :key="item.id" >
                            {{item.name}}
                        </a-select-option>
                    </a-select>
				</a-form-item>
				<a-form-item :wrapperCol="{span: 24}" label="选择用户：">
					<a-select v-model="assignParam.ecms_userid"  placeholder='选择用户'>
						<a-select-option  v-for="(item,idx) in assignManageList" :key="item.id" >
							{{item.user_name}}
						</a-select-option>
					</a-select>
				</a-form-item>

				<a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
					<a-button @click="com_handleCancel">取消</a-button>
					<a-button :loading="modalLoading" @click="com_handleOk" type='primary'  style="margin-left: 10px;">确定</a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script>
	import dataStatus from '../../components/pageConfig/dataStatus'
    var comConf = require('../../common/comConfig');
	export default {
		name: "companyUser",
		components: {
            dataStatus
		},
		data() {
			return {
                id:this.$route.query.id,
                form: this.$form.createForm(this),
                queryParam:{
                    user_id:'',
                    key:'',
                    department_id:''
                },
				assignParam:{
                    ecms_userid:'',
                    department_id:''
				},
                companyUserList:[],
                columns:[
                    {
                        title: '企业员工',
                        dataIndex: 'avatar',
                        width:'20%',
                        align:'center',
                        scopedSlots: {
                            customRender: 'avatar'
                        }
                    },
                    {
                        title: '所属部门',
                        align:'center',
                        width:'20%',
                        dataIndex:'department_name',
                    },
                    {
                        title: '所属用户',
                        align:'center',
                        width:'20%',
                        dataIndex: 'ecms_avatar',
                        scopedSlots: {
                            customRender: 'ecms_avatar'
                        }
                    },
                    {
                        title: '状态',
                        width:'20%',
                        align:'center',
                        dataIndex: 'robot_active',
                        scopedSlots: {
                            customRender: 'robot_active'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        width:'20%',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
				],
                sheight:'',
                heightFlg:false,
                departmentList:[],
                assignDepartmentList:[],
                managerList:[],
				assignManageList:[],
                loading:false,
                modalLoading:false,
                page_size:10,
                page:1,
                total:0,
                visible:false,
				assignId:'',
				assignRemoteId:'',
                syncLoading:false
			}
		},
		methods: {
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.queryParam.department_id  = this.departmentList[0].key
                this.getUserList()
            },
            listToTree(list,val) {
                let array = []
                list.forEach((el,idx)=>{
                    if(el.children && el.children.length > 0) {
                        el.children =this.listToTree(el.children,idx)
                    }
                    array.push({title:el.name,key:el.id,value:el.id,children:el.children})
                })
                return array
            },
            search() {
                this.page = 1
                this.page_size = 10
                this.getCompanyUser()
			},
            onSelect(val) {
                this.page = 1
                this.page_size = 10
                this.queryParam.department_id = val
                this.getUserList()
            },
            getUserList(){
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/user/all-user',
                    data:{department_id:this.queryParam.department_id}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.managerList = udata.data
                        this.managerList.unshift({id:'0',user_name:'全部'})
                        this.queryParam.user_id = '0'
//                        let user_id = ''
//                        this.managerList.forEach(el=>{
//                            if(el.id === this.$store.state.user.user.user_id){
//                                user_id = this.$store.state.user.user.user_id;
//                            }
//                        })
//                        user_id? this.queryParam.user_id = user_id: this.managerList[0]&&this.managerList[0].id?this.queryParam.user_id = this.managerList[0].id:(this.managerList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.queryParam.user_id = '0')
                        this.getCompanyUser()
                    }
                })
            },
            getCompanyUser() {
                this.$axios({
                    method: 'post',
                    url: '/qiyewxapi/getemployeelist?',
                    data:Object.assign({cid:this.id,p:this.page,n:this.page_size},this.queryParam)
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.companyUserList = udata.data.list
                        this.loading = false;
                        this.total = parseInt(udata.data.total)
                    }
                });
			},
//            获取全公司部门,无分页，且无权限控制
            getDepartment() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/user/all-department',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.assignDepartmentList = [].concat(udata.data.departmentList)
                        this.departmentList = udata.data.departmentList
                        this.departmentList.unshift({id:'0',name:'全部'})
                        this.queryParam.department_id  = '0'
                        this.getUserList()
                    }
                });
            },
            managerChange(val){
                this.queryParam.user_id = val;
                this.page = 1
                this.page_size = 10
                this.getCompanyUser()
            },
            back() {
                this.$router.push({path:'/systemManage/companyWxAuth'});
			},
            cancelAssign(record) {
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/assignemployee?',
                    data: {
                        id:record.id,
                        cid:this.id,
                        action:'del'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
						this.getCompanyUser()
                        this.$ws.sendMsgFun({
                            cmd:2510,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:record.remoteId,
                            cmdData:{
                                type:2
                            },
                            priority:0
                        })
                    }
                });
			},
			assign(record) {
                if(record.robot_active =='0') {
                    this.$message.warning('当前机器人未激活，无法分配')
                    return
				}
                if(record.remoteId=='') {
                    this.$message.warning('当前机器人未同步，无法分配')
                    return
				}
				this.assignParam.department_id = record.department_id || this.assignDepartmentList[0].id
				this.assignId = record.id
				this.assignRemoteId = record.remoteId
                this.getAssignUserList(record)
                this.visible = true
			},
            assignSelect(selectedKeys) {
                this.assignParam.department_id = selectedKeys
                this.getAssignUserList()
			},
            getAssignUserList(record){
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/user/all-user',
                    data:{department_id:this.assignParam.department_id}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.assignManageList = udata.data
                        if(!!record&&!!record.ecms_userid) {
                            this.assignParam.ecms_userid = record.ecms_userid
                        }else {
                            let user_id = ''
                            this.assignManageList.forEach(el=>{
                                if(el.id === this.$store.state.user.user.user_id){
                                    user_id = this.$store.state.user.user.user_id;
                                }
                            })
                            user_id? this.assignParam.ecms_userid = user_id: this.assignManageList[0]&&this.assignManageList[0].id?this.assignParam.ecms_userid = this.assignManageList[0].id:(this.assignManageList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.assignParam.ecms_userid = '0')
                        }
                    }
                })
            },
            com_handleCancel() {
                this.visible = false;
                this.assignParam = {
                    ecms_userid:'',
					department_id:''
                }
			},
            com_handleOk() {
                this.modalLoading = true
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/assignemployee?',
                    data: {
                        id:this.assignId,
                        ecms_userid: this.assignParam.ecms_userid,
                        department_id: this.assignParam.department_id,
                        cid:this.id,
                        action:'add'
                    }
                }).then(res=> {
                    this.modalLoading = false
                    let udata = res.data
                    if (udata.status == 1) {
                        this.visible = false;
                        this.$message.success('分配成功')
						this.getCompanyUser()
                        this.$ws.sendMsgFun({
                            cmd:2510,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.assignRemoteId,
                            cmdData:{
                                type:2
                            },
                            priority:0
                        })
                    }else {
                        this.$message.warn(udata.msg)
                    }
                }).catch(error=> {
                    this.modalLoading = false
                });
			},
            syncUser() {
                this.syncLoading = true
                this.$axios({
                    method: 'get',
                    url: '/qiyewxapi/syncemployee?',
                    params: {
                        cid:this.id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('同步员工成功')
						this.getCompanyUser()
                    }
                    this.syncLoading = false
                }).catch(_=>{
                    this.syncLoading = false
                });
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getCompanyUser()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getCompanyUser()
            },
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
            window.addEventListener('resize',this.autoHeight,false)
		},
        watch:{
            companyUserList:function(){
                let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
                let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部
                this.$nextTick(function(){
                    if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                        this.heightFlg = true;
                        this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight + 45;
                    }else{
                        this.heightFlg = false;
                    }
                });
            }
        },
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed: {
			
        },
		created() {
//            this.treeList()
            this.getDepartment()
        },
        beforDestroy(){
            window.removeEventListener('resize',this.autoHeight,false)
        }
	}
</script>
<style lang="less" scoped>
	.company-user {
		background: #ffffff;
		position: relative;
		padding:0 14px;
		border-radius:3px;
		height: calc(~"100vh - 90px");
        overflow: auto;
		.header {
			padding: 12px 0;
			background:#fff;
		}
		.content {
			position:relative;
		}
	}
	.fl{
		float:left;
	}
	.fr{
		float:right;
	}
	.clr:after{
		display: block;
		height:0;
		content:'';
		visibility: hidden;
		clear:both;
	}
	.stausPage{
		position:absolute;
		left:50%;
		top:200px;
		z-index:999;
		transform: translate(-50%,0);
	}
	.actionIcon{
		width: 36px;
		height:36px;
		cursor: pointer;
	}
	.label{
		border:1px dashed #2686d4;
		border-radius:10px;
		width:60px;
		font-size:12px;
		padding:2px 6px;
		cursor: pointer;
		line-height: 16px;
	}
	.company-user .botomCheck{
		float:left;
		vertical-align: middle;
		margin-left:42px;
		margin-top:6px;
	}
</style>