<template>
  <div class="wrap">
    <scroll-view
      class="scroll-left"
      scroll-y
      scroll-with-animation
      @scroll="scrollHandle"
      :scroll-top="scrollTop"
    >
      <div
        v-for="(item, idx) in classList"
        :class="{'class-item': true ,active: isActive === idx}"
        @click="clickItem(idx)"
        :key="item.id"
      >
        <div class="high-light" v-show="isActive === idx"></div>
        <span>{{item.id}}</span>
      </div>
    </scroll-view>
    <scroll-view scroll-y style="height: 100%" @scroll="scrollHandle">
      <div class="right-panel">
        <img v-for="item in images" :src="item.url" :key="item.id" />
      </div>
    </scroll-view>
  </div>
</template>

<script>
import GoodsGridList from "@/components/goodsGridList/goodsGridList";
export default {
  components: {
    GoodsGridList
  },
  data() {
    return {
      itemHeight: 0,
      halfWindowHeight: 0,
      scrollTop: 0,
      isActive: null,
      classList: [
        { id: "1", name: "品类一" },
        { id: "2", name: "品类二" },
        { id: "3", name: "品类三" },
        { id: "4", name: "品类四" },
        { id: "5", name: "品类四" },
        { id: "6", name: "品类四" },
        { id: "7", name: "品类四" },
        { id: "8", name: "品类四" },
        { id: "9", name: "品类四" },
        { id: "10", name: "品类四" },
        { id: "11", name: "品类四" },
        { id: "12", name: "品类四" },
        { id: "13", name: "品类四" },
        { id: "14", name: "品类四" },
        { id: "15", name: "品类四" },
        { id: "16", name: "品类四" },
        { id: "17", name: "品类四" },
        { id: "18", name: "品类四" },
        { id: "19", name: "品类四" }
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
        { id: "10", url: "" },
        { id: "11", url: "" },
        { id: "12", url: "" },
        { id: "13", url: "" },
        { id: "14", url: "" },
        { id: "15", url: "" },
        { id: "16", url: "" },
        { id: "17", url: "" },
        { id: "18", url: "" },
        { id: "19", url: "" },
        { id: "20", url: "" },
        { id: "21", url: "" },
        { id: "22", url: "" },
        { id: "23", url: "" },
        { id: "24", url: "" },
        { id: "25", url: "" },
        { id: "26", url: "" },
        { id: "27", url: "" },
        { id: "28", url: "" },
        { id: "29", url: "" },
        { id: "30", url: "" }
      ]
    };
  },
  mounted() {
    const systemInfo = this.$store.getters["SystemInfo/systemInfo"];
    const windowWidth = systemInfo.windowWidth;
    const windowHeight = systemInfo.windowHeight;
    const scale = windowWidth / 750;
    this.itemHeight = 100 * scale;
    this.halfWindowHeight = windowHeight / 2;
  },
  methods: {
    scrollHandle(e) {
      console.log(e.mp.detail);
    },
    clickItem(index) {
      this.isActive = index;
      this.selectMiddle(index);
    },
    selectMiddle(index) {
      index += 1;
      const selectMiddleHeight = this.itemHeight * (index - 0.5);
      if (selectMiddleHeight > this.halfWindowHeight) {
        this.scrollTop = selectMiddleHeight - this.halfWindowHeight;
      } else {
        this.scrollTop = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  background-color: white;
  color: rgb(26, 188, 156);
  font-size: 36rpx;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 30rpx;
}
.scroll-left {
  background-color: rgb(230, 230, 230);
  width: 200rpx;
  flex-shrink: 0;
  &::-webkit-scrollbar {
    display: none;
  }

  .class-item {
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;

    .high-light {
      border-radius: 6rpx;
      width: 6rpx;
      height: 60rpx;
      float: left;
      transform: translateY(20rpx);
      background-color: rgba(26, 188, 156, 0.5);
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