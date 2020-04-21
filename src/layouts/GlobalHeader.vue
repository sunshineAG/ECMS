<template>
    <a-layout-header :class="[theme, 'global-header']" >
        <div :class="['global-header-wide', layout]">
            <router-link v-if="isMobile && layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', theme]">
                <img width="32" :src="company.company_logo" />
                <h1 v-if="!isMobile">{{company.ecms_name}}</h1>
            </router-link>
            <a-divider v-if="isMobile" type="vertical" />
            <div :class="['logo', theme]">
                <img :src="company.company_logo">
                <h1>{{company.ecms_name}}</h1>
            </div> 
            <a-icon :style="{'visibility':menuData.length>0?'visible':'hidden'}" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
            <div v-if="layout === 'head'" class="global-header-menu">
                <i-menu class="header-sider" style="height: 64px; line-height: 64px;"  :theme="theme" mode="horizontal" :menuData="menuNav" @select="onSelect" menuType="2"/>
            </div>
            
            <!-- <a-button @click="gorouter">测试</a-button> -->
            <!-- <div v-if="robotStatus!='0'||socketStatus=='0'" :class="['robot-notice',robotStatus=='2'?'robot-notice-warning':'']">
                <div v-if="robotStatus!='0'">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="transform: rotateX(180deg);height: 100%;fill: rgb(229, 110, 28);vertical-align: middle;"  width="18" height="18" viewBox="0 -64 1024 1024">
                        <path d="M393.216 103.492l90.658 108.476h377.105v546.167h-693.248v-546.133h134.895l19.558-23.484 70.997-84.992zM116.497 809.37h795.648v-648.602h-404.378l-4.233-5.052-110.353-132.096-114.551 137.182h-162.133v648.533zM366.046 485.444c0-28.654-22.128-51.883-49.425-51.883s-49.425 23.229-49.425 51.883c0 28.654 22.128 51.883 49.425 51.883s49.425-23.229 49.425-51.883zM572.006 485.444c0-28.654-22.128-51.883-49.425-51.883s-49.425 23.229-49.425 51.883c0 28.654 22.128 51.883 49.425 51.883s49.425-23.229 49.425-51.883zM778.001 485.444c0-28.654-22.128-51.883-49.425-51.883s-49.425 23.229-49.425 51.883c0 28.654 22.128 51.883 49.425 51.883s49.425-23.229 49.425-51.883z">
                        </path>
                    </svg>
                    <a-tooltip placement="bottomLeft" v-if="robotStatus!='0'">
                        <template slot="title">
                            <div>
                                <span>以下手机 </span>
                                <span v-for="item in offlineRobot">
                                    【{{item.mobile_serial_name}}
                                    <span v-if="!!item.mobile_serial_name">-</span>
                                    {{item.nickname}}】</span>
                                <span> 网络连接异常</span>
                            </div>
                        </template>
                        <span>以下手机 </span>
                        <span v-for="(item,index) in offlineRobot" v-show="index<3">【{{item.mobile_serial_name}}<span v-if="!!item.mobile_serial_name">-</span>{{item.nickname}}】</span>
                        <span v-show="offlineRobot.length>3">...</span>
                        <span> 网络连接异常</span>
                    </a-tooltip>
                </div>
                <div v-if="socketStatus=='0'">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="transform: rotateX(180deg);height: 100%;fill: rgb(229, 110, 28);vertical-align: middle;"  width="18" height="18" viewBox="0 -64 1024 1024">
                        <path d="M393.216 103.492l90.658 108.476h377.105v546.167h-693.248v-546.133h134.895l19.558-23.484 70.997-84.992zM116.497 809.37h795.648v-648.602h-404.378l-4.233-5.052-110.353-132.096-114.551 137.182h-162.133v648.533zM366.046 485.444c0-28.654-22.128-51.883-49.425-51.883s-49.425 23.229-49.425 51.883c0 28.654 22.128 51.883 49.425 51.883s49.425-23.229 49.425-51.883zM572.006 485.444c0-28.654-22.128-51.883-49.425-51.883s-49.425 23.229-49.425 51.883c0 28.654 22.128 51.883 49.425 51.883s49.425-23.229 49.425-51.883zM778.001 485.444c0-28.654-22.128-51.883-49.425-51.883s-49.425 23.229-49.425 51.883c0 28.654 22.128 51.883 49.425 51.883s49.425-23.229 49.425-51.883z">
                        </path>
                    </svg>
                    <span style="color: #4987A4">
                        当前页面连接服务器异常，尝试重连中...
                        <a-spin>
                            <a-icon slot="indicator" type="loading" style="font-size: 14px;margin-left: 5px" spin />
                        </a-spin>
                    </span>
                </div>
            </div> -->
            <!-- <a-breadcrumb v-if="layout === 'side'" style="display: inline-block;vertical-align: middle">
                <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
                    <span v-if="index === 0"><a href="#/dataAnalysis">{{item.name}}</a></span>
                    <span v-else>{{item.name}}</span>
                </a-breadcrumb-item>
            </a-breadcrumb> -->
            <div :class="['global-header-right', theme]">
                <header-notice class="header-item" style="vertical-align: text-bottom"/>
                <header-avatar class="header-item"/>
            </div>
        </div>
    </a-layout-header>
