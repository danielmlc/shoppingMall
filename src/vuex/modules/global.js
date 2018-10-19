import * as types from '../types'

export const GLOBAL_OBJECT1='GLOBAL_OBJECT1'
export const GLOBAL_OBJECT2='GLOBAL_OBJECT2'
export const GLOBAL_OBJECT3='GLOBAL_OBJECT3'
export const GLOBAL_STRING1='GLOBAL_STRING1'
export const GLOBAL_STRING2='GLOBAL_STRING2'
export const GLOBAL_ARRAY1='GLOBAL_ARRAY1'

 /* 
全局状态值
 */
const state = {
    global_object1:{},
    global_object2:{},
    global_object3:{},
    global_string1:'',
    global_string2:'',
    global_array1:[]

}

const actions = {
    setGlobObject1({ commit }, status) {
        commit(types.GLOBAL_OBJECT1, status)
    },
    setGlobObject2({ commit }, status) {
        commit(types.GLOBAL_OBJECT2, status)
    },
    setGlobObject3({ commit }, status) {
        commit(types.GLOBAL_OBJECT3, status)
    },
    setGlobString1({ commit }, status) {
        commit(types.GLOBAL_STRING1, status)
    },
    setGlobString2({ commit }, status) {
        commit(types.GLOBAL_STRING2, status)
    },
    setGlobalArray1({ commit }, status) {
        commit(types.GLOBAL_ARRAY1, status)
    }
}

const getters = {
        getGlobObject1: status =>status.global_object1,
        getGlobObject2: status =>status.global_object2,
        getGlobObject3: status =>status.global_object3,
        getGlobString1: status =>status.global_string1,
        getGlobString2: status =>status.global_string2,
        getGlobArray1: status =>status.global_array1,
}

const mutations = {
    [types.GLOBAL_OBJECT1](state, status) {
        state.global_object1 = status
    },
    [types.GLOBAL_OBJECT2](state, status) {
        state.global_object2 = status
    },
    [types.GLOBAL_OBJECT3](state, status) {
        state.global_object3 = status
    },
    [types.GLOBAL_STRING1](state, status) {
        state.global_string1 = status
    },
    [types.GLOBAL_STRING2](state, status) {
        state.global_string2 = status
    },
    [types.GLOBAL_ARRAY1](state, status) {
        state.global_array1 = status
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}