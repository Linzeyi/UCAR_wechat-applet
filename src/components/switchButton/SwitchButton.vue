<template>
  <div class="wrap"  @click="clickHandle">
    <input type="checkbox" class="offscreen" v-model="checkboxActive" />
    <label :class="{checked: checkboxActive, switch: true}"></label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxActive: false
    };
  },
  methods: {
    clickHandle() {
      this.checkboxActive = !this.checkboxActive
      this.$emit('click')
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 40rpx;
  width: 80rpx;
  font-size: 30rpx;
}

.switch {
  position: relative;
  display: inline-block;
  width: 80rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 40rpx;
  transition: all 0.3s;
}
.switch::after {
  content: "";
  position: absolute;
  width: 36rpx;
  height: 36rpx;
  border-radius: 36rpx;
  background-color: white;
  top: 2rpx;
  left: 2rpx;
  transition: all 0.3s;
}

.checked.switch {
  background-color: rgb(26, 188, 156);
  &::after {
    transform: translateX(40rpx);
  }
}
.offscreen {
  display: none;
}
</style>