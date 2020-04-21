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
                    <span style="font-weight: 700">性别分布</span>
                </div>
            </div>
            <div style="width: calc(100% + 48px);height: 1px;background: #eceff2;margin-top: 20px;margin-left: -24px">
            </div>
            <div id="friendSex" style="height: 400px;width: 50%;display: inline-block"></div>
            <div style="position: absolute;top: 50%;left: 25%;transform: translate(-25%,-50%);text-align: center ">
                <div>好友人数</div>
                <div>{{total}}人</div>
            </div>
            <div style="position:absolute;top: 50%;right: 10%;transform: translateY(-50%) ">
                <p>好友性别占比</p>
                <div style="margin-bottom: 10px">
                    <span style="display:inline-block;background: #00a0e9;border-radius: 50%;width: 10px;height: 10px;margin-right: 10px"></span>
                    <span style="width: 50px;display: inline-block;border-right: 2px solid #a9a9a9">男</span>
                    <span style="padding-left: 40px">{{male.rate}}</span>
                    <span style="padding-left: 10px">{{male.count}}人</span>
                </div>
                <div style="margin-bottom: 10px">
                    <span style="display:inline-block;background: #f44321;border-radius: 50%;width: 10px;height: 10px;margin-right: 10px"></span>
                    <span style="width: 50px;display: inline-block;border-right: 2px solid #a9a9a9">女</span>
                    <span style="padding-left: 40px">{{female.rate}}</span>
                    <span style="padding-left: 10px">{{female.count}}人</span>
                </div>
                <div style="margin-bottom: 10px">
                    <span style="display:inline-block;background: #3ca566;border-radius: 50%;width: 10px;height: 10px;margin-right: 10px"></span>
                    <span style="width: 50px;display: inline-block;border-right: 2px solid #a9a9a9">其他</span>
                    <span style="padding-left: 40px">{{other.rate}}</span>
                    <span style="padding-left: 10px">{{other.count}}人</span>
                </div>
            </div>
            <div style="visibility: hidden;margin-top: 5px">
                占位
            </div>
        </a-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'friendSex',
        props: ['analysisData'],
        data () {
            return {
                showData:this.$props.analysisData,
                total:'',
                sexList:[],
                male:{},
                female:{},
                other:{},
                options:{
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
                                        show: true,
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
                                    name: "男",
                                    itemStyle:{
                                        color:'rgb(0,160,233)',
                                        borderColor:'#ffffff',
                                        borderWidth:10
                                    },
                                    emphasis:{
                                        label:{
                                            fontSize:20
                                        }
                                    }
                                },
                                {
                                    value: 0,
                                    name: "女",
                                    itemStyle:{
                                        color:'rgb(244,67,33)',
                                        borderColor:'#ffffff',
                                        borderWidth:10
                                    },
                                    emphasis:{
                                        label:{
                                            fontSize:20
                                        }
                                    }
                                },
                                {
                                    value: 0,
                                    name: "其他",
                                    itemStyle:{
                                        color:'rgb(60,165,102)',
                                        borderColor:'#ffffff',
                                        borderWidth:10
                                    },
                                    emphasis:{
                                        label:{
                                            fontSize:20
                                        }
                                    }
                                }
                            ],
                            tooltip: {
                                formatter: "{b0} : {c0} ({d0}%)",
                                show: true
                            },
                            radius: ["50%", "70%"],
                            center: ["50%", "50%"]
                        }
                    ]
                }
            }
        },
        watch: {
            showData: function (val, oldVal) {
                this.setOptionFun(val)
            },
            analysisData: function (val, oldVal) {
                this.showData={
                    info:[],
                    totla:'0'
                };
                this.showData=val;
            }
        },
        computed: {

        },
        methods:{
            setOptionFun(val) {
                if(!document.getElementById('friendSex')) {
                    return
                }
                this.friendSex = echarts.init(document.getElementById('friendSex'));
                val.info.forEach(el=>{
                    if(el.sex==0) {
//                        其他
                        this.options.series[0].data[2].value = parseInt(el.count)
                        this.other=el
                    } else if(el.sex==10) {
//                        男
                        this.options.series[0].data[0].value = parseInt(el.count)
                        this.male=el
                    } else if(el.sex==20) {
//                        女
                        this.options.series[0].data[1].value = parseInt(el.count)
                        this.female=el
                    }
                })
                this.total = val.total
                this.friendSex.setOption(this.options);
                setTimeout(_=>{
                    this.friendSex.resize()
                },0)
            },
            getScale() {
                this.friendSex.resize()
            }
        },
        mounted(){

        },
        created:function () {
            window.addEventListener('resize',this.getScale,false);
        },
        beforeDestroy() {
            window.removeEventListener('resize',this.getScale,false)
            !!this.friendSex&&this.friendSex.clear();
            !!this.friendSex&&this.friendSex.dispose();
        }
    }
</script>


