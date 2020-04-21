<template>
    <div class="companyStyle">
        <div class='company-header' ref="header">
            <a-form   layout="inline" :form="form" >
                <a-row class="clr" type="flex" align="middle">
                    <div>
                        <a-form-item label="部门">
                            <a-tree-select
                                class="selectCommon"
                                :treeData="departmentList"
                                :treeDefaultExpandAll="true"
                                v-model="queryParam.department_id"
                                @select="onSelect"
                                style="width:200px;"
                            >
                            </a-tree-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="客户经理">
                            <a-select class="selectCommon" v-model="queryParam.user_id" @change="managerChange" placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power" style="width:150px;">
                                <a-select-option  v-for=" item in managerList" :key="item.id" >
                                    {{item.user_name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="微信号">
                            <a-select class="selectCommon" v-model="queryParam.weChat_id" @change="choseWechat" placeholser="选择企业号" style="width:150px;">
                                <a-select-option v-for="(item,index) in weChatList" :key="index">   
                                    {{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="类型">
                            <a-select class="selectCommon" v-model="queryParam.type" @change="changeType" placeholser="选择客户类型" style="width:150px;">
                                <a-select-option v-for="(item,index) in typeList" :key="index">   
                                    {{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item>
                            <span class="right">
                                <a-input-search class="search"  v-model="queryParam.key" placeholder='关键词搜索'  maxlength="15" enterButton  @search="handleSubmit" style="width:300px;"/>
                            </span>
                        </a-form-item>
                    </div>
                </a-row>
            </a-form>
        </div>
        <div class="company-content askHistory">
            <a-table ref="table" :columns="columns" :dataSource="customerList" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'   :pagination="false" :loading='loading'  :locale='locale'   :scroll="{y:sheight,x:false}">
                <template slot="avatar" slot-scope="text,record,index">
                    <div>
                        <img :src="record.type===20?pngFlag:record.type===10?record.avatar:'../../assets/defalute.svg'" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.remark  || record.name || '未命名的群'}}
                        </span>
                    </div>
                </template>
                <template slot="user_avatar" slot-scope="text,record,index">
                    <div>
                        <img :src="text?text:require('../../assets/defaluteImg.jpg')" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.user_name}}
                        </span>
                    </div>
                </template>
                <template slot="robot_avatar" slot-scope="text,record,index">
                    <div>
                        <img :src="text?text:require('../../assets/defaluteImg.jpg')" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.robot_name}}
                        </span>
                    </div>
                </template>
                <template slot="action" slot-scope="text,record,index">
                    <div>
                        <span class="history" @click="getHistory(record,true)">聊天历史</span>
                    </div>
                </template>
            </a-table>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!customerList.length"></data-status> -->
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="customerList.length" >
                    <a-pagination v-if="customerList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="聊天记录"
            :visible="historyFlag"
            :footer="null"
            :confirmLoading="confirmLoading"
            @cancel="cancelLabel"
            width='846px'
            :bodyStyle="{
                padding:'14px 24px',
                height:'470px',
//                overflowY:'auto'
            }"
        >
            <div class="historyHeader">
                <a-radio-group style="width: 385px" v-model="radio_group" @change="changRadioGroup">
                    <a-radio value="0">全部</a-radio>
                    <a-radio value="2">图片</a-radio>
                </a-radio-group>
                <a-input-search class="search"  placeholder='输入聊天内容'  maxlength="15" enterButton style="width:200px;margin-right: 20px" v-model="searchKey" @search="searchChatHistory()"></a-input-search>
                <a-date-picker placeholder="请选择时间"   format="YYYY/MM/DD" @change="onChangeDate" ref='dateRange'></a-date-picker>
            </div>
            <div ref="historyList" class="historyContext">
                <div style="text-align:center;">
                    <a-spin style="font-size: 14px;" type="loading" :spinning="listSpinning"/>
                </div>
                <div v-for="(item,index) in askList" :key="index">
                    <div class="clearFloat">
                        <a-avatar :src="item.user_avatar" :size="40" shape="square" class="leftAvatar"/>
                        <div class="askRight">
                            <div class="clearFloat">
                                <span class="floatLeft">{{item.nickname}}</span>
                                <span class="rightTime">{{item.createtime}}</span>
                            </div>
                            <p class="askMsg">
                                <!--文字-->
                                <span v-if="item.type==0||item.type==2" :id="item.id" :class="['text-content',item.status==80?'text-retract':'']"  v-html="item.content"></span>
                                <!--图片及表情包-->
                                <img v-else-if="item.type==7||item.type==14" class="img-content unselect" :src="item.pic_url" @click="showModal(item)">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!askList.length" class="pacepage" >
                <data-status :width="120"   ></data-status>
            </div>
        </a-modal>
    </div>    
</template>
<script>
    var comConf = require('../../common/comConfig');
    import moment from 'moment';
    import dataStatus from '../../components/pageConfig/dataStatus'
    var emoji = require('../../common/emojiMap');
