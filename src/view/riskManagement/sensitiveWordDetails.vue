<template>
    <div>
        <div class="header" ref="header">
            <span style="vertical-align:middle;">
                敏感词：<b style="margin-right:20px;">{{name}}</b>
                <label for="">类型：</label>
                <b>
                <a-badge :status="type==='10'?'warning':'error'" :text="type==='10'?'告警':'告警并阻止'" ></a-badge>
                </b>
            </span>
            <a-button class="add-user" @click="back()">   返回</a-button>
        </div>
         <div class="content callrec">
            <a-table :columns="columns" ref="table" :dataSource="infoList" :pagination="false" :class='[heightFlg?"scrollheade":"scrollheader"]'  :locale="locale" :rowClassName="(record, index) => {return index % 2 === 0 ? 'bg-row' : 'bg-row-gray'}"  :loading='loading' :scroll="{y:sheight}">
               
                <template slot="user_name" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <img :src="record.user_avatar" alt="" class="avatar">
                        <span class="cartPerson">{{text}}</span>
                    </div>
                </template>
                <template slot="robot_nickname" slot-scope="text,record,index">
                    <div class="cartPerson">
                        <img v-if="record.robot_avatar" :src="record.robot_avatar" alt="" class="avatar">
                        <span class="cartPerson">{{text}}</span>
                    </div>
                </template>
                <template slot="content" slot-scope="text,record,index">
                    <div style="vertical-align:middle">
                    <span style="vertical-align:middle">{{text}}</span>
                    <img src="../../assets/info.svg" alt="" class="info" @click="sensitiveWordn(record)" style="vertical-align:middle">
                   </div>
                </template>
            </a-table>
             <!-- <div class="status" v-if="!infoList.length">
                <data-status :width="200" :hieght="330" class="stausPage" ></data-status>
            </div> -->
            <div ref="bottomPage">
                <div :class="[heightFlg?'bottomPageK':'bottomPage']" v-if="infoList.length" >
                    <a-pagination v-if="infoList.length" class="col" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;float:right;"/>
                </div>
            </div>
        </div>
        <a-modal
            title="详情"
            :visible="selectTagFlag"
            :footer="null"
             @cancel="cnacelInfo"
             width="880px"
             class="infoModal"
        >
            <div class="titleNav">
                <a-row  >
                    <a-col span='8'>
                        <span class="middle">触发人：</span>
                        <img  :src="historyObj.user_avatar" alt="" class="avatar">
                        <span class="middle">{{historyObj.user_name}}</span>
                    </a-col>
                    <a-col span='8'>
                        <span class="middle">所属部门：</span>
                        <span class="middle">{{historyObj.department_name}}</span>
                    </a-col>
                    <a-col span='8'>
                        <span class="middle">所属微信号：</span>
                        <img  :src="historyObj.robot_avatar" alt="" class="avatar">
                        <span class="middle">{{historyObj.robot_nickname}}</span>
                    </a-col>
                </a-row>
            </div>
            <div class='timeline' ref="timeline">
                <a-timeline>
                    <a-timeline-item :color="item.warn?'red':'blue'"  v-for='(item,index) in historyList' :key="index" :ref="'timelineItem_' + index">
                        <p style="padding-left:10px;margin:6px 0;">{{item.nickname}} <span>{{item.created}}</span></p>
                        <p  v-if="item.type==1" style="padding-left:20px;margin:0;" v-html="item.content"></p>
                        <p v-else-if="item.type==3||item.type==47"  >
                            <img  class="img-content" :src="item.iconurl">
                        </p>
                        <div v-if="item.type==5" class="link-content">
                            <p style="color:#222;font-size:14px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;width: 100%;overflow: hidden;">{{item.title}}</p>
                            <p style="position: relative;margin-top: 10px">
                                <span style="width: 180px;font-size: 12px;color: #999999;min-height: 40px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;">{{item.desc}}</span>
                                <img v-if="item.mediapath==''" src="../../assets/link-img.png" alt="">
                                <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                            </p>
                        </div>
                        <div v-if="item.type==6" class="link-content">
                            <div style="width: 80%;word-break: break-all;color: #101010">{{item.title}}</div>
                            <div style="position: relative;margin-top: 10px">
                                <span style="display: inline-block;width: 150px;font-size: 12px;color: #B3B2B2;">{{item.desc}}</span>
                            </div>
                            <div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 20px;transform: translateY(-50%);border-radius: 4px">
                                <img v-if="item.mediapath==''" src="../../assets/file-img1.png" alt="" style="position: static;transform: translateY(0)">
                                <img v-if="item.mediapath!=''" :src="item.mediapath" alt="" style="position: static;transform: translateY(0)">
                            </div>
                        </div>
                        <div v-if="item.type==33" class="mini-program-content">
                            <div class="title">
                                    <img :src="item.iconurl" alt="">
                                    <span>{{item.alias}}</span>
                                </div>
                                <div class="content" style="max-height: 240px;overflow: hidden">
                                    <span>{{item.title}}</span>
                                    <img  :src="item.mediapath" alt="">
                                </div>
                                <div style="border-top: 1px solid #e5e5e5;color: #999999;font-size: 12px;height: 25px;line-height: 25px">
                                    <img src="../../assets/logoSmall.png" style="width: 15px;height: 15px;margin-left: 10px;position: relative;top: -2px" />
                                    小程序,请在手机上查看
                                    <!--小程序 <span style="float: right;font-size: 12px">详细信息请在手机端查看</span>-->
                                </div>
                        </div>
                        <div  v-else-if="item.type==34" :class="['audio-content',!!item.played?'audio-content-play':'']" >
                            <span style="display: none">
                                <audio :src="item.mediapath" controlsList="nodownload" oncontextmenu="return false" :ref="'audio-div'+chatIndex">
                                    您的浏览器不支持 audio 标签 。
                                </audio>
                            </span>
                            <span class="audio-time">{{item.audio_time}}</span>
                        </div>
                        <div v-if="item.type==42" class="card-content">
                            <div style="position: relative;height: 60px;line-height: 40px;padding: 10px">
                                <img v-if="item.mediapath!=''" :src="item.mediapath" alt="">
                                <img v-if="item.mediapath==''" src="../../assets/cardIcon.png" alt="">
                                <span style="display: inline-block;margin-left: 50px;text-overflow: ellipsis;word-break: break-all;white-space: nowrap;overflow: hidden;width: calc(100% - 50px)">{{item.title}}</span>
                            </div>
                            <div style="border-top: 1px solid #e5e5e5;padding: 0 10px;color: #999999;font-size: 12px;height: 25px;line-height: 25px">{{item.appid.substring(0,3)=='v1_'?'个人名片':'公众号名片'}}</div>
                        </div>
                        <!-- 视频消息 -->
                        <div v-if="item.type==43">
                                <video   style="width:150px;" id="upVideo" v-if="item.mediapath!=''">
                                    <!-- controls -->
                                    <source :src="item.mediapath" type="video/mp4">
                                </video>
                                <img v-else :src="item.iconurl" style="width:150px;height:200px;object-fit: cover">
                        </div>
                        <!-- 红包 -->
                        <div  v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==0" class="redpacket-content">
                            <span class="money-text">{{item.title}}</span>
                        </div>
                        <div v-else-if="item.type==48&&item.send_by==0&&item.chatRedPacket.inner_type==1" class="redpacket-content1" >
                            <span class="money-text">{{item.title}}<br>已领取 ￥{{item.chatRedPacket.money/100 }}</span>
                        </div>
                        <!-- 转账记录 -->
                        <div v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==1" class="money-content">
                            <span class="money-text">{{item.chatTransferMoney.type==0?'点击确认收钱':''}}<br>{{item.content}}</span>
                        </div>
                        <div v-else-if="item.type==49&&item.send_by==0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1">
                            <span class="money-text">{{item.chatTransferMoney.type==0?'已领取':'对方已收钱'}}<br>{{item.content}}</span>
                        </div>

                        <div v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==1" class="money-content">
                            <span class="money-text">{{item.chatTransferMoney.type==0?'':'对方未领取'}}<br>{{item.content}}</span>
                        </div>
                        <div v-else-if="item.type==49&&item.send_by!=0&&item.chatTransferMoney.pay_sub_type==3" class="money-content1">
                            <span class="money-text">{{item.chatTransferMoney.type==0?'已收钱':'对方已领取'}}<br>{{item.content}}</span>
                        </div>
                    </a-timeline-item>
                </a-timeline>
            </div>
        </a-modal>
    </div>
