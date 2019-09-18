<template>
  <div class="search-wrap">
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
      @click="showSearchPage(item.tagName)">
      <p>{{ item.tagName }}</p>
    </div>
    <div class="page search-page" v-if="isShowSearchPage">
      <div class="page-search-bar">
        <div class="weui-cell search-bar__bd">
          <i class="iconfont weui-cell__hd search-icon">&#xe60b;</i>
          <input 
            type="text" 
            class="weui-cell__bd" 
            :placeholder="popularSearch[0].tagName" 
            v-model="searchContent"
            :focus="isShowSearchPage"
            @input="submitSearch">
          <div class="weui-icon-clear clear-icon" v-if="searchContent.length > 0" @click="clearInput">
            <icon type="clear" size="14"></icon>
          </div>
        </div>
        <span class="cancel search-bar__ft" @click="showSearchPage()">取消</span>
      </div>
      <div class="search-list" v-if="!isShowSearchResult && !(searchContent.length > 0)">
        <div 
          class="recommend-search-list" 
          v-for="(item, index) in recommendSearch" 
          :key="index"
          @click="searchByRecommend(item)">
          <i class="iconfont weui-cell__hd search-icon">&#xe60b;</i>
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="goods-gird" v-if="searchContent.length > 0">
        <goodsGridList :goodsList="goodsList" :col="2"></goodsGridList>
      </div>
    </div>
  </div>
</template>

<script>
import goodsGridList from '@/components/goodsGridList/goodsGridList'
import { goodsList } from '@/fake.js'

export default {
  components: {
    goodsGridList
  },
  data () {
    return {
      popularSearch: undefined, // 热门搜索列表
      // popularSearch: popularSearch,
      recommendSearch: ['汽车打火机', '德利汽车润滑油', '汽车转向盘'], // 推荐搜索列表
      isShowSearchPage: false, // 控制搜索副页展示
      isShowSearchResult: false, // 控制搜索结果显示，与显示推荐搜索互斥
      searchContent: '', // 搜索栏内容
      goodsList: goodsList
    }
  },
  onLoad () {
    // 获取热门搜索
    this.$http.get('/action/goods/getPopularSearch').then(res => {
      let result = res.data.data
      this.popularSearch = JSON.parse(result)
      console.log(this.popularSearch, 1111)
    })
  },
  onUnload () {
    this.isShowSearchPage = false
    this.isShowSearchResult = false
  },
  methods: {
    // 搜索副页显示
    showSearchPage (arg) {
      this.isShowSearchPage = !this.isShowSearchPage
      if (arg) {
        this.searchContent = arg
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
    submitSearch () {
      // 实时查询商品
    }
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
  padding: 10px 13px 0 13px;
  height: 100%;
  background-color: #f3f3f3;
  .search-bar {
    border: 0.1px solid #ff824d;
    border-radius: 20px;
    box-shadow: 0 0.08px 3px @orange;
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
    margin: 10px 0;
    padding: 5px 20px;
    font-size: 16px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: -0.05px 0.5px 1px @orange;
  }
  .search-page {
    height:100%;
    position:fixed;
    background-color: #f3f3f3;
    z-index:9999;
    top:0;
    left:0;
    right: 0;
    padding: 10px 13px 0 13px;
    .page-search-bar {
      display: flex;
      align-content: center;
      .search-bar__bd {
        border: 0.1px solid #ff824d;
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
        margin-left: 15px;
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
  .goods-gird {
    margin-top: 8px;
  }
}
</style>