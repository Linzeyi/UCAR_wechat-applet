<template>
  <div class="message-wrap page">
    <div class="panel" v-for="(item, index) in unreadMessageList" :key="index">
      <div class="panel__hd title" @click="showUnread(index)" :class="{'unshow': !item.isShow, 'show': item.isShow}">
        <i class="iconfont red-point" v-if="!item.isRead">&#xe606;</i>
        <p>{{ item.content }}</p>
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
    <div class="panel" v-for="(item, index) in readMessageList" :key="index">
      <div class="panel__hd title" @click="showReaded(index)" :class="{'unshow': !item.isShow, 'show': item.isShow}">
        <p>{{ item.content }}</p>
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
import { messageList } from '@/fake.js'
export default {
  data () {
    return {
      messageList: messageList
    }
  },
  onLoad () {
    // this.$http.get('/action/message/getAllMessage', { userId: 123 }).then(res => {
    //   console.log(res.data, 'all message')
    // })
    this.$store.commit('Message/SET_MESSAGE_LIST', messageList)
  },
  computed: {
    unreadMessageList () {
      // console.log(this.$store.getters['Message/newMessageList'], 'new message')
      return this.$store.getters['Message/newMessageList']
    },
    readMessageList () {
      // console.log(this.$store.getters['Message/oldMessageList'], 'old message')
      return this.$store.getters['Message/oldMessageList']
    }
  },
  methods: {
    // 展示未读消息
    showUnread (index) {
      this.unreadMessageList[index].isRead = true
      this.unreadMessageList[index].status = 1 - this.unreadMessageList[index].status
    },
    // 展示已读消息
    showReaded (index) {
      this.readMessageList[index].isShow = !this.readMessageList[index].isShow
    },
    // 获取新消息
    getMessageList () {
      wx.showNavigationBarLoading()
      setTimeout(() => {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }, 2000)
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
.page {
  background: #f3f3f375;
  font-family: @baoWoFont;
  height: 100%;
  padding: 5px 10px;
  .panel {
    border-radius: 10px;
    background-color: #ffffff;
    margin: 10px 0;
    .title {
      display: flex;
      align-items: center;
      .red-point {
        color: #e8073c;
        margin-right: 8px;
      }
      p {
        font-size: @large-font;
        color: rgb(51, 51, 51);
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