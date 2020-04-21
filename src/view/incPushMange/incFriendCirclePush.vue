<template>
	<div class="companyStyle">
        <div class='company-header' ref="header">
            <div class="row">
                <span class="task-statuas floatLeft">任务状态：</span>
                <a-select class="selectCommon" @change="taskChange"   v-model="taskStatus" >
                        <a-select-option v-for="(item,index) in taskStatusList" :key="index" >
                            {{item.title}}
                        </a-select-option>
                </a-select>	
                <a-input-search class="search-back" v-model="searchKey"  placeholder='输入任务名称'  maxlength="15" enterButton @search="onSearch"/>
                <div class="right">
                    <a-button class="" type="primary"  @click="new_push">新建</a-button>
                </div>
            </div>
        </div>
		<div class="company-content incCommon" ref="context">
			<div ref="tab" >
			<a-table :columns="columns" ref="table" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row':'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="pushList" :pagination="false" :loading='loading'  :locale='locale'  :scroll="{y:sheight}" >
                <template slot="task_name" slot-scope="text,record" style="text-align:left;">
					<a-tooltip title="定时">
						<img src="../../assets/clock.svg"  @error="imgExists($event)" alt="" class="taskName" v-if="record.is_timing==='0'?false:true" >
					</a-tooltip>
					<a-tooltip :title="text" >
						<span class="taskName" :style="{verticalAlign:'middle',color:record.status==='40'?'#BBBBBB':'#333'}">
							{{text}}
						</span>
					</a-tooltip>
				</template>		
				<template slot="created" slot-scope="text,record,index">
					<div :style="{verticalAlign:'middle',color:record.status==='40'?'#BBBBBB':'#333'}" >
						{{text}}
					</div>
				</template>		
				<template slot="created_name" slot-scope="text, record, index">
                    <div>
                        <img :src="record.created_avatar"  @error="imgExists($event)"  style="width: 24px;height: 24px;border-radius: 100%;vertical-align: middle;">
						<span :style="{verticalAlign:'middle',color:record.status==='40'?'#BBBBBB':'#333'}">{{text}}</span>
                    </div>
                </template>
				<template slot="content" slot-scope="text,record,index">
					<div :style="{verticalAlign:'middle',color:record.status==='40'?'#BBBBBB':'#333'}">
						{{text}}
					</div>
				</template>
				<template slot="status" slot-scope="text, record, index"> 
					<div>
						<a-badge :status="text==='0'?'default':text==='10'?'processing':text==='20'?'success':text==='30'?'warning':text==='40'?'default':'success'" style="vertical-align: middle;"></a-badge>
						<span :style="{verticalAlign:'middle',color:text==='40'?'#BBBBBB':'#333'}">
							{{text==='0'?'待推送':text==='10'?'推送中':text==='20'?'已完成':text==='30'?'已暂停':text==='40'?'已取消':'部分完成'}}
						</span>
					</div>
				</template>
				<template slot="percentage" slot-scope="text, record, index"> 
					<div style="position:relative;">
						<span style="padding: 3px 1px;background:#5AA9CD;position: absolute;left: 0;top: 10px;z-index: 999;" v-if="record.status==='0'||text=='0'"></span>
						<a-progress :percent='text'  :status="record.status==='10'?'active':'normal'" :strokeColor="record.status==='0'?'#c8c8c8':record.status==='10'?'#5AA9CD':record.status==='20'?'#8BC34A':record.status==='30'?'#FF9800':record.status==='40'?'#ccc':'#BFDD9D'" size="small"></a-progress>
					</div>
				</template>
				<template slot="fail_num" slot-scope="text, record, index">
					<div>
						<span v-if="record.status==='40'||text==='0' " style="color:#BBBBBB">{{text}}</span>
						<a href="javscript:;" v-if="(record.status!='40'&&text!='0')" @click="getLoseList(record.id)" style="text-decoration: underline;color:#FF6154;vertical-align:middle;line-height:20px;font-size:14px;">{{text}} <a-icon type="info-circle" theme='filled' style="font-size:14px;"></a-icon></a>
					</div>
				</template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
						<a-tooltip title="详情">
                             <img src="../../assets/privte_details.svg"  @error="imgExists($event)" style="width:20px;height:20px;cursor:pointer;" @click="taskMation(record)"  alt="">
						</a-tooltip>
 						<a href="javascript:void(0);" @click="actionTasks('status',record.status,record)" v-if="(record.status==='10'||record.status==='30')" >
							<a-tooltip :title="record.status==='30'?'启动':'暂停'" >
								<img src="../../assets/stop.svg"  @error="imgExists($event)" alt="" style="width:28px;height:28px;cursor:pointer;margin:0 10px;"  v-if="record.status==='10'" >
								<img src="../../assets/play.svg"  @error="imgExists($event)" alt="" style="width:28px;height:28px;cursor:pointer;margin:0 10px;" v-else >
							</a-tooltip>
                        </a>
						<a-popconfirm title="确定要取消吗?" @confirm="actionTasks('id',record.id,record)"  okText="确定" cancelText="取消">
                        	<img src="../../assets/cancle.svg"  @error="imgExists($event)" alt="" style="width:28px;height:28px;cursor:pointer;" v-if="record.status === '40'||record.status === '20'||record.status === '50'?false:true" >
                        </a-popconfirm>
                    </div>
                </template>
            </a-table>
			</div>
			<div  ref="pagebottom" >
				<div  :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="pushList.length" >
            		<a-pagination  showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" class="col"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;"/>
				</div>
			</div>
		</div>
		<a-modal :title="taskInfomation.task_name?taskInfomation.task_name:'未命名'" :visible="mationVisible"  :footer="null" @cancel="com_handleCancel" width="60%" class="infoModal"> 
			<div class="">
				<div class="lineInfo" >
					<a-icon theme="twoTone" type="tag" class="iconTag"></a-icon>
					<span  class="pushTag">推送标签({{taskInfomation.visble_type==='10'?'全部推送':taskInfomation.visble_type==='20'?'部分推送':'不给谁推送'}})</span>
				</div>
				<div class="mationContext" >
					<div class="pushall" v-if="taskInfomation.visble_type==='10'">-</div>
					<div  v-for="(item,index) in taskInfomation.label" :key="index" :class="['tag-color' + item.color_id,'pushall','ant-tag-checkable-checked']">{{item.title}}</div>
				</div>
                
				<div class="lineInfo">
					<a-icon theme="twoTone" type="tag" class="iconTag"></a-icon>
                    <!-- 推送群聊（全部推送/部分推送/不给谁推） -->
					<span class="pushTag">推送群聊({{taskInfomation.visble_type==='10'?'全部推送':taskInfomation.visble_type==='20'?'部分推送':'不给谁推'}})</span>
				</div>
				<div class="mationContext">
					<div class="pushall" v-if="taskInfomation.visble_type==='10'">-</div>
					<div class="pushall" v-else v-for="(item,index) in taskInfomation.friend" :key="index">
						<img :src="item.avatar_url"  @error="imgExists($event)" alt="" style="width:20px;height:20px;border-radius:100%;vertical-align:middle;">
						<span style="vertical-align:middle">{{item.nickname}}</span>
					</div>
				</div>
				<div class="lineInfo">
					<a-icon theme="twoTone" type="tag" class="iconTag"></a-icon>
					<span class="pushTag">推送群数</span>
				</div>
				<div class="mationContext">
					<div class="pushall">{{taskInfomation.num}}(已去重)</div>
				</div>
				<div class="lineInfo">
					<a-icon theme="twoTone" type="tag" class="iconTag"></a-icon>
					<span class="pushTag">推送开始时间({{taskInfomation.is_timing==='0'?'预计':'定时'}})</span>
				</div>
				<div class="mationContext" style="padding:10px">
						<span class="time">{{taskInfomation.send_time}}</span>
				</div>
				<div class="lineInfo">
					<a-icon theme="twoTone" type="tag" class="iconTag"></a-icon>
					<span class="pushTag">推送终止时间</span>
				</div>
				<div class="mationContext" style="padding:10px">
					<span class="time">{{taskInfomation.overdue_time}}</span>
				</div>
				<div class="lineInfo">
					<a-icon theme="twoTone" type="tag" class="iconTag"></a-icon>
					<span class="pushTag">推送内容</span>
				</div>
				<div class="mationContext" style="padding-top: 0;">
					<div v-for="(item,index) in taskInfomation.content" :key="index" >
						<view-material  :dataItem="item"  isPush="0" showDel="1" isInSending="1"></view-material>
					</div>
				</div>
			</div>
		</a-modal>
        <a-modal
            title="失败详情"
            :visible="loseVisible"  
            :footer="null"
            width='800px'
            height="428px"
            @cancel="loseVisible=false"
            :bodyStyle="{
                maxHeight:'500px',
            }"
        >
             <a-table :columns="columns1" :dataSource="loseList" :scroll="{y:300}" :pagination="false" :loading='loading'  :locale='locale' >
                <template slot="avatar_url" slot-scope="text,record,index">
                    <div>
                        <img src="../../assets/pic.svg" alt=""  @error="imgExists($event)" class="taskName" >
                        <span>{{record.nickname||'未命名的群'}}</span>
                    </div>
                </template>
            </a-table>
            <data-status :width="200" :hieght="330" class="stausPage" v-if="!pushList.length"></data-status>
			<div  ref="pagebottom" >
				<div  class="bottomPage" v-if="pushList.length" >
                    <span style="vertical-align: middle;" >
                    <a-button type="primary" style="margin-left:10px;" @click="pushUp(true)">本页重发</a-button>
                    <a-button type="primary"  @click="pushUp(false)">全部重发</a-button>
                    </span>
            		<a-pagination  showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" class="col"	v-model="pageModal" :pageSize="pageSize" :total="countNum" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChangeM" @showSizeChange="onShowSizeChangeM" style="text-align: right;float:right"/>
				</div>
			</div>
        </a-modal>
	</div>
