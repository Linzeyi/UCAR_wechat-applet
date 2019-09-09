<template>
  <div class="wrap">
    <img src="http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg" alt="头像" />
    <div class="form">
      <div class="input-item">
        <img src="/static/images/u162.svg" />
        <input type="text" placeholder="输入手机号码" />
      </div>
      <div class="input-item">
        <img src="/static/images/u163.svg" />
        <captcha></captcha>
        <input type="text" placeholder="短信验证码" maxlength="8"/>
      </div>
      <div class="input-item">
        <img src="/static/images/u109.svg" />
        <span @click="inputType = !inputType">
          <switch-button></switch-button>
        </span>
        <input :type="showPassword" placeholder="输入新的登录密码" />
      </div>
    </div>
    <base-button>确定</base-button>
  </div>
</template>

<script>
import Captcha from "@/components/captcha/Captcha";
import SwitchButton from "@/components/switchButton/SwitchButton";
import BaseButton from "@/components/base/BaseButton";

export default {
  data() {
    return {
      inputType: false
    };
  },
  computed: {
    showPassword() {
      if (this.inputType) {
        return "text";
      } else {
        return "password";
      }
    }
  },
  components: {
    Captcha,
    SwitchButton,
    BaseButton
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
  font-size: 30rpx;

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
    margin-bottom: 90rpx;
    transform: scale(1);

    .input-item {
      transform: scale(1);
      margin-bottom: 60rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
    }

    .input-item > input {
      text-align: center;
      min-height: 40rpx;
      padding-left: 90rpx;
      padding-right: 90rpx;
    }

    .input-item > img {
      position: fixed;
      width: 40rpx;
      height: 40rpx;
    }
  }

  .submit {
    width: 70%;
    height: 35rpx;
    line-height: 35rpx;
    border-radius: 10rpx;
    background-color: rgb(26, 188, 156);
    text-align: center;
    margin-bottom: 10rpx;

    span {
      color: white;
    }
  }
}
</style>