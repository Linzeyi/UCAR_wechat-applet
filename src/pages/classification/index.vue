<template>
  <div class="wrap">
    <div class="left-panel">
      <div
        v-for="(item, idx) in classList"
        :class="{active: isActive === idx}"
        @click="isActive = idx"
        :key="item.id"
      >
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="right-panel">
      <img v-for="item in images" :src="item.url" :key="item.id" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: null,
      classList: [
        { id: "1", name: "品类一" },
        { id: "2", name: "品类二" },
        { id: "3", name: "品类三" },
        { id: "4", name: "品类四" }
      ],
      images: [
        { id: "1", url: "" },
        { id: "2", url: "" },
        { id: "3", url: "" },
        { id: "4", url: "" },
        { id: "5", url: "" },
        { id: "6", url: "" },
        { id: "7", url: "" },
        { id: "8", url: "" },
        { id: "9", url: "" },
        { id: "10", url: "" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.active {
  background-color: rgb(200, 200, 200);
  color: rgb(26, 188, 156);
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 30rpx;
}

.left-panel {
  margin-top: 20rpx;
  width: 240rpx;
  height: 100%;
  text-align: center;
  border-right: 1rrpx solid rgb(200, 200, 200);
  overflow: scroll;
  flex-shrink: 0;

  > div {
    height: 80rpx;
    border: 2rpx solid rgb(200, 200, 200);

    > span {
      line-height: 80rpx;
    }
  }
}

.right-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;

  img {
    height: 140rpx;
    width: 140rpx;
    margin: 20rpx;
    border: 2rpx solid black;
  }
}
</style>