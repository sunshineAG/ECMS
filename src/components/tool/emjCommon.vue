<template>
    <div id="test">
        <div class="input-content" style="position: relative">
            <div class="tools" style="z-index: 999999;position: absolute;right: 58px;top: 8px;">
                <div class="fl" >
                    <a-icon type="smile" @click="showEmoji()" id="showEmoji1" />
                    <div v-if="friendEmojiFlag&&showEmojiFlag" id="emoji1">
                        <a href="javascript:;" v-for="(item,index) in emojiList" v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
                    </div>
                </div>
            </div>
            <div class="input-content-area" >
                <div-edit-area :id="editAre" :class="[placeFlag?'con':'con-b']"    :formItem="sendObj" ref="inp_edit" @change='getSel()' :placeholder="placeholder" style="height:36px !important;width:70%;" @blur.native.capture='blurLive(sendObj,editAre)'>  </div-edit-area>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>
<script>
 import divEditArea from '../../components/dataManage/divEditArea';
 var emoji = require('../../common/emojiMap');
 var storage = require('../../common/store');
export default {
    props:['editAre','dataIndex','sendObj'],
    components:{
      divEditArea
    },
    data(){
        return{
            emojiList:emoji.emojiList,
            // sendObj:{
                
            // },
            showEmojiFlag:false,
            range:null,
            sel:null,
            placeholder:'回复',
            placeFlag:false
        }
    },
    mounted(){
        this.globalClick(this.$parent.closeEmoji,this.closeEmoji);
    },
    watch:{
      sendObj:'sendObj'
    },
    computed:{
        friendEmojiFlag () {
            return this.$store.state.liveChat.friendEmojiFlag
        }
    },
    methods:{
        showEmoji() {
            this.$emit('close',this.dataIndex)
            this.$store.commit('liveChat/setFriendEmojiFlag',!this.friendEmojiFlag)
        },
        closeEmoji() {
            this.$store.commit('liveChat/setFriendEmojiFlag',false)
        },
        blurLive(obj,areName){
           
                //失去焦点后触发父组件
                console.log(this.sendObj.text)
                this.placeFlag = false;
                let objParams={
                    areName:areName,
                    text:emoji.htmlToString(this.sendObj.text),
                    content:this.sendObj.content
                }
                this.$emit('prams',objParams);

                
            },
        emojiAdd(e) {
            document.getElementById(this.editAre).focus()
            let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='" + e.currentTarget.attributes.title_name.nodeValue + "'>"
            this.emojiAddInPosition(html)
            this.$refs.inp_edit.changeTxt()
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

        },
        getSel() {
            window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
            this.placeFlag = true;
        },
        getRange() {
            this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
          
        },
        setRange() {
            let x = document.getElementById(this.editAre)
            var e, t;
            document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
        },
        changePlaceholder(info) {
            if(info){
                this.placeholder = '回复' + info.nickname
            }else{
                this.placeholder = '回复'
                this.$refs.inp_edit.clearContent()
            }
        }
    },
    created(){
    }
}
</script>
<style scoped>
#test .input-content{
    height:36px !important;
    padding:0;
}
#test .input-content .tools > div #emoji1{
    position: absolute;
    top: -198px;
    width: 312px;
    height: 180px;
    left:-214px;
    border:none;
    padding: 5px;
    z-index: 10;
    line-height: 1;
    background: #ffffff;

}
#test .div-edit{
    min-height: 36px;
    overflow-y: auto;
    line-height: 1.4;
    padding: 6px;
    outline: none;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    border-radius: 5px;
}
.con{
    border: 1px solid #6fabfa !important ;
    outline: none;
}
.con-b{
    border: 1px solid #ccc !important;
    outline: none;
}
.con-b:before{ 
    content: attr(placeholder);
    color: gray; 
} 
.con-b:focus:before{
    content:none;
}
.con:empty:before{ 
    content: attr(placeholder);
    color: gray; 
} 
.con:focus:before{
    content:none;
}
</style>


