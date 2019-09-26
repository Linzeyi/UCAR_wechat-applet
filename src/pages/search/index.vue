<template>
  <div class="search-wrap">
    <div class="popular-page" v-if="!isShowSearchPage">
      <div class="weui-cell search-bar" @click="showSearchPage()">
        <i class="iconfont search-icon">&#xe60b;</i>
        <p>{{ recommendSearch[0] }}</p>
      </div>
      <b class="popular-title">
        <img src="../../../static/images/heat.svg" class="icon-heat">
        热门搜索
      </b>
      <div 
        class="popular-list" 
        v-for="(item, index) in popularSearch" 
        :key="index"
        @click="showSearchPage(item)">
        <p>{{ item.tagName }}</p>
      </div>
    </div>
    <div class="page search-page" v-else>
      <div class="page-search-bar">
        <div class="weui-cell search-bar__bd">
          <i class="iconfont weui-cell__hd search-icon">&#xe60b;</i>
          <input 
            type="text" 
            class="weui-cell__bd" 
            :placeholder="'搜索'" 
            v-model="searchContent"
            :focus="isShowSearchPage"
            @input="clearSize"
            @blur="submitSearch">
          <div class="weui-icon-clear clear-icon" v-if="searchContent.length > 0" @click="clearInput">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <span class="cancel search-bar__ft" @click="showSearchPage()">取消</span>
      </div>
      <base-load :loadStatus="loadStatus"></base-load>
      <div class="search-list" v-if="goodsList.length <= 0 && false">
        <div 
          class="recommend-search-list" 
          v-for="(item, index) in recommendSearch" 
          :key="index"
          @click="searchByRecommend(item)">
          <i class="iconfont weui-cell__hd search-icon">&#xe60b;</i>
          <p>{{ item }}</p>
        </div>
      </div>
      <p v-if="noResult && goodsList.length === 0" style="position: fixed;top: 100px;left: 155px;font-size: 18px;">暂无商品…</p>
      <div class="goods-warp">
        <div class="goods-gird" v-if="goodsList && goodsList.length > 0">
          <goodsGridList 
            :goodsList="goodsList" 
            :col="2" 
            :start.sync="start" 
            :size.sync="size" 
            :pageSize="pageSize"
            :isScroll="false">
          </goodsGridList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsGridList from '@/components/goodsGridList/goodsGridList'
import baseLoad from '@/components/base/BaseLoad'

export default {
  components: {
    goodsGridList,
    baseLoad
  },
  data () {
    return {
      popularSearch: undefined, // 热门搜索列表
      recommendSearch: ['汽车打火机', '德利汽车润滑油', '汽车转向盘'], // 推荐搜索列表
      isShowSearchPage: false, // 控制搜索副页展示
      isShowSearchResult: false, // 控制搜索结果显示，与显示推荐搜索互斥
      searchContent: '', // 搜索栏内容
      start: 0,
      size: 13,
      pageSize: 3,
      goodsList: [],
      accum: 1, // 查询触底累加
      noResult: false, // 是否有查询结果
      loadStatus: '' // loading图标
    }
  },
  onLoad () {
    // 获取热门搜索
    this.$http.get('/action/goods/getPopularSearch').then(res => {
      if (res !== '' && res.status === 20000) {
        let para = JSON.parse(res.data)
        this.popularSearch = para
      }
    })
  },
  onUnload () {
    this.isShowSearchPage = false
    this.isShowSearchResult = false
    this.noResult = false
    this.goodsList = []
    console.log('reset', this.goodsList)
  },
  methods: {
    // 搜索副页显示
    showSearchPage (arg) {
      this.isShowSearchPage = !this.isShowSearchPage
      this.goodsList = []
      this.clearSize()
      if (arg) {
        this.searchContent = arg.tagName
        this.loadStatus = 'loading'
        this.$http.post('/action/goods/searchGoods', {
          tagNo: arg.tagNo,
          tagName: arg.tagName,
          elasticPageParam: {
            start: this.start,
            size: this.size
          }
        }).then(res => {
          this.loadStatus = 'online'
          if (res.data) {
            this.goodsList = res.data
          } else {
            this.goodsList = []
            this.noResult = true
          }
        })
      } else {
        this.searchContent = ''
      }
    },
    // 点击推荐搜索
    searchByRecommend (arg) {
      this.searchContent = arg
    },
    // 清空输入框
    clearInput() {
      this.searchContent = ''
    },
    // 实时查询商品
    submitSearch () {
      this.loadStatus = 'loading'
      this.$http.post('/action/goods/searchGoods', {
        tagNo: 0,
        tagName: this.searchContent,
        elasticPageParam: {
          start: this.start,
          size: this.size
        }
      }).then(res => {
        this.loadStatus = 'online'
        if (res.data) {
          this.goodsList = res.data
        } else {
          this.goodsList = []
          this.noResult = true
        }
      })
    },
    // 还原查询页数累加
    clearSize () {
      this.accum = 1
      this.noResult = false
    }
  },
  // 商品列表触底事件
  async onReachBottom () {
    console.log('触底！')
    this.$http.post('/action/goods/searchGoods', {
      tagNo: 0,
      tagName: this.searchContent,
      elasticPageParam: {
        start: this.start,
        size: this.size * ++this.accum
      }
    }).then(res => {
      if (res.data) {
        this.goodsList = res.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
@baoWoBlack: #515151;
@baoWoFont: 'PingFangSC-Light';
@orange: #ff6421;
.search-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  padding: 10px 0;
  height: 100%;
  background-color: #f3f3f3;
  box-sizing: border-box;
  .popular-page {
    padding: 0 10px;
    .search-bar {
      border: 0.1px solid #ff5810;
      border-radius: 20px;
      box-shadow: 0 0.08px 3px #ff550c;
      background: #ffffff;
      display: flex;
      justify-content: center;
      .search-icon {
        margin-right: 15px;
        vertical-align: middle;
      }
    }
    .popular-title {
      margin: 16px 0 12px 0;
      font-family: 'PingFangSC';
      display: flex;
      align-items: center;
      .icon-heat {
        height: 18px;
        width: 18px;
        margin-right: 5px;
      }
    }
    .popular-list {
      margin: 10px 8px;
      padding: 5px 20px;
      font-size: 16px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: -1.5px 1.5px 1px @orange;
    }
  }
  .search-page {
    position: relative;
    height:100%;
    background-color: #f3f3f3;
    /deep/ .wrap {
      position: absolute;
      top: 0;
    }
    .page-search-bar {
      display: flex;
      align-content: center;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 9;
      background-color: #f3f3f3;
      padding: 10px 10px 10px 10px;
      .search-bar__bd {
        border: 0.1px solid @orange;
        border-radius: 20px;
        box-shadow: 0 0.08px 3px @orange;
        background: #ffffff;
        justify-content: center;
        width: 75%;
        .search-icon {
          margin-right: 15px;
        }
        .clear-icon {
          color: @baoWoBlack;
          right: 0;
          top: 8px;
          z-index: 999;
        }
      }
      .search-bar__ft {
        align-self: center;
        margin-left: 13px;
        color: @orange;
      }
    }
    .recommend-search-list {
      display: flex;
      margin: 5px 0;
      box-shadow: 0 0.08px @orange;
      padding: 10px 20px;
      font-size: 16px;
      .search-icon {
        margin-right: 14px;
        align-self: center;
      }
    }
  }
  .goods-warp {
    padding: 0 5px;
    background: #f3f3f3;
    .goods-gird {
      margin-top: 50px;
    }
  }
}
</style>