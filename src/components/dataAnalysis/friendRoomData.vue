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

<template>
    <div class="container">
        <a-card style="border-radius: 5px">
            <div class="title">
                <div style="display: inline-block;position: relative;top: 5px;">
                    <img src="../../assets/analysis-icon.png" alt="" style="width: 20px;height: 20px;vertical-align: bottom">
                    <span style="font-weight: 700">好友数/群数</span>
                </div>
                <div style="display: inline-block;float: right">
                    <span v-for="(item,index) in typeList" :key="item.id" :class="[selectType==item.id?'selecet-type':'','type']"  @click="select(item.id)">{{item.name}}</span>
                    <a-range-picker @change="onChange"  :placeholder="['Start Date', 'End Date']" :disabledDate="disabledDate"/>
                </div>
            </div>
            <div style="width: calc(100% + 64px);height: 1px;background: #eceff2;margin-top: 20px;margin-left: -32px">
            </div>
            <div id="friendRoomData" style="height: 400px;top: 15px"></div>
        </a-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import dateUtil from '../../common/dateUtil'
    import moment from 'moment';
    export default {
        name: 'friendRoomData',
        props: ['analysisData','uid','departmentId'],
        data () {
            return {
                typeList:[{id:'0',name:'昨天'},{id:'1',name:'今天'},{id:'2',name:'最近7天'},{id:'3',name:'最近30天'}],
                selectType:'1',
                showData:this.$props.analysisData,
                options:{
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["好友数", "群数"],
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
                            name: "好友数",
                            type: "line",
                            data: [],
//                            data: [2, 1, 0, 0, 0, 0, 0, 5, 18, 9, 16, 7, 4, 1, 36, 26, 8, 11, 45, 49, 21, 6, 8, 3],
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
                        },
                        {
                            name: "群数",
                            type: "line",
                            data: [],
//                            data: [1, 0, 0, 0, 0, 0, 1, 0, 3, 1, 1, 4, 1, 0, 3, 5, 1, 3, 0, 7, 5, 3, 1, 1],
                            symbol: "circle",
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: "rgb(57,181,238)"
                                    },
                                    color: "rgb(0, 160, 233)"
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
                this.showData={
                    room:[],
                    friend:[]
                };
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
                    url: '/index.php?r=uc/dashboard/friend-room-line-chart',
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
            },
            setOptionFun(val) {
                if(!document.getElementById('friendRoomData')) {
                    return
                }
                this.friendRoomChart = echarts.init(document.getElementById('friendRoomData'));
                this.options.xAxis[0].data = []
                this.options.series[0].data = []
                this.options.series[1].data = []
                val.friends.forEach(el=>{
                    this.options.xAxis[0].data.push(el.date)
                    this.options.series[0].data.push(parseInt(el.count))
                })
                val.room.forEach(el=>{
                    this.options.series[1].data.push(parseInt(el.count))
                })
                this.friendRoomChart.setOption(this.options);
                setTimeout(_=>{
                    this.friendRoomChart.resize()
                },0)
            },
            getScale() {
                this.friendRoomChart.resize()
            },
            disabledDate(current) {
                return  current <moment('2019-01-01').startOf('day') || current > moment().endOf('day');
            },
            refresh() {
                this.getData(this.selectType)
            }
        },
        mounted(){

        },
        created:function () {
            window.addEventListener('resize',this.getScale,false);
        },
        beforeDestroy() {
            window.removeEventListener('resize',this.getScale,false)
            !!this.friendRoomChart&&this.friendRoomChart.clear();
            !!this.friendRoomChart&&this.friendRoomChart.dispose();
        }
    }
</script>


