<style lang="less" scoped>
     .collection-list{
        background: #ffffff;
        position: relative;
        padding:0 14px;
        border-radius:3px;
        height: calc(~"100vh - 90px");
        .header {
            padding: 12px 0;
            line-height: 38px;
            .add-user {
                margin-top: 6px;
                float: right;
            }
        }
        .content {
            position:relative;
            
            .cartPerson{
                vertical-align: middle;
                .avatar{
                    width:20px;
                    height:20px;
                    border-radius:100%;
                }
            }
            .delt{
                cursor: pointer;
            }
            
             .status{
                position:relative;
                background:#F5F5F5;
                height:226px;
                .stausPage{
                    position:absolute;
                    left:50%;
                    top:30px;
                    z-index:999;
                    transform: translate(-60%,0);
                }
            }
            // .botomCheck{
            //     float:left;
            //     vertical-align: middle;
            //     margin-left:42px;
            //     margin-top:6px;
            // }
        }

    }
</style>
<style>
</style>
<template>
    <div class="collection-list">
        <div class="header" ref="header">
            <a-input-search style="width:300px;" placeholder="请输入您要搜索的敏感词" v-model="searchKey" @search='searchfn' enterButton></a-input-search>
            <a-button class="add-user" type="primary" @click="add_sensitive">新建</a-button>
        </div>
        <div class="content">
            <a-table :columns="columns" ref="table" :dataSource="wordList" :pagination="false" :class='[heightFlg?"scrollheade":"scrollheader"]'   :locale="locale" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"   :loading='loading'   type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id"  :scroll="{y:sheight}">
                <template slot="type" slot-scope="text,record,index">
                    <a-badge :status="text==='10'?'warning':'error'" style="vertical-align: middle;"></a-badge>
						<span style="vertical-align:middle;">
							{{text==='10'?'告警':'告警并阻止'}}
						</span>
                </template>
                <template slot="user_name" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <img :src="record.user_avatar" alt="" class="avatar">
                        <span class="cartPerson">{{text}}</span>
                    </div>
                </template>
                <template slot="stat" slot-scope="text,record,index">
                    <span v-if="text==='0'">
                        {{text}}    
                    </span>
                    <a href="javascript:;" v-if="text!='0'" @click="infoWord(record)" >{{text}}</a>
                </template>
                <template slot="action" slot-scope="text,record,index">
                    <span class="delt">
                        <a-popconfirm title="删除将同步删除触发记录？"   @confirm="actionFn('2',record)">
                            删除
                        </a-popconfirm>
                    </span>
                </template>
            </a-table>
            <!-- <div class="status" v-if="!wordList.length">
                <data-status :width="200" :hieght="330" class="stausPage" ></data-status>
            </div> -->
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="wordList.length" >
                    <span style="vertical-align: middle;" >
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                         <a-popconfirm title="删除将同步删除触发记录？"   @confirm="actionFn('3')"  v-if="selectedRowKeys.length>1">
                        <a-button type='primary' v-if="selectedRowKeys.length" style="float:left;margin-left:33px;"  :disabled="selectedRowKeys.length>1?false:true" >批量删除</a-button>
                         </a-popconfirm>
                        <span style="vertical-align:middle;margin-left:20px;" v-if="selectedRowKeys.length">已选: {{selectedRowKeys.length}} 个 总: {{wordList.length}} 个</span>
                    </span>
                    <a-pagination v-if="wordList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="新建敏感词"
            cancelText="取消"
            okText="确定"
            :visible="selectTagFlag"
            @ok="actionFn('1')"
            @cancel="cancelLabel"
        >
            <div class="tag-modal">
             <label for="word">
                敏感词： <a-input id='word' placeholder="请输入敏感词" v-model="newWord" style="width:320px;"></a-input> 
             </label>
            <p style="margin-top:20px;padding-left:60px;">
                <a-radio-group @change="onChangeValue" v-model="radioValue">
                    <a-radio :value="10" style="margin: 0 10px 20px 0;">告警</a-radio>
                    <a-radio :value="20" style="margin-bottom: 20px;">告警并阻止</a-radio>
                </a-radio-group>
            </p>
            </div>
        </a-modal>
    </div>
