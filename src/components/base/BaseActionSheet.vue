<template>
  <div class="wrap" v-if="show">
    <div class="mask" :class="wrapAnimation" @click="animationStatus = false"></div>
    <div
      class="action-sheet"
      :class="actionSheetAnimation"
      @click="animationStatus = false"
      @animationend="closeActionSheet"
    >
      <div class="action-box">
        <slot></slot>
      </div>
      <div class="action-cancel">
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      animationStatus: false
    };
  },
  computed: {
    actionSheetAnimation() {
      return this.animationStatus ? "actionsheet-in" : "actionsheet-out";
    },
    wrapAnimation() {
      return this.animationStatus ? "wrap-in" : "wrap-out";
    }
  },
  methods: {
    closeActionSheet() {
      if (this.animationStatus === false) {
        this.$emit("update:show", false);
      }
    }
  },
  watch: {
    show(value) {
      this.animationStatus = value;
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
  animation: actionsheet-in 0.2s linear both;
}

.actionsheet-out {
  animation: actionsheet-out 0.2s linear both;
}

.wrap-in {
  animation: wrap-in 0.2s linear both;
}

.wrap-out {
  animation: wrap-out 0.2s linear both;
}
.wrap {
  height: 100%;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
  }

  .action-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    padding: 0 20rpx;

    .action-box {
      border-radius: 20rpx;
      background-color: rgb(249, 249, 249);
    }

    .action-cancel {
      margin: 20rpx 0;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 40rpx;
      color: rgb(78, 160, 249);
      border-radius: 20rpx;
      background-color: rgb(249, 249, 249);

      &:active {
        background-color: rgb(180, 180, 180);
      }
    }
  }
}
</style>