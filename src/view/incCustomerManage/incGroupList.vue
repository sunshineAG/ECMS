<template>
    <div class="companyStyle">
        <div class='company-header' ref='header'>
            <div class="row">
                <a-tree-select
                    class="selectCommon"
                    :treeData="departmentList"
                    :treeDefaultExpandAll="true"
                    v-model="queryParam.department_id"
                    @select="onSelect"
                >
                </a-tree-select>
                <a-select class="selectCommon" v-model="queryParam.user_id" @change="managerChange" placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                    <a-select-option  v-for=" item in managerList" :key="item.id" >
                        {{item.user_name}}
                    </a-select-option>
                </a-select>
                <a-select class="selectCommon" v-model="queryParam.weChat_id" @change="choseWechat" placeholser="选择企业号">
                    <a-select-option v-for="(item,index) in weChatList" :key="index">   
                        {{item.name}}
                    </a-select-option>
                </a-select>
                <a-select class="selectCommon" v-model="queryParam.type" @change="changeType" placeholser="选择客户类型">
                    <a-select-option v-for="(item,index) in typeList" :key="index">   
                        {{item.name}}
                    </a-select-option>
                </a-select>
                <span class="right">
                    <a-input-search class="search"  v-model="queryParam.key" placeholder='关键词搜索'  maxlength="15" enterButton @search="refreshGroup"/>
                    <span></span>
                    <a-tooltip title="高级搜索">
                        <span class="icon-a" @click="more"> <img class="icon-img" src="../../assets/search.svg" alt="" > </span>
                    </a-tooltip>
                    <a-tooltip title="下载">
                        <span class="icon-a" @click="downloadFiles"> <a-icon type="cloud-download"></a-icon> </span>
                    </a-tooltip>
                </span>
            </div>
            <div class="row" v-if="moveFlag">
                <span>选择标签</span>
                <a-select class="selectTag" mode="multiple"  v-model="queryParam.modelLabel" @change="handleLabelChange" style="min-width:260px;max-width: 400px"   placeholder='请选择标签'>
                    <a-select-option v-for="(item,index) in labelList" :key="item.id" >
                        {{item.title}}
                    </a-select-option>
                </a-select>
                <span>添加时间</span>
                <a-range-picker class="pickTIime" @change="onChangeDate" ref='dateRange' :disabledDate="disabledDate"/>
                <a-button  class="search-a" type="primary" @click="refreshGroup">搜索</a-button>
            </div>
        </div>
        <div class="company-content">
            <a-table ref="table" :columns="columns" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="customerList" :pagination="false" :loading='loading'  :locale='locale'  type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.index"   :scroll="{y:sheight,x:false}">
                <template slot="own_avatar" slot-scope="text,record,index">
                    <div>
                        <img :src="text?text:require('../../assets/defaluteImg.jpg')" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <div style="display:inline-block;vertical-align: middle;margin-left:10px;">
                            <div :title="record.own_name"  style="width: 46px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                {{record.own_name}}
                            </div>
                        </div>
                    </div>
                </template>
                <template slot="qr_code" slot-scope="text,record,index">
                    <div >
                         <a-tooltip placement="left" v-if="text">
                            <template slot="title">
                                <img :src="text" style="width: 300px;height: 300px;border-radius: 5px">
                            </template>
                            <img :src="text"  style="width: 60px;height: 60px;border-radius: 5px">
                        </a-tooltip>
                        <div v-else style="width: 60px;display: inline-block">

                        </div>
                        <a-icon type="reload" style="cursor:pointer;" @click="updataCode(record.room_remoteId)"></a-icon>
                    </div>
                </template>
                <template slot="action" slot-scope="text,record,index">
                    <div>
                        <a-tooltip placement="top" title="发送消息">
                            <!-- <img class="actionIcon" style="padding-right: 15px;" src="../../assets/message.svg"  v-if="(record.department_id==$store.state.user.user.department.id)"  > -->
                             <img  class="actionIcon" style="padding-right: 15px;" src="../../assets/message.svg"  @click="sendMsg(record.id,record.user_id,record.robot_username)" alt="" >
                         </a-tooltip>
                         <a-tooltip placement="top" title="详细信息">
                             <img class="actionIcon"   src="../../assets/about.svg"  @click="getDetail(record)" style="padding-right: 12px;" alt="" >
                         </a-tooltip> 
                         <a-tooltip  placement="top" title="更新信息">
                             <img src="../../assets/updata.svg" alt="" style="width:26px;height:26px;cursor:pointer;" @click="upInfo(record.room_remoteId)">
                         </a-tooltip>
                    </div>
                </template>
            </a-table>
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="customerList.length" >
                    <span style="vertical-align: middle;" >
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                        <a-button type='primary' style="float:left;margin-left:36px;" @click="labelInfo(false)" >打标签</a-button>
                        <span style="vertical-align:middle;margin-left:20px;" v-if="selectedRowKeys.length">已选: {{selectedRowKeys.length}} 个 总: {{customerList.length}} 个</span>
                    </span>
                    <a-pagination v-if="customerList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="选择标签"
            :visible="selectTagFlag"
            :footer="null"
            :confirmLoading="confirmLoading"
            @cancel="cancelLabel"
            width="500px"
        >
            <div class="tag-modal">
                <p>
                <a-checkable-tag v-for="(item,index) in labelList"  :key="item.id" :checked="item.check"  @change="(checked) => handleTagChange(item,index,checked)" style="margin-bottom: 5px" :class="['tag-color' + item.color_id]">
                   {{item.title}}
                </a-checkable-tag>
                </p>
            </div>
            <div class="modalFoot">
                    <a-button @click="cancelLabel">取消</a-button>
                    <a-button type='primary' @click="handleTagOk">确定</a-button>
            </div>
        </a-modal>
    </div>    
