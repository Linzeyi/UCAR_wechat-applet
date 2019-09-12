<template>
  <div class="comment-form">
    <div class="comment-panel">
      <div class="panel-content star-content">
        <p>
          <span class="star" v-for="(item, index) in 5" :key="index" :class="{'stared': index + 1 <= score}" @click="selectScore(index)">
            <i class="iconfont icon-star">&#xe623;</i>
            <i class="iconfont icon-stared">&#xe624;</i>
          </span>
        </p>
        <p class="default-font">
          <span class="notice" v-if="score < 1">轻点星形来评分</span>
          <span class="my-score" v-else>{{score}}分</span>
        </p>
      </div>
    </div>
    <div class="comment-panel">
      <div class="panel-content text-content">
        <textarea v-model="content" placeholder="评论内容" maxlength="400" auto-height></textarea>
      </div>
    </div>
    <div class="comment-panel btn-panel">
      <div class="panel-content btn-content">
        <button class="sendComment-btn" type="success" @click="handlerComment()">发送评论</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      goodsId: undefined,
      content: '',
      score: 0
    }
  },
  mounted () {
    this.goodsId = this.$root.$mp.query.id
  },
  onUnload () {
    this.init()
  },
  methods: {
    init () {
      this.goodsId = undefined
      this.title = ''
      this.content = ''
      this.score = 0
    },
    selectScore (index) {
      this.score = index + 1
    },
    handlerComment () {
      if (this.title === '') {
        wx.showToast({
          title: '标题不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (this.score < 0) {
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

<style lang="less" scoped>
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
.comment-form {
  .comment-panel {
    box-sizing: border-box;
    &:first-child .panel-content {
      border: none;
    }
    &.btn-panel {
      width: 100%;
      text-align: center;
      padding-bottom: 0;
      .sendComment-btn {
        border-radius: 40rpx;
        display: inline-block;
        margin: 0 auto;
        padding: 0px 20px;
        font-size: 14px;
        background-color: #fff;
        color: #ff6421;
        border: 1px solid #ff6421;
        border-radius: 40rpx;
        line-height: 36px;
        &:active {
          color: #ec4e09;
          border-color: #ec4e09;
        }
        &::after {
          border: none
        }
        &::before {
          border: none;
        }
      }
    }
    .panel-content {
      padding: 10px 0;
      border-top: 1px solid #ddd;
      &.star-content {
        text-align: center;
        p {
          .star {
            margin: 0 2px;
            i {
              font-size: 16px;
            }
          }
          &.default-font {
            font-size: 14px;
            color: #777;
            .notice {
              font-size: 12px;
            }
          }
        }
      }
      input, textarea {
        border: none;
        font-size: 14px;
        line-height: 30px;
        color: #666;
      }
      input {
        text-indent: 5px;
      }
      textarea {
        width: 100%;
        text-indent: 5px;
        padding: 10px 0;
      }
    }
  }
}
</style>