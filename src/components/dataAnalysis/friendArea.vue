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
                    <span style="font-weight: 700">地区分布</span>
                </div>
            </div>
            <div style="width: calc(100% + 48px);height: 1px;background: #eceff2;margin-top: 20px;margin-left: -24px">
            </div>
            <div id="friendArea" style="height: 400px;top: 15px"></div>
            <div style="text-align: right;color: #7e8082;margin-top: 10px">
                <span style="display:inline-block;background: #7e8082;border-radius: 50%;width: 10px;height: 10px"></span>
                其他：{{others}}人
            </div>
        </a-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import china from '../../../node_modules/echarts/map/js/china';
    export default {
        name: 'friendArea',
        props: ['analysisData'],
        data () {
            return {
                showData:this.$props.analysisData,
                others:'0',
                options:{
                    tooltip: {
                        trigger: "item",
                        formatter:'{b0}: {c0}'
                    },
                    dataRange: {
                        min: 0,
                        max: 2500,
                        x: "right",
                        y: "bottom",
                        text: ["高", "低"],
                        color: ["#006edd", "#e0ffff"],
                        calculable: true,
                        orient: "vertical"
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                readOnly: false
                            }
                        },
                        show: false
                    },
                    roamController: {
                        mapTypeControl: {
                            china: true
                        },
                        show: false
                    },
                    series: [
                        {
                            name: "",
                            type: "map",
                            mapType: "china",
                            roam: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: [],
                            showLegendSymbol: false,
                            mapLocation: {
                                x: "center",
                                y: "center"
                            },
                            mapValueCalculation: "sum",
                            zoom:'1.2'
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
                    others:'0'
                };
                this.showData=val;
            }
        },
        computed: {

        },
        methods:{
            setOptionFun(val) {
                if(!document.getElementById('friendArea')) {
                    return
                }
                this.friendArea = echarts.init(document.getElementById('friendArea'));
                let max=0
                this.options.series[0].data =[]
                val.cn.forEach(el=>{
                    if(max<parseInt(el.count)) {
                        max=parseInt(el.count)
                    }
                    this.options.series[0].data.push({
                        name:el.province,
                        value:parseInt(el.count)
                    })
                })
                this.others = val.others
                max&&(this.options.dataRange.max = max);
                this.friendArea.setOption(this.options);
                setTimeout(_=>{
                    this.friendArea.resize()
                },0)
            },
            getScale() {
                this.friendArea.resize()
            }
        },
        mounted(){

        },
        created:function () {
            window.addEventListener('resize',this.getScale,false);
        },
        beforeDestroy() {
            window.removeEventListener('resize',this.getScale,false)
            !!this.friendArea&&this.friendArea.clear();
            !!this.friendArea&&this.friendArea.dispose();
        }
    }
</script>


