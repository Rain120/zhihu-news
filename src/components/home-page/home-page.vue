<template>
  <div class="home-page" ref="homepage">
    <scroll class="home-page-content" v-if="stories.length" :data="stories" :pull-up="pullUp" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="stories.length">
          <div class="slider-content">
            <slider>
              <div v-for="(item,index) in sliders" :key="index">
                <img @load="loadImage" :src="item.image">
              </div>
            </slider>
          </div>
        </div>
        <div class="newList">
          <div class="model">
            <ul>
              <li class="new border-1px" v-for="(story, index) in stories" :key="index" >
                <span class="title">{{ story.title }}</span>
                <span class="avatar" v-for="(item,index) in story.images" :key="index" v-if="index < 1"><img height="60" width="60" v-lazy="attachImageUrl(item)"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import { getNews, getSlider } from 'api/news'
import { attachImageUrl } from 'common/js/dom'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      sliders: [],
      date: Date,
      dateStr: '',
      pullUp: true,
      checkLoaded: false
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    setTimeout(() => {
      this._getSlider()
    }, 20)
  },
  methods: {
    initImage (data) {
      data.map((item) => {
        item.image = attachImageUrl(item.image)
      })
      return data
    },
    // 转换图片url
    attachImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    _getSlider () {
      getSlider().then(res => {
        this.sliders = this.initImage(res.data.top_stories)
        // console.log(this.sliders)
      })
    },
    fetchData () {
      getNews().then(res => {
        let stories = res.data.stories
        // console.log(stories)
        let ids = stories.map(story => story.id)

        this.addNews({
          stories: stories,
          ids: ids
        })
      }).catch(err => {
        console.log(err)
      })
    },
    show () {
      this.$refs.sidebar.open()
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    ...mapActions([
      'addNews'
    ])
  },
  computed: {
    ...mapGetters([
      'stories',
      'isNight'
    ]),
    model () {
      return this.isNight ? 'night' : 'morning'
    }
  },
  components: {
    Scroll,
    Slider
  }
}
</script>

<style lang="stylus">
  @import '~common/stylus/mixin.styl'

  .home-page
    position fixed
    top 50px
    bottom 0
    width 100%
    .home-page-content
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        width 100%
        padding-top 50%
        overflow hidden
        .slider-content
          position absolute
          top 0
          left 0
          width 100%
          overflow hidden
      .newList
        .model
          &.morning
            color rgb(51,51,51)
            background-color rgb(255,255,255)
          &.night
            color rgb(184,184,184)
            background-color rgb(52,52,52)
          .new
            display flex
            position relative
            padding 20px 0 20px 10px
            &.morning
              border-1px(rgba(7,17,27,0.1))
            &.night
              border-1px(rgb(43,43,43))
            .title
              flex 1
              margin-right 10px
              line-height 20px
            .avatar
              flex 0 0 75px
              width 64px
              height 64px
              img
                width 64px
                height 64px
</style>
