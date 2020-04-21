
<style lang="less" scoped>
	/*清除浮动代码*/
	.hide {
		display: none;
	}
	.clearFloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	.clearFloat {
		zoom: 1
	}
	.fr {
		float: right;
	}
	.fl {
		float: left;
    }
    .customer-min{
        height:calc(~"100vh - 150px");
        overflow-y: auto;
    }
    .customer-details {
        color: rgb(16,16,16);
        position: relative;
        overflow: auto;
        .customer-info-wx {
            padding: 10px 22px;
            background: #ffffff;
            .info-avatar{
                width: 40px;
                height: 40px;
                border-radius: 3px;
            }
            span {
                vertical-align: middle;
                .info-icon{
                    width:16px;
                    margin-bottom: 4px;
                    margin-left:4px;
                    color:rgb(197, 201, 204)
                }
                font-size:14px;
                margin-left: 10px;
            }
            .info-back{
                margin-top:6;
                width:62px;
                height:30px;
                padding:0;
                float:right;
            }
        }
        .customer-info, .label-info, .order-info {
            background: #ffffff;
            margin-top:5px;
            .info-header {
                padding: 8px 12px;
                margin:0 10px;
                border-bottom: 1px solid #EFEFEF;
                height: 48px;
                line-height: 32px;
                span {
                    font-size: 14px;
                    font-weight:800;
                }
            }
            .info-content {
                padding: 10px 25px;
                .ant-tag:hover {
                    background: #5AA9CD;
                    color: #ffffff;
                    opacity: 1;
                }
                .ant-form-item {
                    margin-bottom: 12px;
                }
                .ant-form-item-label{
                    text-align:left !important;
                }
            }
        }
        .order-info{
            .info-content {
                padding: 10px 10px;
            }
        }
    }
    .spaceImg{
        .qrCode{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background:url('../../assets/qr.png') no-repeat center;
            -webkit-filter: blur(2px);
            filter: blur(2px);
            z-index: 10;
        }
        .spaceIcon{
            font-weight:800;
            font-size: 30px;
            color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 11;
            cursor: pointer;
        }
    }
    .tag-modal{
        max-height:220px;
        overflow-y: auto;
    }
    .tag-modal {
        /*.ant-tag:hover {*/
            /*background: #5AA9CD;*/
            /*color: #ffffff;*/
        /*}*/
        /*.ant-tag-checkable{*/
            /*border: 1px solid #d9d9d9;*/
            /*background: #fafafa;*/
        /*}*/
        /*.ant-tag-checkable-checked {*/
            /*background: #5AA9CD;*/
        /*}*/
    }
    .qr-warp{
        width: 100px;
        height: 100px;
        display: inline-block;
        vertical-align: top;
        margin-right: 5px;
        border-radius: 8px;
        position: relative;
        .qr-warp-img{
            width: 100px;
            height: 100px;
            cursor: pointer;
        }
    }
        .modal-text{
            margin-left:13px;font-size:14px;
        }
        .modal-text-other{
            margin-left:2px;font-size:14px;
        }
        .modal-icon{
            color:red;
            font-size:16px;
        }
        .modal-input{
            width:350px;
        }
        .modal-input{
            width:350px;
        }
</style>
<style lang="less">
    .incListDetails{
        .ant-form-item-label{
            text-align:left !important;
        }
        .ant-btn.ant-btn-loading{
            padding-left:0 !important;
            background:#5aa9cd !important;
        }
        .order-modal{
           .ant-modal-body{
               height:276px;
           }
        }
        .ant-table-placeholder{
            border-bottom:1px solid #e8e8e8 !important;
            padding:20px;
        }
        .ant-table-thead > tr > th{
            font-size:14px;
            font-weight:800;
        }
        .info-content-min{
             .ant-table-thead > tr > th{
                padding: 12px 119px 12px 46px;
             }
             .ant-table-body tr td{
                padding: 12px 119px 12px 46px;
            }
        }
    }
