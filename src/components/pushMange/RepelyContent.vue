<template>
	<div >
        <a-row>
            <div>
                <a-form>
                    <a-form-item   :validateStatus='savFlg?"":sendObj.text?"success":"error"' :help='savFlg?"":sendObj.text?"":"请输入文本。。。"'>
                        <div class="input-content" style="position: relative">
                            <div class="tools">
                                <div class="fl" v-if="!activeMaterial.length">
                                    <a-icon type="smile" @click="showEmoji()" id="showEmoji" />
                                    <div v-if="emojiFlag" id="emoji">
                                        <a href="javascript:;" v-for="(item,index) in emojiList" v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
                                    </div>  
                                </div>
                                <div class="fr">
                                    <a href="javascript:;" @click="clrMaterial(editAre)" style="padding-right:10px;">清除素材</a>
                                    <a href="javascript:;" @click="choseMaterial(editAre)">选择素材</a>
                                </div>
                            </div>
                            <div class="input-content-area" v-if="!activeMaterial.length">
                                <div-edit-area :id="editAre"  :formItem="sendObj" ref="div_edit" @change='getSel()' style="height:inherit" @blur.native.capture='blurLive(editAre)'>  </div-edit-area>
                            </div>
                        </div>
                        <div >
                        <div class="material " v-if="activeMaterial.length||replyFlg">
                            <view-material :dataItem="activeMaterial[0]" showDel="1"></view-material>
                            <!--<textual-material  :methodHiden='true' :dataSource="activeMaterial" v-if="activeType==='1'?true:false" ></textual-material>-->
                            <!--<picture-material  :methodHiden='true' :dataSource="activeMaterial" :width='200' :height='230' v-if="activeType==='2'?true:false"></picture-material>-->
                            <!--<link-material  :methodHiden='true' :dataSource="activeMaterial" :width='230'  :height='130' v-if="activeType==='3'?true:false"></link-material>-->
                            <!--<business-card-material  :methodHiden='true' :dataSource="activeMaterial" :width='200'  :height='130' v-if="activeType==='7'?true:false"></business-card-material>-->
                            <!--<small-program-material  :methodHiden='true' :dataSource="activeMaterial" :width='240' :height='130' v-if="activeType==='8'?true:false"></small-program-material>-->
                        </div>

                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </a-row>
        <a-modal title="使用素材" :footer="null" :visible="com_visible" @cancel="com_handleCancel" width="90%" >
            <div class="useMaterial">
                <a-tabs @change="calltabbackKey" :defaultActiveKey="1">
                    <a-tab-pane tab="文本素材" key="1" >
                        <textual-material class="tab" v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="textData"></textual-material>
                    </a-tab-pane>
                    <a-tab-pane tab="图片素材" key="2" >
                        <picture-material class="tab" v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="imgData"></picture-material>
                    </a-tab-pane>
                    <a-tab-pane tab="链接素材" key="3" >
                        <link-material class="tab"  v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="linkData"></link-material>
                    </a-tab-pane>
                    <a-tab-pane tab="名片素材" key="4" >
                        <business-card-material class="tab"  v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="cardData"></business-card-material>
                    </a-tab-pane>
                    <a-tab-pane tab="小程序素材" key="5">
                        <small-program-material class="tab"  v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="programData"></small-program-material>
                    </a-tab-pane>
                    <a-tab-pane tab="文件素材" key="7">
                        <files-material class="tab"  v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="fileData"></files-material>
                    </a-tab-pane>
                    <a-tab-pane tab="视频素材" key="6">
                        <video-material class="tab"  v-on:headCallBackChose="headCallChose" :methodHiden='true' :dataSource="videoData"></video-material>
                    </a-tab-pane>
                </a-tabs>
            </div>
            <!-- <a-form  :form="form">
                <a-form-item :wrapperCol="{ span: 24 }" style="margin-bottom: 0;text-align:right;">
                    <a-button @click="com_handleCancel">取消</a-button>
                    <a-button type='primary' htmlType='submit' style="margin-left: 10px;">提交</a-button>
                </a-form-item>
			</a-form> -->
        </a-modal>
	</div>
</template>

