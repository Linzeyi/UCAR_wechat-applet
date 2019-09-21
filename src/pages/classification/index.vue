<template>
  <div style="height: 100%">
    <base-navigation-bar name="分类">
      <i class="iconfont" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box v-if="isOnline === 'online'">
      <div class="wrap">
        <scroll-view class="scroll-left" scroll-y scroll-with-animation :scroll-top="scrollTop">
          <div
            v-for="(item, idx) in classList"
            :class="{'class-item': true ,active: selectClassIndex === idx}"
            @click="clickItem(idx)"
            :key="idx"
          >
            <div class="high-light" v-show="selectClassIndex === idx"></div>
            <span>{{item}}</span>
          </div>
        </scroll-view>
        <scroll-view class="scroll-right" scroll-y scroll-with-animation @scroll="scrollHandle">
          <div class="scroll-right-lable">
            <span>{{classList[selectClassIndex]}}</span>
          </div>
          <goods-grid-list :goodsList="goodsList" :col="2"></goods-grid-list>
        </scroll-view>
      </div>
    </base-custom-box>
    <div class="loading-box" v-if="isOnline === 'loading'">
      <img src="/static/images/loading.gif" alt="加载中..." />
    </div>
    <div class="offline-box" v-if="isOnline === 'offline'">
      <img src="/static/images/offline.svg" alt="您的信号飞到外星球了哦~" />
      <p>您的信号飞到外星球了哦~</p>
      <div class="refresh" @click="getAllCategory()">
        <span>重新加载</span>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsGridList from "@/components/goodsGridList/goodsGridList";
import BaseCustomBox from "@/components/base/BaseCustomBox";
import BaseNavigationBar from "@/components/base/BaseNavigationBar";
export default {
  components: {
    GoodsGridList,
    BaseCustomBox,
    BaseNavigationBar
  },
  data() {
    return {
      systemInfo: {},
      customNavHeight: 0,
      itemHeight: 0,
      scrollTop: 0,
      selectClassIndex: 0,
      goodsList: [],
      classList: [],
      isOnline: true
    };
  },
  async onLoad() {
    this.systemInfo = wx.getSystemInfoSync();
    this.customNavHeight = this.$store.getters["SystemInfo/customNavHeight"];
    this.goodsList = this.$store.getters["Goods/goodsList"];
    const scale = this.$store.getters["SystemInfo/scale"];
    this.itemHeight = 100 * scale;
    await this.getAllCategory();
    this.getGoodsByCategory();
  },
  methods: {
    scrollHandle(e) {
      console.log(e.mp.detail);
    },
    clickItem(index) {
      this.selectClassIndex = index;
      this.selectMiddle(index);
      this.getGoodsByCategory();
    },
    selectMiddle(index) {
      index += 1;
      const usableHeight = this.systemInfo.windowHeight - this.customNavHeight;
      const halfWindowHeight = usableHeight / 2;
      const selectMiddleHeight = this.itemHeight * (index - 0.5);
      if (selectMiddleHeight > halfWindowHeight) {
        this.scrollTop = selectMiddleHeight - halfWindowHeight;
      } else {
        this.scrollTop = 0;
      }
    },
    async getAllCategory() {
      try {
        this.isOnline = "loading";
        const result = await this.$http.post("/action/goods/getAllCategory");
        this.isOnline = "online";
        this.classList = result.data;
      } catch (error) {
        this.isOnline = "offline";
      }
    },
    async getGoodsByCategory() {
      const result = await this.$http.post("/action/goods/getGoodsByCategory", {
        categoryName: this.classList[this.selectClassIndex]
      });
      this.goodsList = result.data;
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

.loading-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
.offline-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 500rpx;
  }
  p {
    color: #a8a6a5;
  }
  .refresh {
    margin-top: 40rpx;
    border-radius: 4rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    width: 200rpx;
    background-color: #FFD161;
  }
}
</style>