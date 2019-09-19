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
    addressList: addressList,
    editAddress: undefined,
    isEdited: false
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
  mutations: {
    SET_EDITADDRESS (state, addr) {
      state.editAddress = addr
    },
    ADDR_IS_EIDT (state, addr) {
      state.isEdited = false
      if (state.editAddress) {
        for (const key in addr) {
          if (state.editAddress.hasOwnProperty(key)) {
            if (key !== 'region') {
              if (addr[key] !== state.editAddress[key]) {
                state.isEdited = true
                break
              }
            } else {
              for (let i = 0; i < addr[key].length; i++) {
                if (addr[key][i] !== state.editAddress[key][i]) {
                  state.isEdited = true
                }
              }
            }
          }
        }
      }
    }
  },
  actions: {
    modifyAddress (addr) {},
    deleteSAddress (addrId) {},
    setDefaultAddress (addr) {
      this.state.defaultAddress = addr
    }
  }
}
