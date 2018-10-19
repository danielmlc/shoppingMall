import * as types from '../types'

export const Current_Node='Current_Node'
export const Current_Event='Current_Event'
 /* 
全局状态值
 */
const state = {
    currentNode:{},
    currentEvent:'',

}

const actions = {
    setcurrentNode({ commit }, status) {
        commit(types.Current_Node, status)
    },
    setcurrentEvent({ commit }, status) {
        commit(types.Current_Event, status)
    },
}

const getters = {
    getcurrentNode: status =>status.currentNode,
    getcurrentEvent: status =>status.currentEvent,
}

const mutations = {
    [types.Current_Node](state, status) {
        state.currentNode = status
    },
    [types.Current_Event](state, status) {
        state.currentEvent = status
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}