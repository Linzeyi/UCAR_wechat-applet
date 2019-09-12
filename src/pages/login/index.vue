<template>
  <div class="wrap">
    <img :src="avatarUrl" alt="头像" />
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
          placeholder="密码"
          v-model="form.password"
          maxlength="20"
        />
        <input v-else type="password" placeholder="密码" v-model="form.password" maxlength="20" />
      </div>
      <div class="forget">
        <base-text @click="Utils.navigateTo('/pages/findPassword/main')">忘记密码</base-text>
      </div>
    </div>
    <base-button @click="handleSubmit">登录</base-button>
    <div class="place-holder"></div>
    <base-text @click="Utils.navigateTo('/pages/register/main')">创建账号</base-text>
    <base-message></base-message>
  </div>
</template>

<script>
import SwitchButton from "@/components/switchButton/SwitchButton";
import BaseButton from "@/components/base/BaseButton";
import BaseText from "@/components/base/BaseText";
import BaseMessage from "@/components/base/BaseMessage";
export default {
  data() {
    return {
      form: {
        phone: "",
        password: ""
      },
      avatarUrl:
        "http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg",
      showPassword: false
    };
  },
  components: {
    SwitchButton,
    BaseButton,
    BaseText,
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
    margin-bottom: 120rpx;

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
        vertical-align: middle
      }

    }
  }
  .forget {
    text-align: right;
  }
  .place-holder {
    height: 40rpx;
  }
}
</style>