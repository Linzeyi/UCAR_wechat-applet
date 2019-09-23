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
            <span>{{getSex}}</span>
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
      <div @click="logout">
        <span>注销</span>
        <i class="iconfont icon-size">&#xe6ab;</i>
      </div>
    </div>
    <div class="save-bottom" @click="saveUserInfo">
      <span>保存用户信息</span>
    </div>
    <mp-toast type="error" v-model="showToast" content="未取得授权" :duration="1500"></mp-toast>
    <base-action-sheet :show.sync="showGenderSheet">
      <div class="action-sheet-item" @click="sex=1">男</div>
      <div class="action-sheet-item" @click="sex=2">女</div>
      <div class="action-sheet-item" @click="sex=-1">保密</div>
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
    <mp-loading :showLoading="showLoading" loadingText="上传图片中" :mask="true"></mp-loading>
    <base-toast></base-toast>
    <base-load :loadStatus="loadStatus" @reLoad="loadUserInfo"></base-load>
  </div>
</template>

<script>
import BaseToast from "@/components/base/BaseToast";
import BaseActionSheet from "@/components/base/BaseActionSheet";
import BaseLoad from "@/components/base/BaseLoad";
import mpLoading from "mpvue-weui/src/loading";
export default {
  components: {
    BaseToast,
    BaseActionSheet,
    mpLoading,
    BaseLoad
  },
  data() {
    return {
      id: "",
      avatarUrl: "",
      nickname: "",
      email: "",
      sex: 0,
      showToast: false,
      showAvatarSheet: false,
      showGenderSheet: false,
      focusIndex: "",
      showLoading: false,
      loadStatus: ""
    };
  },
  async onShow() {
    this.loadUserInfo();
  },
  computed: {
    getSex() {
      return this.sex === -1 ? "保密" : this.sex === 1 ? "男" : "女";
    }
  },
  methods: {
    async loadUserInfo() {
      try {
        this.loadStatus = "loading";
        const result = await this.$http.get("/action/user/getInfo");
        this.id = result.data.memberInfo.id;
        this.avatarUrl = result.data.memberInfo.avatarUrl;
        this.nickname = result.data.memberInfo.nickname;
        this.email = result.data.memberInfo.email;
        this.sex = result.data.memberInfo.sex;
        this.loadStatus = "online";
      } catch (error) {
        this.loadStatus = "offline";
      }
    },
    previewImage() {
      if (this.avatarUrl === "") {
        this.showAvatarSheet = true;
        return;
      }
      const _this = this;
      wx.previewImage({
        current: _this.avatarUrl,
        urls: [_this.avatarUrl]
      });
    },
    chooseImage(type) {
      const _this = this;
      const allowExt = ["jpg", "png", "gif", "ico"];
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: [type],
        success(res) {
          const tempFile = res.tempFiles[0];
          if (tempFile.size > 1260000) {
            _this.$store.commit("BaseStore/SHOW_TOAST", {
              type: "error",
              content: "图片需小于1.2MB"
            });
            return;
          }
          const tempPath = tempFile.path;
          const splits = tempPath.split(".");
          const ext = splits[splits.length - 1].toLowerCase();
          if (!allowExt.includes(ext)) {
            _this.$store.commit("BaseStore/SHOW_TOAST", {
              type: "error",
              content: "请上传jpg/png/ico/gif格式的图片"
            });
            return;
          }
          _this.handleTempAvatar(tempPath);
        }
      });
    },
    async getUserInfo(e) {
      const detail = e.mp.detail;
      if (detail.userInfo) {
        const url = detail.userInfo.avatarUrl;
        await this.handleWechhatAvatar(url);
      }
    },
    async handleTempAvatar(tempPath) {
      let base64 = wx.getFileSystemManager().readFileSync(tempPath, "base64");
      await this.uploadAvatar(base64);
    },
    handleWechhatAvatar(tempPath) {
      const _this = this;
      wx.request({
        url: tempPath,
        responseType: "arraybuffer",
        async success(res) {
          let base64 = wx.arrayBufferToBase64(res.data);
          await _this.uploadAvatar(base64);
        }
      });
    },
    async uploadAvatar(base64) {
      base64 = "data:image/png;base64," + base64;
      const encodeBase64 = base64.replace(/\+/g, ".");
      this.showLoading = true;
      try {
        const result = await this.$http.post("/action/user/uploadAvatar", {
          fileName: "image",
          file: encodeBase64
        });
        this.avatarUrl = result.data.imgUrl;
      } catch (error) {
        this.showLoading = false;
        this.$store.commit("BaseStore/SHOW_TOAST", {
          type: "error",
          content: "上传失败，请检查网络~"
        });
      }
      this.showLoading = false;
    },
    saveUserInfo() {
      this.$http.post("/action/user/modifyInfo", {
        avatarUrl: this.avatarUrl,
        nickname: this.nickname,
        email: this.email,
        sex: this.sex
      });
    },
    logout() {
      this.$store.commit("UserInfo/REMOVE_USERINFO");
      wx.removeStorage({
        key: "token"
      });
      this.Utils.navigateTo("/pages/login/main");
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
      &:active {
        span {
          display: inline-block;
          transform: scale(0.9);
        }
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