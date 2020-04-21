<template>
    <div class="background-color">
        <div class="title" >{{key_word === '1'?'创建欢迎语':'创建关键字' }} / 设置</div>
        <div>
            <template v-if="key_word==='1'">
                <div class='welcome'>
                    <a-form class="mianWrap">
                        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label='任务名称' :validateStatus='rexFlg?"":paramsObj.name?"success":"error"' :help='rexFlg?"":paramsObj.name?"":"请输入任务名称"'>
                            <a-input placeholder="请输入任务名称" v-model="paramsObj.name"></a-input>
                        </a-form-item>
                        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label='时间间隔' :validateStatus='rexFlg?"":paramsObj.interval?"success":"error"' :help='rexFlg?"":paramsObj.interval?"":"请选择时间间隔"'>
                            <a-input-number placeholder="" v-model="paramsObj.interval" :min="5"></a-input-number> 秒
                        </a-form-item>
                        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label='回复内容' v-for="(item,index) in reprlyList" :key="index">
                            <a-icon type="minus-circle-o" class="deleReply" @click="deleReply(index)"> </a-icon>
                            <repely-content v-on:prams='getFn' :editAre="item.areName?item.areName:index"   :dataSourceList='item'></repely-content>
                        </a-form-item>
                        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label=' ' :validateStatus='rexFlg?"":reprlyList.length?"success":""' v-if="reprlyList.length!==3" :colon="false">
                            <!--<div class="addReply"  @click="addReply">-->
                                <!--<a-icon type="plus"></a-icon>-->
                            <!--</div>-->
                            <a-button type="dashed" @click.native="addReply" block icon="plus">添加</a-button>
                        </a-form-item>
                    </a-form>
                    <div style="margin-left: 50px">
                        <p style="color:orangered;padding-top:6px;">提示: 创建完成的欢迎语，需要前往机器人列表/群列表，选择对应机器人/群，进行托管即可生效;也可以在欢迎语列表直接选择需要触发欢迎语的机器人/群</p>
                    </div>
                </div>
            </template>
            <template v-if="key_word ==='2'">
                <div>
                <a-form class="mianWrapKeyWord">
                    <a-row class="keyTop">
                        <a-col span="24" >
                            <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol"  :validateStatus='rexFlg?"":paramsObj.name?"success":"error"' :help='rexFlg?"":paramsObj.name?"":" "' >
                                <span style="padding-left:20px;">规则名称：</span>
                                <a-input placeholder="请输入任务名称" style="display:inline-block;width:500px;"  v-model="paramsObj.name" maxlength="20"></a-input>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <div class="keyContent">
                            <a-col span="3" class="keyLeft">
                                <div style="padding:0 10px;margin:6px 0">
                                    <p style="padding:0 0 18px 20px;"> 关键词 </p>
                                    <div v-for="(item,index) in marryList" :key="item.id" style="margin:6px 0;padding:0 10px;">
                                        <div :class="keyListIdx === index?'actKey keyList':'keyList'"    @click="keyList(index)">
                                            <a-select v-model="item.match_type" placeholder="请选择匹配方式" class="keySelect" style="width:86px;display:inline-block;" @change="changeSelect">
                                                <a-select-option value="0">全匹配</a-select-option>
                                                <a-select-option value="1">半匹配</a-select-option>
                                            </a-select>
                                            <a-input placeholder="请输入关键词" v-model="item.text" :validateStatus='rexFlg?"":item.text?"success":"error"' class="inputKey" ></a-input>
                                            <a-icon type="minus-circle-o" class="keyCircle" @click.stop="delteMarryList(index)"> </a-icon>
                                        </div>
                                    </div>
                                    <div style="width:100%;padding:0 10px;">
                                        <a-button type="dashed"  @click="add"  style="width:100%;">
                                            <a-icon  type="plus"></a-icon>
                                        </a-button>
                                    </div>
                                </div>
                            </a-col>
                            <a-col span="16" class="keyRight card-container" style="overflow-x:auto;" >
                                <a-tabs id="keyTab"  class="ant" >
                                    <a-tab-pane :key='keyListIdx' tab="" style="border:none;margin-left:-20px;">
                                        <a-form-item   class="replyConms" label="回复" :labelCol="labelColKey" :wrapperCol="wrapperCol" v-for="(item,index) in reprlyList" :key="index" >
                                        <div style="position:relative">
                                            <repely-content :editAre="item.areName?item.areName:item.id" v-on:prams='getFn'   :dataSourceList='item' ></repely-content>
                                            <a-icon type="minus-circle-o" @click="delRep(index)" class="iconCir"  ></a-icon>
                                        </div>
                                        </a-form-item>
                                        <a-form-item label=" " :labelCol="labelCol" :wrapperCol="wrapperCol" :colon="false">
                                            <!--<div class="addReply" v-if="reprlyList.length === 3?false:true" @click="addReply">-->
                                                <!--<a-icon type="plus"></a-icon>-->
                                            <!--</div>-->
                                            <a-button v-if="reprlyList.length === 3?false:true" type="dashed" @click.native="addReply" block icon="plus">添加</a-button>
                                        </a-form-item>
                                    </a-tab-pane>
                                </a-tabs>
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <a-col span='24'> <p style="color:orangered;text-align:center;padding-top:6px;">提示：创建完成的关键词，需要前往机器人列表/群列表，选择对应机器人/群，进行托管即可生效;也可以在关键词列表直接选择需要触发关键词的机器人/群</p></a-col>
                    </a-row>
                </a-form>

                </div>
            </template>

            <div style="text-align: right;margin-right:50px;margin-top:40px;">
					<a-button  type="primary" @click="save()">保存</a-button>
					<a-button  @click="back">取消</a-button>
			</div>
        </div>
    </div>
