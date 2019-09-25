<template>
  <div class="userCenter-wrap">
    <BaseNavigationBar name="个人中心"></BaseNavigationBar>
    <BaseCustomBox>
      <div class="not-logged" v-if="!isLogged">
        <div class="log-in">
          <img src="../../../static/images/user.png" alt="我的头像" class="user-icon">
          <div class="btn-login" @click="login">登录</div>
        </div>
      </div>
      <div class="logged-in" v-else>
        <div class="user-info" @click="routeTo('personalSettings')">
          <div>
            <img :src="avatarUrl" alt="" class="user-icon">
          </div>
          <div class="info">
            <div class="user-name">
              <p class="name">{{ nickname }}</p><span>{{ grade }}</span>
            </div>
            <p>积分：{{ integral }}</p>
          </div>
          <i class="iconfont setting">&#xe61f;</i>
        </div>
        <div class="phone">
          <p>{{ phone }}</p>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell" @click="routeTo('wallet')">
          <div class="weui-cell__hd">
            <!-- <i class="iconfont">&#xe62b;</i> -->
            <img src="../../../static/images/wallet.svg" class="action-icon">
          </div>
          <div class="weui-cell__bd">
            <p>我的钱包</p>
          </div>
          <span class="weui-cell__ft">
            <p>{{ balance }}元<i class="iconfont">&#xe601;</i></p>
          </span>
        </div>
        <div class="weui-cell" @click="routeTo('order')">
          <div class="weui-cell__hd">
            <!-- <i class="iconfont">&#xe602;</i> -->
            <img src="../../../static/images/order.svg" class="action-icon">
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
            <!-- <i class="iconfont">&#xe686;</i> -->
            <img src="../../../static/images/address.svg" class="action-icon">
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
            <!-- <i class="iconfont">&#xe7a2;</i> -->
            <img src="../../../static/images/message.svg" class="action-icon">
          </div>
          <div class="weui-cell__bd">
            <p>我的消息</p>
            <span class="weui-badge" v-if="newMessageNum > 0" style="background-color: #ff6421">{{ newMessageNum }}</span>
          </div>
          <span class="weui-cell__ft">
            <p>{{ messageNum }}条<i class="iconfont">&#xe601;</i></p>
          </span>
        </div>
      </div>
    </BaseCustomBox>
  </div>
</template>

<script>
import BaseNavigationBar from "@/components/base/BaseNavigationBar";
import BaseCustomBox from "@/components/base/BaseCustomBox";

export default {
  components: {
    BaseNavigationBar,
    BaseCustomBox
  },
  data () {
    return {
      isLogged: false // 登录标示
    }
  },
  onShow () {
    // 判断是否登录
    if (wx.getStorageSync('token')) {
      this.isLogged = true
    } else {
      this.isLogged = false
    }
    if (this.isLogged) {
      // 第一次登录加载地址
      if (this.$store.getters['UserCenter/addressList'].length === 0) {
        console.log('address!!')
        this.$store.commit('UserCenter/GET_ADDRESS_LIST')
      }
      console.log(this.$store.getters['UserCenter/addressList'], 'address')
      // 加载个人中心所需数据
      this.$store.commit('UserCenter/FIRST_LOGIN_GET_DATA')
    }
  },
  computed: {
    // 用户名
    nickname () {
      return this.$store.getters['UserCenter/nickname'] || '你好'
    },
    // 头像
    avatarUrl () {
      return this.$store.getters['UserCenter/avatarUrl'] || '/../../static/images/user.png'
    },
    // 电话号码
    phone () {
      return this.$store.getters['UserCenter/phone'] || '13*********'
    },
    // 余额
    balance () {
      return this.$store.getters['UserCenter/balance'] || '0.00'
    },
    // 积分
    integral () {
      return this.$store.getters['UserCenter/integral'] || '0'
    },
    // 等级
    grade () {
      return this.$store.getters['UserCenter/grade'] || '青铜'
    },
    // 订单条数
    orderNum () {
      return this.$store.getters['UserCenter/orderNum'] || '0'
    },
    // 新消息条数
    newMessageNum () {
      return this.$store.getters['Message/newMessageNum']
    },
    // 总消息条数
    messageNum () {
      return this.$store.getters['Message/messageNum']
    }
  },
  methods: {
    // 登录
    login () {
      mpvue.navigateTo({ url: '/pages/login/main' })
    },

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
        case 'order':
          mpvue.navigateTo({ url: '/pages/myOrders/main' })
          break
        case 'personalSettings':
          mpvue.navigateTo({ url: '/pages/personalSettings/main' })
          break
      }
    },
    test () {
      this.$store.commit('Message/INIT_WEBSOCKET')
      // this.$store.dispatch('Message/initWebSocket')
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
@orange: #ff6421;
.userCenter-wrap {
  color: @baoWoBlack;
  font-family: @baoWoFont;
  height: 100%;
  .not-logged {
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // --animation begin--
    position:relative;
    background: linear-gradient(60deg, #fc7439 0%, rgb(253, 207, 148) 100%);
    .inner-header {
      height:65vh;
      width:100%;
      margin: 0;
      padding: 0;
    }
    .waves {
      position:relative;
      width: 100%;
      height:15vh;
      margin-bottom:-7px; /*Fix for safari gap*/
      min-height:100px;
      max-height:150px;
    }
    /* Animation */
    .parallax > use {
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
    }
    .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }
    .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }
    .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }
    @keyframes move-forever {
      0% {
      transform: translate3d(-90px,0,0);
      }
      100% { 
        transform: translate3d(85px,0,0);
      }
    }
    /*Shrinking for mobile*/
    @media (max-width: 768px) {
      .waves {
        height:40px;
        min-height:40px;
      }
      .content {
        height:30vh;
      }
      h1 {
        font-size:24px;
      }
    }
    // --animation end--
    .log-in {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .user-icon {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin: 0 15px;
      }
      .btn-login {
        font-size: 12px;
        padding: 2px 10px;
        background-color: @orange;
        color: #ffffff;
        border-radius: 5px;
        margin-top: 5px;
      }
    }
  }
  .logged-in {
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .user-info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .user-icon {
        height: 60px;
        width: 60px;
        flex: 5;
        border-radius: 50%;
        margin: 0 15px 0 18px;
      }
      .info {
        flex: 3;
        & > p {
          font-size: 13px;
        }
        .user-name {
          display: flex;
          .name {
            font-family: 'PingFangSC';
            font-size: 18px;
          }
          span {
            border: 0.5px solid @orange;
            border-radius:5px;
            background-color: rgb(255, 171, 171);
            padding: 0 5px;
            margin-left: 10px;
            font-size: 10px;
            align-self: center;
            color: @orange;
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
      margin-left: 10px;
      p {
        font-size: 13px;
      }
    }
  }
  .weui-cells {
    box-shadow: 0 3px 3px rgb(223, 223, 223), 0 -0.3px 4px rgb(223, 223, 223);
    margin-top: 0;
    p {
      padding: 5px 0;
    }
    .weui-cell {
      height: 45px;
      // .weui-cell__hd .iconfont {
        // font-size: 0.5rem;
        // margin-right: 9px;
        // color: @orange;
      // }
      .action-icon {
        height: 23px;
        width: 23px;
        margin-right: 9px;
      }
      .weui-cell__bd {
        p {
          display: inline-block;
        }
        .weui-badge {
          margin-left: 5px;
        }
      }
      .weui-cell__ft .iconfont {
        font-size: 0.3rem;
      }
    }
  }
}
</style>