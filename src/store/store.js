/**
 * Created by Administrator on 2017/5/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import user from './modules/user'
import liveChat from './modules/liveChat'
import editMaterial from './modules/editMaterial'
import navPath from './modules/navPath'
Vue.use(Vuex)



const store = new Vuex.Store({
    modules: {
        setting,
        user,
        liveChat,
        editMaterial,
        navPath
    }
})


export default store