</template>
<script>
    var comConf = require('../../common/comConfig');
    var storage = require('../../common/store')
    import moment from 'moment';
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
            selectTagFlag:false,
            confirmLoading:false,
            moveFlag:false,
            checkAll:false,
            page_size:10,
            page:1,
            total:0,
            locale:{
                filterConfirm:'',
                filterReset:'',
                emptyText:''
            },
            queryParam:{
                modelLabel:[],
                department_id:'',
                user_id:'选择客户经理',
                weChat_id:'',
                type:0,
                label:[],
                key:'',
                starttime:'',
                endtime:''
            },
            departmentList:[],//部门list
            managerList:[],//客户经理
            weChatList:[],//企业号list
            typeList:[
                {
                    id:0,
                    name:'全部'  
                },
                {
                    id:1,
                    name:'外部群'
                },{
                    id:2,
                    name:'内部群'
                }
            ],//客户类型
            labelList:[],//标签list
            allLabel:[],//所有标签
            columns:[
                {
                    title: '群名称',
                    dataIndex: 'room_name',
                    width: 150,
                    align:'left',
                    customRender:(text)=>{
                        return text!=''?text:'未命名群'
                    }
                },
                {
                    title: '群类型',
                    dataIndex: 'room_type',
                    width: 100,
                    align:'left',
                    customRender:(text)=>{
                        return text===0||text===1||text===3?'内部群':'外部群'
                    }
                },
                {
                    title: '群主',
                    dataIndex: 'own_avatar',
                    width: 100,
                    align:'left',
                    scopedSlots: {
                        customRender: 'own_avatar'
                    }
                },
                {
                    title: '群人数',
                    dataIndex: 'wechat_user_num',
                    width: 100,
                    align:'center'
                },
                {
                    title: '群码',
                    dataIndex: 'qr_code',
                    width: 100,
                    align:'center',
                    scopedSlots:{
                        customRender:'qr_code'
                    }
                },
                {
                    title: '操作',
                    width: 150,
                    dataIndex: 'action',
                    align:'center',
                    scopedSlots: {
                        customRender: 'action'
                    }
                },
            ],
            customerList:[],//表格数据
            selectedRowKeys:[]
        }
    },
    mounted(){
        let that = this;
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
        }
    },
    methods:{
        disabledDate(current) {
            return current <  moment('1900-01-01','YYYY-mm-dd').startOf('day')
        },
        autoHeight(){
            let that = this
            let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
            if(obj){
                that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight - 30:''
                that.heightFlg = obj.heightFlg
            }
        },
        onSelect(selectedKeys){
            //选择部门
            this.$store.state.user.user.department.id===selectedKeys?this.disableDepartment = true:this.disableDepartment = false;
            this.page = 1
            this.page_size = 10
            this.queryParam.department_id = selectedKeys
            this.customerList = []
            this.getUserList(selectedKeys)
        },
        managerChange(val){
            //选择客户经理
            this.queryParam.user_id = val;
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.getWeChat()
        },
        choseWechat(val){
            //选择企业号
            this.customerList = []
            this.refreshGroup()
        },
        changeType(val){
            //选择客户 类型
            this.queryParam.type = val
            this.customerList = []
            this.refreshGroup()
        },
        handleLabelChange(value){
            //选择标签
            this.queryParam.modelLabel = value;
            this.queryParam.label = value.join(',');
        },
        onChangeDate(date,dateStrings){
            //选择时间
            this.queryParam.starttime = dateStrings[0];
            this.queryParam.endtime =  dateStrings[1];
        },
        handleSubmit(){
            //搜索
        },
        more(){
            this.moveFlag = !this.moveFlag;
        },
        downloadFiles(){
            if(!this.customerList.length){
                this.$message.warn('无数据可供下载！')
                return
            }
              location.href = 'http://' +  this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port  + '/qiyewxapi/getroomlist?'+ '&key=' + this.queryParam.key +  '&s_tag='+  this.queryParam.label + '&startTime='+ this.queryParam.startTime  + '&endTime='+ this.queryParam.endTime + '&ecms_userid=' + this.queryParam.user_id +'&s_userid=' +this.weChatList[this.queryParam.weChat_id].userid + '&s_type=' + this.typeList[this.queryParam.type].id + '&action=download'
        },
        leverSearch(){
            //高级搜做
        },
        onSelectChange(selectedRowKeys){
            //选择表格数据
            this.selectedRowKeys = selectedRowKeys;
            selectedRowKeys.length<this.customerList.length? this.checkAll = false:this.checkAll = true;
        },
        sendMsg(id,user_id,username){
            storage.store.set('menuNav','聚合聊天')
            this.$router.push({path:'/liveChat',query:{'id':id,user_id:this.queryParam.user_id,type:'room',username:username}});
        },
        upInfo(id){
            let data = {
                cmd:2502,
                fromClientId:this.$store.state.user.user.user_id,
                toClientId:this.weChatList[this.queryParam.weChat_id].remoteId,
                cmdData:{
                    remoteId:id
                }
            }
            this.$ws.sendMsgFun(data)
            this.$ws.cmd2502 = msg =>{
                console.log(msg)
                if(msg.status === 2){
                    this.refreshGroup()
                    this.$message.success('已更新')
                }
            }
        },
        updataCode(id){
            let data = {
                cmd:2501,
                fromClientId:this.$store.state.user.user.user_id,
                toClientId:this.weChatList[this.queryParam.weChat_id].remoteId,
                cmdData:{
                    remoteId:id
                }
            }
            this.$ws.sendMsgFun(data)
            this.$ws.cmd2501= msg =>{
                console.log(msg)
                if(msg.status === 2&&msg.callbackMsg=='成功'){
                    this.refreshGroup()
                    this.$message.success('已更新')
                }
            }
        },
        handleTagChange(item,index,checked){
            //选择标签
            let cont = 0;
                this.labelList.forEach((el,index)=>{
                    if(el.check && (cont<10)){
                        cont++
                    }
                })
                if(checked && cont<10){
                    item.check = checked
                    this.$set(this.labelList,index,item)
                }else if(!checked){
                    cont--
                    item.check = checked
                    this.$set(this.labelList,index,item)
                }else{
                    this.$message.warning('最多支持选择 10 个标签', 3);
                }
        },
        checkedAll(){
            //全选标签
             if(!this.checkAll){
                this.selectedRowKeys = [];
                this.customerList.forEach((el,index)=>{
                    this.selectedRowKeys.push(index)    
                })
            }else{
                this.selectedRowKeys = [];
            }
            this.checkAll = !this.checkAll;
        },
        labelInfo(){
            //批量设置标签
            if(this.selectedRowKeys.length){
                this.selectTagFlag = true
            }else{
                this.$message.warn('请至少选中一位客户！')
            }
        },
        handleTagOk(){
            //设置标签
            let that = this;
            let tagList = []
            let userList = []
            this.labelList.forEach(el=>{
                if(el.check){
                    tagList.push(el.id)
                }
            })
            this.selectedRowKeys.forEach(el=>{
                userList.push(that.customerList[el].id)
            })
            console.log(userList)
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/addtag?',
                data:{
                    userid:this.weChatList[this.queryParam.weChat_id].userid,
                    tagList:tagList,
                    roomlist:userList,
                    add_type:1
                }
            }).then(res=>{
                if(res.data.status===1){
                    this.selectTagFlag = false
                    this.selectedRowKeys = []
                    this.checkAll = false
                    this.getLabel();
                    this.$message.success(res.data.msg)
                }
            })
            
        },
        cancelLabel(){
            //取消
            this.selectedRowKeys = [];
            this.labelList.forEach(el=>{
                el.check = false
            })
            this.selectTagFlag = false
            this.checkAll = false;
        },
        getDetail(record){
            //查看详情
            this.$router.push({path:'/incCustomerManage/incListDetails',query:{'id':record.room_remoteId,'type':'2','userid':this.weChatList[this.queryParam.weChat_id].userid,'robotId':record.robot_username}});//record
        },
        onChange(page,pageSize){
            //分页
            this.page = page
            this.page_size = pageSize
            this.selectedRowKeys = [];
            this.refreshGroup();
        },
        onShowSizeChange(){
            //分页条数
            this.page = 1
            this.page_size = size
            this.selectedRowKeys = [];
            this.refreshGroup();
        },
        getTreeList(){
            //获取部门数据
            this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
            this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
            this.getUserList()
        },
        listToTree(list,val) {
            //将部门列表转换为tree所用数据
            let array = []
            list.forEach((el,idx)=>{
                if(el.children && el.children.length > 0) {
                    el.children =this.listToTree(el.children,idx)
                }
                array.push({title:el.name,key:el.id,value:el.id,children:el.children})
            })
            return array
        },
        getUserList(){
            //获取客户经理
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
                    user_id?this.getWeChat(user_id):this.managerList[0]?this.getWeChat(this.managerList[0].id):this.getWeChat(0);
                }
            })
        },
        getWeChat(){
            //获取客户经理下企业号号
            this.$axios({
                method:'GET',
                url:'/qiyewxapi/getemployeelistbyecms?',
                params:{ecms_userid:this.queryParam.user_id}
            }).then(res=>{
               let udata = res.data;
                if(udata.status === 1){
                    this.weChatList = udata.data.list;
                    this.weChatList.length?this.queryParam.weChat_id = 0:this.queryParam.weChat_id = '无匹配结果'
                    this.getLabel();
                    if(this.weChatList.length){
                        this.refreshGroup()
                    }
                }else{
                    this.$message.warn(udata.msg)
                }
            })
        },
        getLabel(){
            //获取标签
            this.$axios({
                method: 'POST',
                url: '/qiyewxapi/getroomlabellist?',
                data:{
                    ecms_userid:this.queryParam.user_id
                }
            }).then(res=> {
                let udata = res.data
                if (udata.status == 1) {
                    this.labelList = udata.data
                    
                }
            });
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
        },
        refreshGroup(){
            let data = {
                p:this.page,
                n:this.page_size,
                ecms_userid:this.queryParam.user_id,
                s_userid:this.weChatList[this.queryParam.weChat_id].userid,
                s_type:this.typeList[this.queryParam.type].id,
                s_tag:this.queryParam.label,
                key:this.queryParam.key,
                starttime:this.queryParam.starttime,
                endtime:this.queryParam.endtime
            }
            this.$axios({
                method:'post',
                url:'/qiyewxapi/getroomlist?',
                data:data
            }).then(res=>{
                let udata = res.data;
                if(udata.status === 1){
                    this.customerList =  udata.data.list
                    this.total = parseInt(udata.data.total)
                }
            })
        }
    },
    created(){
        this.getTreeList()
    },
    beforeDestroy() {
        window.removeEventListener('resize',this.autoHeight,false)
    }
}
</script>
<style lang="less" scoped>
    .row:nth-child(1){
        line-height:32px;
        margin-bottom:10px;
    }
    .row:nth-child(2){
        padding-top:10px;
        border-top:1px solid #efefef;   
    }
    .employee{
        color:#FF9800;
        font-size:12px;
    }
    .selectTag{
        margin-right:14px;
    }
    .pickTIime{
        width:190px;
    }
    .search-a{
        margin-left:4px;
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
        width: 34px;
        height:34px;
        cursor: pointer;
    }
</style>