<template>
  <div class="wrap">
    <div class="head">
      <img class="avatar" :src="avatar" @click="previewImage" mode="aspectFill" />
      <p @click.stop="chooseImage">更改头像</p>
    </div>
    <div class="form">
      <div class="form-item">
        <span>用户Id</span>
        <input type="text" @focus="toogleInput(0)" disabled/>
        <i class="iconfont" v-show="inputActive[0]">&#xe65c;</i>
      </div>
      <div class="form-item">
        <span>昵称</span>
        <input type="text" placeholder="--" @focus="toogleInput(1)" v-model="name"/>
        <i class="iconfont" v-show="inputActive[1]" @click="name=''">&#xe65c;</i>
      </div>
      <div class="form-item">
        <span>邮箱</span>
        <input type="text" placeholder="--" @focus="toogleInput(2)" v-model="email"/>
        <i class="iconfont" v-show="inputActive[2]" @click="email=''">&#xe65c;</i>
      </div>
      <div class="form-item">
        <span>性别</span>
        <input type="text" placeholder="--" />
      </div>
    </div>
    <div class="footer">
      <div>
        <span>修改密码</span>
        <i class="iconfont">&#xe601;</i>
      </div>
      <div>
        <span>注销</span>
        <i class="iconfont">&#xe601;</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: '',
      inputActive: [false, false, false],
      name: '',
      email: ''
    };
  },
  methods: {
    previewImage() {
      if (this.avatar === '') {
        this.chooseImage();
        return;
      }
      const _this = this;
      wx.previewImage({
        current: _this.avatar,
        urls: _this.avatar
      });
    },
    chooseImage() {
      const _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.avatar = tempFilePaths;
        }
      });
    },
    toogleInput(index) {
      this.inputActive = [false, false, false]
      this.inputActive[index] = true
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  .head {
    margin: auto;
    margin-top: 50px;
    padding-bottom: 30px;
    text-align: center;
    border-bottom: 2px solid rgb(228, 228, 228);
  }

  .avatar {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 1px solid black;
  }

  .form {
    .form-item {
      padding: 15px 35px;
      border-bottom: 2px solid rgb(228, 228, 228);
      display: flex;
      justify-content: space-between;

      i {
        position: fixed;
        right: 15px;
      }

      input {
        flex-grow: 1;
        max-width: 220px;
        text-align: start;
        display: inline-block;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    > div {
      padding: 15px 35px;
      border-bottom: 2px solid rgb(228, 228, 228);
      display: flex;
      justify-content: space-between;

      &:nth-of-type(1) {
        border-top: 2px solid rgb(228, 228, 228);
      }
    }
  }
}
</style>