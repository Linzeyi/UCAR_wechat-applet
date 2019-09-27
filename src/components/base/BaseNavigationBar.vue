<template>
  <div
    class="navigation-bar"
    :style="{'height': customNavHeight, 'background-color': bgColor, 'color': fontColor}"
  >
    <div
      class="nav-icon"
      :style="{'top': iconTop, 'left': iconLeft, 'height': iconHeight, 'line-height': iconHeight}"
    >
      <slot></slot>
    </div>
    <div
      class="nav-title"
      :style="{'margin-top':iconTop,'height': iconHeight, 'line-height': iconHeight}"
    >{{handleName}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    bgColor: {
      type: String,
      default: "white"
    },
    fontColor: {
      type: String,
      default: "black"
    }
  },
  created() {
    this.menuInfo = this.$store.getters["SystemInfo/menuInfo"];
    this.systemInfo = wx.getSystemInfoSync();
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
    iconTop() {
      return this.menuInfo.top + "px";
    },
    iconLeft() {
      return 8 + this.systemInfo.windowWidth - this.menuInfo.right + "px";
    },
    iconHeight() {
      return this.menuInfo.height + "px";
    },
    handleName() {
      if (this.name.length > 9) {
        return this.name.slice(0, 9) + "...";
      } else {
        return this.name;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.navigation-bar {
  text-align: center;
  transform: scale(1);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  .nav-icon {
    position: fixed;

    & /deep/ i {
      font-size: large;
    }
  }

  .nav-title {
    display: inline-block;
    font-weight: bold;
    font-size: large;
  }
}
</style>