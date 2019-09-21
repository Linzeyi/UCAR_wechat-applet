import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    balance: undefined, // 余额
    integral: undefined, // 积分
    accountLevel: undefined, // 账户星级
    phone: undefined, // 手机号
    orderNum: undefined, // 订单条数
    message: undefined, // 消息条数
    selectedAddress: undefined, // 选择地址id
    addressList: [],
    editAddress: undefined,
    isEdited: false
  },
  getters: {
    defaultAddress: state => {
      if (state.addressList.length) {
        return state.addressList.find(item => {
          if (item.isDefault) {
            return item.id
          }
        })
      } else {
        return undefined
      }
    },
    selectedAddress: (state, getters) => {
      if (state.selectedAddress) {
        let addr = state.addressList.find(item => {
          return item.id === state.selectedAddress
        })
        addr.address = addr.region.toString().replace(/,/g, '') + addr.address
        return addr
      } else {
        let addr = getters.addressList[0]
        if (addr) {
          addr.address = addr.region.toString().replace(/,/g, '') + addr.address
        }
        return addr
      }
    },
    // 排序，默认地址在最前
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
    SET_SELECTED_ADDRESS (state, addrId) {
      state.selectedAddress = addrId
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
    },
    SET_ADDRESS_LIST (state, addrList) {
      console.log(state.selectedAddress, '[selected]set addressList')
      if (addrList && addrList.length !== 0) {
        state.addressList.length = 0
        for (const addr of addrList) {
          let data = {
            id: addr.id,
            receiverName: addr.receiver,
            receiverPhone: addr.phone,
            postCode: addr.postCode,
            region: [addr.province, addr.city, addr.district],
            address: addr.addressDetail,
            isDefault: Boolean(addr.isDefault)
          }
          if (data.isDefault) {
            if (!state.selectedAddress) {
              state.selectedAddress = addr.id
              Vue.set(data, 'isSelected', true)
              // data.isSelected = true
            } else {
              Vue.set(data, 'isSelected', false)
              // data.isSelected = false
            }
          } else if (!state.selectedAddress && addr.id === state.selectedAddress) {
            Vue.set(data, 'isSelected', true)
            // data.isSelected = true
          } else {
            Vue.set(data, 'isSelected', false)
            // data.isSelected = false
          }
          state.addressList.push(data)
        }
      }
    }
  },
  actions: {}
}
