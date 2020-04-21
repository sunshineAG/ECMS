<style lang="less" scoped>
    .permission-manage {
        background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding:0 20px ;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f0f2f5;
            .add-user {
                // padding-top:14px;
                float: right;
            }
        }
        .content {
            padding: 20px;
            position:relative;
        }
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
</style>
<template>
    <div class="permission-manage">
        <div class="header">
            <a-input-search placeholder="请输入要查询的角色名称" style="width:300px; margin-top: 14px;" v-model="searchKey" enterButton  @search="handleSubmit"></a-input-search>
            <div class="add-user">
                <a-button   type="primary" @click="add">新建</a-button>
            </div>
        </div>
        <div class="content">
            <a-table :columns="columns" :dataSource="permissionList" :pagination="false"  :locale="locale">
                <!--<template slot="user" slot-scope='text,record,index'>-->
                    <!--<div>-->
                        <!--<div style="display:inline-block;margin:0 10px 2px 0;vertical-align:middle;" v-for="(item,index) in text" :key="index" v-if='index<10'>-->
                            <!--<img :src="item.avatar" alt="" style="width:20px;height:20px;border-radius:100%;">-->
                            <!--<span style="vertical-align:middle;">{{item.user_name}}</span>-->
                        <!--</div>-->
                        <!--<span v-if="text.length>10">...</span>-->
                    <!--</div>-->
                <!--</template>-->
                <template slot="action" slot-scope="text, record, index">
                    <div style="">
                        <!-- <a href="javascript:void(0);" @click="edit(record)" style="padding-right: 15px;">编辑</a> -->
                        <span v-if="record.type=='0'">---</span>
                        <a href="javascript:void(0);" @click="assignPermission(record.role_id)" style="" v-if="record.type!='0'">编辑</a>
                        <a href="javascript:void(0);" @click="del(record.role_id)" style="padding-left: 15px;" v-if="record.type=='2'">删除</a>
                    </div>
                </template>
            </a-table>
            <br>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!permissionList.length" ></data-status> -->
            <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-if="permissionList.length"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
            <br>
        </div>
    </div>
</template>
<script>
    var storage = require('../../common/store')
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'	
    export default {
        name: "",
        components: {
            dataStatus
		}
        ,data(){
            return{
                page:1,
                page_size:10,
                total:0,
                permissionList:[],
                searchKey:'',
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                columns:[
                    {
                        title: '角色名称',
                        align:'left',
                        dataIndex: 'name'
                    },
//                    {
//                        title: '用户列表',
//                        align:'left',
//                        dataIndex: 'user',
//                        scopedSlots: {
//                            customRender: 'user'
//                        }
//                    },
                    {
                        title: '操作',
                        width:200,
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ]
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            handleSubmit(){
                this.page = 1
                this.page_size = 10
                this.getPermission()
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getPermission()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getPermission()
            },
            getPermission() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        p:this.page,
                        n:this.page_size,
                        search_role_name:this.searchKey
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.permissionList = udata.data.list
                        this.total = parseInt(udata.data.count)
//                        if(udata.data.length==0&&this.page>1) {
//                            this.page -= 1
//                            this.getPermission()
//                        }
                    }
                });
            },
            add() {
                storage.store.remove('editPermission');
                this.$router.push({path:'/groupManage/addPermission'});
            },
            edit(item) {
                storage.store.set('editPermission', item);
                this.$router.push({path:'/groupManage/editPermission',query:{'id':item.id}});
            },
            assignPermission(id) {
                this.$router.push({path:'/groupManage/assignPermission',query:{'id':id}});
            },
            maintainUser(item) {

            },
            del(id) {
                let _this =this
                this.$confirm({
                    title:'确定删除当前角色？',
                    onOk:function () {
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/organization/permission-del',
                            data:{
                                id_arr:id
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                _this.$message.success('删除成功')
                                _this.getPermission()
                            }
                        });
                    }
                })
            }
        },
        created(){
            this.getPermission()
        }
    }
</script>