</template>
<script>
    var comConf = require('../../common/comConfig');
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'
    export default {
        name: "",
        components: {
            dataStatus
        },
        data(){
            return{
                sheight:'calc(100vh - 208px)',
                searchKey:'',
                newWord:'',
                radioValue:10,
                loading:false,
                checkAll:false,
                heightFlg:false,
                selectTagFlag:false,
                total:0,
                page:1,
                page_size:10,
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                wordList:[],
                selectedRowKeys:[],
                columns:[
                      {
                        title: '敏感词',
                        align:'left',
                        width: 100,
                        dataIndex: 'name'
                    },
                    {
                        title: '类型',
                        align:'left',
                        width: 100,
                        dataIndex: 'type',
                        scopedSlots: {
                            customRender: 'type'
                        }
                    },
                    {
                        title: '创建时间',
                        width: 150,
                        dataIndex: 'created',
                        align:'center',
                    },
                    {
                        title: '创建人',
                        width: 100,
                        dataIndex: 'user_name',
                        align:'center',
                        scopedSlots: {
                            customRender: 'user_name'
                        }
                    },
                    {
                        title: '触发数',
                        width: 100,
                        dataIndex: 'stat',
                        align:'center',
                        scopedSlots: {
                            customRender: 'stat'
                        }
                    },
                    {
                        title: '操作',
                        width: 100,
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ]
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            window.addEventListener('resize',this.autoHeight,false)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        beforeCreate(){
          
        },
        watch:{
            wordList:function(){
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
            searchfn(){
                this.page = 1;
                this.page_size = 10;
                this.refreshGroup();
            },
            add_sensitive(){
                this.selectTagFlag = true;
                this.radioValue = 10;
            },
            cancelLabel(){//取消
                this.selectTagFlag = false;
                this.newWord = '';
                // this.radioValue = '10';
            },
            checkedAll(){
                if(!this.checkAll){
                    this.selectedRowKeys = [];
                    this.wordList.forEach(el=>{
                        this.selectedRowKeys.push(el.id)    
                    })
                }else{
                    this.selectedRowKeys = [];
                }
                this.checkAll = !this.checkAll;
            },
            onSelectChange(selectedRowKeys){
                console.log(selectedRowKeys)
                if(selectedRowKeys.length === this.wordList.length){
                    this.checkAll = !this.checkAll;
                }
                this.selectedRowKeys = selectedRowKeys;
            },
            infoWord(item){//触发次数详情
                this.$router.push({path:'/riskManagement/sensitiveWordDetails',query:{'id':item.id,'type':item.type,'name':item.name}});
            },
            onChangeValue(e){
                this.radioValue = e.target.value;
            },
            actionFn(type,item){//删除当前敏感词
                //type=1 新建 type=2 逐条删除 type=3 批量删除
                let data = {}    
                if(type==="1"){
                    if(!this.newWord){
                        return this.$message.warn('敏感词名称不能为空');
                    }
                    data = {
                        action:'create',
                        name:this.newWord,
                        type:this.radioValue
                    }
                }else if(type==='2'){
                    data = {
                        action:'delete',
                        id:item.id
                    }
                }else{
                    data={
                        action:'delete',
                        id:this.selectedRowKeys
                    }
                }
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/risk/sensitive-save',
                    data:data
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        this.$message.success(udata.msg);
                        this.refreshGroup();
                        this.selectedRowKeys = []
                        if(type==="1"){
                            this.newWord = '';
                            this.radioValue = 10;
                            this.selectTagFlag = false;
                        }
                    }
                })
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.selectedRowKeys = [];
                this.refreshGroup()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.selectedRowKeys = [];
                this.refreshGroup()
            },
            refreshGroup(){
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/risk/sensitive-words',
                    data:{
                        p:this.page,
                        n:this.page_size,
                        search:this.searchKey
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status===1){
                        this.wordList = udata.data.list;
                        this.total = parseInt(udata.data.count)
                    }
                })
            },  
        },
        created(){
            this.refreshGroup();
            setTimeout(_=>{
                this.autoHeight()
            },0)
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.autoHeight,false)
        },
    }
</script>
