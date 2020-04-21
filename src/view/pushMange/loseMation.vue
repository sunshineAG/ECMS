<template>
    <div class="wrap">
        <div class="searchNav" ref="header">
            <a-input-search suffix placeholder="请输入要查询的任务" class="search flat" v-model="searTsak"></a-input-search>
            <div class="search flat">
                <span>重发状态</span>
                <a-select @change="sendChange"  v-model="sendStatus" style="width:150px;">
                        <a-select-option v-for="(item,index) in sendStatusList" :key="index" >
                            {{item.title}}
                        </a-select-option>
                </a-select>	
            </div>
            <a-button class="searchBack flatr" @click="goback">返回</a-button>
        </div>
        <div class="loseMation">
            <a-table filterMultiple='true' ref="table"   type="checkbox"  :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"  :class='[heightFlg?"scrollheade":"scrollheader"]'  :columns="columns" :dataSource="mationList" :pagination="false" :loading='loading'  :locale='locale'  :scroll="{y:sheight}"  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,getCheckboxProps:getCheckboxProps }" :rowKey="(record) => record.id" >
				<template slot="avatar_url" slot-scope="text, record, index">
                    <div>
                        <img  :src="text?text:require('../../assets/defalute.svg')" style="width: 30px;height: 30px;border-radius:100%;vertical-align: middle;margin-right:10px;">
						<span style="vertical-align: middle;">{{record.remark||record.nickname}}</span>
                    </div>
                </template>
                <template slot="desc" slot-scope="text, record, index" >
                    <div style="cursor:pointer">
                        <span>{{text}}：</span>
                        <span v-if='text==="机器人断开连接"'>
                            <img :src="record.robotavatar_url" style="width: 30px;height: 30px;border-radius:100%;">
                            {{record.robotnickname}}
                        </span>
                    </div>
                </template>
				<template slot="status" slot-scope="text, record, index"> 
					<div>
						<a-badge v-if='text!="3"' :status="text==='8'?'warning':text==='6'?'processing':'default'" style="vertical-align: middle;"></a-badge>
						<span style="vertical-align: middle;margin-right:10px;">
							{{text==='3'?'':text==='8'?'等待重发':text==='6'?'正在重发':text==='7'?'发送失败':''}}
						</span>
                        <a-spin v-if='text==="6"' size="small" :spinning="true"/>
					</div>
				</template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
						<a-tooltip title="重发">
                            <div class="updat"  :style="{opacity:record.status==='8'||record.status==='6'||record.desc==='任务已经过期'?'.5':'1'}"  @click="record.status==='8'||record.status==='6'||record.desc==='任务已经过期'?'return false':getRetrans(record)">
							    <a-icon type="reload"  style="color:#fff;font-size:20px;" ></a-icon>
                            </div>
						</a-tooltip>
                    </div>
                </template>
            </a-table>
            <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!mationList.length"></data-status> -->
			<div  :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="mationList.length">
                <span style="vertical-align: middle;">
                    <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                    <a-button type='primary' style="float:left;margin-left:36px;" @click="getRetrans()"  :disabled="repeatLength>0?false:true" v-if="repeatLength>0">重发（{{repeatLength}}）条</a-button>
                    <a-button type='primary' style="margin-left:10px" @click="getRetrans('',true)">全部重发（{{total}}）条</a-button>
                    <span style="vertical-align:middle;margin-left:20px;"  v-if="repeatLength>0">已选: {{repeatLength}} 个 总: {{mationList.length}} 个</span>
                </span>
            	<a-pagination v-if="mationList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50','100']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
			</div>
        </div>
    </div>
