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
    defaultAddress: undefined,
    selectedAddress: undefined,
    addressList: addressList
  },
  getters: {
    defaultAddress: state => {
      return state.addressList.find(item => {
        if (item.isDefault) {
          state.defaultAddress = item
          return item
        }
      })
    },
    selectedAddress: (state, getters) => {
      let addr = state.selectedAddress
      if (!addr) {
        addr = getters.defaultAddress
        if (!addr) {
          addr = ''
          return addr
        }
      }
      if (addr && addr.region) {
        addr.address = addr.region.toString().replace(/,/g, '') + addr.address
      }
      return addr
    },
    addressList: state => {
      let addrList = state.addressList
      for (let i = 0; i < addrList.length; i++) {
        if (addrList[i].isDefault && i !== 0) {
          let addr = addrList[0]
          addrList[0] = addrList[i]
          addrList[i] = addr
        }
      }
      return addrList
    }
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
