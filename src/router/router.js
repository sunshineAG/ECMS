import Vue from 'vue'
import Router from 'vue-router'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error=> error)
// }
Vue.use(Router)

import login from '@/view/login'


import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
// 初始路由
export default new Router({
    routes: [
        {
            path: '/login',
            name: '登录页',
            component: login,
            invisible: true
        },
        {
            path: '/exception',
            name: '异常页',
            icon: 'warning',
            component: RouteView,
            invisible: true,
            children: [
                {
                    path: '/exception/404',
                    name: '404',
                    icon: 'none',
                    component: () => import('@/view/exception/404')
                },
                {
                    path: '/exception/403',
                    name: '403',
                    icon: 'none',
                    component: () => import('@/view/exception/403')
                },
                {
                    path: '/exception/500',
                    name: '500',
                    icon: 'none',
                    component: () => import('@/view/exception/500')
                }
            ]
        },
    ]
})
// 根据权限动态添加的路由
export const dynamicRoutes = [
    {
        path: '/',
        name: '首页',
        component: MenuView,
        redirect: '/login',
        icon: 'none',
        meta: {
            requiresAuth: true
        },
        invisible: true
        , children: [
            {
                path: '/dataAnalysis',
                name: '仪表盘',
                component: () => import('@/view/dataAnalysis/dataAnalysis'),
            },
            {
                path:'/personal',
                name:'个人号',
                redirect: '/personal/home',
                component: RouteView,
                children:[
                    {
                        path: '/personal/home',
                        name: '成员',
                        redirect: '/personal/home/customerList',
                        component: RouteView,
                        icon: 'user',
                        children: [
                            {
                                path: '/personal/home/customerList',
                                name: '客户列表',
                                icon: 'none',
                                component: () => import('@/view/customerManage/customerList'),
                                alias:'/home/customerList'
                            },
                            {
                                path: '/personal/home/customerDetails',
                                name: '客户详情',
                                invisible: true,
                                icon: 'none',
                                component: () => import('@/view/customerManage/customerDetails'),
                                alias:'/home/customerDetails'
                            },
                            {
                                path: '/personal/home/groupList',
                                name: '群列表',
                                icon: 'none',
                                component: () => import('@/view/customerManage/groupList'),
                                alias:'/home/groupList'
                            },
                            {
                                path: '/personal/home/newFriend',
                                name: '新的客户',
                                icon: 'none',
                                component: () => import('@/view/customerManage/newFriend'),
                                alias:'/home/newFriend'
                            },
                            {
                                path: '/personal/home/customerUnique',
                                name: '客户查重',
                                icon: 'none',
                                component: () => import('@/view/customerManage/customerUnique'),
                                alias:'/home/customerUnique'
                            },
                            {
                                path: '/personal/home/groupDetails',
                                name: '群详情',
                                invisible: true,
                                icon: 'none',
                                component: () => import('@/view/customerManage/groupDetails'),
                                alias:'/home/groupDetails'
                            }
                        ]
                    },
                    {
                        path: '/personal/customerChat',
                        name: '朋友圈',
                        redirect: '/customerChat/FriendsCircle',
                        component: RouteView,
                        icon: 'wechat',
                        children: [
                            {
                                path: '/personal/customerChat/FriendsCircle',
                                name: '客户朋友圈',
                                icon: 'none',
                                component: () => import('@/view/customerChat/FriendsCircle'),
                                alias:'/customerChat/FriendsCircle'
                            },
                            {
                                path: '/personal/customerChat/friendCircleSelf',
                                name: '我的朋友圈',
                                icon: 'none',
                                component: () => import('@/view/customerChat/friendCircleSelf'),
                                alias:'/customerChat/friendCircleSelf'
                            },
                            {
                                path:'/personal/pushMange/newMsg',
                                name:'新消息',
                                invisible: true,
                                icon:'none',
                                component: () => import('@/components/MessagePush/newMsg'),
                                alias:'/pushMange/newMsg'
                            },
                            {
                                path:'/personal/customerChat/newMsg',
                                name:'新消息',
                                invisible: true,
                                icon:'none',
                                component: () => import('@/view/customerChat/newMsg'),
                                alias:'/customerChat/newMsg'
                            },
                            {
                                path:'/personal/customerChat/friendCircleDetail',
                                name:'朋友圈详情',
                                invisible: true,
                                icon:'none',
                                component: () => import('@/view/customerChat/friendCircleDetail'),
                                alias:'/customerChat/friendCircleDetail'
                            },
                            {
                                path:'/personal/pushMange/friendCircleDetail',
                                name:'评论详情',
                                invisible: true,
                                icon:'none',
                                component: () => import('@/components/MessagePush/friendCircleDetail'),
                                alias:'/pushMange/friendCircleDetail'
                            }
                        ]
                    },
                    {
                        path: '/personal/pushMange',
                        name: '运营',
                        redirect: '/pushMange/privatePush',
                        component: RouteView,
                        icon: 'fund',
                        children: [
                            {
                                path: '/personal/pushMange/NewPush',
                                name: '新建推送',
                                invisible: true,
                                icon: 'none',
                                component: () => import('@/components/MessagePush/NewPush'),
                                alias:'/pushMange/NewPush'
                            },
                            {
                                path: '/personal/pushMange/privatePush',
                                name: '私聊推送',
                                icon: 'none',
                                component: () => import('@/view/pushMange/privatePush'),
                                alias:'/pushMange/privatePush'
                            },
                            {
                                path: '/personal/pushMange/loseMation',
                                name: '失败详情',
                                icon: 'none',
                                invisible: true,
                                component: () => import('@/view/pushMange/loseMation'),
                                alias:'/pushMange/loseMation'
                            },
                            // {
                            //     path: '/pushMange/roomPush', loseMation
                            //     name: '群聊推送',
                            //     icon: 'none',
                            //     component: () => import('@/view/pushMange/roomPush'),
                            // },
                            {
                                path: '/personal/pushMange/friendCirclePush',
                                name: '朋友圈推送',
                                icon: 'none',
                                component: () => import('@/view/pushMange/friendCirclePush'),
                                alias:'/pushMange/friendCirclePush'
                            },
                            {
                                path: '/personal/pushMange/liveCode',
                                name: '个人号活码',
                                icon: 'none',
                                component: () => import('@/view/pushMange/liveCode'),
                                alias:'/pushMange/liveCode'
                            },
                            {
                                path: '/personal/pushMange/editLiveCode',
                                name: '编辑个人号活码',
                                invisible: true,
                                icon: 'none',
                                component: () => import('@/view/pushMange/editLiveCode'),
                                alias:'/pushMange/editLiveCode'
                            },
                            {
                                path: '/personal/pushMange/welComeMsg',
                                name: '欢迎语',
                                icon: 'none',
                                component: () => import('@/view/pushMange/welComeMsg'),
                                alias:'/pushMange/welComeMsg'
                            },
                            {
                                path: '/personal/pushMange/keyWordReply',
                                name: '关键词回复',
                                icon: 'none',
                                component: () => import('@/view/pushMange/keyWordReply'),
                                alias:'/pushMange/keyWordReply'
                            },
                            {
                                path: '/personal/pushMange/keyWordTag',
                                name: '关键词标签',
                                icon: 'none',
                                component: () => import('@/view/pushMange/keyWordTag'),
                                alias:'/pushMange/keyWordTag'
                            },
                            {
                                path: '/personal/pushMange/setKeyWordTag',
                                name: '设置关键词标签',
                                icon: 'none',
                                invisible: true,
                                component: () => import('@/components/pushMange/setKeyWordTag'),
                                alias:'/pushMange/setKeyWordTag'
                            },
                            {
                                path: '/personal/pushMange/setMsg',
                                name: '设置信息',
                                icon: 'none',
                                invisible: true,
                                component: () => import('@/components/pushMange/setMsg'),
                                alias:'/pushMange/setMsg'
                            },
                            {
                                path: '/personal/pushMange/blackList',
                                name: '黑名单',
                                icon: 'none',
                                component: () => import('@/view/pushMange/blackList'),
                                alias:'/pushMange/blackList'
                            }
                        ]
                    },
                    {
                        path: '/personal/riskManagement',
                        name: '风控',
                        redirect: '/riskManagement/sensitiveWord',
                        component: RouteView,
                        icon: 'eye',
                        children:[
                            {
                                path: '/personal/riskManagement/sensitiveWord',
                                name: '敏感词',
                                icon: 'none',
                                component: () => import('@/view/riskManagement/sensitiveWord'),
                                alias:'/riskManagement/sensitiveWord'
                            },
                            {
                                path: '/personal/riskManagement/sensitiveWordDetails',
                                invisible: true,
                                name: '触发记录',
                                icon: 'none',
                                component: () => import('@/view/riskManagement/sensitiveWordDetails'),
                                alias:'/riskManagement/sensitiveWordDetails'
                            },
                            // {
                            //     path: '/personal/riskManagement/callRecorder',
                            //     name: '通话录音',
                            //     icon: 'none',
                            //     component: () => import('@/view/riskManagement/callRecorder'),
                            //     alias:'/riskManagement/callRecorder'
                            // },
                            {
                                path: '/personal/riskManagement/callRecorderDetails',
                                name: '通话详情',
                                invisible: true,
                                icon: 'none',
                                component: () => import('@/view/riskManagement/callRecorderDetails'),
                                alias:'/riskManagement/callRecorderDetails'
                            },
                            {
                                path: '/personal/customerChat/chatHistory',
                                name: '聊天历史',
                                icon: 'none',
                                component: () => import('@/view/customerChat/chatHistory'),
                                alias:'/customerChat/chatHistory'
                            },
                            {
                                path: '/riskManagement/collectionRecord',
                                name: '收款记录',
                                icon: 'none',
                                component: () => import('@/view/riskManagement/collectionRecord'),
                            }
                        ]
                    },
                ]
            },
            // {
            //     path:'/company',
            //     name:'企业号',
            //     redirect: '/company/incCustomerManage',
            //     component: RouteView,
            //     children:[
            //         {
            //             path: '/company/incCustomerManage',
            //             name: '成员 ',
            //             redirect: '/incCustomerManage/incCustomerList',
            //             component: RouteView,
            //             icon: 'user',
            //             children: [
            //                 {
            //                     path: '/company/incCustomerManage/incCustomerList',
            //                     name: '客户列表',
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerManage/incCustomerList'),
            //                     alias:'/incCustomerManage/incCustomerList'
            //                 },
            //                 {
            //                     path: '/company/incCustomerManage/incGroupList',
            //                     name: '群列表',
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerManage/incGroupList'),
            //                     alias:'/incCustomerManage/incGroupList'
            //                 },
            //                 {
            //                     path: '/company/incCustomerManage/incListDetails',
            //                     name: '客户详情',
            //                     invisible: true,
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerManage/incListDetails'),
            //                     alias:'/incCustomerManage/incListDetails'
            //                 },
            //                 {
            //                     path: '/company/incCustomerManage/incListDetails',
            //                     name: '群详情',
            //                     invisible: true,
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerManage/incListDetails'),
            //                     alias:'/incCustomerManage/incListDetails'
            //                 },
            //                 {
            //                     path: '/company/incCustomerManage/incNewFriend',
            //                     name: '新的客户 ',
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerManage/incNewFriend'),
            //                     alias:'/incCustomerManage/incNewFriend'
            //                 }
            //             ]
            //         },
            //         {
            //             path: '/company/incCustomerDev',
            //             name: '客户拓展',
            //             redirect: '/incCustomerDev/getCustomer',
            //             component: RouteView,
            //             icon: 'share-alt',
            //             children: [
            //                 {
            //                     path: '/company/incCustomerDev/getCustomer',
            //                     name: '导入客户',
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerDev/getCustomer'),
            //                     alias:'/incCustomerDev/getCustomer'
            //                 },
            //                 {
            //                     path: '/company/incCustomerDev/autoGetCustomer',
            //                     name: '自动加粉',
            //                     icon: 'none',
            //                     component: () => import('@/view/incCustomerDev/autoGetCustomer'),
            //                     alias:'/incCustomerDev/autoGetCustomer'
            //                 }
            //             ]
            //         },
            //         {
            //             path: '/company/incPushMange',
            //             name: '运营',
            //             redirect: '/incPushMange/incPrivatePush',
            //             component: RouteView,
            //             icon: 'fund',
            //             children: [
            //                 {
            //                     path: '/company/incPushMange/incPrivatePush',
            //                     name: '私聊推送',
            //                     icon: 'none',
            //                     component: () => import('@/view/incPushMange/incPrivatePush'),
            //                     alias:'/incPushMange/incPrivatePush'
            //                 },
            //                 {
            //                     path: '/company/incPushMange/incFriendCirclePush',
            //                     name: '群聊推送',
            //                     icon: 'none',
            //                     component: () => import('@/view/incPushMange/incFriendCirclePush'),
            //                     alias:'/incPushMange/incFriendCirclePush'
            //                 },
            //                 {
            //                     path: '/personal/pushMange/incNewPush',
            //                     name: '新建推送',
            //                     invisible: true,
            //                     icon: 'none',
            //                     component: () => import('@/components/MessagePush/incNewPush'),
            //                     alias:'/pushMange/incNewPush'
            //                 }
            //             ]
            //         },
            //         {
            //             path: '/company/incRiskManagement',
            //             name: '风控',
            //             redirect: '/incRiskManagement/askHistory',
            //             component: RouteView,
            //             icon: 'eye',
            //             children: [
            //                 {
            //                     path: '/company/incRiskManagement/askHistory',
            //                     name: '聊天历史',
            //                     icon: 'none',
            //                     component: () => import('@/view/incRiskManagement/askHistory'),
            //                     alias:'/incRiskManagement/askHistory'
            //                 }
            //             ]
            //         }
            //     ]
            // },
            {
                path: '/dataManage',
                name: '资料',
                redirect: '/dataManage/customerTag',
                component: RouteView,
                icon: 'database',
                children: [

                    {
                        path: '/dataManage/customerTag',
                        name: '客户标签',
                        icon: 'iconbiaoqian',
                        component: () => import('@/view/dataManage/customerTag'),
                    },
                    {
                        path: '/dataManage/groupTag',
                        name: '群标签',
                        icon: 'iconbiaoqian',
                        component: () => import('@/view/dataManage/groupTag'),
                    },
                    {
                        path: '/dataManage/robotTag',
                        name: '微信号标签',
                        icon: 'iconbiaoqian',
                        component: () => import('@/view/dataManage/robotTag'),
                    },
                    {
                        path: '/dataManage/materialMange',
                        name: '素材管理',
                        icon: 'iconkujialeqiyezhan_sucaishoucang',
                        component: () => import('@/view/dataManage/materialMange'),
                    },
                    {
                        path: '/dataManage/editMaterial',
                        name: '编辑素材',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/components/dataManage/editMaterial'),
                    },
                    {
                        path: '/dataManage/fastReply',
                        name: '快捷回复',
                        icon: 'iconkujialeqiyezhan_sucaishoucang',
                        component: () => import('@/view/dataManage/fastReply'),
                    }
                ]
            },
            {
                path: '/productManage',
                name: '产品',
                redirect: '/productManage/productSort',
                component: RouteView,
                icon: 'appstore',
                children: [
                    {
                        path: '/productManage/productSort',
                        name: '产品类别',
                        icon: 'iconleibieguanli_icox',
                        component: () => import('@/view/productManage/productSort'),
                    },
                    {
                        path: '/productManage/productInfo',
                        name: '产品信息',
                        icon: 'iconchanpinguanli',
                        component: () => import('@/view/productManage/productInfo'),
                    },

                    {
                        path: '/productManage/batch_add',
                        name: '批量添加产品',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/view/productManage/batch_add'),
                    },
                    {
                        path: '/productManage/new_add',
                        name: '添加产品',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/productManage/new_add'),
                    },
                ]
            },
            {
                path: '/mallManage',
                name: '商城',
                redirect: '/mallManage/mallOrder',
                component: RouteView,
                icon: 'appstore',
                children: [
                    {
                        path: '/mallManage/mallOrder',
                        name: '平台订单',
                        icon: 'iconOrder',
                        component: () => import('@/view/mallManage/mallOrder'),
                    }
                ]
            },
            {
                path: '/groupManage',
                name: '组织',
                redirect: '/groupManage/userManage',
                component: RouteView,
                icon: 'team',
                children: [
                    {
                        path: '/groupManage/userManage',
                        name: '用户管理',
                        icon: 'iconyonghu',
                        component: () => import('@/view/groupManage/userManage'),
                    },
                    {
                        path: '/groupManage/addUser',
                        name: '添加用户',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editUser'),
                    },
                    {
                        path: '/groupManage/editUser',
                        name: '修改用户',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editUser'),
                    },
                    {
                        path: '/groupManage/departmentManage',
                        name: '部门管理',
                        icon: 'iconweb-icon-',
                        component: () => import('@/view/groupManage/departmentManage'),
                    },
                    {
                        path: '/groupManage/addDepartment',
                        name: '添加部门',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editDepartment'),
                    },
                    {
                        path: '/groupManage/editDepartment',
                        name: '修改部门',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editDepartment'),
                    },
                    {
                        path: '/groupManage/setRobot',
                        name: '设置机器人',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editDepartment'),
                    },
                    {
                        path: '/groupManage/permissionManage',
                        name: '角色权限',
                        icon: 'iconquanxianguanli',
                        component: () => import('@/view/groupManage/permissionManage'),
                    },
                    {
                        path: '/groupManage/addPermission',
                        name: '添加角色',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editPermission'),
                    },
                    {
                        path: '/groupManage/editPermission',
                        name: '修改角色',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editPermission'),
                    },
                    {
                        path: '/groupManage/assignPermission',
                        name: '分配权限',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/assignPermission'),
                    },
                    {
                        path: '/groupManage/maintainUser',
                        name: '维护成员',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editPermission'),
                    },
                ]
            },
            {
                path: '/systemManage',
                name: '系统',
                redirect: '/systemManage/robotManage',
                component: RouteView,
                icon: 'robot',
                children: [
                    {
                        path: '/systemManage/robotManage',
                        name: '手机列表',
                        icon: 'iconshouji',
                        component: () => import('@/view/systemManage/robotManage'),
                    },
                    // {
                    //     path: '/systemManage/companyWxAuth',
                    //     name: '企业号授权',
                    //     icon: 'iconiconqyxx',
                    //     component: () => import('@/view/systemManage/companyWxAuth'),
                    // },
                    // {
                    //     path: '/systemManage/companyUser',
                    //     name: '企业号员工',
                    //     invisible: true,
                    //     icon: 'none',
                    //     component: () => import('@/view/systemManage/companyUser'),
                    // },
                    {
                        path: '/systemManage/monitorManage',
                        name: '监控告警',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/systemManage/monitorManage'),
                    },
                    // {
                    //     path: '/systemManage/monitorSetting',
                    //     name: '监控设置',
                    //     icon: 'none',
                    //     component: () => import('@/view/systemManage/monitorSetting'),
                    // },
                    {
                        path: '/systemManage/editRobot',
                        name: '修改机器人',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/view/systemManage/editRobot'),
                    },
                    {
                        path: '/systemManage/personalSetting',
                        name: '个人设置',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/view/systemManage/personalSetting'),
                    },
                    {
                        path: '/systemManage/systemLog',
                        name: '操作日志',
                        icon: 'iconwulianwang-',
                        component: () => import('@/view/systemManage/systemLog'),
                    },
                    {
                        path: '/systemManage/emailSetting',
                            name: '掉线通知',
                        icon: 'notification',
                        component: () => import('@/view/systemManage/emailSetting')
                    }
                ]
            },
            {
                path: '/liveChat',
                name: '聚合聊天',
                component: () => import('@/view/customerChat/liveChat'),
                alias:'/customerChat/liveChat'
            }
        ]
    }
]
