<template>
  <div class="news-page">
    <div class="page-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="news-wrapper">
      <div class="bg-image" v-if="this.data.image">
        <!-- <span class="back" @click="back"><img src="../../common/image/arrow-left-back.png" /></span> -->
        <img v-lazy="changeImageUrl(this.data.image)" />
        <span class="news-title">{{ data.title }}</span>
      </div>
      <!-- <span class="image-source">图片：{{this.data.image_source}}</span> -->
    </div>
    <div class="news-body" v-html="this.data.body"></div>
    <news-menu></news-menu>
  </div>
</template>
<script>
import { getNewsContent } from 'api/news'
import NewsMenu from 'components/news-menu/news-menu'
export default {
  data() {
    return {
      data: {},
      title: ''
    }
  },
  watch: {
    '$route'(to, from) {
      this._getNewsContent()
    }
  },
  created() {
    this._getNewsContent()
  },
  methods: {
    _getNewsContent() {
      getNewsContent(this.$route.params.id).then(response => {
        response.data.body = this.changeBodyContent(response.data.body)
        this.data = response.data
        this.title = this.data.theme.name
        console.log('213712573', this.title)
      }).catch(error => {
        console.log(error)
      })
    },
    changeImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    changeBodyContent (body) {
      return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
    }
  },
  components: {
    NewsMenu
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .news-page
    .page-header
      position fixed
      width 100%
      height 40px
      text-align center
      z-index 50
      line-height 40px
      background rgb(2,143,214)
      & > h3
        line-height 40px
        font-size 22px
        color #fff
    .news-wrapper
      height: 200px
      position: relative
      overflow-y: hidden
      z-index: 50
      .back
        position absolute
        top -35px
        left 15px
        z-index 100
        img
          width 30px
          height 30px
      img
        position: absolute
        bottom: -75px
        width: 100%
      .news-title
        position: absolute
        top: 100px
        padding: 30px 20px
        line-height: 25px
        color: #000
        font-weight bold
        font-size: 22px
      .image-source
        position: absolute
        right: 8px
        bottom: 10px
        font-size: 12px
        color: #ccc
    .news-body
      position: absolute
      width: 100%
      top: 5%
      padding-bottom: 44px
</style>