</template>
<script>
    var emoji = require('../../common/emojiMap');
    var comConf = require('../../common/comConfig');
	import viewMaterial from '../../components/MessagePush/viewMaterial'
	import SendCompletion from '../../components/MessagePush/SendCompletion'
	import Sending from '../../components/MessagePush/Sending'
    import WaitingList from '../../components/MessagePush/WaitingList'
	import dataStatus from '../../components/pageConfig/dataStatus'
	import { setTimeout, setInterval, clearInterval } from 'timers';
	import { powerObject } from '@/common/util'
	export default {
		name: "privatePush",
		components: {
			SendCompletion,
			Sending,
            WaitingList,
			dataStatus,
			viewMaterial
		},
		data() {
			return {
				form: this.$form.createForm(this),
                sheight:'calc(100vh - 208px)',
                heightFlg:false,
				mationVisible:false,
                classFlag:false,
                loseVisible:false,
				searchKey:'',
				flag:true,
				wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
				},
				labelCol:{
					xs: { span: 24 },
					sm: { span: 3 },
				},
				page_size:10,
                page:1,
                total:0,
                pageSize:10,
                pageModal:1,
                padeSize:10,
                countNum:0,
				loading:false,
				locale:{
					filterConfirm:'',
                    filterReset:'',
                    emptyText:''
				},
                pushList:[],
                loseList:[],
                columns1:[
                      {
                        title:'群信息',
                        dataIndex:'avatar_url',
                        width: 150,
                        scopedSlots:{
                            customRender:'avatar_url'
                        }
                    },
                    {
                        title:'群类型',
                        align:'center',
                        customRender:record =>{
                            return record.type==0||record.type==1||record.type==3?'内部群':'外部群'
                            //1: 全员 2:外部 3:部门,0普通 4:小程序?还不清楚 5:BOT'
//                            return record.type === '1'?'全员':record.type === "2"?'外部':record.type === "3"?'部门':record.type === '0'?'普通':record.type === "4"?'小程序':'BOT'
                        }
                    },
                    {
                        title:'状态',
                        align:'center',
                        width: 150,
                        customRender:res=>{
                            return '已失败'
                        }
                    }
                ],
				columns:[
                    {
                        title: '任务名称',
                        dataIndex: 'task_name',
						align:'left',
						width: 110,
						scopedSlots: {
                            customRender: 'task_name'
                        }
                    },
                    {
                        title: '开始时间(预计)',
                        align:'center',
						dataIndex: 'created',
						width: 200,
						scopedSlots:{
                           customRender: 'created'
                        }
                    },
                    {
                        title: '创建人',
                        align:'center',
						dataIndex: 'created_name',
						width: 150,
						scopedSlots: {
                            customRender: 'created_name'
                        }
                    },
                    {
                        title: '内容',
                        align:'center',
						dataIndex: 'content',
						width: 150,
						scopedSlots: {
                            customRender: 'content'
                        }
                    },
                    {
                        title: '任务状态',
                        align:'left',
						dataIndex: 'status',
						width: 150,
						scopedSlots: {
                            customRender: 'status'
                        }
                    },
                    {
                        title: '任务进度',
						align:'center',
						width: 150,
                        dataIndex: 'percentage',
                        scopedSlots: {
                            customRender: 'percentage'
                        }
                    },
                    {
                        title: '失败',
                        align:'center',
						dataIndex: 'fail_num',
						width: 100,
                        scopedSlots: {
                            customRender: 'fail_num'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
						align:'left',
						width: 170,
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
				tabs_key: '1',
				dataList:[],
				intVal:null,
				taskStatus:0,
				taskStaList:[],
				tasksStatus:'100',
				taskStatusList:[
					{id:0,title:'全部',status:'100'},
					{id:1,title:'待推送',status:'0'},
					{id:2,title:'推送中',status:'10'},
					{id:3,title:'已完成',status:'20'},
					{id:4,title:'已暂停',status:'30'},
					{id:5,title:'已取消',status:'40'},
					{id:6,title:'部分完成',status:'50'}
				],
                taskInfomation:{},
                taskId:''
			}
		},
		mounted() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
            window.addEventListener('resize',this.autoHeight,false)
        },
        watch:{
            pushList:function(){
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
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed:{
		
		},
		methods: {
            autoHeight(){
            let that = this
            let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
            if(obj){
                that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight - 30:''
                that.heightFlg = obj.heightFlg
            }
            },
			onSearch(){
				this.refreshGroup();
			},
			suspend(val1,val2,val3){
				console.log(val1)
				console.log(val2)
				console.log(val3)
			},
			taskMation(item){
				//任务详情
				this.mationVisible = true;
				this.$axios({
					method:'POST',
					url:'/index.php?r=uc/enterprise/sending-content',
					data:{
						task_id:item.id
					}
				}).then(res=>{
					let udata = res.data;
					if(udata.status === 1){
						this.taskInfomation = udata.data
						this.taskInfomation.task_name = item.task_name
					}
				})
			},
			com_handleCancel(){ //任务详情
				this.mationVisible = false;
				this.taskInfomation = {};
			},
			taskChange(val){
				//切换任务状态
				this.tasksStatus = this.taskStatusList[val].status;
				this.page_size=10;
                this.page=1;
				this.refreshGroup();
			},
			actionTasks(action,status,item){
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/push-stop',
					data:  {
                        'push_type':'10',
						'task_id':item.tasks_id,
						'status':action === 'id'?'5':status === '30'?'0':'4'
					}
				}).then(function(d) {
					var udata = d.data;
					if(udata.status == 1) {
						if(action==='id'){
							that.$message.success('删除成功', 2);
						}
						that.refreshGroup();
					}
				});
			},
            getLoseList(id){//任务失败详情
                this.loseVisible = true;
                this.taskId = id
                this.pageModal = 1;
				this.refreshGroupL(id);
            },
            pushUp(bool){
                        let robots = [];
                        let usernames = [];
                        if(bool){
                                this.loseList.forEach(el=>{
                                    usernames.push(el.username)
                                    robots.push(el.robotusername)
                                })
                        }
                        let data = {
                            cmd:2602,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.loseList[0].robotusername,
                            cmdData:{
                                usernames:usernames,
                                robotusernames:robots,
                                isRoom:1,
                                taskId:this.taskId,
                                isAll:bool?0:1
                            }
                        }
                        this.$ws.sendMsgFun(data)
                        this.refreshGroup();
                		this.loseVisible = false
//                        this.$ws.cmd2602 = msg=>{
//                            if(msg.status==2) {
//                                this.loseVisible = false
//                                this.$message.info(msg.callbackMsg, 3);
//                            }else{
//                                this.$message.warning(msg.callbackMsg, 7);
//                            }
//                        }
            },
			new_push() {//新建
				this.$router.push({path:'/pushMange/incNewPush',query:{'pushType':'20','pushTypeInc':'10'}});
            },
            refreshGroupL(){
                let that = this
                this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/enterprise/sending-list',
                    data:{
                        'p':this.pageModal,
                        'n':this.pageSize,
                        'task_id':this.taskId
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                       this.countNum =parseInt( udata.data.count);
                       this.loseList = udata.data.list;
                    }
                })
            },
			refreshGroup(){ //获取推送列表及任务进度
				let that = this;
				this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/enterprise/tasks-list',
						data:  {
							'p':this.page,			//页码
							'n':this.page_size,			//每页条数
							'status':this.tasksStatus,		//0 未发送 20 已完成 100获取全部 
							'push_type':10,		//10 私聊推送 20 朋友圈推送
                            'search':this.searchKey,  //搜索,
                            'talk_type':10
						}
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.total = parseInt(udata.data.count);
				 			that.pushList = udata.data.list;
							 //console.log(that.$refs.tab.offsetHeight)
							//console.log(that.$refs.context.offsetHeight) //pagebottom
							// for(let i = 0; i < that.dataList.length; i++) {
							// 	that.dataList[i].content = emoji.stringToHtml(that.dataList[i].content)
							// }
							
						}
				});
				clearInterval(this.intVal)
				this.intVal = setInterval(function(){
					that.$axios({
						method: 'POST',
						url: '/index.php?r=uc/enterprise/tasks-sending',
						data:  {
							'p':that.page,			//页码
							'n':that.page_size,	
                            'push_type':10,
                            'talk_type': 10,
                            'search':this.searchKey, 
						}
					}).then(function(d) {
						var udata = d.data;
						if(udata.status == 1) {
							that.pushList.forEach(el=>{
									udata.data.list.forEach(item=>{
										if(el.id === item.id){
											el.percentage = item.percentage
											el.fail_num = item.fail_num;
											el.status = item.status;
										}
								})
							})
						}
					});
				},5000)
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
             onChangeM(page,pageSize) {
                this.pageModal = page
                this.pageSize = pageSize
                this.refreshGroupL()
            },
            onShowSizeChangeM(current, size) {
                this.pageModal = 1
                this.pageSize = size
                this.refreshGroupL()
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
            }
		},
		beforeCreate() {},
		created() {
			this.refreshGroup();
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.autoHeight,false)
        },
		destroyed(){
			clearInterval(this.intVal);
            this.intVal = null
		}
	}