</template>
<script>
    import dataStatus from '../../components/pageConfig/dataStatus'
    var comConf = require('../../common/comConfig');
    let columns = [
        {
            title: '客户',
            align:'left',
			dataIndex: 'avatar_url',
            width: 150,
            scopedSlots: {
                customRender: 'avatar_url'
            }
        },
        {
            title: '失败原因',
            align:'center',
			dataIndex: 'desc',
            width: 150,
            scopedSlots: {
                customRender: 'desc'
            }
        },
        {
            title: '重发状态',
            align:'center',
			dataIndex: 'status',
			width: 150,
			scopedSlots: {
                customRender: 'status'
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
			align:'center',
			width: 150,
            scopedSlots: {
                customRender: 'action'
            }
        }
    ]
    export default {
        components:{
            dataStatus
        },
        data(){
           return {
                heightFlg:false,
                sheight:'calc(100vh - 208px)',
                repeatLength:'0',
                page_size:10,
                page:1,
                checkAll:false,
				total:0,
                loading:false,
                searTsak:'',
				locale:{
					filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                sendStatusList:[
                   	{id:0,title:'全部',status:'0'},
					{id:1,title:'发送失败',status:'7'},
					{id:2,title:'正在重发',status:'6'},
					{id:3,title:'等待重发',status:'8'}
                ],
                sendStatus:0,
                tasksStatus:'0',
                selectedRowKeys:[],
                mationList:[],
                columns,
               choseTak:[],
               selectArray:[],
               intVal:null,
               loseId:this.$route.query.loseId
           }
        },
        mounted() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
            window.addEventListener('resize',this.autoHeight,false)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
        },
        watch:{
            mationList:function(){
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
        methods:{
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
            getCheckboxProps(record) {
                return {
                    props: {
                        disabled: this.choseTak.some(item => item.desc === record.desc),
//                        defaultChecked : this.choseTak.some(item => item.desc === record.desc)
                    }
                }
            },
            getRetrans(item,bool) {
                let robots = [];
                let usernames = [];
                let select = [];
                let isAll;
                let that = this;
                let toRobot = '';
                if(bool){
                    isAll = '1'
                    toRobot = this.mationList[0].robotusername;
                }else if(item){
                    isAll = '0'
                    usernames.push(item.username)
                    robots.push(item.robotusername)
                }else{
                    this.selectedRowKeys.forEach(el=>{
//                        if(this.choseTak.length){
//                            this.choseTak.forEach(item=>{
//                                if(el === item.id){
//                                    select.push(el)
//                                }
//                            })
//                        }else{
                            select.push(el)
//                        }
                    })
                    isAll = '0'
                    select.forEach(el=>{
                        this.mationList.forEach(item =>{
                            if(el === item.id){
                                usernames.push(item.username)
                                robots.push(item.robotusername)
                            }
                        })
                    })
                }
                if(this.$route.query.push_type==='10'){
                    this.loading = true;
                    let data = {
                        cmd:3000,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:isAll==='1'?toRobot:robots[0],
                        cmdData:{
                            isAll:isAll,
                            usernames:usernames,
                            robotusername:robots,
                            taskId:this.$route.query.loseId
                        }
                    }
                    console.log(data)
                    this.$ws.sendMsgFun(data)
                    this.selectedRowKeys = [];
                    this.checkAll = false;
                    this.repeatLength = '0';
                    this.refreshGroup(true);
                    this.loading = false;
//                    this.$ws.cmd2003 = msg=>{
//                        if(msg.status==2) {
//                            this.loading = false;
//                            this.$message.info(msg.callbackMsg, 3);
//                        }else{
//                            this.loading = false;
//                            this.$message.warning(msg.callbackMsg, 7);
//                        }
//                    }
                }else{
                    let data = {
                        cmd:2999,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:isAll==='1'?toRobot:robots[0],
                        cmdData:{
                            isAll:isAll,
                            robotusernames:robots,
                            taskId:this.$route.query.loseId
                        }
                    }
                    this.$ws.sendMsgFun(data)
                    this.selectedRowKeys = [];
                    this.checkAll = false;
                    this.repeatLength = '0';
                    this.refreshGroup(true);
                    this.loading = false;
//                    this.$ws.cmd2999 = msg=>{
//                        if(msg.status==2) {
//                            this.loading = false;
//                            this.$message.info(msg.callbackMsg, 3);
//                        }else{
//                            this.loading = false;
//                            this.$message.warning(msg.callbackMsg, 7);
//                        }
//                    }
                }
            },
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys
                this.checkAll = true;
//                this.repeatLength = this.selectedRowKeys.length - this.choseTak.length ;
                this.repeatLength = this.selectedRowKeys.length;
                this.repeatLength === 0 ?this.checkAll = false:this.checkAll = true;
            },
            checkedAll(){
                 if(!this.checkAll){
                     
                    if(!this.choseTak.length){
                     this.selectedRowKeys = [];
                        this.mationList.forEach(el=>{
                            this.selectedRowKeys.push(el.id)    
                        })
                    }else{
                        this.selectedRowKeys = [];
                        this.mationList.forEach((el,idx)=>{
                            this.choseTak.forEach((item,index)=>{
                                if(el.id != item.id){
                                     this.selectedRowKeys.push(el.id)    
                                }
                            })
                        })
                        this.selectedRowKeys = this.selectedRowKeys.filter(function (item, index, self) { // 过滤相同元素
                            return self.indexOf(item) == index;
                        })
                    }
                     this.repeatLength = this.mationList.length - this.choseTak.length;
                }else{
                    let slectArray = []
                    this.selectedRowKeys = [];
                    slectArray = this.choseTak.filter(item =>this.selectedRowKeys.indexOf(item)==-1);  
                    slectArray.forEach(el=>{
                        this.selectedRowKeys.push(el.id)
                    })
                    this.repeatLength = '0';
                }
                this.mationList.length === this.choseTak.length?'':this.checkAll = !this.checkAll;
            },
            sendChange(val){ //切换任务状态筛选条件
                this.tasksStatus = this.sendStatusList[val].status;
                this.page_size=10;
                this.page=1;
				this.refreshGroup();
            },
            goback(){
                this.$route.query.push_type==='10'?this.$router.push({ path:'/pushMange/privatePush' }):this.$router.push({ path: "/pushMange/friendCirclePush" });
            },
            onChange(page,pageSize){
                this.page = page
                this.page_size = pageSize
                this.selectedRowKeys = [];
                this.refreshGroup();
            },
            onShowSizeChange(page,size){
                this.page = 1
                this.page_size = size
                this.selectedRowKeys = [];
                this.refreshGroup();
            },
            refreshGroup(bool){
                 let that = this
                    this.$axios({
                        method:'POST',
                        url:'index.php?r=uc/sale/sending-list',
                        data:{
                            'p':this.page,
                            'n':this.page_size,
                            'status':this.tasksStatus,
                            'task_id':this.$route.query.loseId,
                            'push_type':this.$route.query.push_type,
                            'search':this.searTsak
                        }
                    }).then(res=>{
                        let udata = res.data;
                        if(udata.status === 1){
                            this.total = parseInt(udata.data.count)
                            this.mationList = udata.data.list;
                            this.mationList.forEach(el=>{
                                if(el.desc==="任务已经过期"||el.status==='6'||el.status==='8'){
                                    that.choseTak.push(el);
                                }
                            })
                        }else{
                            this.$message.warn(udata.msg)
                        }
                    })
                    
            if(bool){
                clearInterval(this.intVal)
				this.intVal = setInterval(function(){
					that.$axios({
						method:'POST',
                        url:'index.php?r=uc/sale/sending-list',
                        data:{
                            'p':that.page,
                            'n':that.page_size,
                            'status':that.tasksStatus,
                            'task_id':that.loseId,
                            'search':that.searTsak,
                            'push_type':that.$route.query.push_type
                        }
					}).then(res=>{
						let udata = res.data;
                        if(udata.status === 1){
                            that.total = parseInt(udata.data.count)
                            that.mationList = udata.data.list;
                            that.mationList.forEach(el=>{
                                if(el.desc==="任务已经过期"){
                                    that.choseTak.push(el);
                                }
                            })
                        }
					});
                },5000) 
                }
            }
        },
        created() {
            this.$route.query.push_type==='20'?this.columns[0].title = '微信':'客户'
			this.refreshGroup();
        },
        beforeDestroy(){
            this.$ws.cmd2003 = null
            window.removeEventListener('resize',this.autoHeight,false)
        },
        destroyed(){
			clearInterval(this.intVal);
            this.intVal = null
		}
}
</script>
<style>
.updat{
    width:30px;
    height:30px;
    line-height:33px;
    text-align:center;
    background:#5AA9CD;
    color:#fff;
    border-radius:100%;
    margin:0 auto;
    cursor:pointer;
}
    .bg-row-gray{
            background:#f2f2f2;
        }
    .wrap{
        height: calc(100vh - 90px);		
        background:#fff;
    }
    .flat{
        float:left;
    }
    .flatr{
        float:right;
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
	}
	
    .bg-row,.bg-row-gray{
		height:58px;
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
    
    .loseMation .scrollheade .ant-table-thead > tr > th{
        color:#fff !important;    
    }
    .loseMation{
        position:relative;
    }
    .loseMation .ant-tabs-bar {
		border-bottom: 10px solid #f0f2f5;
		margin-bottom: 0;
	}
	.loseMation .ant-table-thead > tr > th {
		background:none;
        border-bottom:none;
	}
    .loseMation .ant-table-thead > tr > th,.customer-list .ant-table-tbody > tr > td {
        padding: 10px;
    }
    .bottomPage{
    	width: 100%;
		background:#fff;
		height:50px;
        padding:8px 34px 0 0;
        color:#222;
        border-bottom:1px solid #E6E5E5;
    }
    .bottomPageK{
        position:absolute;
        bottom:0;
        color:#fff;
        height:50px;
        width: 100%;
        padding:8px 34px 0 0;
        background:rgba(34, 34, 34, 0.7);
        border-bottom:1px solid #E6E5E5;
       
    }
	.bottomPageK>.col{
            color:#fff;
    }
    .bottomPage::after,.bottomPageK::after{
        display: block;
        clear:both;
        height:0;
        content:'';
        visibility: hidden;
    }
    
.searchNav::after{
    content:'';
    height:0;
    clear:both;
    visibility: hidden;
    display: block;
}
    .search{
		width:240px;
		margin:20px;
		vertical-align: middle;
	}
    .searchBack{
        width:80px;
		margin:20px;
		vertical-align: middle;
    }
   .wrap .searchNav .ant-input-suffix{
		padding:8px;
		background:#5AA9CD;
		display:block;
		border-radius:0 4px 4px 0;
	}
	.searchNav .ant-input-search-icon{
		color:#fff ;
	}
	.searchNav .ant-input-search:not(.ant-input-search-small) > .ant-input-suffix{
		right:0;
	}
    /* .botomCheck{
        float:left;
        vertical-align: middle;
        margin-left:38px;
        margin-top:6px;
    }
    */
    .ant-table-header{
		overflow-y: hidden !important;
	}
</style>


