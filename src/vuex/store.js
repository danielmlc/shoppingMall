import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
//导入模块
import tree from './modules/tree'
import global from './modules/global'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tree,
        global,
    }
})