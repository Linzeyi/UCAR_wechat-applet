<template>
  <div class="wallet-wrap">
    <div class="recharge-content">
      <p>充值金额</p>
      <div class="amount">
        <i class="iconfont">&#xe808;</i>
        <input type="number" pattern="[0-9]*" class="weui-input" placeholder="输入金额">
      </div>
    </div>
    <button class="weui-btn confirm">确定</button>
  </div>
</template>

<script>
export default {
  create () {

  }
}
</script>

<style lang="less" scoped>
.recharge-content {
  box-shadow: 0 0.08px rgb(194, 194, 194);
  padding: 0 20px;
  p {
    font-size: 0.5rem;
  }
  .amount {
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
      font-size: 0.7rem;
      line-height: inherit;
    }
    input {
      font-size: 0.5rem;
    }
  }
}
.confirm {
  position: absolute;
  bottom: 12px;
  color: white;
  background: black;
  width: 94%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>