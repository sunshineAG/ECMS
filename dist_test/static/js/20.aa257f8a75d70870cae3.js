webpackJsonp([20],{1215:function(t,e,n){n(2228);var a=n(20)(n(1619),n(2130),"data-v-7556f4a9",null);a.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\view\\dataManage\\groupTag.vue",a.esModule&&Object.keys(a.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] groupTag.vue: functional components are not supported with templates, they should use render functions."),t.exports=a.exports},1252:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"},1253:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"dataStatus",props:["width","height","material"],components:{},data:function(){return{}}}},1254:function(t,e,n){e=t.exports=n(15)(!1),e.push([t.i,"\n.imgBg[data-v-6c09838e]{\n    opacity:1;\n    text-align:center;\n    position:relative;\n}\n.text[data-v-6c09838e]{\n    position:absolute;\n    left:50%;\n    bottom:44px;\n    color:#ccc;\n    transform: translateX(-50%);\n}\n.matText[data-v-6c09838e]{\n    position:absolute;\n    left:50%;\n    bottom:86px;\n    color:#00000073;\n    transform: translateX(-50%);\n}\n",""])},1255:function(t,e,n){n(1257);var a=n(20)(n(1253),n(1256),"data-v-6c09838e",null);a.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\components\\pageConfig\\dataStatus.vue",a.esModule&&Object.keys(a.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] dataStatus.vue: functional components are not supported with templates, they should use render functions."),t.exports=a.exports},1256:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"imgBg"},[a("svg",{staticStyle:{"text-align":"center"},attrs:{width:t.width,height:t.height}},[a("image",{attrs:{"xlink:href":n(1252),width:"100%"}})]),t._v(" "),t.material?t._e():a("span",{staticClass:"text"},[t._v("暂无数据")]),t._v(" "),t.material?a("span",{staticClass:"matText"},[t._v("暂不支持")]):t._e()])},staticRenderFns:[]},t.exports.render._withStripped=!0},1257:function(t,e,n){var a=n(1254);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(16)("4232382d",a,!1)},1428:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["dataSource","pagination"],data:function(){return{columns:[{title:"序号",align:"center",width:"100px",customRender:function(t,e,n){return n+1}},{title:"标签名称",dataIndex:"title",align:"center",scopedSlots:{customRender:"title"}},{title:"标签备注",dataIndex:"desc",align:"center",scopedSlots:{customRender:"desc"}},{title:"操作",dataIndex:"operation",align:"center",scopedSlots:{customRender:"operation"}}],locale:{filterConfirm:"",filterReset:"",emptyText:""}}},methods:{editFn:function(t,e,n,a){this.$emit("callBackEdit",t,e,n,a)},deleteFn:function(t,e,n){this.$emit("headCallBackDel",t)},onShowSizeChange:function(t){this.$emit("paginationFn",{current:t.current,pageSize:t.pageSize})}}}},1439:function(t,e,n){e=t.exports=n(15)(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},1474:function(t,e,n){n(1486);var a=n(20)(n(1428),n(1480),"data-v-a4825730",null);a.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\components\\dataManage\\DepartmentalLabel.vue",a.esModule&&Object.keys(a.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] DepartmentalLabel.vue: functional components are not supported with templates, they should use render functions."),t.exports=a.exports},1480:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"margin-top":"10px"}},[n("a-table",{attrs:{columns:t.columns,dataSource:t.dataSource,pagination:t.pagination,locale:t.locale},on:{change:t.onShowSizeChange},scopedSlots:t._u([{key:"operation",fn:function(e,a,i){return[n("div",{staticClass:"editable-row-operations"},[n("span",{staticStyle:{"margin-right":"10px"}},[n("a",{on:{click:function(){return t.editFn(a.id,a.title,a.desc,a.color_id)}}},[t._v("编辑")])]),t._v(" "),n("span",[n("a-popconfirm",{attrs:{title:"你确定要删除吗？",placement:"top",okText:"确定",cancelText:"取消"},on:{confirm:function(e){return t.deleteFn(a.id)}}},[n("a",{attrs:{href:"javascript:void(0);"}},[t._v("删除")])])],1)])]}}])})],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},1486:function(t,e,n){var a=n(1439);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(16)("642461f4",a,!1)},1619:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(137),i=n.n(a),o=n(1255),r=n.n(o),s=n(1474),l=n.n(s),c=(n(94),n(93));e.default={name:"customerTag",components:{DepartmentalLabel:l.a,dataStatus:r.a},data:function(){return{visible:!1,tabs_key:1,searchKey:"",department_id:this.$store.state.user.user.department.id,edit_id:"",customerFlag:1,companyFlag:1,flag:1,dataList:[],pagination:{showQuickJumper:!0,showSizeChanger:!0,pageSizeOptions:["10","20","30","40","50"],current:1,pageSize:10,total:0,showTotal:function(t,e){return"共 "+t+" 项"}},colorList:c.colorList(),selectColorId:""}},beforeCreate:function(){this.form=this.$form.createForm(this),this.form.getFieldDecorator("desc",{initialValue:[""]}),this.form.getFieldDecorator("title",{initialValue:[""]})},methods:{callback:function(t){console.log(t),this.tabs_key=t,1==this.tabs_key?(this.flag=1,this.department_id=this.$store.state.user.user.department.id):(this.department_id=0,this.flag=2),this.pagination.current=1,this.refreshGroup()},new_create:function(){this.visible=!0,this.edit_id="",1==this.flag?this.customerFlag=1:this.companyFlag=1,this.selectColorId="1",this.form.setFieldsValue({title:"",desc:""})},onSearch:function(t){this.searchKey=t,this.refreshGroup()},com_handleCancel:function(){this.visible=!1},desc:function(t){this.form.setFieldsValue({desc:t})},input_name:function(t){this.form.setFieldsValue({title:t})},pageDataFn:function(t){console.log(t),this.pagination.current=t.current,this.pagination.pageSize=t.pageSize,this.refreshGroup()},editFn:function(t,e,n,a){1==this.flag?this.customerFlag=2:this.companyFlag=2,this.selectColorId=a,this.edit_id=t,this.form.setFieldsValue({title:e}),this.form.setFieldsValue({desc:n}),this.visible=!0,console.log(e)},com_handleOk:function(t){var e=this,n=this;t.preventDefault(),this.form.validateFields(function(t,a){if(t)return console.log("Received values of form: ",a),!1;var o="";1==e.flag?(n.customerFlag,o="/index.php?r=uc/material/room-label-add"):(n.companyFlag,o="/index.php?r=uc/material/room-label-add"),e.$axios({method:"POST",url:o,data:i()(a,{department_id:n.department_id,id:n.edit_id,color_id:e.selectColorId})}).then(function(t){var e=t.data;1==e.status?(n.$message.success(1==n.flag?1==n.customerFlag?"新建成功":"保存成功":1==n.companyFlag?"新建成功":"保存成功",2),n.visible=!1,n.refreshGroup()):n.$message.warn(e.msg)})})},headCallDel:function(t,e,n){var a=this;this.$axios({method:"POST",url:"/index.php?r=uc/material/room-label-del",data:{id:t}}).then(function(t){var e=t.data;console.log(e),1==e.status?(a.$message.success("删除成功",2),a.refreshGroup()):a.$message.warn(e.msg)})},refreshGroup:function(){var t=this;this.$axios({method:"GET",url:"/index.php?r=uc/material/room-label-list",params:{p:t.pagination.current,n:t.pagination.pageSize,department_id:t.department_id,searchKey:t.searchKey}}).then(function(e){var n=e.data;console.log(n),1==n.status?(t.pagination.total=parseInt(n.data.count),t.dataList=n.data.list,0==n.data.list.length&&t.pagination.current>1&&(t.pagination.current-=1,t.refreshGroup())):t.$message.warn(n.msg)})}},mounted:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},updated:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},computed:{},created:function(){this.refreshGroup()}}},1747:function(t,e,n){e=t.exports=n(15)(!1),e.push([t.i,"\n.stausPage[data-v-7556f4a9]{\r\n        position:absolute;\r\n        left:50%;\r\n        top:50%;\r\n        transform: translate(-45%,-50%);\n}\n.tab[data-v-7556f4a9] {\r\n\t\tmargin: 0px 20px 50px 20px;\n}\n.background-color[data-v-7556f4a9] {\r\n\t\theight: calc(100vh - 90px);\r\n\t\toverflow-y: auto;\r\n\t\tbackground: #fff;\n}\n.color-cricle[data-v-7556f4a9] {\r\n\t\tdisplay: inline-block;\r\n\t\twidth: 20px;height: 20px;\r\n\t\tborder-radius: 4px;\r\n\t\tposition: relative;\r\n\t\tmargin-right: 10px;\r\n\t\tcursor: pointer;\n}\r\n",""])},2130:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"background-color"},[n("a-row",{staticStyle:{padding:"20px 20px 0 20px"}},[n("a-col",{staticStyle:{"text-align":"left"},attrs:{span:"12"}},[n("a-input-search",{staticStyle:{width:"220px","margin-bottom":"20px"},attrs:{placeholder:"请输入编号、标签名称",enterButton:""},on:{search:t.onSearch}})],1),t._v(" "),n("a-col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[n("a-button",{attrs:{type:"primary"},on:{click:t.new_create}},[t._v("新建")])],1)],1),t._v(" "),n("a-tabs",{on:{change:t.callback}},[n("a-tab-pane",{key:"1",staticStyle:{"min-height":"700px",position:"relative"},attrs:{tab:"部门标签"}},[n("departmental-label",{staticClass:"tab",attrs:{pagination:t.pagination,dataSource:t.dataList},on:{paginationFn:t.pageDataFn,headCallBackDel:t.headCallDel,callBackEdit:t.editFn}})],1),t._v(" "),n("a-tab-pane",{key:"2",staticStyle:{"min-height":"700px",position:"relative"},attrs:{tab:"公司标签"}},[n("departmental-label",{staticClass:"tab",attrs:{pagination:t.pagination,dataSource:t.dataList},on:{paginationFn:t.pageDataFn,headCallBackDel:t.headCallDel,callBackEdit:t.editFn}})],1)],1),t._v(" "),n("a-modal",{attrs:{title:1==t.flag?1==t.customerFlag?"添加群标签":"编辑群标签":2==t.flag?1==t.companyFlag?"添加公司群标签":"编辑公司群标签":"",footer:null,visible:t.visible},on:{cancel:t.com_handleCancel}},[n("a-form",{attrs:{form:t.form},on:{submit:t.com_handleOk}},[n("a-form-item",{attrs:{wrapperCol:{span:24},label:"标签名称："}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["title",{rules:[{required:!0,message:"不能为空"}]}],expression:"[ 'title', {rules: [{ required: true, message: '不能为空' }]}]"}],attrs:{autocomplete:"off",placeholder:"请输入标签名称。。。",maxlength:"15"},on:{change:this.input_name}})],1),t._v(" "),n("a-form-item",{attrs:{wrapperCol:{span:24},label:"标签颜色："}},t._l(t.colorList,function(e){return n("span",{key:e.id,staticClass:"color-cricle",style:{background:e.id==t.selectColorId?e.selectColor:e.color},on:{click:function(n){t.selectColorId=e.id}}},[e.id==t.selectColorId?n("a-icon",{staticStyle:{color:"#ffffff",position:"absolute",right:"0",bottom:"0"},attrs:{type:"check-circle",theme:"filled"}}):t._e()],1)}),0),t._v(" "),n("a-form-item",{attrs:{wrapperCol:{span:24},label:"标签备注："}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["desc"],expression:"[ 'desc']"}],attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"请输入标签备注。。。",maxlength:"30"},on:{change:this.desc}})],1),t._v(" "),n("a-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{wrapperCol:{span:24,offset:17}}},[n("a-button",{on:{click:t.com_handleCancel}},[t._v("取消")]),t._v(" "),n("a-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",htmlType:"submit"}},[t._v("提交")])],1)],1)],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},2228:function(t,e,n){var a=n(1747);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(16)("51795e95",a,!1)}});