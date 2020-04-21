<style lang="less" scoped>
    .user-manage {
        background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f0f2f5;
        }
        .content {
            padding: 20px;
        }

    }
.avatar-uploader,
.avatar-uploader-trigger,
.avatar {
  width: 150px;
  height: 150px;
}
.avatar-uploader {
  display: block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar-uploader-trigger {
  display: table-cell;
  vertical-align: middle;
  font-size: 30px;
  color: rgb(111, 150, 255);
  height:150px;
  line-height:150px;
}

</style>

<template>
    <div class="user-manage">
        <div class="header">
            {{title}}
        </div>
        <div class="content">
            <a-form @submit.prevent="handleSubmit" :form="form">
                <!--<a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='真实姓名'>-->
                    <!--<a-input v-model="userInfo.real_name" placeholder='请输入真实姓名' style="width: 80%;"/>-->
                <!--</a-form-item>-->
                  
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='上传头像'>
                  <a-upload class="avatar" name="file" :headers="headers" @change="handleChange" listType="picture-card" :beforeUpload="beforeUpload" :showUploadList="false" action="/index.php?r=uc/user/upload">
                    <div className="ant-upload-text">
                        <!-- <img :src='mediapath' alt="mediapath" className="avatar" /> -->
                        <div :style="{ background:'url('+userInfo.avatar+') no-repeat center/90%',backgroundSize:'contain',width:'150px'}" class="avatar">
                            <a-icon type="plus"  class="avatar-uploader-trigger" v-if="userInfo.avatar?false:true" size="30" />
                        </div>

                    </div>
                  </a-upload>
                    <!-- <a-upload-dragger class="headImg" name="file" :headers="headers" @change="handleChange" listType="picture-card" :beforeUpload="beforeUpload" :showUploadList="false" action="/index.php?r=uc/user/upload">
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">点击或将文件拖拽到这里上传图片(文件大小不能超过1M,支持文件类型jpg,png)</p>
                    </a-upload-dragger> -->
                    <!-- <div class="ant-upload-list ant-upload-list-picture-card">
                        <a-icon type="loading" v-if="loading" class="loading"/>
                        <div class="ant-upload-list-item ant-upload-list-item-done" >
                            <div class="ant-upload-list-item-info">
                                <span>
                                    <a href="javascript:void(0)" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
                                        <img  :src="mediapath" alt="mediapath">
                                    </a>
                                </span>
                            </div>
                            <span class="ant-upload-list-item-actions">
                                <a href="javascript:void(0)">
                                    <a-icon type="eye" @click.prevent="handlePreview(mediapath)"></a-icon>
                                </a>
                                <a-icon type="delete"  @click.prevent="deleteFn()"></a-icon>
                            </span>
                        </div>
                    </div> -->
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='登录账号' :validateStatus='savFlg?"":/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(userInfo.tel)?"success":"error"' :help='savFlg?"":/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(userInfo.tel)?"":"请输入正确的手机账号"'>
                    <a-input v-model="userInfo.tel" placeholder='请输入登录账号' style="width: 80%;" maxlength="11" />
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='密码'  :validateStatus='savFlg?"":userInfo.pass_word?"success":"error"' :help='savFlg?"":userInfo.pass_word?"":"请输入密码"'>
                    <a-input v-model="userInfo.pass_word" placeholder='请输入密码'  style="width: 80%;"  maxlength="16"/>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='用户名'>
                    <a-input v-model="userInfo.user_name" placeholder='请输入用户名' style="width: 80%;"  maxlength="10"/>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='所属部门'>
                    <a-select  v-model="userInfo.department_id" @change="changeDepartment" placeholder='下拉选择所属部门' style="width: 80%;">
                        <a-select-option v-for="(item,index) in departmentList" :key="item.id">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='角色'>
                    <a-select v-model="userInfo.role_id" placeholder='下拉选择角色' style="width: 80%;">
                        <a-select-option v-for="(item,index) in roleList" :key="item.id">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false">
                    <div style="width: 80%;text-align: right">
                        <a-button @click="back" style="margin-right: 10px">返回</a-button>
                        <a-button type='primary' htmlType='submit' style="margin-left: 10px">保存</a-button>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
    var storage = require('../../common/store')
    export default {
        name: ""
        ,data(){
            return{
                form: this.$form.createForm(this),
                id:this.$route.query.id,
                title:'修改用户',
                loading:false,
                userInfo:{
                    avatar:''
                },
                departmentList:[],
                roleList:[],
                role:{},
                savFlg:true,
                headers:{
	                Authorization: storage.store.get('token')
                },
                mediapath:''
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            back() {
                this.$router.push({path: '/groupManage/userManage'});
//                this.$router.back(-1)
            },
            handlePreview(val){
            },
            deleteFn(){

            },
            handleChange(info) {
                  this.loading = true
				 if (info.file.status === 'uploading') {
			        this.loading = true
			        return
			      }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
                        this.userInfo.avatar  = info.file.response.data.path;
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
                // console.log(file.type === 'image/jpeg')
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
            getDepartment() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-dist-department',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        type:'2'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data.departmentList
                    }
                });
            },
            getRole() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/role-list',
                    data:{
                        id:this.userInfo.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.roleList = udata.data.role_list
                        if(!!this.id&&!Array.isArray(udata.data.role)) {
                            this.role = udata.data.role
                            let flag = false
                            this.roleList.forEach(el=>{
                                if(el.id == this.role.id) {
                                    flag = true
                                }
                            })
                            if(!flag) {
                                this.roleList.push(this.role)
                            }
                        }
                    }
                });
            },
            handleSubmit() {
                let url = ''
                let title = ''
                if(!this.userInfo.pass_word && !this.id){
                    this.savFlg = false;
                    return false
                }
                if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(this.userInfo.tel)) {
                    this.savFlg = false;
                    return false
                }
                if(this.userInfo.pass_word&&!/^[A-Za-z0-9]{6,16}$/.test(this.userInfo.pass_word)) {
                    this.$message.warning('请输入6位以上的大小写字母及数字组成的密码')
                    return false
                }
                if(!!this.id) {
//                    修改
                    url = '/index.php?r=uc/organization/user-update'
                    title='修改用户成功'
                } else {
//                    新建
                    url = '/index.php?r=uc/organization/user-add'
                    title='新建用户成功'
                }
                this.$axios({
                    method: 'POST',
                    url: url,
                    data:this.userInfo
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success(title)
                        this.back()
                        this.$axios({
                            method: 'GET',
                            url: '/index.php?r=uc/user/list',
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                this.$store.commit('user/setUser',udata.data.user) 
                                this.$store.commit('user/setDepartment',udata.data.department)
                                this.$store.commit('user/setManager',udata.data.manager)
                            }
                        });
                    }
                });
            },
            changeDepartment(value) {
                this.userInfo.department_id = value
            }
        },
        created(){
            if(!!this.id) {
                this.title = '修改用户'
                this.userInfo = storage.store.get('editUser')
            } else {
                this.title = '添加用户'
//                this.userInfo.department_id = this.$route.query.departmentId
            }
            this.getDepartment()
            this.getRole()
        },
        destroyed() {
            storage.store.remove('editUser');
        }
    }
</script>
