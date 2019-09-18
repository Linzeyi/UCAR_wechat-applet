<template>
  <div class="custom-content" :style="{height: getUsableHeight+'px'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    getUsableHeight() {
      const systemInfo = wx.getSystemInfoSync();
      const customNavHeight = this.$store.getters["SystemInfo/customNavHeight"]
      const usableHeight = systemInfo.windowHeight - customNavHeight
      return usableHeight;
    }
  }
};
</script>

<style lang="less" scoped>
.custom-content {
  transform: scale(1);
}
</style>