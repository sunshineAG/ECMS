webpackJsonp([24],{1229:function(t,e,a){a(2164),a(2165);var n=a(20)(a(1636),a(2086),"data-v-0e12d480",null);n.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\view\\productManage\\productSort.vue",n.esModule&&Object.keys(n.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] productSort.vue: functional components are not supported with templates, they should use render functions."),t.exports=n.exports},1252:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"},1253:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"dataStatus",props:["width","height","material"],components:{},data:function(){return{}}}},1254:function(t,e,a){e=t.exports=a(15)(!1),e.push([t.i,"\n.imgBg[data-v-6c09838e]{\n    opacity:1;\n    text-align:center;\n    position:relative;\n}\n.text[data-v-6c09838e]{\n    position:absolute;\n    left:50%;\n    bottom:44px;\n    color:#ccc;\n    transform: translateX(-50%);\n}\n.matText[data-v-6c09838e]{\n    position:absolute;\n    left:50%;\n    bottom:86px;\n    color:#00000073;\n    transform: translateX(-50%);\n}\n",""])},1255:function(t,e,a){a(1257);var n=a(20)(a(1253),a(1256),"data-v-6c09838e",null);n.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\components\\pageConfig\\dataStatus.vue",n.esModule&&Object.keys(n.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] dataStatus.vue: functional components are not supported with templates, they should use render functions."),t.exports=n.exports},1256:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"imgBg"},[n("svg",{staticStyle:{"text-align":"center"},attrs:{width:t.width,height:t.height}},[n("image",{attrs:{"xlink:href":a(1252),width:"100%"}})]),t._v(" "),t.material?t._e():n("span",{staticClass:"text"},[t._v("暂无数据")]),t._v(" "),t.material?n("span",{staticClass:"matText"},[t._v("暂不支持")]):t._e()])},staticRenderFns:[]},t.exports.render._withStripped=!0},1257:function(t,e,a){var n=a(1254);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(16)("4232382d",n,!1)},1636:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(137),i=a.n(n),o=a(1255),r=a.n(o),s=(a(94),[{title:"名称",dataIndex:"title",align:"center",width:200},{title:"数量",dataIndex:"goodsNum",align:"center",width:150},{title:"描述",dataIndex:"desc",align:"left"},{title:"操作",dataIndex:"operation",align:"center",width:300,scopedSlots:{customRender:"operation"}}]);e.default={name:"productSort",components:{dataStatus:r.a},data:function(){return{columns:s,visible:!1,searchKey:"",edit_id:"",robotFlag:1,dataList:[],locale:{filterConfirm:"",filterReset:"",emptyText:""},pagination:{showQuickJumper:!0,showSizeChanger:!0,pageSizeOptions:["10","20","30","40","50"],current:1,pageSize:10,total:0,showTotal:function(t,e){return"共 "+t+" 项"}}}},beforeCreate:function(){this.form=this.$form.createForm(this),this.form.getFieldDecorator("desc",{initialValue:[""]}),this.form.getFieldDecorator("title",{initialValue:[""]})},methods:{onShowSizeChange:function(t){this.pagination.current=t.current,this.pagination.pageSize=t.pageSize,this.refreshGroup()},onSearch:function(t){this.searchKey=t,this.refreshGroup()},com_handleCancel:function(){this.visible=!1},desc:function(t){this.form.setFieldsValue({desc:t})},input_name:function(t){this.form.setFieldsValue({title:t})},deleteFn:function(t){var e=this;this.$axios({method:"POST",url:"/index.php?r=uc/product/class-del",data:{id:t}}).then(function(t){1==t.data.status&&(e.$message.success("删除成功",2),e.refreshGroup())})},new_create:function(){this.visible=!0,this.edit_id="",this.robotFlag=1,console.log(this.form),this.form.setFieldsValue({title:"",desc:""})},editFn:function(t,e,a){this.robotFlag=2,this.edit_id=t,this.form.setFieldsValue({title:e}),this.form.setFieldsValue({desc:a}),this.visible=!0},com_handleOk:function(t){var e=this,a=this;t.preventDefault(),this.form.validateFields(function(t,n){if(t)return console.log("Received values of form: ",n),!1;e.$axios({method:"POST",url:"/index.php?r=uc/product/class-add",data:i()(n,{id:2==a.robotFlag?a.edit_id:""})}).then(function(t){1==t.data.status&&(a.$message.success(1==a.robotFlag?"新建成功":"保存成功",2),a.visible=!1,a.refreshGroup())})})},refreshGroup:function(){var t=this;this.$axios({method:"GET",url:"/index.php?r=uc/product/category",params:{p:t.pagination.current,n:t.pagination.pageSize,key:t.searchKey}}).then(function(e){var a=e.data;1==a.status&&(t.pagination.total=parseInt(a.data.count),t.dataList=a.data.list,0==a.data.list.length&&t.pagination.current>1&&(t.pagination.current-=1,t.refreshGroup()))})}},mounted:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},updated:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},computed:{},created:function(){this.refreshGroup()}}},1683:function(t,e,a){e=t.exports=a(15)(!1),e.push([t.i,"\n.product-sort .ant-table-thead > tr > th{\n\ttext-align: center !important;\n}\n.background-color {\n\tbackground: #fff;\n\theight: calc(100vh - 90px);\n\toverflow-y: auto;\n}\n.ant-table-tbody>tr>td{\n\ttext-align: left;\n}\n",""])},1684:function(t,e,a){e=t.exports=a(15)(!1),e.push([t.i,"\n.tab[data-v-0e12d480] {\n\t\tmargin: 0px 20px 50px 20px;\n        position:relative;\n}\n.stausPage[data-v-0e12d480]{\n        position:absolute;\n        left:50%;\n        top:200px;\n        z-index:999;\n        transform: translate(-50%,0);\n}\n",""])},2086:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"background-color"},[a("a-row",{staticStyle:{padding:"20px 20px 0 20px"}},[a("a-col",{staticStyle:{"text-align":"left"},attrs:{span:"12"}},[a("a-input-search",{staticStyle:{width:"220px","margin-bottom":"20px"},attrs:{placeholder:"请输入编号、类别搜索",enterButton:""},on:{search:t.onSearch}})],1),t._v(" "),a("a-col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[a("a-button",{attrs:{type:"primary"},on:{click:t.new_create}},[t._v("新建")])],1)],1),t._v(" "),a("div",{staticClass:"tab product-sort"},[a("a-table",{staticStyle:{width:"100%"},attrs:{columns:t.columns,dataSource:t.dataList,pagination:t.pagination,locale:t.locale},on:{change:t.onShowSizeChange},scopedSlots:t._u([{key:"operation",fn:function(e,n,i){return[a("div",{staticClass:"editable-row-operations"},[a("span",{staticStyle:{"margin-right":"10px"}},[a("a",{on:{click:function(){return t.editFn(n.id,n.title,n.desc)}}},[t._v("编辑")])]),t._v(" "),a("span",[a("a-popconfirm",{attrs:{title:"你确定要删除吗？",placement:"top",okText:"确定",cancelText:"取消"},on:{confirm:function(e){return t.deleteFn(n.id)}}},[a("a",{attrs:{href:"javascript:void(0);"}},[t._v("删除")])])],1)])]}}])})],1),t._v(" "),a("a-modal",{attrs:{title:1==t.robotFlag?"添加产品类别":"修改产品类别",footer:null,visible:t.visible},on:{cancel:t.com_handleCancel}},[a("a-form",{attrs:{form:t.form},on:{submit:t.com_handleOk}},[a("a-form-item",{attrs:{wrapperCol:{span:24},label:"类别名称："}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["title",{rules:[{required:!0,message:"不能为空"}]}],expression:"[ 'title', {rules: [{ required: true, message: '不能为空' }]}]"}],attrs:{autocomplete:"off",placeholder:"请输入产品类别",maxlength:"15"},on:{change:this.input_name}})],1),t._v(" "),a("a-form-item",{attrs:{wrapperCol:{span:24},label:"类别描述："}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["desc"],expression:"[ 'desc']"}],staticStyle:{"text-align":"left"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"请输入类别描述。。。",maxlength:"50"},on:{change:this.desc}})],1),t._v(" "),a("a-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{wrapperCol:{span:24,offset:17}}},[a("a-button",{on:{click:t.com_handleCancel}},[t._v("取消")]),t._v(" "),a("a-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",htmlType:"submit"}},[t._v("提交")])],1)],1)],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},2164:function(t,e,a){var n=a(1683);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(16)("718b1bfb",n,!1)},2165:function(t,e,a){var n=a(1684);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(16)("6de7a01d",n,!1)}});