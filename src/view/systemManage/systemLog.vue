<template>
    <div >
        <div class="headr">
            <a-form class="form" >
                 <a-form-item label="部门" class="departmt" :labelCol="labelCol" :wrapperCol="wrapperCol" style="float:left;width:290px;">
                             <a-tree-select class="seltDepartment"
                                        :treeData="departmentList"
                                        :treeDefaultExpandAll="true"
                                        v-model="queryParam.department_id"
                                        @select="onSelect"
                                        style="max-width: 200px"
                                >
                                </a-tree-select>
                        </a-form-item>
                         <a-form-item label="用户: " :labelCol="labelCol" :wrapperCol="wrapperCol" style="float:left;width:270px;">
                            <a-select :allowClear="true"  placeholder="请选择用户" @change="changeUser" v-model="queryParam.user_id" style="width:160px;">
                                <a-select-option :key="items.id" v-for="(items,index) in managerList">
                                    {{items.user_name}}
                                </a-select-option>
						</a-select>
                        </a-form-item>
                        <a-form-item   style="float:left;width:600px;">
                            <div>
                                <span>时间：</span>
                                <span v-for="(item,idx) in tiemNav" :key="idx" :class="[timeId === idx?'timeNv-act':' timeNv']" @click="choseTime(idx)">
                                    {{item.title}}
                                </span>
                                 <a-range-picker :placeholder="['开始时间', '结束时间']"  @change="onChangeDate" style="width:250px;"/>
                            </div>
                        
                        </a-form-item>
                        <a-button type="primary" @click="search" style=" position: absolute;right: 134px;">搜索</a-button>
                        <a-button type="primary" @click="choseTime(0,true)" style=" position: absolute;right: 54px;">刷新</a-button>
            </a-form>
        </div>
        <div class="main-content" >
            <img src="../../assets/status.svg" alt=""  class="stausPage" v-if="!listFlag" >
            <div v-if="listFlag"  v-for="(items,indx) in logoList" :key="indx" style="margin-bottom:10px;">
                <div class="left-month" >
                    <div class="dateMonth" @click="showListInfo(items,indx)">
                            <a-icon :type="iconidx===indx&&iconFlag?'up-circle':'down-circle'"  class="icon" theme="filled"></a-icon>&nbsp;
                            <span style="vertical-align: middle;" class="select"> {{items.date}}</span>
                    </div>
                    <hr class="line">
                </div>
                <div class="rightList" >
                    <div class="logoList" :class="[iconidx===indx&&iconFlag?'':'logClarHeit']" >
                        <div v-for="(item,index) in items.content" :key="index" class="logClar" >
                            <span class="time-left">{{item.htime}}</span>
                            <div class="icon-middle">
                                <span class="icon-m"></span>
                                <p class="icon-line"></p>
                            </div>
                            <p class="Inforight">
                                <!-- <span>{{item.b}}</span>&nbsp;&nbsp;&nbsp; -->
                                <span class="infoRight-text" >{{item.content}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import dateUtil from '../../common/dateUtil'
export default {
    name:'',
    data(){
        return{
            department_id:this.$store.state.user.user.department.id,
            listFlag:false,
            iconFlag:false,
            iconidx:0,
            showList:2,
            departmentList: [],
            managerList:[],
            logoList:[],
            timeId:0,
            tiemNav:[
                {title:'今天',id:1},
                {title:'昨天',id:2},
                {title:'本周',id:3},
                {title:'本月',id:4}
            ],
            queryParam: {
                start_date:'',
                end_date:'',
                user_id: "0",
                department_id:this.$store.state.user.user.department.id,
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
            labelCol:{
                xs: { span: 24 },
                sm: { span: 3 },
			},
        }
    },
    mounted () {
        this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
    updated () {
        this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
    methods:{
        
        showListInfo(val,idx){
            console.log(idx)
            this.iconidx = idx
            // this.iconFlag?this.showList = 2 :this.showList =  val.content.length;
            this.iconFlag  = !this.iconFlag
            // console.log(val)
        },
        changeUser(){

        },
        choseTime(val,bool){

                this.timeId = val;
//                let myDate = new Date();
//                let year = myDate.getFullYear();
//                let month = myDate.getMonth()+1;
//                let day = myDate.getDate();
//                let weekFirstDay = new Date(myDate-(myDate.getDay()-1)*86400000);  // 当前周
//                var weekM = Number(weekFirstDay.getMonth())+1
                 if(val === 0){
//                    今天
                     this.queryParam.start_date = dateUtil('1')[0]
                     this.queryParam.end_date = dateUtil('1')[1]
//                   this.queryParam.start_date  =  year + '-' + month + '-' + day;
//                     this.queryParam.end_date =  year + '-' + month + '-' + day;
                }else if(val === 1){
//                     昨天
                     this.queryParam.start_date = dateUtil('0')[0]
                     this.queryParam.end_date = dateUtil('0')[1]
//                    this.queryParam.start_date  = year + '-' + month + '-' + (day-1);
//                     this.queryParam.end_date = year + '-' + month + '-' + (day-1);
                }else if(val === 2){
//                    本周
                     this.queryParam.start_date = dateUtil('2')[0]
                     this.queryParam.end_date = dateUtil('2')[1]
//                    this.queryParam.start_date  = year + '-' + weekM + '-' + (weekFirstDay.getDay());
//                    this.queryParam.end_date = year + '-' + weekM + '-' + (weekFirstDay.getDay()+6);
                }else if(val === 3){
//                    本月
                     this.queryParam.start_date = dateUtil('3')[0]
                     this.queryParam.end_date = dateUtil('3')[1]
//                    this.queryParam.start_date  = year + '-' + month;
//                    this.queryParam.end_date = year + '-' + month;
                }
                if(bool){
                    this.refresh();
                }
        },
        onChangeDate(time,val){
            this.queryParam.start_date = val[0]
            this.queryParam.end_date = val[1]
            this.choseTime(5)
        },
        treeList(){
            this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
            this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
            this.getUserList();
        },
        listToTree(list,val) {
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
                    this.managerList.unshift({id: '0', user_name: '全部'});
                    this.queryParam.user_id = '0'
                    this.refresh()
                }
            })
        },
        search(){
          this.refresh();
        },
        refresh(){//首次加载数据
            let data = {
                page:'1',
                size:'30'
            };
            this.$axios({
                method:'POST',
                url:'/index.php?r=uc/system/op-log-list',
                data:Object.assign(data,this.queryParam)
            }).then(res=>{
                let udata = res.data;
                if(udata.status){
                    this.logoList = udata.data
                    this.logoList.length?this.listFlag = true:this.listFlag = false;
                }else{
                    this.$message.warn(udata.msg)
                }
            })
        }
    },
    created:function(){
        this.choseTime(0,true);
        this.treeList();
    }
}
</script>
<style lang="less"  scoped> 
  .headr{
        width:100%;
        padding:20px 20px 0 20px;
        background:#fff;
        margin-bottom:20px;
        .btn{
            text-align:right;
        }
        .timeNv{
            margin:0 10px;
            cursor: pointer;
        }
        .timeNv:hover{
            color:#ccc;
        }
        .timeNv-act{
            margin:0 10px;
            color:#5AA9CD;
            cursor: pointer;
        }
        
    }
    .stausPage{
        position: absolute;
        left: 50%;
        top: 50%;
        opacity: .3;
    }
    .headr::after{
         display:block;
            clear:both;
            visibility: hidden;
            height:0;
            content:'';
    }
    .main-content{
        width:100%;
        min-height:460px;
        height:calc(~'100vh - 270px');
        background:#fff;
        padding:60px 30px;
        overflow-y:auto; 
        .left-month{
            float:left;
            width:200px;
            height:60px;

        }
        .rightList{
            margin-left:200px;
        }
        .line{
            float:right;
            width:70px;
            height:1px;
            vertical-align: middle;
            text-align: center;
            margin-top:20px;
            background:#5AA9CD;
            border:none;
        }
        .icon{
            color:#5AA9CD;
            margin-right:4px;
            font-size:24px;
            vertical-align: middle;
        }
        .dateMonth{
            float:left;
            height:46px;
            line-height:40px;
            width:130px;
            border:1px solid #5AA9CD;
            border-radius:10px;
            text-align:center;
            cursor:pointer;
        }
        //.logolist,
        .logClar{
            height:48px;
        }
        .logClarHeit{
            height:118px;
            overflow: hidden;
        }
        .logoList{
            width:100%;
            border:1px solid #5AA9CD;
            border-radius:10px;
            padding:22px;
            .time-left{
                float:left;
                width:60px;
                text-align:center;
            }
            .icon-middle{
                float:left;
                margin:4px 10px 0;
                .icon-m{
                    display:block;
                    width:14px;
                    height:14px;
                    border-radius:10px;
                    border:2px solid #5AA9CD;
                }
                .icon-line{
                    width:1px;
                    height:30px;
                    background:#f0f0f0;
                    margin:0 auto;
                }
            }
            .Inforight{
                float:left;
                padding:0 10px;
                .infoRight-text{
                    color:#5AA9CD;
                }
            }
        }
      .form,.logoList::after{
            display:block;
            clear:both;
            visibility: hidden;
            height:0;
            content:'';
        }
        .select{ //文字不能被选中

            -webkit-user-select:none;

            -moz-user-select:none;

            -ms-user-select:none;

            user-select:none;

        }
        .select:hover{
            color:#5AA9CD;
        }
    }
</style>
<style lang="less" >
    
    
</style>


