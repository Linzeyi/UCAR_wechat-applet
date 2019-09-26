<template>
  <div class="message-wrap page">
    <base-load :loadStatus="loadStatus" @reLoad="post"></base-load>
    <span class="panel header" v-if="unreadMessageList.length">未读消息</span>
    <div class="panel" v-for="(item, index) in unreadMessageList" :key="index">
      <div class="panel__hd title" @click="showUnread(index)" :class="{'unshow': !item.isShow, 'show': item.isShow}">
        <i class="iconfont red-point" v-if="!item.isRead">&#xe606;</i>
        <p>{{ item.content }}</p>
        <div class="title__ft"></div>
      </div>
      <div class="panel__bd" v-if="item.isShow">
        <div class="weui-media-box">
          <p class="weui-media-box__desc">
            {{ item.content }}
          </p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{ item.dateTime }}</li>
          </ul>
        </div>
      </div>
    </div>
    <span class="panel header" v-if="readMessageList.length" style="color: #b3b3b3">已读消息</span>
    <div class="panel" v-for="(item, index) in readMessageList" :key="index">
      <div class="panel__hd title" @click="showReaded(index)" :class="{'unshow': !item.isShow, 'show': item.isShow}">
        <p>{{ item.content }}</p>
        <div class="title__ft"></div>
      </div>
      <div class="panel__bd" v-if="item.isShow">
        <div class="weui-media-box">
          <p class="weui-media-box__desc">
            {{ item.content }}
          </p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{ item.dateTime }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseLoad from '@/components/base/BaseLoad'

export default {
  components: {
    baseLoad
  },
  data () {
    return {
      messageList: [],
      loadStatus: ''
    }
  },
  onShow () {
    // 发送请求获取所有消息
    this.post()
  },
  onUnload () {
    // 退出页面时把已读消息更新到store中
    this.$store.commit('Message/SET_MESSAGE_READ', this.setMessageRead)
    this.setMessageRead.length = 0
  },
  computed: {
    unreadMessageList () {
      return this.$store.getters['Message/newMessageList']
    },
    readMessageList () {
      return this.$store.getters['Message/oldMessageList']
    },
    setMessageRead () {
      return this.$store.state.Message.setMessageRead
    }
  },
  methods: {
    // 展示未读消息
    showUnread (index) {
      if (!this.unreadMessageList[index].isRead) {
        this.$http.post('/action/message/setMessageReaded', {msgId: this.unreadMessageList[index].id})
        this.setMessageRead.push(this.unreadMessageList[index].id)
      }
      this.unreadMessageList[index].isRead = true
      this.unreadMessageList[index].isShow = !this.unreadMessageList[index].isShow
    },
    // 展示已读消息
    showReaded (index) {
      this.readMessageList[index].isShow = !this.readMessageList[index].isShow
    },
    // 获取新消息
    getMessageList () {
      wx.showNavigationBarLoading()
      if (this.setMessageRead.length) {
        this.$store.commit('Message/SET_MESSAGE_READ', this.setMessageRead)
      }
      this.$http.get('/action/message/getAllMessage').then(res => {
        if (res && res.data) {
          this.$store.commit('Message/SET_MESSAGE_LIST', res.data)
        } else {
          wx.showToast({
            title: '获取消息失败',
            icon: 'none'
          })
        }
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      })
    },
    // 发送请求获取所有消息
    post () {
      this.loadStatus = 'loading'
      this.$http.get('/action/message/getAllMessage').then(res => {
        this.loadStatus = 'online'
        if (res && res.data) {
          this.$store.commit('Message/SET_MESSAGE_LIST', res.data)
        } else {
          this.loadStatus = 'offline'
          wx.showToast({
            title: '获取消息失败',
            icon: 'none'
          })
        }
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getMessageList()
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
@large-font: 16px;
@orange: #ff6421;
.page {
  background: #f3f3f375;
  font-family: @baoWoFont;
  height: 100%;
  padding: 5px 10px;
  /deep/ .wrap {
    position: fixed;
    top: 0;
  }
  .header {
    position: relative;
    left: 39%;
    padding: 3px 9px;
    font-size: 12px;
    color: #fca782;
  }
  .panel {
    border-radius: 10px;
    background-color: #ffffff;
    margin: 10px 0;
    position: relative;
    .title {
      display: flex;
      align-items: center;
      .red-point {
        color: @orange;
        margin-right: 8px;
      }
      p {
        font-size: @large-font;
        color: rgb(51, 51, 51);
        white-space: nowrap;
        overflow: hidden;
      }
      .title__ft {
        height: 27px;
        width: 18px;
        box-shadow: -11px 0 9px #ffffff;
        background-color: #ffffff;
        right: 0;
        position: absolute;
      }
    }
    .unshow {
      padding: 15px 0 15px 20px;
    }
    .show {
      margin: 10px 0 0 10px;
      padding: 15px 0 0 10px;
    }
  }
}
</style>