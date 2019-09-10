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
  color: rgb(26, 188, 156);
  font-size: 30rpx;
}
</style>