</template>
<script>
import RepelyContent from '../../components/pushMange/RepelyContent';
export default {
    name:'setMsg',
    components:{
        RepelyContent
    },
    data(){
        return {
            department_id:this.$route.query.department_id,
            radioVal:1,
            radioValGroup:1,
            rexFlg:true,
            wlcId:'',
            keyListIdx:0,
            key_word:0,
            key_word_2:'',
            tabPage:'1',
            com_visible:false,
            areList:[],
            reprlyData:[],
            reprlyList:[],
            reprlyListBak:[],
            keyIdxList:[],
            marryList:[],
            welRobotList:[],
            labelColKey: {
                xs: { span: 12 },
                sm: { span: 3 },
            },
            labelCol:{
                xs: { span: 24 },
                sm: { span: 3 },
			},
			wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
			},
            paramsObj:{
                id:'',
                name:'',
                interval:60,
                type:0
            },
            optionBoth:[],
            cuntFlg:true
        }
    },
    methods:{
        deleReply(val){
            this.reprlyList.splice(val,1)
        },
        delRep(val){
            if(this.reprlyList.length && this.reprlyListBak.length){
                this.reprlyList.splice(val,1)
                this.reprlyListBak[this.keyListIdx].splice(val,1)
                this.keyList(this.keyListIdx)
            }else{
                this.reprlyList.splice(val,1)
            }
        },
        changeSelect(value){
            this.select_id = value;//
        },
        add(){
            this.marryList.push({
                match_type:'0'
            })
        },
        keyList(val){
            let that = this;
            let arr = [];
            if(this.reprlyListBak[val]){
                this.reprlyList = [];
                this.reprlyListBak[val].forEach((el,idx) => {
                    this.reprlyList.push(el)
                });
            }else{
                this.reprlyList = [];
            }
            this.keyListIdx = val;
            if(!this.reprlyList.length){
                this.addReply()
            }
        },
        delteMarryList(idx){
            if(this.marryList.length==1) {
                return
            }
            this.marryList.splice(idx,1)
            this.reprlyListBak.splice(idx,1)
            if(this.keyListIdx ==idx) {
                this.keyList(0)
            }else if (this.keyListIdx>=this.marryList.length) {
                this.keyList((this.keyListIdx-1))
            }else{
                this.keyList(this.keyListIdx)
            }
        },
        addReply(){
            let random = Math.round(Math.random() * (100- 1));
            if(this.key_word==='1') {
                this.reprlyList.length==3? this.reprlyList:this.reprlyList.push({areName:'key_'+random});
            }else if(this.key_word==='2'){
                this.reprlyList.length==3? this.reprlyList:this.reprlyList.push({areName:'key_'+random,content: "",id: "",material_id: "0"});
                this.getFn({areName:'key_'+random,content: "",id: "",material_id: "0"})
            }
        },
        refreshGroup(){
            //初始化回复内容列表 
            let that  = this;
            if(this.key_word==='1'){
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/sale/welcome-one',
                    params:{id:this.wlcId}
                }).then(function(res){
                        let udata = res.data;
                        if(udata.status === 1){
                            that.paramsObj.type = udata.data.type;
                            that.paramsObj.name = udata.data.name;
                            that.paramsObj.interval = udata.data.interval;
                            udata.data.data.forEach((el,index)=>{
                                if(el.material){
                                    el.material[0].cl_type='material'
                                    el.material[0].areName = 'key'+Math.round(Math.random() * (100- 1));
                                    that.reprlyList[index] = el.material[0]
                                }if(el.content){
                                   that.reprlyList[index] = {cl_type:'content',areName:'key'+Math.round(Math.random() * (100- 1)),content:el.content[0]}
                                }
                            })
                        }else{
                            that.$message.warn(udata.msg)
                        }
                })
                
            }else if(this.key_word==='2'){
                    this.$axios({
                        method: 'GET',
                        url: '/index.php?r=uc/sale/reply-one',
                        params:{id:this.wlcId}
                    }).then(function(res){
                        let udata= res.data;
                        if(udata.status === 1){
                            that.paramsObj.type = udata.data.type;
                            that.paramsObj.id = udata.data.id;
                            that.paramsObj.name = udata.data.class_name;
                            that.marryList = udata.data.auto_reply;//reply_data
                            that.marryList.forEach((el,idx)=>{
                                that.reprlyListBak.push(el.reply_data)
                            })
                            that.keyList(0)
                        }else{
                            that.$message.warn(udata.msg)
                        }
                    })
            }
        },
        getFn(val){
            //回复内容的数据集合
            console.log(val)
            let that = this;
            if(this.key_word==='1'){
                this.reprlyList.forEach((el,idx)=>{
                    if(el.areName === val.areName){
                        this.reprlyList[idx] = val
                    }
                })
            }else{
                console.log('this.reprlyList',this.reprlyList)
                this.reprlyList.forEach((el,idx)=>{
                    if((el.areName || el.id) === val.areName){
                        this.reprlyList[idx] = val ;
                    }
                })
                let arr = [...this.reprlyList];
                this.reprlyListBak[this.keyListIdx] = arr;
            }
        },
        save(){
            let that = this;
            let data = []
            let paramsArr = []
            let reply_data = []
            if(this.key_word==='1'){
                if(this.key_word_edit === '2'){
                    if(!this.paramsObj.name){
                        this.rexFlg = false;
                        return false
                    }
                    this.paramsObj.id=this.$route.query.id;
                    this.key_word_2 == '1'?this.paramsObj.type = '10':this.paramsObj.type = '20';
                    this.reprlyList.forEach((el,idx)=>{
                        if(el.cl_type === "material" ){
                            data.push({type:'2',material_id:el.id});
                        }else if(el.activeMaterial){
                            data.push({type:'2',material_id:el.activeMaterial[0].id})
                        }else{
                            data.push({type:'1',content:el.content});
                        }
                    })

                }else if(this.key_word_edit === '1'){
                    if(!this.paramsObj.name){
                        this.rexFlg = false;
                        return false
                    }
                    this.tabPage==='1'?this.paramsObj.type = '10':this.paramsObj.type = '20';
                    this.reprlyList.forEach((el,idx)=>{
                            if(el.activeMaterial){
                                data.push({
                                    type:'2',
                                    material_id:el.activeMaterial[0].id
                                })
                            }else{     
                                data.push({
                                    type:'1',
                                    content:el.content
                                })
                            }
                    })
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/welcome-up',
                    data:Object.assign(that.paramsObj,{
                        data:data,
                        status:0,
                        department_id:that.department_id
                    })
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status == 1) {
                        that.$message.success('保存成功');
                        that.$router.push({ path: "/pushMange/welComeMsg"});
                    }else{
                        that.$message.warn(udata.msg)
                    }
                })
            }else if(this.key_word==='2'){
                if(!this.paramsObj.name){
                    this.rexFlg = false
                    return false
                }
                if(this.marryList.length==0) {
                    this.$message.warning('请添加对应的关键词')
                    return false
                }
                if(this.reprlyListBak.length!=this.marryList.length) {
                    this.$message.warning('请添加对应的回复内容')
                    return false
                }
                console.log('this.reprlyListBak',this.reprlyListBak)
                this.reprlyListBak.forEach((els,idx)=>{
                    this.reprlyListBak[idx].forEach((el,idxs)=>{
                        if(el.activeMaterial&&el.activeMaterial.length!=0){
                            reply_data.push({idx:idx,type:'2',material_id:el.activeMaterial[0].id});
                        }else if(el.material) {
                            reply_data.push({idx:idx,type:'2',material_id:el.material_id});
                        }else{
                            reply_data.push({idx:idx,type:'1',content:el.content});
                        }
                    })
                })
                let flag =false
                let sub_title = ''
                this.marryList.forEach((el,idx)=>{
                    if(el && el.text){
//                        if(!!this.paramsObj.id&&(!el.reply_data||el.reply_data.length==0)) {
//                            flag = true
//                            sub_title = '请输入关键词'+el.text+'对应的回复内容'
//                        }
                        el.reply_data = []
                        paramsArr.push(el)
                        reply_data.forEach(els=>{
                            if(idx == els.idx){
                                paramsArr[idx].reply_data.push(els)
                                if((els.type=='1'&&els.content=='')||(els.type=='2'&&els.material_id=='')) {
                                    flag = true
                                    sub_title = '请输入关键词'+ el.text +'对应的回复内容'
                                }
                            }
                        })
                    }else {
                        flag = true
                        sub_title='请输入关键词'
                    }
                })
                if(flag) {
                    this.$message.warning(sub_title)
                    return false
                }

                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/sale/reply-up2',
                    data:{
                        department_id:that.department_id,
                        class_id:this.paramsObj.id?this.paramsObj.id:'',
                        class_name:this.paramsObj.name,
                        data:paramsArr
                    }
                }).then(function(res){
                    let udata = res.data;
                    if(udata.status == 1) {
                        that.$message.success('保存成功');
                        that.$router.push({ path: "/pushMange/keyWordReply"});
                    }else{
                        that.$message.warn(udata.msg)
                    }
                })
            }
            
        
        },
        back(){
            if(this.key_word === '1'){
                this.$router.push({
                    path: "/pushMange/welComeMsg",
                    query: { option: "1"}
                });
            }else{
                this.$router.push({
                    path: "/pushMange/keyWordReply",
                    query: { option: "2"}
                });
            }
        }
       
    },
    created(){
        this.wlcId = this.$route.query.id; 
        this.key_word = this.$route.query.option;
        this.key_word_2 = this.$route.query.prams;
        this.key_word_edit = this.$route.query.upPrams;
        this.key_word_edit==='2'?this.refreshGroup():this.addReply(),this.add();
    },
    destroyed(){
        this.reprlyList = [];
    }
};
</script>
<style lang="less" scoped>
    .ant-tabs-bar>.ant-tabs-nav-container>.ant-tabs-nav-wrap>.ant-tabs-nav>.ant-tabs-ink-bar{border:#ccc;}
    .ant-tabs-nav-wrap>.ant-tabs-nav-animated>.ant-tabs-bar {
        border:1px solid #ccc;
    }
    .inputKey{
        width:174px;
        display:inline-block;
    }
    .ant-tabs-tabpane{
        margin-top: -34px;
         padding-top: 20px;
         background: #fff;
         z-index: 11;
    }

    .iconCir{
        cursor: pointer;
        position: absolute;
        top:48px;
        display: inline-block;
        font-size: 18px;
        right:-22px;
        margin-left:2px;
    }
    .welcome .ant-form-item-label{
        color:orangered;
    }
    .mianWrapKeyWord .ant-tabs{
        padding-top:19px;
    }
    .mianWrapKeyWord .ant-tabs-ink-bar{
        background:#e8e8e8 !important;
    }
    .mianWrapKeyWord .ant-tabs-bar{
        border:none;
    }
    @media all and (max-width: 1024px) {
        .inputKey{
        width:120px;
        display:inline-block;
        }
    }
    @media all and (max-width: 1426px) {
        .inputKey{
        width:184px;
        display:inline-block;
        }
    }
    .keyList{
        cursor: pointer;
        padding:6px 10px;
    }
    .actKey{
        background:#5AA9CD;
        color:#fff;
    }
    .keyTop{
        width:100%;
        padding:20px 0 0 0;
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);
    }
    .keyLeft{
        // width:430px;
        min-width:358px;
        height: calc(~"60vh - 12px");
        // min-width:340px;
        overflow-x: auto;
        padding:20px 0 0 0;
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);
        margin-top:10px;
        margin-left:10px;
        float: left;
        .ant-form-item-label{
            width:80px;
        }
    }
    .keyContent{
        position:relative;
    }
    .keyRight{
        position: absolute;
        left:374px;
        float: left;
        height: calc(~"60vh - 12px");
        min-width: 100px;
        padding:20px;
        // margin-left:10px;
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);
        margin-top:10px;
        overflow-x: auto;
        .ant-form-item-label{
            width:100px;
        }
        .replyConms{
            .ant-form-item-control{
                left:2%;
                // transform: translate(-50%,0);
            }
        }
    }
    .keyCircle{
        cursor:pointer;
        font-size:20px;
    }
    .keyTitl{
        padding-left:20px;
        border-bottom:1px dashed #ccc;
        width:400px;
    }
    .background-color {
            background: #fff;
            height: calc(~'100vh - 40px');
            padding-bottom:60px;
            overflow-y: auto;
    }
    .deleReply{
        position:absolute;
        right:-550px;
        top:54px;
        cursor: pointer;
    }
    .addReply{
        // margin-left:10px;
        width:90%;
        height:40px;
        border:1px dashed #6fabfa;
        border-radius:5px;
        background:rgba(144,189,245,.2);
        color:#6fabfa;
        text-align: center;
        cursor: pointer;
        margin-left:10px;
    }
    .mianWrap{
        width:700px;
        margin-top:50px;
        margin-left:50px;
    }
    .mianWrapKeyWord{
        width:100%;
    }
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .clr{
        display: block;
        content:'';
        height:0;
        visibility: hidden;
        clear:both;
    }

    .material{
        margin-top:6px;
        height:160px;
        padding-bottom:10px;
        // border:1px dashed rgb(13, 85, 167);
        border-radius:5px;
        overflow: hidden;
    }
    .material .ant-card-cover img{
        width:200px
    }
    .input-content {
		// min-height: 100px;
		padding: 10px 0;
		height: auto;
		border-top: none;
		.tools {
			position: absolute;
			bottom: -14px;
			left: -10px;
			display: flex;
			>div {
				padding: 0  2px 0 10px;
				cursor: pointer;
				.anticon svg {
					font-size: 20px;
				}
				#emoji {
					position: absolute;
					top: -165px;
					width: 390px;
					height: 155px;
					left: 0;
					border: 1px solid #cccccc;
					padding: 5px;
					z-index: 10;
					line-height: 1;
					background: #ffffff;
					box-shadow: 0px 1px 10px 3px #ccc;
					&::after {
						margin-top: -1px;
						border: 7px solid transparent;
						border-top-color: #fff;
						content: "";
						position: absolute;
						left: 16px;
						top: 100%;
						margin-left: -5px;
					}
				}
            }
            .fr{
                text-align: right;
                width:200%;
            }
		}
		#edit .div-edit{
			border:1px solid #ccc;
		}
		.input-content-area {
			word-wrap: break-word;
			white-space: normal;
			#emoji {
				position: absolute;
				top: -160px;
				width: 390px;
				height: 155px;
				left: 0;
				border: 1px solid #cccccc;
				padding: 5px;
				z-index: 10;
				line-height: 1;
				background: #ffffff;
			}
		}
	}
    .title{
        padding:16px;
        font-size:16px;
        border-bottom:1px dashed #ccc;
    }
</style>


