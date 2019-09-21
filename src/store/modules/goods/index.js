// import { goodsList } from '@/fake.js'
export default {
  namespaced: true,
  state: {
    isShowTypeDialog: false
  },
  getters: {
    isShowTypeDialog: state => state.isShowTypeDialog
  },
  mutations: {
    SET_SHOWTYPEDIALOG (state, flag) {
      state.isShowTypeDialog = flag
    }
  },
  actions: {
  }
}
