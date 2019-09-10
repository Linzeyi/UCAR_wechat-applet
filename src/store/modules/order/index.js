export default {
  namespaced: true,
  state: {
    statusList: [
      '待付款', '待发货', '待收货', '已完成', '已取消'
    ],
    order: {
      status: 0,
      remark: '',
      createTime: '',
      addressInfo: {
        name: '',
        phone: '',
        address: ''
      },
      goodsList: []
    }
  },
  getters: {
    statusList: state => state.statusList,
    goodsList: state => state.order.goodsList,
    order: state => state.order,
    addressInfo: state => state.order.addressInfo
  },
  mutations: {
    SET_GOODSLIST (state, goodsList) {
      state.order.goodsList = goodsList
    },
    SET_ADDRESSINFO (state, addressInfo) {
      state.order.addressInfo = addressInfo
    },
    SET_ORDER (state, order) {
      state.order = order
    }
  },
  actions: {
    ShowStore ({commit}) {
      console.log('indexStore')
      return 'index'
    }
  }
}
