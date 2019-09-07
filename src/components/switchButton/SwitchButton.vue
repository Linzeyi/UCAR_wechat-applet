<template>
  <div class="wrap">
    <input type="checkbox" class="offscreen" v-model="checkboxActive" />
    <label :class="{checked: checkboxActive, switch: true}" @click="checkboxActive = !checkboxActive"></label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxActive: false
    };
  }
};
</script>

<style lang="less" scoped>
.wrap {
  position: fixed;
  right: 0;
  height: 100%;
  width: 40px;
  z-index: 3;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
}
.switch::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: all 0.3s;
}

.checked.switch {
  background-color: rgb(26, 188, 156);
  &::after {
    transform: translateX(20px);
  }
}
.offscreen {
  position: absolute;
  left: -9999px;
}
</style>