</template>
<script>
    var comConf = require('../../common/comConfig');
    var emoji = require('../../common/emojiMap');
    import dataStatus from '../../components/pageConfig/dataStatus'
    export default {
        components:{
            dataStatus
        },
        data(){
            return{
                sheight:'calc(100vh - 208px)',
                searchKey:'',
                id:this.$route.query.id,
                name:this.$route.query.name,
                type:this.$route.query.type,
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
                historyObj:{},
                historyList:[],
                selectedRowKeys:[],
                infoList:[],
                columns:[
                    {
                        title: '触发时间',
                        align:'left',
                        width: 150,
                        dataIndex: 'created'
                    },
                    {
                        title: '触发人',
                        align:'left',
                        width: 100,
                        dataIndex: 'user_name',
                        scopedSlots: {
                            customRender: 'user_name'
                        }
                    },
                    {
                        title: '所属部门',
                        width: 100,
                        dataIndex: 'department_name',
                        align:'center',
                    },
                    {
                        title: '所属微信号',
                        width: 100,
                        dataIndex: 'robot_nickname',
                        align:'center',
                        scopedSlots: {
                            customRender: 'robot_nickname'
                        }
                    },
                    {
                        title: '触发内容',
                        width: 100,
                        dataIndex: 'content',
                        align:'center',
                        scopedSlots: {
                            customRender: 'content'
                        }
                    }
                ],
                scrollIndex:0,
            }
        },
         mounted () {//
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            window.addEventListener('resize',this.autoHeight,false)
        },
         watch:{
             infoList:function(){
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
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
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
            back(){
                this.$router.push({path:'/riskManagement/sensitiveWord'});
            },
            onSelectChange(){

            },
            cnacelInfo(){
                this.selectTagFlag = false;
                this.historyObj = {};
                this.historyList = [];
            },
            sensitiveWordn(item){
                this.selectTagFlag = true
                this.$axios({
                    method:'POST',
                    url:'/index.php?r=uc/risk/sensitive-detail-record',
                    data:{
                        id:item.id,
                        num:item.type
                    }
                }).then(res=>{
                    let udata = res.data;
                    if(udata.status === 1){
                        this.historyObj = item
                        udata.data.forEach((items,index)=> {
                            if(items.warn){
                                let reg1 = new RegExp(item.name,'g');
                                let str = "<span class='warn'>"+ item.name +"</span>"
                                if(reg1.test(items.content)) {
                                    items.warn ='1'
                                }
                                this.scrollIndex = index
                                items.content = emoji.stringToHtml(items.content.replace(reg1,str))
                            }
                        })
                        this.historyList = udata.data;
                        setTimeout(_=>{
                            console.log(this.$refs["timelineItem_" + this.scrollIndex][0].$el.offsetTop)
                            this.$refs.timeline.scrollTop = this.$refs["timelineItem_" + this.scrollIndex][0].$el.offsetTop - 300
                        },0)
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
                        url:'/index.php?r=uc/risk/sensitive-detail',
                        data:{
                            p:this.page,
                            n:this.page_size,
                            id:this.id
                        }
                    }).then(res=>{
                        let udata = res.data;
                        if(udata.status===1){
                            this.infoList = udata.data.list;
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
        position: relative;
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
    }

</style>
<style lang="less" >
    .infoModal {
        .ant-modal-body{
            padding:0 0 6px 0;
        }
        .ant-timeline-item{
            padding:0 0 6px;
        }
        .money-content {
            width: 210px;
            height: 82px;
            background: url('../../assets/transfer-money1.png') no-repeat;
            background-size: 100%;
            display: inline-block;
            cursor: pointer;
            position: relative;
            .money-text {
                color: #ffffff;
                font-size: 14px;
                font-size: 700;
                position: absolute;
                top: 10px;
                left: 60px;
            }
        }
        .img-content {
            height: 100px;
            max-width: 200px;
        }
        .mini-program-content{
            display: inline-block;
            text-align: left;
            width: 260px;
            background: #fff;
            border-radius: 5px;
            position: relative;
            color: rgb(16,16,16);
            white-space: normal;
            word-break: break-all;
            border: 1px solid #f0f0f0;
            .title {
                padding: 10px 10px 0 10px;
                span {
                    color: #999999;
                    font-size: 12px;
                }
                img {
                    width: 20px;
                    height: 20px;
                }
            }
            .content {
                padding: 0 10px 10px 10px;
                span {
                    display: inline-block;
                    padding: 10px 0;
                }
                img {
                    width: 100%;
                }
            }
        }
        .card-content {
            display: inline-block;
            width: 220px;
            background: #fff;
            border-radius: 5px;
            position: relative;
            color: rgb(16,16,16);
            white-space: normal;
            word-break: break-all;
            cursor: pointer;
            border: 1px solid #f0f0f0;
            img {
                width: 40px;
                height: 40px;
                position: absolute;
                top:50%;
                left: 10px;
                transform: translateY(-50%);
            }
        }
        .redpacket-content {
            width: 210px;
            height: 82px;
            background: url('../../assets/redpacket1.png') no-repeat;
            background-size: 100%;
            display: inline-block;
            cursor: pointer;
            position: relative;
            .money-text {
                color: #ffffff;
                font-size: 14px;
                font-size: 700;
                position: absolute;
                top: 10px;
                left: 60px;
            }
        }
        .redpacket-content1 {
            width: 210px;
            height: 82px;
            background: url('../../assets/redpacket2.png') no-repeat;
            background-size: 100%;
            display: inline-block;
            cursor: pointer;
            position: relative;
            .money-text {
                color: #ffffff;
                font-size: 14px;
                font-size: 700;
                position: absolute;
                top: 10px;
                left: 60px;
            }
        }                       
        .link-content {
            display: inline-block;
            width: 260px;
            background: #fff;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            color: rgb(16,16,16);
            white-space: normal;
            word-break: break-all;
            cursor: pointer;
            border: 1px solid #f0f0f0;
            img {
                width: 40px;
                height: 40px;
                position: absolute;
                top:50%;
                right: 0;
                transform: translateY(-50%);
            }
        }
        .warn{
            color:rgb(244, 67, 33);
            border:1px dashed #f44321;
            background:#FFF1F0;
            padding: 0 5px;
            margin:0 4px
        }
        .titleNav{
            height:48px;
            line-height:48px;
            border-bottom:1px solid #f0f0f0;
            padding-left:24px;
            margin-bottom:10px;
            .avatar{
                width:20px;
                height:20px;
                border-radius:100%;
                vertical-align: middle;
                }
            .middle{
                vertical-align: middle;
            }
        }
        .timeline{
            max-height:530px;
            overflow-y: auto;
            padding-left:24px;
            padding-top:16px;
        }
    }
    
</style>