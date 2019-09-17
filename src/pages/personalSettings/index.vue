<template>
  <div class="background">
    <div class="wrap">
      <div class="form">
        <div class="form-item form-avatar" @click="showAvatarSheet = true">
          <span>头像</span>
          <div class="avatar-right-box">
            <img :src="avatarUrl" @click.stop="previewImage" mode="aspectFill" />
            <i class="iconfont icon-size">&#xe601;</i>
          </div>
        </div>
        <div class="form-item">
          <span>用户ID</span>
          <input type="text" disabled />
        </div>
        <div class="form-item form-name" @click="focusName=true">
          <span>昵称</span>
          <div class="name-right-box">
            <input
              type="text"
              placeholder="--"
              v-model="name"
              @blur="focusName=false"
              @focus="focusName=true"
              :focus="focusName"
            />
            <i class="iconfont icon-cancel" v-show="showCancel[0]" @click.stop="name = ''">&#xe65c;</i>
          </div>
        </div>
        <div class="form-item form-email" @click="focusEmail=true">
          <span>邮箱</span>
          <div class="email-right-box">
            <input
              type="text"
              placeholder="--"
              v-model="email"
              @blur="focusEmail=false"
              @focus="focusEmail=true"
              :focus="focusEmail"
            />
            <i class="iconfont icon-cancel" v-show="showCancel[1]" @click="email = ''">&#xe65c;</i>
          </div>
        </div>
        <div class="form-item form-gender" @click="showGenderSheet=true">
          <span>性别</span>
          <div class="gender">
            <span>{{gender}}</span>
            <i class="iconfont icon-size">&#xe601;</i>
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
      </div>
      <div class="save-bottom">
        <span>保存用户信息</span>
      </div>
      <mp-toast type="error" v-model="showToast" content="未取得授权" :duration="1500"></mp-toast>
      <base-action-sheet :show.sync="showGenderSheet">
        <div class="action-sheet-item" @click="gender='男'">男</div>
        <div class="action-sheet-item" @click="gender='女'">女</div>
        <div class="action-sheet-item" @click="gender='保密'">保密</div>
      </base-action-sheet>
      <base-action-sheet :show.sync="showAvatarSheet">
        <button
          class="action-sheet-item wx-button"
          open-type="getUserInfo"
          @getuserinfo="getUserInfo"
        >微信头像</button>
        <div class="action-sheet-item" @click="chooseImage('album')">从相册选择</div>
        <div class="action-sheet-item" @click="chooseImage('camera')">拍照</div>
      </base-action-sheet>
    </div>
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
      name: "",
      email: "",
      gender: "",
      showCancel: [false, false],
      showToast: false,
      showAvatarSheet: false,
      showGenderSheet: false,
      focusName: false,
      focusEmail: false
    };
  },
  methods: {
    previewImage() {
      if (this.avatarUrl === "") {
        this.showAvatarSheet = true;
        return;
      }
      const _this = this;
      console.log(_this.avatarUrl);
      wx.previewImage({
        current: _this.avatarUrl,
        urls: [_this.avatarUrl]
      });
    },
    chooseImage(type) {
      const _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: [type],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.avatarUrl = tempFilePaths[0];
        }
      });
    },
    controlCancelShow() {
      if (this.name === "" || !this.focusName) {
        this.showCancel[0] = false;
      } else {
        this.showCancel[0] = true;
      }

      if (this.email === "" || !this.focusEmail) {
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
    focusEmail() {
      this.controlCancelShow();
    },
    focusName() {
      this.controlCancelShow();
    }
  }
};
</script>

<style lang="less" scoped>
@itemHeight: 120rpx;
.action-sheet-item {
  height: @itemHeight;
  line-height: @itemHeight;
  text-align: center;
  font-size: 40rpx;
  color: rgb(78, 160, 249);
  border-bottom: 2rpx solid rgb(200, 200, 200);

  &:first-child {
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
  }
  &:last-child {
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
  }
  &:hover {
    background-color: rgb(153, 153, 153);
  }
}

.wx-button {
  height: @itemHeight;
  line-height: @itemHeight;
  background-color: rgb(249, 249, 249);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.icon-cancel {
  color: rgb(138, 138, 138);
}
.icon-size {
  font-size: 25rpx;
}
.background {
  height: 100%;
  background-color: rgb(243, 243, 243);
}
.wrap {
  font-size: 30rpx;
  background-color: white;
  padding-top: 30rpx;

  .form {
    .form-item {
      height: 110rpx;
      line-height: 110rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 70rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
    }
    .form-avatar {
      height: 130rpx;
      line-height: 130rpx;
      .avatar-right-box {
        line-height: 100rpx;
        i {
          vertical-align: middle;
        }
        img {
          height: 100rpx;
          width: 100rpx;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }

    .form-gender {
      .gender-right-box {
        i {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }
    .form-name {
      .name-right-box {
        span {
          vertical-align: middle;
        }
        input {
          text-align: right;
          width: 440rpx;
          display: inline-block;
          font-size: 30rpx;
          vertical-align: middle;
        }
        i {
          margin-left: 15rpx;
          vertical-align: middle;
        }
      }
    }
    .form-email {
      .email-right-box {
        span {
          vertical-align: middle;
        }
        input {
          text-align: right;
          width: 440rpx;
          display: inline-block;
          font-size: 30rpx;
          vertical-align: middle;
        }
        i {
          margin-left: 15rpx;
          vertical-align: middle;
        }
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
      align-items: center;

      &:nth-of-type(1) {
        border-top: 2rpx solid rgb(228, 228, 228);
      }
    }
  }

  .save-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    line-height: 100rpx;
    color: rgb(148, 48, 38);
    text-align: center;
    background-color: white;
  }
}
</style>