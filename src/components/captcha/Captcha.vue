<template>
  <span class="wrap" :class="{captcha: !captchaActive}">
    <span v-if="captchaActive === false" @click.stop="captchaClick">发送验证码</span>
    <span v-else>倒计时{{captcha}}</span>
  </span>
</template>

<script>
export default {
  mounted() {
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
    captchaClick() {
      this.captchaActive = true;
      this.start();
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
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  position: fixed;
  height: 40rpx;
  line-height: 40rpx;
  right: 0;
  bottom: 0.2rpx;
  z-index: 3;
  font-size: 30rpx;
}
.captcha {
  color: rgb(26, 188, 156);
}
</style>