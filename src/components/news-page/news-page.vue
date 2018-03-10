<template>
  <div class="news-page">
    <scroll>
      <div class="content-wrapper">
        <div class="bg-image" v-if="data.image">
          <img :src="changeHeaderBgUrl(data.image)" v-lazy="changeHeaderBgUrl(data.image)"><span class="title">{{ data.title }}</span>
        </div>
        <div class="content" v-html="data.body" :class="model"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getNewsContent } from 'api/news'
// import route from '../../router'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: {}
    }
  },
  created () {
    this._getNewsContent()
  },
  watch: {
    '$route' (to, from) {
      this._getNewsContent()
    }
  },
  methods: {
    _getNewsContent () {
      getNewsContent(this.id).then(res => {
        res.data.body = this.changeBodyContent(res.data.body)
        this.data = res.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 替换头部背景图片url
    changeHeaderBgUrl (srcUrl) {
      if (srcUrl) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    // 替换详情内容图片url
    changeBodyContent (body) {
      return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'isNight'
    ]),
    model () {
      return this.isNight ? 'night' : 'morning'
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus">
  .news-page
    position fixed
    top 0
    bottom: 0
    width 100%
    z-index 10
    .content-wrapper
      .bg-image
        position relative
        width 100%
        height  250px
        z-index -1
        .title
          position absolute
          bottom 0
          font-size 18px
          padding 0 10px 10px 15px
          color rgb(255,255,255)
        img
          position absolute
          width 100%
          height 250px
      .content
        position absolute
        width 100%
        &.morning
          color rgb(51,51,51)
          background-color rgb(255,255,255)
        &.night
          color rgb(184,184,184)
          background-color rgb(52,52,52)
</style>
