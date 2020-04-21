<template>
	<div>
        <div class="header">
            <a-form  layout="inline" :form="form"  class="headerForm">
                <a-row >
                    <a-col :span="18">
                        <div class="fl">
                            <a-form-item>
                                <a-input-search placeholder="请输入关键字" style="width: 200px;"  v-model="queryParam.key" @search="onSearch" enterButton/>
                            </a-form-item>
                            <a-form-item label="选择部门">
                                <a-tree-select
                                        :treeData="departmentList"
                                        :treeDefaultExpandAll="true"
                                        v-model="queryParam.department_id"
                                        @select="onSelect"
                                        style="min-width: 200px"
                                >
                                </a-tree-select>
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="6" style="height: 39px;line-height: 39px;text-align: left">
                        <div class="fr">
                            <a-button type="primary" @click="addkeyWord">新建</a-button >
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div v-if="taskListFlg" style="text-align: center;padding:50px 0 ;width: 100%;background: #fff;margin-top:10px;">
			<img src="../../assets/add.png" alt="" style="width: 100px;height: 100px;margin-bottom: 20px;cursor: pointer" @click="addkeyWord">
			<p style="font-size: 24px">未创建关键词回复</p>
			<div style="background: #eaeaea;text-align: left;margin: 50px 10%;padding: 15px">
				<div style="font-weight: 700;margin-bottom: 10px">关键词回复功能介绍</div>
				<div style="color: rgb(102,102,102)">
					1、设置关键词自动回复，可以通过添加规则（规则名最多为15字数），用好友发送的消息内如果有您设置的关键字,即可把您设置在此规则名中回复的内容自动发送给好友<br/>
					2、匹配方式包含：全匹配（关键字全匹配才生效） 和半匹配（包含关键字生效）
				</div>
			</div>
		</div>
         <div v-else class="mianContent">
            <div class="mainWrap">
            <div class="contentList" v-for="(item, index) in taskList" :key="index" >
                <a-row>
                    <a-col span="18">
                        <div>
                            <div class="lineStyle">
                                <div style="display:flex">
                                <p style="flex:2">
                                    <a-icon type="bars"></a-icon>
                                    <b>规则名称: </b>
                                    <b style="color:#5AA9CD;width:200px;">{{ item.class_name }}</b>
                                </p>
                                <p style="flex:3">
                                    <span style="margin:0 4px 0 30px;">关键词：</span>
                                    <span v-for="(items,indexs) in item.auto_reply" :key="items.id" style="color:#5AA9CD;font-weight: 800">
                                        <b style="margin-right:10px;"> {{items.text}}  </b>
                                    </span>
                                </p>
                                </div>
                            </div>
                            <div class="lineStyle">
                                <span 
                                style="display:inline-block;"
                                class="fl"
                                    >托管信息: </span
                                >
                                <a-icon type="setting" theme="filled" @click="settingTag(item,index)" class="setIcon " style="float:left;margin-top:12px;margin-left:10px;"></a-icon>
                                <div
                                    v-for="(robots, idx) in item.assistantList"
                                    :key="robots.id"
                                    class="fl"
                                >
                                    <a href="#" class="fl robotText">{{
                                        robots.nickname
                                    }}</a>
                                </div>
                                <div
                                    v-for="(el, idx) in item.roomList"
                                    :key="el.id"
                                    class="fl"
                                >
                                    <a href="#" class="fl robotText">{{
                                        el.room_name?el.room_name:'未命名的群'
                                    }}</a>
                                </div>
                                
                                <a href="javascript:;" class="fr infomations" v-if="item.auto_reply.length>=5?true:false"  @click="robitList(item.auto_reply,'关键词详情')"> 
                                    关键词详情</a>
                               <a href="javascript:;" class="fr infomation" v-if="item.roomList.length>=5?true:false" @click="robitList(item.roomList,'群详情')" >
                                群详情</a>  
                                
                            </div>
                        </div>
                    </a-col>
                    <a-col span="6">
                        <!-- <div class="lineStyle fl other">
                            <div>状态</div>
                            <a-button type="primary">启用</a-button>
                        </div> -->
                        <div class="lineStyle fr btnStyle"  style="height: auto">
                            <a-button type="primary" @click="edifFn(item.id)">
                                编辑
                            </a-button>
                            <a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)"   okText="确定" cancelText="取消">
                                    <a-button type="primary" > 删除 </a-button>
                            </a-popconfirm>
                        </div>
                    </a-col>
                </a-row>
            </div>
            </div>
        </div>
        <a-modal :title="obj.title" :footer="null" :visible="com_visible" @cancel="com_handleCancel" width="50%">
                <div class="tag-modal">
                    <a-checkable-tag v-for="(item,index) in obj.infoList"  :key="index"  style="margin-bottom:6px;">
                        {{item.nickname||item.room_name||item.text||'未命名'}}
                    </a-checkable-tag>
                </div>
        </a-modal>
         <a-modal title="托管" :visible="setting" @cancel="setCancel" width="76%" @ok="settingTagOk">
            <p>关键词名称：<span>{{querySetting.title}}</span></p>
            <div>
                <a-row>
                    <a-col span='6'>
                        <p style="height:30px;line-height:30px;">
                            托管信息：<span></span>
                        </p>
                    </a-col>
                    <a-col span='18' style="text-align:right">
                         <a-select v-model="querySetting.user_id "  style="width: 150px;"  placeholder='选择客户经理' @change="setSearch"  :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                            <a-select-option  v-for="(item,idx) in managerList" :key="item.id">
                                {{item.user_name}}
                            </a-select-option>
                          </a-select> 
                         <a-input placeholder="请输入搜索内容" style="width: 200px;margin-bottom: 20px;" v-model="querySetting.key" @search="setSearch" />
                        <a-button type="primary" @click="setSearch">搜索</a-button>
                        <a-button @click="setCancel('reset')">重置</a-button>
                    </a-col>
                </a-row>
            </div>
            <div>
                <div>
                    <a-row>
                        <a-col span="4" class="setTitle" >
                            <span>选择机器人</span>
                        </a-col>
                        <a-col span="20" style="text-align:right;">
                            <span>选择标签:</span>
                             <a-select mode="multiple"  v-model="querySetting.taglabel"  @change="tagListChange" style="min-width:130px;"   placeholder='请选择标签'>
                                <a-select-option v-for="(item,index) in tagList" :key="item.id">
                                    {{item.title}}
                                </a-select-option>
                            </a-select>  
                        </a-col>
                    </a-row>
                    <div  class="setContent clr" ref="setRobotContent" style="max-height:150px;">
                        <a-list :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}"  >
                            <a-list-item  v-for="(item,index) in setrobtList" :key="index" >
                                <div class="publicCard " >
                                    <div style="" :class="[item.flg?' activeSet ':' bodText']" @click="choseRobot(item)">
                                        <img :src="item.avatar_url" alt="" style="width: 40px;height: 40px;margin-bottom:3px;" >
                                        <span style="margin-right: 20px;" >{{item.nickname}}</span>
                                    </div>
                                </div>	
                            </a-list-item>
                        </a-list>
                        <div v-if="logFg" style="text-align:center;color:#acacac;clear:both;margin-bottom:20p;x">加载中...</div>
                    </div>
                </div>
                <div style="margin-top: 50px">
                    <a-row>
                        <a-col span="4" class="setTitle" >
                            <span>选择群</span>
                        </a-col>
                        <a-col span="20" style="text-align:right;">
                            <span>选择标签:</span>
                            <a-select mode="multiple"  v-model="querySetting.grouplabel" @change="groupListChange" style="min-width:130px;"   placeholder='请选择标签'>
                                <a-select-option v-for="(item,index) in groupList" :key="item.id">
                                    {{item.title}}
                                </a-select-option>
                            </a-select> 
                        </a-col>
                    </a-row>
                    <div  class="setContent clr" ref="setContent" >
                        <a-list :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}"  >
                            <a-list-item  v-for="(item,index) in setgrpList" :key="index" >
                                <div class="publicCard " >
                                    <div style="" :class="[item.flg?' activeSet ':' bodText']" @click="choseGrp(item)">
                                        <img src="../../assets/room_avatar.png" alt="" style="width: 40px;height: 40px;margin-bottom:3px;" >
                                        <span style="margin-right: 20px;" >{{item.room_name?item.room_name:'未命名的群'}}</span>
                                    </div>
                                </div>	
                            </a-list-item>
                        </a-list>
                        <div v-if="logFlg" style="text-align:center;color:#acacac;clear:both;margin-bottom:20p;x">加载中...</div>
                    </div>

                </div>
            </div>
        </a-modal>
	</div>
