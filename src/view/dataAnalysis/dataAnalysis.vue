<style lang="less" scoped>
    .dataContent{
        position:relative;
    }
    .data-analysis {
        height: calc(~"100vh - 94px");
        overflow-y: auto;
        overflow-x: hidden;
        /*margin-bottom:10px;*/
        padding-top:52px;
    }
    .title {
        position: absolute;
        width:calc(~"100% - 10px");
        z-index:99;
        border-left: 5px solid #000;
        height: 52px;
        line-height: 36px;
        background:#fff;
        padding:10px 6px 10px 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    }
    .header {
        padding: 20px 0;
        .header-item {
            padding: 5px 15px 10px 20px;
            background: #ff0000;
            font-size: 14px;
            color: #ffffff;
            border-radius: 5px;
            margin-bottom: 10px;
            position: relative;
            .item-name {
                line-height: 30px;
            }
            .item-num {
                border-left: 2px solid #ffffff;
                padding-left: 15px;
                line-height: 30px;
                font-weight: 500;
                margin-top: 10px;
                font-size: 25px;
            }
            .item-add {
                position: absolute;
                right: 20px;
                bottom: 2px;
                text-align: right;
                img {
                    width: 20px;
                    height: 20px;
                    vertical-align: sub;
                }
            }
        }
        .item1 {
            background: rgb(241,39,17); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(241,39,17,1) 0%, rgba(245,174,25,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(241,39,17,1) 0%,rgba(245,174,25,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(241,39,17,1) 0%,rgba(245,174,25,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        }
        .item2 {
            background: rgb(42,51,178); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(42,51,178,1) 0%, rgba(20,133,203,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(42,51,178,1) 0%,rgba(20,133,203,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(42,51,178,1) 0%,rgba(20,133,203,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        }
        .item3 {
            background: rgb(17,153,142); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(17,153,142,1) 0%, rgba(55,238,125,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(17,153,142,1) 0%,rgba(55,238,125,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(17,153,142,1) 0%,rgba(55,238,125,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        }
        .item4 {
            background: rgb(218,34,255); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(218,34,255,1) 0%, rgba(151,51,238,1) 99%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(218,34,255,1) 0%,rgba(151,51,238,1) 99%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(218,34,255,1) 0%,rgba(151,51,238,1) 99%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        }
        .item5 {
            background: rgb(79,172,254); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(79,172,254,1) 0%, rgba(0,241,254,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(79,172,254,1) 0%,rgba(0,241,254,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(79,172,254,1) 0%,rgba(0,241,254,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        }
        .item6 {
            background: rgb(255,9,68); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(255,9,68,1) 0%, rgba(255,149,139,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(255,9,68,1) 0%,rgba(255,149,139,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(255,9,68,1) 0%,rgba(255,149,139,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        }
    }
    .content {
        margin-bottom: 20px;
    }
    .area-content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 1200px){
        .area-content {
            display: inherit!important;
        }
        .area-content > div {
            width: 100%!important;
        }
    }
</style>

<template>
    <div class='dataContent'>
        <div class="title">
            <span style="margin-left: 10px;font-size: 16px;font-weight: 700">
                数据分析
                <!--<span style="color: #FE6354;font-weight: normal;font-size: 12px;margin-left: 10px">(提示：当前版本仅统计个人号数据)</span>-->
            </span>
            <a-select @change="handleChange" v-model="selectUser" style="width: 200px;float: right;margin-left:10px;margin-right:4px;"  :disabled="disableDepartment&&!$store.state.user.user.see_department_power">
                <a-select-option v-for="(item,index) in userList" :key="item.id" :value="item.id">
                    {{item.user_name}}
                </a-select-option>
            </a-select>
            <a-tree-select 
                :treeData="departmentList"
                :treeDefaultExpandAll="true"
                v-model="selectDepratment"
                @select="onSelect"
                style="width: 200px;float: right;"
            >
            </a-tree-select>
            
        </div>
        <div class="data-analysis">
            <div class="header">
                <a-row  :gutter="16" type="flex" justify="space-between">
                    <a-col :xxl='4' :xl="4"  :md="8"  :xs="12">
                        <div class="header-item item1">
                            <div class="item-name">
                                昨天新增好友
                            </div>
                            <div class="item-num">
                                {{bannnerData.yesterday_friends_add_count}}
                            </div>
                            <div class="item-add">
                                <div style="font-size: 12px">今天新增</div>
                                <div>
                                    <img src="../../assets/arrow-up-circle.png" alt="">
                                    <span style="padding-left: 5px;display: inline-block;font-size: 20px">{{today_friend_add}}</span>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :xxl='4' :xl="4"  :md="8"  :xs="12">
                        <div class="header-item item2">
                            <div class="item-name">
                                好友数
                            </div>
                            <div class="item-num">
                                {{bannnerData.friends_total}}
                            </div>
                        </div>
                    </a-col>
                    <a-col :xxl='4' :xl="4"  :md="8"  :xs="12">
                        <div class="header-item item3">
                            <div class="item-name">
                                昨天新增群
                            </div>
                            <div class="item-num">
                                {{bannnerData.yesterday_room_add_count}}
                            </div>
                            <div class="item-add">
                                <div style="font-size: 12px">今天新增</div>
                                <div>
                                    <img src="../../assets/arrow-up-circle.png" alt="">
                                    <span style="padding-left: 5px;display: inline-block;font-size: 20px">{{today_room_add}}</span>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :xxl='4' :xl="4"  :md="8"  :xs="12">
                        <div class="header-item item4">
                            <div class="item-name">
                                总群数
                            </div>
                            <div class="item-num">
                                {{bannnerData.room_total}}
                            </div>
                        </div>
                    </a-col>
                    <a-col :xxl='4' :xl="4"  :md="8"  :xs="12">
                        <div class="header-item item5">
                            <div class="item-name">
                                平均首次响应时长(秒)
                            </div>
                            <div class="item-num">
                                {{bannnerData.avg_reply_time}}
                            </div>
                        </div>
                    </a-col>
                    <a-col :xxl='4' :xl="4"  :md="8"  :xs="12" >
                        <div class="header-item item6">
                            <div class="item-name">
                                触碰警告
                            </div>
                            <div class="item-num">
                                {{bannnerData.alarm_count}}
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="content">
                <friend-room-data :analysisData="friendRoomData" :uid="selectUser" ref="friendRoomData" :departmentId="selectDepratment"></friend-room-data>
            </div>
            <div class="area-content">
                <div style="width: 49%;display: inline-block">
                    <friend-area :analysisData="bannnerData.area" ></friend-area>
                </div>
                <div style="width: 49%;display: inline-block">
                    <friend-sex :analysisData="bannnerData.sex_ratio"></friend-sex>
                </div>
            </div>
            <div class="content">
                <chat-feedback-table :analysisData="chatFeedbackTable" :uid="selectUser" :departmentId="selectDepratment"></chat-feedback-table>
            </div>
            <div class="content">
                <chat-feedback :analysisData="chatFeedback" :uid="selectUser"  :analysisData1="chatCustomer" :departmentId="selectDepratment"></chat-feedback>
            </div>
            <!--<div class="content">-->
                <!--<chat-customer :analysisData="chatCustomer" :uid="selectUser" :departmentId="selectDepratment"></chat-customer>-->
            <!--</div>-->
            <div>
                <live-code-access :analysisData="liveCodeAccess" :uid="selectUser" :liveCodeList="liveCodeList" :departmentId="selectDepratment"></live-code-access>
            </div>
        </div>
    </div>
</template>
<script>
    import friendRoomData from '../../components/dataAnalysis/friendRoomData'
    import friendArea from '../../components/dataAnalysis/friendArea'
    import friendSex from '../../components/dataAnalysis/friendSex'
    import chatFeedback from '../../components/dataAnalysis/chatFeedback'
    import chatCustomer from '../../components/dataAnalysis/chatCustomer'
    import liveCodeAccess from '../../components/dataAnalysis/liveCodeAccess'
    import chatFeedbackTable from '../../components/dataAnalysis/chatFeedbackTable'
    import dateUtil from '../../common/dateUtil'
    export default {
        name: "",
        components: {friendRoomData,friendArea,friendSex,chatFeedback,chatCustomer,liveCodeAccess,chatFeedbackTable}
        ,data(){
            return{
                selectUser:'0',
                userList:[],
                friendRoomData:{},
                friendArea:[],
                friendSex:[],
                chatFeedback:[],
                chatCustomer:[],
                liveCodeAccess:{},
                liveCodeList:[],
                bannnerData:{
                    yesterday_friends_add_count:'0',
                    friends_total:'0',
                    avg_reply_time:'0',
                    yesterday_room_add_count:'0',
                    room_total:'0',
                    alarm_count:'0'
                },
                today_friend_add:'0',
                today_room_add:'0',
                chatFeedbackTable:[],
                avg_reply_time:0,
                departmentList:[],
                selectDepratment:'',
                disableDepartment:true
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            handleChange(value) {
                this.$store.state.user.user.department.id===value?this.disableDepartment = true:this.disableDepartment = false;
                this.selectUser = value
                this.initUser()
            },
            initUser() {
                this.initBannerData()
                this.initFriendRoomData()
                this.initChatFeedback()
                this.initChatCustomer()
                this.initLiveCodeAccess()
//                this.initChatFeedbackTable()
                this.getAddFriendRom(true)
            },
            treeList(){
                this.departmentList = this.listToTree(JSON.parse(JSON.stringify(this.$store.state.user.department)))
                this.selectDepratment = this.$store.state.user.user.department.id || this.departmentList[0].key
                this.getUserList()
            },
            listToTree(list,val) {
//              将部门列表转换为tree所用数据
                let array = []
                list.forEach((el,idx)=>{
                    if(el.children && el.children.length > 0) {
                        el.children = this.listToTree(el.children,idx)
                    }
                    array.push({title:el.name,key:el.id,value:el.id,children:el.children})
                })
               return array
            },
            onSelect(selectedKeys, info) {
                this.selectDepratment = selectedKeys
                this.getUserList()
            },
            getUserList(){
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/organization/user',
                    data:{department_id:this.selectDepratment,type:1}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.userList = udata.data.userList
                        let user_id = ''
                        this.userList.forEach(el=>{
                            if(el.id === this.$store.state.user.user.user_id){
                                 user_id = this.$store.state.user.user.user_id;
                            }
                        })
                        user_id? this.selectUser= user_id: this.userList[0]&&this.userList[0].id?this.selectUser = this.userList[0].id:(this.userList.unshift({id: '0', user_name: '无匹配结果'}))&&(this.selectUser = '0')
                        // this.userList.unshift({id: '0', user_name: '全部'});
                        // this.selectUser = this.userList[0].id
                        this.initUser()
                    }
                })
            },
            initBannerData() {
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/banner',
                    data:{uid:this.selectUser,department_id:this.selectDepratment}
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.bannnerData = udata.data
                    }
                });
            },
            initFriendRoomData() {
                let date = dateUtil('1')
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/friend-room-line-chart',
                    data:{
                        uid:this.selectUser,
                        date_start:date[0],
                        date_end:date[1],
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.friendRoomData = udata.data
                    }
                });
            },
            initChatFeedback() {
                let date = dateUtil('1')
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/chat-line-chart',
                    data:{
                        uid:this.selectUser,
                        date_start:date[0],
                        date_end:date[1],
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.chatFeedback = udata.data
                    }
                });
            },
            initChatCustomer() {
                let date = dateUtil('1')
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/contact-customer-line-chart',
                    data:{
                        uid:this.selectUser,
                        date_start:date[0],
                        date_end:date[1],
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.chatCustomer = udata.data
                    }
                });
            },
            initLiveCodeAccess() {
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/live-code-list',
                    data:{
                        uid:this.selectUser,
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.liveCodeList = udata.data
                    }
                });
            },
            getLiveCodeData() {
                let date = dateUtil('1')
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/live-code-chart',
                    data:{
                        uid:this.selectUser,
                        date_start:date[0],
                        date_end:date[1],
                        live_code_id:this.liveCodeList[0].id,
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.liveCodeAccess = udata.data
                    }
                });
            },
            getAddFriendRom(init) {
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/today-add',
                    data:{
                        uid:this.selectUser,
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.today_friend_add = udata.data.today_friend_add
                        this.today_room_add = udata.data.today_room_add
                        if(!init) {
                            this.$refs['friendRoomData'].refresh()
                        }
                    }
                });
            },
            initChatFeedbackTable() {
                let date = dateUtil('1')
                this.$axios({
                    method: 'post',
                    url: '/index.php?r=uc/dashboard/chat-analyse-table',
                    data:{
                        uid:this.selectUser,
                        date_start:date[0],
                        date_end:date[1],
                        department_id:this.selectDepratment
                    }
                }).then(d=> {
                    // 响应成功回调
                    let udata = d.data;
                    if (udata.status == 1) {
                        this.chatFeedbackTable = udata.data.list
                        this.avg_reply_time = udata.data.avg_reply_time
                    }
                });
            }
        },
        created(){
            this.treeList()
//            this.$ws.cmd2026 = msg=> {
//                if(msg.status==2) {
////                    判断是否是当前客户经理,再获取数据
//                    this.getAddFriendRom(false)
//                }
//            }
           
        },
        beforeDestroy() {
//            this.$ws.cmd2026 = null
        }
    }
</script>
