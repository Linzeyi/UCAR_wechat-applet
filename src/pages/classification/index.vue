<template>
  <div class="wrap">
    <scroll-view class="scroll-left" scroll-y scroll-with-animation :scroll-top="scrollTop">
      <div
        v-for="(item, idx) in classList"
        :class="{'class-item': true ,active: selectClassIndex === idx}"
        @click="clickItem(idx)"
        :key="item.type"
      >
        <div class="high-light" v-show="selectClassIndex === idx"></div>
        <span>{{item.name}}</span>
      </div>
    </scroll-view>
    <scroll-view class="scroll-right" scroll-y scroll-with-animation @scroll="scrollHandle">
      <div class="scroll-right-lable">
        <span>{{classList[selectClassIndex].name}}</span>
      </div>
      <goods-grid-list :goodsList="goodsList" :col="2"></goods-grid-list>
      <div class="scroll-right-bottom">
        <span>———— (┬＿┬)到底啦 ————</span>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import GoodsGridList from "@/components/goodsGridList/goodsGridList";
import { classList } from "@/fake.js";
export default {
  components: {
    GoodsGridList
  },
  data() {
    return {
      itemHeight: 0,
      halfWindowHeight: 0,
      scrollTop: 0,
      selectClassIndex: 0,
      goodsList: [],
      classList: []
    };
  },
  created() {
    this.goodsList = this.$store.getters["Goods/goodsList"];
    this.classList = classList;
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
      this.selectClassIndex = index;
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
  font-size: 30rpx;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 25rpx;
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

.scroll-right {
  .scroll-right-lable {
    display: inline-block;
    height: 100rpx;
    color: #555;
    line-height: 100rpx;
    font-size: 30rpx;
    font-weight: bold;
    padding-left: 10rpx;
  }

  .scroll-right-bottom {
    opacity: 0.6;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
  }
}
</style>