<style lang="less" scoped>
    .user-manage {
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .minbody{
            background:#fff;
            height:94%;
        }
        .header {
            padding: 10px 20px;
            height: 80px;
            // line-height: 60px;
            background:#fff;
            margin-bottom:20px;
            // border-bottom: 20px solid #f0f2f5;
            border-left:8px solid #101010;
            .departmentMsg,.departmentRobt{
                margin:0;
                line-height:32px;
                height:32px;
                font-family: '微软雅黑'
            }
        }
        .minbody-title{
            height:60px;
            line-height:60px;
            border-bottom:1px solid #f0f0f0;
            margin-bottom:60px;
            padding-left:40px;
        }
        
        .content {
            background:#fff;
            height:calc(~'100% - 160px');
            .activeNav{
                background:#5AA9CD;
                color:#fff;
            }
            .content-title{
                height:50px;
                background:#101010;
                .manageTitle{
                    float:left;
                    width:200px;
                    color:#fff;
                    height:50px;
                    line-height:50px;
                    padding-left:28px;
                }
                .wrMsg{
                    float:right; 
                    color:rgb(255, 152, 0);
                    padding-right:10px;
                    height:50px;
                    line-height:50px;
                }
                &&::after{
                    display: block;
                    conetnt:'';
                    height:0;
                    visibility: hidden;
                    clear:both;
                }
            }
            .content-body{
                position:relative;
                height: calc(~'100vh - 260px');
                .clr{
                    position:absolute;
                    bottom:40px;
                    right:0;
                    width:300px;
                }
                
                .body-left{
                    // float:left;
                    width:200px;
                    height:100%;
                    overflow-y: auto;
                    position:absolute;
                    left:0;
                    top:0;
                    ul{
                        padding:0;
                    }
                    li{
                        cursor: pointer;
                        list-style: none;
                        padding-left:30px;
                        margin:0;
                        height:48px;
                        line-height:48px;
                        // text-align:center;
                        font-size:16px;
                        border-bottom:1px solid #f0f0f0;
                        
                    }
                }
                .body-right{
                    position:absolute;
                    left:200px;
                    top:0;
                    padding:30px 0;
                    width: calc(~'100% - 200px');
                    height: calc(~'100vh - 260px');
                    background:#e6e6e6;
                    overflow: auto;
                    .body-title{
                        padding-left:60px;
                        margin-bottom:20px;
                        p{
                            margin:0;
                            color:rgb(0, 121, 254);
                        }
                    }
                    .bodoy-right-qr{
                        float:left;
                        margin-left:50px;
                        border-radius:10px;
                        width:300px;

                    }
                    .body-right-text{
                        width:calc(~'100vh - 10px');
                        min-width:500px;
                        overflow-x: auto;
                        max-height:500px;
                        margin-left:380px;
                        padding:70px 20px;
                        position:absolute;
                        left:0;
                        font-size:16px;
                        p:nth-child(1){
                            margin-bottom:40px;
                            width:100%;
                            height:24px;
                            line-height:24px;
                        }   
                        p:nth-child(2){
                        
                        }
                    }
                }
                &&::after{
                    display: block;
                    conetnt:'';
                    height:0;
                    visibility: hidden;
                    clear:both;
                }
            }

            
        }

    }
      .dataStatus{
            position: absolute;
            // width: 100%;
            height: 50px;
            left: 40%;
            // transform: translate(-50%,0);
            top: 20%;
        }
    .goCrateWarp{
        position: relative;
        height:500px;
        text-align:center
        .dataStatus{
            position: absolute;
            // width: 100%;
            height: 50px;
            left: 40%;
            // transform: translate(-50%,0);
            top: 20%;
        }
       .msgGO,.goCrate{
            position: absolute;
        }
         .msgGO{
             bottom: 34%;
             left:50%;
            transform: translate(-50%,0);
         }
        .goCrate{
            bottom: 20%;
            width:150px;
            height:40px;
            transform: translate(-50%,0);
            left:50%;
            background:#5AA9CD;

        }
        
    }
    .picdefriend{
        height: 40px;
        line-height: 40px;
        background: #8b95a2;
        text-align: center;
        width: 100%;
        color: #fff;
        font-size: 16px;
        font-weight: 800;
    }
