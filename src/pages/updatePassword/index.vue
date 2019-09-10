<template>
  <div class="wrap">
    <div>
      <span>旧密码</span>
      <input type="password" />
    </div>
    <div>
      <span>新密码</span>
      <input type="password" />
    </div>
    <div>
      <span>确认密码</span>
      <input type="password" />
    </div>
    <div class="captcha">
      <span>短信验证码</span>
      <input type="text" maxlength="8" />
      <div class="captcha">
        <captcha></captcha>
      </div>
    </div>
  </div>
</template>

<script>
import Captcha from "@/components/captcha/Captcha";
export default {
  components: {
    Captcha
  }
};
</script>

<style lang="less" scoped>
.captcha {
  vertical-align: middle;
  display: inline-block;
}

.wrap {
  height: 100%;
  width: 100%;
  padding-top: 30rpx;
  font-size: 30rpx;

  > div {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 50rpx;
    border-bottom: 2rpx solid #e4e4e4;
    &:nth-of-type(1) {
      border-top: 2rpx solid #e4e4e4;
    }

    > span {
      display: inline-block;
      width: 160rpx;
      vertical-align: middle;
    }

    > input {
      margin: 0;
      margin-left: 10rpx;
      vertical-align: middle;
      max-width: 300rpx;
      display: inline-block;
      font-size: 30rpx;
    }
  }
}
</style>