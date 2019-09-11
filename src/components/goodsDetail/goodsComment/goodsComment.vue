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
      <div class="comment-list">
        <div class="list-panel" v-for="(item, index) in commentList" :key="index">
          <div class="left-box">
            <div class="img-box">
              <image :src="item.sender.avatar" alt="用户头像" mode="aspectFit"></image>
            </div>
          </div>
          <div class="info-box">
            <p class="name">{{item.sender.name}}</p>
            <p class="date-type">
              <span class="date">{{item.sendTime}}</span>
              <span class="type">{{item.type}}</span>
            </p>
            <p class="content">{{item.content}}</p>
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
  computed: {
  },
  methods: {
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
        display: flex;
        &:last-child {
          margin: 0;
        }
        .left-box {
          .img-box {
            width: 50px;
            height: 50px;
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
          p {
            font-size: 12px;
            &.name {
              margin-bottom: 5px;
            }
            &.date-type {
              font-size: 11px;
              color: #999;
              display: flex;
              margin-bottom: 10px;
              .type {
                flex-grow: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
}
</style>