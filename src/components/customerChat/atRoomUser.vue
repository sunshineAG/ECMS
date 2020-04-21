<style lang="less" scoped>
    .user-content {
        position: fixed;
        transform: translateY(-100%);
        max-height: 220px;
        width: 160px;
        overflow-y: auto;
        overflow-x: hidden;
        z-index: 100;
        &::-webkit-scrollbar-track-piece{width:6px;height: 6px;background-color:#e6e5e5 ;  }
        &::-webkit-scrollbar{width:6px;height:6px ; }
        .user-item {
            height: 30px;
            line-height: 30px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            width: 160px;
            background: #F2F2F2;
            &:hover {
                background: #DDDDDD;
                cursor: pointer;
            }
            img {
                margin-left: 10px;
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
        }
        .select-user {
            background: #C3C2C2;
        }

    }
</style>
<template>
    <div class="user-content" ref="userContent" :style="{'top':atTop+'px','left':atLeft+'px'}">
        <div v-for="item in roomUser" :class="['user-item',selectRoomUser==item.username?'select-user':'']" @click="selectUser(item)">
            <img :src="item.header_img_url" alt="">
            <span>{{item.remark==''?item.nickname:item.remark}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'atRoomUser',
        props: {
            roomUser: {
                type: Array,
                required: true,
                default: () => []
            },
            atTop: {
                type:Number,
                default:0
            },
            atLeft: {
                type:Number,
                default:0
            }
        },
        data () {
            return {
                selectRoomUser:'',
            }
        },
        watch: {
            roomUser: function (val, oldVal) {
                this.roomUserChange()
            },
            atLeft:function (val, oldVal) {
                this.$forceUpdate()
            }
        },
        computed: {

        },
        methods:{
            roomUserChange() {
                //                选中最后一个并将滚动到最下面
                this.selectRoomUser = this.roomUser[this.roomUser.length-1].username
                setTimeout(_=>{
                    this.$refs.userContent.scrollTop = this.$refs.userContent.scrollHeight - this.$refs.userContent.offsetHeight
                },0)
            },
            selectUser(item) {
                this.selectRoomUser = item.username
                this.$emit('select',item)
            },
            keyEvent(e) {
                let index1=0
                let item=null;
                this.roomUser.forEach((el,index)=> {
                    if(el.username==this.selectRoomUser) {
                        item = el
                        index1 = index
                    }
                })
                if(e==13) {
//                    enter
                    this.$emit('select',item)
                }else if(e==38) {
//                    ↑上键
                    let index2 = (index1 - 1)<0?0:(index1-1)
                    this.selectRoomUser = this.roomUser[index2].username
                    setTimeout(_=>{
                        if(index2*30<this.$refs.userContent.scrollTop) {
                            this.$refs.userContent.scrollTop = this.$refs.userContent.scrollTop - 30
                        }
                    },0)
                }else if(e==40) {
//                    ↓下键
                    let index2 = (index1 + 1)>this.roomUser.length?index1:(index1+1)
                    this.selectRoomUser = this.roomUser[index2].username
                    setTimeout(_=>{
                        if((index2+1)*30>this.$refs.userContent.offsetHeight) {
                            this.$refs.userContent.scrollTop = this.$refs.userContent.scrollTop + 30
                        }
                    },0)
                }
            }
        },
        created:function () {

        }
    }
</script>


