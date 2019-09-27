import Utils from '@/utils/index.js'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    socket: undefined,
    messageList: undefined, // status: 0未读 1已读
    connection: 10, // 断开重新连接次数
    setMessageRead: [],
    FIRST_CONNECTION: 3, // 初次连接失败可允许的重连次数
    DURATION: 10000, // 重连间隔时间 ms
    showMessageToast: false, // 控制新消息toast
    toastTimer: 0, // 多条新消息弹窗定时器
    closeToastTimer: 0 // 关闭新消息弹窗定时器
  },
  getters: {
    socket: state => state.socket,
    newMessageList: state => {
      return (state.messageList ? false : []) ||
        state.messageList.filter(item => item.status === 0)
          .map(item => {
            item.dateTime = Utils.timestampTo(item.createTime)
            Vue.set(item, 'isRead', false)
            Vue.set(item, 'isShow', false)
            return item
          })
    },
    oldMessageList: state => {
      return (state.messageList ? false : []) ||
        state.messageList.filter(item => item.status === 1)
          .map(item => {
            item.dateTime = Utils.timestampTo(item.createTime)
            Vue.set(item, 'isShow', true)
            return item
          })
    },
    messageNum: state => {
      return state.messageList ? state.messageList.length : 0
    },
    newMessageNum: (state, getters) => {
      return getters.newMessageList.length || 0
    },
    showMessageToast: state => state.showMessageToast
  },
  mutations: {
    SET_MESSAGE_LIST (state, list) {
      if (list) {
        state.messageList = list
      }
    },
    CONNECT_WEBSOCKET (state) {
      let that = this
      try {
        state.socket = wx.connectSocket({
          url: 'ws://10.104.118.231:8080/trainljsys/websocket/' + this.getters['UserCenter/id'],
          // url: 'ws://10.112.11.18:8090',
          // url: 'ws://localhost:8181',
          // url: 'ws://10.112.172.101:8181',
          success () {
            console.log('[Socket] 创建连接…')
          }
        })
        wx.onSocketOpen(() => {
          console.log('[Socket] 连接成功！')
          state.connection = 10
          wx.sendSocketMessage({
            data: '前端连接成功！'
          })
        })
        wx.onSocketClose(() => {
          if (state.connection > 0) {
            console.log(`[Socket] 重新连接…${11 - state.connection}`)
            state.connection--
            setTimeout(() => that.commit('Message/CONNECT_WEBSOCKET'), 10000)
          } else {
            console.log('[Socket] 连接超时')
          }
        })
        wx.onSocketMessage(res => {
          if (res.data !== '连接成功') {
            console.log('[Socket] 收到一条消息：', JSON.parse(res.data))
            // 把已读消息更新到store中
            that.commit('Message/SET_MESSAGE_READ', that.state.Message.setMessageRead)
            state.setMessageRead.length = 0
            that.commit('Message/ADD_NEW_MESSAGE', JSON.parse(res.data))
            // 显示消息弹窗
            that.commit('Message/SHOW_MESSAGE_TOAST')
            // 设置关闭弹窗定时器
            clearTimeout(state.closeToastTimer)
            state.closeToastTimer = 0
            state.closeToastTimer = setTimeout(() => {
              state.showMessageToast = false
            }, 10000)
          } else {
            console.log('[Socket] 收到一条消息：', res.data)
          }
        })
      } catch (e) {
        console.log('[Socket Error]', e)
      }
    },
    CLOSE_WEBSOCKET (state) {
      if (state.socket && state.socket.readyState === 1) {
        wx.closeSocket()
        state.socket = undefined
      }
      wx.onSocketClose(() => {
        console.log('[Socket] 关闭socket')
      })
    },
    ADD_NEW_MESSAGE (state, message) {
      state.messageList.unshift(message)
    },
    SET_MESSAGE_READ (state, idList) {
      for (const id of idList) {
        for (const message of state.messageList) {
          if (id === message.id) {
            message.status = 1 - message.status
          }
        }
      }
      state.setMessageRead.length = 0
    },
    RESET_MESSAGE_LIST (state) {
      state.messageList = undefined
    },
    SHOW_MESSAGE_TOAST (state) {
      if (state.showMessageToast) {
        state.showMessageToast = false
        clearTimeout(state.toastTimer)
        state.toastTimer = 0
        state.toastTimer = setTimeout(() => {
          state.showMessageToast = true
        }, 200)
      } else {
        state.showMessageToast = true
      }
    }
  },
  actions: {
    initWebSocket ({ commit, state }) {
      commit('CONNECT_WEBSOCKET')
      console.log('connect webSocket!')
      let connectSocket = setInterval(() => {
        if (state.socket || state.FIRST_CONNECTION < 1) {
          if (state.FIRST_CONNECTION < 1) {
            console.log('[socket] 连接失败')
          }
          clearInterval(connectSocket)
        } else {
          state.FIRST_CONNECTION--
          console.log('[socket] 初次登录连接')
          commit('CONNECT_WEBSOCKET')
        }
      }, 5000)
    }
  }
}
