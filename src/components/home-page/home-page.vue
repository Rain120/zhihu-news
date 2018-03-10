<template>
  <div class="home-page" ref="homepage">
    <scroll class="home-page-content" :pull-up="pullUp" @pullUp="_getMoreNews" v-if="stories.length" :data="stories">
      <div>
        <div v-if="sliders.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="(item, index) in sliders" :key="index">
                <img :src="item.image">
              </div>
            </slider>
          </div>
        </div>
        <div class="newList">
          <div class="model" :class="model">
            <ul>
              <li class="new border-1px" v-for="story in stories" :key="story.id" @click="goNews(story.id)">
                <span class="title">{{story.title}}</span>
                <span class="avatar" v-for="(item,index) in story.images" :key="index" v-if="index<1"><img
                  v-lazy="changeImageUrl(item)"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Backtop from 'base/back-top/back-top'
// import HomePageDetail from 'components/home-page-detail/home-page-detail'
import { getSlider, getNews, getMoreNews } from 'api/news'
import { changeImageUrl } from 'common/js/dom'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      sliders: [],
      date: Date,
      dateStr: '',
      pullUp: true
    }
  },
  created () {
    if (this.isFirstLoad) {
      this._getNews()
      this.setFirstLoad()
      this.initDate()
    }
  },
  mounted () {
    setTimeout(() => {
      this._getSlider()
    }, 20)
  },
  methods: {
    _getSlider () {
      getSlider().then((res) => {
        this.sliders = this.initImage(res.data.top_stories)
      })
    },
    initImage (data) {
      data.map((item) => {
        item.image = changeImageUrl(item.image)
      })
      return data
    },
    _getNews () {
      getNews().then((response) => {
        let stories = response.data.stories
        let ids = stories.map(story => story.id)
        this.addNews({
          stories: stories,
          ids: ids
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    _getMoreNews () {
      // console.log(this.homepageDateStr)
      getMoreNews(this.homepageDateStr).then(response => {
        let stories = response.data.stories
        // console.log(stories)
        let ids = stories.map(story => story.id)

        this.addNews({
          stories: stories,
          ids: ids
        })
      }).catch((error) => {
        console.log(error)
      })

      this.decreaseDateStr()
    },
    decreaseDateStr () {
      let homeDate = this.homepageDate
      homeDate.setDate(homeDate.getDate() - 1)
      this.addDate(new Date(homeDate.getTime()))
      this.formatDate()
    },
    formatDate () {
      let nowDate = new Date(this.homepageDate.getTime())
      let year = nowDate.getFullYear() + ''
      let month = nowDate.getMonth() + 1
      let date = nowDate.getDate()
      month = month < 10 ? '0' + month : month + ''
      date = date < 10 ? '0' + date : date + ''
      this.dateStr = year + month + date
      this.addDateStr(this.dateStr)
    },
    initDate () {
      this.date = new Date()
      this.addDate(new Date(this.date.getTime()))
      console.log(new Date(this.date.getTime()))
      this.formatDate()
    },
    changeImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    goNews (id) {
      console.log('goNews')
      this.setGoType({
        id: id,
        type: 1
      })
      this.$router.push({name: 'newsPage', params: {id: id}})
    },
    show () {
      this.$refs.sidebar.open()
    },
    ...mapMutations({
      setFirstLoad: 'CHANGE_FIRST_LOAD'
    }),
    ...mapActions([
      'addNews',
      'addDate',
      'addDateStr',
      'setGoType'
    ])
  },
  computed: {
    model () {
      return this.isNight ? 'night' : 'morning'
    },
    ...mapGetters([
      'stories',
      'isNight',
      'isFirstLoad',
      'homepageDate',
      'homepageDateStr'
    ])
  },
  components: {
    Slider,
    Scroll,
    Backtop
  }
}
</script>

<style lang="stylus">
  @import '~common/stylus/mixin.styl'

  .home-page
    position fixed
    top 40px
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
