<template>
  <div class="wrap">
    <div class="header">
      <span>欢迎登陆XX</span>
    </div>
    <div class="form">
      <div class="form-item">
        <input type="number" placeholder="手机号">
      </div>
      <div class="form-item">
        <input type="text">
      </div>
    </div>
    <!--封装按钮-->
    <div class="text-box">
      <span>创建账号</span>
      <span>忘记密码</span>
    </div>
    <div class="fotter">
      <span>登录代表你已同意用户服务协议</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.wrap {
  box-sizing: border-box;
  padding: 110rpx 80rpx 40rpx;
  height: 100%;
  .header {
    font-size: 50rpx;
  }
  .form {
    margin-top: 100rpx;
    .form-item {
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: 1px solid rgb(229, 229, 229);
    }
  }
}
</style>
