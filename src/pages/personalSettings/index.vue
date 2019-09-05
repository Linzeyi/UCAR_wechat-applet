<template>
  <div class="wrap">
    <div class="head">
      <img class="avatar" :src="avatar" @click="previewImage" />
      <p @click.stop="chooseImage">更改头像</p>
    </div>
    <div class="form"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: ''
    };
  },
  methods: {
    previewImage() {
      if (this.avatar === '') {
        this.chooseImage()
        return
      }
      const _this = this
      wx.previewImage({
        current: _this.avatar,
        urls: _this.avatar
      });
    },
    chooseImage() {
      const _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.avatar = tempFilePaths;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  .head {
    margin: auto;
    margin-top: 50px;
    text-align: center;
  }

  .avatar {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    border: 1px solid black;
  }
}
</style>