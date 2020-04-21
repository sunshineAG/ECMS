<template>
    <div>
        <div class="header">
            <a-form  layout="inline" :form="form"  class="headerForm">
                <a-row>
                    <a-col :span="18">
                        <div class="fl">
                            <a-form-item>
                                <a-input-search placeholder="请输入关键词标签名称" style="width: 220px;"  v-model="queryParam.key" @search="onSearch" enterButton/>
                            </a-form-item>
                            <a-form-item label="选择部门">
                                <a-tree-select
                                        :treeData="departmentList"
                                        :treeDefaultExpandAll="true"
                                        v-model="queryParam.department_id"
                                        @select="onSelect"
                                        style="min-width: 200px"
                                >
                                </a-tree-select>
                            </a-form-item>
                        </div>
                    </a-col>
                    <a-col :span="6" style="height: 39px;line-height: 39px;text-align: left">
                        <div class="fr">
                            <a-button type="primary" @click="setkeyWord('add')">新建</a-button >
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div v-if="taskListFlg" style="text-align: center;padding:50px 0 ;width: 100%;background: #fff;margin-top:10px;">
			<img src="../../assets/add.png" alt="" style="width: 100px;height: 100px;margin-bottom: 20px;cursor: pointer" @click="setkeyWord('add')">
			<p style="font-size: 24px">未创建关键词标签</p>
			<div style="background: #eaeaea;text-align: left;margin: 50px 10%;padding: 15px">
				<div style="font-weight: 700;margin-bottom: 10px">关键词标签功能介绍</div>
				<div style="color: rgb(102,102,102)">
					1、设置关键词自动打标签 ，可以通过添加关键词，选择绑定的标签，当好友发送的消息是您设置的关键字<br/>
					2、触发关键词打标签，需要消息内容与关键词必须一致
				</div>
			</div>
		</div>
        <div v-else class="mianContent">
            <div class="mainWrap">
            <div class="contentList" v-for="(item, index) in taskList" :key="index" >
                <a-row>
                    <a-col span="18">
                        <div>
                            <div class="lineStyle">
                                <a-icon type="bars" style="color:#5AA9CD;font-weight: 800;" theme='outlined' ></a-icon>
                                <b>关键词: </b>
                                <b style="color:#5AA9CD;width:160px;display:inline-block;margin:0 4px 0 30px;">{{item.keyword}}</b>
                            </div>
                            <div class="lineStyle">
                                <span 
                                style="display:inline-block;"
                                class="fl"
                                >标签信息: </span>
                                <div class="fl">
                                    <a-tag style="margin-left:10px;" :class="['tag-color' + item.label_color_id]"> 
                                       {{item.label_name}}
                                    </a-tag>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col span="4">
                        <div class=" status">
                                <p >状态：<span :style="{'color':item.status==1?'#5AA9CD':''}">{{item.status==='1'?'已启用':'未启用'}}</span></p>
                                <p>
                                    <a-button type="primary" size="small" @click="useTag(item)" :style="{'background':item.status==1?'#8e8e8e':'','border-color':item.status==1?'#8e8e8e':''}">{{item.status=='1'?'停用':'启用'}}</a-button>
                                </p>

                        </div>
                    </a-col>
                    <a-col span="2">
                        <div class="lineStyle fr btnStyle"  style="height: auto">
                            <a-button type="primary" @click="setkeyWord(item.id)">
                                编辑
                            </a-button>
                            <a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)"   okText="确定" cancelText="取消">
                                <a-button type="primary" > 删除 </a-button>
                            </a-popconfirm>
                        </div>
                        
                    </a-col>
                </a-row>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { powerObject } from '@/common/util'
