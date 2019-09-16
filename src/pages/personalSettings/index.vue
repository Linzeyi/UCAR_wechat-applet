<template>
  <div class="wrap">
    <div class="head">
      <img class="avatar" :src="avatarUrl" @click="previewImage" mode="aspectFill" />
      <div>
        <p @click.stop="chooseImage">更改头像</p>
        <span>|</span>
        <button class="wx-login" open-type="getUserInfo" @getuserinfo="getUserInfo">微信头像</button>
      </div>
    </div>
    <div class="form">
      <div class="form-item">
        <span>用户ID</span>
        <input type="text" disabled />
      </div>
      <div class="form-item">
        <span>昵称</span>
        <input type="text" placeholder="--" v-model="name" @focus="index = 0" @blur="index = null" />
        <i class="iconfont icon-cancel" v-show="showCancel[0]" @click="name = ''">&#xe65c;</i>
      </div>
      <div class="form-item">
        <span>邮箱</span>
        <input type="text" placeholder="--" v-model="email" @focus="index = 1" @blur="index = null" />
        <i class="iconfont icon-cancel" v-show="showCancel[1]" @click="email = ''">&#xe65c;</i>
      </div>
      <div class="form-item">
        <span>性别</span>
        <div class="gender">
          <div :class="{genderActive: isGenderActive}" @click="isGenderActive = !isGenderActive">
            <span>男</span>
          </div>
          <div :class="{genderActive: !isGenderActive}" @click="isGenderActive = !isGenderActive">
            <span>女</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div @click="Utils.navigateTo('/pages/updatePassword/main')">
        <span>修改密码</span>
        <i class="iconfont icon-size">&#xe601;</i>
      </div>
      <div>
        <span>注销</span>
        <i class="iconfont icon-size">&#xe601;</i>
      </div>
      <div @click="showActionSheet = true">出现</div>
    </div>
    <mp-toast type="error" v-model="showToast" content="未取得授权" :duration="1500"></mp-toast>
    <base-action-sheet :show.sync="showActionSheet">
      <div class="action-sheet-item">微信头像</div>
      <div class="action-sheet-item">从相册选择</div>
      <div class="action-sheet-item">拍照</div>
    </base-action-sheet>
  </div>
</template>

<script>
import mpToast from "mpvue-weui/src/toast";
import BaseActionSheet from "@/components/base/BaseActionSheet";
export default {
  components: {
    mpToast,
    BaseActionSheet
  },
  data() {
    return {
      avatarUrl: "",
      showCancel: [false, false],
      name: "",
      email: "",
      isGenderActive: true,
      index: null,
      showToast: false,
      showActionSheet: false
    };
  },
  methods: {
    previewImage() {
      if (this.avatarUrl === "") {
        this.chooseImage();
        return;
      }
      const _this = this;
      console.log(_this.avatarUrl);
      wx.previewImage({
        current: _this.avatarUrl,
        urls: [_this.avatarUrl]
      });
    },
    chooseImage() {
      const _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.avatarUrl = tempFilePaths[0];
        }
      });
    },
    controlCancelShow() {
      if (this.name === "" || this.index !== 0) {
        this.showCancel[0] = false;
      } else {
        this.showCancel[0] = true;
      }

      if (this.email === "" || this.index !== 1) {
        this.showCancel[1] = false;
      } else {
        this.showCancel[1] = true;
      }
    },
    getUserInfo(e) {
      const detail = e.mp.detail;
      if (detail.userInfo) {
        this.avatarUrl = detail.userInfo.avatarUrl;
      } else {
        this.showToast = true;
      }
    }
  },
  watch: {
    name() {
      this.controlCancelShow();
    },
    email() {
      this.controlCancelShow();
    },
    index() {
      this.controlCancelShow();
    }
  }
};
</script>

<style lang="less" scoped>
.action-sheet-item {
  height: 120rpx;
  line-height: 120rpx;
  text-align: center;
  font-size: 35rpx;
  border-bottom: 2rpx solid rgb(228, 228, 228);
}

.icon-cancel {
  color: rgb(138, 138, 138);
}

.icon-size {
  font-size: 25rpx;
}
.gender {
  display: inline-block;
  text-align: center;

  > div {
    height: 60rpx;
    line-height: 60rpx;
    width: 80rpx;
    display: inline-block;
    border: 2rpx solid black;
  }
}

.genderActive {
  background-color: rgb(138, 138, 138);
}
.wrap {
  padding-top: 50rpx;
  font-size: 30rpx;

  .head {
    margin: auto;
    padding-bottom: 60rpx;
    text-align: center;
    border-bottom: 2rpx solid rgb(228, 228, 228);

    p {
      vertical-align: middle;
      display: inline-block;
    }

    span {
      vertical-align: middle;
      color: #fd6432;
      font-size: 35rpx;
      font-weight: bold;
    }

    button {
      padding: 0;
      line-height: normal;
      display: inline-block;
      font-size: 30rpx;
      background-color: white;
      vertical-align: middle;
    }
  }

  .avatar {
    height: 120rpx;
    width: 120rpx;
    border-radius: 50%;
    border: 2rpx solid black;
  }

  .form {
    .form-item {
      transform: scale(1);
      padding: 30rpx 70rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > span {
        width: 160rpx;
        vertical-align: middle;
      }

      i {
        margin-left: 25rpx;
        vertical-align: middle;
      }

      input {
        flex-grow: 1;
        max-width: 400rpx;
        min-height: 30rpx;
        text-align: start;
        display: inline-block;
        font-size: 30rpx;
      }
    }
  }

  .footer {
    margin-top: 60rpx;
    width: 100%;
    > div {
      padding: 30rpx 70rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
      display: flex;
      justify-content: space-between;

      &:nth-of-type(1) {
        border-top: 2rpx solid rgb(228, 228, 228);
      }
    }
  }
}
</style>