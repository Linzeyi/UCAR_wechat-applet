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
        <div class="switch-button">
          <switch-button @click="showPassword = !showPassword"></switch-button>
        </div>
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
          <captcha :phone="form.phone" :type="3"></captcha>
        </div>
        <span>验证码</span>
        <input type="text" placeholder="短信验证码" maxlength="6" v-model="form.captcha" />
      </div>
    </div>
    <base-button @click="handleCheck">
      <span>确定</span>
    </base-button>
    <base-toast></base-toast>
  </div>
</template>

<script>
import Captcha from "@/components/captcha/Captcha";
import SwitchButton from "@/components/switchButton/SwitchButton";
import BaseButton from "@/components/base/BaseButton";
import BaseToast from "@/components/base/BaseToast";
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
    BaseToast
  },
  methods: {
    async handleCheck() {
      let flag = false;
      flag = await this.$store.dispatch(
        "BaseStore/checkPhone",
        this.form.phone
      );
      if (!flag) {
        return;
      }
      flag = await this.$store.dispatch(
        "BaseStore/checkCaptcha",
        this.form.captcha
      );
      if (!flag) {
        return;
      }
      flag = await this.$store.dispatch(
        "BaseStore/checkPassword",
        this.form.password
      );
      if (!flag) {
        return;
      }
      this.findPassword();
    },
    async findPassword() {
      const result = await this.$http.post("/action/user/forgetPassword", {
        phone: this.form.phone,
        captcha: this.form.captcha,
        password: this.form.password
      });
      if (result.status !== 20000) {
        this.$store.commit("BaseStore/SHOW_TOAST", {
          type: "error",
          content: "号码未注册或验证码错误"
        });
        return
      }
      mpvue.navigateBack()
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
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 30rpx;
  padding: 60rpx 40rpx;

  & > img {
    display: block;
    width: 160rpx;
    height: 160rpx;
    border: 2rpx solid rgb(26, 188, 156);
    border-radius: 50%;
  }

  .form {
    width: 80%;
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
}
</style>