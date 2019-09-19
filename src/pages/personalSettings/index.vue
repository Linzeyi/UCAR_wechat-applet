<template>
  <div class="wrap">
    <div class="settings">
      <p class="settings-title">基础信息</p>
      <div class="form">
        <div class="form-item form-avatar" @click="showAvatarSheet = true;focusIndex=''">
          <span>头像</span>
          <div class="avatar-right-box">
            <img :src="avatarUrl" @click.stop="previewImage" mode="aspectFill" />
            <i class="iconfont icon-size">&#xe6ab;</i>
          </div>
        </div>
        <div class="form-item">
          <span>用户ID</span>
          <p>{{id}}</p>
        </div>
        <div class="form-item">
          <span>昵称</span>
          <div class="right-box">
            <input type="text" placeholder="--" v-model="nickname" @focus="focusIndex='nickname'" />
            <i
              class="iconfont icon-cancel icon-size"
              v-if="nickname !== '' && focusIndex === 'nickname'"
              @click="nickname = ''"
            >&#xe65c;</i>
            <i class="iconfont icon-size" v-else>&#xe6ab;</i>
          </div>
        </div>
        <div class="form-item">
          <span>邮箱</span>
          <div class="right-box">
            <input type="text" placeholder="--" v-model="email" @focus="focusIndex='email'" />
            <i
              class="iconfont icon-cancel icon-size"
              v-if="email !== '' && focusIndex === 'email'"
              @click="email = ''"
            >&#xe65c;</i>
            <i class="iconfont icon-size" v-else>&#xe6ab;</i>
          </div>
        </div>
        <div class="form-item" @click="showGenderSheet=true;focusIndex=''">
          <span>性别</span>
          <div>
            <span>{{sex}}</span>
            <i class="iconfont icon-size">&#xe6ab;</i>
          </div>
        </div>
      </div>
    </div>
    <div class="others">
      <div @click="Utils.navigateTo('/pages/updatePassword/main')">
        <span>修改密码</span>
        <i class="iconfont icon-size">&#xe6ab;</i>
      </div>
      <div>
        <span>注销</span>
        <i class="iconfont icon-size">&#xe6ab;</i>
      </div>
    </div>
    <div class="save-bottom">
      <span>保存用户信息</span>
    </div>
    <mp-toast type="error" v-model="showToast" content="未取得授权" :duration="1500"></mp-toast>
    <base-action-sheet :show.sync="showGenderSheet">
      <div class="action-sheet-item" @click="sex='男'">男</div>
      <div class="action-sheet-item" @click="sex='女'">女</div>
      <div class="action-sheet-item" @click="sex='保密'">保密</div>
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
      id: "",
      avatarUrl: "",
      nickname: "",
      email: "",
      sex: "",
      showToast: false,
      showAvatarSheet: false,
      showGenderSheet: false,
      focusIndex: ""
    };
  },
  onShow() {
    this.id = this.$store.getters["UserInfo/id"];
    this.avatarUrl = this.$store.getters["UserInfo/avatarUrl"];
    this.nickname = this.$store.getters["UserInfo/nickname"];
    this.email = this.$store.getters["UserInfo/email"];
    this.sex = this.$store.getters["UserInfo/sex"];
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
    getUserInfo(e) {
      const detail = e.mp.detail;
      if (detail.userInfo) {
        this.avatarUrl = detail.userInfo.avatarUrl;
      } else {
        this.showToast = true;
      }
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
  &:active {
    background-color: rgb(180, 180, 180);
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
  font-size: 30rpx;
}

.wrap {
  height: 100%;
  background-color: rgb(243, 243, 243);
  padding: 20rpx;
  font-size: 30rpx;
  .settings {
    background-color: white;
    border-radius: 20rpx;
    padding-top: 20rpx;

    .settings-title {
      margin-left: 50rpx;
      font-weight: bold;
      font-size: 26rpx;
      color: rgb(148, 148, 148);
    }
    .form {
      .form-item {
        height: 110rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 70rpx;
        border-bottom: 2rpx solid rgb(228, 228, 228);

        &:last-child {
          border-bottom: 0;
        }
        > span {
          width: 120rpx;
        }
        .right-box {
          > input {
            width: 400rpx;
            display: inline-block;
            text-align: right;
            font-size: 30rpx;
            vertical-align: middle;
          }
          > i {
            vertical-align: -4rpx;
          }
        }
      }
      .form-avatar {
        height: 140rpx;
        .avatar-right-box {
          img {
            height: 100rpx;
            width: 100rpx;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .others {
    margin-top: 60rpx;
    background-color: white;
    border-radius: 20rpx;
    > div {
      height: 110rpx;
      padding: 0 70rpx;
      border-bottom: 2rpx solid rgb(228, 228, 228);
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:last-child {
        border-bottom: 0;
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
    text-align: center;
    background-color: white;
    &:active {
      span {
        display: inline-block;
        transform: scale(0.9);
      }
    }
    span {
      color: rgb(148, 48, 38);
    }
  }
}
</style>