</template>
<script>
    var emoji = require('../../common/emojiMap');
    import { powerObject } from '@/common/util'
	export default {
		name: "keyWordReply",
		components: {

		},
		data() {
			return {
                taskListFlg:false,
                com_visible:false,
                disableDepartment:true,
                img:'../../assets/room_avatar.png',
                setList:[],
                setRobList:[],
                managerList:[],
                setrobtList:[],
                setgrpList:[],
                tagList:[],
                groupList:[],
                form: this.$form.createForm(this),
                setting:false,
                welcoType:10,
                queryParam: {
                    key: "",
                    department_id: "",
                },
                obj:{
                    title:'',
                    infoList:[]
                },
                querySetting:{
                    grouplabel:[],
                    taglabel:[],
                    user_id:'0',
                    key:''
                },
                departmentList:[],
                taskList: [],
                replyId:'',
                count:1,
                rotCount:1,
                logFlg:false,
                logFg:false
            }
		},
		beforeCreate() {
            
		},
		mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
		computed: {

        },
		methods: {
            onSearch(){
                 this.refresh();
            },
            addkeyWord(){
                this.$router.push({path: '/pushMange/setMsg',query:{'option':'2',upPrams:'1',department_id:this.queryParam.department_id}});
            },
            com_handleCancel(){
                this.com_visible = false;
            },
            cancel(){

            },
            settingTag(val,idx){
                let That = this;
                this.replyId = val.id;
                this.setting = true;
                this.querySetting.title= val.class_name;
                val.assistantList.forEach(el=>{
                        this.setRobList.push(el.assistant_id)
                })
                val.roomList.forEach(el=>{
                        this.setList.push(el.room_id)
                })
                this.getRobotList();
                this.getGroup();
                this.getTag();
                this.getRobotTag();
            },
            settingTagOk(){
                this.querySetting.taglabel = [];
                this.querySetting.grouplabel = [];
//                this.querySetting.key="";
                this.pushRobot();
                this.pushGroup();
            },
            setCancel(val){
                if(val==='reset'){
                    this.setrobtList.forEach(el=>{
                         this.$set(el,'flg',false);
                    })
                     this.setgrpList.forEach(el=>{
                         this.$set(el,'flg',false);
                    })
                    this.setList = [];
                    this.setRobList = [];
                    this.setrobtList = [];
                    this.setgrpList = [];
                    this.querySetting.taglabel = [];
                    this.querySetting.grouplabel = [];
                    this.querySetting.key="";
//                    this.querySetting.user_id = this.managerList[0].id||'0';
                    let user_id = ''
                    this.managerList.forEach(el=>{
                        if(el.id === this.$store.state.user.user.user_id){
                            user_id = this.$store.state.user.user.user_id;
                        }
                    })
                    user_id? this.querySetting.user_id = user_id: this.managerList[0]&&this.managerList[0].id?this.querySetting.user_id = this.managerList[0].id:'0'
                    this.getRobotList();
                    this.getGroup();
                }else{
                    this.setrobtList = [];
                    this.setgrpList = [];
                    this.setList = [];
                    this.setRobList = [];
                    this.setting = false;
                }
                this.querySetting.taglabel = [];
                this.querySetting.grouplabel = [];
                this.rotCount = 1;
                this.count = 1;
//                this.querySetting.user_id = this.managerList[0].id||'0';
                let user_id = ''
                this.managerList.forEach(el=>{
                    if(el.id === this.$store.state.user.user.user_id){
                        user_id = this.$store.state.user.user.user_id;
                    }
                })
                user_id? this.querySetting.user_id = user_id: this.managerList[0]&&this.managerList[0].id?this.querySetting.user_id = this.managerList[0].id:'0'
                this.querySetting.key="";
            },
            pushRobot(){
                let That = this;
                this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/sale/bind-room',
                    data:{
                        assistantId:this.setRobList,
                        replyId:this.replyId,
                        type:3
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        That.$message.success(udata.msg)
                        That.setting = false;
                        That.setrobtList = [];
                        That.setRobList = [];
//                        this.querySetting.user_id = this.managerList[0].id||'0';
                        let user_id = ''
                        That.managerList.forEach(el=>{
                            if(el.id === That.$store.state.user.user.user_id){
                                user_id = That.$store.state.user.user.user_id;
                            }
                        })
                        user_id? That.querySetting.user_id = user_id: That.managerList[0]&&That.managerList[0].id?That.querySetting.user_id = That.managerList[0].id:'0'

                        That.querySetting.key="";
                    }else{
                        That.$message.warn(udata.msg)
                    }
                })
            },
            pushGroup(){
                let That = this;
                this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/sale/bind-room',
                    data:{
                        roomIds:this.setList,
                        replyId:this.replyId,
                        type:2
                    }
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status === 1){
                        That.setgrpList = [];
                        That.setList = [];
                        That.refresh();
                    }else{
                        That.$message.warn(udata.msg)
                    }
                })
            },
            setSearch(){
                this.setrobtList = [];
                this.setgrpList = [];
                this.getGroup();
                this.getRobotList();
            },
            robitList(val,title){
                this.obj.title = title;
                this.obj.infoList = val
                this.com_visible = true;
            },
            deleteFn(val){
                ///index.php?r=uc/sale/reply-del
                let that = this;
                this.$axios({
                    method: 'POST',
                    url: 'index.php?r=uc/sale/reply-del',
                    data:{class_id:val,status:10}
                }).then(function(res){
                    console.log(res)
                    that.refresh();
                })
            },
            getRobotList(val){
                let That = this;
                var data = {
                    n:'24',
                    p:this.rotCount,
                    searchkey:this.querySetting.key,
                    department_id: this.queryParam.department_id,
                    label:this.querySetting.taglabel,
                    user_id:this.querySetting.user_id,
                    abnormal:0,
                }
                 this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/system/robot',
                    data:data
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status === 1){
                        udata.data.robotList.forEach(el=>{
                            That.$set(el,'flg',false);
                            That.setrobtList.push(el)
                        })
                        let hash = {};
                        That.setrobtList = That.setrobtList.reduce((preVal, curVal) => {
                            hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
                            return preVal
                        }, [])
                        That.setrobtList.forEach((item,idx)=>{
                            That.setRobList.forEach(el=>{
                                if(el === item.id){
                                        That.$set(item,'flg',true);
                                }
                            })
                        })
                        That.logFg = false;
                        if(That.rotCount === 1){
                            That.addEventScroll()
                        }
                    }
                })
            },
            getGroup(val){
                let That = this;
                var data = {
                    n:'24',
                    p:this.count,
                    key:this.querySetting.key,
                    label:this.querySetting.grouplabel,
                    user_id:this.querySetting.user_id,
                    roomIds:this.setList,
                    replyId:this.replyId,
                    department_id:this.queryParam.department_id
                }
                this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/customer/room-list',
                    data:data
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status === 1){
                        udata.data.list.forEach((el,index)=>{
                        That.$set(el,'flg',false);
                        That.setgrpList.push(el)
                        })
                        let hash = {};
                        That.setgrpList = That.setgrpList.reduce((preVal, curVal) => {
                                hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
                                return preVal
                        }, [])
                        That.setgrpList.forEach((item,idx)=>{
                            That.setList.forEach(el=>{
                                if(el === item.id){
                                        That.$set(item,'flg',true);
                                }
                            })
                        })
                        That.logFlg = false;
                        if(That.count==1){
                            That.addEventScroll('group')
                        }
                    }
                })
            },
            addEventScroll(val){
                if(val==='group'){
                    this.$refs.setContent.addEventListener('scroll',()=>{
                        if((this.$refs.setContent.scrollHeight - this.$refs.setContent.offsetHeight - this.$refs.setContent.scrollTop)<1 ){
                            if(this.count<= Math.ceil(this.setgrpList.length/12)){
                               this.count++
                               this.logFlg = true;
                               this.getGroup()
                            }
                        }
                    })
                }else{
                    this.$refs.setRobotContent.addEventListener('scroll',()=>{
                            if((this.$refs.setRobotContent.scrollHeight - this.$refs.setRobotContent.offsetHeight - this.$refs.setRobotContent.scrollTop)<1 ){
                                if(this.rotCount<Math.ceil(this.setrobtList.length/12)){
                                    this.rotCount++
                                    this.logFlg = true;
                                    this.getRobotList()
                                }
                            }
                        })
                    }
            },
            choseRobot(idx){
                let a = 0;
                idx.flg = !idx.flg;
                if(this.setRobList.indexOf(idx.id) === -1){

                    this.setRobList.push(idx.id);
                }else{
                    this.setRobList.splice(this.setRobList.indexOf(idx.id),1);
                }
            },
            choseGrp(idx){
                idx.flg = !idx.flg;
                if(this.setList.indexOf(idx.id) === -1){
                    this.setList.push(idx.id);
                }else{
                    this.setList.splice(this.setList.indexOf(idx.id),1);
                }
            },
            getTag(){
                let That = this;
                this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/customer/room-label-all',
                    data:{
                        department_id:this.queryParam.department_id
                    }
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status === 1){
                        That.groupList =udata.data;

                    }
                })
            },
            getRobotTag(){
                let That = this;
                this.$axios({
                    method:'POST',
                    url:'index.php?r=uc/material/robot-label',
                    data:{
                        department_id:this.queryParam.department_id
                    }
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status === 1){
                        That.tagList = udata.data.list;
                    }
                })
            },
            groupListChange(val){
                this.querySetting.grouplabel = val;
                 this.setgrpList = [];
                this.count = 1;
                this.getGroup();
            },
            tagListChange(val){
                this.querySetting.taglabel = val;
                this.setrobtList = [];
                this.rotCount = 1;
                this.getRobotList();
            },
            refresh(){
                let that = this;
                this.$axios({
                    method:'GET',
                    url:'/index.php?r=uc/sale/reply-list',
                    params:{
                        departmentId:this.queryParam.department_id,
                        key:this.queryParam.key,
                        all:'1'
                    }
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status === 1){
                        that.taskList = udata.data.list;
                        if(!that.taskList.length){
                                that.taskListFlg = true;
                            }else{
                                that.taskListFlg = false;
                        }
                    }
                })
            },
            edifFn(val){
                this.$router.push({
                    path: "/pushMange/setMsg",
                    query: { option: "2",upPrams:'2',id:val,department_id:this.queryParam.department_id}
                });
            },
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
                this.getUserList()
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
                this.$store.state.user.user.department.id === selectedKeys ? this.disableDepartment = true:this.disableDepartment = false;
                this.queryParam.department_id = selectedKeys
                this.getUserList(selectedKeys)
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
                        user_id? this.querySetting.user_id = user_id: this.managerList[0]&&this.managerList[0].id?this.querySetting.user_id = this.managerList[0].id:(this.managerList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.querySetting.user_id = '0')
                        this.refresh()
                    }
                })
            },
        },
		created() {
            this.treeList();
		}
	}
