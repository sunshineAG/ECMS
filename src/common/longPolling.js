/**
 * Created by cczhuc on 2019/6/21.
 * 长轮询
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
var timestamp;


export default {
    sendMsg:function (data) {
        axios({
            method: 'POST',
            url: '/ecmspoll/postmsg',
            data:{
                data:data
            }
        }).then(response=> {
            if(response.data.status==1) {
                let message = response.data.data
            }
        }).catch(error=> {

        });
    },
    getResponse:function () {
        axios({
            method: 'get',
            url: '/ecmspoll/index',
            params: {
                timeout:120,
                since_time:timestamp || new Date().getTime(),
                category:'user_'+ store.state.user.user.user_id
            },
            timeout:120 * 1000,
        }).then(response=> {
            if(response.data.events.length!=0) {
                let message = response.data.events
                this['cmd'+message.cmd]&&this['cmd'+message.cmd](message)
            }else {

            }
            this.getResponse()
        }).catch(error=> {
            console.log('error',JSON.stringify(error))
            this.getResponse()
        });
    },
    getMsgContent:function() {

    }
}
