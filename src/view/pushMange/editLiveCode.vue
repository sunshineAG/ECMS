<style scoped lang="less">
	.background-color{
		background: #fff;
		height: calc(~'100vh - 110px');
		overflow-y: auto;
	}
	.mag_push_title {
		border-bottom: 1px solid rgb(187, 187, 187);
		margin: 0 0 20px 0;
		padding: 17px 38px;
		font-size: 16px;
		background: #fff;
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
</style>
<template>
	<div class="background-color">
		<div class="mag_push_title">{{title}}</div>
		<a-row>
			<a-col justify="center" span="18" push="3">
				<a-form>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='个人活码名称：' :validateStatus='saveFlag?"success":paramsObj.live_code_desc?"success":"error"' :help='saveFlag?"":paramsObj.live_code_desc?"":"请输入个人活码名称"'>
						<a-input placeholder='请输入个人活码名称' v-model="paramsObj.live_code_desc" />
					</a-form-item>
					<!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='自动通过（分）：' style="margin-bottom: 30px">-->
						<!--<a-input-number :min="1" v-model="paramsObj.auto_pass_time" />-->
					<!--</a-form-item>-->
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='二维码展示次数：'>
						<a-slider v-model="paramsObj.live_code_pv" :min="200" :max="500" :tooltipVisible="true" style="width: 95%;display: inline-block" />
						<a-tooltip placement="right" style="position: absolute;right: -20px;top: 0;transform: translateY(-50%)">
							<template slot="title">
								<span>用于设置每个机器人每天的活码访问展示次数，用于机器人分担流量</span>
							</template>
							<a-icon type="question-circle" theme="filled" style="cursor: pointer;font-size: 20px"/>
						</a-tooltip>
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='绑定机器人：'>
						<a-select :allowClear="true" v-model="paramsObj.assistant_id" placeholder="请选择。。。" @change="changeRobot" mode="multiple">
							<a-select-option :key="items.id" v-for="(items,index) in robotListAll">
								{{items.nickname}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label=' ' :colon="false" style="text-align: right">
						<a-button @click="com_handleCancel" style="margin-right: 10px" >取消</a-button>
						<a-button type='primary' @click="com_handleOk">提交</a-button>
					</a-form-item>
				</a-form>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	var storage = require('../../common/store')
	export default {
		name: "editLiveCode",
		data() {
			return {
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 5
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 12
					},
				},
                title:'',
                id:this.$route.query.id,
				user_id:this.$route.query.user_id,
				department_id:this.$route.query.department_id,
                saveFlag:true,
                paramsObj:{
				    live_code_desc:'',
					auto_pass_time:1,
					live_code_pv:250,
					assistant_id:[]
				},
                robotListAll:[]
			}
		},
		methods: {
            com_handleCancel() {
                this.$router.push({path: '/pushMange/liveCode'})
            },
            changeRobot(value) {
                this.paramsObj.assistant_id = value;
            },
            com_handleOk() {
                if (
                    !this.paramsObj.live_code_desc ||
					(this.paramsObj.assistant_id.length==0)
                ) {
                    this.saveFlag = false
                    return false;
                }
                let url = ''
                if(this.id!='0') {
                    url = "/livecode/livecodeManager/updatelivecodejson?"
                    this.paramsObj.live_code_id = this.id
                } else {
                    url = "/livecode/livecodeManager/createlivecodejson?"
					this.paramsObj.company_short_name=this.$store.state.user.company.ecms_short_name
                    this.paramsObj.company_user_id = this.$store.state.user.user.user_id
                }
                this.paramsObj.assistant_id = this.paramsObj.assistant_id.join('_')
                this.paramsObj.user_id = this.user_id
				this.paramsObj.department_id = this.department_id
                this.$axios({
                    method: "get",
                    url: url,
                    params: this.paramsObj // 参数
                }).then(d=> {
                    // 响应成功回调
                    var udata = d.data;
                    if (udata.status == 1) {
                        this.$message.success('保存成功');
                        this.saveFlag = true
                        this.$router.push({
                            path: "/pushMange/liveCode"
                        });
                    }
                });
			},
            getRobot(bool) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/assistant-list',
                    data:{
                        department_id:this.department_id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.robotListAll = udata.data
						if(bool) {
                            this.getLiveCode()
						}
                    }
                });
            },
            getLiveCode() {
                this.$axios({
                    method: 'POST',
                    url: '/livecode/livecodeManager/livecodejson?',
                    data:{
                        live_code_id:this.id,
                        company_short_name:this.$store.state.user.company.ecms_short_name
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.paramsObj = {
                            live_code_desc:udata.data[0].live_code_desc,
							auto_pass_time:parseInt(udata.data[0].auto_pass_time),
							live_code_pv:parseInt(udata.data[0].live_code_pv),
							assistant_id:[]
                        }
                        udata.data.forEach(el=>{
                            let flag = false
                            this.robotListAll.forEach(item=> {
								if(el.assistant_id == item.id) {
                                    flag = true
								}
                            })
                            flag&&this.paramsObj.assistant_id.push(el.assistant_id.toString())
						})

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

            if(this.id!='0') {
                this.getRobot(true)
                this.title = '修改个人号活码'
            } else {
                this.getRobot(false)
                this.title = '创建个人号活码'
            }
		}
	}
</script>
