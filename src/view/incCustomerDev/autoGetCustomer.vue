<template>
    <div class="companyStyle">
        <div class='company-header' ref="header">
            <div class="row">
                <span class="floatLeft">
                    <a-input-search class="search-back"   v-model="key" placeholder='关键词搜索'  maxlength="15" enterButton @search="refreshGroup"/>
                    <span>注意（ 仅针对导入客户数据进行加粉，已添加过的客户不在重复添加 ）</span>
                </span>
                <span class="right">
                    <a-button type="primary" @click="selectWechat">选择加粉号</a-button>
                </span>
            </div>
        </div>
        <div class="company-content">
            <a-table ref="table" :columns="columns" :dataSource="customerList"  :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :pagination="false" :loading='loading'  :locale='locale'  :rowKey="(record) => record.id"   :scroll="{y:sheight,x:false}">
                <template slot="avatarInc" slot-scope="text,record,index">
                    <div>
                        <img :src="text?text:require('../../assets/defaluteImg.jpg')" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.name}}
                        </span>
                    </div>
                </template>
                <template slot="status" slot-scope="text,record,index">
                    <div>
                        <a-switch v-model="record.status?true:false"  @change="actionSet(2,record)"/>
                    </div>
                </template>
                <template slot="action" slot-scope="text,record,index">
                    <div>
                        <a-tooltip placement="top" title="加粉设置">
                             <img src="../../assets/auto_set.svg" @error="imgExists($event)" class="actionIcon"  @click="addSet(record)" alt=""  style="padding-right: 14px;">
                         </a-tooltip>
                         <a-tooltip placement="top" title="加粉记录">
                             <img src="../../assets/auto_details.svg" @error="imgExists($event)" class="actionIcon"   @click="addList(record)" style="padding-right: 12px;" alt="" >
                         </a-tooltip> 
                        <a-popconfirm title="确定要移除吗?" @confirm="actionSet(3,record)"  okText="确定" cancelText="取消">
                             <img src="../../assets/auto_delete.svg" alt="" @error="imgExists($event)"  class="actionIcon-delet" >
                        </a-popconfirm>
                    </div>
                </template>
            </a-table>
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="customerList.length" >
                    <a-pagination v-if="customerList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="选择加粉号"
            @cancel="modalCancel"
            :visible="selectFalg"
            @ok='selectOk'
            :bodyStyle="{
                maxHeight:'500px',
                overflowY:'auto'
            }"
        >
            <div v-if="!appKey">
                <p style="text-align:center;color:#FF9800;">当前未授权企业号，无法选择企业员工加粉号！</p>
                <p style="text-align:center"><a-button type="primary" @click="getAppKey">前往授权</a-button></p>
            </div>
            <a-table v-else class="modalTbale" :columns="modalColumns" :dataSource="modalList" :locale="locale"  :pagination="false" type="checkbox"  :rowSelection="{selectedRowKeys: modalSelectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id"  :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}">
                <template slot="avatar" slot-scope="text,record,index">
                     <div>
                        <img :src="text?text:require('../../assets/defaluteImg.jpg')" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.name}}
                        </span>
                    </div>
                </template>
            </a-table>
        </a-modal>
        <a-modal
            title="加粉记录"
            @cancel="modalCancel"
            :visible="modalSelect"
            @ok='selectOk'
            width="768px"
            :bodyStyle="{
                maxHeight:'500px',
                overflowY:'auto'
            }"
        >
            <a-table class="modalTbale" :columns="modalColumnsRmb" :dataSource="modalList" :locale="locale"  :pagination="false"  :rowKey="(record) => record.id"  :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}">
                <template slot="name" slot-scope="text,record,index">
                     <div>
                        <a-avatar :src="record.avatar?record.avatar:'../../assets/defaluteImg.jpg'" :size="30" style="border-radius:100%;"></a-avatar>
                        <span>{{text}}</span>
                    </div>
                </template>
                <template slot="status" slot-scope="text,record,index">
                     <div>
                        <a-badge v-if="text===3" status="default"  text="无数据" class="scope"></a-badge>
                        <a-badge v-else :status="text==0?'default':text=='1'?'warning':text=='2'?'success':''" :text="text==0?'未添加':text=='1'?'已申请':text=='2'?'已添加':''"></a-badge>
                    </div>
                </template>
            </a-table>
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="modalList.length" style="padding-right:0;">
                    <a-button type='primary' style="float:left;margin-left:16px;" @click="pullDown" >导出数据</a-button>
                    <a-pagination  class="col" showQuickJumper showSizeChanger :showTotal="m_total => `总共${m_total}条`"	v-model="m_page" :pageSize="m_page_size" :total="m_total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChangeM" @showSizeChange="onShowSizeChangeM" style="text-align: right;float:right;"/>
                </div>
            </div>
        </a-modal>
        <a-modal
            title="加粉设置"
             width="588px"
            @cancel="modalCancel"
            :visible="setFalg"
            @ok='actionSet(1)'
            :bodyStyle="{
                maxHeight:'500px',
                overflowY:'auto'
            }"
        >
            <div class="setRow">
                <label>验证信息：</label>
                <a-textarea v-model="setParam.sec" :rows="4"  maxlength="100" style="width:404px;vertical-align:text-top;" placeholder="你好这是我的企业微信，以后也可以在这里与我联系。"/>
            </div>
            <div  class="setRow">
                <label class="set-l">加粉上限：</label> 
                <a-slider v-model="setParam.step"  :min="0" :max="200"  style="width: 73%;display: inline-block;margin:0 4px 0 0;" />
                200个/天
            </div>
            <div  class="setRow set-p" >
                提示：建议当天加粉上限不要过大，上限实际数目为实际发送申请数目
            </div>
            <div  class="setRow">
                <label for="">加粉间隔：</label>
                <a-input-number v-model="setParam.time"  :min="5" style="width:88px;" /> min
            </div>
        </a-modal>
    </div>    
