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
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  background-color: #f88070;
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