<template>
  <div class="wrap">
    <div class="mask" :class="wrapAnimation" @click="showActionSheet = false"></div>
    <div class="action-sheet" :class="actionSheetAnimation" @animationend="closeAction">
      <div class="action-sheet-item">微信头像</div>
      <div class="action-sheet-item">从相册选择</div>
      <div class="action-sheet-item">拍照</div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.showActionSheet = await this.$store.getters["BaseComponent/showActionSheet"];
  },
  data() {
    return {
      showActionSheet: false
    };
  },
  computed: {
    actionSheetAnimation() {
      return this.showActionSheet ? "actionsheet-in" : "actionsheet-out";
    },
    wrapAnimation() {
      return this.showActionSheet ? "wrap-in" : "wrap-out";
    }
  },
  methods: {
    async closeAction() {
      if ((this.showActionSheet === false)) {
        await this.$store.commit("BaseComponent/SET_SHOWACTIONSHEET", false);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes actionsheet-in {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes actionsheet-out {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(100%);
  }
}

@keyframes wrap-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes wrap-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.actionsheet-in {
  animation: actionsheet-in 0.2s linear;
}

.actionsheet-out {
  animation: actionsheet-out 0.2s linear;
  transform: translateY(100%);
}

.wrap-in {
  animation: wrap-in 0.2s linear;
}

.wrap-out {
  animation: wrap-out 0.2s linear;
  opacity: 0;
}
.wrap {
  height: 100%;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
  }

  .action-sheet {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    z-index: 20;

    .action-sheet-item {
      height: 120rpx;
      line-height: 120rpx;
      text-align: center;
      font-size: 35rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
    }
  }
}
</style>