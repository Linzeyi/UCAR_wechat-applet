import { addressList } from '@/fake.js'
export default {
  namespaced: true,
  state: {
    balance: undefined, // 余额
    integral: undefined, // 积分
    accountLevel: undefined, // 账户星级
    phone: undefined, // 手机号
    orderNum: undefined, // 订单条数
    message: undefined, // 消息条数
    defaultAddress: addressList[0],
    selectedAddress: {},
    addressList: addressList
  },
  getters: {
    defaultAddress: state => state.defaultAddress,
    selectedAddress: state => {
      let addr = state.selectedAddress
      if (addr.region) {
        addr.address = addr.region.toString().replace(/,/g, '') + addr.address
      }
      return addr
    },
    addressList: state => state.addressList
  },
  mutations: {},
  actions: {
    modifyAddress (addr) {},
    deleteSAddress (addrId) {},
    setDefaultAddress (addr) {
      this.state.defaultAddress = addr
    }
  }
}
