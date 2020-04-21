<style lang="less" scoped>
    .department-manage {
        background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            
            .add-user {
                margin-top: 14px;
                float: right;
            }
        }
        .content {
            padding: 20px;
            position:relative;
            // width:900px;
        }
        @media screen and (max-width: 1300px) {
         .content {
            padding: 20px;
            position:relative;
            width:900px;
            }   
        }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding:6px;
    }
     .left-content {
            padding: 20px;
            overflow-y: auto;
            height: calc(~"100vh - 175px");
            border-right:2px solid #eee;
        }
        .left-header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-right:2px solid #eee;
            border-bottom: 2px solid #f0f2f5;
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
    <div class="department-manage">
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
                            :expandedKeys="expandedKeys"
                            @expand="onExpand"
                    >
                    </a-tree>
                </div>
            </a-col>
            <a-col :xl="20" :sm="18">
                     <div class="header">
            <a-input-search v-model="searchKey" placeholder='请输入负责人、部门、机器人名称搜索' style="width: 300px; margin-top: 14px;"  @search="searchList" enterButton>
                <!--<a-icon v-show="searchKey" slot="suffix" type="close-circle" style="color: #000000" @click="emitEmpty" />-->
            </a-input-search>
            <a-button   class="add-user" type="primary" @click="addDepartment">新建</a-button>
            <!--<a-button class="add-user"  @click="delSelect" style="margin-right: 10px">删除</a-button>-->
        </div>
        <div class="content">
            <a-table :columns="columns" :dataSource="departmentList" :locale="locale" :pagination="false" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id" style="min-height:700px;">
                <template slot="assistant" slot-scope="text, record, index">
                    <div style="position: relative;max-width:400px;">
                        <div v-for="(item,idx) in text" style="text-overflow: ellipsis;overflow:hidden; white-space:nowrap;display: inline-block;vertical-align: bottom">
                           <span v-if="idx>5?false:true">
                                [{{item.mobile_serial_name}}]{{item.nickname}}
                           </span>
                        </div>
                        <a v-if="text.length>0" style="position: absolute;right: -30px;top: 50%;transform: translateY(-50%)" href="javascript:void(0);" @click="showRobotModal(record)">详细</a>
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div style="">
                        <!--<a href="javascript:void(0);" @click="setRobot(record)" style="padding-right: 15px;">新增机器人</a>-->
                        <a href="javascript:void(0);" @click="edit(record)" style="padding-right: 15px;">编辑</a>
                        <a href="javascript:void(0);" @click="del(record.id)">删除</a>
                    </div>
                </template>
            </a-table>
            <br>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!departmentList.length" ></data-status> -->
            <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-if="departmentList.length"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
            <br>
        </div>
            </a-col>
        </a-row>
       
        <a-modal
                title="设备编号"
                :footer="null"
                :visible="robotModal"
                @cancel="robotModal=false"
                :bodyStyle="{
                    maxHeight:'500px',
                    overflowY:'auto'
                }"
        >
            <div class="">
                <a-form>
                    <a-form-item :colon="true" :labelCol="{span:4}" :wrapperCol="{span:20}" label="部门名称:">
                        <span>{{selectDepartment.name}}</span>
                    </a-form-item>
                    <a-form-item :colon="true" :labelCol="{span:4}" :wrapperCol="{span:20}" label="设备编号:">
                        <span v-for="item in selectDepartment.assistant" style="margin-right: 5px">
                            [{{item.mobile_serial_name}}]{{item.nickname}}
                        </span>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>

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
                searchKey:'',
                page:1,
                page_size:10,
                selectId:'',
                total:0,
                departmentList:[],
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                columns:[
                    {
                        title: '部门名称',
                        align:'center',
                        dataIndex: 'name'
                    },
                    {
                        title: '设备编号',
                        align:'center',
                        dataIndex: 'assistant',
                        scopedSlots: {
                            customRender: 'assistant'
                        }
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
                selectedRowKeys:[],
                robotModal:false,
                selectDepartment:{},
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
                this.getDepartment(this.selectId)
            },
            emitEmpty() {
                this.page = 1
                this.page_size = 10
                this.searchKey = ''
                this.getDepartment(this.selectId)
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getDepartment(this.selectId)
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getDepartment(this.selectId)
            },
            getDepartmentTree(bool) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-dist-department',
                    data:{
                        department_id:this.$store.state.user.user.department.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentTree = this.listToTree(udata.data.departmentList)
                        if(bool) {
                            this.selectId = this.departmentTree[0].key
                            this.getDepartment(this.departmentTree[0].key)
                        }
                    }
                });
            },
             onSelect(selectedKeys, info) {
                this.selectId = selectedKeys[0]
                this.getDepartment(selectedKeys[0])
            
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
            getDepartment(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department',
                    data:{
                        department_id:id,
                        searchKey:this.searchKey,
                        p:this.page,
                        n:this.page_size
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data.departmentList
                        this.total = parseInt(udata.data.departmentCount)
                        if(udata.data.departmentList.length==0&&this.page>1) {
                            this.page -= 1
                            this.getDepartment(id)
                        }
                    }
                });
            },
            setRobot(item) {
                console.log(item)
                storage.store.set('editDepartment', item);
                this.$router.push({path:'/groupManage/setRobot',query:{'type':'1'}});
            },
            addDepartment() {
                storage.store.remove('editDepartment');
                this.$router.push({path:'/groupManage/addDepartment'});
            },
            edit(item) {
                storage.store.set('editDepartment', item);
                this.$router.push({path:'/groupManage/editDepartment',query:{'id':item.id}});
            },
            del(id) {
                let _this =this
                this.$confirm({
                    title:'确定删除当前部门？',
                    content:'部门删除之后，角色会和被删除部门解绑,是否确定',
                    onOk:function () {
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/organization/department-del',
                            data:{
                                id_arr:[id]
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                _this.$message.success('删除成功')
                                _this.getDepartment(_this.selectId)
                            }
                        });
                    }
                })
            },
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys
            },
            delSelect() {
                if(this.selectedRowKeys.length==0) {
                    this.$message.warning('请选择需要删除的部门')
                    return
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department-del',
                    data:{
                        id_arr:this.selectedRowKeys
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('删除成功')
                        this.getDepartment()
                    }
                });
            },
            showRobotModal(record) {
                this.selectDepartment = record
                this.robotModal = true
            },
            onExpand(expandedKeys) {
                this.expandedKeys = expandedKeys
            }
        },
        created(){
            // this.getDepartment();
            this.getDepartmentTree(true);
        }
    }
</script>
