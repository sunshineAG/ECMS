/**
 * Created by cczhuc on 2018/12/20.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from '@/view/Index'
import router from '@/router/router'
import Util from '../common/util';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/theme/my-theme.less';    // 全局
import axios from 'axios'
import ws from '@/websocket/websocketMsg'
import store from '@/store/store'
import Qs from 'qs'
import Notification from 'ant-design-vue/lib/notification';
import erroeCollect from '@/common/errorCollect'
Vue.use(Antd)
Vue.prototype.$axios = axios
Vue.prototype.$ws = ws
// Vue.prototype.$notification = Notification;
// Notification.config({
//     top:'70px'
// })
//定义一个全局点击函数
Vue.prototype.globalClick = function (callback,callback1) {
    document.getElementById('main').onclick = function (e) {
        let flag =false
        let flag1 =false
        e.path.forEach(el=>{
            if(el.id=='emoji'||el.id=='showEmoji') {
                flag = true
            }
        })
        e.path.forEach(el=>{
            if(el.id=='emoji1'||el.id=='showEmoji1') {
                flag1 = true
            }
        })
        if(!flag1 && !flag) {
            !!callback1&&callback1();
            callback();
        }else if(flag && !flag1) {
            !!callback1&&callback1();
        }else if(!flag && flag1) {
            callback();
        }else {
            return
        }
    };
};

import '@/components/emoji/emoji.css'  //聊天框表情
var storage = require('../common/store')
var comConf = require('../common/comConfig')
var config = require('../common/config')
router.beforeEach((to, from, next) => {
    if (!storage.store.get('token')) {
        if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        if (store.state.user.permissionList==null) {
            store.dispatch('user/fetchPermission',axios).then((res) => {
                if(res=='false1') {
                    next({ path: '/login' })
                }
                else if(res=='false') {
                    next({ path: '/exception/403'})
                } else {
                    if(to.path!== '/login') {
                        next({path:to.fullPath})
                    }
                    else {
                        next({ path: res[0].children[0].path })
                    }
                }
            })
        } else {
            if (to.matched.length > 0) {
                next()
            } else {
                next({ path: '/exception/403' })
            }
        }
    }
});

router.afterEach((to, from, next) => {
    if(to.matched[0].name=='首页'&&to.matched[1].name !=storage.store.get('menuNav')) {
        store.commit('navPath/setNavMenue',to.matched[1].name)
        storage.store.set('menuNav', to.matched[1].name);
    }
    if (to.hash === '') window.scrollTo(0, 0);  // 避免 Anchor 的示例滚动
});

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    // const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        // router.replace(targetPath);
        // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
        location.reload();
    }
});

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
    // 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
    // erroeCollect.errorPage(err, vm, info)
}
// axios响应和拦截器
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
    return Qs.stringify(data)
}];
axios.defaults.timeout = 120000
axios.defaults.headers['Cache-Control'] = 'no-cache';
let pending = []
let CancelToken = axios.CancelToken;
let cancelPending = (config) => {
        pending.forEach((item, index) => {
        if(!!config){
            if(item.u == config.url){
                item.f(); //取消请求
                pending.splice(index, 1); //移除当前请求记录
            };
        }else{
            item.f(); //取消请求
            pending.splice(index, 1); //移除当前请求记录
        }
    });
};
axios.interceptors.request.use(
    config => {
        let jwtToken = storage.store.get('token');
        if (jwtToken) {
            config.headers.Authorization = jwtToken;
            config.headers['X-CSRF-TOKEN'] = 'token';
        } else {
            store.commit('user/setToken','')
        }
        // config.cancelToken = new CancelToken((c) => {
        //     pending.push({'u': config.url, 'f': c});
        // })
        config.url  = config.url + '&timestamp=' + new Date().getTime() +Math.floor(1000 + Math.random()*9000)
        if(/^(\/qiyewxapi)|(\/ecmsapi)/.test(config.url)) {
            if(store.state.user.company.public_ip&&store.state.user.company.server_port) {
                config.url = 'http://' + store.state.user.company.public_ip + ':' +  store.state.user.company.server_port + config.url
            }else {
                config.url = 'http://' + storage.store.get('companyInfo').public_ip + ':' +  storage.store.get('companyInfo').server_port + config.url
            }
        }
        // if(/^\/qiyewxapi/.test(config.url)) {
        //     config.url = 'http://192.168.0.72:8999' + config.url
        // }
        return config;
    },
    err => {
        pending = []
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response => {
        //cancelPending(response.config);
        if(!!response.headers['Authorization']) {
            store.commit('user/setToken',response.headers['Authorization'])
        }
        else if(!!response.headers['authorization']) {
            store.commit('user/setToken',response.headers['authorization'])
        }
        if(!!response.headers['Gotoken']) {
            store.commit('user/setGoToken',response.headers['Gotoken'])
        }
        else if(!!response.headers['gotoken']) {
            store.commit('user/setGoToken',response.headers['gotoken'])
        }
        switch (response.data.status) {
            case 0:
            case 2:
            case 5:
                Notification.warning({
                    message: '提示！',
                    description: response.data.msg,
                    duration: 3
                });
                break
            case 4003:
                if(router.currentRoute.path!='/login') {
                    Notification.warning({
                        message: '提示！',
                        description: response.data.msg,
                        duration: 3
                    });
                }
                store.commit('user/setToken','')
                store.commit('user/clearPermission')
                router.push('/login')
                break
            case 4004:
                // 返回 4004 清除token信息并跳转到登录页面
                if(router.currentRoute.path!='/login') {
                    Notification.warning({
                        message: '提示！',
                        description: '登录已过期。请重新登录',
                        duration: 3
                    });
                }
                store.commit('user/setToken','')
                store.commit('user/clearPermission')
                router.push('/login')
                break
            case 404:
                router.push('/exception/404')
                break
        }
        return response;
    },
    error => {
        pending = [];
        if (error.response) {
            switch (error.response.status) {
                case 400:
                case 401:
                case 404:
                case 500:
                    Notification.error({
                        message: '提示！',
                        description: '网络异常，请重试！',
                        duration: 3
                    });
                    break
            }
            if(typeof (error.response.data) =='object'&&error.response.config.url!='/uplog/pagelog') {
                erroeCollect.errorHttp(error)
            }
        }
        if(!!error.response) {
            return Promise.reject(error.response.data)   // 返回接口返回的错误信息
        }
    }
);


window.appCode=new Vue({
    el: '#app',
    data:{},
    router,
    store,
    template: '<Index/>',
    components: { Index }
})

