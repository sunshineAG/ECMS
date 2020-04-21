<style lang="less" scoped>
     .collection-list{
        background: #ffffff;
        position: relative;
        padding:0 14px;
        border-radius:3px;
        height: calc(~"100vh - 90px");
        .header {
            padding: 12px 0;
            line-height: 36px;
            .add-user {
                //margin-top: 14px;
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
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
      
    .order-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .order-content-left {
            width: 350px;
            display: inline-block;
            color: #101010;
            .left-item {
                line-height: 50px;
                .item-title {
                    margin-right: 20px;
                }
            }
        }
        .order-content-right {
            width: 600px;
            display: inline-block;
            color: #101010;
            .left-item {
                line-height: 50px;
            }
        }
    }
    
</style>

<template>
    <div class="collection-list">
        <div class="header" ref="header">
            <a-form   layout="inline" :form="form" >
                <a-row class="clr" type="flex" align="middle">
                    <div>
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
                    <div>
                        <a-form-item label="操作人">
                            <a-select v-model="queryParam.name" @change="managerChange"  style="width: 150px;"  placeholder='选择客户经理' :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                                <a-select-option  v-for="(item,idx) in managerList" :key="item.id">
                                    {{item.user_name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                     <div>
                        <a-form-item label="收款类型">
                            <a-select v-model="queryParam.type" style="min-width:130px;" @change="getRecord">
                                <a-select-option key="0">
                                    全部
                                </a-select-option>
                                <a-select-option key="2">
                                    转账
                                </a-select-option>
                                <a-select-option key="1">
                                    红包
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item label="收款状态">
                            <a-select v-model="queryParam.state" style="min-width:130px;" @change="getRecord">
                                <a-select-option key="1">
                                    未处理
                                </a-select-option>
                                <a-select-option key="2">
                                    已处理
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                     <div>
                        <a-form-item>
                            <a-date-picker @change="onChangeDate" style="width: 150px" placeholder="选择日期" :disabledDate='disabledDate'/>
                        </a-form-item>
                    </div>
                    <div>
                        <a-form-item>
                            <a-input-search  v-model="queryParam.text" enterButton placeholder='请输入用户姓名、联系电话' style="width: 300px;" @search="handleSubmit" maxlength="15"/>
                        </a-form-item>
                    </div>
                </a-row>
            </a-form>
        </div>
        <div class="content">
            <a-table :columns="columns" ref="table" :dataSource="recordList" :class='[heightFlg?"scrollheade":"scrollheader"]' :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"  :pagination="false" :loading='loading' :locale='locale'  type="checkbox" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id" :scroll="{y:sheight}">
                <template slot="user_img" slot-scope="text, record, index">
                    <div>
                        <img :src="record.user_img" @error="imgExists($event)" style="width: 40px;height: 40px;border-radius: 50%">
                        <span>{{record.user_name}}</span>
                    </div>
                </template>
                <template slot="take_money_img" slot-scope="text, record, index">
                    <div>
                        <img :src="record.take_money_img" @error="imgExists($event)" style="width: 40px;height: 40px;border-radius: 50%">
                        <span>{{record.take_money_name}}</span>
                    </div>
                </template>
                <template slot="cl_type" slot-scope="text,record,index">
                    <div>
                        <span style="vertical-align:middle;">{{text===1?'订单':text===2?'其它':''}}</span>
                        <span v-if="text===0" @click="edit(record)" style="cursor:pointer;color: #5aa9cd">添加</span>
                        <img  v-else src="../../assets/info.svg" alt=""  class="info"  @click="edit(record)"  style="vertical-align:middle;width:16px;cursor:pointer;">
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
                        <!-- <a href="javascript:void(0);" @click="edit(record)" style="padding-right: 15px;">编辑</a> -->
                        <a href="javascript:void(0);">
                            <span v-if="record.cl_status=='0'" @click="change(record)" >处理</span>
                            <span v-if="record.cl_status=='1'" style="color: #F17074">已处理</span>
                        </a>
                        <!-- <a href="javascript:void(0);" @click="del(record)">删除</a> -->
                    </div>
                </template>
            </a-table>
            <!-- <div class="status" v-if="!recordList.length">
                <data-status :width="200" :hieght="330" class="stausPage" ></data-status>
            </div> -->
             <div ref="bottomPage" class="collection">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="recordList.length" >
                    <span style="vertical-align: middle;" v-if="queryParam.state==='1'">
                        <a-checkbox class="botomCheck" :checked="checkAll" @change="checkedAll"></a-checkbox>
                        <a-button type='primary' v-if="selectedRowKeys.length" style="float:left;margin-left:40px;" @click="change(false)" :disabled="selectedRowKeys.length?false:true" >批量处理</a-button>
                        <span style="vertical-align:middle;margin-left:20px;" v-if="selectedRowKeys.length">已选: {{selectedRowKeys.length}} 个 总: {{recordList.length}} 个</span>
                    </span>
                    <a-pagination v-if="recordList.length"  showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>

        <!--收款、红包信息-->
        <a-modal
                title="收款信息"
                cancelText="取消"
                okText="确定"
                :visible="orderModal"
                @ok="saveOrderModal"
                @cancel="orderModal=false"
                :width="960"
        >
            <div class="order-content">
                <div class="order-content-left">
                    <div class="left-item">
                        <span class="item-title">客户信息：</span>
                        <img :src="selectOrder.user_img" alt="" style="width: 40px;height: 40px;border-radius: 50%">
                        <span>{{selectOrder.user_name}}</span>
                    </div>
                    <div class="left-item">
                        <span class="item-title">收款类型：</span>
                        <a-radio-group  v-model="selectOrder.type" :disabled="true">
                            <a-radio :value="2">转账</a-radio>
                            <a-radio :value="1">红包</a-radio>
                        </a-radio-group>
                    </div>
                    <div class="left-item">
                        <span class="item-title">收款时间：</span>
                        <span>{{selectOrder.take_date}}</span>
                    </div>
                    <div class="left-item">
                        <span class="item-title">收款金额：</span>
                        <span>{{selectOrder.price}}</span>
                    </div>
                </div>
                <div class="order-content-right">
                    <div class="left-item">
                        <span class="item-title">收款信息：</span>
                        <a-radio-group  v-model="orderDetail.cl_type">
                            <a-radio value="1">订单</a-radio>
                            <a-radio value="2">其他</a-radio>
                        </a-radio-group>
                    </div>
                    <div style="background: #ededed;padding:15px 30px">
                        <!--<div class="left-item" v-if="orderDetail.cl_type=='1'">-->
                            <!--<span class="item-title">类型：</span>-->
                            <!--<a-radio-group  v-model="orderDetail.order_type">-->
                                <!--<a-radio value="10">购买</a-radio>-->
                                <!--<a-radio value="20">赠送</a-radio>-->
                            <!--</a-radio-group>-->
                        <!--</div>-->
                        <div class="left-item" v-if="orderDetail.cl_type=='1'">
                            <span class="item-title">订单号：</span>
                            <a-input v-model="orderDetail.order_id" maxlength="30" style="width: 435px"/>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='1'">
                            <span class="item-title" style="margin-right: 14px">类别：</span>
                            <a-select v-model="orderDetail.type_class" @change="handleClassChange" style="width: 436px">
                                <a-select-option v-for="(item,index) in goodsClass" :key="item.id" >
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='1'">
                            <span class="item-title" style="margin-right: 14px">名称：</span>
                            <a-select v-model="orderDetail.goods_id" @change="selectChange" style="width: 436px">
                                <a-select-option v-for="(item,index) in goodsAll" :key="item.id">
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='1'" style="margin-bottom: 9px">
                            <span class="item-title" style="margin-right: 14px">数量：</span>
                            <a-input v-model="orderDetail.num" maxlength="10" style="width: 436px"/>
                        </div>
                        <div class="left-item" v-if="orderDetail.cl_type=='2'">
                            <span class="item-title" style="vertical-align: top;margin-right: 14px">备注：</span>
                            <a-textarea :rows="3" v-model="orderDetail.desc" maxlength="25" style="width: 436px"/>
                        </div>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
    import moment from 'moment';
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'
    var comConf = require('../../common/comConfig');
    export default {
        name: "",
        components:{
            dataStatus
        }
        ,data(){
            return{
                sheight:'calc(100vh - 208px)',
                form: this.$form.createForm(this),
                checkAll:false,
                heightFlg:false,
                selectedRowKeys:[],
                queryParam:{
                    name:'0',
                    text:'',
                    state:'1',
                    type:'0',
                    time:'',
                    department_id:''
                },
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                loading:false,
                managerList:[],
                recordList:[],
                columns:[
                    {
                        title: '客户',
                        dataIndex: 'user_img',
                        width:'10%',
                        align:'left',
                        scopedSlots: {
                            customRender: 'user_img'
                        }
                    },
                    // {
                    //     title: '联系电话',
                    //     align:'center',
                    //     dataIndex: 'tel'
                    // },
                    {
                        title: '收款金额',
                        align:'center',
                        width:'10%',
                        dataIndex: 'price'
                    },
                    {
                        title: '收款类型',
                        align:'center',
                          width:'10%',
                        dataIndex: 'type',
                        customRender:function (text, record, index) {
                            if(text=='1') {
                                return '红包'
                            }else {
                                return '转账'
                            }
                        }
                    },
                    {
                        title: '收款微信号',
                        width:'15%',
                        dataIndex: 'take_money_img',
                        align:'left',
                        scopedSlots: {
                            customRender: 'take_money_img'
                        }
                    },
                    {
                        title: '收款时间',
                        width:'15%',
                        align:'center',
                        dataIndex: 'take_date',
                        sorter: (a, b) => moment(a.take_date).valueOf() - moment(b.take_date).valueOf(),
                    },
                  
                    {
                        title: '收款信息',
                        width:'15%',
                        align:'center',
                        dataIndex: 'cl_type',
                        scopedSlots: {
                            customRender: 'cl_type'
                        }
                    },
                    {
                        title: '操作人',
                        width:'10%',
                        align:'center',
                        dataIndex: 'operate'
                    },
                    {
                        title: '操作',
                        width:'10%',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                page_size:10,
                page:1,
                total:0,
                pageMoney:'0',
                totalMoney:'0',
                orderModal:false,
                orderDetail:{},
                selectOrder:{},
                goodsClass:[],
                goodsAll:[],
                showFlag:false,
                departmentList:[],
                disableDepartment:true
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
            recordList:function(){
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
            moment,
            autoHeight(){
                let that = this
                let obj = comConf.autoHeight(that.$refs.header,that.$refs.table);
                if(obj){
                    that.sheight = obj.sheight?obj.sheight - that.$refs.header.offsetHeight +15:''
                    that.heightFlg = obj.heightFlg
                }
            },
            refresh() {
                this.getRecord()
            },
            onSelectChange(selectedRowKeys){
               this.selectedRowKeys = selectedRowKeys
               selectedRowKeys.length<this.customerList.length? this.checkAll = false:this.checkAll = true;
            },
            checkedAll(){
                if(!this.checkAll){
                    this.selectedRowKeys = [];
                    this.recordList.forEach(el=>{
                        this.selectedRowKeys.push(el.id)    
                    })
                }else{
                    this.selectedRowKeys = [];
                }
                this.checkAll = !this.checkAll;
            },
            batchInfo(){
                
            },
            managerChange(val){
                //选择客户经理
                this.queryParam.name = val;
                this.getRecord()
            },
            onChangeDate(date,dateStrings) {
                this.queryParam.time = dateStrings;
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getRecord()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getRecord()
            },
            disabledDate(current) {
				return current <  moment('1900-01-01','YYYY-mm-dd').startOf('day')
			},
            handleSubmit() {
                this.loading = true;
                this.page = 1
                this.page_size = 10
                this.showFlag = false
                this.getRecord()
            },
            selectChange(value){
//                this.orderDetail.goods_id = value;
                this.$set(this.orderDetail,'goods_id',value)
                this.$forceUpdate()
            },
            getRecord() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/money-list',
                    data:Object.assign(this.queryParam,{p:this.page,n:this.page_size})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        console.log(udata.data.list)
                        this.recordList = udata.data.list
                        this.loading = false;
                        this.total = parseInt(udata.data.count)
                        this.selectedRowKeys = []
                        this.totalMoney = udata.data.total_amounts
                        this.pageMoney = udata.data.total_amount
//                        this.pageMoney = 0
//                        this.recordList.forEach(el=>{
//                            this.pageMoney= this.floatAdd(this.pageMoney,el.price)
//                        })
                        this.recordList.length>0&&(this.showFlag = true)
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
//            浮点数加法
            floatAdd(arg1, arg2) {
                var r1, r2, m, c;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                }
                catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                }
                catch (e) {
                    r2 = 0;
                }
                c = Math.abs(r1 - r2);
                m = Math.pow(10, Math.max(r1, r2));
                if (c > 0) {
                    var cm = Math.pow(10, c);
                    if (r1 > r2) {
                        arg1 = Number(arg1.toString().replace(".", ""));
                        arg2 = Number(arg2.toString().replace(".", "")) * cm;
                    } else {
                        arg1 = Number(arg1.toString().replace(".", "")) * cm;
                        arg2 = Number(arg2.toString().replace(".", ""));
                    }
                } else {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
                return (arg1 + arg2) / m;
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
            edit(item) {
                this.selectOrder = item
                this.getOrderDetails(this.selectOrder.id)
            },
            del(item) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/del-moneylist',
                    data:{
                        id:item.id,
                        type:item.type
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.getRecord()
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            change(item) {
                let data = {}
                let id = [];
                let type=[];
                if(!item){
                    this.recordList.forEach(el=>{
                        id.push(el.id);
                        type.push(el.type)
                    })
                    data = {
                        id:id,
                        type:type
                    }
                }else{
                    data = {
                        id:item.id,
                        type:item.type
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/money-status',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.getRecord()
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            getOrderDetails(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/money-order-edit',
                    data:{
                        id:id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data=='') {
                            this.orderDetail = {
                                cl_type:'1',
                                order_type:'10'
                            }
                            this.orderDetail.goods_id = ''
                            this.getGoodsClass()
                        }else {
                            this.orderDetail = udata.data
                            this.getGoodsClass()
                            if(this.orderDetail.cl_type=='1') {
                                this.getGoodsAll(udata.data.type_class,false)
                            }
                        }
                        this.orderModal =true
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            saveOrderModal() {
                let data = {
                    cl_type:this.orderDetail.cl_type,
                    sk_id:this.selectOrder.id,
                    type:'1',
                    friends_id:this.selectOrder.user_id,
                    goods_id:this.orderDetail.goods_id,
                    num:this.orderDetail.num,
                    desc:this.orderDetail.desc,
                    order_type:'10',
                    price:this.selectOrder.price,
                    order_id:this.orderDetail.order_id
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/money-order-add',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.orderModal = false
                        this.orderDetail = {
                            cl_type:'1',
                            order_type:'10'
                        }
                        this.getRecord()
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
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
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            handleClassChange(value) {
                this.getGoodsAll(value,true)
            },
            getGoodsAll(classId,bool) {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/class-goods-all',
                    params:{classId:classId}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsAll = udata.data
                        //let flag =false
                        if(this.goodsAll.length==0) {
                            this.orderDetail.goods_id = ''
                            this.$message.warning('当前类别暂无商品，请先添加商品')
                            return
                        }else {
                            bool&&(this.orderDetail.goods_id = udata.data[0].id)
                        }
                    }else{
                        this.$message.warn(udata.msg)
                    }
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
                this.$store.state.user.user.department.id===selectedKeys?this.disableDepartment = true:this.disableDepartment = false;
                this.page = 1
                this.page_size = 10
                this.queryParam.department_id = selectedKeys
                this.getUserList()
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
                        user_id? this.queryParam.name = user_id: this.managerList[0]&&this.managerList[0].id?this.queryParam.name = this.managerList[0].id:(this.managerList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.queryParam.name = '0')
                        this.getRecord()
//                        this.managerList[0]&&this.managerList[0].id?this.queryParam.name = this.managerList[0].id:(this.managerList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.queryParam.name = '0')

                    }
                })
            },
        },
        created(){
            this.treeList()
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.autoHeight,false)
        },
    }
</script>