</style>

<template>
    <div class="user-manage">
        <div v-if="type">
            <div class="header">
                <p class="departmentMsg">部门信息：{{departmentInfo.name}}</p>
                <p class="departmentRobt">部门机器人(已绑)：<span v-for="(item,idx) in departmentInfo.assistant" :key='idx' style="margin-right: 5px;margin-left: 10px">
                                    {{item.nickname}}</span>
                </p>
            </div>
            <div class="content">
                <div class="content-title">
                    <div class="manageTitle">
                        <!--<a-icon type="user"  ></a-icon>-->
                        <img src="../../assets/user-w.png" style="width: 20px;height: 20px;position: relative;top: -1px">
                        &nbsp;&nbsp;<span>选择客户经理</span>
                    </div>
                    <div class="wrMsg">
                        注意：绑定前请确认所选择的客户经理是否正确在进行扫码绑定
                    </div>
                </div>
                 <div class="goCrateWarp" v-if="!managerList.length">
                     <data-status  class="dataStatus" ></data-status>
                     <p class="msgGO">当前部门还未创建客户经理（系统用户登录账号），所以无法绑定机器人，前往用户管理，进行创建 </p>
                     <a-button  type='primary' class="goCrate" @click="goCrate">前往创建</a-button>
                 </div>
                <a-form :form="form" class="content-body" v-if="managerList.length">
                    <div  class="body-left">
                            <ul>
                                <li :key="idx"  v-for="(item,idx) in managerList"  :class="[idx == munIdx?'activeNav':'']"  @click="handleClick(idx)">
                                    <a-icon  />{{item.user_name}}
                                </li>
                            </ul>
                    </div>
                    <div class="body-right">
                        <div v-if="!(munIdx===-1)">
                            <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='' v-if="!!type" >
                                <div class="body-title">
                                <p>绑定机器人二维码</p>
                                <P><span>部门信息：{{departmentInfo.name}}</span> <span style="margin-left:60px;">客户经理：{{selectM}}</span></P>
                                </div>
                                <div class="bodoy-right-qr">
                                    <a-tooltip placement="right">
                                        <template slot='title'>
                                            <img :src="departmentInfo.qrcode" alt="" style="width: 350px;height: 350px">
                                        </template>
                                        <img :src="departmentInfo.qrcode" alt="" style="width: 300px;height: 300px">
                                    </a-tooltip>
                                </div>
                                <div class="body-right-text" style="background: #f0f2f5;color: rgb(0, 121, 254);font-size: 12px;line-height: 1.8;">
                                    <div class="text-cont">
                                    <p>功能：用于绑定微信机器人，实现系统受控，进行后续功能操作</p>
                                    <p>
                                        操作：1、打开手机端APP，猎鲸软件</br></br>
                                        &emsp;&emsp;&emsp;2、登录微信后，点击猎鲸设置，打开扫一扫</br></br>
                                        &emsp;&emsp;&emsp;3、确认部门信息及所选择的客户经理信息后，点击授权绑定即可（已绑终端可选择更改授权，或者取消）
                                    </p>
                                    </div>
                                </div>
                            </a-form-item>
                        </div>
                        <div v-else>
                            <div style="    position: absolute;top: 30px;left: 10%;width: 80%;height: 300px;">
                                <img src="../../assets/defriend.svg" alt="" style="width: 214px;margin: 100px auto;display: block;">
                                <div  class="picdefriend">
                                    点击左侧列表：选择需要绑定的客户经理
                                </div>
                            </div>
                        </div>
                    </div>
                    <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false" class="clr">
                        <div style="width: 100%;text-align: right;" > 
                                <a-button @click="back" style="margin-right: 10px">返回</a-button>
                                <a-button  type='primary' htmlType='submit' style="margin-left: 10px;display:inline-block;" v-if="!type">保存</a-button>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div v-if="!type" class="minbody">
            <div class="minbody-title">{{title}}</div>
            <a-form  @submit.prevent="handleSubmit" :form="form" class="content-body">
                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='所属部门' v-if="!!type">
                    <span style="margin-left: 20px">{{departmentInfo.name}}</span>
                </a-form-item>
                <a-form-item label="客户经理" :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" v-if="!!this.type">
                   <a-select v-model="selectManage" @change="managerChange"  style="width: 150px;"  placeholder='选择客户经理'>
                        <a-select-option  v-for="(item,idx) in managerList" :key="item.id">
                                {{item.user_name}}
                        </a-select-option>
                    </a-select> 
                </a-form-item>
                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='部门机器人' v-if="!!type">
                    <span v-for="item in departmentInfo.assistant" style="margin-right: 5px;margin-left: 20px">
                        {{item.nickname}}
                    </span>
                </a-form-item>
                  <!-- <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='' v-if="!!type">
                        <div class="body-title">
                        <p>绑定机器人二维码</p>
                        <P><span>部门信息：</span> <span>客户经理：</span></P>
                        </div>
                        <div class="bodoy-right-qr">
                            <a-tooltip placement="right">
                                <template slot='title'>
                                    <img :src="departmentInfo.qrcode" alt="" style="width: 350px;height: 350px">
                                </template>
                                <img :src="departmentInfo.qrcode" alt="" style="width: 300px;height: 300px">
                            </a-tooltip>
                        </div>
                        <div class="body-right-text" style="background: #f0f2f5;color: rgb(0, 121, 254);font-size: 12px;line-height: 1.8;">
                            <p>功能：用于实现所属部门下新增机器人</p>
                            <p>
                                操作：1、在猎鲸APP中打开“猎鲸设置”</br>
                                &emsp;&emsp;&emsp;2、点击扫一扫，进入部门详情页，及机器人相关操作</br>
                                &emsp;&emsp;&emsp;3、确认部门信息后，点击授权绑定即可（已绑终端可选择更改授权，或者取消）
                            </p>
                        </div>
                    </a-form-item> -->
                    <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='部门名称' v-if="!type">
                        <a-input v-model="departmentInfo.name" placeholder='请输入部门名称' style="width: 80%;"  maxlength="25"/>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='上级部门' v-if="!type">
                        <a-select  v-model="departmentInfo.parent_id" placeholder='下拉选择上级部门' style="width: 300px;" :disabled="departmentInfo.parent_id==0">
                            <a-select-option v-for="(item,index) in departmentList" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                <!--<a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='负责人' v-show="!!id" v-if="!type">-->
                    <!--<a-select v-model="departmentInfo.leader_id" placeholder='下拉选择负责人' style="width: 300px;">-->
                        <!--<a-select-option v-for="(item,index) in leaderList" :key="item.id">-->
                            <!--{{item.user_name}}-->
                        <!--</a-select-option>-->
                    <!--</a-select>-->
                <!--</a-form-item>-->
                     <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false" class="clr">
                    <div style="width: 100%;text-align: right;" > 
                         <a-button @click="back" style="margin-right: 10px">返回</a-button>
                            <a-button  type='primary' htmlType='submit' style="margin-left: 10px;display:inline-block;" v-if="!type">保存</a-button>
                        </div>
                    </a-form-item>
                </a-form>
        </div>
    </div>
