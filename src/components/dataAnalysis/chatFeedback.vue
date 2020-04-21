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
    .container {
        .title {
            .ant-tabs-tab {
                padding: 16px;
            }
        }
    }

</style>
<template>
    <div class="container">
        <a-card style="border-radius: 5px">
            <div class="title">
                <div style="display: inline-block;position: relative;top: 5px;">
                    <img src="../../assets/analysis-icon.png" alt="" style="width: 20px;height: 20px">
                    <!-- <span style="font-weight: 700">聊天反馈</span> -->
                    <a-tabs v-model="tab_key" @change="tabChange" style="display: inline-block;vertical-align: top;position: relative;top: -15px;">
                        <a-tab-pane tab="聊天数" key="1"></a-tab-pane>
                        <a-tab-pane tab="联系客户数" key="2"></a-tab-pane>
                    </a-tabs>
                </div>
                <div style="display: inline-block;float: right">
                    <span v-for="(item,index) in typeList" :key="item.id" :class="[selectType==item.id?'selecet-type':'','type']"  @click="select(item.id)">{{item.name}}</span>
                    <a-range-picker @change="onChange"  :placeholder="['Start Date', 'End Date']" :disabledDate="disabledDate"/>
                </div>
            </div>
            <div style="width: calc(100% + 64px);height: 1px;background: #eceff2;margin-top: -26px;margin-left: -32px">
            </div>

            <div v-show="tab_key=='1'" id="chatFeedback" style="height: 400px;top: 15px"></div>
            <div v-show="tab_key=='2'" id="chatCustomer" style="height: 400px;top: 15px"></div>
        </a-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import dateUtil from '../../common/dateUtil'
    import moment from 'moment';
    export default {
        name: 'chatFeedback',
        props: ['analysisData','uid','analysisData1','departmentId'],
        data () {
            return {
                typeList:[{id:'0',name:'昨天'},{id:'1',name:'今天'},{id:'2',name:'最近7天'},{id:'3',name:'最近30天'}],
                selectType:'1',
                showData:this.$props.analysisData,
                showData1:this.$props.analysisData1,
                options:{
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["聊天数"],
                        selectedMode: "multiple",
                        align: "right",
                        right:'2%',
                        orient: "horizontal"
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                readOnly: true,
                                show:false
                            },
                            magicType: {
                                type: ["line", "bar"],
                                show: false
                            }
                        },
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: [],
//                            data: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                            boundaryGap: false,
                            axisTick: {
                                show: false
                            },
                            scale: false,
                            axisLine: {
                                lineStyle: {
                                    type: "solid",
                                    color: "#5AA9CD",
                                    width: 2
                                },
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "rgb(51, 51, 51)"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "",
                            axisLine: {
                                show: false
                            }
                        },
                    ],
                    series: [
                        {
                            name: "聊天数",
                            type: "line",
                            data: [],
//                            data: [2, 0, 0, 0, 0, 0, 0, 5, 18, 159, 198, 120, 10, 15, 58, 15, 8, 51, 45, 49, 21, 6, 8, 3],
                            symbol: "circle",
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: "rgb(57,181,238)"
                                    },
                                    label: {
                                        show: false
                                    },
                                    color: "rgb(0,160,233)"
                                }
                            }
                        }
                    ],
                    calculable: true,
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    }
                },
                tab_key:'1',
                options1:{
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["客户数"],
                        selectedMode: "multiple",
                        align: "right",
                        right:'2%',
                        orient: "horizontal"
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                readOnly: true,
                                show:false
                            },
                            magicType: {
                                type: ["line", "bar"],
                                show: false
                            }
                        },
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: [],
//                            data: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                            boundaryGap: false,
                            axisTick: {
                                show: false
                            },
                            scale: false,
                            axisLine: {
                                lineStyle: {
                                    type: "solid",
                                    color: "#5AA9CD",
                                    width: 2
                                },
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "rgb(51, 51, 51)"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "",
                            axisLine: {
                                show: false
                            }
                        },
                    ],
                    series: [
                        {
                            name: "客户数",
                            type: "line",
                            data: [],
//                            data: [1, 0, 0, 0, 0, 0, 0, 2, 3, 15, 1, 4, 1, 2, 9, 5, 2, 12, 5, 11, 5, 3, 1, 1],
                            symbol: "circle",
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: "rgb(248,138,116)"
                                    },
                                    label: {
                                        show: false
                                    },
                                    color: "rgb(241, 49, 17)"
                                }
                            }
                        }
                    ],
                    calculable: true,
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    }
                }
            }
        },
        watch: {
            showData: function (val, oldVal) {
                this.setOptionFun(val)
            },
            analysisData: function (val, oldVal) {
                this.showData=[];
                this.showData=val;
            },
            showData1: function (val, oldVal) {
                this.setOptionFun1(val)
            },
            analysisData1: function (val, oldVal) {
                this.showData1=[];
                this.showData1=val;
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
                    url: '/index.php?r=uc/dashboard/chat-line-chart',
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
                        this.showData = udata.data
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/contact-customer-line-chart',
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
                        this.showData1 = udata.data
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            setOptionFun(val) {
                if(!document.getElementById('chatFeedback')) {
                    return
                }
                this.chatFeedbackChart = echarts.init(document.getElementById('chatFeedback'));
                this.options.xAxis[0].data = []
                this.options.series[0].data = []
                val.forEach(el=>{
                    this.options.xAxis[0].data.push(el.date)
                    this.options.series[0].data.push(parseInt(el.count))
                })
                this.chatFeedbackChart.setOption(this.options);
                setTimeout(_=>{
                    this.chatFeedbackChart.resize()
                },0)
            },
            setOptionFun1(val) {
                if(!document.getElementById('chatCustomer')) {
                    return
                }
                this.chatCustomerChart = echarts.init(document.getElementById('chatCustomer'));
                this.options1.xAxis[0].data = []
                this.options1.series[0].data = []
                val.forEach(el=>{
                    this.options1.xAxis[0].data.push(el.date)
                    this.options1.series[0].data.push(parseInt(el.count))
                })
                this.chatCustomerChart.setOption(this.options1);
                setTimeout(_=>{
                    this.chatCustomerChart.resize()
                },0)
            },
            getScale() {
                if(this.tab_key=='1') {
                    this.chatFeedbackChart.resize()
                }else if(this.tab_key=='2'){
                    this.chatCustomerChart.resize()
                }
            },
            disabledDate(current) {
                return  current <moment('2019-01-01').startOf('day') || current > moment().endOf('day');
            },
            tabChange(key) {
                if(key=='1') {
                    setTimeout(_=>{
                        this.chatFeedbackChart.resize()
                    },0)
                }else if(key=='2') {
                    setTimeout(_=>{
                        this.chatCustomerChart.resize()
                    },0)
                }
            }
        },
        mounted(){

        },
        created:function () {
            window.addEventListener('resize',this.getScale,false);
        },
        beforeDestroy() {
            window.removeEventListener('resize',this.getScale,false)
            !!this.chatFeedbackChart&&this.chatFeedbackChart.clear();
            !!this.chatFeedbackChart&&this.chatFeedbackChart.dispose();
            !!this.chatCustomerChart&&this.chatCustomerChart.clear();
            !!this.chatCustomerChart&&this.chatCustomerChart.dispose();
        }
    }
</script>


