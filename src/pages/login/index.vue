<template>
  <div class="wrap">
    <img src="http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg" alt="头像" />
    <div class="form">
      <img src="/static/images/u110.svg" />
      <input type="text" placeholder="账号" />
      <img src="/static/images/u109.svg" />
      <input type="text" placeholder="密码" />
    </div>
    <div class="forget">
      <span>忘记密码</span>
    </div>
    <div class="login">
      <span>登录</span>
    </div>
    <div class="create">
      <span>创建账号</span>
    </div>
  </div>
</template>

<script>
export default {
  created() {}
}
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    display: block;
    width: 80px;
    height: 80px;
    margin-bottom: 50px;
    border: 1px solid rgb(26, 188, 156);
  }

  .form {
    width: 80%;
    transform: scale(1);
    opacity: 0.5;

    input {
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 1rpx solid rgb(228, 228, 228);
    }

    img {
      position: fixed;
      width: 20px;
      height: 20px;
    }
  }

  .forget {
    width: 100%;
    color: rgb(26, 188, 156);
    text-align: right;
    margin-bottom: 60px;
    margin-right: 10px;
  }


  .login {
    width: 70%;
    height: 35px;
    border-radius: 10px;
    background-color: rgb(26, 188, 156);
    text-align: center;
    margin-bottom: 10px;

    span {
      vertical-align: middle;
      color: white;
      font-size: 1.2em;
    }
  }

  .create {
    color: rgb(26, 188, 156);
  }
}
</style>