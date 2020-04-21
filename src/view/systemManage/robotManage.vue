<template>
    <div class="background-color robotManage">
        <a-row>
            <a-col span="24" style="padding-right: 20px;">
                <div class="col-margin">
                    <a-form layout="inline" :form="form">
                        <a-form-item label="选择部门">
                            <a-select v-model="queryParam.department_id" @change="onSelect"  style="width: 200px;"  placeholder='选择部门'>
                                <a-select-option  v-for="(item,idx) in departmentList" :key="item.id" >
                                    {{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="选择用户">
                            <a-select v-model="queryParam.user_id" @change="managerChange"  style="width: 200px;"  placeholder='选择用户'>
                                <a-select-option  v-for="(item,idx) in managerList" :key="item.id" >
                                    {{item.user_name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item>
                            <a-radio-group name="radioGroup" @change="selectRaio"  v-model="queryParam.type">
                                <a-radio value="0" >全部</a-radio>
                                <a-radio value="1" >未连接</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item>
                            <a-input-search v-model="queryParam.key" placeholder="输入微信昵称" style="width: 200px" @search="search" enterButton/>
                        </a-form-item>
                        <div style="float: right">
                            <a-form-item>
                                <a-button type="primary" style="margin-right:4px;" @click="refreshGroup()">刷新</a-button>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" style="margin-right:4px;background: #FF9800;border: none" @click="bindAuth()">下载App</a-button>
                            </a-form-item>
                        </div>



                        <!--<a-form-item>-->
                        <!--<a-input placeholder="请输入机器人编号、昵称、手机号" v-model="searchKey" style="width: 300px;" />-->
                        <!--</a-form-item>-->
                        <!--<a-form-item>-->
                        <!--<a-select @change="handleLabelChange"  style="width: 200px;"  placeholder='请选择客户经理'>-->
                        <!--<a-select-option  v-for="(item,idx) in managerList" :key="item.id">-->
                        <!--{{item.user_name}}-->
                        <!--</a-select-option>-->
                        <!--</a-select>-->
                        <!--</a-form-item>-->
                        <!--<a-form-item>-->
                        <!--<a-radio-group name="radioGroup" @change="selectRaio"  v-model="tagel"> -->
                        <!--<a-radio :value="0" >全部</a-radio>-->
                        <!--<a-radio :value="1" >微信状态异常</a-radio>-->
                        <!--<a-radio :value="2">App非最新版本</a-radio>-->
                        <!--</a-radio-group>-->
                        <!--</a-form-item>-->
                        <!--<a-form-item>-->
                        <!--<a-button type="primary" style="margin-right:4px;" @click="search">搜索</a-button>-->
                        <!--</a-form-item>-->
                        <!--<a-form-item>-->
                        <!--<div class="ant-alert">-->
                        <!--<a-icon type="info-circle" theme="twoTone" class="circle_icon" />-->
                        <!--&lt;!&ndash;<span class="ant-info">总共 {{robotStatus.total}} 台机器  正常 {{robotStatus.normal}} 台    告警 {{robotStatus.alarm}} 台   故障 {{robotStatus.fault}} 台 </span>&ndash;&gt;-->
                        <!--<span class="ant-info">总共 {{robotStatus.total}} 台机器  正常 {{robotStatus.normal}} 台   故障 {{robotStatus.fault}} 台 </span>-->
                        <!--</div>-->
                        <!--</a-form-item>-->
                    </a-form>
                </div>
                <div class="tab">
                    <!--<p>-->
                    <!--<a-button @click="upList" type="primary">刷新</a-button>-->
                    <!--<a-button type="primary"  @click="collocationAll">设置托管</a-button>-->
                    <!--</p>-->
                    <!--<a-table :loading='loading' :columns="columns" :dataSource="robotList" :pagination="false" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id"-->
                    <!--:customRow="customRow" :locale="locale"-->
                    <!--&gt;-->
                    <!--<template slot="avatar_url" slot-scope="text, record, index">-->
                    <!--<div>-->
                    <!--<img :src="text" @error="imgExists($event)" style="width: 48px;height: 48px;border-radius: 5px">-->
                    <!--</div>-->
                    <!--</template>-->
                    <!--<template slot="status" slot-scope="text, record, index">-->
                    <!--<div style="position: relative;">-->
                    <!--<a-badge status="success" v-if="text=='1'" text='正常'></a-badge>-->
                    <!--&lt;!&ndash;<a-badge status="warning" v-else="text==1" text='故障'></a-badge>&ndash;&gt;-->
                    <!--<a-badge status="error" v-else text='故障'></a-badge>-->
                    <!--</div>-->
                    <!--</template>-->
                    <!--<template slot="action" slot-scope="text, record, index">-->
                    <!--<div style="text-align:center;">-->
                    <!--<a href="javascript:void(0);" @click="deposit($event,record)"   style="text-align:center;margin-right:10px" >{{record.hosting=='0'?'开启托管':'关闭托管'}}</a>-->
                    <!--<a href="javascript:void(0);" @click="voiceRecording($event,record)"   style="text-align:center">{{record.tel_button=='0'?'开启通话录音':'关闭通话录音'}}</a>-->
                    <!--</div>-->
                    <!--</template>-->
                    <!--</a-table>-->

                    <a-table ref="table" :columns="columns" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="robotList" :pagination="false" :loading='loading'   type="checkbox"   :scroll="{y:sheight,x:false}">
                        <template slot="avatar_url" slot-scope="text, record, index">
                            <div>
                                <img :src="text" @error="imgExists($event)" style="width: 30px;height: 30px;border-radius: 5px">
                                <span>{{record.nickname}}</span>
                            </div>
                        </template>
                        <template slot="user" slot-scope="text, record, index">
                            <div>
                                <img v-if="!!record.user_avatar" :src="record.user_avatar"  style="width: 30px;height: 30px;border-radius:100%">
                                <span>{{record.user}}</span>
                            </div>
                        </template>
                        <template slot="status" slot-scope="text, record, index">
                            <div>
                                <div v-if="text=='1'">
                                    <span style="width: 10px;height: 10px;display: inline-block;border-radius: 50%;vertical-align: middle;background: #259B24;margin-right: 5px"></span>
                                    <span>已连接</span>
                                </div>
                                <div v-else>
                                    <span style="width: 10px;height: 10px;display: inline-block;border-radius: 50%;vertical-align: middle;background: #BCBCBD;margin-right: 5px"></span>
                                    <span>未连接</span>
                                </div>
                            </div>
                        </template>
                        <!--<template slot="tel_button" slot-scope="text, record, index">-->
                            <!--<div>-->
                                <!--<a-switch v-model="record.tel_button" @change="voiceRecording($event,record)" />-->
                            <!--</div>-->
                        <!--</template>-->

                        <template slot="action" slot-scope="text, record, index">
                            <div>
                                <a href="javascript:void(0);" @click="assign(record)"   style="text-align:center;margin-right:10px;color: #5AA9CD" >分配</a>
                                <!--<span v-if="record.ecms_status=='1'" style="text-align:center">-->
                                <!--<a-popconfirm title="你确定取消分配吗？" placement="top" @confirm="cancelAssign(record)" okText="确定" cancelText="取消">-->
                                <!--<a href="javascript:void(0);" style="color: #FE6354;">取消分配</a>-->
                                <!--</a-popconfirm>-->
                                <!--</span>-->
                                <a href="javascript:void(0);" @click="upInfo(record)"   style="text-align:center;margin-right:10px;color: #5AA9CD" >同步</a>
                                <a href="javascript:void(0);" @click="edit(record.id)"   style="text-align:center;margin-right:10px;color: #5AA9CD" >详情</a>
                                <a href="javascript:void(0);" @click="showLog(record)" style="text-align:center;margin-right:10px;color: #5AA9CD" >日志</a>
                                <span style="text-align:center;color: #FE5606;">
									<a-popconfirm title="你确定移除吗？" placement="top" @confirm="del(record)" okText="确定" cancelText="取消">
										<a href="javascript:void(0);" style="color: #FE6354;">移除</a>
									</a-popconfirm>
								</span>
                            </div>
                        </template>
                    </a-table>
                    <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!robotList.length"></data-status> -->
                    <div ref="bottomPage">
                        <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="robotList.length" >
                            <a-pagination v-if="robotList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                        </div>
                    </div>

                </div>
            </a-col>
            <!--<a-col span="4" style="padding:0 20px; border-left:1px dashed #dcdcdc ;height:calc(100vh - 90px);">-->
            <!--<div class="robot_detail">-->
            <!--<div class="handler clearFloat">-->
            <!--<div class=" title">{{robot_detail_robot.mobile_serial_name}}</div>-->
            <!--<div >-->
            <!--<a-button type='primary' :disabled="!robot_detail_robot.id"  @click="edit(robot_detail_robot.id)" style="margin-right: 10px;margin-bottom:10px;">编辑</a-button>-->
            <!--<a-button type='primary' :disabled="!robot_detail_robot.id" @click="upInfo(robot_detail_robot.username)">更新</a-button>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div class="card" >-->
            <!--<div class="head_pic clearFloat" >-->
            <!--<div class="h_text fl">-->
            <!--<span class="label">头像：</span>-->
            <!--<div class="img">-->
            <!--<img :src="robot_detail_robot.avatar_url" />-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="fr avatar" v-if="!!robot_detail_robot.qrcode" >-->
            <!--&lt;!&ndash; <img :src="robot_detail_robot.qrcode" style="position:relative;"/>-->
            <!--<div style="position:absolute;left:-200px;width:200pxtop:0;border:1px solid #ccc;padding:10px;">-->
            <!--<img :src="robot_detail_robot.qrcode" />-->
            <!--</div> &ndash;&gt;-->
            <!--<a-tooltip placement="left" >-->
            <!--<template slot="title">-->
            <!--<span>-->
            <!--<img :src="robot_detail_robot.qrcode" />-->
            <!--</span>-->
            <!--</template>-->
            <!--<div class="img">-->
            <!--<img :src="robot_detail_robot.qrcode" />-->
            <!--</div>-->
            <!--</a-tooltip>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="card_dec">-->
            <!--<span class="label">昵称：</span>-->
            <!--<span class="desc">{{robot_detail_robot.nickname}}</span>-->
            <!--</div>-->
            <!--<div class="card_dec">-->
            <!--<span class="label">wxid：</span>-->
            <!--<span class="desc">{{robot_detail_robot.username}}</span>-->
            <!--</div>-->
            <!--<div class="card_dec">-->
            <!--<span class="label">手机号码：</span>-->
            <!--<span class="desc">{{robot_detail_robot.tel}}</span>-->
            <!--</div>-->

            <!--<div class="card_dec">-->
            <!--<span class="label">机器标签：</span>-->
            <!--<a-tag v-for="(item,index) in robot_detail_label" :key="index" style="margin-bottom: 10px" :class="['tag-color' + item.color_id]">-->
            <!--{{item.title}}-->
            <!--</a-tag>-->
            <!--&lt;!&ndash;<span class="label_btn" v-for="item in robot_detail_label">&ndash;&gt;-->
            <!--&lt;!&ndash;{{item.title}}&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->

            <!--<div class="info_box">-->
            <!--&lt;!&ndash;<div class="in_detail">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="label">电量：</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="desc">{{robot_detail_robot.batterylevel}}%</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="in_state">{{robot_detail_robot.chargeInfo==1?'在充电':'未充电'}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="in_detail">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="label">可用CPU：</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="desc">{{robot_detail_robot.cpu}}%</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="in_detail">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="label">剩余内存：</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="desc">{{robot_detail_robot.memory}}%</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="in_detail">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="label">可用磁盘：</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="desc">{{robot_detail_robot.disk}}%</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<div class="in_detail" style="padding-bottom: 0">-->
            <!--<span class="label">上次心跳：</span>-->
            <!--<span class="desc">{{robot_detail_robot.active_time}}</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="info_box">-->
            <!--<p>托管信息</p>-->
            <!--<div>-->
            <!--<p>欢迎语</p>-->
            <!--<div>-->
            <!--<a-tag v-for="(item,index) in robot_detail_welcome" :key="item.id" style="margin-bottom: 10px">-->
            <!--{{item.name}}-->
            <!--</a-tag>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div>-->
            <!--<p>关键词回复</p>-->
            <!--<div>-->
            <!--<a-tag v-for="(item,index) in robot_detail_reply" :key="item.id" style="margin-bottom: 10px">-->
            <!--{{item.class_name}}-->
            <!--</a-tag>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</a-col>-->
        </a-row>
        <!--<a-modal title="托管" :visible="collocation_visible" @cancel="collocation_visible=false" width="50%" @ok="handleTagOk">-->
        <!--<div>-->
        <!--<span>欢迎语：</span>-->
        <!--<div class="tag-modal">-->
        <!--<a-checkable-tag v-for="(item,index) in welcomeList"  :key="index" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked,'1')">-->
        <!--{{item.name}}-->
        <!--</a-checkable-tag>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div style="margin-top: 50px">-->
        <!--<span>关键词回复：</span>-->
        <!--<div class="tag-modal">-->
        <!--<a-checkable-tag v-for="(item,index) in replyList"  :key="index" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked,'2')">-->
        <!--{{item.class_name}}-->
        <!--</a-checkable-tag>-->
        <!--</div>-->
        <!--</div>-->
        <!--</a-modal>-->
        <!-- <a-modal title="选择标签"  :visible="com_visible" @cancel="com_handleCancel" width="50%" style="padding-bottom:20px">
            <div class="tagContent">
                <div class="welMsg">
                    <p class="tagTitle">选择欢迎语</p>
                    <div >
                        <span class="tag" >    添加标签
                        <a-icon type="plus" class="tag-close"  @click="addTag('3')"></a-icon>
                        </span>
                    </div>
                 </div>
                 <div>
                     <p class="tagTitle">选择关键字</p>
                    <div>
                        <span class="tag" >    添加标签
                        <a-icon type="plus" class="tag-close"  @click="addTag('3')"></a-icon>
                        </span>
                    </div>
                 </div>
            </div>
        </a-modal> -->
        <a-modal title="下载App" :visible="bindVisible" @cancel="bindVisible=false" :footer="null" :width="330">
            <div v-if="bindQrcode==''&urlCode==''" style="text-align:center;">
                <a-button type="primary" style="background: #5AA9CD;border: none;margin:20px;" @click="bindUrl()">获取下载链接</a-button>
            </div>
            <div v-else>
                <div style="text-align: center">
                    <img :src="bindQrcode" alt="" style="width: 200px;height: 200px;">
                </div>
                <div>
                    <p class="blueText">如何下载：</p>
                    <p class="grayText">1、手机端扫码下载App、登录微信完成绑定！</p>
                    <p class="grayText">2、或输入下载地址安装，登录微信完成绑定！</p>
                    <p class="blueText" style="margin-top:20px">下载地址：<span class="grayText">{{urlCode}}</span></p>
                </div>
            </div>
        </a-modal>

        <a-modal title="分配用户" :footer="null" :visible="visible" @cancel="com_handleCancel">
            <a-form :form="form">
                <a-form-item :wrapperCol="{span: 24}" label="选择部门：">
                    <a-select v-model="assignParam.department_id" @change="assignSelect"  placeholder='选择部门'>
                        <a-select-option  v-for="(item,idx) in assignDepartmentList" :key="item.id" >
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :wrapperCol="{span: 24}" label="选择用户：">
                    <a-select v-model="assignParam.user_id"  placeholder='选择用户'>
                        <a-select-option  v-for="(item,idx) in assignManageList" :key="item.id" >
                            {{item.user_name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
                    <a-button @click="com_handleCancel">取消</a-button>
                    <a-button :loading="modalLoading" @click="com_handleOk" type='primary'  style="margin-left: 10px;">确定</a-button>
                </a-form-item>
            </a-form>
        </a-modal>

        <!--日志-->
        <a-modal :title="logTitle" :footer="null" :visible="logVisible" @cancel="logVisible=false">
            <div>
                <div style="text-align: right;margin-bottom: 10px">
                    <a-radio-group v-model="logType" size="small" @change="logTypeChange()">
                        <a-radio-button value="1">昨日</a-radio-button>
                        <a-radio-button value="2">今日</a-radio-button>
                        <a-radio-button value="3">最近七日</a-radio-button>
                    </a-radio-group>
                </div>

                <div style="max-height: 300px;overflow-y: auto" ref="logListContent">
                    <a-table
                            :columns="logColumns"
                            :dataSource="logList"
                            :pagination="false"
                    >
                        <template slot="status" slot-scope="text, record, index">
                            <div>
                                <span :style="{'color':text=='连接'?'#8BC34A':'#FE5606'}">{{text}}</span>
                            </div>
                        </template>
                    </a-table>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
    var storage = require("../../common/store");
    import dataStatus from '../../components/pageConfig/dataStatus'
    var comConf = require('../../common/comConfig');
    export default {
        name: "robotManage",
        components: {
            dataStatus
        },
        data() {
            return {
                form: this.$form.createForm(this),
                robotStatus:{},
                tagel:0,
                collocation_visible:false,
                robotList: [],
                departmentList:[],
                managerList:[],
                robot_detail_robot:{},
                robot_detail_label:[],
                robot_detail_welcome:[],
                robot_detail_reply:[],
                searchKey:'',
                userId:'',
                loading:true,
                selectIndex:0,
                selectedRowKeys:[],
                replyList:[],
                welcomeList:[],
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                columns:[
                    {
                        title: '编号',
                        align:'center',
                        width:50,
                        dataIndex: 'mobile_serial_name'
                    },
                    {
                        title: '微信号',
                        align:'left',
                        width:100,
                        dataIndex: 'avatar_url',
                        scopedSlots: {
                            customRender: 'avatar_url'
                        }
                    },
                    {
                        title: '所属部门',
                        align:'left',
                        width:100,
                        dataIndex:'department',
                    },
                    {
                        title: '所属用户',
                        align:'left',
                        width:100,
                        dataIndex: 'user',
                        scopedSlots: {
                            customRender: 'user'
                        }
                    },
                    {
                        title: '心跳状态',
                        align:'center',
                        width:100,
                        dataIndex: 'status',
                        scopedSlots: {
                            customRender: 'status'
                        }
                    },
                    {
                        title: 'App版本',
                        align:'center',
                        width:100,
                        dataIndex:'vision',
                    },
//                    {
//                        title: '通话录音',
//                        align:'center',
//                        dataIndex:'tel_button',
//                        scopedSlots: {
//                            customRender: 'tel_button'
//                        }
//                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'center',
                        width:140,
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                bindVisible:false,
                bindQrcode:'',
                urlCode:'',
                queryParam:{
                    user_id:'',
                    key:'',
                    department_id:'',
                    type:'0'
                },
                assignParam:{
                    user_id:'',
                    department_id:''
                },
                assignDepartmentList:[],
                assignManageList:[],
                page_size:10,
                page:1,
                total:0,
                sheight:'',
                heightFlg:false,
                modalLoading:false,
                assignRecord:'',
                visible:false,
                logTitle:'',
                logVisible:false,
                logType:'2',
                logAssistantId:'',
                logList:[],
                logColumns:[
                    {
                        title: '时间',
                        align:'left',
                        dataIndex: 'created'
                    },
                    {
                        title: '连接状态',
                        align:'center',
                        dataIndex: 'status',
                        scopedSlots: {
                            customRender: 'status'
                        }
                    },
                ],
                logListPage:1,
                logListScrollFlag:false,
            }
        },

        mounted() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
            window.addEventListener('resize',this.autoHeight,false)
        },
        updated() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
        },
        computed: {
            departmentID() {
                return this.$store.state.user.user.department.id //返回store实例的count状态
            },
        },
        watch:{
            robotList:function(){
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
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys
            },
            collocationAll(){
                if(this.selectedRowKeys.length==0) {
                    this.$message.warning('请选择对应的机器人')
                    return
                }
                this.welcomeList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.replyList.forEach(el=>{
                    this.$set(el,'check',false)
                })
                this.getWelcomeList()
                this.getReplyList()
                this.collocation_visible = true;
            },
            handleTagChange(item,index,checked,type) {
                if(type=='1') {
                    this.welcomeList.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.welcomeList[index],'check',checked)
                } else if(type=='2') {
                    this.replyList.forEach(el=>{
                        this.$set(el,'check',false)
                    })
                    this.$set(this.replyList[index],'check',checked)
                }
            },
            getWelcomeList() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/welcome-list',
                    params:{
                        departmentId:this.$store.state.user.user.department.id,
                        all:'1',
                        type:'10'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.welcomeList = udata.data.list
                        if(this.selectedRowKeys.length==1) {
                            let id= ''
                            this.robotList.forEach(el=>{
                                if(el.id==this.selectedRowKeys[0]) {
                                    id = el.welcome.list[0].id
                                }
                            })
                            this.welcomeList.forEach(el=>{
                                if(el.id==id) {
                                    this.$set(el,'check',true)
                                }
                            })
                        }
                    }
                });
            },
            getReplyList() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/reply-list',
                    params:{
                        departmentId:this.$store.state.user.user.department.id,
                        all:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.replyList = udata.data.list
                        if(this.selectedRowKeys.length==1) {
                            let id= ''
                            this.robotList.forEach(el=>{
                                if(el.id==this.selectedRowKeys[0]) {
                                    id = el.auto_reply.list[0].id
                                }
                            })
                            this.replyList.forEach(el=>{
                                if(el.id==id) {
                                    this.$set(el,'check',true)
                                }
                            })
                            this.$forceUpdate()
                        }
                    }
                });
            },
            handleTagOk() {
                let _this =this
                let welcomeId = []
                let replyId =[]
                this.welcomeList.forEach(el=>{
                    if(el.check) {
                        welcomeId.push(el.id)
                    }
                })
                this.replyList.forEach(el=>{
                    if(el.check) {
                        replyId.push(el.id)
                    }
                })
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/bind-room',  //机器人shezhituoguan
                    data:{
                        assistantId:this.selectedRowKeys,
                        welcomeId:welcomeId[0],
                        replyId:replyId[0],
                        type:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.collocation_visible=false
                        this.$message.success('设置成功')
                        this.refreshGroup();
                    }
                });
            },
            deposit(e,record){
                e.stopPropagation();
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/assistant-switch',
                    data:{
                        assistantId:record.id,
                        status:record.hosting=='1'?'10':'0'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$set(record,'hosting',record.hosting=='1'?'0':'1')
                    }
                });

            },
            voiceRecording(check,record){
                let off = record.tel_button ? 1: 0;
                let that = this;
                let data = {
                    cmd:2064,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:record.username,
                    cmdData:{
                        state:off
                    }
                }
                // comConf.isOfflineRobot(username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2064 = msg=>{
                    if(msg.status === 3){
                        that.refreshGroup()
                    }
                }
            },
            handleLabelChange(val){
                console.log(val)
                this.userId = val;
            },
            upList(){
                this.loading = true;
                this.refreshGroup();
            },
            com_handleCancel(){
                this.com_visible = false;
            },
            onSearch(value) {
                this.searchKey = value;
                this.refreshGroup();
            },
            edit(id){
                this.$router.push({path:'/systemManage/editRobot',query:{'id':id}});
            },
            upInfo(record) {
                let username = record.username
//                let data = {
//                    cmd:2002,
//                    fromClientId:this.$store.state.user.user.user_id,
//                    toClientId:username
//                }
//                comConf.isOfflineRobot(username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
//                this.$ws.sendMsgFun(data)
//				if(!record.qrcode) {
//                    let data1 = {
//                        cmd:2032,
//                        fromClientId:this.$store.state.user.user.user_id,
//                        toClientId:username
//                    }
//                    this.$ws.sendMsgFun(data1)
//				}
//                this.$ws.cmd2002 = msg=>{
//                    if(msg.status==2) {
//                        this.$message.success('基本信息已更新，需要刷新页面获取最新信息')
//                    }else if(msg.status==4) {
//                        this.$notification.warning({
//                            message: h=>{
//                                return h('div', {
//                                    domProps: {
//                                        innerHTML:msg.callbackMsg
//                                    },
//                                })
//                            },
//                            description: '暂无法执行操作，请检查手机连接状态',
//                            duration: 2,
//                            style:{
//                                background:'#fbf8e9'
//                            }
//                        });
//                    }
//                }
                if(record.sync==0) {
                    this.$ws.sendMsgFun({
                        cmd:2997,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:username
                    })
                    this.$set(record,'sync',1)
                }else {
                    this.$message.warn('好友列表和群列表30分钟内只能同步一次')
                }
            },
            getRobotInfo(id,index){
                this.selectIndex = index
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/robot-detail',
                    data: Object.assign({}, {
                        'robot_id': id,
                    }) // 参数
                }).then(function(d) {
                    // 响应成功回调
                    var udata = d.data;
                    if(udata.status == 1) {
                        that.robot_detail_robot = udata.data.robot;
                        that.robot_detail_robot.avatar_url = that.robot_detail_robot.avatar_url || 'http://roomfission.youdd.wang/Ecms_16_1553074374.jpg'
                        that.robot_detail_label = udata.data.robotLabel;
                        that.robot_detail_welcome = udata.data.welcome.list
                        that.robot_detail_reply = udata.data.auto_reply.list
                    }
                });

            },
            refreshGroup() {
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/robot',
                    data: Object.assign({p:this.page,n:this.page_size}, this.queryParam) // 参数
                }).then(function(d) {
                    // 响应成功回调
                    var udata = d.data;
                    if(udata.status == 1) {
                        that.robotList = udata.data.robotList;
                        that.total = parseInt(udata.data.robotStatus.total)
                        that.robotList.forEach(el=>{
                            el.tel_button = el.tel_button=='1'?true:false
                        })
                        that.bindQrcode = udata.data.qrcode_url;
                        that.urlCode = udata.data.apk_url;
                        that.loading = false;
                    }
                });
            },
            customRow(record,index) {
                return {
                    props: {

                    },
                    style:{
                        background:this.selectIndex==index?'#e6f7ff':'#ffffff'
                    },
                    on: {
                        click: () => {
                            this.getRobotInfo(record.id,index)
                        },
                    },
                };
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
            bindAuth() {
                this.bindVisible = true
            },
            bindUrl(){
                //获取App链接
                let that = this
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/apk',
                }).then(d=>{
                    var udata = d.data;
                    if (udata.status == 1) {
                        that.bindQrcode = udata.data.qrcode_url;
                        that.urlCode = udata.data.apk_url;
                    }
                })
            },
