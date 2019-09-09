<template>
  <div class="shoppingCart-wrap lzy-list-wrap">
    <div class="goods-list-wrap">
      <div class="goods-list">
        <div class="goods-box" v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex">
          <movable-area class="movable-area">
            <movable-view x="65" y="0" out-of-bounds="true" class="movable-view" direction="horizontal" inertia="true" damping="100">
              <div class="left-box">
                <div class="select-box" @click="selectGoods(goodsItem)">
                  <i class="iconfont icon-select-no" v-if="!goodsItem.isSelected">&#xe656;</i>
                  <i class="iconfont icon-select-fill" v-else>&#xe655;</i>
                </div>
                <div class="img-box">
                  <image :src="goodsItem.src" alt="商品图片" mode="aspectFit"></image>
                </div>
              </div>
              <div class="content-box">
                <div class="info-box">
                  <p class="title">{{goodsItem.title}}</p>
                  <p class="type">{{goodsItem.type.title}}:{{goodsItem.type.content}}</p>
                  <p class="bottom-p">
                    <span class="price"><span class="logo">¥</span>{{goodsItem.type.price * goodsItem.num}}</span>
                    <span class="numPicker-box">
                      <num-picker :min="1" :isSmall="1" :max="goodsItem.type.stock" :num.sync="goodsItem.num"></num-picker>
                    </span>
                  </p>
                </div>
              </div>
            </movable-view>
            <button class="delete-btn" @click="deleteItem(goodsItem, goodsIndex)">删除</button>
          </movable-area>
        </div>
      </div>
    </div>
    <div class="cart-footer lzy-footer">
      <div class="left-box">
        <div class="select-box">
          <i class="iconfont icon-select-no" v-if="!isAllSelected" @click="selectAll(true)">&#xe656;</i>
          <i class="iconfont icon-select-fill" v-else  @click="selectAll(false)">&#xe655;</i>
        </div>
        <span class="select-title">全选</span>
      </div>
      <div class="right-box">
        <span class="total">合计：</span>
        <span class="price"><span class="logo">¥</span>{{getTotalPrice}}</span>
        <button class="to-pay-btn" @click="toPay">结算({{getSelectedNum}})</button>
      </div>
    </div>
  </div>
</template>

<script>
import numPicker from '../../components/numPicker/numPicker'

export default {
  components: {
    numPicker
  },
  data () {
    return {
      isAllSelected: false,
      goodsList: [
        {
          id: undefined,
          title: '车载打火器，X3汽车应急启动电源12v移动搭电宝车载备用电瓶充电打火器',
          src: 'https://f11.baidu.com/it/u=1773370537,2404250031&fm=72',
          store: {
            name: '米其林4S店'
          },
          type: {
            title: '规格/型号',
            content: '最大/2090',
            price: 54,
            stock: 199
          },
          sales: 2422,
          num: 3,
          isSelected: false
        },
        {
          id: undefined,
          title: '【二手9成新】苹果8Plus Apple iPhone8',
          src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1983789125,876896115&fm=11&gp=0.jpg',
          store: {
            name: '苹果旗舰店店'
          },
          type: {
            title: '内存',
            content: '64G',
            price: 3162,
            stock: 2422
          },
          sales: 155,
          num: 1,
          isSelected: false
        }
      ]
    }
  },
  computed: {
    getTotalPrice () {
      let price = 0
      this.goodsList.map(item => {
        if (item.isSelected) {
          price += (item.type.price * item.num)
        }
      })
      return price
    },
    getSelectedNum () {
      let num = 0
      this.goodsList.map(item => {
        if (item.isSelected) {
          num++
        }
      })
      return num
    }
  },
  methods: {
    deleteItem (item, index) {
      this.goodsList.splice(index, 1)
    },
    toPay () {
      if (this.getSelectedNum === 0) {
        wx.showToast({
          title: '商品数量不能为0',
          icon: 'none',
          duration: 2000
        })
      } else {
        mpvue.navigateTo({ url: '/pages/orderConfirm/main' })
      }
    },
    selectAll (flag) {
      this.isAllSelected = flag
      for (let index in this.goodsList) {
        this.goodsList[index].isSelected = flag
      }
    },
    selectGoods (item) {
      item.isSelected = !item.isSelected
      for (let index in this.goodsList) {
        let flag = this.goodsList[index].isSelected
        if (!flag) {
          this.isAllSelected = false
          return void 0
        }
      }
      this.isAllSelected = true
    }
  }
}
</script>

<style lang="less">
.shoppingCart-wrap {
  box-sizing: border-box;
  padding: 10px 0;
  background-color: #f3f3f3;
  .select-box {
    width: 40px;
    text-align: center;
    .iconfont {
      font-size: 21px;
      color: #ddd;
      &.icon-select-fill {
        color: orangered
      }
    }
  }
  .goods-list-wrap {
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .goods-list {
      height: 100%;
      .goods-box {
        overflow: hidden;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        background-color: #fff;
        .movable-area {
          position: relative;
          left: -55px;
          width: calc(100% + 55px);
          height: auto;
          .movable-view {
            width: calc(100% - 55px);
            height: auto;
            clear: both;
            display: flex;
            position: relative;
            background-color: #fff;
            z-index: 9;
            .left-box {
              height: 70px;
              display: flex;
              justify-content: center;
              align-items: center;
              .img-box {
                flex-grow: 1;
                width: 70px;
                height: 70px;
                overflow: hidden;
                image {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .content-box {
              width: 100%;
              .info-box {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                padding: 0 10px;
                box-sizing: border-box;
                p {
                  font-size: 12px;
                  padding-bottom: 4px;
                  &.title {
                    color: #333;
                  }
                  &.type {
                    font-size: 10px;
                    padding: 2px 4px;
                    background-color: #f6f6f6;
                    border-radius: 4px;
                    color: #999;
                  }
                  .price {
                    font-size: 12px;
                    color: #ff6421;
                    .logo {
                      font-size: 10px;
                      margin-right: 5px;
                    }
                  }
                  &.bottom-p {
                    margin-top: 5px;
                    height: 30px;
                    position: relative;
                    padding: 0;
                    .price {
                      display: inline-block;
                      height: 30px;
                      line-height: 30px;
                      vertical-align: top;
                    }
                    .numPicker-box {
                      padding: 5px 0;
                      float: right;
                      top: 0;
                    }
                  }
                }
              }
            }
          }
          .delete-btn {
            z-index: 8;
            width: 50px;
            height: 30px;
            background-color: #ff6421;
            color: #fff;
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -30rpx;
            padding: 0;
            font-size: 12px;
            line-height: 30px;
            &:active {
              background-color: #ec4e09;
            }
          }
        }
      }
    }
  }
  .cart-footer {
    .left-box {
      .select-title {
        font-size: 12px;
        color: #666;
      }
    }
    .right-box {
      .price {
        color: #ff6421;
        font-size: 16px;
        .logo {
          font-size: 11px;
          margin-right: 6px;
        }
      }
      .to-pay-btn {
        background-color: #ff6421;
        color: #fff;
        &:active {
          background-color: #ec4e09;
        }
      }
    }
  }
}
</style>