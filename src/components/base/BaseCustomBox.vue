<template>
  <div class="custom-content" :style="{height: getUsableHeight+'px'}">
    <slot></slot>
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
.custom-content {
  overflow: scroll;
}
</style>