//            获取全公司部门,无分页，且无权限控制
            getDepartment() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/user/all-department',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.assignDepartmentList = [].concat(udata.data.departmentList)
                        this.departmentList = udata.data.departmentList
                        this.departmentList.unshift({id:'0',name:'全部'})
                        this.queryParam.department_id  = '0'
                        this.getUserList()
                    }
                });
            },
            getUserList(){
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/user/all-user',
                    data:{department_id:this.queryParam.department_id}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.managerList = udata.data
                        this.managerList.unshift({id:'0',user_name:'全部'})
                        this.queryParam.user_id = '0'
                        this.refreshGroup()
                    }
                })
            },
            onSelect(val) {
                this.page = 1
                this.page_size = 10
                this.queryParam.department_id = val
                this.getUserList()
            },
            managerChange(val){
                this.queryParam.user_id = val;
                this.page = 1
                this.page_size = 10
                this.refreshGroup()
            },
            selectRaio(){
                this.page = 1
                this.page_size = 10
                this.refreshGroup()
            },
            search(){
                this.page = 1
                this.page_size = 10
                this.refreshGroup()
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.refreshGroup()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.refreshGroup()
            },
            assign(record) {
                this.assignParam.department_id = record.department_id || this.assignDepartmentList[0].id
                this.assignRecord = record
                this.getAssignUserList(record)
                this.visible = true
            },
            assignSelect(selectedKeys) {
                this.assignParam.department_id = selectedKeys
                this.getAssignUserList()
            },
            getAssignUserList(record){
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/user/all-user',
                    data:{department_id:this.assignParam.department_id}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.assignManageList = udata.data
                        if(!!record&&!!record.user_id) {
                            this.assignParam.user_id = record.user_id
                        }else {
                            let user_id = ''
                            this.assignManageList.forEach(el=>{
                                if(el.id === this.$store.state.user.user.user_id){
                                    user_id = this.$store.state.user.user.user_id;
                                }
                            })
                            user_id? this.assignParam.user_id = user_id: this.assignManageList[0]&&this.assignManageList[0].id?this.assignParam.user_id = this.assignManageList[0].id:(this.assignManageList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.assignParam.user_id = '0')
                        }
                    }
                })
            },
            com_handleCancel() {
                this.visible = false;
                this.assignParam = {
                    ecms_userid:'',
                    department_id:''
                }
            },
            com_handleOk() {
                this.modalLoading = true
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/bind-assistant',
                    data: {
                        assistant_id:this.assignRecord.id,
                        user_id: this.assignParam.user_id,
                        department_id: this.assignParam.department_id,
                        status:'10'
                    }
                }).then(res=> {
                    this.modalLoading = false
                    let udata = res.data
                    if (udata.status == 1) {
                        this.visible = false;
                        this.$message.success('分配成功')
                        this.$ws.sendMsgFun({
                            cmd:2066,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.assignRecord.username,
                            cmdData:{
                                type:2
                            },
                            priority:0
                        })
                        this.refreshGroup()
                    }
                }).catch(error=> {
                    this.modalLoading = false
                });
            },
            showLog(record) {
                this.logTitle = '日志-(' +record.nickname + ')'
                this.logVisible = true
                this.logType = '2'
                this.logAssistantId = record.id
                this.logListPage = 1
                this.logListScrollFlag = false
                this.getRobotLog()
                setTimeout(_=>{
                    this.$refs.logListContent.addEventListener('scroll', () => {
                        if((this.$refs.logListContent.scrollHeight - this.$refs.logListContent.offsetHeight - this.$refs.logListContent.scrollTop)< 10
                            && !this.logListScrollFlag) {
                            this.getMoreRobotLog()
                        }
                    }, false)
                    this.$refs.logListContent.scrollTop = 0
                },0)
            },
            logTypeChange() {
                this.logListPage = 1
                this.logListScrollFlag = false
                this.$refs.logListContent.scrollTop = 0
                this.getRobotLog()
            },
            getRobotLog() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/robot-log',
                    data: {
                        robot_id:this.logAssistantId,
                        type:this.logType,
                        p:this.logListPage,
                        n:20,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.logList = udata.data.list
                    }
                });
            },
            getMoreRobotLog() {
                let that = this
                if(this.logListScrollFlag) {
                    return
                }
                this.logListScrollFlag = true
                this.logListPage +=1
                this.$axios({
                    method:'post',
                    url: '/index.php?r=uc/system/robot-log',
                    data: {
                        robot_id:this.logAssistantId,
                        type:this.logType,
                        p:this.logListPage,
                        n:20,
                    }
                }).then(d=>{
                    var udata = d.data;
                    if(udata.status === 1){
                        if(udata.data.list.length == 0) {
                            setTimeout(()=>{
                                that.logListScrollFlag = true
                            },0)
                            return
                        }
                        this.logList =  this.logList.concat(udata.data.list);
                        this.$forceUpdate()
                        setTimeout(()=>{
                            that.logListScrollFlag = false
                        },0)
                    }
                })
            },
            del(record) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/system/bind-assistant',
                    data: {
                        assistant_id:record.id,
                        status:'30'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$ws.sendMsgFun({
                            cmd:2066,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:record.username,
                            cmdData:{
                                type:1
                            },
                            priority:0
                        })
                        this.refreshGroup()
                    }
                })
            }
        },
        created: function() {
            this.getDepartment()
            this.$ws.cmd2997 = msg=>{
                if(msg.status==2) {
                    this.$message.success('开始同步，由于数据量过大，请稍候')
                }
            }
        },
        beforeDestroy() {
            this.$ws.cmd2997 = null
            window.removeEventListener('resize',this.autoHeight,false)
        },
    }
