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
                <i class="iconfont icon-star" v-for="(scoreItem, scoreIndex) in (index + 1)" :key="scoreIndex">&#xe663;</i>
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
              <image :src="item.sender.avatar" alt="用户头像" mode="aspectFit"></image>
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
    'goodsNo'
  ],
  data () {
    return {
      goodsScore: 4.2,
      totalComment: 1253,
      scoreList: [
        {
          score: 5,
          num: 549
        },
        {
          score: 4,
          num: 502
        },
        {
          score: 3,
          num: 125
        },
        {
          score: 2,
          num: 67
        },
        {
          score: 1,
          num: 10
        }
      ],
      commentList: [
        {
          content: '伤口恢复上课接电话跟接口，萨和苏高，是大国来说都很高科技阿花克里塞蒂格好，是大国和雕塑高忽低过！阿空加后付款时光，萨的感觉很健康啊？？？',
          sender: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568203213364&di=1f26bdec512e7c8ebcd548d12f293879&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180126%2F2a2d78a3e7c047bab01e3f3142da5497.jpeg',
            name: '捷克斯洛伐克'
          },
          type: '新i5 8G 512G固态 95%屏占比',
          sendTime: this.Utils.getYMDTime(new Date()),
          score: 4
        },
        {
          content: '伤阿双方山高水低噶蛋糕是224，阿双方萨方式1范德萨发蛋糕。啊2442看看是否就是会计法。',
          sender: {
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568203238618&di=03ef9ccca7858b45874e30a9827b59b0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F23%2F20180823154729_ZzrQX.thumb.700_0.jpeg',
            name: '克里斯'
          },
          type: '新i7 8G 512G固态 95%屏占比',
          sendTime: this.Utils.getYMDTime(new Date()),
          score: 2
        }
      ]
    }
  },
  watch: {
    goodsNo: {
      handler () {
        this.getCommentList()
        this.getScoreInfo()
      },
      immediate: true
    }
  },
  methods: {
    getCommentList () {
      this.$http.get('/action/comment/getGoodsCommentList', {
        goodsNo: this.goodsNo
      }).then(res => {
        this.commentList = res.data
        this.commentList.map(item => {
          item.createTime = this.Utils.getYMDTime(item.createTime)
        })
      })
    },
    getScoreInfo () {
      this.$http.get('/action/comment/getGoodsScoreInfo', {
        goodsNo: this.goodsNo
      }).then(res => {
        this.goodsScore = res.data.aveScore
        this.totalComment = res.data.allNum
        this.scoreList = res.data.scoreNumList
      })
    },
    selectScore (index) {
      this.myScore = index + 1
      wx.showToast({
        title: '感谢评分',
        icon: 'success',
        duration: 2000
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