export default {
    data(){
        return{
            form: this.$form.createForm(this),
            tagFlag:false,
            taskListFlg:false,
            taskList:[],
            managerList:[],
            departmentList: [],
            queryParam: {
                key: "",
                department_id: "",
            },
        }
    },
    mounted () {
        this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
    updated () {
        this.$store.dispatch('setting/getBreadcrumb',this.$route)
    },
    methods:{
        onSearch(){
            this.refresh();
        },
        useTag(item){
            item.status==='0'?item.status = '1':item.status = '0'
            this.$set(this.taskList,item)
            let data = {
                type:'start',
                id:item.id,
                status:item.status
            }
            this.$axios({
                method:'POST',
                url:'/index.php?r=uc/material/update-keyword-label',
                data:data
            }).then(function(data){
                let udata= data.data;
                if(udata.satus===1){
                    console.log(udata)
                }else{
                        this.$message.warn(udata.msg)
                    }
            })
        },
        setkeyWord(val){
            this.$router.push({path: '/pushMange/setKeyWordTag',query:{parameter:val,department_id:this.queryParam.department_id }});
        },
        deleteFn(id){
             let That = this;
             this.$axios({
                method: 'POST',
                url: '/index.php?r=uc/material/delete-keyword-label',
                data:{id:id}// 参数
            }).then(function(d) {
                let udata = d.data;
                if(udata.status === 1){
                  //成功
                  That.refresh();
                }else{
                        That.$message.warn(udata.msg)
                    }
            })
        },
        refresh(){
            let data = {
                search:  this.queryParam.key,
                department_id:this.queryParam.department_id,
                all:'1'
            }
            let That = this;
            this.$axios({
                method: 'POST',
                url: '/index.php?r=uc/material/keyword-label-list',
                data: data // 参数
            }).then(function(d) {
                let udata = d.data;
                if(udata.status === 1){
                    That.taskList = udata.data;
                    if(!That.taskList.length){
                        That.taskListFlg = true;
                    }else{
                        That.taskListFlg = false;
                    }
                }else{
                        That.$message.warn(udata.msg)
                    }
            })
        },
        treeList(){
            this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
            this.queryParam.department_id  = this.$store.state.user.user.department.id || this.departmentList[0].key
            this.getUserList()
        },
        listToTree(list,val) {
//              将部门列表转换为tree所用数据
            let array = []
            list.forEach((el,idx)=>{
                if(el.children && el.children.length > 0) {
                    el.children =this.listToTree(el.children,idx)
                }
                array.push({title:el.name,key:el.id,value:el.id,children:el.children})
            })
            return array
        },
        onSelect(selectedKeys, info) {
            this.queryParam.department_id = selectedKeys
            this.getUserList(selectedKeys)
        },
        getUserList(){
            this.$axios({
                method: 'post',
                url: '/index.php?r=uc/organization/user',
                data:{department_id:this.queryParam.department_id,type:1}
            }).then(d=> {
                // 响应成功回调
                let udata = d.data;
                if (udata.status == 1) {
                    this.managerList = udata.data.userList
                    this.managerList.unshift({id: '0', user_name: '全部'});
                    this.refresh()
                }
            })
        },
    },
    created() {
        this.treeList()
    }
}
</script>
<style>
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .clr:after{
        display:block;
        height:'';
        content:'';
        visibility: hidden;
        clear:both;
    }
.setIcon{
    cursor: pointer;
    color:#fff;
    background:#5AA9CD;
    padding:1px;
}
</style>
<style scoped lang="less">
	.header {
        .headerForm{
            padding: 16px;
            background: #fff;
            height: 72px;
        }
    }
    .tag-modal {
        .ant-tag:hover {
            background: #5AA9CD;
            color: #ffffff;
        }
        .ant-tag-checkable{
            border: 1px solid #d9d9d9;
            background: #fafafa;
        }
        .ant-tag-checkable-checked {
            background: #5AA9CD;
        }
    }
    .mainWrap{
        height: calc(~"100vh - 170px");
        overflow-y: auto;
        width:100%;

        }
    .setTitle{
        border-left:4px solid rgb(0, 132, 255);
        padding-left:4px;
    }
    .setImgHead{
        width:38px;
        height:38px;
        border:0;
        margin-bottom:2px;
    }
    .setIcon{
        cursor: pointer;
        color:#fff;
        background:#5AA9CD;
        padding:1px;
    }
    .setBody{
        cursor: pointer;
    }
    .bodText:hover{
        background:rgb(0, 132, 255);
        color:#fff;
    }
    .activeSet{
    background:rgb(0, 132, 255);
     color:#fff!important;
     border-radius: 5px ;
     cursor: pointer;
     height:40px;line-height: 40px;
     margin-right:10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
.bodText{
    cursor: pointer;
    border-radius:5px;
    height:40px;line-height: 40px;
    text-align:left;
    margin-right:10px;
    color:#222;
    background:#fff;
    box-shadow: 0 0 2px rgba(0, 110, 255,.12);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
    .bag{
        width:200px;
        margin-bottom:10px;
        margin-right:20px;
        height:40px;
        line-height:40px;
        box-shadow: 0 0 6px rgba(0, 110, 255,.12);
        border-radius:5px;
    }
    .contImg{
        border-radius:5px 0 0 5px;
        border-right:1px solid rgb(212, 212, 212);
        width:40px;
        height:40px;
        // margin:0 10px 0 0;
    }
    .setContent{
        margin-top:10px;
        background:rgb(240, 240, 240);
        border-radius:10px;
        padding:20px;
        max-height:200px;
        overflow: auto;
    }



    .contentList{

        margin-top:10px;
        padding:10px 10px ;
        background:#fff;
        // overflow-y: auto;
    }
    .infomation{
        margin-right:10px;
    }
    .robot {
        display: inline-block;
    }

    .lineStyle {
        height: 40px;
        line-height: 40px;
    }
    .other {
        padding-left: 10px;
    }
    .robotText{
        margin-right: 10px;
    }
    .robotText:nth-child(1){
        margin-left:10px;
    }
    .btnStyle {
        padding-top: 4px;
        button {
            display: block;
        }
        button:nth-child(1) {
            margin-bottom: 10px;
        }
    }
    .status{
       padding:8px 20px;
       border-left:1px solid #e2e2e2;
       p{
            text-overflow: ellipsis;
            word-break: normal;
            white-space: nowrap; 
            overflow: hidden;
            margin:0;
           &:nth-child(2){
               margin-top:20px;
           }
       }
    }
</style>

