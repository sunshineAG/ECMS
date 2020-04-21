<style lang="less" scoped>
    .collection-list{
        background: #ffffff;
        position: relative;
        padding:0 14px;
        border-radius:3px;
        height: calc(~"100vh - 90px");
        .header {
            padding: 12px 0;
            line-height: 60px;
            .add-user {
                margin-top: 14px;
                float: right;
            }
        }
        .content {
            position:relative;
            
            .cartPerson{
                vertical-align: middle;
                .avatar{
                    width:20px;
                    height:20px;
                    border-radius:100%;
                }
            }
            .delt{
                cursor: pointer;
            }
            
             .status{
                position:relative;
                background:#F5F5F5;
                height:226px;
                .stausPage{
                    position:absolute;
                    left:50%;
                    top:30px;
                    z-index:999;
                    transform: translate(-60%,0);
                }
            }
            // .botomCheck{
            //     float:left;
            //     vertical-align: middle;
            //     margin-left:42px;
            //     margin-top:6px;
            // }
        }

    }
   
</style>
<style>
</style>
<template>
    <div class="collection-list">
        <div class="header" ref="header">
                <label for="">部门：</label>
                <a-tree-select
                        :treeData="departmentList"
                        :treeDefaultExpandAll="true"
                        v-model="queryParam.department_id"
                        @select="onSelect"
                        style="min-width: 200px;margin-right:10px;"
                >
                </a-tree-select>
            <label for=""> 客户经理：</label>
                <a-select @change="handleLabelChange"  style="width: 200px;" v-model="queryParam.user_id"  placeholder='请选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                    <a-select-option  v-for="(item,idx) in managerList" :key="item.id">
                            {{item.user_name}}
                    </a-select-option>
                </a-select>
            <a-input-search class="add-user" placeholder="请输入需要查询的手机编号" v-model="searchKey" enterButton  @search="searchfn" style="width:300px"></a-input-search>
        </div>
        <div class="content">
            <a-table :columns="columns" red="table" :dataSource="callRecorderList" :class='[heightFlg?"scrollheade":"scrollheader"]' :pagination="false"  :locale="locale" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"   :loading='loading'   type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.assistant_id"  :scroll="{y:sheight}">
           
                <template slot="name" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <img :src="record.user_avatar" alt="" class="avatar">
                        <span class="cartPerson">{{text}}</span>
                    </div>
                </template>
                <template slot="in_num" slot-scope="text,record,index">
                    <span v-if="text==='0'">
                        {{text}}    
                    </span>
                    <a href="javascript:;" v-if="text!='0'" @click="infoWord(record,'1')">{{text}}</a>
                </template>
                <template slot="out_num" slot-scope="text,record,index">
                     <span v-if="text==='0'">
                        {{text}}    
                    </span>
                    <a href="javascript:;" v-if="text!='0'" @click="infoWord(record,'2')" >{{text}}</a>
                </template>
            </a-table>
            <!-- <div class="status" v-if="!callRecorderList.length">
                <data-status :width="200" :hieght="330" class="stausPage" ></data-status>
            </div> -->
              <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="callRecorderList.length" >
                    <span style="vertical-align: middle;" >
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                        <a-popconfirm  title="确定要删除吗？"  @confirm="deleteIdx(false)" v-if="selectedRowKeys.length">
                            <a-button type='primary' v-if="selectedRowKeys.length" style="float:left;margin-left:40px;"  >批量删除</a-button>
                        </a-popconfirm >
                        <span style="vertical-align:middle;margin-left:20px;" v-if="selectedRowKeys.length">已选: {{selectedRowKeys.length}} 个 总: {{callRecorderList.length}} 个</span>
                    </span>
                    <a-pagination v-if="callRecorderList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var comConf = require('../../common/comConfig');
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'
    export default {
        name: "",
        components: {
            dataStatus
        },
        data(){
            return{
                sheight:'',
                searchKey:'',
                queryParam:{
                    department_id: "",
                    user_id:'0'
                },
                departmentList: [],
                loading:false,
                checkAll:false,
                heightFlg:false,
                selectTagFlag:false,
                disableDepartment:true,
                total:0,
                page:1,
                page_size:10,
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                callRecorderList:[],
                selectedRowKeys:[],
                managerList:[],
                columns:[
                      {
                        title: '手机编号',
                        align:'left',
                        width: 100,
                        dataIndex: 'serial_name'
                    },
                    {
                        title: '所属部门',
                        align:'left',
                        width: 100,
                        dataIndex: 'department_name',
                    },
                    {
                        title: '所属客户经理',
                        dataIndex: 'name',
                        align:'left',
                        width: 100,
                        scopedSlots: {
                            customRender: 'name'
                        }
                    },
                    {
                        title: '呼入',
                        dataIndex: 'in_num',
                        width: 100,
                        align:'center',
                        scopedSlots: {
                            customRender: 'in_num'
                        }
                    },
                    {
                        title: '呼出',
                        dataIndex: 'out_num',
                        align:'center',
                        width: 100,
                        scopedSlots: {
                            customRender: 'out_num'
                        }
                    }
                ]
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
             window.addEventListener('resize',this.autoHeight,false)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        beforeCreate(){
          
        },
        watch:{
            callRecorderList:function(){
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
        methods: {
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
            searchfn(){
                this.page = 1;
                this.page_size = 10;
                this.refreshGroup();
            },
            handleLabelChange(value){
                this.$store.state.user.user.department.id===value?this.disableDepartment = true:this.disableDepartment = false;
                this.queryParam.user_id = value
                this.refreshGroup();
            },
            handleTagOk(){//新建

            },
            cancelLabel(){//取消

            },
            checkedAll(){
                if(!this.checkAll){
                    this.selectedRowKeys = [];
                    this.callRecorderList.forEach(el=>{
                        this.selectedRowKeys.push(el.assistant_id)    
                    })
                }else{
                    this.selectedRowKeys = [];
                }
                this.checkAll = !this.checkAll;
            },
            onSelectChange(selectedRowKeys){
                if(selectedRowKeys.length === this.callRecorderList.length){
                    this.checkAll = true;
                }
                this.selectedRowKeys = selectedRowKeys;
            },
            infoWord(item,val){//触发次数详情
                let vale = val==='1'?'10':'20';
                this.$router.push({path:'/riskManagement/callRecorderDetails',query:{'assistant_id':item.assistant_id,'type':vale,'serial_name':item.serial_name}});
            },
            deleteIdx(item,bool){//删除当前敏感词

            },
               onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.selectedRowKeys = [];
                this.refreshGroup()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.selectedRowKeys = [];
                this.refreshGroup()
            },
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
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
            onSelect(selectedKeys, info) {
                this.$store.state.user.user.department.id === selectedKeys ? this.disableDepartment = true:this.disableDepartment = false;
                this.queryParam.department_id = selectedKeys
                this.getUserList(selectedKeys)
            },
            getUserList(){
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/organization/user',
                    data:{department_id:this.queryParam.department_id,type:1}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.managerList = udata.data.userList
                            let user_id = ''
                            this.managerList.forEach(el=>{
                                if(el.id === this.$store.state.user.user.user_id){
                                     user_id = this.$store.state.user.user.user_id;
                                }
                            })
                        user_id? this.queryParam.user_id = user_id: this.managerList[0]&&this.managerList[0].id?this.queryParam.user_id = this.managerList[0].id:(this.managerList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.queryParam.user_id = '0')
                        this.refreshGroup()
                    }
                })
            },
            refreshGroup(){
                //searchKey
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/risk/voice-record',
                    data:{
                        user_id:this.queryParam.user_id,
                        serial_name:this.searchKey,
                        p:this.page,
                        n:this.page_size
                    }
                }).then(res=>{
                    let udata = res.data
                    if(udata.status===1){
                        console.log(udata)
                        this.total = parseInt(udata.data.count)
                        this.callRecorderList = udata.data.list;
                    }
                })

            },
        },
        created(){
            this.treeList()
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.autoHeight,false)
        }
    }
</script>
