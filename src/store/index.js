import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      userInfo: null
    }
  },
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    }
  },
  actions: {
  },
  modules: {
  }
})
