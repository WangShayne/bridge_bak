import { getBridgeList } from '@/api/bridges'

const state = {
  list: []
}

const mutations = {
  SET_BRIDGE_LIST: (state, list) => {
    state.list = list
  }
}

const actions = {
  getList({ commit }) {
    return new Promise((resolve, reject) => {
      getBridgeList().then(response => {
        console.log(response)
        const { result } = response
        result.records.forEach(item => {
          item.isWarning = false
        })
        commit('SET_BRIDGE_LIST', result.records)
        resolve(result.records)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
