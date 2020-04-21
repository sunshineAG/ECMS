<style scoped>
	.div-edit {
		 /*height: 100px;*/
		min-height: 100px;
		/*border:1px solid #c2c2c2;*/
		overflow-y: auto;
		line-height: 1.4;
		padding: 10px;
		outline: none;
		word-break: break-all;
		word-wrap: break-word;
		white-space: pre-wrap;
		border: 1px solid #6fabfa;
		border-radius: 5px;
        /*max-width: 870px;*/
		font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
</style>
<template>
	<pre class="div-edit" id="divEdit" contenteditable="true" v-html="innerText" @input="changeTxt" @focus="lock=true" @blur="lock=false" @keydown="enterkey($event)" @paste="paste($event)" @click="clickEvent">

	</pre>
</template>
<script>
    var emoji = require('../../common/emojiMap');
    export default {
        name: 'divEdittArea',
        props: {
            formItem:{
                type:Object,
                default:{
                    text:""
                }
            }
        },
        data () {
            return {
                innerText:'',
                lock:false
            }
        },
        computed: {

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
            changeTxt:function(e){
//				限制500字
				if(emoji.htmlToString(this.$el.innerHTML).length>500) {
                    this.$el.innerHTML = this.$el.innerHTML.substring(0,500)
                    if (window.getSelection) {//ie11 10 9 ff safari
                        let obj = document.getElementsByClassName('div-edit')[0]; //解决ff不获取焦点无法定位问题
                        obj.focus()
                        let range = window.getSelection();//创建range
                        range.selectAllChildren(obj);//range 选择obj下所有子内容
                        range.collapseToEnd();//光标移至最后
                    }
                    else if (document.selection && document.selection.createRange) {//ie10 9 8 7 6 5
                        let obj = document.getElementsByClassName('div-edit')[0]; //解决ff不获取焦点无法定位问题
                        let range = document.selection.createRange();//创建选择对象
                        range.moveToElementText(obj);//range定位到obj
                        range.collapse(false);//光标移至最后
                        range.select();
                    }
					return
				}
//              this.$parent.getSel()
                this.$emit('change')
                this.formItem.text=this.$el.innerHTML;
            },
            clickEvent:function (e) {
            	this.$emit('change')
//              this.$parent.getSel()
            },
            clearContent() {
                this.$el.innerHTML = ''
            },
            enterkey:function(event) {
                let e = event.keyCode;  
				if(e==13) {
                    event.returnValue = false;  // 取消此事件的默认操作
                    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                    if(document.selection && document.selection.createRange){
                        let myRange = document.selection.createRange();
                        myRange.pasteHTML('<br />');
                    }else if(window.getSelection){
                        let selection = window.getSelection();//返回光标当前位置
                        let range = window.getSelection().getRangeAt(0);
                        range.deleteContents();
                        let newP = document.createElement('br');
                        range.insertNode(newP);
                        range = range.cloneRange();
                        range.setStartAfter(newP)//重新定位range（光标位置）
                        range.collapse(true);
                        selection.removeAllRanges();//清除所有选中
                        selection.addRange(range);//将新定位的range加入
                    }
                    this.changeTxt()
				}
            }
            ,paste(e) {
                let _this = this;
                e.preventDefault();
                let text;
                let clp = (e.originalEvent || e).clipboardData;
                if (clp === undefined || clp === null) {
                    text = window.clipboardData.getData("text") || "";
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
                    text = clp.getData('text/plain') || "";
                    if (text !== "") {
//                  将换行符转化为br标签，避免被转换为标签
                        text = text.replace(/(\r\n)|(\n)/g,'<br>')
                        document.execCommand('insertHTML', false, text);
                    }
				}
            }
        }
    }
</script>
