<template>
  <div class="wrap" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrap {
  width: 570rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background-color: rgb(26, 188, 156);
  text-align: center;
  color: white;
  font-size: 36rpx;
  font-weight: bold;

  &:active {
    & /deep/ span {
      display: inline-block;
      transform: scale(0.9)
    }
  }
}
</style>