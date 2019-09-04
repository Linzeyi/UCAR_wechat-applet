export default {
  namespaced: true,
  state: {
    date: 'index date'
  },
  getters: {
    date: state => state.date // 调用写法 this.$store.getters['Index/date']
  },
  mutations: {
    SET_DATE (state, date) { // 调用写法 this.$store.commit('Index/SET_DATE)
      state.date = date
    }
  },
  actions: {
    ShowStore ({commit}) { // 调用写法 this.$store.dispatch('Index/ShowStore')
      console.log('indexStore')
      return 'index'
    }
  }
}
