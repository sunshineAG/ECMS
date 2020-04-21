<style lang="less" scoped>
    .customer-unique{
       
    }
    .unique-content-left{
        width:220px;
        float: left;
        height:calc(~"100vh - 182px");
        overflow:hidden;
    }
    .unique-content-right{
        background:#fff;
        height: calc(~"100vh - 182px");
        width: calc(~"100% - 220px");
        margin-top: 10px;
        float:left;
         position: relative;
    }
    .searchNav{
        background:#fff;
        height: 60px;
        line-height: 60px;
        padding: 14px 20px;
    }
    .searchNav::after{
        display:block;
        content:'';
        height:0;
        visibility: hidden;
        clear:both;
    }
    .searchInput{
        width:300px;
        float:left;
    }
    .upload{
        float:right;
    }
    
    .leftTitle{
        width:210px;
        padding-left:20px;
        height:58px;
        line-height:58px;
        vertical-align: middle;
        background:#101010;
        color:#fff;
        margin-top:10px;
        .avatar{
            font-size:18px;
            text-align:center;
            vertical-align: middle;
            margin-right:10px;
            width:30px;
            height:30px;
            line-height:30px;
            border-radius:30px;
            border:1px solid #fff;
        }
        .titleText{
            vertical-align: middle;
        }
    }
    .custmorList{
        width:210px;
        background:#f9f9f9;
        max-height:700px;
        position:relative;
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(~"100vh - 280px");
        .custmorIndex{
            height:54px;
            line-height:54px;
            padding:6px;
            cursor: pointer;
            .custmorAvatar{
                margin-right:12px;
                width:40px;
                height:40px;
                border-radius:3px;
                float:left;
            }
            .custmorInfo{
                float:left;
                width:120px;
                p{
                    font-size:12px;
                    height:20px;
                    margin:0;
                    padding:0;
                    line-height:20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
           
             &:hover{
                background:#f0f0f0;
            }
            &::after{
                display:block;
                height:0;
                content:'';
                clear:both;
                visibility: hidden;
            }
        }
        .custmorIndex-active{
            position: relative;
            background:#bfbfbf;
            color:#fff;
            // &::before{
            //     display:block;
            //     content:'';
            //     border-width:10px 10px 10px 10px;
            //     border-style:solid;
            //     border-color:transparent transparent transparent #bfbfbf;
            //     /* 定位 */
            //     position:absolute;
            //     right: -19px;
            //     top: 20px;
            // }
            &:hover{
                  background:#bfbfbf;
            }
        }
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    .customrPage{
        background:#fff;
        // padding-top:10px;
        width:210px;
        /*height:40px;*/
        line-height:40px;
        // text-align:center;
        position: absolute;
        white-space:nowrap;
        overflow-x: auto;
        overflow-y: inherit;
    }

     .label{
        border:1px dashed #2686d4;
        border-radius:10px;
        width:60px;
        font-size:12px;
        padding:2px 6px;
        cursor: pointer;
    }
    .bottomPage{
    	width: 100%;
		background:#ffffff;
		height:50px;
		padding:8px 34px 0 0;
    }
    .bottomPage::after{
        display: block;
        clear:both;
        height:0;
        content:'';
        visibility: hidden;
    }
</style>
<style>
    /*.unique-content-right .ant-checkbox + span,.unique-content-right .ant-checkbox-wrapper + span{*/
        /*padding-left:0;*/
    /*}*/
    .searchNav .ant-input-suffix{
        padding:0;
    }
    /*.unique-content-right .ant-tabs-bar {*/
		/*border-bottom: 10px solid #f0f2f5;*/
		/*margin-bottom: 0;*/
	/*}*/
	/*.unique-content-right .ant-table-body{*/
		/*padding-top: 42px;*/
    	/*!* padding-bottom: 50px; *!*/
	/*}*/
	/*.unique-content-right .ant-table-header{*/
		/*overflow-y: hidden !important;*/
		/*overflow-x:hidden !important;*/
		/*position: absolute;*/
		/*margin-bottom: -10px;*/
		/*padding-bottom: 0px;*/
		/*top: 0;*/
		/*width: 100%;*/
		/*height: 42px;*/
		/*z-index: 9;*/
		/*background:rgba(242,242,242,.7);*/
	/*}*/
	/*.unique-content-right .ant-table-thead > tr > th {*/
		/*background:none;*/
        /*border-bottom:none;*/
	/*}*/
    /*.unique-content-right .ant-table-thead > tr > th,.customer-list .ant-table-tbody > tr > td {*/
        /*padding: 10px;*/
    /*}*/
    .bg-row-gray{
        background:#f2f2f2;
    }
</style>
<template>
    <div class="customer-unique">
        <div class="searchNav">
            <a-input-search placeholder='请输入需要查询的微信昵称/备注名' v-model="queryForm.searchName"  maxlength="15" enterButton @search="searchName" class="searchInput"></a-input-search>
            <a-button type="primary" class="upload" @click="refresh">刷新</a-button>
        </div>
        <div class="uniqueContent">
            <div class="unique-content-left">
                    <div class="leftTitle">
                        <a-icon type="team" class="avatar" ></a-icon>
                        <span class="titleText">重复客户（重复数）</span>
                    </div>
                    <div class="custmorList">
                        <div style="min-hieght:600px;">
                        <!-- <data-status :width="100" :hieght="130" class="stausPage" v-if="!custmorList.length"></data-status> -->
                        <div v-for="(item,index) in custmorList" :key="index" :class="[custmorIndexFlg===index?'custmorIndex custmorIndex-active':'custmorIndex']" @click='getRobotList(index,item)'>
                            <img :src="item.avatar_url" alt="" class="custmorAvatar">
                            <div class="custmorInfo">
                                <p :title="item.nickname">{{item.nickname}}</p>
                                <p>（ {{item.count}} ）</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="customrPage">
                      <span style="padding-left:3px;">共{{listTotal}}个</span>   <a-pagination simple :total="listTotal" @change='changeCustm' size='small' style="width:70px;display:inline-block;vertical-align:middle;"></a-pagination>
                    </div>
            </div>
            <div class="unique-content-right">
                <a-table :columns="columns"  :rowClassName="(record, index) => {return index % 2 === 0 ? '' : 'bg-row-gray'}"  :dataSource="customerList" :pagination="false" :loading='loading'  :locale='locale' v-model='custmPage'  type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id"  :scroll="{y:sheight}" >
                    <template slot="nickname" slot-scope="text, record, index">
                        <div class="tel">
                            <img :src="record.avatar_url" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                            <span>
                               {{text}}
                            </span>
                        </div>
                    </template>
                    <template slot="user_name" slot-scope="text, record, index">
                        <div class="tel">
                            <img :src="record.avatar" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                            <span>
                                {{text}}
                            </span>
                        </div>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <div class="tel">
                        <a-popconfirm title="确定删除吗？" @confirm="deleteUser(record)" >
                            <span style="cursor:pointer;"> 删除</span>
                        </a-popconfirm>
                        </div>
                    </template>
                </a-table>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!customerList.length"></data-status> -->
                <div class="bottomPage" v-if="customerList.length">
                    <span style="vertical-align:middle;">
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                        <a-popconfirm title="确定删除吗？" v-if="selectedRowKeys.length" @confirm="deleteUser()" >
                            <a-button type='primary' style="float:left;margin-left:56px;"> 批量删除 </a-button>
                        </a-popconfirm>
                        <!-- <a-button type='primary' style="float:left;margin-left:56px;" v-else :disabled="selectedRowKeys.length<1?true:false" > 批量删除 </a-button> -->
                        <span style="vertical-align:middle;margin-left:20px;">已选: {{selectedRowKeys.length}} 个 总: {{customerList.length}} 个</span>
                    </span>
                    <!-- <a-pagination v-if="customerList.length" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChangea" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;color:#fff;"/> -->
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
        components:{
            dataStatus
        }
        ,data(){
            return{
                sheight:'calc(100vh - 234px)',
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                checkAll:false,
                loading:false,
                selectedRowKeys:[],
                queryForm:{
                    searchName:''
                },
                custmorIndexFlg:0,
                custmorList:[],
                customerList:[],
                columns:[
                    {
                        title: '所属微信号',
                        dataIndex: 'nickname',
                        width: 150,
                        align:'center',
                        scopedSlots: {
                            customRender: 'nickname'
                        }
                    },
                    {
                        title: '部门',
                        dataIndex: 'name',
                        align:'center',
                        width: 150
                    },
                    {
                        title: '客户经理',
                        dataIndex: 'user_name',
                        width: 250,
                        align:'center',
                        scopedSlots: {
                            customRender: 'user_name'
                        }
                    },
                    {
                        title: '添加好友日期',
                        dataIndex: 'agree_on',
                        width: 250,
                        align:'center',
                    },
                    {
                        title: '上次对话时间',
                        dataIndex: 'last_msg_time',
                        width: 250,
                        align:'center',
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        width: 250,
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                custmPage:1,
                page_size:20,
                page:1,
                total:0,
                listTotal:0,
                listTotalShow:'13',
                userSelect:""
            }
        },
        computed: {
          
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        beforeCreate(){
          
        },
        methods: {
            searchName(){//根据微信昵称查询
                this.refresh();
            },
            getRobotList(index,item){
                console.log(item)
                this.userSelect = item.username;
                this.total = parseInt(item.count)
                this.customerList = item.assistant;
                this.selectedRowKeys = [];
                this.custmorIndexFlg = index;
                this.checkAll  = false;
            },
            deleteUser(item){//删除
            let that = this;
                if(item){
                    this.checkAll = false;
                    this.selectedRowKeys = [];
                    this.selectedRowKeys.push(item.id);
                    this.deletFn(this.userSelect,item.username,true);
                }else{
                    this.customerList.forEach(el=>{
                        this.selectedRowKeys.forEach((item,idx)=>{
                            if(el.id === item){
                                ++idx;
                                that.deletFn(this.userSelect,el.username,idx === this.customerList.length ?true:false)
                            }
                        })
                    })
                }
                
            },
            deletFn(selectUser,username,bool){
                comConf.isOfflineRobot(username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2047,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:username,
                    cmdData:{
                        username:selectUser,
                    }
                }
                this.$ws.sendMsgFun(data)
                if(bool){
                    this.$ws.cmd2047 = msg=>{
                        if(msg.status==4) {
                          this.checkAll = false;  
                          this.refresh(selectUser);
                          this.$message.info('删除成功',2);
                        }else if(msg.status==3){
                            this.$message.warning(msg.callbackMsg,2);
                            this.refresh(selectUser);
                        }else if(msg.status!=1){
                            this.$message.warning(msg.callbackMsg,2);
                            this.refresh(selectUser);
                        }
                    }
                    this.checkAll = false;
                   
                    this.selectedRowKeys = [];
                }
            },
            checkedAll(){
                 if(!this.checkAll){
                    this.selectedRowKeys = [];
                    this.customerList.forEach(el=>{
                        this.selectedRowKeys.push(el.id)    
                    })
                }else{
                    this.selectedRowKeys = [];
                }
                this.checkAll = !this.checkAll;
            },
            changeCustm(page){  
                this.custmPage = page
                this.refresh();
            },
            onSelectChange(selectedRowKeys){
               this.selectedRowKeys = selectedRowKeys
               selectedRowKeys.length<this.customerList.length? this.checkAll = false:this.checkAll = true;
            },
            onChangea(page,pageSize){
                this.page = page
                this.page_size = pageSize
                this.selectedRowKeys = [];

            },
            onShowSizeChange(current, size){
                this.page = 1
                this.page_size = size
                this.selectedRowKeys = [];
            },
            refresh(assistant){
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/re-check',
                    data:{
                       p:this.custmPage,
                       n:10,
                       search:this.queryForm.searchName
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        let that = this;
                        // this.listTotalShow = udata.data.count;
                        this.custmorList = udata.data.list;
                        this.listTotal = parseInt(udata.data.count);
                        this.customerList = []
                        if(!assistant&&this.custmorList.length){
                            this.customerList = this.custmorList[0].assistant   
                            this.userSelect = this.custmorList[0].username
                        }else{
                            this.customerList = []
                            this.custmorList.forEach(el=>{
                                if(el.username === assistant){
                                    that.customerList  = el.assistant;
                                }
                            })
                        }
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
            this.refresh()
        },
        beforeDestroy() {
            window.removeEventListener('resize')
        }
    }
</script>