</template>
<script>
    var storage = require('../../common/store')
    import dataStatus from '../../components/pageConfig/dataStatus'
    export default {
        name: "",
        components:{
            dataStatus
        }
        ,data(){
            return{
                 selectedKeys: [],
                form: this.$form.createForm(this),
                id:this.$route.query.id,
                type:this.$route.query.type,
                managerList:[],
                title:'修改用户',
                departmentInfo:{},
                departmentList:[],
                leaderList:[],
                robotList:[],
                selectRobot:[],
                clientManager:[],
                selectManage:'',
                selectM:'',
                munIdx:-1
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            handleClick (idx) {
                this.munIdx = idx;
                this.selectManage = this.managerList[idx].id;
                this.selectM = this.managerList[idx].user_name;
                this.getQrcode()
            },
            back() {
                this.$router.push({path: '/groupManage/departmentManage'});
            },
            goCrate(){
                 this.$router.push({path: '/groupManage/userManage'});
            },
            managerChange(value){
                
            },
            getDepartment() {
                
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-dist-department',
                    data:{
                        department_id:!!this.id?this.departmentInfo.id:this.$store.state.user.user.department.id,
                        type: !!this.id?'1':'2'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data.departmentList
                    }
                });
            },
            getLeader() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/user',
                    data:{
                        department_id:this.departmentInfo.id,
                        type:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.leaderList = udata.data.userList
                    }
                });
            },
            getRobot() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/assistant-list',
                    data:{
                        department_id:this.departmentInfo.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.robotList = udata.data
                    }
                });
            },
            getQrcode() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department-details',
                    data:{
                        department_id:storage.store.get('editDepartment').id,
                        user_id:this.selectManage
                    }
                }).then(res=> {
                    let udata = res.data
                    console.log(udata)
                    if (udata.status == 1) {
                        this.departmentInfo = udata.data
                    }
                });
            },
            handleSubmit() {
                let url = ''
                let title = ''
                let data = {}
                if(!!this.type) {
//                    url = '/index.php?r=/uc/organization/set-department-ass'
//                    title='设置机器人成功'
//                    data= {
//                        department_id:this.departmentInfo.id,
//                        robot:this.selectRobot
//                    }
                    this.back()
                } else {
                    if(!!this.id) {
//                    修改
                        url = '/index.php?r=uc/organization/department-update'
                        title='修改部门成功'
                    } else {
//                    新建
                        url = '/index.php?r=uc/organization/department-add'
                        title='新建部门成功'
                    }
//                    this.leaderList.forEach(el=>{
//                        if(el.id==this.departmentInfo.leader_id) {
//                            this.departmentInfo.leader = el.user_name
//                        }
//                    })
                    data = this.departmentInfo
                    this.$axios({
                        method: 'POST',
                        url: url,
                        data:data
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success(title)
                            this.back()
                        }
                    });
                }


            },
            mangerLabelChange(value){
                this.clientManager = value
            },
            handleLabelChange(value){
                this.selectRobot = value
            },
            getUser() {
                console.log(this.departmentInfo.id)
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/user',
                    data:{
                        department_id:this.departmentInfo.id,
                        type:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.managerList = udata.data.userList
                        if(this.managerList.length!=0) {
                            // this.selectManage = this.managerList[0].id
                            // this.selectM =  this.managerList[0].user_name
                            // this.getQrcode()
                        }else {
                            this.$message.warning('当前部门无客户经理')
                        }
                    }
                });
            }
        },
        created(){
            if(!!this.type) {
                this.title = '设置机器人'
                this.departmentInfo = storage.store.get('editDepartment')
                this.getUser()
            } else {
                if(!!this.id) {
                    this.title = '修改部门'
                    this.departmentInfo = storage.store.get('editDepartment')
                    this.departmentInfo.leader_id = this.departmentInfo.leader_id==0?'':this.departmentInfo.leader_id
                } else {
                    this.title = '添加部门'
                }
                this.getDepartment()
//                this.getLeader()
            }
        },
        destroyed() {
            // storage.store.remove('editDepartment');
        }
    }
</script>
