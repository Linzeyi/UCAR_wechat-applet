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
                <i class="iconfont icon-star" v-for="(scoreItem, scoreIndex) in item.score" :key="scoreIndex">&#xe663;</i>
              </div>
              <div class="progress">
                <progress :percent="(item.num / totalComment) * 100" color="#666" stroke-width="4"></progress>
              </div>
            </div>
          </div>
          <p class="default-font">{{totalComment}}评论</p>
        </div>
      </div>
    </div>
    <div class="comment-list-wrap">
      <div class="option-panel">
        <p>
          <span class="left">轻点评分</span>
          <span class="right">
            <span class="my-score" v-if="myScore >= 0">{{myScore}}分</span>
            <span class="star" v-for="(item, index) in 5" :key="index" :class="{'stared': index <= myScore}" @click="selectScore(index)">
              <i class="iconfont icon-star">&#xe623;</i>
              <i class="iconfont icon-stared">&#xe624;</i>
            </span>
          </span>
        </p>
      </div>
      <div class="comment-panel" v-if="showCommentOption">
        <textarea v-model="myComment" placeholder="请输入您的评论内容..." :auto-height="true"></textarea>
        <div class="btn-panel">
          <button class="sendComment-btn" type="primary" @click="handlerComment">发布评论</button>
        </div>
      </div>
      <div class="to-comment-panel" v-else>
        <span @click="showCommentOption = true"><i class="iconfont icon-edit">&#xe609;</i> 攥写评论</span>
      </div>
      <div class="comment-list">
        <div class="list-panel">
          <div class="top-panel">
            <p>
              <span class="title">但司空见惯</span>
              <span class="date">2019-09-05</span>
            </p>
            <p>
              <span class="star-box">
                <span class="star" v-for="(item, index) in 5" :key="index" :class="{'stared': index <= 4}">
                  <i class="iconfont icon-star">&#xe623;</i>
                  <i class="iconfont icon-stared">&#xe624;</i>
                </span>
              </span>
              <span class="sender">sasf</span>
            </p>
          </div>
          <div class="content-panel">
            <text>卡萨和高科技</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'goodsId'
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
      myScore: -1,
      myComment: '',
      showCommentOption: false
    }
  },
  methods: {
    selectScore (index) {
      this.myScore = index
      this.showCommentOption = true
    },
    handlerComment () {
      if (this.myComment === '') {
        wx.showToast({
          title: '评论内容为空',
          icon: 'none',
          duration: 2000
        })
      } else if (this.myScore < 0) {
        wx.showToast({
          title: '未选择评分',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '成功发表评论',
          icon: 'success',
          duration: 2000
        })
      }
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
  .statistics-wrap {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    h1 {
      font-size: 30px;
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
          padding-top: 4px;
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
        padding: 15px;
        border-radius: 6px;
        background-color: #eee;
        margin-bottom: 10px;
        &:last-child {
          margin: 0;
        }
        .top-panel {
          p {
            font-size: 12px;
            line-height: 34rpx;
            color: #555;
            .star {
              .iconfont {
                font-size: 20rpx;
                &.icon-stared {
                  color: tomato;
                }
              }
            }
            .date, .sender {
              color: #aaa;
              float: right;
            }
          }
          margin-bottom: 5px;
        }
        .content-panel {
          text {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>