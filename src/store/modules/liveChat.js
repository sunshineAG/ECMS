import { concatMsgArr } from '@/common/util'
var emoji = require('../../common/emojiMap');
var comConf = require('../../common/comConfig');
export default {
    namespaced: true,
    state: {
        contactList:[],
        // 当前选择联系人
        selectContact :{},
        chatMsgList: [],
        emojiFlag:false,
        searchStatus:false,
        // 聊天历史
        chatHistoryContactList:[],
        selectChatHistoryContact:{},
        chatHistoryMsgList:[],
        selectUser:{},
        liveChatManage:[],
        friendEmojiFlag:false,
        isHasDot:false,
        wxList:[],
        selectWx:{},
        selectGroup:{},
    },
    mutations: {
        setSelectContact(state,contact){
            state.selectContact = contact
        },
        setContactList(state,contactList) {
            state.contactList = contactList
        },
        addContactList(state,contactList) {
            // 需要去重,这是滚动翻页
            let arr=[]
            contactList.forEach(el=>{
                let flag = false
                state.contactList.forEach(item=>{
                    if((el.friend_user_name==item.friend_user_name)&&(el.robot_username==item.robot_username)) {
                        flag = true
                    }
                })
                !flag&&arr.push(el)
            })
            state.contactList = [...state.contactList,...arr]
        },
        insertContactList(state,contact) {
            let flag = false
            let index  //当前联系人index
            let index1 = 0
            state.contactList.forEach((el,_index)=>{
                if((el.friend_user_name==contact.friend_user_name)&&(el.robot_username==contact.robot_username)) {
                    flag=true
                    index = _index
                }
                if(state.contactList[_index].top_set==1&&!!state.contactList[_index+1]&&state.contactList[_index+1].top_set==0) {
                    index1 = _index +1
                }
            })
            if(flag) {
                if(index<index1&&index1!=0) {
                    index1-=1
                }
                let arr= state.contactList.splice(index,1)
                if(contact.top_set==1) {
                    state.contactList.unshift(arr[0])
                }else {
                    state.contactList.splice(index1,0,arr[0])
                }
            } else {
                if(contact.top_set==1) {
                    state.contactList.unshift(contact)
                }else {
                    state.contactList.splice(index1,0,contact)
                }
            }
        },
        clearContactList(state) {
            state.contactList=[]
        },
        clearContactItem(state,index) {
            state.contactList.splice(index,1)
        },
        setEmojiFlag(state,flag) {
            state.emojiFlag = flag
        },
        setFriendEmojiFlag(state,flag) {
            state.friendEmojiFlag = flag
        },
        setChatMsgList(state,chatMsgList) {
            state.chatMsgList = chatMsgList
        },
        addChatMsgList(state,chatMsgList) {
            state.chatMsgList = concatMsgArr(chatMsgList,state.chatMsgList)
        },
        insertChatMsgList(state,chatMsg) {
            let flag = false
            state.chatMsgList.forEach(el=>{
                if(el.key == chatMsg.key) {
                    el.data.push(chatMsg.data[0])
                    flag =true
                }
            })
            !flag&&(state.chatMsgList.push(chatMsg))
        },
        insertChatMsgList_new(state,chatMsg) {
            let flag = false
            state.chatMsgList.forEach(el=>{
                if(el.key == chatMsg.key) {
                    el.data.splice(-1,0,chatMsg.data[0])
                    flag =true
                }
            })
            !flag&&(state.chatMsgList.splice(-1,0,chatMsg))
        },
        clearChatMsgList(state) {
            state.chatMsgList=[]
        },
        setSearchStatus(state,bool) {
            state.searchStatus = bool
        },
        //聊天历史使用--开始
        setSelectChatHistoryContact(state,contact) {
            state.selectChatHistoryContact = contact
        },
        setChatHistoryContactList(state,contactList) {
            state.chatHistoryContactList = contactList
        },
        addChatHistoryContactList(state,contactList) {
            // 需要去重,这是滚动翻页
            let arr=[]
            contactList.forEach(el=>{
                let flag = false
                state.chatHistoryContactList.forEach(item=>{
                    if((el.friend_user_name==item.friend_user_name)&&(el.robot_username==item.robot_username)) {
                        flag = true
                    }
                })
                !flag&&arr.push(el)
            })
            state.contactList = [...state.contactList,...arr]
        },
        clearChatHistoryContactList(state) {
            state.chatHistoryContactList=[]
        },
        clearChatHistoryMsgList(state) {
            state.chatHistoryMsgList=[]
        },
        setChatHistoryMsgList(state,chatMsgList) {
            state.chatHistoryMsgList = chatMsgList
        },
        addChatHistoryMsgList(state,chatMsgList) {
            state.chatMsgList = [...state.contactList,...chatMsgList]
        },
        //聊天历史使用--结束
        setSelectUser(state,user) {
            state.selectUser = user
        },
        setLiveChatManage(state,list) {
            let array = []
            list.forEach(el=>{
                let flag =false
                let item1 = {}
                state.liveChatManage.forEach(item=>{
                    if(el.id == item.id) {
                        flag = true
                        item1 = item
                    }
                })
                if(!flag) {
                    array.push(Object.assign(el,{num:0}))
                }else {
                    array.push(Object.assign(el,item1))
                }
            })
            state.liveChatManage = array
        },
        setLiveChatManageChild(state,data) {
            state.liveChatManage.forEach(el=>{
                if(el.id == data.userId&&!el.child) {
                    el.child = data.list
                }
            })
        },
        addLiveChatManage(state,newMenuBadge) {
            let array = JSON.parse(JSON.stringify(state.liveChatManage));
            array.forEach(el=>{
                if(el.id==newMenuBadge.user_id) {
                    if(!el.num) {
                        el.num=0
                    }
                    el.num += newMenuBadge.badge
                }
            })
            state.liveChatManage = array
            if(newMenuBadge.user_id == state.selectUser.id) {
                if(!state.selectUser.num) {
                    state.selectUser.num=0
                }
                state.selectUser.num += newMenuBadge.badge
            }
            let array1 = JSON.parse(JSON.stringify(state.liveChatManage));
            let flag = false
            array1.forEach(el=>{
                if(!!el.num&&el.num!=0&&el.id!=state.selectUser.id) {
                    flag = true
                }
            })
            if(flag) {
                state.isHasDot = true
            }else {
                state.isHasDot = false
            }
            array1.forEach(el=>{
                if(el.id==state.selectUser.id) {
                    state.selectUser.num = el.num
                }
            })
        },
        reduceLiveChatManage(state,newMenuBadge) {
            let array = JSON.parse(JSON.stringify(state.liveChatManage));
            array.forEach(el=>{
                if(el.id==newMenuBadge.user_id) {
                    el.num>0&&(el.num -= newMenuBadge.badge)
                    el.num = el.num>0?el.num:0
                }
            })
            state.liveChatManage = array

            let array1 = JSON.parse(JSON.stringify(state.liveChatManage));
            let flag = false
            array1.forEach(el=>{
                if(!!el.num&&el.num!=0&&el.id!=state.selectUser.id) {
                    flag = true
                }
            })
            if(flag) {
                state.isHasDot = true
            }else {
                state.isHasDot = false
            }
            array1.forEach(el=>{
                if(el.id==state.selectUser.id) {
                    state.selectUser.num = el.num
                }
            })
        },
        clearLiveChatManage(state,id) {
            let array = JSON.parse(JSON.stringify(state.liveChatManage));
            array.forEach(el=>{
                if(el.id==id) {
                    el.num=0
                }
            })
            state.liveChatManage = array
            let array1 = JSON.parse(JSON.stringify(state.liveChatManage));
            let flag = false
            array1.forEach(el=>{
                if(!!el.num&&el.num!=0&&el.id!=state.selectUser.id) {
                    flag = true
                }
            })
            if(flag) {
                state.isHasDot = true
            }else {
                state.isHasDot = false
            }
        },
        //机器人列表
        setSelectWx(state,wx) {
            state.selectWx = wx
        },
        setWxList(state,list) {
            let array = []
            list.forEach(el=>{
                let flag =false
                let item1 = {}
                state.wxList.forEach(item=>{
                    if(el.username == item.username) {
                        flag = true
                        item1 = item
                    }
                })
                if(!flag) {
                    array.push(Object.assign(el,{num:0}))
                }else {
                    array.push(Object.assign(el,item1))
                }
            })
            let child = []
            state.liveChatManage.forEach(item=>{
                if(state.selectUser.id==item.id) {
                    child = item.child
                }
            })
            array.forEach(el=>{
                child.forEach(item=>{
                    if(el.username==item.username) {
                        el.num = item.num || 0
                    }
                })
            })
            array.forEach(el=>{
                let flag = false;
                this.state.user.offlineRobot.forEach(item=>{
                    if(el.username==item.username) {
                        flag = true
                    }
                })
                if(flag) {
                    el.isError = true
                }else {
                    el.isError = false
                }
            })
            state.wxList = array
        },
        addWxListNum(state,newMenuBadge) {
            let array = JSON.parse(JSON.stringify(state.wxList));
            array.forEach(el=>{
                if(el.username==newMenuBadge.username) {
                    if(!el.num) {
                        el.num=0
                    }
                    el.num += newMenuBadge.badge
                }
            })
            state.wxList = array
            state.liveChatManage.forEach(el=>{
                el.child&&el.child.forEach(item=> {
                    if(item.username == newMenuBadge.username) {
                        item.num += newMenuBadge.badge
                    }
                })
            })
        },
        addOtherWxListNum(state,newMenuBadge) {
            state.liveChatManage.forEach(el=>{
                if(el.id == newMenuBadge.user_id) {
                el.child&&el.child.forEach(item=> {
                        if(item.username == newMenuBadge.username) {
                            item.num += newMenuBadge.badge
                        }
                    })
                }
            })
        },
        reduceWxListNum(state,newMenuBadge) {
            let array = JSON.parse(JSON.stringify(state.wxList));
            array.forEach(el=>{
                if(el.username==newMenuBadge.username) {
                    el.num>0&&(el.num -= newMenuBadge.badge)
                    el.num = el.num>0?el.num:0
                }
            })
            state.wxList = array
            state.liveChatManage.forEach(el=>{
                el.child&&el.child.forEach(item=> {
                    if(item.username == newMenuBadge.username) {
                        item.num>0&&(item.num -= newMenuBadge.badge)
                        item.num = item.num>0?item.num:0
                    }
                })
            })
        },
        clearWxListNum(state,wxItem) {
            let array = JSON.parse(JSON.stringify(state.wxList));
            array.forEach(el=>{
                if(el.username == wxItem.username) {
                    this.commit('liveChat/reduceLiveChatManage',{user_id:state.selectUser.id,badge:el.num})
                    el.num=0
                }
            })
            state.wxList = array
            state.liveChatManage.forEach(el=>{
                el.child&&el.child.forEach(item=> {
                    if(item.username == wxItem.username) {
                        item.num=0
                    }
                })
            })
        },
        setSelectGroup(state,el) {
            state.selectGroup = el
        },
    },
    actions: {

    }
}
