<style lang="less" scoped>
    .user-manage {
        // background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f0f2f5;
            background: #ffffff;
            .add-user {
                float: right;
            }
        }
        .content {
            background: #ffffff;
            .nav{
                height:54px;
                line-height:54px;
                background:#DDDDDD;
                text-align:center;
                color:#242424;
                font-weight: bold;
            }
        }
        .contentTitle{
            background: #ffffff;
            margin:10px 0;
            .titleNave{
                background:#DDDDDD;
                height:54px;
                line-height:54px;
                color:#242424;
                font-weight: bold;
            }
            .row{
                    height:54px;
                    line-height:54px;
                    border-bottom:1px solid #f0f0f0;
            }
        }
        .backgroundColr{
            background:#F5F5F5;
        }
    }
    
</style>
<style>
    .user-manage .content .ant-checkbox-group-item {
        margin-bottom: 5px;
        width: 150px;
    }
</style>
<template>
    <div class="user-manage">
        <div class="header clearFloat" >
            <div style="float:left;">
            <span style="color:#242424;font-weight:bold;">角色名称：</span>
            <a-input style="width:200px;" placeholder="请输入角色名称" v-model="keyName"></a-input>
            </div>
            <div class="add-user">
             <a-button @click="back">取消</a-button>
             <a-button  type='primary' @click="saveSelects">保存</a-button>
             </div>
        </div>
        <div class="contentTitle"> 
            <a-row class="titleNave">
                <a-col span="3" align="center">
                    其它
                </a-col>
                <a-col span="21" >
                    <a-row>
                            <a-col span="4" align="center">选择权限</a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row class="row">
                <a-col span="4">
                    <span style="margin-left:30px;">
                    数据查看范围
                    </span>
                </a-col>
                <a-col span="20">
                    <a-checkbox :checked="power.see_superior_power==='1'?true:false" @change="changePower('1')">父部门数据</a-checkbox>
                    <a-checkbox :checked="power.see_lower_power==='1'?true:false" @change="changePower('2')">子部门数据</a-checkbox>
                    <a-checkbox :checked="power.see_department_power==='1'?true:false" @change="changePower('3')">所在部门数据</a-checkbox>
                    <a-checkbox :checked='true' :disabled='true'>个人数据</a-checkbox>
                </a-col>
            </a-row>
            <!--<a-row class="row">-->
                <!--<a-col span="4">-->
                    <!--<span style="margin-left:30px;">-->
                    <!--电话号码加密-->
                    <!--</span>-->
                <!--</a-col>-->
                <!--<a-col span="20">-->
                    <!--<a-checkbox :checked="permissionList[permissionList.length-1].list[0].auth===1?true:false" @change="telChange(permissionList[permissionList.length-1].list[0])">-->
                        <!--电话号码加密 (仅显示后四位，其它用*代替)-->
                    <!--</a-checkbox>-->
                <!--</a-col>-->
            <!--</a-row>-->
        </div>
        <div class="content">
            <div>
                <!-- <a-checkbox @change="onChangeAll" :checked="checkedAll" :indeterminate="allIndeterminate" style="margin-bottom: 30px">全选</a-checkbox> -->
                <div >
                <a-row  class="nav">
                    <a-col span='3'>
                        一级菜单
                    </a-col>
                    <a-col span='21'>
                        <a-row>
                            <a-col span="4">二级菜单</a-col>
                            <a-col span="20">功能模块</a-col>
                        </a-row>
                    </a-col>
                </a-row>
                </div>
                <div v-for="(item,index) in permissionList" :key="index" style="border-bottom:1px solid #f0f0f0;" class="clearFloat">
                    <div>
                        <a-row>
                            <a-col span="3">
                                <div style="width:100px;margin:10px 0 10px 30px;">
                                    <a-checkbox :checked="item.auth===1?true:false" @change="getSelectsKey(item)">{{item.name}}</a-checkbox>
                                </div>
                            </a-col>
                            <a-col span="21"  >
                                <a-row v-for="(items,idx) in  item.list" :key="idx"  style="border-left:1px solid #f0f0f0;border-right:1px solid #f0f0f0;" >
                                    <a-col span="4" style="padding-left:10px" >
                                        <div style="margin:10px 0 10px 20px;">
                                            <a-checkbox :checked="items.auth===1?true:false" @change='changeSelect(items,item)'>{{items.name}}</a-checkbox>
                                        </div>
                                    </a-col>
                                    <a-col span="20" style="border-left:1px solid #f0f0f0;padding-left:10px;" > 
                                        <div  v-for="(el,num) in items.list" :key="num" style="margin-right:20px;display:inline-block;padding:10px 0;"  >
                                            <div>
                                                <a-checkbox :value="el.id" :checked="el.auth===1?true:false" @change="selectCheck(el,item,items)">{{el.name}}</a-checkbox>
                                            </div>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                    </div>
                    <!-- <a-checkbox
                            :indeterminate="item.indeterminate"
                            @change="onCheckAllChange($event,item,index)"
                            :checked="item.checked"
                            style="display: block;margin-bottom: 5px;font-weight: 700"
                    >
                        {{item.name}}：
                    </a-checkbox>
                    <a-checkbox-group :options="item.list" v-model="item.checkedList" @change="onChange(item,index)"/> -->
                </div>
            </div>
            <!-- <div style="text-align: center">
                <a-button @click="back" style="margin-right: 10px">返回</a-button>
                <a-button @click="saveSelects" type='primary' style="margin-left: 10px">保存</a-button>
            </div> -->
        </div>
    </div>
