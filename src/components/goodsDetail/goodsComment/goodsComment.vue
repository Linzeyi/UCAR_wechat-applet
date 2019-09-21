<template>
  <div class="comment-wrap">
    <div class="statistics-wrap">
      <h1>评分及评论</h1>
      <div class="score-box">
        <div class="left-box">
          <p class="goods-score">{{goodsScore}}</p>
          <p class="default-font">满分5分</p>
        </div>
        <div class="right-box">
          <div class="progress-box">
            <div class="progress-panel" v-for="(item, index) in scoreList" :key="index">
              <div class="star-box">
                <i class="iconfont icon-star" v-for="(scoreItem, scoreIndex) in (5 - index)" :key="scoreIndex">&#xe663;</i>
              </div>
              <div class="progress">
                <progress :percent="(item / totalComment) * 100" color="#666" stroke-width="4"></progress>
              </div>
            </div>
          </div>
          <p class="default-font">{{totalComment}}评论</p>
        </div>
      </div>
    </div>
    <div class="comment-list-wrap">
      <div class="comment-list">
        <div class="list-panel" v-for="(item, index) in commentList" :key="index">
          <div class="left-box">
            <div class="img-box">
              <image :src="item.memberImageUrl" alt="用户头像" mode="aspectFill"></image>
            </div>
          </div>
          <div class="info-box">
            <p class="name-score">
              <span class="name">{{item.memberNickname}}</span>
              <span class="score">
                <span class="star" v-for="(starItem, starIndex) in 5" :key="starIndex" :class="{'stared': starIndex + 1 <= item.goodsScore}">
                  <i class="iconfont icon-star">&#xe623;</i>
                  <i class="iconfont icon-stared">&#xe624;</i>
                </span>
              </span>
            </p>
            <p class="type">
              已购：{{item.goodsPropertyName}}
            </p>
            <p class="content">{{item.content}}</p>
            <p class="date">{{item.createTime}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'goods'
  ],
  data () {
    return {
      goodsScore: 0,
      totalComment: 0,
      scoreList: [0, 0, 0, 0, 0],
      commentList: []
    }
  },
  watch: {},
  onUnload () {
    this.init()
  },
  methods: {
    init () {
      this.commentList = []
      this.scoreList = [0, 0, 0, 0, 0]
      this.goodsScore = 0
      this.totalComment = 0
    },
    getCommentList () {
      this.$http.get('/action/comment/getGoodsCommentList', {
        goodsNo: this.goods.goodsNo
      }).then(res => {
        if (res.data) {
          this.commentList = res.data ? res.data : []
          this.commentList.map(item => {
            item.createTime = this.Utils.getYMDTime(item.createTime)
          })
        }
      })
    },
    getScoreInfo () {
      this.$http.get('/action/comment/getGoodsScoreInfo', {
        goodsNo: this.goods.goodsNo
      }).then(res => {
        this.goodsScore = res.data.aveScore
        this.totalComment = res.data.allNum
        this.scoreList = []
        for (let i = 5; i > 0; i--) {
          this.scoreList.push(res.data.scoreNumMap[i])
        }
      })
    }
  }

}
</script>

<style lang="less">
.star {
  .icon-star {
    display: inline;
  }
  .icon-stared {
    display: none;
  }
  &.stared {
    .icon-star {
      display: none;
    }
    .icon-stared {
      display: inline;
    }
  }
}
.comment-wrap {
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #fff;
  .statistics-wrap {
    margin-bottom: 10px;
    padding: 10px 20px;
    box-shadow: 0 6rpx 20rpx 0 #ddd;
    border-radius: 5px;
    overflow: hidden;
    h1 {
      font-size: 22px;
      color: #888;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .score-box {
      display: flex;
      .default-font {
        height: 20px;
        font-size: 12px;
        color: #888;
      }
      .left-box {
        padding: 0 10px;
        p {
          text-align: center;
          &.goods-score {
            height: 52px;
            font-size: 32px;
            font-weight: 600;
            color: #777;
          }
        }
      }
      .right-box {
        flex-grow: 1;
        padding:  0 5px 0 0;
        .progress-box {
          padding-top: 9px;
          box-sizing: border-box;
          height: 52px;
          .progress-panel {
            display: flex;
            margin-bottom: 4px;
            &:last-child {
              margin: 0;
            }
            .star-box {
              height: 4px;
              line-height: 0px;
              padding-right: 8px;
              width: 60px;
              text-align: right;
              .icon-star {
                font-size: 12px;
                margin-right: 4px;
                display: inline-block;
                width: 4px;
                height: 4;
                line-height: 4px;
                color: #666;
              }
            }
            .progress {
              flex-grow: 1;
            }
          }
        }
        .default-font {
          text-align: right;
        }
      }
    }
  }
  .comment-list-wrap {
    .option-panel {
      font-size: 14px;
      color: #777;
      height: 40px;
      line-height: 40px;
      span {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        &.right {
          float: right;
        }
        .my-score {
          margin-right: 5px;
        }
      }
    }
    .to-comment-panel {
      padding: 0 0 10px 0;
      border-bottom: 1px solid #ddd;
      span {
        color: #0079FE;
        font-size: 14px;
        i.iconfont {
          font-size: 14px;
        }
      }
    }
    .comment-panel {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      width: 100%;
      textarea {
        font-size: 14px;
        width: 100%;
        margin-bottom: 15px;
      }
      .btn-panel {
        padding: 10px 0 0;
        .sendComment-btn {
          border-radius: 2px;
        }
      }
    }
    .comment-list {
      padding: 10px 0;
      .list-panel {
        background-color: #fff;
        margin-bottom: 6px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        display: flex;
        &:last-child {
          margin: 0;
        }
        .left-box {
          .img-box {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
            image {
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
          }
        }
        .info-box {
          flex-grow: 1;
          padding-left: 10px;
          box-sizing: border-box;
          p {
            font-size: 12px;
            &.name-score {
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              .name {
                flex-grow: 1;
              }
              .score {
                .star {
                  .iconfont {
                    font-size: 10px;
                    color: orangered;
                  }
                  .icon-star {
                    display: inline;
                  }
                  .icon-stared {
                    display: none;
                  }
                  &.stared {
                    .icon-star {
                      display: none;
                    }
                    .icon-stared {
                      display: inline;
                    }
                  }
                }
              }
            }
            &.type {
              font-size: 11px;
              color: #888;
              padding: 2px 5px;
              background-color: #eee;
              border-radius: 2px;
            }
            &.content {
              margin-top: 10px;
            }
            &.date {
              margin-top: 5px;
              font-size: 11px;
              color: #888;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>