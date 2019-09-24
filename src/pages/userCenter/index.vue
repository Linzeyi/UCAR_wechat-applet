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
    return {}
  },
  onShow () {
    if (this.isLogged) {
      // 获取个人实时数据
      this.$store.commit('UserCenter/GET_REAL_TIME_DATA')
    }
  },
  computed: {
    // 判断登录
    isLogged () {
      // 加载第一次登录所需数据
      if (this.$store.state.UserInfo.userInfo.id || wx.getStorageSync('token')) {
        this.$store.commit('UserCenter/FIRST_LOGIN_GET_DATA')
      }
      return Boolean(wx.getStorageSync('token'))
    },
    // 用户名
    nickname () {
      return this.$store.state.UserInfo.userInfo.nickname || this.$store.getters['UserCenter/nickname'] || '无名'
    },
    // 头像
    avatarUrl () {
      return this.$store.state.UserInfo.userInfo.avatarUrl || this.$store.getters['UserCenter/avatarUrl'] || '/../../static/images/user.png'
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