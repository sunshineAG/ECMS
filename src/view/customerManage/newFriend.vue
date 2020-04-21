<style lang="less" scoped>
    .new_friend {
        height: calc(~"100vh - 90px");
        overflow: auto;
        background: #ffffff;
        padding: 25px;
    }
    .tabs {
        position: relative;
        .setting {
            color: #5AA9CD;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 37%;
            transform: translateY(-50%);
        }
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:200px;
        z-index:999;
        transform: translate(-50%,0);
    }
    .contact-info{
        position:relative;
    }
</style>
<style>
    .new_friend .ant-table-thead > tr > th,.new_friend .ant-table-tbody > tr > td {
        padding: 10px;
    }
</style>
<template>
    <div class="new_friend">
        <div class="tabs">
            <a-tabs :defaultActiveKey="selectTab" @change="tabChange" :locale="locale">
                <a-tab-pane tab="新的客户" key="1"></a-tab-pane>
                <!--<a-tab-pane tab="操作记录" key="2"></a-tab-pane>-->
            </a-tabs>
            <div class="setting" @click="setting()">
                <a-icon type="setting" theme="filled" />
                <span style="padding-left: 5px">设置</span>
            </div>
        </div>
        <div >
            <div v-if="selectTab==1" class="contact-info">
                <a-table :columns="columns_friend" :dataSource="newFriendList" :pagination="false" :locale="locale">
                    <template slot="avatar_url" slot-scope="text, record, index">
                        <div>
                            <a-avatar :src="text" :size="48" style="border-radius: 5px"/>
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
                <a-pagination v-if="newFriendList.length" showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onFriendChange" @showSizeChange="onFriendSizeChange" style="text-align: right"/>
                <br>
            </div>
            <div v-if="selectTab==2" class="contact-info">
                这是操作记录页面
            </div>
        </div>
        <a-modal title="设置" :footer="null" :visible="visible" @cancel="visible=false" width="600px">
            <a-form @submit="com_handleOk" >
                <a-form-item :wrapperCol="{span: 24}" label="自动通过：">
                    <a-switch v-model="paramsObj.auto_pass" checkedChildren="开" unCheckedChildren="关"/>
                </a-form-item>
                <a-form-item :wrapperCol="{span: 24}" label="时间间隔：">
                    <a-input-number :min="5" v-model="paramsObj.auto_pass_time" /> 秒
                </a-form-item>
                <a-form-item>
                    <p style="color:orangered">注意：1.手机端微信需关闭自动通过 2.登录PC端微信,手机端将无法收到好友请求通知</p>
                </a-form-item>
                <a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
                    <a-button @click="visible=false">取消</a-button>
                    <a-button type='primary' @click="com_handleOk" style="margin-left: 10px;">确定</a-button>
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
                selectTab:'1',
                newFriendList:[],
                locale:{
                    filterConfirm:'',
                    filterReset:'',
                    emptyText:''
                },
                columns_friend:[
                    {
                        title: '编号',
                        align:'center',
                        dataIndex: 'id'
                    },
                    {
                        title: '头像',
                        dataIndex: 'avatar_url',
                        align:'center',
                        scopedSlots: {
                            customRender: 'avatar_url'
                        }
                    },
                    {
                        title: '昵称',
                        align:'center',
                        dataIndex: 'nickname'
                    },
                    {
                        title: '所属机器人',
                        align:'center',
                        dataIndex: 'assistant_name'
                    },
                    {
                        title: '招呼消息',
                        align:'center',
                        dataIndex: 'hello_msg'
                    },
                    {
                        title: '性别',
                        align:'center',
                        dataIndex: 'sex',
                        customRender:function (text, record, index) {
                            return text==10?'男':text==10?'女':'未知'
                        }
                    },
                    {
                        title: '请求来源',
                        align:'center',
                        dataIndex: 'friend_from'
                    },
                    {
                        title: '请求时间',
                        align:'center',
                        dataIndex: 'created'
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
                    auto_pass_time:60
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
            tabChange(key) {
                this.selectTab = key
                switch (this.selectTab) {
                    case '1':
                        this.getNewFriend()
                        break
                    case '2':
                        this.getActionHistory()
                        break
                }
            },
            onFriendChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getNewFriend()
            },
            onFriendSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getNewFriend()
            },
            getNewFriend() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/new-friend',
                    params:{p:this.page,n:this.page_size,department_id:this.$store.state.user.user.department.id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.newFriendList = udata.data.list
                        this.total = parseInt(udata.data.count)
                    }
                });
            },
            getActionHistory(){
                console.log('获取操作记录')
            },
            agree(item) {
                if(item.flag) {
                    this.$message.success('已发送添加指令，请等待或刷新页面')
                    return
                }
                item.flag =true
                let _this = this
                let data = {
                    cmd:2026,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.assistant_username,
                    cmdData:{
                        username:item.username,
                        ticket:item.ticket
                    },
                    priority:0
                }
                comConf.isOfflineRobot(item.assistant_username,this.$store.state.user.offlineRobot)&&this.$store.commit('user/setRobotStatus','2')
                this.$ws.sendMsgFun(data)
                this.$message.success('同意好友请求已发送')
                this.$ws.cmd2026 = msg=> {
                    if(msg.status==2) {
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
                    }
                }
            },
            ignore(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/agree',
                    data:{friend_id:id,type:20}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.getNewFriend()
                    }
                });
            },
            com_handleOk() {
                let data = JSON.parse(JSON.stringify(this.paramsObj))
                data.auto_pass = data.auto_pass?'10':'0'
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department-update',
                    data:Object.assign(data,{type:'1',route_id:'169'})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('设置成功')
                        this.visible = false
                    }
                });
            },
            setting() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/user/list',
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.visible = true
                        this.paramsObj={
                            id:udata.data.user.department.id,
                            auto_pass:udata.data.user.department.auto_pass=='10'?true:false,
                            auto_pass_time:udata.data.user.department.auto_pass_time
                        }
                    }
                });
            }
        },
        created(){
            this.getNewFriend()
        },
        beforeDestroy() {
            this.$ws.cmd2026 = null
        }
    }
</script>