</template>
<script>
    var comConf = require('../../common/comConfig');
    import moment from 'moment';
    var storage = require('../../common/store')
    import dataStatus from '../../components/pageConfig/dataStatus'
export default {
    name:'',
    components:{
        dataStatus
    },
    data(){
        return{
            disableDepartment:true,//权限控制
            heightFlg:false,//表格样式控制
            loading:false,
            sheight:'',//表格高度
            selectFalg:false,
            setFalg:false,
            modalSelect:false,
            selectTagFlag:false,
            confirmLoading:false,
            checkAll:false,
            appKey:false,
            addRecord:'',
            page_size:10,
            page:1,
            total:0,
            m_page_size:10,
            m_page:1,
            m_total:0,
            key:'',
            rowUserId:'',
            setParam:{
                sec:'',
                step:0,
                time:5
            },
            locale:{
                filterConfirm:'',
                filterReset:'',
                emptyText:''
            },
            modalSelectedRowKeys:[],//modal中selectRowKey
            departmentList:[],//部门list
            managerList:[],//客户经理
            weChatList:[],//企业号list
            typeList:[],//客户类型
            labelList:[],//标签list
            allLabel:[],//所有标签
            modalList:[],// 选择加粉号和加粉记录
            modalColumns:[
                {
                    title:'企业员工',
                    width: 100,
                    align:'left',
                    dataIndex: 'avatar',
                    scopedSlots: {
                            customRender: 'avatar'
                        }
                },
                {
                    title:'所属部门',
                    width: 100,
                    align:'center',
                    dataIndex: 'department_name',
                }
            ],
            modalColumnsRmb:[
                {
                    title:'手机号',
                    width: 100,
                    align:'left',
                    dataIndex: 'tel',
                },
                {
                    title:'客户信息',
                    width: 100,
                    align:'left',
                    dataIndex: 'name',
                    scopedSlots: {
                            customRender: 'name'
                        }
                },
                {
                    title:'客户类型',
                    width: 100,
                    align:'left',
                    dataIndex: 'type',
                    customRender:(text)=>{
                        return text===1?'企业客户':'个人客户'
                    }
                },
                {
                    title:'加粉状态',
                    width: 100,
                    align:'left',
                    dataIndex: 'status',
                    scopedSlots:{
                        customRender: 'status'
                    }
                }
            ],
            columns:[
                {
                    title: '企业微信',
                    width: 100,
                    align:'left',
                    dataIndex: 'avatar',
                    scopedSlots: {
                        customRender: 'avatarInc'
                    }
                },
                {
                    title: '今日申请数',
                    width: 100,
                    align:'center',
                    dataIndex:'today_apply'
                },
                {
                    title: '累计申请数',
                    width: 100,
                    align:'center',
                    dataIndex:'total_apply'
                },
                {
                    title: '今日添加数',
                    dataIndex: 'today_add',
                    width: 100,
                    align:'center'
                },
                {
                    title: '累计添加数',
                    width: 100,
                    align:'center',
                    dataIndex:'total_add'
                },
                {
                    title: '开启加粉',
                    width: 100,
                    align:'left',
                    dataIndex:'status',
                    scopedSlots: {
                        customRender: 'status'
                    }
                },
                {
                    title: '操作',
                    width: 100,
                    align:'left',
                    scopedSlots: {
                        customRender: 'action'
                    }
                }
            ],
            customerList:[],//表格数据
            selectedRowKeys:[],
            test:''
        }
    },
    mounted(){
        window.addEventListener('resize',this.autoHeight,false)
    },
    computed:{
        
    },
    watch:{
        customerList:function(){
            let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
            let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部 
            this.$nextTick(function(){
                if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                    this.heightFlg = true;
                    this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight - 10;
                }else{
                    this.heightFlg = false;
                }
            });
        },
        test:function(){
            console.log(1)
        },
        'this.$store.state.navPath.menueNav':function(){
            console.log('aaaaa')
        }
    },
    methods:{
        autoHeight(){
            //表格高度自适应
            let that = this
            let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
            if(obj){
                that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight - 30:''
                that.heightFlg = obj.heightFlg
            }
        },
        getAppKey(){
            this.$store.commit('navPath/setNavMenue','系统')
            storage.store.set('menuNav','系统')
            this.$router.push({path:'/systemManage/robotManage'});
        },
        selectOk(){
            //添加加粉号
            let ecms = []
            let that = this;
            this.modalSelectedRowKeys.forEach(el=>{
                ecms.push({name:that.modalList[el].name,userid:that.modalList[el].userid})
            })
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/addautoemployee?',
                data:{
                    ecms:ecms,
                    ecms_userid:this.$store.state.user.user.user_id
                }
            }).then(res=>{
                if(res.data.status === 1){
                    this.selectFalg = false;
                    this.modalSelectedRowKeys = [];
                    this.modalList = [];
                    this.$message.success("添加成功！");
                    this.refreshGroup();
                }else{
                    this.$message.warn("操作失败请重试");
                }
            })
        },
        modalCancel(){
            //modal cancel
            this.selectFalg = false;
            this.setFalg = false;
            this.modalSelect = false;
            this.modalList = [];
            this.modalSelectedRowKeys = [];
            this.wechatList = [];
            this.setParam = {
                sec:'',
                step:0,
                time:5
            }
        },
        selectWechat(){
            //选择加粉号
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/getaddemployee?',
                data:{
                    ecms_userid:this.$store.state.user.user.user_id
                }
            }).then(res=>{
                let udata = res.data;
                if(udata.status === 1){
                     this.appKey = true
                     this.modalList = udata.data
                     this.selectFalg = true; 
                }else{
                    this.appKey = false
                    this.selectFalg = true; 
                }
            })
        },
        onSelectChange(keys){
            //选择加粉号
            this.modalSelectedRowKeys = keys;
        },
        addSet(record){
            //加粉设置 modal显示
            this.rowUserId = record.userid;
            this.setParam = {
                sec:record.msg,
                step:record.duration,
                time:record.limit?record.limit:5
            }
            this.setFalg = true;
        },
        actionSet(val,record){
            //1=>加粉设置保存  2=>加粉开关 3=>删除 
            let data;
            if(val===1){
                console.log(this.rowUserId)
                data = {
                    userid:this.rowUserId,
                    msg:this.setParam.sec,
                    duration:this.setParam.step,
                    limit:this.setParam.time,
                    action:'edit'
                }                
            }else if(val === 2){
                data = {
                    userid:record.userid,
                    action:record.status === 0?'open':'close'
                }
            }else{
                data = {
                    userid:record.userid,
                    action:'del'
                }
            }
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/editaddfan?',
                data:data
            }).then(res=>{
                if(res.data){
                    this.setFalg = false;
                    this.refreshGroup();
                }                
            })
        },
        addList(record){
            //加粉记录显示
            this.modalSelect = true;
            this.addRecord = record.userid;
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/getaddfanlist?',
                data:{
                    userid:record.userid,
                    p:this.m_page,
                    n:this.m_page_size
                }
            }).then(res=>{
                let udata = res.data
                if(udata.status === 1){
                    this.modalList = udata.data.list;
                    this.m_total = parseInt(udata.data.total)
                }
            })
        },
        pullDown(){
            location.href ='http://' +  this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port  + '/qiyewxapi/downloadautoadd?'+  '&userid=' + this.addRecord + '&action=download';
            this.modalSelect =false
        },
        onChange(page,pageSize){
            //分页
            this.page = page
            this.page_size = pageSize
            this.refreshGroup();
        },
        onShowSizeChange(size,pageSize){
            //分页条数
            this.page = 1
            this.page_size = pageSize
            this.refreshGroup();
        },
        onChangeM(page,pageSize){
            //分页 modal
            this.m_page = page
            this.m_page_size = pageSize
            this.refreshGroup();
        },
        onShowSizeChangeM(size,pageSize){
            //分页条数 modal
            this.m_page = 1
            this.m_page_size = pageSize
            this.refreshGroup();
        },
        refreshGroup(){
            //列表初始数据
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/autoaddlist?',
                data:{
                    ecms_userid:this.$store.state.user.user.user_id,
                    p:this.page,
                    n:this.page_size,
                    s_key:this.key
                }
            }).then(res=>{
                let udata = res.data;
                if(udata.status === 1){
                    this.customerList = udata.data.list;
                    this.total = parseInt(udata.data.total);
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
        this.refreshGroup();
    },
    beforeDestroy() {
         window.removeEventListener('resize',this.autoHeight,false)
    }
}
</script>
<style lang="less" scoped>
    .row{
        margin-bottom:10px;
        .search-back{
            width:188px;
            margin-right:10px;
            vertical-align: middle;
        }
        span:nth-child(1){
            color:rgba(254, 99, 84, 1);
        }
    }
    .setRow{
        padding:12px 0;
    }
   .set-l{
       margin-right:7px;
   }
   .set-p{
       color:#FE6354;
       padding-left:62px;
   }
    
    .selectTag{
        margin-right:30px;
    }
    .pickTIime{
        width:190px;
    }
    .search-a{
        margin-left:10px;
        width:58px;
        height:31px;
        text-align:center;
    }
    .modalFoot{
        text-align:right;
        height:44px;
        line-height:62px;
        border-top:1px solid #f0f0f0;
        margin-top: 10px;
    }
    .actionIcon{
        width: 30px;
        height:30px;
        cursor: pointer;
    }
    .actionIcon-delet{
        width: 20px;
        height:20px;
        cursor: pointer;
    }
</style>
<style lang="less">
     .modalTbale{
         .ant-table-thead > tr > th ,.ant-table-body tr td{
             padding:6px 16px;
         }
    }
    .scope .ant-badge-status-default{
        background:#979696;
    }
</style>