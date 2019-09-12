<template>
  <div class="wrap">
    <img src="http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg" alt="头像" />
    <div class="form">
      <div class="input-item">
        <img src="/static/images/u162.svg" />
        <input type="text" placeholder="输入手机号码" v-model="form.phone" />
      </div>
      <div class="input-item">
        <img src="/static/images/u163.svg" />
        <div class="captcha">
          <captcha></captcha>
        </div>
        <input type="text" placeholder="短信验证码" maxlength="6" v-model="form.captcha" />
      </div>
      <div class="input-item">
        <img src="/static/images/u109.svg" />
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
      <div class="aggrement">
        <i
          class="iconfont icon-select"
          v-if="agreementActive"
          @click="agreementActive = !agreementActive"
        >&#xe655;</i>
        <i class="iconfont" v-else @click="agreementActive = !agreementActive">&#xe656;</i>
        <p>
          已阅读并同意《
          <span>用户服务协议</span>》
        </p>
      </div>
    </div>
    <base-button @click="handleRegister">注册</base-button>
    <base-message></base-message>
  </div>
</template>

<script>
import SwitchButton from "@/components/switchButton/SwitchButton";
import Captcha from "@/components/captcha/Captcha";
import BaseButton from "@/components/base/BaseButton";
import BaseMessage from "@/components/base/BaseMessage";
export default {
  data() {
    return {
      form: {
        phone: "",
        captcha: "",
        password: ""
      },
      showPassword: false,
      agreementActive: false,
      password: ""
    };
  },
  components: {
    Captcha,
    SwitchButton,
    BaseButton,
    BaseMessage
  },
  methods: {
    async handleRegister() {
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
}

.captcha {
  position: fixed;
  right: 0;
  z-index: 3;
}
.icon-select {
  border-radius: 50%;
  color: rgb(26, 188, 156);
}
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;

  & > img {
    display: block;
    width: 80px;
    height: 80px;
    margin-bottom: 70px;
    border: 1px solid rgb(26, 188, 156);
    border-radius: 50%;
  }

  .form {
    width: 80%;
    margin-bottom: 150rpx;

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
    .aggrement {
      text-align: center;
      i {
        vertical-align: middle;
        margin-right: 15rpx;
        font-size: 40rpx;
      }
      input {
        display: inline-block;
        vertical-align: middle;
      }
      p {
        display: inline-block;
        vertical-align: middle;
        span {
          color: rgb(26, 188, 156);
        }
      }
    }
  }

  .register {
    width: 70%;
    height: 35px;
    line-height: 35px;
    border-radius: 10px;
    background-color: rgb(26, 188, 156);
    text-align: center;
    margin-bottom: 10px;

    span {
      color: white;
    }
  }
}
</style>