<template>
  <div class="main-page">
    <base-navigation-bar name="首页">
      <i class="iconfont" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box v-if="loadStatus === 'online'">
      <div class="home-wrap">
        <div class="swiper-box">
          <com-swiper :imgList="imgList" :isLink="true"></com-swiper>
          <div class="category-box">
            <div class="category-item" v-for="(item, index) in computedCategoryList" :key="index" @click="toClassification(index)">
              <div class="img-box">
                <image :src="iconList[index]" mode="aspectFit"></image>
              </div>
              <p class="name">{{item}}</p>
            </div>
          </div>
          <div class="recommend-font" @click="scrollTo('.panel-title')">
            <p class="panel-title">精选</p>
            <p class="panel-title-tips">为您推荐</p>
            <p class="icon-panel"><i class="iconfont">&#xe6a4;</i></p>
          </div>
        </div>
        <div class="goodsList-panel">
          <div class="list-content">
            <goods-grid-list
            ref="goods_grid_list_el"
            :start.sync="start" 
            :size.sync="size" 
            :pageSize="pageSize"
            :goodsList="goodsList" 
            :col="2"></goods-grid-list>
          </div>
        </div>
      </div>
    </base-custom-box>
    <base-load :loadStatus="loadStatus" @reLoad="getRecommendGoodsList"></base-load>
  </div>
</template>

<script>

import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import comSwiper from '@/components/comSwiper/comSwiper'
import goodsGridList from '@/components/goodsGridList/goodsGridList'
import BaseLoad from "@/components/base/BaseLoad";

export default {
  data () {
    return {
      loadStatus: '',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      imgList: [],
      goodsList: [],
      start: 0,
      size: 12,
      pageSize: 12,
      categoryList: [],
      iconList: [
        '/static/images/category-icon/aircraft.png',
        '/static/images/category-icon/anchor.png',
        '/static/images/category-icon/cruise-ship.png',
        '/static/images/category-icon/house-on-wheels.png',
        '/static/images/category-icon/rocket.png',
        '/static/images/category-icon/train.png',
        '/static/images/category-icon/travel-suitcase.png',
        '/static/images/category-icon/tent.png',
        '/static/images/category-icon/towel.png',
        '/static/images/category-icon/sandals.png'
      ]
    }
  },
  components: {
    comSwiper,
    goodsGridList,
    BaseCustomBox,
    BaseNavigationBar,
    BaseLoad
  },
  onLoad () {
    this.loadStatus = "loading"
    this.size = this.pageSize
    this.getRecommendGoodsList()
  },
  async onPullDownRefresh() {
    this.loadStatus = "loading"
    this.size = this.pageSize
    this.getRecommendGoodsList()
    // 停止下拉刷新
  },
  watch: {
    size: {
      handler (newVal, oldVal) {
        if (newVal > oldVal) {
          this.getRecommendGoodsList()
        }
      },
      deep: true
    }
  },
  computed: {
    computedCategoryList () {
      return this.categoryList.splice(0, 10)
    }
  },
  methods: {
    scrollTo (name) {
      wx.pageScrollTo({
        selector: name,
        duration: 600
      })
    },
    toClassification (index) {
      this.$store.commit('Classification/SET_SELECTCLASSINDEX', index)
      console.log(this.$store.getters['Classification/selectClassIndex'])
      mpvue.switchTab({ url: '/pages/classification/main' })
    },
    getCategory () {
      this.$http.post("/action/goods/getAllCategory").then(res => {
        if (res.data) {
          console.log(res.data)
          this.categoryList = res.data
        }
      })
    },
    getRandomImgList () {
      this.imgList = []
      let goodsList = JSON.parse(JSON.stringify(this.goodsList))
      let arr = []
      let count = goodsList.length
      let swiperNum = count < 3 ? count : Math.floor(Math.random() * 2 + 3)
      if (swiperNum > count) {
        swiperNum = count
      }
      for (let i = 0; i < swiperNum; i++) {
        let randomIndex = Math.floor(Math.random() * count)
        let el = {
          pic: goodsList[randomIndex].pic,
          goodsNo: goodsList[randomIndex].goodsNo
        }
        arr.push(el)
        goodsList.splice(randomIndex, 1)
        count = goodsList.length
      }
      this.imgList = arr
    },
    getRecommendGoodsList () {
      let that = this
      this.$http.get('/action/goods/getRecommendGoodsList', {
        start: this.start,
        size: this.size
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.goodsList = res.data
          this.getRandomImgList()
          this.loadStatus = "online"
          this.getCategory()
        } else {
          setTimeout(function () {
            that.$refs['goods_grid_list_el'].loadErr()
          }, 200)
          this.loadStatus = "offline"
        }
        wx.stopPullDownRefresh()
      }).catch(err => {
        console.log('err:' + err)
        wx.stopPullDownRefresh()
        this.loadStatus = "offline"
        setTimeout(function () {
          that.$refs['goods_grid_list_el'].loadErr()
        }, 200)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@bgColor: #fff;
@textColor: #ff5521;
.main-page {
  height: 100%;
  background-color: @bgColor;
  /deep/ .navigation-bar {
    // background-color: @textColor !important;
    // color: @bgColor !important;
    .nav-icon, .nav-title {
      // color: @bgColor;
    }
  }
  .home-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .swiper-box {
      background-color: @bgColor;
      padding-bottom: 10px;
      z-index: 1;
      /deep/ .com-swiper {
        margin-bottom: 8px;
        // border-radius: 6px;
        height: 140px;
      }
      .category-box {
        padding: 14px 10px 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .category-item {
          width: calc(100% / 5);
          text-align: center;
          margin-bottom: 5px;
          .img-box {
            margin: 0 auto;
            background-color: #e7e7e7;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            image {
              width: 70%;
              height: 70%;
            }
          }
          .name {
            color: rgb(31, 31, 31);
            padding: 5px 0;
            font-size: 12px;
            font-weight: 300;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .recommend-font {
          p {
          text-align: center;
          &.panel-title {
            color: @textColor;
            font-size: 24px;
            font-weight: 600;
            position: relative;
            &::before, &::after {
              content: '';
              position: absolute;
              top: 51%;
              background-color: @textColor;
              // opacity: 0.7;
              width: 37%;
              height: 1px;;
            }
            &::before {
              left: 0;
            }
            &::after {
              right: 0;
            } 
          }
          &.panel-title-tips {
            color: @textColor;
            opacity: 0.9;
            font-size: 12px;
            font-weight: 300;
          }
          &.icon-panel {
            line-height: 15px;
            .iconfont {
              font-size: 16px;
              color: @textColor;
            }
          }
        }
      }
    }
    .goodsList-panel {
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      &:after {
        border-bottom: none;
      }
      .list-content {
        flex: 1;
      }
    }
  }
}
</style>
