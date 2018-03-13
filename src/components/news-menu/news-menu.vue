<template>
  <div class="news-menu">
    <div class="model">
      <div class="menu back" @click="back">
        <img src="../../common/image/arrow-left-back-grey.png" />
      </div>
      <div class="menu next" @click="nextNews">
        <img src="../../common/image/arrow-down.png"/>
      </div>
      <div class="menu thumb" @click="thumbUp">
        <img v-if="!thumb" src="../../common/image/thumb-before.png"/>
        <img v-if="thumb" src="../../common/image/thumb-after.png"/>
        <span class="extra">{{ this.newsPopularity }}</span>
      </div>
      <div class="menu share-btn"  @click="shareNews">
        <img src="../../common/image/share.png" />
      </div>
      <div class="menu commit">
        <img src="../../common/image/commit.png" />
        <span class="extra">{{ this.$store.state.comments }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsExtraData } from 'api/news'
export default {
  data() {
    return {
      thumb: false,
      shareShow: false,
      scroll: '',
      newsPopularity: 0
    }
  },
  created () {
    this._getNewsExtraData()
  },
  watch: {
    '$route'(to, from) {
      this._getNewsExtraData()
    }
  },
  methods: {
    _getNewsExtraData () {
      getNewsExtraData(this.$route.params.id).then(response => {
        let longComments = response.data.long_comments
        this.newsPopularity = response.data.popularity
        let shortComments = response.data.short_comments
        let comments = response.data.comments

        this.$store.dispatch('changeStoryExtra', {
          long_comments: longComments,
          short_comments: shortComments,
          comments: comments,
          popularity: this.newsPopularity
        })
      }).catch(err => {
        console.log(err)
      })
    },
    thumbUp () {
      this.thumb = !this.thumb
      if (this.thumb) {
        this.newsPopularity++
      } else {
        this.newsPopularity--
      }
    },
    back() {
      this.$router.go(-1)
    },
    nextNews () {
      this.$router.push({
        name: 'newsPage',
        params: {
          id: 3892357
        }
      })
    },
    shareNews () {
      console.log('shareNews')
    }
  },
  computed: {
    nextId () {
      return this.$store.state.id
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/index.styl"

  .news-menu
    position fixed
    bottom -1px
    height 44px
    width 100%
    background-color rgb(255, 255, 255)
    .model
      display flex
      .menu
        flex 1
        line-height 39px
        font-size 30px
        text-align center
        margin-bottom 5px
        img
          width 25px
          height 25px
          position relative
          top 5px
          left 0
        .extra
          position relative
          left -5px
          bottom 10px
          font-size 15px
          color #000
      .share
        position fixed
        bottom 0
        left 0
        width 100%
        height 380px
        background #f5f5f5
        z-index 50
        transform translate3d(0, 0, 0)
        &.fold-enter-active, &.fold-leave-active
          transition all 0.5s
        &.fold-enter, &.fold-leave-active
          transform translate3d(0, 100%, 0)
        &.morning
          color rgb(51, 51, 51)
          background-color rgb(233, 233, 233)
          border-top 1px solid #f5f5f5
        &.night
          color rgb(184, 184, 184)
          background-color rgb(52, 52, 52)
        .title
          width 100%
          height 25px
          text-align center
          font-size 17px
          padding-top 10px
        .shareMenus
          position relative
          top 5px
          width 100%
          font-size 0
          .shareMenu
            display inline-block
            padding-top 15px
            z-index 50
            width 25%
            margin-bottom 30px
            text-align center
            i
              font-size 25px
              padding 10px
              border-radius 50%
              color #ffffff
              &.icon-weixinhaoyou
                background: #64c654
              &.icon-weixinpengyouquan
                background: #75cd37
              &.icon-QQ
                background: #286bc4
              &.icon-weibo
                background: #ec4226
              &.icon-fuzhi
                background: #dd472c
              &.icon-youdaoyunbiji
                background: #38a3ea
              &.icon-yinxiangbiji
                background: #5db346
              &.icon-tengxunweibo
                background: #3ea1d9
              &.icon-xinxi
                background: #4fe54e
              &.icon-instapaper
                background: #6c6c6c
            .name
              display block
              position relative
              top 20px
              font-size 18px
              text-align center
        .button
          position relative
          height 40px
          width 80%
          bottom 5px
          margin 15px auto
          background rgb(255, 255, 255)
          text-align center
          line-height 40px
          &.morning
            color rgb(51, 51, 51)
            background-color rgb(255, 255, 255)
          &.night
            color rgb(184, 184, 184)
            background-color rgb(85, 85, 85)
      .mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        background: rgba(7, 17, 27, 0.6)
        z-index 40
        opacity 1
        &.fade-enter-active, &.fade-leave-active
          transition all 0.5s
        &.fade-enter, &.fade-leave-active
          opacity 0
    .modal-open
      position fixed
      width 100%
</style>
