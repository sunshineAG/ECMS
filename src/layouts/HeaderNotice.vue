<template>
    <a-popover trigger="click" placement="bottom" overlayClassName="notice-card">
        <template slot="content">
            <a-spin :spinning="loadding">
                <a-tabs class="notice-style">
                    <a-tab-pane tab="告警" key="1">
                        <div style="width: 260px">
                            <div v-for="item in offlineRobot" style="background: #F5F5F5;;border: 1px solid rgb(245,245,245);padding: 4px 8px;margin: 4px 0;border-radius: 3px">
                                <span style="color:#FE5606;display: block">
                                    机器人异常
                                </span>
                                <span style="color:#595959;display: block;margin-top: 4px">
                                    网络连接异常：【{{item.mobile_serial_name}}{{item.nickname}}】
                                </span>
                            </div>
                            <div v-if="socketStatus=='0'" style="background: #F5F5F5;;border: 1px solid rgb(245,245,245);padding: 4px 8px;margin: 4px 0;border-radius: 3px">
                                <span style="color: #4987A4">
                                    当前页面连接服务器异常，尝试重连中...
                                    <a-spin>
                                        <a-icon slot="indicator" type="loading" style="font-size: 14px;margin-left: 5px" spin />
                                    </a-spin>
                                </span>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </a-spin>
        </template>
        <span @click="fetchNotice" class="header-notice">
            <a-badge :count="offlineRobot.length + (socketStatus==0?1:0)">
                <a-icon :class="['header-notice-icon', theme]" type="bell" />
            </a-badge>
        </span>
    </a-popover>
</template>

<script>
export default {
    name: 'HeaderNotice',
    data () {
        return {
            loadding: false
        }
    },
    computed: {
        theme () {
            return this.$store.state.setting.layout === 'side' ? 'light' : this.$store.state.setting.theme
        },
        offlineRobot() {
            return this.$store.state.user.offlineRobot
        },
        socketStatus() {
            return this.$store.state.user.socketStatus
        }
    },
    methods: {
        fetchNotice () {
            if (this.loadding) {
                this.loadding = false
                return
            }
            this.loadding = true
            setTimeout(() => {
                this.loadding = false
            }, 2000)
        }
    }
}
</script>

<style lang="less">
    .header-notice{
        display: inline-block;
        transition: all 0.3s;
        span {
            vertical-align: initial;
        }
        .header-notice-icon{
            font-size: 16px;
            padding: 4px;
            &.dark{
                color: #fff;
            }
            &.light{
                color: rgba(0,0,0,.65);
            }
        }

    }
    .notice-style {
        .ant-tabs-bar {
            border-bottom: none;
        }
    }
    .notice-card {
        margin-top: -5px;
    }
    .notice-card.ant-popover-placement-bottom {
        padding-top: 0;
        .ant-popover-content > .ant-popover-arrow {
            top: -4px;
        }
    }

</style>
