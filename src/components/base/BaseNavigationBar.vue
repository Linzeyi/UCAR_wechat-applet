<template>
  <div class="navigation-bar" :style="{'height': customNavHeight}">
    <div
      class="nav-icon"
      :style="{'top': buttonTop, 'left': buttonLeft, 'height': buttonHeight, 'line-height': buttonHeight}"
    >
      <slot></slot>
    </div>
    <div
      class="nav-name"
      :style="{'margin-top':buttonTop,'height': buttonHeight, 'line-height': buttonHeight}"
    >{{name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  created() {
    this.menuInfo = this.$store.getters["SystemInfo/menuInfo"];
    this.systemInfo = this.$store.getters["SystemInfo/systemInfo"];
  },
  data() {
    return {
      menuInfo: {},
      systemInfo: {}
    };
  },
  computed: {
    customNavHeight() {
      return this.$store.getters["SystemInfo/customNavHeight"] + "px";
    },
    buttonTop() {
      return this.menuInfo.top + "px";
    },
    buttonLeft() {
      return this.systemInfo.windowWidth - this.menuInfo.right + "px";
    },
    buttonHeight() {
      return this.menuInfo.height + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.navigation-bar {
  text-align: center;
  transform: scale(1);
  .nav-icon {
    position: fixed;
  }

  .nav-name {
    display: inline-block;
    font-size: 12px;
  }
}
</style>