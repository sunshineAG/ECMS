webpackJsonp([33],{1225:function(t,e,a){a(2204);var i=a(20)(a(1632),a(2112),"data-v-55161734",null);i.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\view\\mallManage\\mallOrder.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] mallOrder.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},1252:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"},1253:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"dataStatus",props:["width","height","material"],components:{},data:function(){return{}}}},1254:function(t,e,a){e=t.exports=a(15)(!1),e.push([t.i,"\n.imgBg[data-v-6c09838e]{\n    opacity:1;\n    text-align:center;\n    position:relative;\n}\n.text[data-v-6c09838e]{\n    position:absolute;\n    left:50%;\n    bottom:44px;\n    color:#ccc;\n    transform: translateX(-50%);\n}\n.matText[data-v-6c09838e]{\n    position:absolute;\n    left:50%;\n    bottom:86px;\n    color:#00000073;\n    transform: translateX(-50%);\n}\n",""])},1255:function(t,e,a){a(1257);var i=a(20)(a(1253),a(1256),"data-v-6c09838e",null);i.options.__file="D:\\baozWork\\liejing\\js\\ECMS\\src\\components\\pageConfig\\dataStatus.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] dataStatus.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},1256:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"imgBg"},[i("svg",{staticStyle:{"text-align":"center"},attrs:{width:t.width,height:t.height}},[i("image",{attrs:{"xlink:href":a(1252),width:"100%"}})]),t._v(" "),t.material?t._e():i("span",{staticClass:"text"},[t._v("暂无数据")]),t._v(" "),t.material?i("span",{staticClass:"matText"},[t._v("暂不支持")]):t._e()])},staticRenderFns:[]},t.exports.render._withStripped=!0},1257:function(t,e,a){var i=a(1254);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(16)("4232382d",i,!1)},1632:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(13),n=a.n(i),o=a(54),r=a.n(o),s=a(137),l=a.n(s),d=a(1255),c=a.n(d),p=a(93),u=a(32);e.default={name:"companyUser",components:{dataStatus:c.a},data:function(){return{form:this.$form.createForm(this),headers:{Authorization:u.store.get("token")},queryParam:{content:"",cl_type:""},orderList:[],platFormList:[],columns:[{title:"平台",dataIndex:"platform",align:"center",width:"10%",scopedSlots:{customRender:"platform"}},{title:"订单号/货号",align:"center",width:"10%",dataIndex:"order_id"},{title:"产品名称",align:"center",width:"10%",dataIndex:"product_name"},{title:"产品种类",align:"center",width:"10%",dataIndex:"class_name"},{title:"购买时间",align:"center",width:"10%",dataIndex:"created"},{title:"平台账号",align:"center",width:"10%",dataIndex:"platform_name"},{title:"买家手机号",align:"center",width:"10%",dataIndex:"tel"},{title:"价格",align:"center",width:"10%",dataIndex:"single_price"},{title:"数目",align:"center",width:"10%",dataIndex:"num"},{title:"总金额",align:"center",width:"10%",dataIndex:"all_price"}],sheight:"",heightFlg:!1,loading:!1,uploading:!1,page_size:10,page:1,total:0,visible:!1,importPlatFormId:3,importPlatFormList:[],dataUpload:{},fileList:[],downLoadURL:""}},methods:{autoHeight:function(){var t=this,e=p.autoHeight(t.$refs.header,t.$refs.table);e&&(t.sheight=e.sheight?e.sheight-t.$refs.header.offsetHeight+15:"",t.heightFlg=e.heightFlg)},onSelect:function(t){this.page=1,this.page_size=10,this.queryParam.cl_type=t,this.getOrderList()},search:function(){this.page=1,this.page_size=10,this.getOrderList()},getOrderList:function(){var t=this;this.$axios({method:"post",url:"/index.php?r=uc/sale/shop-list",data:l()({p:this.page,n:this.page_size},this.queryParam)}).then(function(e){var a=e.data;1==a.status&&(t.orderList=a.data.list,t.loading=!1,t.total=parseInt(a.data.count))})},getPlatForm:function(){var t=this;this.$axios({method:"get",url:"/index.php?r=uc/sale/plat-form"}).then(function(e){var a=e.data;1==a.status&&(t.downLoadURL=a.data.down_url,t.importPlatFormList=JSON.parse(r()(a.data.list)),t.platFormList=a.data.list,t.platFormList.unshift({id:"0",name:"全部"}),t.queryParam.cl_type="0",t.getOrderList())})},onChange:function(t,e){this.page=t,this.page_size=e,this.getOrderList()},onShowSizeChange:function(t,e){this.page=1,this.page_size=e,this.getOrderList()},importShow:function(){this.importPlatFormId=3,this.fileList=[],this.uploading=!1,this.visible=!0},com_handleCancel:function(){this.fileList=[],this.visible=!1},handleChange:function(t){var e=[].concat(n()(t.fileList));if(e=e.slice(-1),e=e.map(function(t){return t.response&&(t.url=t.response.url),t}),e=e.filter(function(t){return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"==t.type||"application/vnd.ms-excel"==t.type||""==t.type}),this.fileList=e,"uploading"===t.file.status)return void(this.uploading=!0);"done"===t.file.status?1==t.file.response.status?(this.uploading=!1,this.visible=!1,this.getOrderList()):(this.uploading=!1,this.$notification.warning({message:"上传错误",description:t.file.response.msg})):"error"===t.file.status&&(this.uploading=!1,this.$notification.warning({message:"上传失败",description:"文件"+t.file.name+"上传失败"}))},beforeUpload:function(t){var e=void 0;if(""==t.type){e=/.xlsx$/.test(t.name)}else e="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===t.type;return e||this.$notification.warning({message:"文件格式不正确",description:"文件格式不正确，请选择xlsx。"}),e}},mounted:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route),window.addEventListener("resize",this.autoHeight,!1)},watch:{orderList:function(){var t=""+document.documentElement.clientHeight,e=this.$refs.header.offsetHeight+126;this.$nextTick(function(){t-e<=this.$refs.table.$el.offsetHeight+40?(this.heightFlg=!0,this.sheight=t-e-this.$refs.header.offsetHeight+45):this.heightFlg=!1})}},updated:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},computed:{},created:function(){this.getPlatForm()},beforDestroy:function(){window.removeEventListener("resize",this.autoHeight,!1)}}},1723:function(t,e,a){e=t.exports=a(15)(!1),e.push([t.i,"\n.company-user[data-v-55161734] {\n  background: #ffffff;\n  position: relative;\n  padding: 0 14px;\n  border-radius: 3px;\n  height: calc(100vh - 90px);\n  overflow: auto;\n}\n.company-user .header[data-v-55161734] {\n  padding: 12px 0;\n  background: #fff;\n}\n.company-user .content[data-v-55161734] {\n  position: relative;\n}\n.fl[data-v-55161734] {\n  float: left;\n}\n.fr[data-v-55161734] {\n  float: right;\n}\n.clr[data-v-55161734]:after {\n  display: block;\n  height: 0;\n  content: '';\n  visibility: hidden;\n  clear: both;\n}\n.stausPage[data-v-55161734] {\n  position: absolute;\n  left: 50%;\n  top: 200px;\n  z-index: 999;\n  transform: translate(-50%, 0);\n}\n.actionIcon[data-v-55161734] {\n  width: 36px;\n  height: 36px;\n  cursor: pointer;\n}\n.label[data-v-55161734] {\n  border: 1px dashed #2686d4;\n  border-radius: 10px;\n  width: 60px;\n  font-size: 12px;\n  padding: 2px 6px;\n  cursor: pointer;\n  line-height: 16px;\n}\n.company-user .botomCheck[data-v-55161734] {\n  float: left;\n  vertical-align: middle;\n  margin-left: 42px;\n  margin-top: 6px;\n}\n.plat-form3[data-v-55161734] {\n  color: #FE0733;\n}\n.plat-form4[data-v-55161734] {\n  color: #FE5606;\n}\n.plat-form5[data-v-55161734] {\n  color: #E22117;\n}\n.plat-form6[data-v-55161734] {\n  color: #E6090D;\n}\n",""])},2112:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"company-user"},[a("div",{ref:"header",staticClass:"header"},[a("a-form",{attrs:{layout:"inline",form:t.form}},[a("a-row",{staticClass:"clr"},[a("a-col",{attrs:{span:24}},[a("div",{staticClass:"fl"},[a("a-form-item",{attrs:{label:"选择平台"}},[a("a-select",{staticStyle:{width:"150px"},attrs:{placeholder:"选择平台"},on:{change:t.onSelect},model:{value:t.queryParam.cl_type,callback:function(e){t.$set(t.queryParam,"cl_type",e)},expression:"queryParam.cl_type"}},t._l(t.platFormList,function(e,i){return a("a-select-option",{key:e.id},[t._v("\n                                        "+t._s(e.name)+"\n                                    ")])}),1)],1)],1),t._v(" "),a("div",{staticClass:"fr"},[a("a-form-item",{attrs:{label:""}},[a("a-input-search",{staticStyle:{width:"220px"},attrs:{placeholder:"关键词搜索",enterButton:""},on:{search:function(e){return t.search()}},model:{value:t.queryParam.content,callback:function(e){t.$set(t.queryParam,"content",e)},expression:"queryParam.content"}})],1),t._v(" "),a("div",{staticStyle:{display:"inline-block",position:"relative",top:"5px"}},[a("a",{attrs:{href:t.downLoadURL,download:"数据模板"}},[a("a-button",{attrs:{type:"primary"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t下载模板\n\t\t\t\t\t\t\t\t\t")])],1),t._v(" "),a("a-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(e){return t.importShow()}}},[t._v("导入数据")])],1)],1)])],1)],1)],1),t._v(" "),a("div",{staticClass:"content"},[a("a-table",{ref:"table",class:[t.heightFlg?"scrollheade":"scrollheader"],attrs:{rowKey:function(t,e){return e},columns:t.columns,rowClassName:function(t,e){return e%2==0?"bg-row":"bg-row-gray"},dataSource:t.orderList,pagination:!1,loading:t.loading,type:"checkbox",scroll:{y:t.sheight,x:!1}},scopedSlots:t._u([{key:"platform",fn:function(e,i,n){return[a("div",[a("span",{class:["plat-form"+i.cl_type]},[t._v(t._s(i.platform))])])]}}])}),t._v(" "),a("div",{ref:"bottomPage"},[t.orderList.length?a("div",{class:[t.heightFlg?"bottomPageK":"bottomPage"]},[t.orderList.length?a("a-pagination",{staticClass:"col",staticStyle:{"text-align":"right",float:"right"},attrs:{showQuickJumper:"",showSizeChanger:"",showTotal:function(t){return"总共"+t+"条"},pageSize:t.page_size,total:t.total,pageSizeOptions:["10","20","30","40","50"]},on:{change:t.onChange,showSizeChange:t.onShowSizeChange},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}):t._e()],1):t._e()])],1),t._v(" "),a("a-modal",{attrs:{title:"导入数据",footer:null,visible:t.visible},on:{cancel:t.com_handleCancel}},[a("a-form",[a("a-form-item",{attrs:{wrapperCol:{span:24},label:"选择平台："}},[a("a-radio-group",{attrs:{name:"radioGroup"},model:{value:t.importPlatFormId,callback:function(e){t.importPlatFormId=e},expression:"importPlatFormId"}},t._l(t.importPlatFormList,function(e,i){return a("a-radio",{key:i,class:["plat-form"+e.id],attrs:{value:e.id}},[t._v(t._s(e.name))])}),1)],1),t._v(" "),a("a-form-item",{attrs:{wrapperCol:{span:24},label:"上传文件："}},[a("a-upload",{attrs:{name:"file",action:"http://"+this.$store.state.user.company.public_ip+":"+this.$store.state.user.company.server_port+"/qiyewxapi/exportfriends?",headers:t.headers,beforeUpload:t.beforeUpload,disabled:t.uploading,fileList:t.fileList,data:{id:t.importPlatFormId,ecms_userid:t.$store.state.user.user.user_id}},on:{change:t.handleChange}},[a("a-button",[a("a-icon",{staticStyle:{color:"#7EB9D6"},attrs:{type:"upload"}}),t._v("上传文件")],1),t._v(" "),a("div",{staticStyle:{color:"rgba(0,0,0,0.45)","margin-top":"10px"}},[t._v("\n                            支持扩展名xlsx\n                        ")])],1)],1)],1)],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},2204:function(t,e,a){var i=a(1723);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(16)("bacdc9ae",i,!1)}});