</script>
<style lang="less" scoped>
    .stausPage{
        position:absolute;
        left:50%;
        top:50%;
        z-index:99999;
        transform: translate(-40%,-50%);
    }
    .background-color {
        height: calc(~'100vh - 90px');
        overflow-y: auto;
        background: #fff;
    }
    img{
        height: 100%;
        width: 100%;
    }
    .up_loading{
        width:200px;
        height:200px;
    }
    .tag{
        border:1px solid #40a9ff;
        border-radius:2px;
        padding:4px;
        margin-right:2px;
        /* height:20px;
        line-height:20px; */
    }
    .tag-close{
        color:#40a9ff;
        cursor: pointer;
    }
    .tagTitle{
        width:100%;
        height:40px;
        line-height:40px;
        border-bottom:1px dashed #ccc;
        // padding:20px 0 10px 0;
        background:#fff;
    }
    .welMsg{
        margin-bottom:10px;
    }
    .robot_detail{
        padding-top: 10px;
        .label{
            color: #101010;
        }
        .handler{
            .title{
                color: #101010;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 25px;
                margin-bottom: 10px;
            }
        }
        .card{
            margin-top: 30px;
            background: #fff;
            padding: 10px;
            border: 1px solid #e7e7e7;
            box-shadow: 0px 4px 10px -11px rgba(34, 34, 34, 1);
            border-radius:10px;
            .head_pic{
                padding-bottom: 10px;
                .h_text{
                    width: 50%;
                    span{
                        vertical-align: middle;
                    }
                    .img{
                        display: inline-block;
                        height: 35px;
                        width: 35px;
                        border-radius: 35px;
                        img{
                            border-radius: 50%;
                        }
                    }
                }
                .avatar{
                    width: 50%;
                    text-align: right;
                    .img{
                        display: inline-block;
                        height: 30px;
                        width: 30px;
                        cursor: pointer;
                    }
                }
            }
            .card_dec{

                padding-bottom: 10px;
                .label_btn{
                    padding: 5px 10px;
                    display: inline-block;
                    color: #a6aaae;
                    background-color: #f3f3f3;
                    margin-bottom: 5px;
                    border-radius: 5px;
                }
            }
        }
        .info_box{
            margin-top: 30px;
            background: #fff;
            padding: 10px;
            border: 1px solid #e7e7e7;
            box-shadow: 0px 4px 10px -11px rgba(34, 34, 34, 1);
            border-radius:10px;
            .in_detail{
                padding-bottom: 10px;
            }
        }
    }


    .robot_error .robot_info,.robot_warning .robot_info ,.select_robot .robot_info{
        border-left:1px solid #fff !important;
    }

    .robot_warning{
        background: #f7ba2a !important;
        color: #fff !important;
    }
    .robot_error{
        background: #ff4949 !important;
        color: #fff !important;
    }
    .select_robot {
        background: #50bfff !important;
        color: #fff !important;
    }
    .ant-list-item::after{
        content: '';
        height:'';
        visibility: hidden;
        clear: both;
    }
    .robot_box{
        /*height:60px;*/
        line-height: 60px;
        cursor: pointer;
        background: #13ce66;
        border-radius:10px ;
        padding: 10px 0;
        color: #fff;
        text-align: center;
        .title{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size:14px ;
        }
        .tel{
            div {
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size:14px ;
            }
        }
    }
    .tab {
        margin: 20px 20px 50px 20px;
        min-height:700px;
        position:relative;
    }

    .robotManage .col-margin {
        padding: 20px;
        background: #fff;
    }

    .ant-alert {
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        color: rgba(0, 0, 0, .65);
        box-sizing: border-box;
        margin: 0 0 0 0;
        list-style: none;
        position: relative;
        padding: 5px 15px 5px 37px;
        border-radius: 4px;
        border: 1px solid #91d5ff;
        background-color: #e6f7ff;
        display: inline-block;
    }

    .ant-info span {
        color: #5AA9CD;
        margin: 0 2px;
    }

    .ant-info .pointer {
        cursor: pointer;
        margin-left: 20px;
    }

    .circle_icon {
        top: 8px;
        left: 12px;
        position: absolute;
        svg {
            font-size: 16px;
        }
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
    .tag-modal {
        .ant-tag:hover {
            background: #5AA9CD;
            color: #ffffff;
        }
        .ant-tag-checkable{
            border: 1px solid #d9d9d9;
            background: #fafafa;
        }
        .ant-tag-checkable-checked {
            background: #5AA9CD;
        }
    }
    .ant-tag:hover {
        background: #5AA9CD;
        color: #ffffff;
        opacity: 1;
    }
    .blueText{
        color: #5AA9CD;
        font-size:12px;
        line-height: 14px;
    }
    .grayText{
        color: #919191;
        font-size:12px;
        line-height: 7px;
        word-break: break-all;
    }
</style>