
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
    .customer-details {
        color: rgb(16,16,16);
        position: relative;
        height: calc(~"100vh - 90px");
        overflow: auto;
        .customer-info-wx {
            padding: 10px 25px;
            background: #ffffff;
            span {
                margin-left: 20px;
            }
        }
        .customer-info, .label-info, .order-info {
            background: #ffffff;
            .info-header {
                padding: 10px 25px;
                border-bottom: 2px solid #f0f2f5;
                height: 52px;
                line-height: 32px;
                span {
                    font-size: 16px;
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
            }
        }
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
    .plat-form1 {
        color: #5AA9CD;
    }
    .plat-form3 {
        color: #FE0733;
    }
    .plat-form4 {
        color: #FE5606;
    }
    .plat-form5 {
        color: #E22117;
    }
    .plat-form6 {
        color: #E6090D;
    }
</style>
<template>
	<div class="customer-details">
        <div >
            <a-button type="default" icon="left" @click="back">返回</a-button>
        </div>
        <br>
        <div class="customer-info-wx">
            <!--<a-avatar :src="contactInfo.avatar_url" :size="50" style="border-radius: 10px"/>-->
            <img :src="contactInfo.avatar_url" @error="imgExists($event)" style="width: 48px;height: 48px;border-radius: 5px">
            <span style="font-size: 16px">{{contactInfo.nickname}}</span>
            <span style="color: rgb(136,136,136)">所属部门：{{departmentInfo.name}}</span>
            <!--<span style="color: rgb(136,136,136)">初次到店：{{contactInfo.agree_on}}</span>-->
        </div>
        <br>
        <div class="customer-info">
            <div class="info-header">
                <span>客户信息</span>
                <a-button class="fr" type='primary' @click="edit_save" style="width: 70px" >{{editStatus?'保存':'编辑'}}</a-button>
            </div>
            <div class="info-content">
                <a-form >
                    <a-row>
                        <a-col :xl='6' :md="12"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='微信备注'>
                                <span v-if="!editStatus">{{contactInfo.remark}}</span>
                                <a-input v-else v-model="contactInfo.remark" maxlength="8"/>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='生日'>
                                <span v-if="!editStatus">{{contactInfo.birthTime}}</span>
                                <a-date-picker v-else placeholder="生日"  :defaultValue="contactInfo.birth?moment(contactInfo.birth, 'YYYY-MM-DD'):null"  @change="onChangeBirth" :disabledDate="disabledDate" />
                                <!-- :defaultValue="moment(contactInfo.birth, 'YYYY-MM-DD')" 默认时间 -->
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='会员卡号'>
                                <span v-if="!editStatus">{{contactInfo.cart_number}}</span>
                                <a-input v-else v-model="contactInfo.cart_number" maxlength="30"/>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='客户经理' >
                                <span>{{contactInfo.adviser_name}}</span>
                                <!--<a-select v-else  @change="handAdviserChange" :defaultValue="contactInfo.adviser_id" disabled>-->
                                    <!--<a-select-option v-for="item in adviser_all" :key="item.id">-->
                                        <!--{{item.user_name}}-->
                                    <!--</a-select-option>-->
                                <!--</a-select>-->
                            </a-form-item>
                        </a-col>
                        <a-col :xl='6' :md="12"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='电话'>
                                <span v-if="!editStatus">{{contactInfo.tel}}</span>
                                <!-- <span  v-if="!editStatus" v-for="item in contactInfo.tel " >
                                    {{item}}
                                </span> -->
                                <a-tooltip title="最多支持5个号码，并用逗号分隔" placement="top">
                                <a-input v-if='editStatus' v-model="contactInfo.tel"  />
                                </a-tooltip>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='性别'>
                                <span v-if="!editStatus">{{contactInfo.sex==20?'女':contactInfo.sex==10?'男':''}}</span>
                                <a-radio-group v-else name="radioGroup"  v-model="contactInfo.sex" >
                                    <a-radio value="10">男</a-radio>
                                    <a-radio value="20">女</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='联系地址'>
                                <span v-if="!editStatus">{{contactInfo.detail}}</span>
                                <a-input v-else v-model="contactInfo.detail" maxlength="30"/>
                            </a-form-item>

                        </a-col>
                        <a-col :xl='12' :md="24"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='描述'>
                                <p v-if="!editStatus">{{contactInfo.desc}}</p>
                                <a-textarea v-else :rows="6" v-model="contactInfo.desc" maxlength="100"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <br>
        <div class="label-info">
            <div class="info-header">
                <span>客户标签</span>
                <a-button class="fr" type='primary' @click="addTag" style="width: 70px" >打标签</a-button>
            </div>
            <div class="info-content">
                <!--<a-tag v-for="(item,index) in contactLabel" :closable="true" :key="item.id"  @close="closeTag($event,item,index)" v-model="item.showFlag" style="margin-bottom: 10px">-->
                <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">
                    {{item.label_name}}
                </a-tag>
            </div>
        </div>
        <br>
        <div class="order-info">
            <div class="info-header">
                <span>客户订单</span>
                <a-button class="fr" type='primary' @click="addOrder" style="width: 70px" >新建</a-button>
            </div>
            <div class="info-content">
                <a-table :columns="columns" :dataSource="orderList" :pagination="false">
                    <template slot="platFormType" slot-scope="text, record, index">
                        <div>
                            <span :class="['plat-form' + record.cl_type]">{{record.platform}}</span>
                        </div>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <div>
                            <!--<a href="javascript:void(0);" @click="editOrder(record)" style="padding-right: 15px;">编辑</a>-->
                            <a-popconfirm title="确定要删除吗？"  @confirm="del(record.id)" okText="确定" cancelText="取消">
                                <a href="javascript:void(0);" style="color: #FE6354">删除</a>
                            </a-popconfirm>
                        </div>
                    </template>
                </a-table>
                <br>
                <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
                <br>
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
                @cancel="orderFlag=false"
                :footer="null"
                :bodyStyle="{'padding':'6px 24px'}"
        >
            <a-tabs v-model="platFormActive" :tabBarStyle="{'border-bottom':'1px solid #e8e8e8','margin-bottom':'16px'}">
                <a-tab-pane tab="猎鲸平台" key="1"></a-tab-pane>
                <a-tab-pane tab="第三方平台" key="2"></a-tab-pane>
            </a-tabs>
            <div class="order-modal" v-if="platFormActive=='1'">
                <a-form>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='订单号' :required="true">
                        <a-input v-model="orderDetail.order_id" maxlength="30"/>
                    </a-form-item>
                    <!--<a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='类型'>-->
                        <!--<a-radio-group name="orderGroup"  v-model="orderDetail.order_type">-->
                            <!--<a-radio value="10">购买</a-radio>-->
                            <!--<a-radio value="20">赠送</a-radio>-->
                        <!--</a-radio-group>-->
                    <!--</a-form-item>-->
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='产品类别' :required="true">
                        <a-select v-model="orderDetail.goods_class_id" @change="handleClassChange">
                            <a-select-option v-for="(item,index) in goodsClass" :key="item.id" >
                                {{item.title}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='产品名称' :required="true">
                        <a-select v-model="orderDetail.goods_id" @change="selectChange">
                            <a-select-option v-for="(item,index) in goodsAll" :key="item.id">
                                {{item.title}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='产品数量' :required="true">
                        <a-input v-model="orderDetail.num" maxlength="10"/>
                    </a-form-item>
                    <!--<a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='备注'>-->
                        <!--<a-textarea :rows="3" v-model="orderDetail.desc" maxlength="25"/>-->
                    <!--</a-form-item>-->
                </a-form>
                <div style="padding-bottom: 10px;text-align: right">
                    <a-button @click="orderFlag=false">取消</a-button>
                    <a-button type='primary' style="margin-left: 10px;" @click="handleOrderOk()">确定</a-button>
                </div>
            </div>
            <div v-if="platFormActive=='2'">
                <div>
                    <a-select v-model="queryParam.platFormId" style="width: 100px;margin-right: 20px"  placeholder='选择平台'>
                        <a-select-option  v-for="(item,idx) in platFormList" :key="item.id" >
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                    <a-radio-group name="radioGroup" v-model="queryParam.bindType">
                        <a-radio value="1">平台账号</a-radio>
                        <a-radio value="2">手机号</a-radio>
                        <a-radio value="3">订单号</a-radio>
                    </a-radio-group>
                </div>
                <div style="margin: 15px 0">
                    <a-input-search v-model="queryParam.key" :placeholder="queryParam.bindType=='1'?'请输入对应平台账号':queryParam.bindType=='2'?'请输入对应手机号':'请输入对应订单号'" @search="bind">
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
                id:this.$route.query.id,
                department_id:this.$route.query.department_id,
                user_id:this.$route.query.user_id,
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
                orderList:[],
                columns:[
                    {
                        title: '平台',
                        dataIndex:'platFormType',
                        align:'center',
                        scopedSlots: {
                            customRender: 'platFormType'
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
                        dataIndex:'class_name',
                    },
                    {
                        title: '产品名称',
                        align:'center',
                        dataIndex: 'product_name'
                    },
                    {
                        title: '购买时间',
                        align:'center',
                        dataIndex: 'created'
                    },
                    {
                        title: '平台账号',
                        align:'center',
                        dataIndex:'platform_name',
                    },
                    {
                        title: '买家手机号',
                        align:'center',
                        dataIndex:'tel',
                    },
                    {
                        title: '价格',
                        align:'center',
                        dataIndex: 'single_price'
                    },
                    {
                        title: '数目',
                        align:'center',
                        dataIndex: 'num'
                    },
                    {
                        title: '总金额',
                        align:'center',
                        dataIndex:'all_price',
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
                orderTitle:'新建订单',
                orderFlag:false,
                orderDetail:{
                    goods_id:'',
                    order_type:'10'
                },
                goodsClass:[],
                goodsAll:[],
                platFormActive:'1',
                queryParam:{
                    platFormId:'1',
                    bindType:'1',
                    key:''
                },
                platFormList:[],
			}
		},
		methods: {
            moment,
			back() {
				this.$router.back(-1)
			},
            getOrderList() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/order-list',
                    params:{id:this.id,p:this.page,n:this.page_size}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.orderList = udata.data.list
                        this.total = parseInt(udata.data.count)
                    }
                });
            },
            getDeatials() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/friend-details',
                    params:{id:this.id,department_id:this.department_id,user_id:this.user_id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.contactInfo = udata.data.info
                        this.contactInfo.tel = this.contactInfo.tel[this.contactInfo.tel.length-1] === ','?this.contactInfo.tel.substring(0,this.contactInfo.tel.length-1):this.contactInfo.tel
                        this.contactLabel = udata.data.label_own
                        this.allLabel = udata.data.label_all
                        this.departmentInfo = udata.data.department_own
                        this.adviser_all = udata.data.adviser_all
                        if(udata.data.adviser_own=='') {
                            this.contactInfo.adviser_id=  ''
                            this.contactInfo.adviser_name=  ''
                        } else {
                            this.contactInfo.adviser_id=  udata.data.adviser_own.id
                            this.contactInfo.adviser_name=  udata.data.adviser_own.user_name
                        }
                        this.contactLabel.forEach(el=>{
                            el.showFlag = true
                        })
                        if(this.contactInfo.birth=='0000-00-00') {
                            //let date1 = new Date()  date1.getFullYear() + '-' + (parseInt(date1.getMonth()) + 1) +'-' + date1.getDate()
                            this.contactInfo.birth = ''
                            this.contactInfo.birthTime = ''
                        } else {
                            this.contactInfo.birthTime = this.contactInfo.birth
                        }
                    }
                });
            },
            onChangeBirth(date, dateString) {
                this.contactInfo.birth = dateString;
            },
            disabledDate(current) {
				return current <  moment('1900-01-01','YYYY-mm-dd').startOf('day')
			},
            edit_save() {
			    if(this.editStatus) {
//			        点击保存按钮 this.editStatus
                    let arr = this.contactInfo.tel.replace(/，/g,",").split(',')
                    if(arr.length>5) {
                        this.$message.warning('手机号不能多于5个')
                        return
                    }
                    if(!this.contactInfo.birth){
                        this.contactInfo.birth =  ''
                        //this.$refs.datePick.$children[0].$children[0].setState({sValue:[]})
                        //this.$message.warning('生日不能为空')
                        // return
                    }
                    let flag = false
                    arr.forEach(el=>{
//                        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/.test(el)&&el!='') {
                        if(!/^[0-9]+$/.test(el)&&el!='') {
                            flag = true
                        }
                    })
                    if(flag) {
                        this.$message.warning('请输入正确的手机号码')
                        return
                    }
                    comConf.isOfflineRobot(this.contactInfo.assistant_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                    let data = {
                        cmd:2041,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:this.contactInfo.assistant_username,
                        cmdData:{
                            username:this.contactInfo.username,
                            remark :this.contactInfo.remark,
                            phone :this.contactInfo.tel.replace(/，/g,",").split(','),
                            desc : this.contactInfo.desc
                        }
                    }
                    this.$ws.sendMsgFun(data)
                    this.$ws.cmd2041 = msg=> {
                        if(msg.status==4) {
                            this.$notification.warning({
                                message: h=>{
                                    return h('div', {
                                        domProps: {
                                            innerHTML:msg.callbackMsg
                                        },
                                    })
                                },
                                description: '暂无法执行操作，请检查手机连接状态',
                                duration: 2,
                                style:{
                                    background:'#fbf8e9'
                                }
                            });
                        }
                    }
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/customer/friend-edit',
                        data:Object.assign(this.contactInfo,{route_id:'160'})
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success("修改成功")
                            this.editStatus = !this.editStatus
                            this.getDeatials()
                        }
                    });
                } else {
//			        点击编辑按钮
                    this.editStatus = !this.editStatus
                }
            },
            closeTag(e,item,index) {
                let _this =this;
                e.preventDefault()
                comConf.isOfflineRobot(this.contactInfo.assistant_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let msg = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.contactInfo.assistant_username,
                    cmdData:{
                        username:this.contactInfo.username,
                        labels:[item.label_name]
                    }
                }
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2040 = msg=> {
                    if(msg.status==2) {
                        item.showFlag = false
                        _this.$set(_this.contactLabel,index,item)
                        _this.$message.success('删除成功')
                    }else if(msg.status==4) {
                        _this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }
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
            handleTagOk() {
                let _this =this
                this.confirmLoading = true
                let selectTag = []
                this.allLabel.forEach(el=>{
                    if(el.check) {
                        selectTag.push(el.id+'_'+el.title)
                    }
                })
                comConf.isOfflineRobot(this.contactInfo.assistant_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                let msg_add = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.contactInfo.assistant_username,
                    cmdData:{
                        username:this.contactInfo.username,
                        labels:selectTag
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(msg_add)
                this.$ws.cmd2040 = msg=> {
                    if(msg.status==2) {
                        this.selectTagFlag=false
                        this.confirmLoading = false
                        this.$message.success('设置标签成功')
                        _this.getDeatials()
                    }else if(msg.status==4) {
                        _this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }else {
                        this.selectTagFlag=false
                        this.confirmLoading = false
                    }
                }
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getOrderList()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getOrderList()
            },
            addOrder(item) {
                this.orderTitle = '新建订单'
                this.orderFlag  =true
                this.orderDetail = {
                    id:'',
                    order_time:'',
                    desc:'',
                    order_type:'10'
                }
                this.queryParam.key = ''
                this.queryParam.bindType = '1'
                this.getGoodsClass()
                this.getPlatForm()
            },
            editOrder(item) {
                this.orderTitle = '编辑订单'
                this.orderFlag  =true
                this.orderDetail = item
                this.getGoodsClass()
                this.getGoodsAll(item.goods_class_id)
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
                        // this.goodsAll.forEach(el=>{
                        //     if(el.id == this.orderDetail.goods_id) {
                        //         flag = true
                        //     }
                        // })
                        // !flag&&(this.orderDetail.goods_id = this.goodsAll[0].id)
                    }
                });
            },
            handleOrderOk() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/order-add',
                    data:Object.assign(this.orderDetail,{friends_id:this.contactInfo.id})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success(`${this.orderTitle}成功`)
                        this.orderFlag = false
                        this.getOrderList()
                    }
                });
            },
            handAdviserChange(value) {
                this.contactInfo.adviser_id = value
            },
            del(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/order-del',
                    data:{id:id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success("删除成功")
                        this.getOrderList()
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
            getPlatForm() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/sale/plat-form',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.platFormList = udata.data.list
                        this.queryParam.platFormId  = udata.data.list[0].id
                    }
                });
            },
            bind() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/bind-friends-order',
                    data:Object.assign(this.queryParam,{friends_id:this.contactInfo.id})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success("已绑定！")
                        this.orderFlag = false
                        this.getOrderList()
                    }else {
                        this.$message.warning(udata.msg)
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
            this.getOrderList()
		},
        beforeDestroy() {
            this.$ws.cmd2040 = null
            this.$ws.cmd2041 = null
        },
	}
</script>