<script>
    import divEditArea from '../../components/dataManage/divEditArea';
    import TextualMaterial from '../../components/dataManage/TextualMaterial'
	import PictureMaterial from '../../components/dataManage/PictureMaterial'
	import LinkMaterial from '../../components/dataManage/LinkMaterial'
	import BusinessCardMaterial from '../../components/dataManage/BusinessCardMaterial'
    import SmallProgramMaterial from '../../components/dataManage/SmallProgramMaterial'
    import videoMaterial from '../../components/dataManage/videoMaterial'
    import filesMaterial from '../../components/dataManage/filesMaterial'
    import viewMaterial from '../MessagePush/viewMaterial.vue'
    var emoji = require('../../common/emojiMap');
    var storage = require('../../common/store');
    //1 文本；2 图片；3 链接；7 名片；8 小程序；9 朋友圈素材
	export default {
        name: "replyContent",
        props:['editAre','tempIndex','dataSourceList'],
        components:{
            divEditArea,
            TextualMaterial,
			PictureMaterial,
			LinkMaterial,
			BusinessCardMaterial,
			SmallProgramMaterial,
            viewMaterial,
            videoMaterial,
            filesMaterial
        },
		data() {
			return {
                com_visible:false,
                replyFlg:false,
                savFlg:true,
                emojiList:emoji.emojiList,
                textData:[],
				imgData:[],
				linkData:[],
				cardData:[],
                programData:[],
                text_imgData:[],
                videoData:[],
                fileData:[],
                activeMaterial:[],//选中素材的数组
                activeType:'1',
				quryForm: {
					department_id: [this.$store.state.user.user.department.id,"0"]
				},
                sendObj: {
					text: '',
					imgList: ''
                },
                emojiFlag:false,
                tempObj:{}
			}
		},
        computed:{
           departmentID(){
				return this.$store.state.user.user.department.id //返回store实例的count状态
			}
        },
        mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
            this.globalClick(this.closeEmoji);
		},
		updated() {
            this.$store.dispatch('setting/getBreadcrumb', this.$route)
        },
        watch:{
             dataSourceList: 'initData'
        },
        beforeCreate() {
            this.form = this.$form.createForm(this);
        },
		methods: {
            headCallChose(item){
                // console.log(item)
                console.log(item)
                    this.activeMaterial= [];
                    // console.log(item)
                    switch(item.type){
                        case "1":
                            this.textData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                        case "2":
                            this.imgData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                    // console.log(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                        case "3":
                            this.linkData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                        case "7":
                            this.cardData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                        case "8":
                            this.programData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                        case "11":
                            this.videoData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                        case "10":
                            this.fileData.forEach(el=>{
                                if(el.id === item.id){
                                    this.activeMaterial.push(el)
                                }
                            })
                            this.activeType = item.type;
                            break;
                    }
                    this.com_visible = false;
                    // this.replyFlg = true;
                let objParams={
                    areName:this.editAre,
                    content:'',
                    activeMaterial:this.activeMaterial,
                }
                this.returnMaterial(objParams);
            },
            clrEmoji(){
                this.emojiFlag= false;
            },
            deleActive(){
                this.activeMaterial = []
            },
            com_handleCancel(){
                this.activeMaterial = []
                this.com_visible = !this.com_visible;
            },
            returnMaterial(obj){
                // console.log(obj)
             this.$emit('prams',obj);
            },
            choseMaterial(areName){ //选中素材触发的事件  areName 内容回复组件名称
                this.refreshGroup();
                this.replyFlg = true;
                this.com_visible = !this.com_visible;
            },
            blurLive(areName){
                //失去焦点后触发父组件
                let objParams={
                    areName:areName,
                    content:emoji.htmlToString(this.sendObj.text)
                }
                // objParams.content = objParams.content.replace(/<[^>]+>/g,"");
                this.returnMaterial(objParams);
            },
            clrMaterial(){
                 this.activeMaterial= [];
                 this.replyFlg = false;
                 let objParams={
                    areName:this.editAre,
                    activeMaterial:this.activeMaterial
                }
                 this.returnMaterial(objParams);
            },
            initData(){
                if(this.dataSourceList !== undefined ){
                    if(this.dataSourceList.title && this.dataSourceList.title==='content'){
                            this.sendObj.text =  emoji.stringToHtml(this.dataSourceList.content);
                    }else if(this.dataSourceList.title){
                        this.activeType = this.dataSourceList.type; //this.dataSourceList
                        this.activeMaterial.push(this.dataSourceList);
                    }else if(!this.dataSourceList.content && this.dataSourceList.material!== undefined){
                        this.activeType = this.dataSourceList.material.type;
                        this.activeMaterial.push(this.dataSourceList.material);
                    }else if(this.dataSourceList &&this.dataSourceList.content){
                         this.sendObj.text =  emoji.stringToHtml(this.dataSourceList.content);
                    }else if(this.dataSourceList.activeMaterial){
                         this.activeType  = this.dataSourceList.activeMaterial[0].type
                         this.activeMaterial = this.dataSourceList.activeMaterial;
                    }else if(this.dataSourceList.cl_type=='material') {
                        this.activeType = this.dataSourceList.type;
                        this.activeMaterial.push(this.dataSourceList);
                    }
                }
            },
            calltabbackKey(){},
            showEmoji() {
               this.emojiFlag = !this.emojiFlag;
			},
			closeEmoji() {
				this.emojiFlag = false;
			},
			emojiAdd(e) {
				document.getElementById(this.editAre).focus()
				let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='" + e.currentTarget.attributes.title_name.nodeValue + "'>"
				this.emojiAddInPosition(html)
                this.$refs.div_edit.changeTxt()
			},
			emojiAddInPosition(html, t) {
				let sel, range;
				if(t || this.getRange(), window.getSelection) {
					!t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)), range.deleteContents();
					sel = window.getSelection(); //返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
					let frag, node, lastNode;
					if(range.createContextualFragment) {
						frag = range.createContextualFragment(html)
					} else {
						let el = document.createElement("div");
						el.innerHTML = html;
						frag = document.createDocumentFragment()
						while((node = el.firstChild)) {
							lastNode = frag.appendChild(node);
						}
					}
					let ran = frag.lastChild;
					range.insertNode(frag);
					range.setStartAfter(ran); //重新定位range（光标位置）
					sel.removeAllRanges(); //清除所有选中
					sel.addRange(range); //将新定位的range加入
					let x = document.getElementById(this.editAre)
					let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
					x.scrollTop < l && (x.scrollTop = l)
				} else if(document.selection && document.selection.type != "Control") {
					// IE < 9
					document.selection.createRange().pasteHTML(html);
                }
                
                console.log(this.sendObj)
                //  this.$emit('closeMain',flag);
			},
			getSel() {
                window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
		
		},
			getRange() {
				this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
			},
			setRange() {
				let x = document.getElementById(this.editAre)
				var e, t;
				document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            refreshGroup(){
				let that = this;
                var obj = {};
                // console.log(this.sendObj)
				if(that.quryForm.department_id.length==0){
					obj.all = -1;
				}else if(that.quryForm.department_id.length==1){
					obj.department_id = that.quryForm.department_id[0];
				}else{
					obj.all =1;
					obj.department_id = that.departmentID;
				}
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material',
					data: obj // 参数
				}).then(function(d) {
                    // 响应成功回调
                    var udata = d.data;
					if(udata.status == 1) {
						that.textData = udata.data.list.textData?udata.data.list.textData:[];
						that.imgData = udata.data.list.imgData?udata.data.list.imgData:[];
						that.linkData = udata.data.list.linkData?udata.data.list.linkData:[];
						that.cardData = udata.data.list.cardData?udata.data.list.cardData:[];
						that.programData = udata.data.list.programData?udata.data.list.programData:[];
                        that.text_imgData = udata.data.list.text_imgData?udata.data.list.text_imgData:[];
                        that.videoData = udata.data.list.videoData?udata.data.list.videoData:[];
                        that.fileData = udata.data.list.fileData?udata.data.list.fileData:[];
						for (let i=0;i<that.textData.length;i++) {
							that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
						}
                        for (let i=0;i<that.text_imgData.length;i++) {
                            that.text_imgData[i].content = emoji.stringToHtml(that.text_imgData[i].content);
                        }
                       
                    }else{
                        that.$message.warn(udata.msg)
                    }
                    
				});
			}
		},
		created() {
                this.refreshGroup();
                this.initData();    
        },
        destroyed(){
            this.sendObj = null;
        }
	}
