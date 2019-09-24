import Utils from '@/utils/index.js'
import Vue from 'vue'
import { clearInterval } from 'timers'

export default {
  namespaced: true,
  state: {
    socket: undefined,
    messageList: undefined, // status: 0未读 1已读
    connection: 10, // 断开重新连接次数
    setMessageRead: [],
    FIRST_CONNECTION: 10, // 初次连接失败可允许的重连次数
    DURATION: 10000 // 重连间隔时间 ms
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
    }
  },
  mutations: {
    SET_MESSAGE_LIST (state, list) {
      state.messageList = list
    },
    INIT_WEBSOCKET (state) {
      let that = this
      try {
        state.socket = wx.connectSocket({
          url: 'ws://10.104.118.231:8080/trainljsys/websocket/' + this.state.UserInfo.userInfo.id,
          // url: 'ws://10.112.11.18:8090',
          // url: 'ws://localhost:8181',
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
            setTimeout(() => that.commit('Message/INIT_WEBSOCKET'), 10000)
          } else {
            console.log('[Socket] 连接超时')
          }
        })
        wx.onSocketMessage(res => {
          if (res.data !== '连接成功') {
            console.log('[Socket] 收到一条消息JSON：', JSON.parse(res.data))
            // 把已读消息更新到store中
            that.commit('Message/SET_MESSAGE_READ', that.state.Message.setMessageRead)
            that.state.Message.setMessageRead.length = 0
            that.commit('Message/ADD_NEW_MESSAGE', JSON.parse(res.data))
          } else {
            console.log('[Socket] 收到一条消息JSON：', res.data)
          }
        })
      } catch (e) {
        console.log('[Socket Error]', e)
      }
    },
    CLOSE_WEBSOCKET (state) {
      if (state.socket) {
        state.socket.closeSocket()
      }
      console.log('[Socket] 关闭socket')
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
    }
  },
  actions: {
    initWebSocket ({ commit }, state) {
      // commit('Message/CONNECT_WEBSOCKET')
      console.log('connect webSocket!')
      let connectSocket = setInterval(() => {
        if (state.socket || state.FIRST_CONNECTION < 1) {
          clearInterval(connectSocket)
        } else {
          state.FIRST_CONNECTION--
          // commit('Message/CONNECT_WEBSOCKET')
          console.log('connect webSocket!')
        }
      }, 10000)
    }
  }
}
