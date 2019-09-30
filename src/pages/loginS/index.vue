<template>
  <div class="wrap">
    <div class="header">
      <div class="avatar" :class="{'shift-right': showAvatar}">
        <img :src="avatarUrl" alt="头像" />
      </div>
      <div class="no-avatar">
        <span>欢迎登陆XX</span>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <div class="form-item">
          <span
            :class="form.phone!==''||selectInput==='phone'?'placeholder':'reverse-placeholder'"
          >手机号</span>
          <i
            class="iconfont"
            v-show="form.phone!==''&&selectInput==='phone'"
            @touchstart="form.phone=''"
          >&#xe65c;</i>
          <input
            class="input-phone"
            type="number"
            v-model="form.phone"
            @focus="selectInput='phone'"
            @blur="selectInput=''"
            maxlength="11"
          />
        </div>
        <p class="phone-warn" :class="showInvaildPhone?'phone-warn-in':'phone-warn-out'">请输入有效的手机号码</p>
        <p class="phone-warn" :class="showUnregisterPhone?'phone-warn-in':'phone-warn-out'">该手机号未注册</p>
        <div class="gap"></div>
        <div class="form-item">
          <span
            :class="form.password!==''||selectInput==='password'?'placeholder':'reverse-placeholder'"
          >密码</span>
          <i
            class="iconfont"
            v-show="form.password!==''&&selectInput==='password'"
            @touchstart="form.password=''"
          >&#xe65c;</i>
          <i
            class="iconfont"
            v-if="form.password!==''&&showPassword===false"
            @touchstart="showPassword=true"
          >&#xe6b2;</i>
          <i
            class="iconfont"
            v-if="form.password!==''&&showPassword===true"
            @touchstart="showPassword=false"
          >&#xe6b1;</i>
          <input
            v-if="showPassword"
            type="text"
            class="input-passowrd"
            v-model="form.password"
            @focus="selectInput='password'"
            @blur="selectInput=''"
            maxlength="20"
          />
          <input
            v-else
            type="password"
            class="input-passowrd"
            v-model="form.password"
            @focus="selectInput='password'"
            @blur="selectInput=''"
            maxlength="20"
          />
        </div>
      </div>
    </div>
    <div class="text-box">
      <span @click="Utils.navigateTo('/pages/findPassword/main')">创建账号</span>
      <span @click="Utils.navigateTo('/pages/register/main')">忘记密码</span>
    </div>
    <div class="submit" @click="handleCheck">
      <p>登录</p>
    </div>
    <!-- <div class="agreement">
      <p>
        登录代表你已同意《
        <span>用户服务协议</span>》
      </p>
    </div>-->
    <base-toast></base-toast>
  </div>
</template>

<script>
import BaseToast from "@/components/base/BaseToast";
export default {
  onLoad() {
    this.handleInputDebounce = this.Utils.delayDebounce(this.checkPhone);
  },
  data() {
    return {
      form: {
        phone: "",
        password: ""
      },
      avatarUrl: "",
      showPassword: false,
      showAvatar: false,
      selectInput: "",
      isValidPhone: false,
      isRegisterPhone: undefined,
      handleInputDebounce: ""
    };
  },
  components: {
    BaseToast
  },
  computed: {
    showInvaildPhone() {
      return !this.isValidPhone && this.form.phone !== "";
    },
    showUnregisterPhone() {
      if (this.isRegisterPhone !== undefined) {
        return !this.isRegisterPhone && this.isValidPhone;
      } else {
        return false;
      }
    }
  },
  methods: {
    async getAvatar() {
      const result = await this.$http.get("/action/user/getAvatarByPhone", {
        phone: this.form.phone
      });
      if (result.data.avatarUrl) {
        this.avatarUrl = result.data.avatarUrl;
        this.isRegisterPhone = true;
        this.showAvatar = true;
      } else {
        this.showAvatar = false;
        this.isRegisterPhone = false;
      }
    },
    checkPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        this.isValidPhone = false;
        this.showAvatar = false;
        return;
      }
      this.isValidPhone = true;
      this.getAvatar();
    },
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
      await this.getAddress();
      mpvue.navigateBack();
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
        wx.setStorageSync("token", token);
      }
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
  },
  watch: {
    "form.phone"() {
      this.handleInputDebounce();
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes shift-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(375px);
  }
}

.gap {
  height: 70rpx;
}

.wrap {
  padding: 0 10rpx;
  box-sizing: border-box;
  height: 100%;
  background-color: white;
  .header {
    height: 400rpx;
    line-height: 400rpx;
    font-size: 50rpx;
    display: flex;
    .avatar {
      overflow: hidden;
      flex-shrink: 0;
      width: 0;
      text-align: center;
      transition: width 0.3s ease-in-out;
      img {
        vertical-align: -50rpx;
        height: 150rpx;
        width: 150rpx;
        border-radius: 50%;
      }
    }
    .no-avatar {
      padding: 0 80rpx;
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
    }
    .shift-right {
      width: 100%;
    }
  }
  .content {
    margin-top: 0;
    padding: 0 80rpx;
    .form {
      .form-item {
        height: 60rpx;
        line-height: 60rpx;
        position: relative;
        border-bottom: 1px solid rgb(229, 229, 229);
        span {
          position: absolute;
          left: 0;
          color: #555;
          transition: all 0.3s ease-in-out;
        }

        i {
          position: absolute;
          color: rgb(138, 138, 138);
          &:nth-of-type(1) {
            right: 0;
          }
          &:nth-of-type(2) {
            right: 50rpx;
          }
        }
        input {
          height: 60rpx;
          width: 450rpx;
          min-height: 60rpx;
          line-height: 60rpx;
          font-size: 30rpx;
        }
      }
    }
  }
  .submit {
    margin: 60rpx auto;
    width: 570rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 45rpx;
    background-color: #f88070;
    text-align: center;
    p {
      color: white;
      font-size: 36rpx;
      font-weight: bold;
      &:active {
        transform: scale(0.9);
      }
    }
  }
  .text-box {
    margin-top: 20rpx;
    padding: 0 80rpx;
    display: flex;
    justify-content: space-between;
    span {
      color: #f88070;
    }
  }
}

.phone-warn {
  font-size: 25rpx;
  color: #f88070;
  overflow: hidden;
  white-space: nowrap;
  height: 0;
  width: 0;
}
.phone-warn-in {
  height: 38rpx;
  width: 100%;
  transition: height 0.3s ease-in-out, width 0.3s ease-in-out 0.1s;
}
.phone-warn-out {
  height: 0;
  width: 0;
  transition: height 0.3s ease-in-out 0.1s, width 0.3s ease-in-out;
}
.placeholder {
  font-size: 25rpx;
  transform: translateY(-60rpx);
}
.reverse-placeholder {
  font-size: 30rpx;
  transform: translateY(0);
}
</style>


