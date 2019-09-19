<template>
  <div class="wrap" :class="{captcha: !captchaActive}">
    <span v-if="captchaActive === false" @click.stop="handleCheckPhone">发送验证码</span>
    <span v-else>倒计时{{captcha}}</span>
  </div>
</template>

<script>
export default {
  props: {
    phone: String,
    type: Number
  },
  onUnload() {
    this.resetCaptcha();
  },
  data() {
    return {
      captchaActive: false,
      captcha: 60,
      timer: null
    };
  },
  methods: {
    sendCaptcha() {
      this.captchaActive = true;
      this.start();
      this.$http.get("/action/user/getCaptcha", {
        phone: this.phone,
        type: this.type
      });
    },
    start() {
      this.timer = setInterval(() => {
        this.captcha -= 1;
        if (this.captcha === 0) {
          this.resetCaptcha();
        }
      }, 1000);
    },
    resetCaptcha() {
      this.captchaActive = false;
      this.captcha = 60;
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    async handleCheckPhone() {
      let flag = false;
      flag = await this.$store.dispatch("BaseStore/checkPhone", this.phone);
      if (!flag) {
        return;
      }
      this.sendCaptcha()
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 40rpx;
  line-height: 40rpx;
  bottom: 0.2rpx;
  font-size: 30rpx;
}
.captcha {
  color: rgb(26, 188, 156);
}
</style>