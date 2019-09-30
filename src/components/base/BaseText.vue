<template>
  <span class="wrap" @click="$emit('click')">
    <slot></slot>
  </span>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrap {
  color: #f88070;
  font-size: 30rpx;
}
</style>