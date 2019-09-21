<template>
  <div class="wrap">
    <div class="input-item">
      <span>新密码</span>
      <input type="password" placeholder="请输入新密码" maxlength="20" v-model="form.password" />
    </div>
    <div class="input-item captcha">
      <span>短信验证码</span>
      <input type="text" maxlength="6" placeholder="短信验证码" v-model="form.captcha" />
      <div class="captcha">
        <captcha :phone="form.phone" :type="3"></captcha>
      </div>
    </div>
    <div class="submit">
      <base-button @click="handleCheck">保存</base-button>
    </div>
    <base-toast></base-toast>
  </div>
</template>

<script>
import Captcha from "@/components/captcha/Captcha";
import BaseButton from "@/components/base/BaseButton";
import BaseToast from "@/components/base/BaseToast";
export default {
  onLoad() {
    this.form.phone = this.$store.getters["UserInfo/phone"];
  },
  data() {
    return {
      form: {
        oldPwd: "",
        password: "",
        againPassword: "",
        captcha: "",
        phone: ""
      }
    };
  },
  components: {
    Captcha,
    BaseButton,
    BaseToast
  },
  methods: {
    async handleCheck() {
      let flag = false;
      flag = await this.$store.dispatch(
        "BaseStore/checkPassword",
        this.form.password
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
      this.updatePassword();
    },
    async updatePassword() {
      await this.$http.post("/action/user/forgetPassword", {
        phone: this.form.phone,
        password: this.form.password,
        captcha: this.form.captcha
      });
    }
  }
};
</script>

<style lang="less" scoped>
.captcha {
  vertical-align: middle;
  display: inline-block;
}

.wrap {
  height: 100%;
  width: 100%;
  padding-top: 30rpx;
  font-size: 30rpx;

  .input-item {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 50rpx;
    border-bottom: 2rpx solid #e4e4e4;
    &:nth-of-type(1) {
      border-top: 2rpx solid #e4e4e4;
    }

    > span {
      display: inline-block;
      width: 160rpx;
      vertical-align: middle;
    }

    > input {
      text-align: center;
      margin: 0;
      margin-left: 10rpx;
      vertical-align: middle;
      max-width: 320rpx;
      min-height: 30rpx;
      display: inline-block;
      font-size: 30rpx;
    }
  }

  .submit {
    margin: 120rpx auto 0;
    width: 500rpx;
  }
}
</style>