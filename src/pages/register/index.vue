<template>
  <div class="wrap">
    <img src="http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg" alt="头像" />
    <div class="form">
      <div class="input-item">
        <span>账号</span>
        <input type="text" placeholder="手机号" v-model="form.phone" />
      </div>
      <div class="input-item">
        <div class="switch-button">
          <switch-button @click="showPassword = !showPassword"></switch-button>
        </div>
        <span>密码</span>
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
          <captcha :phone="form.phone" :type=1></captcha>
        </div>
        <span>验证码</span>
        <input type="text" placeholder="短信验证码" maxlength="6" v-model="form.captcha" />
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
    <base-button @click="handleCheck">注册</base-button>
    <base-message></base-message>
  </div>
</template>

<script>
import SwitchButton from "@/components/switchButton/SwitchButton";
import Captcha from "@/components/captcha/Captcha";
import BaseButton from "@/components/base/BaseButton";
import BaseMessage from "@/components/base/BaseMessage";
export default {
  onUnload() {
    this.form.phone = "";
    this.form.captcha = "";
    this.form.password = "";
    this.showPassword = false;
    this.agreementActive = false;
  },
  data() {
    return {
      form: {
        phone: "",
        captcha: "",
        password: ""
      },
      showPassword: false,
      agreementActive: false
    };
  },
  components: {
    Captcha,
    SwitchButton,
    BaseButton,
    BaseMessage
  },
  methods: {
    async handleCheck() {
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
      this.register()
    }
  },
  register() {
    this.$http.post('/action/user/register', {
      phone: this.form.phone,
      captcha: this.form.captcha,
      password: this.form.password
    })
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