<template>
  <div class="wrap" v-if="show">
    <div
      class="mask"
      :class="wrapAnimation"
      @click="animationStatus = false"
      @animationend="closeActionSheet"
    ></div>
    <div class="action-sheet" :class="actionSheetAnimation">
      <slot></slot>
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
      this.animationStatus = value
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
  }
}
</style>