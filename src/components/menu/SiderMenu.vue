<template>
  <a-layout-sider :class="[theme, 'sider', isMobile ? null : 'shadow']" :width="inWidth" :collapsedWidth="50" :collapsible="collapsible" v-model="collapsed" :trigger="null">
    <i-menu :theme="theme" :collapsed="collapsed" :menuData="menuData"  @select="onSelect"/>
  </a-layout-sider>
</template>

<script>
import IMenu from './menu'
export default {
  name: 'SiderMenu',
  components: {IMenu},
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data(){
      return{
          inWidth:'180px'
      }
  },
  computed: {
    isMobile () {
      return this.$store.state.setting.isMobile
    },
    systemName () {
      return this.$store.state.setting.systemName
    },
    badgeNum () {
      return this.$store.state.user.menuBadge
    },
    company () {
        return this.$store.state.user.company
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  },
  created(){
  }
}
</script>

<style lang="less" scoped>
  .shadow{
    box-shadow: 1px 2px 6px rgba(90, 169, 205,.2);
  }
  .sider{
    z-index: 10;
    &.light{
      background-color: #fff;
    }
    &.dark{
      background-color: #001529;
    }
    .logo{
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 12px;
      -webkit-transition: all .3s;
      transition: all .3s;
      overflow: hidden;
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
        height: 50px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .ant-menu {
    height: calc(~'100vh - 64px');
    overflow-y: auto;
    overflow-x: hidden; 
  }
  .ant-menu-inline-collapsed {
    width: 50px;
  }
</style>
<style>
  .ant-layout-sider .ant-menu-inline-collapsed > .ant-menu-item, .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,
  .ant-layout-sider .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-layout-sider .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding: 0!important;
    text-align: center;
  }
</style>
