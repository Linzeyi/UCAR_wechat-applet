<template>
  <div class="wrap">
    <img src="http://ww1.sinaimg.cn/large/006KqXVSgy1g6nwc8htdrj30o00o0e81.jpg" alt="头像" />
    <div class="form">
      <div class="opacity">
        <div>
          <img src="/static/images/u162.svg" />
          <input type="text" placeholder="输入手机号码" />
        </div>
        <div>
          <img src="/static/images/u163.svg" />
          <count-down></count-down>
          <input type="text" placeholder="短信验证码" />
        </div>
        <div>
          <img src="/static/images/u109.svg" />
          <input type="text" placeholder="设置登录密码" />
        </div>
      </div>
      <div class="aggrement">
        <input type="checkbox" />
        <p>
          已阅读并同意《
          <span>用户服务协议</span>》
        </p>
      </div>
    </div>
    <div class="register">
      <span>确认</span>
    </div>
  </div>
</template>

<script>
import CountDown from '@/components/countDown/CountDown';
export default {
  components: {
    CountDown
  }
};
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
    width: 85%;
    margin-bottom: 70px;
    transform: scale(1);

    .opacity {
      opacity: 0.6;
    }

    .opacity > div > input {
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 1rpx solid rgb(228, 228, 228);
    }

    .opacity > div > img {
      position: fixed;
      width: 20px;
      height: 20px;
    }
    .aggrement {
      text-align: center;
      input {
        display: inline-block;
        vertical-align: middle;
      }
      p {
        display: inline-block;
        vertical-align: middle;
        span {
          color: rgb(26, 188, 156);
        }
      }
    }
  }

  .register {
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
}
</style>