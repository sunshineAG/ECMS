<style lang="less" scoped>
    .user-manage {
        background: #ffffff;
        .left-header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f0f2f5;
        }
        .right-header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-left: 2px solid #f0f2f5;
            text-align: left;
            font-size: 14px;
            .add-user {
                margin-top: 14px;
                float: right;
            }
        }
        .left-content {
            padding: 20px;
            overflow-y: auto;
            height: calc(~"100vh - 175px");
        }
        .right-content {
            border-left: 2px solid #f0f2f5;
            padding: 20px;
            overflow-y: auto;
            height: calc(~"100vh - 175px");
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
    <div class="user-manage">
        <a-row>
            <a-col :xl="4" :sm="6">
                <div class="left-header">
                    部门结构
                </div>
                <div class="left-content">
                    <a-tree
                            :treeData="departmentTree"
                            @select="onSelect"
                            :defaultExpandAll="true"
                            :defaultExpandedKeys="expandedKeys"
                    >
                    </a-tree>
                </div>
            </a-col>
            <a-col :xl="20" :sm="18">
                <div class="right-header">
                    <a-input-search  v-model="searchKey" placeholder='请输入编号、真实姓名、用户名搜索' style="width: 300px; margin-top: 14px;"  @search="searchList" enterButton>
                        <!--<a-icon v-show="searchKey" slot="suffix" type="close-circle" style="color: #000000" @click="emitEmpty" />-->
                    </a-input-search>
                    <a-button   class="add-user" type="primary" @click="addUser">新建</a-button>
                </div>
                <div class="right-content">
                    <a-table :columns="columns" :dataSource="userList" :pagination="false" :locale="locale">
                        <template slot="avatar" slot-scope="text, record, index">
                            <div>
                                <img :src="text" @error="imgExists($event)" style="width: 48px;height: 48px;border-radius: 5px">
                            </div>
                        </template>
                        <template slot="action" slot-scope="text, record, index">
                            <div>
                                <a href="javascript:void(0);" @click="edit(record)" style="padding-right: 15px;" >编辑</a>
                                <a href="javascript:void(0);" @click="del(record.id)">删除</a>
                            </div>
                        </template>
                    </a-table>
                    <br>
                     <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!userList.length" ></data-status> -->
                    <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-if="userList.length"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
                    <br>
                </div>
            </a-col>
        </a-row>
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
                savFlg:true,
                searchKey:'',
                selectId:'',
                page:1,
                page_size:10,
                total:0,
                userList:[],
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                columns:[
                    {
                        title: '编号',
                        align:'center',
                        dataIndex: 'id'
                    },
                   {
                        title: '头像',
                        dataIndex: 'avatar',
                        align:'center',
                        scopedSlots: {
                            customRender: 'avatar'
                        }
                   },
                    {
                        title: '用户名',
                        align:'center',
                        dataIndex: 'user_name'
                    },
                    {
                        title: '所属部门',
                        align:'center',
                        dataIndex: 'department'
                    },
                    {
                        title: '所属角色',
                        align:'center',
                        dataIndex: 'role_name'
                    },
                    {
                        title: '登录账号',
                        align:'center',
                        dataIndex: 'tel'
                    },
                    {
                        title: '最后登录',
                        align:'center',
                        dataIndex: 'last_login'
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
                departmentTree:[],
                expandedKeys:[]
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            searchList() {
                this.page = 1
                this.page_size = 10
                this.getUserList(this.selectId)
            },
            emitEmpty() {
                this.page = 1
                this.page_size = 10
                this.searchKey = ''
                this.getUserList(this.selectId)
            },
            getUserList(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/user',
                    data:{
                        department_id:id,
                        searchKey:this.searchKey,
                        p:this.page,
                        n:this.page_size
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.userList = udata.data.userList
                        this.total = parseInt(udata.data.userCount)
                        if(udata.data.userList.length==0&&this.page>1) {
                            this.page -= 1
                            this.getUserList(id)
                        }
                    }
                });
            },
            getDepartment(bool) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-dist-department',
                    data:{
                        department_id:this.$store.state.user.user.department.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        console.log(udata.data.departmentList)
                        this.departmentTree = this.listToTree(udata.data.departmentList)
                        if(bool) {
                            this.selectId = this.departmentTree[0].key
                            this.getUserList(this.departmentTree[0].key)
                        }
                    }
                });
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getUserList(this.selectId)
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getUserList(this.selectId)
            },
            onSelect(selectedKeys, info) {
                console.log(selectedKeys)
                this.selectId = selectedKeys[0]
                this.getUserList(selectedKeys[0])
            },
            listToTree(list) {
//              将部门列表转换为tree所用数据
                let array = []
                list.forEach(el=>{
                    if(el.children && el.children.length > 0) {
                        el.children =this.listToTree(el.children)
                        this.expandedKeys.push(el.id)
                    }
                    array.push({title:el.name,key:el.id,children:el.children})
                })
                return array
            },
            addUser() {
                storage.store.remove('editUser');
                this.$router.push({path:'/groupManage/addUser',query:{'departmentId':this.selectId}});
            },
            edit(item) {
                console.log(item)
                storage.store.set('editUser', item);
                this.$router.push({path:'/groupManage/editUser',query:{'id':item.id}});
            },
            del(id) {
                let _this =this
                this.$confirm({
                    title:'确定删除当前用户？',
                    onOk:function () {
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/organization/user-del',
                            data:{
                                id_arr:[id]
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                _this.$message.success('删除成功')
                                _this.getUserList(_this.selectId)
                                _this.$axios({
                                    method: 'GET',
                                    url: '/index.php?r=uc/user/list',
                                }).then(res=> {
                                    let udata = res.data
                                    if (udata.status == 1) {
                                        _this.$store.commit('user/setUser',udata.data.user)
                                        _this.$store.commit('user/setDepartment',udata.data.department)
                                        _this.$store.commit('user/setManager',udata.data.manager)
                                    }
                                });
                            }
                        });
                    }
                })

            },
            imgExists(e) {
                console.log('imgLoadError')
                let imgUrl = this.$store.state.user.user.default_url;
                let img = new Image();
                //判断图片大小是否大于0 或者 图片高度与宽度都大于0
                img.onload = function() {
                    if(img.filesize>0||(img.width>0&&img.height>0)){
                        e.target.src = imgUrl;
                        img = null
                    }
                }
                img.src=imgUrl;
            }
        },
        created(){
            this.getDepartment(true)
        }
    }
</script>
