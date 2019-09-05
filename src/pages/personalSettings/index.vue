<template>
  <div class="wrap">
    <div>
      <img class="avatar" :src="avatar" />
    </div>
    <div class="form"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatart: '/static/images/user.png'
    };
  }
};
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    height: 80px;
    width: 80px;
    // border-radius: 50%;
  }
}
</style>