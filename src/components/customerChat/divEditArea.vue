<style scoped>
	.file-list {
		height: 60px;
		padding: 10px 10px 0;
		border: 1px solid #F7F7F7;
		overflow-y: auto;
	}
	.file-item {
		display: inline-block;
		position: relative;
		width: 150px;
		height: calc(100% - 10px);
		vertical-align: bottom;
		margin-right: 20px;
		margin-bottom: 10px;
	}
	.div-edit {
		height: 110px;
		overflow-y: auto;
		line-height: 1.4;
		padding: 10px;
		outline: none;
		word-break: break-word;
		word-wrap: break-word;
		white-space: pre-wrap;
        /*max-width: 870px;*/
		font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	.div-min-height {
		height: 50px;
	}
    .bord{
        cursor: pointer;
        border:1px solid rgb(232, 232, 233);
    }
	.img_modal {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.65);
		height: 100%;
		z-index: 1000;
	}
	.img_content {
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		-webkit-overflow-scrolling: touch;
		outline: 0;
	}
	.img_content img {
		z-index: 1001;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		max-width: 500px;
		width: 100%;
	}
	.img_content .ant-spin {
		z-index: 1002;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
<template>
	<div style="height: 110px;">
		<div class="file-list" v-if="fileList.length>0">
			<div v-for="(item,index) in fileList" class="file-item">
				<!--图片-->
				<img v-if="item.type=='image/jpeg'||item.type=='image/png'||item.type=='image/jpg'" :src="item.src" style="width: 100%;height: 100%;object-fit: cover;" @click="showModal(item)">
				<!--文件-->
				<div v-else style="width: 100%;height: 100%;padding: 3px 5px;border:1px solid #f0f0f0">
					<div style="width: 80%;word-break: break-all;color: #101010;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;font-size: 12px">{{item.name}}</div>
					<div style="position: relative;font-size: 12px">
						<span style="display:inline-block;font-size: 12px;color: #B3B2B2;">{{item.fileSize}}</span>
					</div>
					<div style="display: inline-block;background: #000F1C;position: absolute;top: 50%;right: 5px;transform: translateY(-50%);border-radius: 4px">
						<img src="../../assets/file-img1.png" alt="" style="width: 25px">
					</div>
				</div>
				<a-icon type="close-circle" @click="removeFile(index)" theme="filled" style="color: #EA4B24;position: absolute;top: 0;right: 0;transform: translate(50%,-50%);font-size: 18px;cursor: pointer"/>
			</div>
		</div>
		<pre :class="['div-edit',fileList.length>0?'div-min-height':'']" id="divEdit" ref="divEdit"  contenteditable="true" v-html="innerText" @dragover.prevent @input="changeTxt" @focus="changeLock(true)" @blur="changeLock(false)" @keydown="enterkey($event)" @paste="paste($event)" @click="clickEvent"
			 @compositionstart="compositionstart" @compositionend="compositionend" @drop="dropFile" @dragleave="leave" @dragenter="dragenter" @dragover="dragover"
		>
		</pre>
		<div v-if="modalShow" @click="modalShow=false" class="img_modal" style="">
			<div class="img_content">
				<img :src="modal_img" @mousewheel="bigimg($event)" ref="modalImg">
			</div>
		</div>
	</div>

</template>
<script>
    export default {
        name: 'divEdittArea',
        props: {
            formItem:{
                type:Object,
                default:{
                    text:""
                }
            },
            atStatus:{
                type:Boolean,
				default:false
			},
			fileList:{
                type:Array,
                default: () => []
			}
        },
        data () {
            return {
                innerText:'',
                lock:false,
				isAtSearch:true,//处理中文输入法，inputchange事件
				atSearchKey:'',  //搜索关键字
                isInputAt:false,  //输入@之后变为true，开始获取群成员信息
                isflag:false,
                modalShow:false,
                modal_img:'',
                srcImg:'',
                flag:false
            }
        },
        computed: {

        },
        mounted(){
        },
        watch: {
            formItem:{
                handler(newValue, oldValue) {
                    if(!this.lock) {
                        this.innerText = this.formItem.text;
                    };
                },
                deep:true,
                immediate: true
            }
        }
        ,created:function(){
        }
        ,methods:{
            removeFile(index) {
                this.$emit('remove',index)
			},
            dropFile(e){
                e.preventDefault();    //阻止拖放后的浏览器默认行为
                e.stopPropagation();
            },
            leave(e){
                e.preventDefault();  //阻止离开时的浏览器默认行为
                e.stopPropagation();
            },
            dragenter(e){
                e.preventDefault();  //阻止拖入时的浏览器默认行为
                e.stopPropagation();
                this.isflag = !this.isflag
                this.$emit('isflag',this.isflag)
            },
            dragover(e){
                e.preventDefault();    //阻止拖来拖去的浏览器默认行为
                e.stopPropagation();
                this.isflag = !this.isflag
                this.$emit('isflag',this.isflag)
            },
            changeLock(bool) {
                this.lock = bool
                this.$emit('change',bool)
                let that = this;
                
            },
            keyUp(e){
                // @keydown='keyUp($event)'
            },
            changeTxt:function(e){
                this.$parent.getSel()
                var re = /&amp;/g;
                this.formItem.text = this.$refs.divEdit.innerHTML.replace(re,"&");
               
                    
                if(!e) {
                    this.atSearchKey = ''
                    this.isInputAt = false
				}
                if(!!e&&e.data=='@') {
                    this.inputAt()
					this.atSearchKey = ''
					this.isInputAt = true
				}
				if(!!e&&e.inputType=='deleteContentBackward'&&this.isInputAt&&this.atSearchKey!= '') {
                    this.atSearchKey = this.atSearchKey.substring(0,this.atSearchKey.length-1)
				}
				if(this.atStatus&&this.isAtSearch) {
                    if(this.isInputAt&&!!e.data){
                        this.atSearchKey +=e.data
					}

				    if(this.$refs.divEdit.innerHTML.indexOf('@')=='-1') {
                        this.$emit('atuser',{key:'',left:0,top:0,type:3})
				        return
					}
                    let range = window.getSelection().getRangeAt(0).getClientRects()[0];
                    !!range&&this.$emit('atuser',{key:this.atSearchKey,left:range.left,top:range.top,type:2})
				}
            },
			addText:function (item) {
                this.$parent.getSel()
                this.$refs.divEdit.innerHTML = this.$refs.divEdit.innerHTML+ '@' + item.nickname+' '
                this.formItem.text=this.$refs.divEdit.innerHTML;

            },
            compositionstart(){
                this.isAtSearch = false
			},
            compositionend(e) {
                this.isAtSearch = true
                if(this.isInputAt&&!!e.data){
                    this.atSearchKey +=e.data
                }
                if(this.atStatus) {
                    let range = window.getSelection().getRangeAt(0).getClientRects()[0];
                    !!range&&this.$emit('atuser',{key:this.atSearchKey,left:range.left,top:range.top,type:2})
                }
			},
            clickEvent:function (e) {
                this.$parent.getSel()
                this.atSearchKey = ''
                this.isInputAt = false
            },
            clearContent() {
                this.$refs.divEdit.innerHTML = ''
            },
            inputAt:function() {
                let range = window.getSelection().getRangeAt(0).getClientRects()[0];
                !!range&&this.$emit('atuser',{key:'',left:range.left,top:range.top,type:1})
            },
            enterkey(eveny) {
                let e = event.keyCode;
                if(e==13&&!this.atStatus) {
                    event.returnValue = false;  // 取消此事件的默认操作
                    this.$emit('atuser',{key:'',left:0,top:0,type:3})
                    if (event.shiftKey) {
//                    shift+回车事件
                        let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                        if(document.selection && document.selection.createRange){
                            let myRange = document.selection.createRange();
                            myRange.pasteHTML('<br />');
                        }else if(window.getSelection){
                            let selection = window.getSelection();
                            let range = window.getSelection().getRangeAt(0);
                            range.deleteContents();
                            let newP = document.createElement('br');
                            range.insertNode(newP);
                            range = range.cloneRange();
                            range.setStartAfter(newP);//重新定位range（光标位置）
                            range.collapse(true);
                            selection.removeAllRanges();//清除所有选中
                            selection.addRange(range);//将新定位的range加入
                        }
                        this.changeTxt()
                    } else {
//                        回车事件，发送消息
                        this.$parent.sendMsg()
                    }
                }else if(eveny.ctrlKey && e===86){
                    let that = this
                    // this.$refs.divEdit.addEventListener('paste',function(e){
                    //     console.log(e)
                    //     that.fileList.push({src:e.target.textContent,type:'image/jpg'})

                    //  })
                }
                if(this.atStatus){
					if(e==38||e==40||e==13) {
                        event.returnValue = false;  // 取消此事件的默认操作
						this.$emit('keyevent',e)
					}
				}
			}
            ,paste(e) {
                let _this = this;
                e.preventDefault();
                let text;
                let clp = (e.originalEvent || e).clipboardData;
                console.log(clp)
				if (clp === undefined || clp === null) {
                	text = window.clipboardData.getData("text") || "";
                    console.log(text)
                    if (text !== "") {
                        if (window.getSelection) {
                            var newNode = document.createElement("span");
                            newNode.innerHTML = text;
                            window.getSelection().getRangeAt(0).insertNode(newNode);
                        } else {
                            document.selection.createRange().pasteHTML(text);
                        }
                    }
                } else {
                    if(clp.types[0]=='Files') {
                        for(let i =0;i<clp.items.length;i++) {
                            let item = clp.items[i]
                            let blob = item.getAsFile();
                            if (blob.size === 0) {
                                return;
                            }
                            let reader = new FileReader();
                            let imgs = new Image();
                            imgs.file = blob;
                            reader.onload = (function(aImg) {
                                return function(e) {
                                    _this.$parent.pasteImg(e.target.result)
                                };
                            })(imgs)
                            reader.readAsDataURL(blob)
                        }
                    } else {
                        text = clp.getData('text/plain') || "";
                        if (text !== "") {
                            let reg = /^data:image\/\w+;base64,/
                            if(reg.test(text)) {
                                this.$parent.pasteImg(text)
                                return
                            }
//                        将换行符转化为br标签，避免被转换为标签
                            text = text.replace(/(\r\n)|(\n)/g,'<br>')
                            document.execCommand('insertHTML', false, text);
                        }
                    }
                }
            },
            showModal(item) {
                this.modal_img = item.src
                this.modalShow = true
            },
            bigimg(event) {
                let zoom = parseInt(this.$refs.modalImg.style.zoom,10)||100;
                zoom += event.wheelDelta / 6;
                if(zoom > 0 ) {
                    this.$refs.modalImg.style.zoom=zoom+'%';
                }
            },
        },
        destroyed(){
        }
    }
</script>
