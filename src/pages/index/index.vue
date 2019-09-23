<template>
  <div class="main-page">
    <base-navigation-bar name="首页" :bgColor="'rgb(236, 65, 59)'">
      <i class="iconfont" @click="Utils.navigateTo('/pages/search/main')">&#xe60b;</i>
    </base-navigation-bar>
    <base-custom-box>
      <div class="home-wrap">
        <div class="swiper-box">
          <com-swiper :imgList="imgList" :isLink="true"></com-swiper>
          <p class="panel-title">精选</p>
          <p class="panel-title-tips">为您推荐</p>
          <p class="icon-panel"><i class="iconfont">&#xe6a4;</i></p>
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
  </div>
</template>

<script>

import BaseCustomBox from "@/components/base/BaseCustomBox"
import BaseNavigationBar from "@/components/base/BaseNavigationBar"
import comSwiper from '@/components/comSwiper/comSwiper'
import goodsGridList from '@/components/goodsGridList/goodsGridList'

export default {
  data () {
    return {
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      imgList: [],
      goodsList: [],
      start: 0,
      size: 6,
      pageSize: 6
    }
  },
  components: {
    comSwiper,
    goodsGridList,
    BaseCustomBox,
    BaseNavigationBar
  },
  onLoad () {
    this.getRecommendGoodsList()
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
  async onPullDownRefresh() {
    console.log('下拉刷新')
    this.getRecommendGoodsList()
    // 停止下拉刷新
  },
  methods: {
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
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
      let that = this
      this.$http.get('/action/goods/getRecommendGoodsList', {
        start: this.start,
        size: this.size
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.goodsList = res.data
          this.getRandomImgList()
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          this.$nextTick(function () {
            that.$refs['goods_grid_list_el'].loadErr()
          })
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }).catch(err => {
        console.log('err:' + err)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        setTimeout(function () {
          that.$refs['goods_grid_list_el'].loadErr()
        }, 200)
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      })
    },
    switchTab (url) {
      mpvue.switchTab({ url })
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  height: 100%;
  background-color: rgb(236, 65, 59);
  /deep/ .navigation-bar {
    color: #fff;
    .nav-icon, .nav-title {
      color: #fff;
    }
  }
  .home-wrap {
    // height: 100%;
    display: flex;
    flex-direction: column;
    
    .swiper-box {
      background-color: rgb(236, 65, 59);
      padding: 10px 0;
      z-index: 1;
      /deep/ .com-swiper {
        margin-bottom: 15px;
        border-radius: 6px;
        height: 200px;
      }
      p {
        text-align: center;
        &.panel-title {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          position: relative;
          &::before, &::after {
            content: '';
            position: absolute;
            top: 51%;
            background-color: #fff;
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
          color: #fff;
          opacity: 0.9;
          font-size: 12px;
          font-weight: 300;
        }
        &.icon-panel {
          line-height: 15px;
          .iconfont {
            font-size: 16px;
            color: #fff;
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