</template>
<script>
    var storage = require('../../common/store')
    export default {
        name: ""
        ,data(){
            return{
                role_id:this.$route.query.id,
                title:'分配权限',
                permissionList:[],
                power:{},
                selectsKey:[],
                idArray:[],
                keyName:'',
                checkedAll:false,
                allIndeterminate:false
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            telChange(val){
                if(val.auth===1){
                    this.$set(val,'auth',0)
                }else{
                    this.$set(val,'auth',1)
                }
            },
            changePower(val){
                if(val==='1'){
                    this.power.see_superior_power==='1'?this.power.see_superior_power='0':this.power.see_superior_power = '1'; 
                }else if(val==='2'){
                    this.power.see_lower_power==='1'?this.power.see_lower_power='0':this.power.see_lower_power = '1';
                }else{
                    this.power.see_department_power==='1'?this.power.see_department_power='0':this.power.see_department_power = '1';
                }
            },
            getSelectsKey(item){
                let that = this;
                if(item.auth===1){
                    this.$set(item,'auth',0)
                    item.list.forEach(el=>{
                        el.auth = 0;
                         el.list&&el.list.forEach(val=>{
                            val.auth= 0;
                        })
                    })
                }else{
                    this.$set(item,'auth',1)
                    item.list.forEach(el=>{
                        el.auth = 1;
                        el.list&&el.list.forEach(val=>{
                            val.auth= 1;
                        })
                    })
                }
            },
            changeSelect(val,item){
                if(val.auth===1){
                    this.$set(val,'auth',0)
                    val.list.forEach(el=>{
                        el.auth = 0;
                    })
                }else{
                    this.$set(val,'auth',1)
                     this.$set(item,'auth',1)
                    val.list.forEach(el=>{
                        el.auth = 1;
                    })
                }
            },
            selectCheck(el,item,items){
                if(el.auth===1){
                  this.$set(el,'auth',0)  
                }else{
                    this.$set(el,'auth',1)  
                    this.$set(items,'auth',1)  
                    this.$set(item,'auth',1)  
                }
            },
            saveSelects(){
                let that = this;
                this.idArray = []
                if(!this.keyName){
                    return this.$message.warn('角色名称不能为空')
                }
                for(var key in this.permissionList){
                    if(this.permissionList[key].auth===1){
                        this.idArray.push(this.permissionList[key].id)
                        for(var i in this.permissionList[key].list){
                            if(this.permissionList[key].list[i].auth===1){
                                this.idArray.push(this.permissionList[key].list[i].id)
                                for(var j in this.permissionList[key].list[i].list){
                                    if(this.permissionList[key].list[i].list[j].auth===1){
                                         this.idArray.push(this.permissionList[key].list[i].list[j].id)
                                    }
                                }
                            }
                        }
                    }
                }
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/organization/permission-change',
                    data:{
                        role:Object.assign(this.power,{
                            role_name:this.keyName
                        }),
                        id_arr:this.idArray,
                        role_id:this.role_id
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status===1){
                        this.$message.success('分配成功')
                        this.back()
                    
                    }
                })
            },
            back() {
                this.$router.push({path: '/groupManage/permissionManage'});
            },
            handleSubmit() {
                let name_arr = []
                this.permissionList.forEach(el=>{
                    el.checkedList.forEach(item=>{
                        name_arr.push(item)
                    })
                })
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-change',
                    data:{
                        role_id:this.role_id,
                        name_arr:name_arr
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('分配成功')
                        this.back()
                    }
                });
            },
            getPermission() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-list',
                    data:{role_id:this.role_id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.permissionList = udata.data.permissionList;
                        this.power = udata.data.power;
                        this.keyName = udata.data.power.role_name;
                    }
                });
            },
            dataTrans(list) {
                let arr = []
                list.forEach(el=>{
                    let flag = 0
                    el.checkedList = []
                    el.list.forEach(item=>{
                        if(item.auth==1) {
                            flag +=1
                            el.checkedList.push(item.name)
                        }
                        item.label = item.description
                        item.value = item.name
                    })
                    if(flag == el.list.length) {
                        el.checked = true
                    }else {
                        el.checked = false
                    }
                    if(!!flag && (flag < el.list.length)) {
                        el.indeterminate = true
                    } else {
                        el.indeterminate = false
                    }
                })
                arr = list
                return arr
            },
            onChange (item,index) {
                item.indeterminate = !!item.checkedList.length && (item.checkedList.length < item.list.length)
                item.checked = item.checkedList.length === item.list.length
                this.getAllChecked(false)
            },
            onCheckAllChange (e,item,index) {
                item.checked = !item.checked
                item.indeterminate = false
                item.checkedList =[]
                if(item.checked) {
                    item.list.forEach(el=>{
                        item.checkedList.push(el.name)
                    })
                } else {
                    item.checkedList =[]
                }
                this.getAllChecked(false)
            },
            onChangeAll(e) {
                this.checkedAll = e.target.checked
                this.allIndeterminate = false
                if(e.target.checked) {
//                    全选
                    this.permissionList.forEach(el=>{
                        el.checkedList = []
                        el.list.forEach(el1=>{
                            el.checkedList.push(el1.name)
                        })
                        el.checked = true
                    })
                } else {
//                    取消全选
                    this.permissionList.forEach(el=>{
                        el.indeterminate = false
                        el.checked = false
                        el.checkedList = []
                    })
                }
            },
            getAllChecked(init) {
                if(init) {
                    let flag = false
                    let flag1 = false
                    this.permissionList.forEach(el=>{
                        el.list.forEach(item=>{
                            if(item.auth==0) {
                                flag = true
                            }
                            if(item.auth==1) {
                                flag1 = true
                            }
                        })
                    })
                    if(flag&&flag1) {
                        this.checkedAll = false
                        this.allIndeterminate = true
                    } else if(flag&&!flag1) {
                        this.checkedAll = false
                        this.allIndeterminate = false
                    } else if(!flag&&flag1||!flag1&&flag) {
                        this.checkedAll = true
                        this.allIndeterminate = false
                    }
                }else {
                    let flag = 0
                    let flag1 = 0
                    let flag2 = 0
                    this.permissionList.forEach(el=>{
                        if(el.checkedList.length === el.list.length) {
                            flag += 1
                        } else if(el.checkedList.length== 0) {
                            flag1 += 1
                        } else {
                            flag2 += 1
                        }
                    })
                    if(flag == this.permissionList.length) {
                        this.checkedAll = true
                        this.allIndeterminate = false
                    } else if(flag1==this.permissionList.length) {
                        this.checkedAll = false
                        this.allIndeterminate = false
                    } else {
                        this.checkedAll = true
                        this.allIndeterminate = true
                    }

                }

            }
        },
        created(){
            this.getPermission()
        },
        destroyed() {

        }
    }
</script>
