<style scoped lang="less">
	.background-color {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
		position: relative;
	}
	.cardTitle {
		height: 42px;
		line-height: 42px;
		border-bottom: 0px solid #ffffff;
		padding-left: 10px;
		padding-right: 10px;
	}
	.header {
		.headerForm{
			padding: 16px;
			background: #fff;
			height: 72px;
		}
	}
	.fl {
		float: left;
	}
	.fr {
		float: right;
	}
</style>
<template>
	<div class="background-color">
		<!--<a-row style="padding: 16px;margin-bottom: 10px;background: #fff;height: 72px;line-height: 40px">-->
			<!--<a-col span="12" style="text-align: left;">-->
				<!--<a-input-search placeholder="请输入任务名称" style="width: 200px" @search="onSearch()" enterButton/>-->
			<!--</a-col>-->
			<!--<a-col span="12" style="text-align: right;">-->
				<!--<a-button type="primary" @click="new_create('0',user_id)">新建</a-button>-->
			<!--</a-col>-->
		<!--</a-row>-->
		<div class="header">
			<a-form
					@submit.prevent="handleSubmit"
					layout="inline"
					:form="form"
					class="headerForm"
			>
				<a-row>
					<a-col :span="18">
						<div class="fl">
							<a-form-item >
								<a-input-search placeholder="请输入关键字" style="width: 200px;" v-model="queryParam.key" @search="onSearch" enterButton/>
							</a-form-item>
							<a-form-item label="选择部门">
								<a-tree-select
										:treeData="departmentList"
										:treeDefaultExpandAll="true"
										v-model="queryParam.department_id"
										@select="onSelect"
										style="min-width: 200px"
								>
								</a-tree-select>
							</a-form-item>
						</div>
					</a-col>
					<a-col :span="6" style="height: 39px;line-height: 39px;text-align: left" >
						<div class="fr">
							<a-button type="primary" @click="new_create('0',user_id)">新建</a-button >
						</div>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<div v-if="liveCodeList.length==0" style="text-align: center;padding:50px 0 ;width: 100%;background: #fff;margin-top:10px;">
			<img src="../../assets/add.png" alt="" style="width: 100px;height: 100px;margin-bottom: 20px;cursor: pointer" @click="new_create('0',user_id)">
			<p style="font-size: 24px">未创建个人活码</p>
			<div style="background: #eaeaea;text-align: left;margin: 50px 10%;padding: 15px">
				<div style="font-weight: 700;margin-bottom: 10px">个人活码功能介绍：</div>
				<div style="color: rgb(102,102,102)">
					1、实现一个活码关联多个机器人二维码，自动切换展示，分担流量<br/>
					2、自动通过好友
				</div>
			</div>
		</div>
		<div v-else>
			<div v-for="item in liveCodeList" style="margin: 10px 0;background: #fff;" :key="item.id">
				<div class="cardTitle">
					<!--<a-icon type="qrcode" :style="{ color: '#056ef9',fontSize: '32px' }" style="vertical-align: middle;"/>-->
					<img src="../../assets/qrcode.svg" alt="" style="width: 32px;vertical-align: middle;">
					<span style="font-weight: 700">活码名称：&nbsp;&nbsp;{{item.live_code_desc}}</span>
				</div>
				<div style="padding: 10px 45px;height: 120px">
					<a-row type="flex" align="middle" style="height: 100px">
						<a-col span="6">
							<p  style="padding:0;">
								创建时间：{{item.created}}
							</p>
							<p style="padding:  0px;">
								活码地址：{{item.live_code_domain}}
							</p>
						</a-col>
						<a-col span="6">
							<p  style="padding:0;">
								机器人数：{{item.assistant_num}}
							</p>
							<p style="padding:  0px;">
								活码访问量：{{item.scan_num}}
							</p>
						</a-col>
						<a-col span="6" style="border-left:1px solid #dedede;padding-left: 10px;">
							<p style="padding: 0; line-height: 30px;">状态：
								<span v-show="item.state==0">未开始</span>
								<span v-show="item.state==10" style="color: rgb(5, 110, 249)">已开始</span>
							</p>
							<p style="padding:0px; line-height: 30px">
								<a-button  type="primary" size="small" style="padding: 0 10px" @click="run(item.id,'10')"  v-show="item.state==0">开始</a-button>
								<a-button  style="background: #8a8989;border-color: #8a8989;padding: 0 10px" type="primary"  size="small" @click="run(item.id,'0')" v-show="item.state==10">停止</a-button>
							</p>
						</a-col>
						<a-col  span="6" style="text-align: right;position: relative;">
							<!--二维码-->
                            <a-tooltip placement="left">
                                <template slot="title">
                                    <div style="display: inline-block;width: 200px;height: 200px;vertical-align: middle">
                                        <img :src="item.live_code_url" style="width: 100%;height: 100%;"  />
                                    </div>
                                </template>
                                <div style="display: inline-block;width: 100px;height: 100px;vertical-align: middle;margin-right: 20px">
                                    <img :src="item.live_code_url" style="width: 100%;height: 100%;"  />
                                </div>
                            </a-tooltip>
							<div style="display: inline-block;vertical-align: middle">
								<div style="line-height: 50px">
									<a-button  type="primary" size="small" @click="new_create(item.id,item.user_id)">编辑</a-button>
								</div>
								<div style="line-height: 50px">
									<a-button style="background: #8a8989;border-color: #8a8989" type="primary"  size="small" @click="del(item.id)">删除</a-button>
								</div>
							</div>
						</a-col>
					</a-row>
				</div>
			</div>
			<a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;margin-top: 10px"/>
			<br>
		</div>
	</div>
