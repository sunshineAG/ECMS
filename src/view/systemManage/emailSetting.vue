<style lang="less" scoped>
	.personal-setting {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
		background: #fff;

		.set-content {
			padding: 20px 37px;
		}
	}
</style>
<template>
	<div class="personal-setting">
		<div class="set-content">
			<div style="font-size: 18px;color: #101010;font-weight: 700">
				绑定邮箱
				<a-switch size="small" v-model="email_open" @change="change" style="margin-left: 10px"/>
			</div>
			<div style="color: #A7A8AA;font-size: 14px">
				用于接收告警邮件，内含持续掉线超过1小时的机器人（微信号）列表
			</div>
			<div style="margin-top: 30px" v-show="email_open">
				<a-form :form="form" >
					<a-form-item >
						<a-input-search placeholder="请输入邮箱地址" @search="save" style="width: 350px"  v-decorator="['bindEmail',{rules: [{type: 'email',message: '请输入正确的邮箱格式！'},{required: true,message: '请输入邮箱地址！'}]}]">
							<a-button slot="enterButton" type="primary" :style="{'background-color':email==''?'#5aa9cd':'#FF7875','border-color':email==''?'#5aa9cd':'#FF7875'}">{{email==''?'绑定':'更改绑定'}}</a-button>
						</a-input-search>
					</a-form-item>
				</a-form>
			</div>
		</div>
	</div>
</template>
<script>
	var storage = require('../../common/store')
	export default {
		name: "monitorSetting",
		data() {
			return {
				email:'',
				email_open:false,
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
            getEmailInfo() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/user/email'
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.form.setFieldsValue({
                            bindEmail: udata.data.email,
                        })
						this.email = udata.data.email
                        this.email_open = udata.data.switch=='0'?false:true
                    }
                });
			},
            change() {
				this.save(true)
			},
            save(bool) {
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err||bool) {
                        this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/user/email-save',
                            data:{
								email:values.bindEmail,
                                switch:this.email_open?'1':'0'
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                this.$message.success('保存成功')
                                this.getEmailInfo()
                            }
                        });
                    }
                });

			}
		},
		created: function() {
			this.getEmailInfo()
		},
        beforeCreate() {
            this.form = this.$form.createForm(this);
            this.form.getFieldDecorator('bindEmail', {
                initialValue: ''
            });
        },
		mounted() {},
		beforeUpdate() {}
	}
</script>
