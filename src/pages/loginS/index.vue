<template>
  <div class="wrap">
    <div class="header">
      <div class="avatar" :class="{'shift-right': showAvatar}">
        <img :src="avatarUrl" alt="头像" />
      </div>
      <div class="no-avatar">
        <span>欢迎登陆XX</span>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <div class="form-item">
          <span
            :class="form.phone!==''||selectInput==='phone'?'placeholder':'reverse-placeholder'"
          >手机号</span>
          <i
            class="iconfont"
            v-show="form.phone!==''&&selectInput==='phone'"
            @touchstart="form.phone=''"
          >&#xe65c;</i>
          <input
            class="input-phone"
            type="number"
            v-model="form.phone"
            @focus="selectInput='phone'"
            @blur="selectInput=''"
            maxlength="11"
          />
        </div>
        <p class="phone-warn" :class="showPhoneWarn?'phone-warn-in':'phone-warn-out'">请输入有效的手机号码</p>
        <div class="gap"></div>
        <div class="form-item">
          <span
            :class="form.password!==''||selectInput==='password'?'placeholder':'reverse-placeholder'"
          >密码</span>
          <i
            class="iconfont"
            v-show="form.password!==''&&selectInput==='password'"
            @touchstart="form.password=''"
          >&#xe65c;</i>
          <input
            class="input-passowrd"
            type="password"
            v-model="form.password"
            @focus="selectInput='password'"
            @blur="selectInput=''"
            maxlength="20"
          />
        </div>
      </div>
    </div>
    <div class="text-box">
      <span>创建账号</span>
      <span>忘记密码</span>
    </div>
    <div class="agreement">
      <span>登录代表你已同意用户服务协议</span>
    </div>
  </div>
</template>

<script>
export default {
  onLoad() {
    this.handleInputDebounce = this.Utils.delayDebounce(this.checkPhone);
  },
  data() {
    return {
      form: {
        phone: "",
        password: ""
      },
      avatarUrl: "",
      showAvatar: false,
      selectInput: "",
      isValidPhone: false,
      handleInputDebounce: ""
    };
  },
  computed: {
    showPhoneWarn() {
      return !this.isValidPhone && this.form.phone !== "";
    }
  },
  methods: {
    async getAvatar() {
      const result = await this.$http.get("/action/user/getAvatarByPhone", {
        phone: this.form.phone
      });
      if (result.data.avatarUrl) {
        this.avatarUrl = result.data.avatarUrl;
        this.showAvatar = true;
      } else {
        this.showAvatar = false;
        this.isValidPhone = false
      }
    },
    checkPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        this.isValidPhone = false;
        this.showAvatar = false;
        return;
      }
      this.isValidPhone = true;
      this.getAvatar();
    }
  },
  watch: {
    "form.phone"() {
      this.handleInputDebounce();
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes shift-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(375px);
  }
}

.gap {
  height: 50rpx;
}
.wrap {
  box-sizing: border-box;
  height: 100%;
  .header {
    height: 400rpx;
    font-size: 50rpx;
    display: flex;
    .avatar {
      overflow: hidden;
      flex-shrink: 0;
      width: 0;
      background-color: #fc9156;
      text-align: center;
      line-height: 400rpx;
      transition: width 0.3s ease-in-out;
      img {
        vertical-align: -60rpx;
        height: 150rpx;
        width: 150rpx;
        border-radius: 50%;
      }
    }
    .no-avatar {
      padding: 110rpx 80rpx 0;
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
    }
    .shift-right {
      width: 100%;
    }
  }
  .content {
    margin-top: 150rpx;
    padding: 0 80rpx;
    .form {
      .form-item {
        height: 60rpx;
        line-height: 60rpx;
        position: relative;
        border-bottom: 1px solid rgb(229, 229, 229);
        span {
          position: absolute;
          left: 0;
          color: #555;
          transition: all 0.3s ease-in-out;
        }

        i {
          position: absolute;
          right: 0;
          color: rgb(138, 138, 138);
        }
        input {
          height: 60rpx;
          width: 500rpx;
          min-height: 60rpx;
          line-height: 60rpx;
          font-size: 30rpx;
        }
      }
    }
  }
  .text-box {
    margin-top: 20rpx;
    padding: 0 80rpx;
    display: flex;
    justify-content: space-between;
    span {
      color:#f88070;
    }
  }
}

.phone-warn {
  font-size: 25rpx;
  color: #f88070;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  transform: translateY(-30rpx);
  transition: all 0.3s ease-in-out;
}
.phone-warn-in {
  width: 100%;
  transform: translateY(0);
}
.phone-warn-out {
  width: 0;
  transform: translateY(-10rpx);
}
.placeholder {
  font-size: 25rpx;
  transform: translateY(-60rpx);
}
.reverse-placeholder {
  font-size: 30rpx;
  transform: translateY(0);
}
</style>