</template>

<script>
	import { powerObject } from '@/common/util'
	export default {
		data() {
		    return {
				liveCodeList:[],
                page:1,
                page_size:10,
                total:0,
				user_id:'',
                departmentList: [],
                queryParam: {
                    key: "",
                    department_id: "",
                },
			}
		},
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
		methods: {
            onSearch(value) {
				this.getLiveCode()
            },
            new_create(id,user_id) {
				this.$router.push({path:'/pushMange/editLiveCode',query:{'id':id,'user_id':user_id,'department_id':this.queryParam.department_id}});
            },
            getLiveCode() {
                this.$axios({
                    method: 'get',
                    url: '/livecode/livecodeManager/indexjson?',
                    params:  {
                        p:this.page,			//页码
                        n:this.page_size,			//每页条数
                        search:this.queryParam.key,
                        company_short_name:this.$store.state.user.company.ecms_short_name,
                        company_department_id:this.queryParam.department_id,
                        company_user_id:this.$store.state.user.user.user_id
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if(udata.status == 1) {
                        this.total = udata.data.count;
                        this.liveCodeList = udata.data.list;
                        this.user_id = udata.data.user.id
                    }
                })
			},
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getLiveCode()
            },
            onShowSizeChange(current, size) {
                this.page = current
                this.page_size = size
                this.getLiveCode()
            },
            del(id) {
                let _this =this
                this.$confirm({
                    title:'确定删除当前活码？',
                    onOk:function () {
                        _this.$axios({
                            method: 'get',
                            url: '/livecode/livecodeManager/deletelivecodejson?',
                            params:  {
                                live_code_id:id
                            }
                        }).then(d=> {
                            // 响应成功回调
                            let udata = d.data;
                            if(udata.status == 1) {
                                _this.$message.success('删除成功');
                                _this.getLiveCode()
                            }
                        })
                    }
                })
			},
            run(id,state) {
                this.$axios({
                    method: 'get',
                    url: '/livecode/livecodeManager/changestatejson?',
                    params:  {
                        live_code_id:id,
                        state:state
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if(udata.status == 1) {
                        this.getLiveCode()
                    }
                })
			},
			getCompanyInfo() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/user/company-info'
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$store.commit('user/setCompany', udata.data)
						this.treeList()
                    }
                })
			},
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
				this.getLiveCode()
            },
            listToTree(list,val) {
//              将部门列表转换为tree所用数据
                let array = []
                list.forEach((el,idx)=>{
                    if(el.children && el.children.length > 0) {
                        el.children =this.listToTree(el.children,idx)
                    }
                    array.push({title:el.name,key:el.id,value:el.id,children:el.children})
                })
                return array
            },
            onSelect(selectedKeys, info) {
                this.page = 1
                this.page_size = 10
                this.queryParam.department_id = selectedKeys
				this.getLiveCode()
            }
		},
        mounted() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
        },
        updated() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
        },
		created() {
			this.getCompanyInfo()
        }
	}
</script>
