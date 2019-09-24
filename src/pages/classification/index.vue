<template>
  <div style="height: 100%">
    <base-navigation-bar name="分类">
      <i class="iconfont" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box v-if="loadStatus === 'online'">
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
        <scroll-view
          class="scroll-right"
          scroll-y
          scroll-with-animation
          @scrolltolower="scrollHandle"
        >
          <div class="scroll-right-lable">
            <span>{{classList[selectClassIndex]}}</span>
          </div>
          <div>
            <goods-grid-list
              :goodsList="goodsList"
              :col="2"
              :isScroll="false"
              :size="10"
              :isIntegral="isIntegral"
            ></goods-grid-list>
          </div>
        </scroll-view>
      </div>
    </base-custom-box>
    <base-load :loadStatus="loadStatus" @reLoad="getAllCategory"></base-load>
  </div>
</template>

<script>
import GoodsGridList from "@/components/goodsGridList/goodsGridList";
import BaseCustomBox from "@/components/base/BaseCustomBox";
import BaseNavigationBar from "@/components/base/BaseNavigationBar";
import BaseLoad from "@/components/base/BaseLoad";
export default {
  components: {
    GoodsGridList,
    BaseCustomBox,
    BaseNavigationBar,
    BaseLoad
  },
  data() {
    return {
      systemInfo: {},
      customNavHeight: 0,
      itemHeight: 0,
      scrollTop: 0,
      goodsList: [],
      classList: [],
      loadStatus: "",
      pageNum: 1,
      pageSize: 6,
      isIntegral: true
    };
  },
  async onLoad() {
    this.systemInfo = wx.getSystemInfoSync();
    this.customNavHeight = this.$store.getters["SystemInfo/customNavHeight"];
    const scale = this.$store.getters["SystemInfo/scale"];
    this.itemHeight = 100 * scale;
    await this.getAllCategory();
    this.getGoodsByCategory();
  },
  methods: {
    scrollHandle(e) {
      this.getGoodsByCategory();
    },
    clickItem(index) {
      this.$store.commit("Classification/SET_SELECTCLASSINDEX", index);
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
        this.loadStatus = "loading";
        const result = await this.$http.post("/action/goods/getAllCategory");
        this.classList = result.data;
        this.loadStatus = "online";
      } catch (error) {
        this.loadStatus = "offline";
      }
    },
    async getGoodsByCategory() {
      const result = await this.$http.post("/action/goods/getGoodsByCategory", {
        categoryName: this.classList[this.selectClassIndex],
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      if (result.data.length !== 0) {
        this.goodsList = [...this.goodsList, ...result.data];
        this.pageNum += 1;
      }
    }
  },
  computed: {
    selectClassIndex() {
      return this.$store.getters["Classification/selectClassIndex"];
    }
  },
  watch: {
    selectClassIndex(value) {
      if (value !== 0) {
        this.isIntegral = false;
      } else {
        this.isIntegral = true;
      }
      this.pageNum = 1;
      this.goodsList = [];
      this.selectMiddle(value);
      this.getGoodsByCategory();
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
  background-color: rgb(243, 243, 243);
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
    background-color: #ffd161;
  }
}
</style>