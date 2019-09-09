<template>
  <div class="userCenter-wrap">
    <div class="user-info">
      <div>
        <img src="../../../static/images/user.png" alt="" class="user-icon">
      </div>
      <div class="info">
        <div class="user-name">
          <p class="name">{{ accountName }}</p><span>{{ accountLevel }}</span>
        </div>
        <p>积分：{{ integral }}</p>
      </div>
      <i class="iconfont setting">&#xe61f;</i>
    </div>
    <div class="phone">
      <p>{{ encodePhone }}</p>
    </div>
    <div class="weui-cells">
      <div class="weui-cell" @click="routeTo('wallet')">
        <div class="weui-cell__hd">
          <i class="iconfont">&#xe697;</i>
        </div>
        <div class="weui-cell__bd">
          <p>我的钱包</p>
        </div>
        <span class="weui-cell__ft">
          <p>{{ balance }}元<i class="iconfont">&#xe601;</i></p>
        </span>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <i class="iconfont">&#xe643;</i>
        </div>
        <div class="weui-cell__bd">
          <p>我的订单</p>
        </div>
        <span class="weui-cell__ft">
          <p>{{ orderNum }}条<i class="iconfont">&#xe601;</i></p>
        </span>
      </div>
      <div class="weui-cell" @click="routeTo('address')">
        <div class="weui-cell__hd">
          <i class="iconfont">&#xe686;</i>
        </div>
        <div class="weui-cell__bd">
          <p>地址管理</p>
        </div>
        <span class="weui-cell__ft">
          <i class="iconfont">&#xe601;</i>
        </span>
      </div>
      <div class="weui-cell" @click="routeTo('message')">
        <div class="weui-cell__hd">
          <i class="iconfont">&#xe7a2;</i>
        </div>
        <div class="weui-cell__bd">
          <p>我的消息</p>
        </div>
        <span class="weui-cell__ft">
          <p>{{ messageNum }}条<i class="iconfont">&#xe601;</i></p>
        </span>
      </div>
    </div>
    <button class="weui-btn" @click="routeTo('search')" style="margin-top: 20px;">搜索</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accountName: 'ThO', // 用户名
      accountLevel: '钻石', // 账户星级
      integral: 135, // 积分
      phone: '13015768195', // 手机号码
      balance: '100.00', // 余额
      orderNum: 20, // 订单数
      messageNum: 2 // 消息数
    }
  },
  created () {

  },
  computed: {
    // 电话号码加密
    encodePhone () {
      var str = this.phone.slice(0, 3) + '****' + this.phone.slice(7)
      return str
    }
  },
  methods: {
    // 跳转页面
    routeTo (type) {
      switch (type) {
        case 'wallet':
          mpvue.navigateTo({ url: '/pages/wallet/main' })
          break
        case 'address':
          mpvue.navigateTo({ url: '/pages/address/main' })
          break
        case 'message':
          mpvue.navigateTo({ url: '/pages/message/main' })
          break
        case 'search':
          mpvue.navigateTo({ url: '/pages/search/main' })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
.userCenter-wrap {
  color: @baoWoBlack;
  font-family: @baoWoFont;
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user-icon {
      height: 80px;
      width: 80px;
      flex: 5;
      padding: 0 5px;
      border-radius: 50%;
    }
    .info {
      flex: 3;
      & > p {
        font-size: 0.3rem;
      }
      .user-name {
        display: flex;
        .name {
          font-family: 'PingFangSC';
        }
        span {
          border: 0.5px solid rgb(247, 97, 97);
          border-radius:5px;
          background-color: rgb(255, 171, 171);
          padding: 0 8px;
          margin-left: 18px;
          font-size: 0.25rem;
          align-self: center;
          color: rgb(253, 77, 77);
          line-height: inherit;
        }
      }
    }
    .setting {
      font-size: 0.6rem;
      flex: 0.7;
    }
  }
  .phone {
    margin-left: 15px;
    p {
      font-size: 0.3rem;
    }
  }
  .weui-cells {
    box-shadow: 0 3px 3px rgb(223, 223, 223), 0 -0.8px 4px rgb(223, 223, 223);
    p {
      padding: 5px 0;
    }
    .weui-cell__hd .iconfont {
      font-size: 0.5rem;
      margin-right: 9px;
    }
    .weui-cell__ft .iconfont {
      font-size: 0.3rem;
    }
  }
}
</style>