export default {
    name:'',
    components:{
        dataStatus
    },
    data(){
        return{
            pngFlag:require('../../assets/room_avatar.png'),
            form: this.$form.createForm(this),
            disableDepartment:true,//权限控制
            heightFlg:false,//表格样式控制
            loading:false,
            sheight:'',//表格高度
            historyFlag:false,
            selectRecord:{},
            confirmLoading:false,
            page_size:10,
            page:1,
            total:0,
            radio_group:'0',
            searchKey:'',
            dateCon:'',
            locale:{
                filterConfirm:'',
                filterReset:'',
                emptyText:''
            },
            queryParam:{
                department_id:'',
                user_id:'选择客户经理',
                weChat_id:'',
                type:0,
                key:'',
            },
            departmentList:[],//部门list
            managerList:[],//客户经理
            weChatList:[],//企业号list
            typeList:[
                {
                    id:10,
                    name:'客户'
                },
                {
                    id:20,
                    name:'群聊'
                }
            ],//客户类型
            columns:[
                {
                    title: '客户/群聊',
                    dataIndex: 'avatar',
                    align:'left',
                    width:120,
                    scopedSlots: {
                        customRender: 'avatar'
                    }
                },
                {
                    title: '客户/群聊类型',
                    width:120,
                    dataIndex: 'type',
                    align:'center',
                    customRender:(text)=>{
                        return text===10?'客户':'群聊'
                    }
                },
                {
                    title: '所属部门',
                    dataIndex: 'department',
                    align:'center',
                    width:120
                },
                {
                    title: '所属客户经理',
                    dataIndex: 'user_avatar',
                    align:'center',
                    width:120,
                    scopedSlots: {
                    customRender: 'user_avatar'
                    }
                },
                {
                    title: '所属企业号',
                    dataIndex: 'robot_avatar',
                    align:'center',
                    width:120,
                    scopedSlots: {
                        customRender: 'robot_avatar'
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align:'center',
                    width:100,
                    scopedSlots: {
                        customRender: 'action'
                    }
                },
            ],
            customerList:[],//表格数据
            askList:[],
            pageCount:1,//分页初始值
            historyScrollFlag:false,
            listSpinning:false,
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
                        this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight -10;
                    }else{
                        this.heightFlg = false;
                    }
                });
            }
    },
    methods:{
        clear() {
            this.$refs.dateRange.$children[0].$children[0].handleChange(null)
            this.dateCon = ''
            this.searchKey = ''
            this.radio_group = '0'
        },
        autoHeight(){
            let that = this
            let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
            if(obj){
                that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight -40:''
                that.heightFlg = obj.heightFlg
            }
        },
        // addEventScroll(){
        //     this.$refs.historyList.addEventListener('scroll', () => {
        //         if((this.$refs.historyList.scrollHeight - this.$refs.historyList.offsetHeight - this.$refs.historyList.scrollTop)<1 ){
        //             if(this.pageCount<=Math.ceil(this.askList.length/10)){               
        //                 this.pageCount++
        //                 // this.logFlg = true;
        //                 this.getHistory()
        //             }
        //         }
        //     }, false)
        // },
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
            this.queryParam.weChat_id = val
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.refreshGroup()
        },
        changeType(val){
            //选择客户 类型
            this.queryParam.type = val
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.refreshGroup()
        },
        onChangeDate(val,time){
            this.dateCon = time.split('/').join('-');
            this.getHistory(null,true)
        },
        handleSubmit(){
            this.page = 1
            this.page_size = 10
            this.customerList = []
            this.refreshGroup()
        },
        getHistory(record,bool,is_scroll){
            this.historyFlag = true
            this.historyScrollFlag = true
            if(record) {
                this.selectRecord = record
                setTimeout(()=>{   //控制往上翻数据加载出来的时间
                     this.$refs.historyList.addEventListener('scroll', () => {
                         if(this.$refs.historyList.scrollTop== 0 && !this.historyScrollFlag && !!this.selectRecord.user_id) {
                             this.listSpinning = true
                             this.getHistory(null,false,true)
                         }
                     }, false)          
                 },1000)
            }
            bool&&(this.pageCount = 1)
            if(is_scroll) {
                this.pageCount += 1
            }
            this.$axios({
                method:'POST',
                url:'/qiyewxapi/qychatlogscontent?',
                data:{
                    p:this.pageCount,
                    n:'20',
                    id:this.weChatList[this.queryParam.weChat_id].id,
                    userid:this.selectRecord.user_id,
                    robotid:this.selectRecord.remoteId,
                    type:this.radio_group,
                    searchKey:this.searchKey,
                    dateCon:this.dateCon,
                    chatType:this.selectRecord.type
                }
            }).then(d=>{
                let udata = d.data;
                if (udata.status == 1) {
                    if(udata.data.list.length == 0){  //数据
                        bool&&(this.askList = udata.data.list)
                        setTimeout(()=>{
                            this.historyScrollFlag = true
                        },0)
                        this.imgSpinning = flase
                        return
                    }
                    bool&&(this.askList = udata.data.list)
                    !bool&&(this.askList = [].concat(udata.data.list,this.askList))
                    this.askList.forEach(elItem=>{
                        (elItem.type==0||elItem.type==2)&&!!elItem.content&&(elItem.content = emoji.stringToHtml(elItem.content))
                    })
                    let scroll_top = this.$refs.historyList.scrollHeight
                    setTimeout(()=>{  //控制一进来数据就在最下面显示
                        if(!is_scroll) {
                            this.$refs.historyList.scrollTop < (this.$refs.historyList.scrollHeight - this.$refs.historyList.offsetHeight)
                            &&(this.$refs.historyList.scrollTop = this.$refs.historyList.scrollHeight - this.$refs.historyList.offsetHeight)
                        } else {
                            this.$refs.historyList.scrollTop = this.$refs.historyList.scrollHeight - scroll_top
                        }
                        this.historyScrollFlag = false
                        this.listSpinning = false
                    },0)
                }
            }).catch(_=>{
                this.listSpinning = false
            });
        },
        cancelLabel(){
            //取消
            this.clear()
            this.historyFlag = false
            this.askList = []
        },
        getDetail(id,user_id){
            //查看详情
            //incCustomerManage/incListDetails ,query:{'id':id,'department_id':this.queryParam.department_id,'user_id':user_id}
            this.$router.push({path:'/incCustomerManage/incListDetails'});
        },
        onChange(page,pageSize){
            //分页
            this.page = page
            this.page_size = pageSize
            this.refreshGroup();
        },
        onShowSizeChange(page,pageSize){
            //分页条数
            this.page = page
            this.page_size = pageSize
            this.refreshGroup();
        },
        changRadioGroup(val){
            this.radio_group = val.target.value
            this.getHistory(null,true)
        },
        searchChatHistory() {
            this.getHistory(null,true)
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
        getWeChat(val){
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
                    if(this.weChatList.length){
                        this.refreshGroup()
                    }
                }else{
                    this.$message.warn(udata.msg)
                }
            })
        },
        refreshGroup(){
            let data = {
                p:this.page,
                n:this.page_size,
                userid:this.queryParam.user_id,
                robotid:this.weChatList[this.queryParam.weChat_id].id,
                type:this.typeList[this.queryParam.type].id,
                key:this.queryParam.key,
                department_id:this.queryParam.department_id 
                // startTime:this.queryParam.starttime,
                // endTime:this.queryParam.endtime
            }
            this.$axios({
                method:'post',
                url:'/qiyewxapi/businesschatlogs?',
                data:data
            }).then(res=>{
                let udata = res.data;
                if(udata.status === 1){
                    this.customerList =  udata.data.list
                    this.total = parseInt(udata.data.count)
                }
            })
        },
        imgExists(e) {
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
    },
    created(){
        //this.addEventScroll()
        this.getTreeList()
    },
    beforeDestroy(){
        window.removeEventListener('resize',this.autoHeight,false)
    }
}
</script>
<style lang="less" scoped>
    // .row:nth-child(1){
    //     // padding-bottom:10px;
    //     margin-bottom:10px;
    // }
    // .row:nth-child(2){
    //     padding-top:10px;
    //     border-top:1px solid #efefef;   
    // }
    .history{
        cursor: pointer;
        color: #5AA9CD;
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
        width: 36px;
        height:36px;
        cursor: pointer;
    }
    .historyHeader{
        padding-bottom: 12px;
        border-bottom:1px solid #f0f0f0;
    }
    .historyContext{
        max-height:390px;
        overflow:auto;
    }
    .leftAvatar{
        float:left;
        width: 45px;
        height: 45px; 
        margin:10px 0 0 0; 
        display:block;
    }
    .askRight{
        float:right;
        width:735px; 
        border-bottom:1px solid #f0f0f0;
        padding:10px 0 10px 0;
    }
    .floatLeft{
        color:#8A8A8A; 
        font-weight:400
    }
    .rightTime{
        float:right;
        margin-right:10px; 
        color:#8A8A8A; 
        font-weight:400
    }
    .askMsg{
        margin-bottom:0;
    }
    .pacepage{
        margin-top: 120px;
        margin-left: 42px;
    }
    .img-content {
        height: 100px;
        max-width: 200px;
        cursor: pointer;
    }
    .text-content {
        display: inline-block;
        max-width: 65%;
        background: #fff;
        border-radius: 5px;
        position: relative;
        color: rgb(16,16,16);
        white-space: normal;
        word-break: break-all;
    }
    .text-retract {
        background: #DDDDDD;
        color: #ffffff;
    }
</style>