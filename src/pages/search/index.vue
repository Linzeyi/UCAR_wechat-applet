<template>
  <div class="search-wrap">
    <div class="weui-cell search-bar" @click="showSearchPage()">
      <i class="iconfont search-icon">&#xe60b;</i>
      <p>{{ recommendSearch[0] }}</p>
    </div>
    <b class="popular-title">热门搜索</b>
    <div 
      class="popular-list" 
      v-for="(item, index) in popularSearch" 
      :key="index"
      @click="showSearchPage(item)">
      <p>{{ item }}</p>
    </div>
    <div class="page search-page" v-if="isShowSearchPage">
      <div class="page-search-bar">
        <div class="weui-cell search-bar__bd">
          <i class="iconfont weui-cell__hd search-icon">&#xe60b;</i>
          <input 
            type="text" 
            class="weui-cell__bd" 
            :placeholder="popularSearch[0]" 
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
      <div class="weui-grids" v-if="searchContent.length > 0">
        <goodsGridList :goodsList="goodsList"></goodsGridList>
      </div>
    </div>
  </div>
</template>

<script>
import goodsGridList from '@/components/goodsGridList/goodsGridList'

export default {
  components: {
    goodsGridList
  },
  data () {
    return {
      popularSearch: ['车贴', '车窗窗帘', '香水', '坐垫', '抱枕'], // 热门搜索列表
      recommendSearch: ['汽车打火机', '德利汽车润滑油', '汽车转向盘'], // 推荐搜索列表
      isShowSearchPage: false, // 控制搜索副页展示
      isShowSearchResult: false, // 控制搜索结果显示，与显示推荐搜索互斥
      searchContent: '', // 搜索栏内容
      goodsList: [
        {
          id: 1421,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 21,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 532,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 152,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 84,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 762,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 153,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 943,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        },
        {
          id: 1136,
          name: '商品一',
          src: 'https://images.unsplash.com/photo-1491832541507-17ee9fc8d164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80',
          price: 188
        }
      ]
    }
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
@baoWoBlack: rgb(51, 51, 51);
@baoWoFont: 'PingFangSC-Light';
.search-wrap {
  font-family: @baoWoFont;
  color: @baoWoBlack;
  padding: 0 13px;
  .search-bar {
    border: 0.1px solid @baoWoBlack;
    border-radius: 10px;
    background: rgb(243, 243, 243);
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
  }
  .popular-list {
    margin: 5px 0;
    box-shadow: 0 0.08px rgb(179, 179, 179);
    padding: 10px 0;
    font-size: 16px;
  }
  .search-page {
    height:100%;
    position:fixed;
    background-color:rgb(255, 255, 255);
    z-index:9999;
    top:0;
    left:0;
    right: 0;
    padding: 0 13px;
    .page-search-bar {
      display: flex;
      align-content: center;
      .search-bar__bd {
        border: 0.1px solid @baoWoBlack;
        border-radius: 10px;
        background: rgb(243, 243, 243);
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
      box-shadow: 0 0.08px rgb(179, 179, 179);
      padding: 10px 0;
      font-size: 16px;
      .search-icon {
        margin-right: 14px;
        align-self: center;
      }
    }
  }
  .goods-grids {
    margin-top: 15px;
  }
}
</style>