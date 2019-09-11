import {orderList} from '@/fake.js'
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
    },
    orderList: orderList
  },
  getters: {
    statusList: state => state.statusList,
    goodsList: state => state.order.goodsList,
    order: state => state.order,
    addressInfo: state => state.order.addressInfo,
    orderList: state => state.orderList
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
    },
    INIT_ORDER (state) {
      state.order = {
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
    ADD_ORDER (state, order) {
      state.orderList.push(order)
    },
    INIT_ORDERLIST (state) {
      state.orderList = orderList
    }
  },
  actions: {
    ShowStore ({commit}) {
      console.log('indexStore')
      return 'index'
    }
  }
}
