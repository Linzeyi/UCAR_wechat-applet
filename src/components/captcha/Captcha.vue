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
  right: 0;
  z-index: 3;
}
.captcha {
  color: rgb(26, 188, 156);
}
</style>