</script>
<style>
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .clr:after{
        display:block;
        height:'';
        content:'';
        visibility: hidden;
        clear:both;
    }
.setIcon{
    cursor: pointer;
    color:#fff;
    background:#5AA9CD;
    padding:1px;
    /* position: absolute;
    bottom: 12px;
    right: 0; */
}
</style>
<style scoped lang="less">
	.header {
        .headerForm{
            padding: 16px;
            background: #fff;
            height: 72px;
        }
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
    .mainWrap{
        height: calc(~"100vh - 170px");
        overflow-y: auto;
        width:100%;

        }
    .setTitle{
        border-left:4px solid #5AA9CD;
        padding-left:4px;
    }
    .setImgHead{
        width:38px;
        height:38px;
        border:0;
        margin-bottom:2px;
    }
    .setIcon{
        cursor: pointer;
        color:#fff;
        background:#5AA9CD;
        padding:1px;
    }
    .setBody{
        cursor: pointer;
    }
    .bodText:hover{
        background:#5AA9CD;
        color:#fff;
    }
    .activeSet{
    background:#5AA9CD;
     color:#fff!important;
     border-radius: 5px ;
     cursor: pointer;
     height:40px;line-height: 40px;
     margin-right:10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
.bodText{
    cursor: pointer;
    border-radius:5px;
    height:40px;line-height: 40px;
    text-align:left;
    margin-right:10px;
    color:#222;
    background:#fff;
    box-shadow: 0 0 2px rgba(0, 110, 255,.12);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
    .bag{
        width:200px;
        margin-bottom:10px;
        margin-right:20px;
        height:40px;
        line-height:40px;
        box-shadow: 0 0 6px rgba(0, 110, 255,.12);
        border-radius:5px;
    }
    .contImg{
        border-radius:5px 0 0 5px;
        border-right:1px solid rgb(212, 212, 212);
        width:40px;
        height:40px;
        // margin:0 10px 0 0;
    }
    .setContent{
        margin-top:10px;
        background:rgb(240, 240, 240);
        border-radius:10px;
        padding:20px;
        max-height:200px;
        overflow: auto;
    }



    .contentList{

        margin-top:10px;
        padding:10px 10px ;
        background:#fff;
        // overflow-y: auto;
    }
    .infomation,.infomations{
        margin-right:10px;
        position: absolute;
        bottom: 0;
        width: 46px;
        right: -70px;
        z-index: 9;
    }
    .infomations{
        width: 70px;
        top: 0;
        z-index: 9;
        cursor: pointer;
    }
    .robot {
        display: inline-block;
    }

    .lineStyle {
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .other {
        padding-left: 10px;
    }
    .robotText{
        margin-right: 10px;
    }
    .robotText:nth-child(1){
        margin-left:10px;
    }
    .btnStyle {
        padding-top: 4px;
        button {
            display: block;
        }
        button:nth-child(1) {
            margin-bottom: 10px;
        }
    }
</style>