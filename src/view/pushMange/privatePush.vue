<template>
	<div class="background-color private-push">
		<div class="navTop" ref="header">
			<a-form :form='form' >
				<a-input-search suffix placeholder="请输入要查询的任务名称" v-model="searchKey" class="search" @search='onSearch' style="width: 200px"></a-input-search>
				<span style="vertical-align: middle;">任务状态：</span>
				<a-select @change="taskChange"  v-model="taskStatus" class="search" style="width:140px;margin-left:4px;">
					<a-select-option v-for="(item,index) in taskStatusList" :key="index" >
						{{item.title}}
					</a-select-option>
				</a-select>
				<a-button type="primary" style="margin: 0 20px;position: relative;top: 20px;z-index: 10;float: right" @click="new_push">新建</a-button>
			</a-form>
		</div>
		<div class="content" ref="context">
			<a-table ref="table" :columns="columns" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row':'bg-row-gray'}" :class='[heightFlg?"scrollheade":"scrollheader"]'  :dataSource="pushList" :pagination="false" :loading='loading'  :locale='locale'  :scroll="{y:sheight}" >
                <template slot="task_name" slot-scope="text,record" style="text-align:left;">
					<a-tooltip title="定时">
							<img src="../../assets/clock.svg" alt="" class="taskName" v-if="record.is_timing==='0'?false:true" >
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
                        <img :src="record.created_avatar"   style="width: 24px;height: 24px;border-radius: 100%;vertical-align: middle;">
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
					<div style="position:relative">
						<span style="padding: 3px 1px;background:#5AA9CD;position: absolute;left: 0;top: 10px;z-index: 999;" v-if="record.status==='0'||text=='0'"></span>
						<a-progress :percent='text'  :status="record.status==='10'?'active':'normal'" :strokeColor="record.status==='0'?'#c8c8c8':record.status==='10'?'#5AA9CD':record.status==='20'?'#8BC34A':record.status==='30'?'#FF9800':record.status==='40'?'#ccc':'#BFDD9D'" size="small"></a-progress>
					</div>
				</template>
				<template slot="fail_num" slot-scope="text, record, index">
					<div >
						<span v-if="record.status==='40'||text==='0' " style="color:#BBBBBB">{{text}}</span>
						<a href="javscript:;" v-if="(record.status!='40'&&text!='0')" @click="getLoseList(record.id)" style="text-decoration: underline;color:#FF6154;vertical-align:middle;line-height:20px;font-size:14px;">{{text}} <a-icon type="info-circle" theme='filled' style="font-size:14px;"></a-icon> </a>
					</div>
				</template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
						<a-tooltip title="详情">
							<img src="../../assets/privte_details.svg" style="width:20px;height:20px;cursor:pointer;" @click="taskMation(record)"  alt="">
							<!--<a-icon type="info-circle"   style="color:#5AA9CD;font-size:24px;margin:0 10px;cursor:pointer;vertical-align: middle;" @click="taskMation(record)" ></a-icon>-->
						</a-tooltip>
 						<a href="javascript:void(0);" @click="actionTasks('status',record.status,record)" v-if="(record.status==='10'||record.status==='30')" >
							<a-tooltip :title="record.status==='30'?'启动':'暂停'">
								<img src="../../assets/stop.svg" alt="" style="width:30px;height:30px;cursor:pointer;margin:0 10px;"  v-if="record.status==='10'" >
								<img src="../../assets/play.svg" alt="" style="width:30px;height:30px;cursor:pointer;margin:0 10px;" v-else >
							</a-tooltip>
                        </a>
						<a-popconfirm title="确定要取消吗?" @confirm="actionTasks('id',record.id,record)"  okText="确定" cancelText="取消">
							<img src="../../assets/cancle.svg" alt="" style="width:30px;height:30px;cursor:pointer;" v-if="record.status === '40'||record.status === '20'||record.status === '50'?false:true" >
                        	<!-- <a-icon type="close-circle" theme="filled"  style="color:#ccc;font-size:24px;margin:0 10px;cursor:pointer"></a-icon> -->
                        </a-popconfirm>
                    </div>
                </template>
            </a-table>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!pushList.length"></data-status> -->
			<div  ref="bottomPage" >
				<div  :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="pushList.length" >
            		<a-pagination  showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" class="col"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;"/>
				</div>
			</div>
		</div>
		<a-modal :title="taskInfomation.task_name?taskInfomation.task_name:'未命名'" :visible="mationVisible"  :footer="null" @cancel="com_handleCancel" width="60%" class="infoModal"> 
			<div class="" style="max-height:600px;overflow-y:auto;">
				<div class="lineInfo" >
                    <img src="../../assets/tag.svg" class="iconTag" alt="">
					<span  class="pushTag">推送标签({{taskInfomation.visble_type==='10'?'全部推送':taskInfomation.visble_type==='20'?'部分推送':'不给谁推送'}})</span>
				</div>
				<div class="mationContext">
					<div class="pushall" v-if="taskInfomation.visble_type==='10'">-</div>
					<div v-for="(item,index) in taskInfomation.label" :key="index" :class="['tag-color' + item.color_id,'pushall','ant-tag-checkable-checked']">{{item.title}}</div>
				</div>
				<div class="lineInfo">
					 <img src="../../assets/tag.svg" class="iconTag" alt="">
					<span class="pushTag">推送客户({{taskInfomation.visble_type==='10'?'全部推送':taskInfomation.visble_type==='20'?'部分推送':'不给谁推送'}})</span>
				</div>
				<div class="mationContext">
					<div class="pushall" v-if="taskInfomation.visble_type==='10'">-</div>
					<div class="pushall" v-else v-for="(item,index) in taskInfomation.friend" :key="index">
						<img :src="item.avatar_url" alt="" style="width:20px;height:20px;border-radius:100%;vertical-align:middle;">
						<span style="vertical-align:middle">{{item.nickname}}</span>
					</div>
				</div>
				<div class="lineInfo">
					 <img src="../../assets/tag.svg" class="iconTag" alt="">
					<span class="pushTag">推送人数</span>
				</div>
				<div class="mationContext" style="border:none">
					<div class="pushall">{{taskInfomation.num}}(已去重)</div>
				</div>
				<div class="lineInfo">
					 <img src="../../assets/tag.svg" class="iconTag" alt="">
					<span class="pushTag">推送开始时间({{taskInfomation.is_timing==='0'?'预计':'定时'}})</span>
				</div>
				<div class="mationContext" style="padding:10px;border:none">
						<span class="time">{{taskInfomation.send_time}}</span>
				</div>
				<div class="lineInfo" >
					 <img src="../../assets/tag.svg" class="iconTag" alt="">
					<span class="pushTag">推送终止时间</span>
				</div>
				<div class="mationContext" style="padding:10px;border:none">
					<span class="time">{{taskInfomation.overdue_time}}</span>
				</div>
				<div class="lineInfo" >
					 <img src="../../assets/tag.svg" class="iconTag" alt="">
					<span class="pushTag">推送内容</span>
				</div>
				<div class="mationContextIn" style="padding-top: 0;">
					<div v-for="(item,index) in taskInfomation.content" :key="index" >
						<view-material  :dataItem="item"  isPush="0" showDel="1" isInSending="1"></view-material>
					</div>
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
				mationVisible:false,
				classFlag:false,
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
				loading:false,
				locale:{
					filterConfirm:'',
                    filterReset:'',
                    emptyText:''
				},
				pushList:[],
				columns:[
                    {
                        title: '任务名称',
                        dataIndex: 'task_name',
						align:'left',
						width: 150,
						scopedSlots: {
                            customRender: 'task_name'
                        }
                    },
                    {
                        title: '开始时间(预计)',
                        align:'center',
						dataIndex: 'created',
						width: 150,
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
                        align:'center',
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
						width: 150,
                        scopedSlots: {
                            customRender: 'fail_num'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
						align:'left',
						width: 150,
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
                clientHeight:'',
                heightFlg:false
			}
		},
		mounted() {
            window.addEventListener('resize',this.autoHeight,false)
        },
        watch:{
            pushList:function(){
                let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
                let headerHeight = this.$refs.header.offsetHeight + 126; // 头部及表格头部 
                this.$nextTick(function(){
                    if((clientHeight - headerHeight) <= (this.$refs.table.$el.offsetHeight + 40)){
                        this.heightFlg = true;
                        this.sheight = clientHeight - headerHeight - this.$refs.header.offsetHeight + 60;
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
			// test(val){
			// 	console.log(val)
			// 	let num = val.toFixed(2);
			// 	console.log(num)
			// 	return num
			// }
		},
		methods: {
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight + 35:''
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
					url:'/index.php?r=uc/sale/sending-content',
					data:{
						task_id:item.id
					}
				}).then(res=>{
					let udata = res.data;
					if(udata.status === 1){
						this.taskInfomation = udata.data
						this.taskInfomation.task_name = item.task_name
					}else{
                        this.$message.warn(udata.msg)
                    }
				})
			},
			com_handleCancel(){ //任务详情
				this.mationVisible = false;
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
							that.$message.success('已取消', 2);
						}
						that.refreshGroup();
					}
				});
			},
			getLoseList(id){//任务失败详情
				this.$router.push({path:'/pushMange/loseMation',query:{'loseId':id,'push_type':'10'}});
			},
			new_push() {//新建
				this.$router.push({path:'/pushMange/NewPush',query:{'pushType':'10'}});
			},
			refreshGroup(){ //获取推送列表及任务进度
				let that = this;
				this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/sale/tasks-list',
						data:  {
							'p':this.page,			//页码
							'n':this.page_size,			//每页条数
							'status':this.tasksStatus,		//0 未发送 20 已完成 100获取全部 
							'push_type':10,		//10 私聊推送 20 朋友圈推送
							'search':this.searchKey  //搜索
						}
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.total = parseInt(udata.data.count);
                             that.pushList = udata.data.list;
							// for(let i = 0; i < that.dataList.length; i++) {
							// 	that.dataList[i].content = emoji.stringToHtml(that.dataList[i].content)
                            // }
                            
							
						}
				});
				
				clearInterval(this.intVal)
				this.intVal = setInterval(function(){
					that.$axios({
						method: 'POST',
						url: '/index.php?r=uc/sale/tasks-sending',
						data:  {
							'p':that.page,			//页码
							'n':that.page_size,	
							'push_type':10
						}
					}).then(function(d) {
						var udata = d.data;
						if(udata.status == 1) {
							that.pushList.forEach(el=>{
									udata.data.list.forEach(item=>{
										if(el.id === item.id){
											el.percentage = item.percentage;
											el.fail_num = item.fail_num;
											el.status = item.status;
										}
								})
							})
						}
					});
				},5000)
					
				// if(parseInt(that.tabs_key)==2){
                //     that.$axios({
                //         method: 'POST',
                //         url: '/index.php?r=uc/sale/tasks-sending',
                //         data:  {}
                //     }).then(function(d) {
				// 		var udata = d.data;
                //         if(udata.status == 1) {
                //             that.sendData = udata.data;
                //             that.$refs.sendDataDiv.detailUserList = []
                //             !!that.sendData.id&&that.$refs.sendDataDiv.getContent()
				// 			!!that.sendData.id&&that.$refs.sendDataDiv.searchPushDetails(true)
							
                //         }
				// 	});
                //     clearInterval(this.intVal)
                //     this.intVal = null
				// 	this.intVal = setInterval(function(){
				// 		that.$axios({
				// 			method: 'POST',
				// 			url: '/index.php?r=uc/sale/tasks-sending',
				// 			data:  {}
				// 		}).then(function(d) {
				// 			var udata = d.data;
				// 			if(udata.status == 1) {
				// 				that.sendData = udata.data;
				// 				for(let i = 0; i < that.sendData.length; i++) {
				// 					that.sendData[i].content = emoji.stringToHtml(that.sendData[i].content)
				// 				}
				// 			}
				// 		});
				// 	},5000)
				// }else{
				// 	clearInterval(this.intVal)
                //     this.intVal = null
				// }
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
<style scoped >

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
		/* transform:rotate(45deg); */
		/* font-size:24px; */
        width:22px;
		vertical-align: middle;
		margin-right:6px;
	}
	.navTop{
		background:#fff;
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
	.mationContextIn{
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
	}
	.clar::after{	
		display:block;
		content:'';
		height:0;
		visibility: hidden;
		clear:both;
	}
	.private-push .ant-input-suffix{
		padding:8px;
		background:rgb(102,102,102);
	}
	.content{
		position:relative;
		/*height: calc(100vh - 160px);*/
		/*top:10px;*/
		background: #ffffff;
		/* overflow-y: auto; */
	}
	.background-color {
		height: calc(100vh - 90px);		
		/*overflow: hidden;*/
		/* background:#fff; */
	}
	.tab {
		margin: 0px 20px 50px 20px;
	}
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
	}
	.lineInfo{
		height:40px;
		line-height:40px;
	}
</style>
<style>

	.content .ant-progress-inner{
		background:#c8c8c8 !important;
	}
	.navTop .ant-input-suffix{
		padding:8px;
		background:#5AA9CD;
		display:block;
		border-radius:0 4px 4px 0;
	}
	.infoModal .ant-modal-body{
		padding-top:0 !important;
		overflow: auto;
		max-height:700px!important;
	}
	.navTop .ant-input-search-icon{
		color:#fff ;
	}
	.navTop .ant-input-search:not(.ant-input-search-small) > .ant-input-suffix{
		right:0;
	}
	
	.private-push .ant-tabs-bar {
		border-bottom: 10px solid #f0f2f5;
		margin-bottom: 0;
	}
	.private-push .ant-table-placeholder{
		padding:0;
	}
	.scrollheader .ant-table-header{
		background:#fff;
	}
    .scrollheade .ant-table-header{
        background:rgba(34, 34, 34, 0.7);
    }
    .scrollheade .ant-table-body{
        padding-bottom:52px;
    }
    .private-push .scrollheade .ant-table-thead > tr > th{
        color:#fff !important;    
    }
	.private-push .ant-table-thead > tr > th {
		background:none;
	}
	.private-push .ant-form-item{
		margin-bottom:0;
	}
</style>
