<template>
  <div class="wrap">
    <div class="input-item">
      <span>旧密码</span>
      <input type="password" placeholder="点击输入密码" maxlength="20" v-model="form.oldPassword" />
    </div>
    <div class="input-item">
      <span>新密码</span>
      <input type="password" placeholder="请输入新密码" maxlength="20" v-model="form.newPassword" />
    </div>
    <div class="input-item">
      <span>确认密码</span>
      <input type="password" placeholder="请再次输入新密码" maxlength="20" v-model="form.againPassword" />
    </div>
    <div class="input-item captcha">
      <span>短信验证码</span>
      <input type="text" maxlength="8" placeholder="短信验证码" v-model="form.captcha" />
      <div class="captcha">
        <captcha></captcha>
      </div>
    </div>
    <div class="submit">
      <base-button @click="handleSubmit">保存</base-button>
    </div>
    <base-message></base-message>
  </div>
</template>

<script>
import Captcha from "@/components/captcha/Captcha";
import BaseButton from "@/components/base/BaseButton";
import BaseMessage from "@/components/base/BaseMessage";
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        againPassword: "",
        captcha: ""
      }
    };
  },
  components: {
    Captcha,
    BaseButton,
    BaseMessage
  },
  methods: {
    async handleSubmit() {
      let flag = false;
      flag = await this.$store.dispatch(
        "UserInfo/checkPassword",
        this.form.newPassword
      );
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
      if (this.form.newPassword !== this.form.againPassword) {
        this.$store.commit("UserInfo/SHOW_TOAST", {
          type: "error",
          content: "两次密码不一致"
        });
        return
      }
      // 判断旧密码是否一致，需调接口
      console.log("修改成功");
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
    margin-top: 120rpx;
    text-align: center;
  }
}
</style>