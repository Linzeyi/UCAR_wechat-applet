import Vue from 'vue'
import $http from '@/api/http.js'
export default {
  namespaced: true,
  state: {
    balance: '0.00', // 余额
    integral: '0', // 积分
    grade: '塑料', // 账户星级
    growth: '0', // 成长值
    phone: undefined, // 手机号
    orderNum: undefined, // 订单条数
    message: undefined, // 消息条数
    selectedAddress: undefined, // 选择地址id
    addressList: [],
    editAddress: undefined,
    isEdited: false
  },
  getters: {
    balance: state => state.balance,
    orderNum: state => state.orderNum,
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
        let para = JSON.parse(JSON.stringify(addr))
        para.address = para.region.toString().replace(/,/g, '') + para.address
        return para
      } else {
        let para = JSON.parse(JSON.stringify(getters.addressList[0]))
        if (para) {
          para.address = para.region.toString().replace(/,/g, '') + para.address
        }
        return para
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
    },
    FIRST_LOGIN_GET_DATA (state) {
      // 获取所有消息
      $http.get('/action/message/getAllMessage').then(res => {
        console.log(res.data, 'all message')
        this.commit('Message/SET_MESSAGE_LIST', res.data)
      })
      // 获取所有地址
      $http.get('/action/addr/list').then(res => {
        if (res) {
          this.commit('UserCenter/SET_ADDRESS_LIST', res.data.addressList)
        } else {
          wx.showToast({
            title: '获取地址失败',
            icon: 'none'
          })
        }
      })
      // 获取个人信息
      $http.get('/action/user/detail').then(res => {
        if (res.data) {
          console.log(res.data, 'user info')
          state.balance = res.data.balance + ''
          if (state.balance.search('.') === -1) {
            state.balance += '.00'
          }
          state.integral = res.data.integral + ''
          state.grade = res.data.grade
          state.growth = res.data.growth + ''
        }
      })
    },
    GET_REAL_TIME_DATA (state) {
      // 获取账户余额
      $http.get('/action/wallet/getBalance').then(res => {
        if (res) {
          let para = res.data.balance + ''
          if (para.search('.') === -1) {
            para += '.00'
          }
          state.balance = para
        }
      })
      // 获取订单数量
      $http.get('/action/order/getOrderList', {
        status: -1,
        start: 0,
        size: 100
      }).then(res => {
        if (res) {
          state.orderNum = res.data.length
        }
      })
    }
  },
  actions: {}
}
