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
              <div class="star-box"></div>
              <div class="progress">
                <progress :percent="(item.num / totalComment) * 100" color="#666" stroke-width="4"></progress>
              </div>
            </div>
          </div>
          <p class="default-font">{{totalComment}}评论</p>
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
          score: 1,
          num: 10
        },
        {
          score: 2,
          num: 67
        },
        {
          score: 3,
          num: 125
        },
        {
          score: 4,
          num: 502
        },
        {
          score: 5,
          num: 549
        }
      ]
    }
  }

}
</script>

<style lang="less">
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
              width: 80px;
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
}
</style>