</script>
<style lang="less" scoped >
   
	.row{
        margin-bottom:10px;
        .search-back{
            width:188px;
            margin-right:10px;
        }
        .task-statuas{
            margin: 4px 2px 0 0;
            font-size:14px;
            font-weight: 500;
        }
    }
	.pushall{
		border:1px solid #f0f0f0;;
		background:#f7f7f7;
		border-radius:3px;
		text-align:center;
		/* width:30px; */
		height:30px;
		line-height:20px;
		padding:2px 10px;
		display:inline-block;
		margin-right:10px;
		margin-bottom:10px;
		vertical-align: middle;
	}
	.time{
		border:1px solid #5AA9CD;
		padding:4px;
		border-radius:4px;
		margin-right:6px;
		color:#5AA9CD;
		margin-bottom:4px;
		max-height:76px;
	}
	.iconTag{
		transform:rotate(45deg);
		font-size:24px;
		vertical-align: middle;
		margin-right:10px;
	}
	.pushTag{
		vertical-align: middle;
	}
	.mationContext{
		max-height:100px;
		overflow-y: auto;
		margin-left:28px;
		padding:10px 10px 0;
		border-radius:3px;
		border:1px solid #f0f0f0;
	}
	.search{
		width:100%;
		margin:20px;
		vertical-align: middle;
	}
	.taskName{
		cursor: pointer;
		margin-right: 10px;
        width:20px;
        vertical-align: middle;
	}
	.lineInfo{
		height:40px;
		line-height:40px;
	}
</style>
<style>
    .incCommon .ant-table-header{
        overflow-x: hidden !important;
        margin-bottom:0 !important;
    }
	.company-content .ant-progress-inner{
		background:#c8c8c8 !important;
	}
	
	.infoModal .ant-modal-body{
		padding-top:0 !important;
		overflow: auto;
		max-height:700px!important;
	}
</style>
