<template>
  <div class="custom-content" :style="{top: getCustomNavHeight+'px'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    getCustomNavHeight() {
      return this.$store.getters["SystemInfo/customNavHeight"]
    }
  }
};
</script>

<style lang="less" scoped>
.custom-content {
  transform: scale(1);
  position: relative;
}
</style>