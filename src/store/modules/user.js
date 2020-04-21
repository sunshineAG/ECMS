import router, { dynamicRoutes } from '@/router/router'
import { recursionRouter, setDefaultRoute } from '@/common/util'
var storage = require('../../common/store')
export default {
    namespaced: true,
    state: {
        user:{},
        company:{},
        token:'',
        permissionList:null,
        menuBadge:[],
        menuBadgeConstNew:[
            {
                name:'个人号',
                children:[
                    {
                        name:'成员',
                        children:['新的客户']
                    },
                    {
                        name:'朋友圈',
                        children:['客户朋友圈','我的朋友圈']
                    },
                ]
            },
            {
                name:'企业号',
                children:[
                    {
                        name:'成员 ',
                        children:['新的客户 ']
                    }
                ]
            },
            {
                name:'聚合聊天'
            }
        ],
        manager:[],
        department:{},
        robotStatus:'0',//  0 正常  1断线  2 操作提示
        offlineRobot:[],
        socketStatus:'1', //0 离线  1在线  2  操作提示
        routerPower:[]
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        setCompany (state, company) {
            state.company = company
        },
        setManager (state, manager) {
            state.manager = manager
        },
        setDepartment (state, department) {
            state.department = department
        },
        setRobotList (state,robotList) {
            state.robotList = robotList
        },
        setToken (state, token) {
            storage.store.set('token', token);
        },
        setGoToken(state, token) {
            storage.store.set('goToken', token);
        },
        setRouterPower(state, routes){
            state.routerPower = routes;
        },
        setPermission(state, routes) {
            state.permissionList = routes
        },
        clearPermission(state) {
            state.permissionList = null
        },
        // 增加左边侧边栏徽标数
        addMenuBadge (state,newMenuBadge) {
            /*每次将需要设置的侧边栏菜单和顶部徽标数已以下对象形式传入{name:'',badge:1}*/
            let name = ''
            let flag = false
            let array = JSON.parse(JSON.stringify(state.menuBadge));
            array.forEach(el=>{
                if(el.name==newMenuBadge.name) {
                    flag = true
                    el.badge += newMenuBadge.badge
                }
            })
            !flag&&array.push(newMenuBadge)
            let nameRoot = ''
            let nameChild = ''
            try {
                state.menuBadgeConstNew.forEach(el=>{
                    el.children&&el.children.forEach(item=>{
                        if(item == newMenuBadge.name) {
                            nameRoot = el.name
                            throw new Error('addMenuBadge跳出1')
                        }
                        item.children&&item.children.forEach(ll=>{
                            if(ll==newMenuBadge.name) {
                                nameRoot = el.name
                                nameChild = item.name
                                throw new Error('addMenuBadge跳出2')
                            }
                        })
                    })
                })
            }catch (e){
                // console.log(e)
                let flagRoot = false;
                let flagChild = false
                array.forEach(el=>{
                    if(el.name==nameRoot) {
                        flagRoot = true
                        el.badge += newMenuBadge.badge
                    }
                    if(el.name==nameChild) {
                        flagChild = true
                        el.badge += newMenuBadge.badge
                    }
                })
                !flagRoot&&array.push({
                    name:nameRoot,
                    badge:newMenuBadge.badge
                })
                !flagChild&&array.push({
                    name:nameChild,
                    badge:newMenuBadge.badge
                })
            }
            state.menuBadge = array
        },
        // 减少相应徽标数
        reduceMenuBadge(state,newMenuBadge) {
            /*每次将需要设置的侧边栏和顶部菜单徽标数已以下对象形式传入{name:'',badge:1}*/
            let name = ''
            let flag = false
            let array = JSON.parse(JSON.stringify(state.menuBadge));
            array.forEach(el=>{
                if(el.name==newMenuBadge.name) {
                    flag = true
                    el.badge>0&&(el.badge -= newMenuBadge.badge)
                }
            })
            !flag&&array.push(newMenuBadge)
            let nameRoot = ''
            let nameChild = ''
            try {
                state.menuBadgeConstNew.forEach(el=>{
                    el.children&&el.children.forEach(item=>{
                        if(item == newMenuBadge.name) {
                            nameRoot = el.name
                            throw new Error('reduceMenuBadge跳出1')
                        }
                        item.children&&item.children.forEach(ll=>{
                            if(ll==newMenuBadge.name) {
                                nameRoot = el.name
                                nameChild = item.name
                                throw new Error('reduceMenuBadge跳出2')
                            }
                        })
                    })
                })
            }catch (e){
                // console.log(e)
                let flagRoot = false;
                let flagChild = false
                array.forEach(el=>{
                    if(el.name==nameRoot) {
                        flagRoot = true
                        el.badge>0&&(el.badge -= newMenuBadge.badge)
                    }
                    if(el.name==nameChild) {
                        flagChild = true
                        el.badge>0&&(el.badge -= newMenuBadge.badge)
                    }
                })
                !flagRoot&&array.push({
                    name:nameRoot,
                    badge:newMenuBadge.badge>0?newMenuBadge.badge:0
                })
                !flagChild&&array.push({
                    name:nameChild,
                    badge:newMenuBadge.badge>0?newMenuBadge.badge:0
                })
            }
            state.menuBadge = array
        },
        // 清除左边侧边栏和顶部相应徽标数,clearMenuBadge对应类型{name:''}
        clearMenuBadge (state,clearMenuBadge) {
            let nameRoot = ''
            let nameChild = ''
            try {
                state.menuBadgeConstNew.forEach(el=>{
                    el.children&&el.children.forEach(item=>{
                        if(item == clearMenuBadge.name) {
                            nameRoot = el.name
                            throw new Error('clearMenuBadge跳出1')
                        }
                        item.children&&item.children.forEach(ll=>{
                            if(ll==clearMenuBadge.name) {
                                nameRoot = el.name
                                nameChild = item.name
                                throw new Error('clearMenuBadge跳出2')
                            }
                        })
                    })
                })
            }catch (e){
                // console.log(e)
            }
            let reduce = 0
            state.menuBadge.forEach(el=>{
                if(el.name == clearMenuBadge.name) {
                    reduce = el.badge
                    el.badge = 0
                }
            })
            state.menuBadge.forEach(el=>{
                if(el.name == nameRoot ||el.name == nameChild) {
                    el.badge>0&&(el.badge -= reduce)
                }
            })
        },
        setRobotStatus(state,status) {
            if(status=='2') {
                state.robotStatus = status
                setTimeout(_=>{
                    state.robotStatus = '1'
                },2000)
            }else {
                state.robotStatus = status
            }
        },
        setOfflineRobot(state,offlineRobot) {
            let userRobot = []
            offlineRobot.forEach(el=>{
                if(el.userId == state.user.user_id) {
                    userRobot.push(el)
                }
            })
            state.offlineRobot = userRobot
            // if(offlineRobot.length==0) {
            //     state.robotStatus = '0'
            // }else {
            //     state.robotStatus = '1'
            // }
            // state.offlineRobot = offlineRobot
            let array = JSON.parse(JSON.stringify(this.state.liveChat.wxList))
            array.forEach(el=>{
                let flag = false;
                offlineRobot.forEach(item=>{
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
            this.state.liveChat.wxList = array
        },
        setOfflineRobot_single(state,offlineRobot) {
            let offlineRobotList = JSON.parse(JSON.stringify(state.offlineRobot))
            let flag = false
            offlineRobotList.forEach((el,index)=>{
                if(el.username==offlineRobot.username) {
                    flag = true
                    if(offlineRobot.type=='2') {
                        offlineRobotList.splice(index,1)
                    }
                }
            })
            if(!flag&&offlineRobot.type!='2') {
                offlineRobotList.push(offlineRobot)
            }

            if(offlineRobotList.length==0) {
                state.robotStatus = '0'
            }else {
                state.robotStatus = '1'
            }
            state.offlineRobot = offlineRobotList
            // let array = JSON.parse(JSON.stringify(this.state.liveChat.wxList))
            // array.forEach(el=>{
            //     let flag = false;
            //     state.offlineRobot.forEach(item=>{
            //         if(el.username==item.username) {
            //             flag = true
            //         }
            //     })
            //     if(flag) {
            //         el.isError = true
            //     }else {
            //         el.isError = false
            //     }
            // })
            // this.state.liveChat.wxList = array
        },
        setSocketStatus(state,status) {
            state.socketStatus = status
        }
    },
    actions: {
        async fetchPermission({commit, state},axios) {
            let permissionList = await axios.get('/index.php?r=uc/user/list')
            if(permissionList.data.status==4003) {
                commit('setPermission', [])
                return 'false1'
            }
            /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
            if(!permissionList.data.data||!permissionList.data.data.permission) {
                commit('setPermission', [])
                return 'false'
            }
            let routes = recursionRouter(permissionList.data.data.permission, dynamicRoutes)
            // let routes = recursionRouter(setDefaultRoute(), dynamicRoutes)
            if(!state.user.nickname||!state.user.avatar) {
                commit('setUser',permissionList.data.data.user)
            }
            commit('setRouterPower',permissionList.data.data.permission)
            commit('setDepartment',permissionList.data.data.department)
            commit('setManager',permissionList.data.data.manager)
            commit('setRobotList',permissionList.data.data.assistant)
            commit('setOfflineRobot',permissionList.data.data.assistantState)
            /*  初始路由 */
            let initialRoutes = router.options.routes
            /*  动态添加路由 */
            router.addRoutes(routes)
            /* 完整的路由表 */
            commit('setPermission', [...initialRoutes, ...routes])
            return routes
        }
    }
}
