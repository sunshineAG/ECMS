<style lang="less" scoped>
    .container {
        background: #ffffff;
        .timeSelect {
            .type {
                color:rgb(159, 156, 156);
                cursor: pointer;
                padding-right: 20px;
            }
            span:nth-child(4){
                padding-right:0;
            }
            .selecet-type {
                color: rgb(5,110,249);
            }
        }
    }
    @media only screen and (max-width: 1200px){
        .content {
            .pie-content {
                width: 50%!important;
                height: 350px!important;
            }
            .transfer {
                top: 25%!important;
                left: 25%!important;
                transform: translate(-50%,-65%)!important;
            }
            .user-total {
                width: 30%!important;
                margin: 0 auto!important;
                right: 0!important;
            }
            .bar-content {
                width: 100%!important;
            }
        }
    }
</style>

<template>
    <div class="container">
        <a-card style="border-radius: 5px">
            <div class="title">
                <div style="display: inline-block;position: relative;top: 5px;">
                    <img src="../../assets/analysis-icon.png" alt="" style="width: 20px;height: 20px;vertical-align: bottom">
                    <span style="font-weight: 700">活码访问</span>
                </div>
                <div style="display: inline-block;float: right">
                    <a-select @change="handleChange" v-model="selectLiveCode" style="width: 200px;float: right" >
                        <a-select-option v-for="(item,index) in liveCodeList" :key="item.id" :value="item.id">
                            {{item.live_code_desc}}
                        </a-select-option>
                    </a-select>
                    <!-- <a-range-picker @change="onChange"  :placeholder="['Start Date', 'End Date']" :disabledDate="disabledDate"/> -->
                </div>
            </div>
            <div style="width: calc(100% + 64px);height: 1px;background: #eceff2;margin-top: 20px;margin-left: -32px">
            </div>
            <div class="content" style="display: flex;width: 100%;align-items: center;position: relative;flex-wrap: wrap;">
                <div id="liveCodeAccessPie" class="pie-content" style="height: 400px;width: 25%;display: inline-block"></div>
                <!--<div class="transfer" style="position: absolute;top: 50%;left: 12.5%;transform: translate(-50%,-50%);text-align: center">-->
                    <!--<div>转化率</div>-->
                    <!--<div style="color: #00a0e9;font-size: 20px">{{transfer_rate}}</div>-->
                <!--</div>-->
                <div class="user-total" style="width: 10%;display: inline-block;position: relative;right: 40px">
                    <div>活码访问量(PV)</div>
                    <div>
                        <span style="font-size: 30px;padding: 10px 0;color:#00a0e9;font-weight: 500">{{range_scan_total}}</span>次
                    </div>
                    <div>独立访客量（UV）</div>
                    <div>
                        <span style="font-size: 30px;padding: 10px 0;font-weight: 500">{{scan_total}}</span>次
                    </div>
                </div>
                <div id="liveCodeAccessBar" class="bar-content" style="height: 400px;width: 65%;display: inline-block">

                </div>
                <div style="position: absolute;top: 10px;right: 0;" class='timeSelect'>
                   <span v-for="(item,index) in typeList" :key="item.id" :class="[selectType==item.id?'selecet-type':'','type']"  @click="select(item.id)">{{item.name}}</span>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import dateUtil from '../../common/dateUtil'
    import moment from 'moment';
    export default {
        name: 'liveCodeAccess',
        props: ['analysisData','uid','liveCodeList','departmentId'],
        data () {
            return {
                typeList:[{id:'0',name:'昨天'},{id:'1',name:'今天'},{id:'2',name:'最近7天'},{id:'3',name:'最近30天'}],
                selectType:'1',
                showData:this.$props.analysisData,
                selectLiveCode:'',
                transfer_rate:'',
                scan_total:'0',
                transfer_total:'',
                range_scan_total:'0',
                optionsPie:{
                    tooltip: {
                        trigger: "item",
                        formatter: "{b0} : {c0} ({d0}%)",
                        show: true
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                readOnly: true,
                                show:false
                            }
                        }
                    },
                    series: [
                        {
                            name: "",
                            type: "pie",
                            itemStyle: {
                                emphasis: {
                                    label: {
                                        show: false,
                                        position: "center",
                                        textStyle: {
                                            fontSize: "30",
                                            fontWeight: "bold"
                                        }
                                    }
                                },
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: "当前时间段活码访问次数",
                                    itemStyle:{
                                        color:'rgb(244,67,33)',
                                        borderColor:'#ffffff',
//                                        borderWidth:10
                                    },
                                    emphasis:{
                                        label:{
                                            fontSize:12
                                        }
                                    }
                                },
                                {
                                    value: 0,
                                    name: "累计活码访问与当前活码访问差值",
                                    itemStyle:{
                                        color:'rgb(0,160,233)',
                                        borderColor:'#ffffff',
//                                        borderWidth:10
                                    },
                                    emphasis:{
                                        label:{
                                            fontSize:12
                                        }
                                    }
                                }
                            ],
                            tooltip: {
                                formatter: "{b0} : {c0} ({d0}%)",
                                show: true
                            },
                            radius: ["50%", "70%"],
                            center: ["50%", "50%"],
                        }
                    ]
                },
                optionsBar:{
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["活码访问量(PV)","独立访客量(UV)"],
                        orient: "horizontal",
                        align: "left",
                        top:'36px',
                        right:'0',
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
                        show: false
                    },
                    xAxis: [
                        {
                            type: "category",
                            axisLabel:{
//                                interval:0
                            },
                            data: []
//                            data: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name: "活码访问量(PV)",
                            type: "bar",
                            barWidth:'10px',
                            data: [],
//                            data: [25, 0, 0, 0, 0, 0, 69, 42, 85, 142, 123, 111, 134, 25, 8, 80, 110, 90, 25, 180, 200, 92, 10, 5],
                            itemStyle:{
                                normal: {
                                    //颜色渐变
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#eec634'
                                    }, {
                                        offset: 1,
                                        color: '#c02425'
                                    }])
                                }
                            }
                        },
                       {
                           name: "独立访客量(UV)",
                           type: "bar",
                           barWidth:'10px',
                           data: [],
//                            data: [12, 0, 0, 0, 0, 0, 5, 9, 18, 52, 26, 21, 12, 5, 3, 24, 22, 36, 15, 58, 64, 25, 6, 1],
                           yAxisIndex: 0,
                           itemStyle:{
                               normal: {
                                   //颜色渐变
                                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                       offset: 0,
                                       color: '#74d3f4'
                                   }, {
                                       offset: 1,
                                       color: '#2f81ed'
                                   }])
                               }
                           }
                       }
                    ],
                    calculable: true,
                    grid: {
                        left: '0',
                        right: '0',
                        bottom: '-3%',
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
                this.showData={
                    pie:{},
                    column:{}
                };
                this.showData=val;
            },
            liveCodeList:function (val,oldVal) {
                if(val.length>0) {
                    this.selectLiveCode = val[0].id || ''
                }else {
                    this.selectLiveCode = ''
                }
                this.getData('1')
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
                    url: '/index.php?r=uc/dashboard/live-code-chart',
                    data:{
                        uid:this.uid,
                        date_start:date_array[0],
                        date_end:date_array[1],
                        live_code_id:this.selectLiveCode,
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
            },
            handleChange(value) {
                this.selectLiveCode = value
                this.getData('1')
            },
            setOptionFun(val) {
                if(!document.getElementById('liveCodeAccessPie')||!document.getElementById('liveCodeAccessBar')) {
                    return
                }
                this.liveCodeAccessPieChart = echarts.init(document.getElementById('liveCodeAccessPie'));
                this.liveCodeAccessBarChart = echarts.init(document.getElementById('liveCodeAccessBar'));
                this.transfer_total = val.pie.transfer_total
                this.scan_total = val.pie.scan_total
                this.range_scan_total = val.pie.range_scan_total
                this.transfer_rate = val.pie.transfer_rate
                this.optionsPie.series[0].data[0].value = val.pie.range_scan_total
                this.optionsPie.series[0].data[1].value = val.pie.scan_total - val.pie.range_scan_total

                this.optionsBar.xAxis[0].data = []
                this.optionsBar.series[0].data = []

                val.column.scan_data.forEach(el=>{
                    this.optionsBar.xAxis[0].data.push(el.date)
                    this.optionsBar.series[0].data.push(parseInt(el.count))
                })
//                this.optionsBar.series[1].data = []
//                val.column.transfer_data.forEach(el=>{
//                    this.optionsBar.xAxis[0].data.push(el.date)
//                    this.optionsBar.series[0].data.push(parseInt(el.count))
//                })
//                val.column.scan_data.forEach(el=>{
//                    this.optionsBar.series[1].data.push(parseInt(el.count))
//                })
                this.liveCodeAccessPieChart.setOption(this.optionsPie);
                this.liveCodeAccessBarChart.setOption(this.optionsBar);
                setTimeout(_=>{
                    this.liveCodeAccessPieChart.resize()
                    this.liveCodeAccessBarChart.resize()
                },0)
            },
            getScale() {
                this.liveCodeAccessPieChart.resize()
                this.liveCodeAccessBarChart.resize()
            },
            disabledDate(current) {
                return  current <moment('2019-01-01').startOf('day') || current > moment().endOf('day');
            }
        },
        mounted(){

        },
        created:function () {
            window.addEventListener('resize',this.getScale,false);
        },
        beforeDestroy() {
            window.removeEventListener('resize',this.getScale,false)
            !!this.liveCodeAccessPieChart&&this.liveCodeAccessPieChart.clear();
            !!this.liveCodeAccessPieChart&&this.liveCodeAccessPieChart.dispose();
            !!this.liveCodeAccessBarChart&&this.liveCodeAccessBarChart.clear();
            !!this.liveCodeAccessBarChart&&this.liveCodeAccessBarChart.dispose();
        }
    }
</script>


