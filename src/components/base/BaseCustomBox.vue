<template>
  <div class="wrap">
    <div class="custom-content" :style="{height: getUsableHeight+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getUsableHeight() {
      return this.$store.getters["SystemInfo/usableHeight"];
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  .custom-content {
    overflow: scroll;
  }
}
</style>