</template>

<script>
import HeaderSearch from './HeaderSearch'
import HeaderNotice from './HeaderNotice'
import HeaderAvatar from './HeaderlAvatar'
import IMenu from '../components/menu/menu'
var storage = require('../common/store')
export default {
    name: 'GlobalHeader',
    components: {IMenu, HeaderAvatar, HeaderNotice, HeaderSearch},
    props: ['collapsed', 'menuNav','menuData'],
    data(){
        return{

        }
    },
    computed: {
        isMobile () {
            return this.$store.state.setting.isMobile
        },
        layout () {
            return this.$store.state.setting.layout
        },
        theme () {
            return this.layout === 'side' ? 'light' : this.$store.state.setting.theme
        },
        systemName () {
            return this.$store.state.setting.systemName
        },
        breadcrumb() {
            return this.$store.state.setting.breadcrumb
        },
        company () {
            return this.$store.state.user.company
        },
        robotStatus() {
            return this.$store.state.user.robotStatus
        },
        offlineRobot() {
            return this.$store.state.user.offlineRobot
        },
        socketStatus() {
            return this.$store.state.user.socketStatus
        }
    },
    methods: {
        gorouter(){
            //this.$router.push({path:'/dataAnalysis'})
        },
        toggleCollapse () {
            this.$emit('toggleCollapse')
        },
        onSelect (obj) {
            this.$emit('menuSelect', obj.key)
        },
        reWebsocket() {
            this.$ws.close()
            this.$ws.initFun({
                wsAdd:'ws://' + this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port + '/ecms',
                fromClientId:this.$store.state.user.user.user_id,
                token:storage.store.get('goToken')
            })
        }
    },
    created(){
            // this.$emit('menuSelect', '')
    }
}
</script>
<style lang="less">
    .ant-menu-horizontal>.ant-menu-item:hover{
            border-bottom:2px solid rgba(128, 128, 128, 0.1) !important;
    }
    .header-sider .ant-menu-item-selected.head-chat{
        border-bottom: 2px solid #F9AF2B;
        color: #F9AF2B;
        a {
            color: #F9AF2B!important;
        }
    }
    .head-chat >a{
        color: #F9AF2B!important;
        font-weight: bold!important;
    }
    .head-other >a{
        color: rgba(70, 70, 70, 0.88)!important;
        font-weight: bold!important;
    }
</style>
<style lang="less" scoped>
    .trigger {
        font-size: 20px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
            vertical-align: middle;
        &:hover{
            color: #5AA9CD;
        }
    }
    .header-item{
        padding: 0 12px;
        display: inline-block;
        height: 100%;
        cursor: pointer;
        vertical-align: middle;
        i{
            font-size: 16px;
            color: rgba(0,0,0,.65);
        }
    }
    .logo{
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 12px;
      -webkit-transition: all .3s;
      transition: all .3s;
      overflow: hidden;
      min-width: 180px;
      max-width: 280px;
        padding-right: 0;
      &.light{
        background-color: #fff;
        h1{
          color: #5AA9CD;
        }
      }
      &.dark{
        background-color: #002140;
        h1{
          color: #fff;
        }
      }
      h1{
        color: #fff;
        font-size: 16px;
        margin: 0;
        font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
        font-weight: 600;
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
      }
      img{
        height: 36px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .global-header{
        z-index: 99;
        padding: 0 12px 0 0;
        -webkit-box-shadow: 1px 4px 10px -5px #5EA7CC;
        box-shadow: 1px 4px 10px -5px #5EA7CC;
        position: relative;
        &.light{
            background: #fff;
        }
        &.dark{
            background: #001529;
        }
        .global-header-wide{
            position: relative;

            &.head{
                //max-width: 1400px;
                margin: auto;
            }
            &.side{
            }
            .logo {
                height: 64px;
                line-height: 58px;
                vertical-align: top;
                display: inline-block;
                padding: 0 12px 0 24px;
                cursor: pointer;
                font-size: 20px;
                &.pc{
                    padding: 0 12px 0 0;
                }
                img {
                    display: inline-block;
                    vertical-align: middle;
                }
                h1{
                    display: inline-block;
                    font-size: 16px;
                    text-overflow: ellipsis;
                    overflow:hidden;
                    white-space:nowrap;
                    max-width: 200px;
                }
                &.dark h1{
                    color: #fff;
                }
            }
            .global-header-menu{
                display: inline-block;
                width: calc(~'100% - 600px');
                text-align: center;
                .ant-menu-horizontal{
                    border-bottom:0;
                }
            }
            
            .robot-notice {
                position: absolute;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                color: #E56E1C;
                background: rgba(255, 239, 216, 0.59);
                /*height: 26px;*/
                line-height: 26px;
                padding: 0 10px;
                text-overflow: ellipsis;
                overflow:hidden;
                white-space:nowrap;
                max-width: 533px;
            }
            .robot-notice-warning {
                line-height: 24px;
                border-width: 1px;
                border-style: solid;
                border-color: rgb(236, 215, 183);
                box-shadow: rgb(255, 152, 0) 0px 2px 13px -5px;
            }
            .global-header-right{
                float: right;
                &.dark{
                    color: #fff;
                    i{
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
