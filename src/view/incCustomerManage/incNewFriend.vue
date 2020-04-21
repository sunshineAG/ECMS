<style lang="less" scoped>
    .setting {
        color: #5AA9CD;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 37%;
        transform: translateY(-50%);
    }
</style>
<style lang="less">
    .inc-friend{
        .ant-tabs-bar{
            border-bottom: 1px solid #d9d9d9;
        }
    }
</style>
<template>
    <div class="companyStyle">
        <div class="company-header commonPosition inc-friend">
            <a-tabs  :locale="locale">
                <a-tab-pane tab="新的客户" key="1"></a-tab-pane>
            </a-tabs>
            <div class="setting" @click="com_handleOk(true)">
                <a-icon type="setting" theme="filled"   />
                <span style="padding-left: 5px">设置</span>
            </div>
        </div>
        <div class="company-content">
            <div >
                <a-table :columns="columns_friend" :dataSource="newFriendList" :pagination="false" :locale="locale">
                    <template slot="avatar" slot-scope="text, record, index">
                        <div>
                            <a-avatar :src="text" :size="30" style="border-radius:100%"/>
                            <span>{{record.friend_name}}</span>
                        </div>
                    </template>
                    <template slot="friend_avatar" slot-scope="text, record, index">
                        <div>
                            <a-avatar :src="text" :size="30" style="border-radius:100%"/>
                            <span>{{record.corp_name}}</span>
                        </div>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <div>
                            <a href="javascript:void(0);" @click="agree(record)" style="padding-right: 20px;">同意</a>
                            <a href="javascript:void(0);" @click="ignore(record.id)">忽略</a>
                        </div>
                    </template>
                </a-table>
                <br>
                <!-- <data-status :width="200" :hieght="330" class="stausPage" v-if="!newFriendList.length"></data-status> -->
                <!-- <a-pagination v-if="newFriendList.length" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onFriendChange" @showSizeChange="onFriendSizeChange" style="text-align: right"/> -->
                <br>
            </div>
        </div>
        <a-modal title="设置" :footer="null" :visible="visible" @cancel="visible=false" width="600px">
            <a-form  >
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="自动通过：">
                    <a-switch v-model="paramsObj.add_switch" checkedChildren="开" unCheckedChildren="关"/>
                </a-form-item>
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="通过间隔：">
                    <a-input-number :min="5" v-model="paramsObj.add_durning" /> 秒
                </a-form-item>
                <!--<a-form-item>-->
                    <!--<p style="color:#FE6354;margin:0;margin-bottom:12px;height:14px">注意：1.手机端微信需关闭自动通过</p>-->
                    <!--<p style="color:#FE6354;margin:0;margin-bottom:12px;height:14px;padding-left: 36px;">2.登录PC端微信,部分手机端将无法收到好友请求通知</p>-->
                    <!--<p style="color:#FE6354;margin:0;height:14px;    padding-left: 36px;">3.通过间隔不要过短，避免操作过于频发无法自动通过</p>-->
                <!--</a-form-item>-->
                <a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="border-top: 1px solid #efefef;margin-bottom:0;margin-top:44px;">
                    <div style="margin-top:10px;">
                        <a-button @click="visible=false">取消</a-button>
                        <a-button type='primary' @click="com_handleOk(false)" style="margin-left: 10px;">确定</a-button>
                    </div>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    import dataStatus from '../../components/pageConfig/dataStatus'
    var comConf = require('../../common/comConfig');
    import { powerObject } from '@/common/util'
    export default {
        name: "",
        components:{
            dataStatus
        }
        ,data(){
            return{
                newFriendList:[],
                 wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
                },
                labelCol:{
                    xs: { span: 24 },
                    sm: { span: 3 },
                },
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                columns_friend:[
                    {
                        title: '头像',
                        dataIndex: 'avatar',
                        align:'left',
                        scopedSlots: {
                            customRender: 'avatar'
                        }
                    },
                    {
                        title: '请求信息',
                        align:'left',
                        dataIndex: 'apply_content'
                    },
                    {
                        title: '请求时间',
                        align:'left',
                        dataIndex: 'createtime',
                        customRender:text =>{
                            return  comConf.format(text)
                        }
                    },
                    {
                        title: '所属企业',
                        align:'left',
                        dataIndex: 'friend_avatar',
                        scopedSlots: {
                            customRender: 'friend_avatar'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                page:1,
                page_size:10,
                total:0,
                visible:false,
                paramsObj:{
                    add_durning:60
                }
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            onFriendChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getCustomer()
            },
            onFriendSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getNewFriend()
            },
            getNewFriend() {
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/getexternalrequest?',
                    data:{p:this.page,n:this.page_size,ecms_userid: this.$store.state.user.user.user_id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.newFriendList = udata.data.list
                        this.total = parseInt(udata.data.total)
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            agree(item) {
                if(item.flag) {
                    this.$message.success('已发送添加指令，请等待或刷新页面')
                    return
                }
                item.flag =true
                let _this = this
                let data = {
                    cmd:2508,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.remoteId,
                    cmdData:{
                        remoteId:item.friend_remoteId
                    },
                    priority:0
                }
                comConf.isOfflineRobot(item.assistant_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$message.success('同意好友请求已发送')
                this.$ws.cmd2058 = msg=> {
                    if(msg.status==2&&msg.callbackMsg=='同意好友成功') {
                        this.$message.success(msg.callbackMsg)
                        _this.getNewFriend()
                    }else if(msg.status==4) {
                        this.$notification.warning({
                            message: h=>{
                                return h('div', {
                                    domProps: {
                                        innerHTML:msg.callbackMsg
                                    },
                                })
                            },
                            description: '暂无法执行操作，请检查手机连接状态',
                            duration: 2,
                            style:{
                                background:'#fbf8e9'
                            }
                        });
                    }else {
                        this.$message.info(msg.callbackMsg)
                    }
                }
            },
            ignore(id) {
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/editrequest?',
                    data:{id:id,status:2}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.getNewFriend()
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            },
            com_handleOk(bool) {
                let params;
                if(bool){
                    params = {
                        ecms_userid:this.$store.state.user.user.user_id,
                        action:'get'
                    }
                }else{
                    let data = JSON.parse(JSON.stringify(this.paramsObj))
                    data.add_switch = data.add_switch?'1':'0'    
                    params = Object.assign(data,{ecms_userid:this.$store.state.user.user.user_id,action:'save'});
                }
                this.$axios({
                    method: 'POST',
                    url: '/qiyewxapi/externalsetting?',
                    data:params
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(bool){
                            this.visible = true
                            this.paramsObj={
                                    add_switch:udata.data.add_switch=='1'?true:false,
                                    add_durning:udata.data.add_durning?udata.data.add_durning:60
                                }
                        }else{
                            this.$message.success('设置成功')
                            this.visible = false
                        }
                    }else{
                        this.$message.warn(udata.msg)
                    }
                });
            }
        },
        created(){
            this.getNewFriend()
        },
        beforeDestroy() {
            this.$ws.cmd2026 = null
            //window.removeEventListener('resize')
        }
    }
</script>
