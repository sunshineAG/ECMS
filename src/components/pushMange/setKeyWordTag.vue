<template>
    <div class="background-color">
        <div class="title" >{{parameter === 'add'?'创建关键词标签':'编辑关键词标签' }} / 设置</div>
        <div class="mainContent">
            <a-form>
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label='关键词' :validateStatus='rexFlg?"":keyWord?"success":"error"' :help='rexFlg?"":keyWord?"":"请输入关键词名称"'>
                    <a-input placeholder="请输入关键词" v-model="keyWord" maxlength="10"></a-input>
                </a-form-item>
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label='标签' >
                  <span class="choseTag" @click="addTag">选择标签</span>
                </a-form-item>
            </a-form>
            <div class="showTag">
                <a-tag v-for="(item,index) in choseTagList" :key="index" :closable="true" @close="dele_tag(item)" :class="['tag-color' + item.color_id,'aTag']">{{item.title}}</a-tag>
            </div>
            <p class="bottomBtn">
                <a-button  @click="back">取消</a-button>
                <a-button type="primary" @click='save'>保存</a-button>
            </p>
        </div>
        <a-modal title="选择标签"  :visible="visible" @cancel="visible=false" @ok="choseTag" width="40%" >
            <div>
                <a-checkable-tag  v-for = '(item,index) in tagList' :key="index" :checked="item.check"  :class="['tag-color' + item.color_id,'aTag']"  @change ="(checked) => choseList(item,index,checked)">{{item.title}}</a-checkable-tag>
            </div>
        </a-modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            department_id:'',
            visible:false,
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
            labelCol:{
                xs: { span: 24 },
                sm: { span: 3 },
			},
            keyWord:'',
            rexFlg:true,
            parameter:'3',
            tagList:[],
            choseTagList:[]
        }
    },
    mounted () {
        this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
    updated () {
        this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
    methods:{
        addTag(){
            this.visible = true;
        },
        getTag(){
            let That = this;
            this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/customer-label',
					data: {department_id:this.department_id} // 参数
				}).then(function(d) {
                    let udata = d.data;
                    if(udata.status ===1){
                        That.tagList = udata.data
                        That.tagList.forEach(el=>{
                            el.check = false;
                        })
                        That.refresh();
                    }else{
                        That.$message.warn(udata.msg)
                    }
                })
        },
        refresh(){
            let that = this;
            if(this.parameter!='add'){
                this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/get-keyword-label',
					data: {id:this.parameter} // 参数
				}).then(function(d) {
                    let udata = d.data;
                    if(udata.status ===1){
                       that.keyWord = udata.data.keyword;
                    //    that.choseTagList = udata.data.label_id
                        that.tagList.forEach(el=>{
                          if(el.id === udata.data.label_id){
                              el.check = true;
                              that.choseTagList.push(el)
                              console.log(el)
                          }  
                        })
                    }else{
                        that.$message.warn(udata.msg)
                    }
                })
            }
        },
        choseTag(){
            this.visible = false;
        },
        choseList(item,index,checked){
            this.tagList.forEach(el=>{
                el.check = false;
            })
            item.check = checked
            this.$set(this.tagList,index,item)
            this.choseTagList[0] = item;
        },
        com_handleCancel(){
            this.visible = false;
        },
        back(){
            this.$router.push({path: '/pushMange/keyWordTag'})
        },
        save(){
            let That = this;
            if(!this.keyWord){
                this.rexFlg = false;
                return false
            }
            if(!this.choseTagList.length){
                this.$message.success("请选择标签")
                return false
            }
            let data = {
                    type: this.parameter==='add'?'':'edit',
                    id:this.parameter==='add'?'':this.parameter,
                    keyword:this.keyWord,
                    label_id:this.choseTagList[0].id,
                    department_id:this.department_id,
                    status:0
            }

            this.$axios({
                method: 'POST',
                url: this.parameter==='add'?'/index.php?r=uc/material/add-keyword-label':'/index.php?r=uc/material/update-keyword-label',
                data: data // 参数
            }).then(function(d) {
                let udata = d.data;
                if(udata.status === 1){
                 console.log(udata) //成功
                 That.$router.push({path:'/pushMange/keyWordTag'})
                }else{
                        That.$message.warn(udata.msg)
                    }
            })
            
        },
        dele_tag(item){
            this.choseTagList = [];
            this.tagList.forEach(el=>{
                el.check = false;
            })
        }
    },
    created(){
        this.parameter = this.$route.query.parameter;
        this.department_id = this.$route.query.department_id;
        this.getTag();
    }
}
</script>
<style scoped lang="less">
    .background-color {
        background: #fff;
        height: calc(~'100vh - 40px');
        padding-bottom:60px;
        overflow-y: auto;
    }
    .title{
        padding:16px;
        font-size:16px;
        border-bottom:1px dashed #ccc;
    }
    .mainContent{
        padding-top:70px;
        width:600px;
        margin:0 auto;
    }
    .bottomBtn{
        width:75%;
        margin:50px auto;
        text-align:right;
    }
    .showTag{
        width:90%;
        padding-left:74px;
    }
    .aTag{
        margin-bottom:10px;
    }
    .choseTag{
        cursor: pointer;
        color:lightblue;
    }
</style>
