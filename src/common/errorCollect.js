/**
 * Created by cczhuc on 2019/7/1.
 * 前端页面错误收集
 */
var storage = require('./store')
import axios from 'axios'
import Qs from 'qs'
import store from '@/store/store'

// axios响应和拦截器
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
    return Qs.stringify(data)
}];
axios.interceptors.request.use(
    config => {
        let jwtToken = storage.store.get('token');
        if (jwtToken) {
            config.headers.Authorization = jwtToken;
            config.headers['X-CSRF-TOKEN'] = 'token';
        } else {
            store.commit('user/setToken','')
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


export default {
    errorHttp:function (error) {
        axios({
            method: 'POST',
            url: 'http://' + store.state.user.company.public_ip + ':' +  store.state.user.company.server_port + '/uplog/pagelog?',
            data:{
                type:'httpError',
                url:error.response.config.url,   //请求地址
                data:error.response.data.message,    //接口响应内容
                status:error.response.status   //XHR响应状态
            }
        })
    },
    errorPage:function (err, vm, info) {
        axios({
            method: 'POST',
            url: 'http://' + store.state.user.company.public_ip + ':' +  store.state.user.company.server_port + '/uplog/pagelog?',
            data:{
                type:'pageError',
                data:JSON.stringify(err),   //err对象
                info:JSON.stringify(info)    //Vue 特定的错误信息，比如错误所在的生命周期钩子
            }
        })
    },
    errSocket:function (error) {
        let obj = {}
        for(var i in error){
            obj[i] = error[i]
        }
        axios({
            method: 'POST',
            url: 'http://' + store.state.user.company.public_ip + ':' +  store.state.user.company.server_port + '/uplog/pagelog?',
            data:{
                type:'socketError',
                code:error.code,   //错误码
                url:error.currentTarget.url,    //连接地址
                readyState:error.currentTarget.readyState,    //socket状态
                data:JSON.stringify(obj)
            }
        })
    }
}
