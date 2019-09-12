<template>
  <div class="wrap">
    <img src="http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg" alt="头像" />
    <div class="form">
      <div class="input-item">
        <span>账号</span>
        <input type="text" placeholder="输入手机号码" v-model="form.phone" />
      </div>
      <div class="input-item">
        <span>密码</span>
        <span class="switch-button">
          <switch-button @click="showPassword = !showPassword"></switch-button>
        </span>
        <input
          v-if="showPassword"
          type="text"
          placeholder="设置登录密码"
          v-model="form.password"
          maxlength="20"
        />
        <input v-else type="password" placeholder="设置登录密码" v-model="form.password" maxlength="20" />
      </div>
      <div class="input-item">
        <div class="captcha">
          <captcha></captcha>
        </div>
        <span>验证码</span>
        <input type="text" placeholder="短信验证码" maxlength="6" v-model="form.captcha" />
      </div>
    </div>
    <base-button @click="handleSubmit">确定</base-button>
    <base-message></base-message>
  </div>
</template>

<script>
import Captcha from "@/components/captcha/Captcha";
import SwitchButton from "@/components/switchButton/SwitchButton";
import BaseButton from "@/components/base/BaseButton";
import BaseMessage from "@/components/base/BaseMessage";
export default {
  onUnload() {
    this.form.phone = "";
    this.form.captcha = "";
    this.form.password = "";
    this.showPassword = false;
  },
  data() {
    return {
      form: {
        phone: "",
        captcha: "",
        password: ""
      },
      showPassword: false
    };
  },
  components: {
    Captcha,
    SwitchButton,
    BaseButton,
    BaseMessage
  },
  methods: {
    async handleSubmit() {
      let flag = false;
      flag = await this.$store.dispatch("UserInfo/checkPhone", this.form.phone);
      if (!flag) {
        return;
      }
      flag = await this.$store.dispatch(
        "UserInfo/checkCaptcha",
        this.form.captcha
      );
      if (!flag) {
        return;
      }
      flag = await this.$store.dispatch(
        "UserInfo/checkPassword",
        this.form.password
      );
      if (!flag) {
        return;
      }
      console.log("验证成功");
    }
  }
};
</script>

<style lang="less" scoped>
.switch-button {
  position: fixed;
  right: 0;
  z-index: 3;
  top: 8rpx;
}

.captcha {
  position: fixed;
  right: 0;
  z-index: 3;
  top: 8rpx;
}
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

    .input-item {
      transform: scale(1);
      margin-bottom: 60rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);

      & > input {
        display: inline-block;
        vertical-align: middle;
        padding-left: 50rpx;
        line-height: 40rpx;
        min-height: 40rpx;
        height: 40rpx;
        font-size: 30rpx;
      }
      & > span {
        display: inline-block;
        width: 100rpx;
        line-height: 40rpx;
        vertical-align: middle;
      }
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