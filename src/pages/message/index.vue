<template>
  <div class="message-wrap page">
    <div class="weui-panel" v-for="(item, index) in unreadMessage" :key="index">
      <div class="weui-panel__hd title" @click="showUnread(index)">
        <i class="iconfont red-point" v-if="item.isRead">&#xe606;</i>
        <p>{{ item.title }}</p>
      </div>
      <div class="weui-panel__bd" v-if="item.isShow">
        <div class="weui-media-box">
          <p class="weui-media-box__desc">
            {{ item.desc }}
          </p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{ item.date }}</li>
            <li class="weui-media-box__info__meta">{{ item.time }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="weui-panel" v-for="(item, index) in readedMessage" :key="index">
      <div class="weui-panel__hd title" @click="showReaded(index)">
        <p>{{ item.title }}</p>
      </div>
      <div class="weui-panel__bd" v-if="item.isShow">
        <div class="weui-media-box">
          <p class="weui-media-box__desc">
            {{ item.desc }}
          </p>
          <ul class="weui-media-box__info">
            <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">{{ item.date }}</li>
            <li class="weui-media-box__info__meta">{{ item.time }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      unreadIsShow: false,
      unreadMessage: [
        {
          title: '第一条未读消息',
          desc: '111未读消息未读消息未读消息未读消息未读消息未读消息未读消息未读消息未读消息未读消息',
          date: '2019年9月6日',
          time: '10:00:00',
          isShow: false,
          isRead: true
        },
        {
          title: '第二条未读消息',
          desc: '222未读消息未读消息未读消息未读消息未读消息未读消息未读消息未读消息未读消息未读消息',
          date: '2018年9月6日',
          time: '08:00:00',
          isShow: false,
          isRead: true
        }
      ],
      readedMessage: [
        {
          title: '第一条已读消息',
          desc: '111已读消息已读消息已读消息已读消息已读消息已读消息已读消息已读消息已读消息已读消息',
          date: '2019年9月6日',
          time: '13:03:00',
          isShow: true
        },
        {
          title: '第二条已读消息',
          desc: '222已读消息已读消息已读消息已读消息已读消息已读消息已读消息已读消息已读消息已读消息',
          date: '2018年9月6日',
          time: '10:30:00',
          isShow: true
        }
      ]
    }
  },
  methods: {
    // 展示未读消息
    showUnread (index) {
      this.unreadMessage[index].isShow = !this.unreadMessage[index].isShow
      this.unreadMessage[index].isRead = false
    },
    // 展示已读消息
    showReaded (index) {
      this.readedMessage[index].isShow = !this.readedMessage[index].isShow
    }
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
}
</style>