<style lang="less" scoped>
    .customer-list {
        background: #ffffff;
        position: relative;
        padding:0 14px;
        border-radius:3px;
        height: calc(~"100vh - 90px");
        .header {
            padding: 12px 0;
            background:#fff;
        }
        .content {
            // height: calc(~"100vh - 280px");
            position:relative;
        }
    }
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .clr:after{
        display: block;
        height:0;
        content:'';
        visibility: hidden;
        clear:both;
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    .actionIcon{
        width: 36px;
        height:36px;
        cursor: pointer;
    }
    .label{
        border:1px dashed #2686d4;
        border-radius:10px;
        /*width:60px;*/
        font-size:12px;
        padding:2px 6px;
        cursor: pointer;
        line-height: 16px;
    }
</style>
<style>
    .tel .ant-select-open .ant-select-selection{
        border:none;
        outline: none;
        box-shadow: none;
    }
    .tel .ant-select-selection{
        border:none;
        background:none;
        box-shadow: none;
    }

</style>
<template>
    <div class="customer-list">
        <div class="header" ref='header'>
            <a-form  layout="inline" :form="form" >
                <a-row class="clr">
                    <a-col :span="24">
                        <div class="fl">
                             <a-form-item label="部门">
                                 <a-tree-select
                                    :treeData="departmentList"
                                    :treeDefaultExpandAll="true"
                                    v-model="queryParam.department_id"
                                    @select="onSelect"
                                    style="min-width: 150px"
                                 >
                                 </a-tree-select>
                             </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item label="客户经理">
                                <a-select v-model="queryParam.user_id" @change="managerChange"  style="width: 150px;"  placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                                    <a-select-option  v-for="(item,idx) in managerList" :key="item.id" >
                                        {{item.user_name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="fl">
                            <a-form-item label="微信号">
                                <a-select v-model="queryParam.weChat" @change="choseWechat" placeholser="选择微信号" style="width:150px">
                                    <a-select-option v-for="(item,index) in weChatList" :key="index">   
                                        {{item.nickname?item.nickname:'未命名'}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="fr">
                            <a-form-item>
                                <a-input-search  v-model="queryParam.key" placeholder='请输入微信备注/微信昵称' style="width: 180px" maxlength="15" enterButton @search="handleSubmit"/>
                            </a-form-item>
                            <a-tooltip>
                                <template slot="title">
                                    高级搜索
                                </template>
                                <span style="cursor: pointer;padding: 6px 9px;margin: 5px 10px 5px 0;border-radius: 3px;background: #55ABCE;color: #fff;display: inline-block;line-height: 19px" @click="more">
                                <img src="../../assets/search.svg" alt="" style="width: 12px;height: 12px;margin-top: -3px;">
                            </span>
                            </a-tooltip>
                            <a-tooltip>
                                <template slot="title">
                                    导出联系人
                                </template>
                                <span style="cursor: pointer;padding: 6px 9px;margin: 5px 10px 5px 0;border-radius: 3px;background: #55ABCE;color: #fff;display: inline-block;line-height: 19px" @click="exportContact"> <a-icon type="cloud-download"></a-icon> </span>
                            </a-tooltip>
                        </div>
                    </a-col>
                </a-row>
                <a-row v-if="moveFlag">
                    <a-col :span="24">
                        <a-form-item label="客户标签">
                            <a-select mode="multiple"  v-model="queryParam.label" @change="handleLabelChange" style="min-width:200px;max-width: 400px"   placeholder='请选择标签'>
                                <a-select-option v-for="(item,index) in labelList" :key="item.id" >
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <span>添加时间：</span>
                            <a-range-picker @change="onChangeDate"   ref='dateRange' style="width: 200px"/>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" @click="handleSubmit">搜索</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div class="content" >
            <a-table ref="table" :columns="columns" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="customerList" :pagination="false" :loading='loading'  :locale='locale'  type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id"   :scroll="{y:sheight,x:false}">
                <template slot="avatar_url" slot-scope="text, record, index">
                    <div>
                        <img :src="text?text:'../../assets/defalute.svg'" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.remark || record.nickname }}
                        </span>
                        <span v-if="record.corp_name&&record.corp_name!=''" style="color:#FF9800">@{{record.corp_name}}</span>
                    </div>
                </template>
                <template slot="adviser_name" slot-scope="text, record, index">
                    <div>
                        <img :src="record.avatar?record.avatar:'../../assets/defalute.svg'" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.adviser_name}}
                        </span>
                    </div>
                </template>
                <template slot="assistant_name" slot-scope="text, record, index">
                    <div>
                        <img :src="record.assistant_avatar" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius:100%">
                        <span>
                            {{record.assistant_name}}
                        </span>
                    </div>
                </template>
                <template slot="label" slot-scope="text, record, index">
                    <div style="vertical-align:middle;">
                        <a-tag v-for="(item,idx) in text" :key="idx" v-if="idx<3" style="vertical-align:middle;" :class="['tag-color' + item.color_id,'ant-tag-checkable-checked']">
                             {{item.label_name}}
                        </a-tag>
                        <a-tag class="label" @click="labelInfo(true,record)" style="vertical-align:middle;" >
                            <span v-if="text.length>3">标签详情 <a-icon type="plus" ></a-icon></span>
                            <span v-else>打标签 <a-icon type="plus" ></a-icon></span>
                        </a-tag>
                        </div>
                </template>
                <template slot="tel" slot-scope="text, record, index">
                    <div class="tel">
                        <a-select style="width:150px;" :defaultValue='text[0]'  @change="telChange($event,text,record)" v-if="text.length>1">
                            <a-select-option  v-for="(item,idx) in text" :key="idx" >
                                {{item}}
                            </a-select-option>
                        </a-select>
                        <span v-else style="padding-left: 12px;">{{text[0]}}</span>
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
                        <a-tooltip placement="top" title="发送消息">
                            <img src="../../assets/message.svg" v-if="(record.department_id==$store.state.user.user.department.id)"  @click="sendMsg(record.id,record.user_id,record.robot_username)" alt=""  class="actionIcon" style="padding-right: 15px;"><!-- <a-icon class="actionIcon" type="message"  ></a-icon> -->
                        </a-tooltip>
                        <a-tooltip placement="top" title="打电话">
                            <!--<a-popconfirm title="确定拨通电话吗？" cancelText="卡一" okText='卡二'  @confirm="call(record,1)" @cancel="call(record,0)" >-->
                                <!--<a-icon class="actionIcon" v-if="(record.department_id==$store.state.user.user.department.id)" type="phone" style="padding-right: 15px;color: #5aa9cd;font-size: 20px;vertical-align: text-top;"></a-icon>-->
                            <!--</a-popconfirm>-->
                            <!-- <a-icon class="actionIcon"  type="phone" style="padding-right: 15px;color: #5aa9cd;font-size: 20px;vertical-align: text-top;" @click="call(record)"></a-icon> -->
                        </a-tooltip>
                        <a-tooltip placement="top" title="详细信息">
                            <img src="../../assets/about.svg" class="actionIcon"   @click="getDetail(record.id,record.user_id)" style="padding-right: 12px;" alt="" >
                        </a-tooltip>
                        <a-tooltip  placement="top" title="更新信息">
                            <img src="../../assets/updata.svg" alt="" style="width:30px;height:30px;cursor:pointer;" @click="upInfo(record)">
                        </a-tooltip>
                    </div>
                </template>
            </a-table>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!customerList.length"></data-status> -->
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="customerList.length" >
                    <span style="vertical-align: middle;" >
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                        <a-button type='primary' v-if="selectedRowKeys.length" style="float:left;margin-left:56px;" @click="labelInfo(false)" :disabled="selectedRowKeys.length>1?false:true" >批量打标签</a-button>
                        <span style="vertical-align:middle;margin-left:20px;" v-if="selectedRowKeys.length">已选: {{selectedRowKeys.length}} 个 总: {{customerList.length}} 个</span>
                    </span>
                    <a-pagination v-if="customerList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="详情-修改标签"
            :visible="selectTagFlag"
            :footer="null"
            :confirmLoading="confirmLoading"
            @cancel="cancelLabel"
        >
            <div class="tag-modal">
                <p>
                <a-checkable-tag v-for="(item,index) in allLabel"  :key="item.id" :checked="item.check" v-if="item.check"  @change="(checked) => handleTagChange(item,index,checked)" style="margin-bottom: 5px" :class="['tag-color' + item.color_id]">
                   {{item.title}}
                </a-checkable-tag>
                </p>
                <p>
                <a-checkable-tag v-for="(item,index) in allLabel"  :key="item.id" :checked="item.check" v-if="!item.check"  @change="(checked) => handleTagChange(item,index,checked)" style="margin-bottom: 5px" :class="['tag-color' + item.color_id]">
                   {{item.title}}
                </a-checkable-tag>
                </p>
            </div>
            <div style="text-align:right;height:44px;line-height:62px;border-top:1px solid #f0f0f0;margin-top: 10px;">
                <a-button @click="cancelLabel">取消</a-button>
                <a-button type='primary'  @click="handleTagOk">确定</a-button>
            </div>
        </a-modal>
        <!--拨打电话-->
        <a-modal :visible='liveChatCallFlag' title="选择拨号手机"  width='660px' @cancel="liveChatCallFlag = false"  @ok="liveChatSave"  class="cardModal">
            <div>
                <div style="height:30px;line-height:30px;margin-bottom:10px;">选择手机号：</div>
                <a-select v-model="robotTelIdx" @change='robotTelChange' style="width:100%">
                    <a-select-option v-for="(item,index) in robotTel" :key="index">
                        {{item.mobile_serial_name?item.mobile_serial_name:'无数据'}}
                    </a-select-option>
                </a-select>
                <div style="margin-top:20px;">
                    <a-radio-group  v-model="radioValue" @change="onChangeValue">
                        <a-radio :value="10" style="margin: 0 10px 20px 0;">
                            <img src="../../assets/card1.svg" v-if="radioValue===10" class="cardImg"/>
                            <img src="../../assets/card2.svg" v-else class="cardImg" />
                            <span :style="{color:radioValue===10?'#5AA9CD':'#ccc'}">卡一</span>
                        </a-radio>
                        <a-radio :value="20" style="margin-bottom: 20px;">
                            <img src="../../assets/card1.svg" v-if="radioValue===20" class="cardImg" />
                            <img src="../../assets/card2.svg" v-else class="cardImg"/>
                            <span :style="{color:radioValue===20?'#5AA9CD':'#ccc'}">卡二</span>
                        </a-radio>
                    </a-radio-group>
                </div>
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
        name: "",
        components:{
            dataStatus
        }
        ,data(){
            return{
                form: this.$form.createForm(this),
                sheight:'',
                heightFlg:false,
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                selectTagFlag:false,
                confirmLoading:false,
                labelInfoFlag:false,
                weChatList:[],
                selectedRowKeys:[],
                allLabel:[],
                checkAll:false,
                telList:[1,2],
                telflag:'',
                tel:'',
                queryParam:{
                    user_id:'0',
                    key:'',
                    label:[],
                    department_id:'',
                    startTime:'',
                    endTime:'',
                    weChat:'',
                    assistant_id:''
                },
                loading:false,
                managerList:[],
                labelList:[],
                expand:false,   //搜索状态，展开还是收起
                customerList:[],
                columns:[ 
                    {
                        title: '客户',
                        dataIndex: 'avatar_url',
                        width: '16%',
                        align:'left',
                        scopedSlots: {
                            customRender: 'avatar_url'
                        }
                    },
                    {
                        title: '客户经理',
                        align:'left',
                        width: '11%',
                        dataIndex:'adviser_name',
                        scopedSlots: {
                            customRender: 'adviser_name'
                        }
                    },
                    {
                        title: '所属微信号',
                        align:'left',
                        width: '11%',
                        dataIndex: 'assistant_name',
                        scopedSlots: {
                            customRender: 'assistant_name'
                        }
                    },
                    {
                        title: '加好友日期', 
                        align:'left',
                        width: '13%',
                        dataIndex: 'agree_on'
                    },
                    {
                        title: '客户标签',
                        align:'left',
                        width: '25%',
                        dataIndex:'label',
                        scopedSlots: {
                            customRender: 'label'
                        }
                    },
                    {
                        title: '电话',
                        align:'left',
                        width: '10%',
                        dataIndex: 'tel',
                        scopedSlots: {
                            customRender: 'tel'
                        }
                    },
                    {
                        title: '操作',
                        width: '14%',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                page_size:10,
                page:1,
                total:0,
                departmentList:[],
                disableDepartment:true,
                statusFlag:null,
                clientHeght:'',
                clinetWidth:false,
                moveFlag:false,
                liveChatCallFlag:false,
                robotTelIdx:0,
                robotTel:this.$store.state.user.user.robotTel,
                slotId:0,
                radioValue:10,
                telChangeRecord:{},
                callTel:'',
            }
        },
        mounted () {
            window.addEventListener('resize',this.autoHeight,false)
        },
        watch:{
            customerList:function(){
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
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        beforeCreate(){
          
        },
        methods: {
            moment,
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
            handleTagOk(){//打标签 friend_user_name
//                if(this.$store.state.user.offlineRobot.length){
//                    this.$message.error('网络异常，打标签失败')
//                    return false
//                }
                let labelList = [];
                let userList = [];
                let robot_username = '';
                this.allLabel.forEach(el=>{
                    if(el.check){
                        labelList.push(el.title);
                        el.check = false;
                    }
                })
                this.customerList.forEach(el=>{
                    this.selectedRowKeys.forEach(item=>{
                        if(el.id === item){
                            userList.push(el.friend_user_name)
                        }
                    })
                })
                this.weChatList.forEach(el=>{
                    if(el.id === this.queryParam.assistant_id ){
                        robot_username = el.username;
                    }
                })
                if(!this.labelInfoFlag){
                        comConf.isOfflineRobot(robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        let data = {
                            cmd:2063,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:robot_username,
                            cmdData:{
                                usernames:userList,
                                labels:labelList,
                                isDelete:false
                            }
                        }
                        this.$ws.sendMsgFun(data)
                        this.selectTagFlag = false;
                        this.$ws.cmd2063 = msg=>{
                            console.log(msg)
                            if(msg.status==2) {
                                this.$message.info(msg.callbackMsg);
                                this.selectedRowKeys = [];
                                this.getCustomer();
                            }else if(msg.status!=1){
                                this.$message.warning(msg.callbackMsg);
                                this.selectTagFlag = false;
                            }
                        }
                    }else{
                        comConf.isOfflineRobot(robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                        let data = {
                            cmd:2040,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:robot_username,
                            cmdData:{
                                username:userList[0],
                                labels:labelList
                            }
                        }
                        this.$ws.sendMsgFun(data)
                        this.selectTagFlag = false;
                        this.$ws.cmd2040 = msg=>{
                            if(msg.status==2) {
                                this.$message.info(msg.callbackMsg);
                                this.selectedRowKeys = [];
                                this.getCustomer();
                            }else if(msg.status!=1){
                                this.$message.warning(msg.callbackMsg);
                            }
                        }
                    }
                    this.selectedRowKeys = [];
                    this.checkAll = false;
            },
            handleTagChange(item,index,checked){
                    let cont = 0;
                    this.allLabel.forEach((el,index)=>{
                        if(el.check && (cont<10)){
                            cont++
                        }
                    })
                    if(checked && cont<10){
                        item.check = checked
                        this.$set(this.allLabel,index,item)
                    }else if(!checked){
                        cont--
                        item.check = checked
                        this.$set(this.allLabel,index,item)
                    }else{
                        this.$message.warning('最多支持选择 10 个标签', 3);
                    }
                // if(this.labelInfoFlag){
                // }else{
                //     this.allLabel.forEach(el=>{
                //         el.check = false;
                //     })
                //     item.check = checked
                //     this.$set(this.allLabel,index,item)
                // }
            },
            cancelLabel(){
                this.selectTagFlag = false;
                this.checkAll = false;
                this.selectedRowKeys = [];
                this.allLabel.forEach(el=>{
                    el.check = false;
                })
            },
            labelInfo(bool,userInfo){
                if(bool){
                    this.checkAll = false;
                    this.selectedRowKeys = [];
                    this.selectedRowKeys.push(userInfo.id);
                    this.allLabel.forEach(el=>{
                        userInfo.label.forEach(item=>{
                        if(el.id === item.label_id){
                            el.check = true;
                        }
                        })
                    })
                }
                this.selectTagFlag = true;
                this.labelInfoFlag = bool;
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
            choseWechat(idx){
                this.queryParam.assistant_id = this.weChatList[idx].id;
                this.page = 1
                this.page_size = 10
                this.selectedRowKeys = [];
                this.checkAll = false;
                this.getCustomer()
                this.getAllCustonerLabel()
            },
            toggle() {
                this.expand = !this.expand
            },
            clear() {
                this.$refs.dateRange.$children[0].$children[0].handleChange(null)
                this.disableDepartment = true
                this.queryParam = {
                    key:'',
                    label:[],
                    startTime:'',
                    endTime:'',
                    department_id:this.$store.state.user.user.department.id || this.departmentList[0].key,
                    user_id:'0',
                    weChat:''
                }
                this.treeList(true)
            },
            exportContact() {
                location.href = '/index.php?r=uc/customer/export-friends&key=' + this.queryParam.key +  '&label='+  this.queryParam.label + '&department_id='+ this.queryParam.department_id  + '&startTime='+ this.queryParam.startTime  + '&endTime='+ this.queryParam.endTime + '&user_id=' + this.queryParam.user_id +'&assistant_id=' +this.queryParam.assistant_id + '&route_id' + 161
            },
            handleLabelChange(value) {
                this.queryParam.label = value
            },
            managerChange(val){
                //选择客户经理
                this.queryParam.user_id = val;
                this.page = 1
                this.page_size = 10
                this.getWeChat(val)
            },
            onChangeDate(date,dateStrings) {
                this.queryParam.startTime = dateStrings[0];
                this.queryParam.endTime =  dateStrings[1];
            },
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys
                selectedRowKeys.length<this.customerList.length? this.checkAll = false:this.checkAll = true;
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.selectedRowKeys = [];
                this.getCustomer()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.selectedRowKeys = [];
                this.getCustomer()
            },
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
                this.getUserList()
                // this.getAllCustonerLabel()
            },
            listToTree(list,val) {
//              将部门列表转换为tree所用数据
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
                this.$store.state.user.user.department.id===selectedKeys?this.disableDepartment = true:this.disableDepartment = false;
                this.page = 1
                this.page_size = 10
                this.queryParam.department_id = selectedKeys
                this.getUserList(selectedKeys)
                // this.getAllCustonerLabel()
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
                        user_id?this.getWeChat(user_id):this.managerList[0]?this.getWeChat(this.managerList[0].id):this.getWeChat(0);
                        //获取客户经理下微信号
                    }
                })
            },
            getWeChat(val){
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/communication/user-assistant',
                    data:{user_id:val}
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        this.weChatList = udata.data;
                        this.weChatList.length?this.queryParam.assistant_id = udata.data[0].id:this.queryParam.assistant_id='';
                        this.weChatList.length?this.queryParam.weChat = 0:this.queryParam.weChat = '无匹配结果'
                        this.getCustomer()
                        this.getAllCustonerLabel();
                    }else{
                        this.$message.warn(udata.msg)
                    }
                })
            },
            handleSubmit() {
                this.loading = true;
                this.page = 1
                this.page_size = 10
                this.getCustomer()
            },
            getAllCustonerLabel() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/material/customer-label',
                    data:{
                        department_id:this.queryParam.department_id ,
                        assistant_ids:this.queryParam.assistant_id,
                        company:1
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.labelList = udata.data
                        this.allLabel = udata.data
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            getCustomer() {
                let that = this;
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/list',
                    params:Object.assign(this.queryParam,{p:this.page,n:this.page_size})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.customerList = udata.data.list
                        // this.telList.length? this.tel = 0:this.tel = '无匹配结果';
                        this.loading = false;
                        this.total = parseInt(udata.data.count)
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            getDetail(id,user_id) {
                this.$router.push({path:'/home/customerDetails',query:{'id':id,'department_id':this.queryParam.department_id,'user_id':user_id}});
            },
            sendMsg(id,user_id,username) {
                storage.store.set('menuNav','聚合聊天')
                this.$router.push({path:'/liveChat',query:{'id':id,user_id:user_id,type:'friend',username:username}});
            },
            upInfo(item) {
                this.$message.info('正在更新信息...',2)
                comConf.isOfflineRobot(item.robot_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let data = {
                    cmd:2036,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.robot_username,
                    cmdData:{
                        username:item.friend_user_name
                    }
                }
                let statusFlag = '';
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2036 = msg=>{
                    if(msg.status==2) {
                        if(!statusFlag){
                             this.$message.success('更新成功',2)
                        }
                        statusFlag = true;
                    }else if(msg.status==4) {
                        if(!statusFlag){
                             this.$message.error('更新失败',2)
                        }
                        statusFlag = true;
                    }
                }
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
            more(){
                this.queryParam.label = []
                this.queryParam.startTime = ''
                this.queryParam.endTime = ''
                this.moveFlag = !this.moveFlag;
            },
            onChangeValue(e){
                // value=20 卡二 value=10 卡一
                if(e.target.value===20){
                    this.slotId = 1
                }else{
                    this.slotId = 0
                }
            },
            call(record) {
                if(record.tel.length==0) {
                    this.$message.warn('当前用户无对应手机号')
                    return
                }
                if(!this.$store.state.user.user.robotTel.length){
                    this.$message.warn('未绑定设备，拨打受限!')
                    return false
                }
                this.liveChatCallFlag = true;
                this.callTel = record.calltel || record.tel[0]
                this.robotTelIdx = 0;
            },
            robotTelChange(val){
                this.robotIndex = val
            },
            liveChatSave(){
                if(this.$ws.ws.readyState!='1') {
                    this.$message.warn('当前网络连接不稳定，请稍后再试')
                    this.liveChatCallFlag = false;
                    return
                }
                let data = {
                    cmd:2065,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.$store.state.user.user.robotTel[this.robotTelIdx].username,
                    cmdData:{
                        number:this.callTel,
                        slotId:this.slotId
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2065 = msg =>{
                    if(msg.status === 3){
                        this.$message.success(msg.callbackMsg)
                        this.liveChatCallFlag = false;
                    }else{
                        this.$message.success(msg.callbackMsg)
                    }
                }
            },
            telChange(chose,telArray,record){
                this.telChangeRecord = record
                this.$set(record,'calltel',telArray[chose])
            },
        }
        ,created(){
            this.treeList(true)
        },
        beforeDestroy() {
            this.$ws.cmd2036 = null
            window.removeEventListener('resize',this.autoHeight,false)
        },
    }
</script>
