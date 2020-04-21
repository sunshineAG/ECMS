<style lang="less" scoped>
    .black-list {
        height: calc(~"100vh - 90px");
        overflow: auto;
        background: #ffffff;
        padding: 25px;
        * {
            font-size: 12px!important;
        }
        p{
            color: rgb(16,16,16);
        }
        .item {
            p{
                span {
                    font-weight: 400;
                }
            }
        }
        .tabs {
            margin-bottom: 10px;
        }
    }
    .ant-tag:hover {
        background: #5AA9CD;
        color: #ffffff;
        opacity: 1;
    }
    .stausPage{
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-25%,-50%);
    }
</style>
<style>
    .black-list .ant-tabs-bar{
        border-bottom: 1px solid #f0f2f5;
    }
</style>
<template>
    <div class="black-list">
        <div class="tabs">
            <a-tabs v-model="selectTab" @change="tabChange">
                <a-tab-pane tab="黑名单设置" key="1"></a-tab-pane>
                <a-tab-pane tab="黑名单管理" key="2"></a-tab-pane>
            </a-tabs>
        </div>
        <div>
            <div v-if="selectTab==1">
                <!--<p style="color: rgb(239, 65, 52)">注意：黑名单只针对已开启托管群有效</p>-->
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.msg_keyword_b">消息关键字加黑名单（验证消息内容中的关键字）</a-checkbox>
                    </p>
                    <p style="position: relative">
                        <a-input v-model="msg_keyword" placeholder='请输入关键字，并回车保存' style="width: 300px;" @keyup.enter="saveKeyWord(1)" />
                        <span style="color: #5aa9cd;position: absolute;right: 0;top: 50%;transform: translateY(-50%);font-size: 14px!important;cursor: pointer" @click="delAll('1')">全部删除</span>
                    </p>
                    <p>
                        <a-tag v-for="(item,index) in blackSetting.msg_keyword" :closable="true" :key="index"  @close="closeTag($event,item,index)" style="margin-bottom: 10px">{{item}}</a-tag>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.nickname_keyword_b">昵称关键字加黑名单（验证昵称中的关键字）</a-checkbox>
                    </p>
                    <p style="position: relative">
                        <a-input v-model="nickname_keyword" placeholder='请输入关键字，并回车保存' style="width: 300px;" @keyup.enter="saveKeyWord(2)" />
                        <span style="color: #5aa9cd;position: absolute;right: 0;top: 50%;transform: translateY(-50%);font-size: 14px!important;cursor: pointer" @click="delAll('2')">全部删除</span>
                    </p>
                    <p>
                        <a-tag v-for="(item,index) in blackSetting.nickname_keyword" :closable="true" :key="index"  @close="closeTagName($event,item,index)" style="margin-bottom: 10px">{{item}}</a-tag>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.text_num_b">消息超出字数加入黑名单</a-checkbox>
                    </p>
                    <p>
                        <a-input-number :min="10"  v-model="blackSetting.text_num"/>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.link_b">发送链接加黑名单</a-checkbox>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.business_card_b">分享公众号名片或个人名片加黑名单</a-checkbox>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.auto_pass_ban_b">拉黑用户不自动通过好友申请</a-checkbox>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.room_ban_b">拉黑用户限制入群（已踢出群聊/裂变活动群）</a-checkbox>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.room_auto_remove_b">自动踢出群聊</a-checkbox>
                    </p>
                    <p style="padding-left: 50px">
                        <a-radio-group v-model="blackSetting.room_auto_remove_way">
                            <a-radio value="0">警告后二次触犯踢出</a-radio>
                            <a-radio value="1">直接踢出</a-radio>
                        </a-radio-group>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <a-checkbox v-model="blackSetting.black_talk_b">触犯拉黑规则提醒话术（仅限机器人所在群聊）</a-checkbox>
                    </p>
                    <p style="padding-left: 50px">
                        <a-textarea v-if="blackSetting.room_auto_remove_way==0" v-model="blackSetting.warn_talk" placeholder="请输入第一次警告话术" :autosize="{ minRows: 4, maxRows: 6 }" style="width: 50%;margin-bottom: 20px" />
                        <a-textarea v-model="blackSetting.remove_talk" placeholder="请输入踢出群聊后的话术" :autosize="{ minRows: 4, maxRows: 6 }" style="width: 50%;margin-bottom: 20px" />
                    </p>
                </div>
                <div>
                    <div style="padding-left: 50px;">
                        <div style="width: 50%;text-align: right;">
                            <a-button  type="primary" @click="save()" >保存</a-button>
                            <!-- <a-button  @click="getBlackSetting()">取消</a-button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectTab==2">
                <div style="position: relative;margin-bottom: 20px">
                    <a-input v-model="nickname" placeholder='请输入用户昵称' style="width: 300px;" @keyup.enter="saveKeyWord(1)" />
                    <a-button  type="primary" @click="search()" style="margin-left: 20px">搜索</a-button>
                    <a-button  @click="addBlackName()" style="margin-left: 20px" >手动增加</a-button>
                    <span style="color: #5aa9cd;position: absolute;right: 0;top: 50%;transform: translateY(-50%);font-size: 14px!important;cursor: pointer" @click="delAllName()">全部删除</span>
                </div>
                <div>
                    <a-tag v-for="(item,index) in blackList" :closable="true" :key="index"  @close="close($event,item,index)" style="margin-bottom: 10px">{{item}}</a-tag>
                </div>
               
                <data-status :width="200" :hieght="330" class="stausPage" v-if="!blackList.length"></data-status>
               
            </div>
        </div>
    </div>
