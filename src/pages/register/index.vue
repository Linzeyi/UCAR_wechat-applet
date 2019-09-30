<template>
  <div class="wrap">
    <div class="form">
      <div class="input-item">
        <span>账号</span>
        <input type="number" placeholder="手机号" v-model="form.phone" maxlength="11" />
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
          <captcha :phone="form.phone" :type="1"></captcha>
        </div>
        <span>验证码</span>
        <input type="number" placeholder="短信验证码" maxlength="6" v-model="form.captcha" />
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
          <span @click="showAgreement = true">用户服务协议</span>》
        </p>
      </div>
    </div>
    <base-button @click="handleCheck">
      <span>注册</span>
    </base-button>
    <base-toast></base-toast>
    <base-modal :showAgreement="showAgreement" @click="showAgreement = !showAgreement">
      <protocol></protocol>
    </base-modal>
  </div>
</template>

<script>
import SwitchButton from "@/components/switchButton/SwitchButton";
import Captcha from "@/components/captcha/Captcha";
import Protocol from "@/components/protocol/Protocol";
import BaseButton from "@/components/base/BaseButton";
import BaseToast from "@/components/base/BaseToast";
import BaseModal from "@/components/base/BaseModal";
export default {
  onUnload() {
    this.form.phone = "";
    this.form.password = "";
    this.form.captcha = "";
    this.showPassword = false;
    this.showAgreement = false;
    this.agreementActive = false;
  },
  data() {
    return {
      form: {
        phone: "",
        password: "",
        captcha: ""
      },
      showPassword: false,
      showAgreement: false,
      agreementActive: false
    };
  },
  components: {
    Captcha,
    SwitchButton,
    BaseButton,
    BaseToast,
    BaseModal,
    Protocol
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
      flag = await this.$store.dispatch(
        "BaseStore/checkCaptcha",
        this.form.captcha
      );
      if (!flag) {
        return;
      }
      if (!this.agreementActive) {
        this.$store.commit("BaseStore/SHOW_TOAST", {
          type: "error",
          content: "请先同意用户协议"
        });
        return;
      }
      this.register();
    },
    async register() {
      const result = await this.$http.post("/action/user/register", {
        phone: this.form.phone,
        captcha: this.form.captcha,
        password: this.form.password
      });
      if (result.status !== 20000) {
        this.$store.commit("BaseStore/SHOW_TOAST", {
          type: "error",
          content: "号码已注册或验证码错误"
        });
        return;
      }
      mpvue.navigateBack();
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
.icon-select {
  border-radius: 50%;
  color: #f88070;
}
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;

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
          color: #f88070;
        }
      }
    }
  }

  .register {
    width: 70%;
    height: 35px;
    line-height: 35px;
    border-radius: 10px;
    background-color: #f88070;
    text-align: center;
    margin-bottom: 10px;

    span {
      color: white;
    }
  }
}
</style>