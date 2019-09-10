<template>
  <div class="wrap">
    <img :src="avatarUrl" alt="头像" />
    <div class="form">
      <div class="input-item">
        <img src="/static/images/u110.svg" />
        <input type="text" placeholder="账号"/>
      </div>
      <div class="input-item">
        <img src="/static/images/u109.svg" />
        <switch-button @click="inputType = !inputType"></switch-button>
        <input :type="showPassword" placeholder="密码" />
      </div>
      <div class="forget">
        <base-text @click="Utils.navigateTo('/pages/findPassword/main')">忘记密码</base-text>
      </div>
    </div>
    <base-button>登录</base-button>
    <base-text @click="Utils.navigateTo('/pages/register/main')">创建账号</base-text>
    
  </div>
</template>

<script>
import SwitchButton from "@/components/switchButton/SwitchButton";
import BaseButton from "@/components/base/BaseButton";
import BaseText from "@/components/base/BaseText";
export default {
  data() {
    return {
      avatarUrl:
        "http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg",
      inputType: false
    };
  },
  components: {
    SwitchButton,
    BaseButton,
    BaseText
  },
  computed: {
    showPassword() {
      if (this.inputType) {
        return "text";
      } else {
        return "password";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    display: block;
    width: 160rpx;
    height: 160rpx;
    margin-bottom: 140rpx;
    border: 2rpx solid rgb(26, 188, 156);
    border-radius: 50%;
  }

  .form {
    width: 80%;
    margin-bottom: 120rpx;

    .input-item {
      transform: scale(1);
      margin-bottom: 60rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
      & > input {
        text-align: center;
        min-height: 40rpx;
        padding-left: 90rpx;
        padding-right: 90rpx;
        font-size: 30rpx;
      }
      & > img {
        position: fixed;
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .forget {
    text-align: right;
  }
}
</style>