</template>
<script>
    import dataStatus from '../../components/pageConfig/dataStatus'
    import { powerObject } from '@/common/util'
    export default {
        name: "",
        components:{
            dataStatus
        },
        data(){
            return{
                selectTab:'1',
                blackSetting:{},
                msg_keyword:'',
                nickname_keyword:'',
                nickname:'',
                blackList:[]
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
                        this.getBlackSetting()
                        break
                    case '2':
                        this.nickname = ''
                        this.getBlackList()
                        break
                }
            },
            delAll(type) {
                if(type==1) {
                    if(this.blackSetting.msg_keyword.length==0) {
                        this.$message.warning('无删除项')
                        return
                    }
                } else if(type==2) {
                    if(this.blackSetting.nickname_keyword.length==0) {
                        this.$message.warning('无删除项')
                        return
                    }
                }
                let _this = this
                this.$confirm({
                    title:'确定全部删除？',
                    onOk:function () {
                        let data
                        if(type==1) {
                            data = {
                                black_setting_id:_this.blackSetting.id,
                                msg_keyword:'1',
                                del:1,
                                del_all:1
                            }
                        } else if(type==2) {
                            data = {
                                black_setting_id:_this.blackSetting.id,
                                nickname_keyword:'2',
                                del:1,
                                del_all:1
                            }
                        }
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/sale/black-list-setting-update',
                            data:data
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                if(type==1) {
                                    _this.blackSetting.msg_keyword=[]
                                } else if(type==2) {
                                    _this.blackSetting.nickname_keyword=[]
                                }
                                _this.$message.success('删除成功')
                            }
                        });
                    }
                })
            },
            delAllName() {
                if(this.blackList.length==0) {
                    this.$message.warning('无昵称可删除')
                    return
                }
                let _this = this
                this.$confirm({
                    title:'确定全部删除？',
                    onOk:function () {
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/sale/black-list-update',
                            data:{
                                department_id:_this.$store.state.user.user.department.id,
                                del_all:1,
                                del:1,
                                nickname:'1'
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                _this.blackList = []
                                _this.$message.success('删除成功')
                            }
                        });
                    }
                })
            },
            addBlackName() {
                if(this.nickname=='') {
                    return
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-update',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        nickname:this.nickname
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.blackList.unshift(this.nickname)
                        this.nickname = ''
                    }
                });
            },
            saveKeyWord(type) {
                let data
                if(type==1) {
                    if(this.msg_keyword=='') {
                        return
                    }
                    data = {
                        black_setting_id:this.blackSetting.id,
                        msg_keyword:this.msg_keyword
                    }
                } else if(type==2) {
                    if(this.nickname_keyword=='') {
                        return
                    }
                    data = {
                        black_setting_id:this.blackSetting.id,
                        nickname_keyword:this.nickname_keyword
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-setting-update',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(type==1) {
                            this.blackSetting.msg_keyword.unshift(this.msg_keyword)
                            this.msg_keyword = ''
                        } else if(type==2) {
                            this.blackSetting.nickname_keyword.unshift(this.nickname_keyword)
                            this.nickname_keyword = ''
                        }
                        this.$message.success(udata.msg)
                    }
                });
            },
            closeTag(e,item,index) {
                let _this =this;
                e.preventDefault()
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-setting-update',
                    data:{
                        black_setting_id:this.blackSetting.id,
                        msg_keyword:item,
                        del:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.blackSetting.msg_keyword.splice(index,1)
                        this.$message.success(udata.msg)
                    }
                });
            },
            closeTagName(e,item,index) {
                let _this =this;
                e.preventDefault()
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-setting-update',
                    data:{
                        black_setting_id:this.blackSetting.id,
                        nickname_keyword:item,
                        del:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.blackSetting.nickname_keyword.splice(index,1)
                        this.$message.success(udata.msg)
                    }
                });
            },
            close(e,item,index) {
                let _this =this;
                e.preventDefault()
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-update',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        nickname:item,
                        del:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.blackList.splice(index,1)
                        this.$message.success(udata.msg)
                    }
                });
            },
            getBlackSetting() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-setting',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        udata.data.auto_pass_ban_b=udata.data.auto_pass_ban_b=='1'?true:false
                        udata.data.black_talk_b=udata.data.black_talk_b=='1'?true:false
                        udata.data.business_card_b=udata.data.business_card_b=='1'?true:false
                        udata.data.department_id=udata.data.department_id=='1'?true:false
                        udata.data.link_b=udata.data.link_b=='1'?true:false
                        udata.data.msg_keyword_b=udata.data.msg_keyword_b=='1'?true:false
                        udata.data.nickname_keyword_b=udata.data.nickname_keyword_b=='1'?true:false
                        udata.data.room_auto_remove_b=udata.data.room_auto_remove_b=='1'?true:false
                        udata.data.room_ban_b=udata.data.room_ban_b=='1'?true:false
                        udata.data.text_num_b=udata.data.text_num_b=='1'?true:false
                        udata.data.text_num = parseInt(udata.data.text_num)
                        this.blackSetting = udata.data
                    }
                });
            },
            save() {
                let  data= JSON.parse(JSON.stringify(this.blackSetting))
                data.black_setting_id = data.id
                data.auto_pass_ban_b=data.auto_pass_ban_b==true?'1':'0'
                data.black_talk_b=data.black_talk_b==true?'1':'0'
                data.business_card_b=data.business_card_b==true?'1':'0'
                data.department_id=data.department_id==true?'1':'0'
                data.link_b=data.link_b==true?'1':'0'
                data.msg_keyword_b=data.msg_keyword_b==true?'1':'0'
                data.nickname_keyword_b=data.nickname_keyword_b==true?'1':'0'
                data.room_auto_remove_b=data.room_auto_remove_b==true?'1':'0'
                data.room_ban_b=data.room_ban_b==true?'1':'0'
                data.text_num_b=data.text_num_b==true?'1':'0'
                delete data.msg_keyword
                delete data.nickname_keyword
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list-setting-update',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('保存成功')
                    }
                });
            },
            getBlackList() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/sale/black-list',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        search:this.nickname
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.blackList = udata.data
                    }
                });
            },
            search() {
                this.getBlackList()
            }
        },
        created(){
            this.getBlackSetting()
        }
    }
</script>
