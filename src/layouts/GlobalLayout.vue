<template>
  <a-layout>
      <global-header :menuNav="menuNav" :menuData="menuData" @menuSelect = 'menuSelect' :collapsed="collapsed" @toggleCollapse="toggleCollapse"/> <!--  头部 -->
    <!--<drawer :open-drawer="showSetting" placement="right"  @change="onSettingDrawerChange">-->
      <!--<div class="setting" slot="handler">-->
        <!--<a-icon :type="showSetting ? 'close' : 'setting'" />-->
      <!--</div>-->
      <!--<setting />-->
    <!--</drawer>-->
    <a-layout>
        <!-- 侧边栏 -->
        <div v-if="menuData">
            <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
            <sider-menu :theme="theme" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
            </drawer>
            <!-- <sider-menu :theme="theme" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" /> -->
            <sider-menu :theme="theme" v-else-if="menuData.length" :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
        </div>
          <!-- 内容 -->
      <a-layout-content :style="{minHeight: minHeight, margin: '15px'}" >
        <slot></slot>
      </a-layout-content>
      <!--<a-layout-footer style="padding: 0px">-->
        <!--<global-footer :link-list="linkList" :copyright="copyright" />-->
      <!--</a-layout-footer>-->
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import Drawer from '../components/tool/Drawer'
import SiderMenu from '../components/menu/SiderMenu'
import Setting from '../components/setting/Setting'
import { deepEqual } from 'assert'
var storage = require('../common/store')
//const minHeight = window.innerHeight - 64 - 24 - 122   需要底部栏时
const minHeight = window.innerHeight - 64 - 24
let menuData = []
let menuNav = []
export default {
  name: 'GlobalLayout',
  components: {Setting, SiderMenu, Drawer, GlobalFooter, GlobalHeader},
  data () {
    return {
      minHeight: minHeight + 'px',
      collapsed: window.innerWidth < 1200? true: false,
      menuData: menuData,
      menuNav:menuNav,
      showSetting: false,
      nav:this.$store.state.navPath.menueNav
    }
  },
  computed: {
    changeNav(){
        return this.$store.state.navPath.menueNav
    },
    isMobile () {
      return this.$store.state.setting.isMobile
    },
    theme () {
      return this.$store.state.setting.theme
    },
    layout () {
      return this.$store.state.setting.layout
    },
    linkList () {
      return this.$store.state.setting.footerLinks
    },
    copyright () {
      return this.$store.state.setting.copyright
    }
  },
  watch:{
      '$store.state.navPath.menueNav':function(){
          this.menuSelect(this.$store.state.navPath.menueNav)
      }
  },
  methods: {
    menuSelect(e){
            this.$store.commit('navPath/setNavMenue',e)
            storage.store.set('menuNav', e);
            this.$store.state.user.permissionList.find((item) => item.path === '/').children.forEach(el=>{
                if(el.name==e) {
                this.menuData = el.children || []
                menuData = el.children || []
                }
            })

    },
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onDrawerChange (show) {
       this.collapsed = show
    },
    onMenuSelect () {
      this.toggleCollapse()
    },
    onSettingDrawerChange (val) {
      this.showSetting = val
    }
  },
  mounted() {
      let path = storage.store.get('menuNav');
      if(!!path) {
          this.$store.state.user.permissionList.find((item) => item.path === '/').children.forEach(el=>{
              if(el.name==path) {
                  menuData = el.children || []
                  this.menuData = el.children || []
               
              }
          })
      }
  },
  created(){

  },
  beforeCreate () {
      menuNav = []
      this.$store.state.user.permissionList.find((item) => item.path === '/').children.forEach(el=>{
          menuNav.push({
              name: el.name,
              icon:'none',
              path: el.path,
          })
      })
      let name = storage.store.get('menuNav');
      if(!!name) {
          this.$store.state.user.permissionList.find((item) => item.path === '/').children.forEach(el=>{
              if(el.path==name) {
                  menuData = el.children || []
                  this.menuData = el.children || []
              }
          })
      }else {
          menuData = this.$store.state.user.permissionList.find((item) => item.path === '/').children[0]
          storage.store.set('menuNav', menuData.name);
      }
  }
}
</script>

<style lang="less" scoped>
  .setting{
    background-color: #5aa9cd;
    color: #fff;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px rgba(90, 169, 205,.06);
  }
</style>
<style lang="less">
    .ant-layout-content {
        overflow-x: auto!important;
        &>div {
            min-width: 990px;
        }
    }
</style>
