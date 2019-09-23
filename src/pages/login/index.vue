<template>
  <div class="wrap">
    <div class="header">
      <img :src="avatarUrl" alt="头像" />
    </div>
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
    <div class="footer">
      <base-button @click="handleCheck">登录</base-button>
      <base-text @click="Utils.navigateTo('/pages/register/main')">创建账号</base-text>
    </div>
    <base-toast></base-toast>
  </div>
</template>

<script>
import SwitchButton from "@/components/switchButton/SwitchButton";
import BaseButton from "@/components/base/BaseButton";
import BaseText from "@/components/base/BaseText";
import BaseToast from "@/components/base/BaseToast";
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
        "BaseStore/checkPassword",
        this.form.password
      );
      if (!flag) {
        return;
      }
      await this.login();
      this.getAddress();
    },
    async login() {
      const result = await this.$http.post("/action/user/login", {
        phone: this.form.phone,
        password: this.form.password
      });
      if (result.status !== 20000) {
        this.$store.commit("BaseStore/SHOW_TOAST", {
          type: "error",
          content: "账号或密码不正确"
        });
      }
      const token = result.data.token;
      if (token) {
        wx.setStorage({
          key: "token",
          data: token
        });
      }
      let userInfo = result.data.memberInfo;
      if (userInfo) {
        userInfo = { ...userInfo, phone: this.form.phone };
      }
      this.$store.commit("UserInfo/SET_USERINFO", userInfo);
    },
    async getAddress() {
      const result = await this.$http.get("/action/addr/list");
      if (result.data.addressList) {
        this.$store.commit(
          "UserCenter/SET_ADDRESS_LIST",
          result.data.addressList
        );
      }
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
  box-sizing: border-box;
  height: 100%;
  font-size: 30rpx;
  padding: 60rpx 40rpx;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  .header {
    text-align: center;
    > img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
    }
  }

  .form {
    margin: 0 auto;
    width: 85%;
    .input-item {
      transform: scale(1);
      margin-bottom: 60rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
      & > input {
        display: inline-block;
        vertical-align: middle;
        padding-left: 50rpx;
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

  .footer {
    height: 200rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .forget {
    text-align: right;
  }
}
</style>