</script>

<style lang="less" scoped>
// .input-content{
//     border-top:none;
// }
  .useMaterial {
       max-height:500px!important;
       overflow-y:auto!important;
        overflow-x:hidden;
   }
.fl{
    float:left;
}
.fr{
    float:right;
}
.tools{
    position:absolute;
    bottom:-30px;
    width:100%;
}
.clr:after{
    display: block;
    height:0;
    content:'';
    visibility: hidden;
    clear: both;
}
.material{
    margin-top:6px;
    max-height: 200px;
    padding-bottom:10px;
    // border:1px dashed rgb(13, 85, 167);
    border-radius:5px;
    // overflow: hidden;
}
.material .ant-card-cover img{
    width:200px
}
.input-content {
		// min-height: 100px;
		padding: 10px 0;
		height: auto;
		border-top: none;
		.tools {
			position: absolute;
			bottom: -14px;
			left: -10px;
			display: flex;
			>div {
				padding: 0  2px 0 10px;
				cursor: pointer;
				.anticon svg {
					font-size: 20px;
				}
				#emoji {
					position: absolute;
					top: -165px;
					width: 390px;
					height: 155px;
					left: 0;
					border: 1px solid #cccccc;
					padding: 5px;
					z-index: 10;
					line-height: 1;
					background: #ffffff;
					box-shadow: 0px 1px 10px 3px #ccc;
					&::after {
						margin-top: -1px;
						border: 7px solid transparent;
						border-top-color: #fff;
						content: "";
						position: absolute;
						left: 16px;
						top: 100%;
						margin-left: -5px;
					}
				}
            }
            .fr{
                text-align: right;
                width:200%;
            }
		}
		#edit .div-edit{
			border:1px solid #ccc;
		}
		.input-content-area {
			word-wrap: break-word;
			white-space: normal;
			#emoji {
				position: absolute;
				top: -160px;
				width: 390px;
				height: 155px;
				left: 0;
				border: 1px solid #cccccc;
				padding: 5px;
				z-index: 10;
				line-height: 1;
				background: #ffffff;
			}
		}
	}

</style>