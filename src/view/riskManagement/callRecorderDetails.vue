<template>
    <div>
        <div class="header" ref="header">
            <span style="vertical-align:middle;">
               手机编号：<b>{{queryForm.serial_name}}</b>
            </span>
            <a-button class="add-user" @click="back()">  返回</a-button>
        </div>
        <div class="content ">
            <a-table ref="table" :columns="columns" :dataSource="detailsList" :class='[heightFlg?"scrollheade":"scrollheader"]' :pagination="false"  :locale="locale" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"  type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,getCheckboxProps:getCheckboxProps}" :rowKey="(record) => record.id"    :loading='loading' :scroll="{y:sheight}">
                 <template slot="status" slot-scope="text,record,index">
                    <div>
                        <span v-if="record.type==='10'">
                            <img src="../../assets/in_num_0.svg" alt="" class="icon_phone" v-if='text==="10"'>
                            <img src="../../assets/in_num.svg" class="icon_phone" alt="" v-else>
                            {{text==='10'?'呼入':'呼入（未接）'}}
                        </span>
                        <span v-else>
                            <img src="../../assets/out_num.svg" alt="" class="icon_phone" v-if='text==="10"'>
                            <img src="../../assets/out_num_0.svg" class="icon_phone" alt="" v-else>
                            {{text==='10'?'呼出':'呼出（未接）'}}
                        </span>
                    </div>
                </template>
                 <template slot="customer_name" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <img :src="record.customer_avatar" alt="" class="avatar">
                        <span class="cartPerson">{{text}}</span>
                    </div>
                </template>
                 <template slot="user_name" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <img :src="record.user_avatar" alt="" class="avatar">
                        <span class="cartPerson">{{text}}</span>
                    </div>
                </template>
                 <template slot="record" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <audio ref="audio" controls   style="height:32px;outline:none;border:0;" >
                            <source :src="text" type="audio/mpeg">
                        </audio >
                    </div>
                </template>
            </a-table>
            <!-- <div class="status" v-if="!detailsList.length">
                <data-status :width="200" :hieght="330" class="stausPage" ></data-status>
            </div> -->
              <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="detailsList.length" >
                    <span style="vertical-align: middle;" >
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                        <a-button type='primary' v-if="selectedRowKeys.length" style="float:left;margin-left:40px;" @click="download()" :disabled="!selectedRowKeys.length" >批量下载</a-button>
                        <span style="vertical-align:middle;margin-left:20px;" v-if="selectedRowKeys.length">已选: {{selectedRowKeys.length}} 个 总: {{detailsList.length}} 个</span>
                    </span>
                    <a-pagination v-if="detailsList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import dataStatus from '../../components/pageConfig/dataStatus'
export default {
    components: {
        dataStatus
    },
    data(){
        return{
            sheight:'calc(100vh - 208px)',
            loading:false,
            checkAll:false,
            heightFlg:false,
            queryForm:{
                assistant_id:this.$route.query.assistant_id,
                type:this.$route.query.type,
                serial_name:this.$route.query.serial_name
            },
            total:0,
            page:1,
            page_size:10,
            locale:{
                filterConfirm:'',
                filterReset:'',
                emptyText:''
            },
            detailsList:[],
            selectedRowKeys:[],
            columns:[
                 {
                        title: '通话状态',
                        align:'left',
                        width: 150,
                        dataIndex: 'status',
                         scopedSlots: {
                            customRender: 'status'
                        }
                    },
                    {
                        title: '客户',
                        align:'left',
                        width: 100,
                        dataIndex: 'customer_name',
                        scopedSlots: {
                            customRender: 'customer_name'
                        }
                    },
                    {
                        title: '客户电话',
                        width: 100,
                        dataIndex: 'customer_tel',
                        align:'center',
                    },
                    {
                        title: '通话开始时间',
                        width: 150,
                        dataIndex: 'start_time',
                        align:'center'
                    },
                    {
                        title: '操作人',
                        width: 100,
                        dataIndex: 'user_name',
                        align:'center',
                        scopedSlots: {
                            customRender: 'user_name'
                        }
                    },
                    {
                        title: '通话录音',
                        width: 350,
                        dataIndex: 'record',
                        align:'center',
                        scopedSlots: {
                            customRender: 'record'
                        }
                    }
            ],
           
        }
    },
    mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            window.addEventListener('resize',this.autoHeight,false)
    },
    updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
     watch:{
            detailsList:function(){
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
        getCheckboxProps(record){
             return {
                    props: {
                        disabled: !record.record 
                    }
                }
        },
        back(){
            this.$router.push({path:'/riskManagement/callRecorder'});
        },
        download(val){   
            const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
            this.detailsList.forEach(async (item,index) => {
                if(item.record){
                    const res = await delay(3000*index)
                    location.href =  item.record
                }
            })
        },
        checkedAll(){
                if(!this.checkAll){
                    this.selectedRowKeys = [];
                    this.detailsList.forEach(el=>{
                        if(el.record){
                            this.selectedRowKeys.push(el.id)    
                        }
                    })
                }else{
                    this.selectedRowKeys = [];
                }
                this.checkAll = !this.checkAll;
            },
        onSelectChange(selectedRowKeys){
            if(selectedRowKeys.length === this.detailsList.length){
                this.checkAll = !this.checkAll;
            }
            if(!selectedRowKeys.length){
                this.checkAll = false
            }
            this.selectedRowKeys = selectedRowKeys;
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
                url:'/index.php?r=uc/risk/voice-record-detail',
                data:{
                   assistant_id:this.queryForm.assistant_id,
                    type:this.queryForm.type,
                    p:this.page,
                    n:this.page_size
                }
            }).then(res=>{
                let udata = res.data;
                if(udata.status===1){
                    this.total = parseInt(udata.data.count);
                    this.detailsList = udata.data.list;
                    console.log(this.detailsList)
                }
            })
        }
    },
    created(){
        this.refreshGroup();
    },
    befroeDestroy(){
        window.removeEventListener('resize',this.autoHeight,false)
    }
}
</script>
<style lang="less" scoped>
  .header {
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        border-bottom: 2px solid #f0f2f5;
        background:#fff;
        margin-bottom:10px;
        .add-user {
            margin-top: 14px;
            float: right;
        }
    }
    .content{
        background:#fff;
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
            .info{
                width:20px;
                height:20px;
                cursor: pointer;
            }
            .icon_phone{
                width:20px;
                height:20px;
                margin-right:10px;
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
                .col{
                    color:#fff;
                }
            }
            .bottomPage::after,.bottomPageK::after{
                display: block;
                clear:both;
                height:0;
                content:'';
                visibility: hidden;
            }
            // .botomCheck{
            //     float:left;
            //     vertical-align: middle;
            //     margin-left:38px;
            //     margin-top:6px;
            // }
        }
</style>
<style lang="less">
//  .callrec .ant-table-body{
//         padding-top:40px;
//     }
.ant-progress-inner {
    background:#c6c6c6;
}
</style>>