</style>
<template>
	<div class="customer-details incListDetails">
        <div class="customer-info-wx clearFloat">
            
            <img class="info-avatar" v-if="detailsType !='2'" :src="contactInfo.avatar?contactInfo.avatar:require('../../assets/defalute.svg')" @error="imgExists($event)" >
            <img class="info-avatar" v-else  src="../../assets/pic.svg" alt="" @error="imgExists($event)">
            <span v-if="detailsType !='2'">
                {{contactInfo.name||'未命名'}}
                <img v-if="!contactInfo.gender" @error="imgExists($event)" class="info-icon" src="../../assets/user1.svg">
                <img v-if="contactInfo.gender === '男'" @error="imgExists($event)" class="info-icon" src="../../assets/user2.svg">
                <img v-if="contactInfo.gender === '女'" @error="imgExists($event)" class="info-icon" src="../../assets/user3.svg">
            </span>
            <span v-else>
                {{contactInfo.room_name}}
            </span>
            <a-button class='info-back' type="default" icon="left" @click="back">返回</a-button>
        </div >
        <div class="customer-min">
        <div class="customer-info" >
            <div class="info-header">
                <span>{{detailsType==='2'?'群信息':'客户信息'}}</span>
                <!-- <a-button class="fr override-ant-btn" v-if="detailsType != '2'" type='primary' @click="edit_save"  >{{editStatus?'保存':'编辑'}}</a-button> -->
            </div>
            <div class="info-content">
                <a-form >
                    <a-row v-if="detailsType != '2'">
                        <a-col :xl='12' :md="12"  :xs="24">
                            <!-- :defaultValue="moment(contactInfo.birth, 'YYYY-MM-DD')" 默认时间 -->
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 ,pull:3}" label='备注'>
                                <span v-if="!editStatus">{{contactInfo.remark}}</span>
                                <a-input v-else v-model="contactInfo.remark" maxlength="8"/>
                            </a-form-item>
                            <!--<a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18  ,pull:3}" label='企业'>-->
                                <!--<span v-if="!editStatus">{{contactInfo.corp_full_name}}</span>-->
                                <!--<a-input v-else v-model="contactInfo.corp_full_name" maxlength="30"/>-->
                            <!--</a-form-item>-->
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 ,pull:3 }" label='电话'>
                                <span v-if="!editStatus">{{contactInfo.remark_mobiles}}</span>
                                <a-tooltip title="最多支持5个号码，并用逗号分隔" placement="top">
                                    <a-input v-if='editStatus' v-model="contactInfo.remark_mobiles"  />
                                </a-tooltip>
                            </a-form-item>
                        </a-col>
                        <a-col :xl='12' :md="12"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18  ,pull:3}" label='企业'>
                                <span v-if="!editStatus">{{contactInfo.corp_full_name}}</span>
                                <a-input v-else v-model="contactInfo.corp_full_name" maxlength="30"/>
                            </a-form-item>
                            <!--<a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 ,pull:3}" label='描述'>-->
                                <!--<p v-if="!editStatus">{{contactInfo.description}}</p>-->
                                <!--<a-textarea v-else :rows="6" v-model="contactInfo.description" maxlength="100"/>-->
                            <!--</a-form-item>-->
                        </a-col>
                    </a-row>
                    <a-row v-else>
                          <a-col :xl='12' :md="12"  :xs="12">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" label="群类型">
                                <span>{{contactInfo.room_type===0||contactInfo.room_type===1||contactInfo.room_type===3?'内部群':'外部群'}}</span>
                                <a-avatar style="vertical-align: text-bottom;margin-left:10px;" :src="require('../../assets/wechat2.png')" :size="24"></a-avatar>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" label="群码">
                                <div class="qr-warp">
                                    <a-tooltip placement="right">
                                        <template slot="title">
                                            <img :src="contactInfo.qr_code" style="width: 300px;height: 300px;border-radius: 5px">
                                        </template>
                                        <img v-if="contactInfo.qr_code"  class="qr-warp-img" @error="imgExists($event)"  :src="contactInfo.qr_code"  alt="">
                                    </a-tooltip>
                                    <div class="spaceImg" v-if="!contactInfo.qr_code"> 
                                        <div class="qrCode"></div>
                                         <a-icon class="spaceIcon" type="reload" @click="updateCode()"/>    
                                    </div>
                                </div>
                            </a-form-item>
                          </a-col>
                          <a-col :xl='12' :md="12"  :xs="24">
                               <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" label="群公告" icon="edit" style="width: 100%" class="room_notice_width">
                                <div class="clr">
                                    <p>{{contactInfo.RoomNotice}}</p>
                                </div>
                            </a-form-item>
                          </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <div class="label-info">
            <div class="info-header">
                <span>{{detailsType!='2'?'客户标签':'群标签'}}</span>
                <a-button class="fr override-ant-btn" type='primary' @click="addTag"  >打标签</a-button>
            </div>
            <div class="info-content" v-if="contactLabel.length">
                <a-tag v-for="(item,index) in contactLabel" :key="item.id"  style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">
                    {{item.title}}
                </a-tag>
            </div>
        </div>

        <div class="customer-info" v-if="detailsType!='2'">
            <div class="info-header">
                <span>其它信息</span>
            </div>
            <div class="info-content">
                <a-form >
                    <a-row>
                        <a-col :xl='24' :md="24"  :xs="24">
                            <a-form-item :labelCol="{ span: 2 }" :wrapperCol="{ span: 18 }" label='客户类型'>
                                <span style="margin-right:10px;">{{contactInfo.type}}</span>
                                <a-avatar style="vertical-align: text-bottom;" :src="contactInfo.type === '企业用户'?require('../../assets/wechat2.png'):require('../../assets/wechat1.svg')" :size="24"></a-avatar>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 2 }" :wrapperCol="{ span: 18 }" label='添加时间'>
                                <span>{{contactInfo.createtime}}</span>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <div class="order-info" >
            <div class="info-header">
                <span>{{detailsType!='2'?'订单信息':'群成员('+ total +')'}}</span>
                <a-button class="fr override-ant-btn" v-if="detailsType!='2'" type='primary' @click="addOrder" >添加</a-button>
                <a-button class="fr override-ant-btn" v-else type="primary" :loading='loadingBtn' @click="getInfo">{{loadingBtn?'':'刷新'}}</a-button>
            </div>
            <div :class="['info-content',detailsType==='2'?'info-content-min':'']">
                <a-table :columns="detailsType!='2'?columns:columns2" :dataSource="orderList" :pagination="false">
                    <template slot="avatar" slot-scope="text, record, index" >
                        <a-avatar :src="text"></a-avatar>
                        <span>{{record.name}}</span>
                        <span v-if="record.remoteId === record.room_owner" style="color:#6BB1D2">(群主)</span>
                        <span v-if="record.type===2" style="color:#FFB952;font-size: 12px;vertical-align: sub;">
                            <em v-if='record.corp_full_name'>@</em>{{record.corp_full_name}}
                        </span>
                    </template>
                    <template slot="type" slot-scope="text, record, index" >
                        <a-avatar :src="text === 1?require('../../assets/wechat1.svg'):require('../../assets/wechat2.png')" ></a-avatar>
                        <span >{{record.type === 1 ? '普通用户' : '企业用户'}}</span>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <div>
                            <!--<a href="javascript:void(0);" @click="editOrder(record)" style="padding-right: 15px;">编辑</a>-->
                            <a-popconfirm title="确定要删除吗？"  @confirm="del(record.id)" okText="确定" cancelText="取消">
                                <a href="javascript:void(0);" style="color: #FE6354">删除</a>
                            </a-popconfirm>
                        </div>
                    </template>
                    <template ></template>
                </a-table>
                <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="orderList.length" >
                   <a-pagination class="col" v-if="orderList.length"     showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
                
            </div>
        </div>
        </div>

        <!--添加标签-->
        <a-modal
                title="选择标签"
                cancelText="取消"
                okText="确定"
                :visible="selectTagFlag"
                @ok="handleTagOk"
                @cancel="selectTagFlag=false"
                :confirmLoading="confirmLoading"
                 width="482px"
        >
            <div class="tag-modal">
                <a-checkable-tag v-for="(item,index) in allLabel"  :key="item.id" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked)" style="margin-bottom: 5px" :class="['tag-color' + item.color_id]">
                    {{item.title}}
                </a-checkable-tag>
            </div>
        </a-modal>
        <!--新建编辑订单modal-->
        <a-modal
                :title="orderTitle"
                cancelText="取消"
                okText="确定"
                :visible="orderFlag"
                @ok="handleOrderOk"
                @cancel="orderFlag=false"
                width='483px'
                :footer='null'
        >
            <div class="order-modal">
            <a-tabs v-model="platFormActive" :tabBarStyle="{'border-bottom':'1px solid #e8e8e8','margin-bottom':'16px'}">
                <a-tab-pane tab="猎鲸平台" key="1"></a-tab-pane>
                <a-tab-pane tab="第三方平台" key="2"></a-tab-pane>
            </a-tabs>
            <div class="order-modal" v-if="platFormActive=='1'">
                <a-form>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='订单号' :required="true">
                        <a-input v-model="orderDetail.order_id" maxlength="30" placeholder="请输入订单号"/>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='产品类别' :required="true">
                        <a-select v-model="orderDetail.goods_type" @change="handleClassChange" placeholder="请选择产品种类">
                            <a-select-option v-for="(item,index) in goodsClass" :key="item.id" >
                                {{item.title}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='产品名称' :required="true">
                        <a-select v-model="orderDetail.goods_id" @change="selectChange" placeholder="请选择产品">
                            <a-select-option v-for="(item,index) in goodsAll" :key="item.id">
                                {{item.title}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='产品数量' :required="true">
                        <a-input v-model="orderDetail.num" maxlength="10" placeholder="请输入产品数量"/>
                    </a-form-item>
                </a-form>
                <div style="padding-bottom: 10px;text-align: right">
                    <a-button @click="orderFlag=false">取消</a-button>
                    <a-button type='primary' style="margin-left: 10px;" @click="handleOrderOk()">确定</a-button>
                </div>
            </div>
            <div v-if="platFormActive=='2'">
                <div>
                    <a-select v-model="queryParam.cl_type" style="width: 100px;margin-right: 20px"  placeholder='选择平台'>
                        <a-select-option  v-for="(item,idx) in platFormList" :key="item.id" >
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                    <a-radio-group name="radioGroup" v-model="queryParam.s_type">
                        <a-radio value="1">平台账号</a-radio>
                        <a-radio value="2">手机号</a-radio>
                        <a-radio value="3">订单号</a-radio>
                    </a-radio-group>
                </div>
                <div style="margin: 15px 0">
                    <a-input-search v-model="queryParam.s_key" :placeholder="queryParam.s_type=='1'?'请输入对应平台账号':queryParam.s_type=='2'?'请输入对应手机号':'请输入对应订单号'" @search="bind">
                        <a-button slot="enterButton" type="primary">绑定</a-button>
                    </a-input-search>
                    <div style="color: #FF9800;margin: 10px 0">
                        <a-icon type="info-circle"/>
                        绑定之前请先确认商城订单是否有上传数据
                    </div>
                </div>
                <div style="height: 176px">
                </div>
            </div>
            </div>
        </a-modal>
	</div>
</template>
<script>
    import moment from 'moment';
    var comConf = require('../../common/comConfig');
	export default {
		name: "newMsg",
		data() {
			return {
                detailsType:this.$route.query.type,
                id:this.$route.query.id,
                userid:this.$route.query.userid,
                heightFlg:false,
                loadingBtn:false,
                contactInfo:{},
                contactLabel:[],
                allLabel:[],
                departmentInfo:{},
                adviser_all:[],
                editStatus:false,
                selectTagFlag:false,
                confirmLoading:false,
                page:1,
                page_size:10,
                total:0,
                platFormActive:'1',
                orderList:[],
                platFormList:[],
                queryParam:{
                    cl_type:'1',
                    s_type:'1',
                    s_key:''
                },
                columns2:[
                    {
                        title:'群成员',
                        align:'left',
                        dataIndex:'avatar',
                        scopedSlots: {
                            customRender: 'avatar'
                        }
                    },
                    {
                        title:'微信号类型',
                        align:'right',
                        dataIndex:'type',
                        scopedSlots:{
                            customRender: 'type'
                        }
                    }
                ],
                columns:[
                    {
                        title: '平台',
                        align:'center',
                        dataIndex: 'cl_type',
                        customRender:function (text, record, index) {
                            return text==1?'订单':text==2?'其它':text==3?'天猫平台':text==4?'淘宝平台':text==5?'京东平台':'有赞平台'
                        }
                    },
                    {
                        title: '订单号',
                        align:'center',
                        dataIndex: 'order_id'
                    },
                    {
                        title: '产品种类',
                        align:'center',
                        dataIndex: 'order_type',
                        customRender:function (text, record, index) {
                            return text==10?'购买':'赠送'
                        }
                    },
                    {
                        title: '产品名称',
                        align:'center',
                        dataIndex: 'title'
                    },
                    {
                        title: '平台账号',
                        align:'center',
                        dataIndex: 'platform_name'
                    },
                    {
                        title: '购买时间',
                        align:'center',
                        dataIndex: 'created'
                    },
                    {
                        title: '买家手机号',
                        align:'center',
                        dataIndex: 'tel'
                    },
                    {
                        title: '价格',
                        align:'center',
                        dataIndex: 'price',
                        customRender:res=>{
                            return this.formatNumberNum(res)
                        }
                    },
                    {
                        title: '数目',
                        align:'center',
                        dataIndex: 'num'
                    },
                    {
                        title: '总金额',
                        dataIndex: 'all_price',
                        align:'center',
                        customRender:res=>{
                            return this.formatNumberNum(res)
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
                orderTitle:'添加订单信息',
                orderFlag:false,
                orderDetail:{
                    goods_id:''
                },
                goodsClass:[],
                goodsAll:[]
			}
		},
		methods: {
            moment,
            formatNumberNum(num){
                let numStr = (num/100).toString();
                let res = ''
                if(numStr.indexOf('.') === -1){
                    res = numStr + '.00'
                }else{
                    res = numStr
                }
                return res
            },
			back() {
                if(this.$route.query.type!=2){
                    this.$router.push({path:'/incCustomerManage/incCustomerList'})
                }else{
                    this.$router.push({path:'/incCustomerManage/incGroupList'})
                }
            },
            getInfo(){
                this.loadingBtn = true
                let data = {
                    cmd:2502,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.$route.query.robotId,
                    cmdData:{
                        remoteId:this.$route.query.id
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2502 = msg =>{
                    console.log(msg)
                    if(msg.status===2){
                        this.loadingBtn = false
                        this.getRoomuSerList()
                        // this.$message.success('已更新!')
                    }
                }
            },
            getLabel(){
            //获取标签  getroomlabellist
                let url;
                if(this.detailsType==='2'){//群
                    url = '/qiyewxapi/getroomlabellist?'
                }else{//个人
                    url = '/qiyewxapi/getlabellist?'
                }
                this.$axios({
                    method: 'POST',
                    url: url,
                    data:{
                        ecms_userid:this.$store.state.user.user.user_id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.allLabel = udata.data
                    }
                });
            },
            getordserlist(){
                this.$axios({
                    method:'POST',
                    url:'/qiyewxapi/getorderlist?',
                    data:{
                        id:this.id,
                        user:this.userid,
                        p:this.page,
                        n:this.page_size   
                    }
                }).then(res=>{
                    if(res){
                        let udata = res.data
                        if(udata.status === 1){
                            this.orderList = udata.data.list
                            this.total = udata.data.total
                        }
                    }
                })
            },
            getDeatials() {
                //获取详情信息
                let url = '';
                let data = {}
                this.detailsType === '2' ? url = '/qiyewxapi/getroominfo?':url = '/qiyewxapi/getexternalinfo?'
                if(this.detailsType === '2'){
                    data = {
                        roomId:this.$route.query.id,
                        userid:this.$route.query.robotId
                    }
                }else{
                    data = {
                        id:this.id,
                        userid:this.userid
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: url,
                    data:data
                }).then(res=> {
                    if(res){
                        let udata = res.data
                        if (udata.status == 1) {
                            this.contactInfo = udata.data
                            this.contactInfo.createtime = comConf.format(this.contactInfo.createtime)
                            this.contactLabel = udata.data.tags
                            this.contactLabel.forEach(el=>{
                                el.showFlag = true
                            })
                        this.getLabel();
                        }else{
                            this.$message.warn(udata.msg)
                        }
                    }
                });
            },
            getRoomuSerList(){
                this.$axios({
                    method:'POST',
                    url:'/qiyewxapi/getroomuser?',
                    data:{
                        roomId:this.$route.query.id,
                        p:this.page,
                        n:this.page_size   
                    }
                }).then(res=>{
                    if(res){
                        let udata = res.data
                        if(udata.status === 1){
                            this.orderList = udata.data.list
                            this.total = udata.data.total
                        }
                    }
                })
            },
            updateCode(){
                let data = {
                cmd:2501,
                fromClientId:this.$store.state.user.user.user_id,
                toClientId:this.$route.query.robotId,
                cmdData:{
                    remoteId:this.$route.query.id
                }
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2501= msg =>{
                    if(msg.status === 2){
                        this.getDeatials()
                        // this.$message.success('已更新')
                    }
                }
            },
            disabledDate(current) {
				return current <  moment('1900-01-01','YYYY-mm-dd').startOf('day')
			},
            edit_save() {
			    if(this.editStatus) {
//			        点击保存按钮 this.editStatus
                    let arr = this.contactInfo.remark_mobiles.replace(/，/g,",").split(',')
                    if(arr.length>5) {
                        this.$message.warning('手机号不能多于5个')
                        return
                    }
                    let flag = false
                    arr.forEach(el=>{
                        if(!/^[0-9]+$/.test(el)&&el!='') {
                            flag = true
                        }
                    })
                    if(flag) {
                        this.$message.warning('请输入正确的手机号码')
                        return
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/qiyewxapi/saveexternal?',
                        data:{
                            userid:this.userid,
                            id:this.id,
                            remark:this.contactInfo.remark,
                            remark_corp_name:this.contactInfo.remark_corp_name,
                            description:this.contactInfo.description,
                            remark_mobiles:this.contactInfo.remark_mobiles
                        }
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success("修改成功")
                            this.editStatus = !this.editStatus
                            this.getDeatials()
                        }else{
                            this.$message.warn(udata.msg)
                        }
                    });
                } else {
//			        点击编辑按钮
                    this.editStatus = !this.editStatus
                }
            },
            addTag() {
                this.allLabel.forEach(el=>{
                    this.contactLabel.forEach(item=>{
                        if(el.id==item.label_id) {
                            el.check = true
                        }
                    })
                })
                this.selectTagFlag = true
            },
            handleTagChange(item,index,checked) {
                item.check = checked
                this.$set(this.allLabel,index,item)
            },
            handleTagOk(){
            //设置标签bia
                let that = this;
                let tagList = []
                this.allLabel.forEach(el=>{
                    if(el.check){
                        tagList.push(el.id)
                    }
                })
                //roomlist 
                let data={}
                if(this.detailsType != '2'){
                    data={
                        userid:this.userid,
                        tagList:tagList,
                        userList:[this.id]
                    }
                }else{  
                    data={
                        userid:this.userid,
                        tagList:tagList,
                        roomlist:[this.id],
                        add_type:1
                    }
                }
                this.$axios({
                    method:'POST',
                    url:'/qiyewxapi/addtag?',
                    data:data
                }).then(res=>{
                    if(res.data.status===1){
                        this.selectTagFlag = false
                        this.allLabel = []
                        this.getDeatials();
                        this.$message.success(res.data.msg)
                    }
                })
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                if(this.$route.query.type!=2){
                    this.getordserlist()
                }else{
                    this.getRoomuSerList();
                }
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                if(this.$route.query.type!=2){
                    this.getordserlist()
                }else{
                    this.getRoomuSerList();
                }
            },
            addOrder(item) {
                this.orderTitle = '添加订单信息'
                this.queryParam={
                    cl_type:'1',
                    s_type:'1',
                    s_key:''
                }
                this.orderDetail = {
                    order_id:'',
                    num:''
                }
                this.orderFlag  =true
                this.getGoodsClass()
                this.getPlatForm()
            },
            getGoodsClass() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/goods-class',
                    params:{department_id:this.department_id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsClass = udata.data
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            handleClassChange(value) {
                this.getGoodsAll(value)
            },
            selectChange(value){
                this.orderDetail.goods_id =value;
            },
            getGoodsAll(classId) {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/class-goods-all',
                    params:{classId:classId}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsAll = udata.data
                        let flag =false
                        if(!this.goodsAll.length) {
                            this.$message.warning('当前类别暂无商品，请先添加商品')
                            return
                        }
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            handleOrderOk() {
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/saveorder?',
                    data:Object.assign(this.orderDetail,{friend_id:this.id})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success(`${this.orderTitle}成功`)
                        this.orderFlag = false
                        this.getordserlist();
                    }else{}
                });
            },
            handAdviserChange(value) {
                this.contactInfo.adviser_id = value
            },
            getPlatForm() {
                //获取电商平台
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/sale/plat-form',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.platFormList = udata.data.list
                        this.queryParam.cl_type  = udata.data.list[0].id
                    }
                });
            },
            bind() {
                //BindOrder
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/bindorder?',
                    data:Object.assign(this.queryParam,{friend_id:this.id,user_id:this.$store.state.user.user.user_id})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success("已绑定！")
                        this.orderFlag = false
                        this.getordserlist()
                    }else {}
                });
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
            del(id) {
                this.$axios({
                    method: 'get',
                    url: '/qiyewxapi/delorder?',
                    params:{id:id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success("删除成功")
                        this.getordserlist()
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
		},
		beforeCreate() {},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		created() {
            this.getDeatials()
            if(this.$route.query.type!=2){
                this.getordserlist()
            }else{
                this.getRoomuSerList();
            }
		},
        beforeDestroy() {
            //window.removeEventListener('resize')  
        }
	}
</script>
