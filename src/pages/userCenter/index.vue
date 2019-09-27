<template>
  <div class="userCenter-wrap">
    <BaseNavigationBar name="个人中心"></BaseNavigationBar>
    <BaseCustomBox>
      <div class="not-logged" v-if="!isLogged">
        <div class="log-in">
          <img src="../../../static/images/user.png" alt="我的头像" class="user-icon">
          <div class="btn-login" @click="login">登录</div>
        </div>
        <div class="ani-flow"></div>
        <div class="ani-flow" style="left: -150%;"></div>
        <div class="ani-flow" style="left: -120%; opacity: 0.5;"></div>
        <div class="ani-flow" style="left: -130%; opacity: 0.7;"></div>
      </div>
      <div class="logged-in" v-else>
        <div class="user-info" @click="routeTo('personalSettings')">
          <div>
            <img :src="avatarUrl" alt="" class="user-icon">
          </div>
          <div class="info">
            <div class="user-name">
              <p class="name">{{ nickname }}</p>
              <div class="grade" 
                :class="[{ bronze: grade === '青铜' }, { silver: grade === '白银' }, { gold: grade === '黄金' }, { platinum: grade === '白金' }, { platinumPlus:grade === '白金Plus' }, { diamond: grade === '钻石' }]"
                @touchstart.stop="goTouchStart" 
                @touchend="goTouchEnd">
                {{ grade }}<span class="tips" v-if="gradeTips && discount !== undefined && discount !== '1'">您可享受 {{ discount * 10 }} 折的购物优惠</span>
              </div>
            </div>
            <p>积分：<span class="integral">{{ integral }}</span></p>
          </div>
          <i class="iconfont setting">&#xe61f;</i>
        </div>
        <div class="phone">
          <p>{{ phone }}</p>
        </div>
        <div class="ani-flow"></div>
        <div class="ani-flow" style="left: -150%;"></div>
        <div class="ani-flow" style="left: -120%; opacity: 0.5;"></div>
        <div class="ani-flow" style="left: -130%; opacity: 0.7;"></div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell" @click="routeTo('wallet')">
          <div class="weui-cell__hd">
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
        <!-- <button class="weui-input" @click="test">TEST</button> -->
      </div>
      <message-toast v-if="hidden"></message-toast>
    </BaseCustomBox>
  </div>
</template>

<script>
import BaseNavigationBar from "@/components/base/BaseNavigationBar";
import BaseCustomBox from "@/components/base/BaseCustomBox";
import messageToast from '@/components/message/messageToast'

export default {
  components: {
    BaseNavigationBar,
    BaseCustomBox,
    messageToast
  },
  data () {
    return {
      gradeTips: false // 显示等级提示
    }
  },
  onShow () {
    // 加载个人中心所需数据
    this.$store.commit('UserCenter/FIRST_LOGIN_GET_DATA')
  },
  computed: {
    // 判断是否已登录
    isLogged () {
      if (!this.$store.getters['UserCenter/isLogged']) {
        this.$store.commit('UserCenter/RESET_USER_CENTER_STORE')
      }
      return this.$store.getters['UserCenter/isLogged']
    },
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
    // 折扣
    discount () {
      return this.$store.getters['UserCenter/discount'] || 10
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
    },
    // 新消息弹窗
    hidden () {
      return this.$store.getters['Message/showMessageToast']
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
      // this.$store.commit('Message/INIT_WEBSOCKET')
      this.$store.dispatch('Message/initWebSocket')
    },

    // 显示/隐藏 等级提示
    goTouchStart () {
      this.gradeTips = true
    },
    goTouchEnd () {
      this.gradeTips = false
    }
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
@orange: #ff6421;
@keyframes right-move {
  0% {
    transform: translate(0, 0)
  }
  100% {
    transform: translate(30%, 0)
  }
}

.ani-flow {
  position: absolute;
  bottom: 0;
  height: 45px;
  width: 400%;
  z-index: 8;
  opacity: 0.3;
  left: -175%;
  background-size: 30% 100%;
  background-repeat: repeat-x;
  background-position-y: 25px;
  animation: right-move 15s cubic-bezier(.55,.5,.45,.5) infinite both;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='waves' viewBox='0 24 150 28' fill='%23ffffff' preserveAspectRatio='none' shape-rendering='auto'%3E %3Cpath id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' /%3E %3C/svg%3E");
}

.userCenter-wrap {
  color: @baoWoBlack;
  font-family: @baoWoFont;
  height: 100%;
  overflow: hidden;
  .not-logged {
    position: relative;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(60deg, #ffbc6e 0%, #ff7e47 100%);
    .log-in {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      z-index: 9;
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
    position: relative;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(60deg, #ff7e47 0%, #ffcb90 100%);
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
          color: #ffc7af;
        }
        .user-name {
          display: flex;
          position: relative;
          .name {
            font-family: 'PingFangSC';
            font-size: 18px;
            color: #6e2c10;
          }
          .grade {
            display: inline-block;
            border: 0.5px solid #000000;
            border-radius:5px;
            background-color: rgb(255, 227, 201);
            padding: 0 5px;
            margin-left: 10px;
            font-size: 10px;
            align-self: center;
            color: #000000;
            line-height: inherit;
            z-index: 100;
            .tips {
              margin-left: 10px;
            }
          }
          .bronze {
            color: #8c7853;
            border: 0.5px solid #8c7853;
            background-color: #e5c8ad;
          }
          .silver {
            color: #c0c0c0;
            border: 0.5px solid #c0c0c0;
            background-color: #ffffff;
          }
          .gold {
            color: #ffd700;
            border: 0.5px solid #ffd700;
            background-color: #803900;
          }
          .platinum {
            color: #00cde1;
            border: 0.5px solid #00cde1;
            background-color: #ffdec4;
          }
          .platinumPlus {
            color: #00cde1;
            border: 0.5px solid #00cde1;
            background-color: #111111;
          }
          .diamond {
            color: #9595fa;
            border: 0.5px solid #9595fa;
            background-color: #ffffff;
          }
        }
        .integral {
          color: #ffc7af;
        }
      }
      .setting {
        font-size: 0.6rem;
        flex: 0.7;
        color: #a8542f;
      }
    }
    .phone {
      margin-left: 10px;
      p {
        font-size: 13px;
        color: #ffddce;
      }
    }
  }
  .weui-cells {
    box-shadow: 0 3px 3px rgb(223, 223, 223), 0 -0.3px 4px rgb(253, 253, 253);
    margin-top: 0;
    &::before {
      border-top: none;
    }
    p {
      padding: 5px 0;
    }
    .weui-cell {
      height: 45px;
      &::before {
        border-top: 0.3px solid #f3f3f3;
      }
      .action-icon {
        height: 23px;
        width: 23px;
        margin-right: 9px;
        padding-top: 5px;
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