/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例：
 * [
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  },
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  }
 * ]
 **/
import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'
import Badge from 'ant-design-vue/es/badge'
const {Item, SubMenu} = Menu

// 默认菜单图标数组，如果菜单没配置图标，则会设置从该数组随机取一个图标配置
const iconArr = ['dashboard', 'user', 'form', 'setting', 'message', 'safety', 'bell', 'delete', 'code-o', 'poweroff', 'eye-o', 'hourglass']
const MyIconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1519608_z2lq8egd59q.js'
});
export default {
  name: 'IMenu',
  props: {
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuType: {
      type: String,
      required: false,
      default: '1'
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.menuData.forEach(item => {
        keys.push(item.name)
      })
      return keys
    },
    menuBadge() {
      return this.$store.state.user.menuBadge
    },
    robotStatus() {
      return this.$store.state.user.robotStatus
    }
  },
  created () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    '$route': function () {
      this.updateMenu()
    }
  },
  methods: {
    renderBadge: function (h,badge) {
      return h(Badge,{
        props: {
          count:badge,
          overflowCount:99,
          numberStyle:{
            padding:'0',
            boxShadow:'none',
            marginLeft:this.menuType==1?'25px':'2px',
            top:this.menuType==1?'0':'-2px',
          }
        }
      })
    },
    renderIcon: function (h, icon) {
      return icon === 'none' ? null:
        /^icon/.test(icon)?
          h(
            MyIconFont,
            {
              props: {type: icon !== undefined ? icon : iconArr[Math.floor((Math.random() * iconArr.length))]}
            })
        : h(
          Icon,
          {
            props: {type: icon !== undefined ? icon : iconArr[Math.floor((Math.random() * iconArr.length))]}
          })
    },
    renderMenuItem: function (h, menu, pIndex, index) {
      let badge = '';
      this.menuBadge.forEach(el=>{
          if(el.name==menu.name) {
              badge = el.badge
          }
      })
      return h(
        Item,
        {
          key: menu.name ? menu.name : 'item_' + pIndex + '_' + index,
          class:menu.name=='聚合聊天'?'head-chat':this.menuType=='2'?'head-other':''
        },
        [
          h(
            'a',
            {attrs: {href: '#' + menu.path}},
            [
              this.renderIcon(h, menu.icon),
              h('span', [menu.name]),
              this.renderBadge(h,badge)
            ]
          ),
          // !this.collapsed&&menu.name=='手机列表'&&this.robotStatus!=0&&h('img',{
          //   attrs:{
          //     src:'static/img_file/warning.svg'
          //   },
          //   style:{
          //     width:'20px',
          //     verticalAlign: 'text-top',
          //     marginLeft:'10px',
          //     float:'right',
          //     top:'-30px',
          //     position:'relative',
          //     zIndex:'100',
          //   }
          // })
        ]
      )
    },
    renderSubMenu: function (h, menu, pIndex, index) {
      var this2_ = this
      let badge = '';
      this.menuBadge.forEach(el=>{
        if(el.name==menu.name) {
            badge = el.badge
        }
      })
      this.openKeys.forEach(el=>{
          if(el==menu.name) {
              badge=''
          }
      })
      var subItem = [h('span',
        {slot: 'title'},
        [
          this.renderIcon(h, menu.icon),
          h('span',{
              style:{
                  fontWeight:'500'
              }
          }, [menu.name]),
          !this.collapsed&&this.renderBadge(h,badge)
        ]
      )]
      var itemArr = []
      var pIndex_ = pIndex + '_' + index
      menu.children.forEach(function (item, i) {
        itemArr.push(this2_.renderItem(h, item, pIndex_, i))
      })
      return h(
        SubMenu,
        {key: menu.name ? menu.name : 'submenu_' + pIndex + '_' + index},
        subItem.concat(itemArr)
      )
    },
    renderItem: function (h, menu, pIndex, index) {
      if (!menu.invisible) {
        return menu.children ? this.renderSubMenu(h, menu, pIndex, index) : this.renderMenuItem(h, menu, pIndex, index)
      }
    },
    renderMenu: function (h, menuTree) {
      var this2_ = this
      var menuArr = []
      menuTree.forEach(function (menu, i) {
        menuArr.push(this2_.renderItem(h, menu, '0', i))
      })
      return menuArr
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateMenu () {
      let routes = this.$route.matched.concat()
      if(this.menuType==='2') {
        this.selectedKeys = [JSON.parse(localStorage.getItem("menuNav"))]
        this.$forceUpdate()
      }else {
        this.selectedKeys = [routes.pop().name]
      }
      let openKeys = []
      routes.forEach((item) => {
        openKeys.push(item.name)
      })
      this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.openKeys = openKeys
    }
  },
  render (h) {
    return h(
      Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: (obj) => {
            this.selectedKeys = obj.selectedKeys
            this.$emit('select', obj)
              if(this.menuType == 2) {
                this.menuData.forEach(el=>{
                  if(el.name == obj.key) {
                    this.$store.commit('user/clearMenuBadge', {name:el.name})
                  }
                })
              }else {
                this.menuData.forEach(el=>{
                  el.children&&el.children.forEach(item=>{
                    if(item.name == obj.key) {
                      this.$store.commit('user/clearMenuBadge', {name:item.name})
                    }
                  })
                })
              }
          }
        }
      }, this.renderMenu(h, this.menuData)
    )
  }
}
