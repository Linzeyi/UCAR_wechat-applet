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
  width: 500rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 35rpx;
  background-color: rgb(26, 188, 156);
  text-align: center;
  color: white;
  font-size: 30rpx;
  font-weight: bold;

  &:active {
    transform: scale(0.9)
  }
}
</style>