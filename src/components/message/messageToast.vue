<template>
  <div class="message-toast-wrap">
    <div class="new-message" @click="viewNewMessage" @touchmove="goTouchMove">
      <img src="../../../static/images/newMessage.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    hidden () {
      return this.$store.getters['Message/showMessageToast']
    }
  },
  methods: {
    // 跳转到消息页面
    viewNewMessage () {
      this.$store.state.Message.showMessageToast = false
      mpvue.navigateTo({ url: '/pages/message/main' })
    },

    // 右滑移除弹窗
    goTouchMove () {
      this.$store.state.Message.showMessageToast = false
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes moveleft {
  0% {
    position: fixed;
    right: -40px;
    top: 60px;
  }
  5% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  6% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(20deg);
  }
  7% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  8% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(20deg);
  }
  10% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  30% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  31% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(20deg);
  }
  32% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  33% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(20deg);
  }
  34% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  35% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(10deg);
  }
  68% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(20deg);
  }
  70% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  71% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(20deg);
  }
  72% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(-20deg);
  }
  73% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(10deg);
  }
  95% {
    position: fixed;
    right: 20px;
    top: 60px;
    transform: rotate(10deg);
  }
  100% {
    position: fixed;
    right: -40px;
    top: 60px;
    transform: rotate(10deg);
  }
}
@keyframes bigger {
  50% {
    display: block;
    height: 50px;
    width: 50px;
  }
  100% {
    display: block;
    height: 45px;
    width: 45px;
  }
}
.message-toast-wrap {
  position: fixed;
  right: -40px;
  top: 60px;
  z-index: 99;
  animation: moveleft 10s linear;
  img {
    display: block;
    height: 45px;
    width: 45px;
    animation: bigger 1s linear;
  }
}
</style>