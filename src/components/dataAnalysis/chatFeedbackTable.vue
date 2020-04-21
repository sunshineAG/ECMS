<style lang="less" scoped>
    .container {
        background: #ffffff;
        .title {
            .type {
                color:rgb(159, 156, 156);
                cursor: pointer;
                padding-right: 20px;
            }
            .selecet-type {
                color: rgb(5,110,249);
            }
        }

    }
</style>
<style lang="less">
    .chatFeed {
        .ant-table-scroll table {
            width: 100%;
        }
    }
     /*.chatFeed .ant-table-body{*/
        /*padding-top:42px;*/
    /*}*/
</style>
<template>
    <div class="container chatFeed">
        <a-card style="border-radius: 5px">
            <div class="title">
                <div style="display: inline-block;position: relative;top: 5px;">
                    <img src="../../assets/analysis-icon.png" alt="" style="width: 20px;height: 20px">
                    <span style="font-weight: 700">聊天反馈</span>
                </div>
                <div style="display: inline-block;float: right">
                    <span v-for="(item,index) in typeList" :key="item.id" :class="[selectType==item.id?'selecet-type':'','type']"  @click="select(item.id)">{{item.name}}</span>
                    <!-- <a-range-picker @change="onChange"  :placeholder="['Start Date', 'End Date']" :disabledDate="disabledDate"/> -->
                </div>
            </div>
            <div style="width: calc(100% + 64px);height: 1px;background: #eceff2;margin-top: 20px;margin-left: -32px">
            </div>
            <br>
            <a-table :columns="columns" :dataSource="showData" :scroll="{x:true,y:263}" :pagination="false">
                <template slot="avatar" slot-scope="text, record, index">
                    <div>
                        <img :src="text" style="width: 48px;height: 48px;border-radius: 50%">
                        <span>{{record.user_name}}</span>
                    </div>
                </template>
            </a-table>
        </a-card>
    </div>
</template>

<script>
    import dateUtil from '../../common/dateUtil'
    import moment from 'moment';
    export default {
        name: 'chatFeedbackTable',
        props: ['analysisData','uid','departmentId'],
        data () {
            return {
                typeList:[{id:'0',name:'昨天'},{id:'1',name:'今天'},{id:'2',name:'最近7天'},{id:'3',name:'最近30天'}],
                selectType:'1',
                showData:this.$props.analysisData,
                columns:[
                    {
                        title: '排行榜',
                        align:'center',
                        dataIndex: 'index',
                        customRender:function (text, record, index) {
                            return index+1
                        }
                    },
                    {
                        title: '客户经理',
                        dataIndex: 'avatar',
                        align:'center',
                        scopedSlots: {
                            customRender: 'avatar'
                        }
                    },
                    {
                        title: '联系客户数',
                        align:'center',
                        dataIndex: 'contact_count',
                        //sorter: (a, b) => a.contact_count-b.contact_count,
                    },
                    {
                        title: '聊天数目',
                        align:'center',
                        dataIndex: 'msg_count',
                        //sorter: (a, b) => a.msg_count-b.msg_count,
                    },
//                    {
//                        title: '平均首次响应时长(s)',
//                        align:'center',
//                        dataIndex: 'avg_first_reply_time',
//                        sorter: (a, b) => a.avg_first_reply_time-b.avg_first_reply_time,
//                    },
                    // {
                    //     title: '平均对话持续时长(s)',
                    //     align:'center',
                    //     dataIndex: 'avg_last_reply_time',
                    //     sorter: (a, b) => a.avg_last_reply_time-b.avg_last_reply_time,
                    // },
                    {
                        title: '平均首次响应时长(s)',
                        align:'center',
                        dataIndex: 'avg_reply_time',
                        //sorter: (a, b) => a.avg_reply_time-b.avg_reply_time,
                    }
                ],
            }
        },
        watch: {
            analysisData: function (val, oldVal) {
                this.showData=[];
                this.showData=val;
            }
        },
        computed: {

        },
        methods:{
            select(id) {
                this.selectType = id
                this.getData(this.selectType)
            },
            onChange(date, dateString) {
                if(dateString[0]==''&&dateString[1]=='') {
                    this.select('1')
                }else {
                    this.selectType = ''
                    this.getData('',dateString)
                }
            },
            getData(id='',date=[]) {
                let date_array = []
                if(id=='') {
                    date_array = date
                }else {
                    date_array = dateUtil(id)
                }
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/chat-analyse-table',
                    data:{
                        uid:this.uid,
                        date_start:date_array[0],
                        date_end:date_array[1],
                        department_id:this.departmentId
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.showData = udata.data.list
                    }
                });
            },
            disabledDate(current) {
                return  current <moment('2019-01-01').startOf('day') || current > moment().endOf('day');
            },
        },
        mounted(){

        },
        created:function () {
             this.getData('1')
        },
        beforeDestroy() {

        }
    }
</script>


