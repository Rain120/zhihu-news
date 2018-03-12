<template>
  <div>
    <transition name="fold">
      <div class="sidebar"  v-show="showSidebar">
        <div class="user">
          <div class="avatar"></div>
          <p class="username">Rainy</p>
        </div>
        <scroll class="themes-list" :data="data" ref="scroll">
          <ul>
            <li class="themes" :class="selectedTheme(item.id)" @click.stop.prevent="goTheme(item.id)" v-for="(item, index) in data" :key="index">
              <!-- <i class="icons" v-if="item.id === -1"></i> -->
              <div class="themetitle">{{ item.name }}</div>
              <!-- <i class="icon_right arrow_right"><img src="../../common/image/arrow_right.png" width="15" height="15"></i> -->
            </li>
          </ul>
        </scroll>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click.stop.prevent="hide" v-show="showSidebar"></div>
    </transition>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getThemeTitle } from 'api/news'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    currentIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      data: [],
      showSidebar: false,
      activeTheme: this.currentIndex
    }
  },
  created () {
    this._getThemeTitle()
  },
  watch: {
    '$route'(to, from) {
      this._getThemeTitle()
    }
  },
  methods: {
    open () {
      this.showSidebar = true
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    hide () {
      this.showSidebar = false
    },
    _getThemeTitle () {
      getThemeTitle().then(res => {
        this.data = res.data.others
        this.data.sort((previous, next) => {
          return previous.id - next.id
        })
        this.data.unshift({
          color: 0,
          thumbnail: '',
          description: '首页',
          id: -1,
          name: '首页'
        })
      })
    },
    ...mapMutations({
      setThemeid: 'CHANGE_CURRENT_THEME_ID',
      setGoType: 'CHANGE_GO_TYPES',
      changeMoel: 'CHANGE_MODEL'
    }),
    goTheme (id) {
      this.activeTheme = id
      this.hide()
      if (id === -1) {
        this.$router.push({
          name: 'homePage'
        })
        this.setGoType(1)
        this.setThemeid(id)
        // console.log('1')
      } else {
        // this.hide()
        this.setThemeid(id)
        this.$router.push({
          name: 'themePage',
          params: {
            id: id
          }
        })
        console.log('id', id)
      }
      console.log('activeTheme', this.activeTheme)
    },
    selectedTheme (id) {
      if (this.activeTheme === id) {
        return 'theme-active'
      }
      return 'current'
    }
  },
  computed: {
    ...mapGetters([
      'currentThemeId',
      'isNight'
    ]),
    modelText () {
      return this.isNight ? '日间' : '夜间'
    }
  },
  components: {
    Scroll
  }
}
</script>

<style socped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl'
  // @import '~common/stylus/icon.styl'

  .sidebar
    position fixed
    top 0
    left 0
    z-index 40
    width 230px
    height 100%
    background-color rgb(35, 42, 48)
    transform translate3d(0, 0, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all .5s
    &.fold-enter, &.fold-leave-active
      transform translate3d(-100%, 0, 0)
    .user
      padding 10px 10px 0
      font-size 0
      .avatar
        display inline-block
        margin-right 10px
        width 40px
        height 40px
        background-size 40px 40px
        background-repeat no-repeat
        border-radius 50%
        vertical-align top
      .username
        display inline-block
        font-size 15px
        color rgb(148, 153, 157)
        line-height 40px
    .themes-list
      position absolute
      top 114px
      bottom 56px
      width 100%
      overflow hidden
      vertical-align top
      .themes
        display table
        width 100%
        padding-left 25px
        font-size 17px
        color rgb(148, 153, 157)
        &.current
          background-color rgb(27, 35, 41)
          color rgb(255, 255, 255)
        &.theme-active
          background-color rgb(38, 166, 154)
          color rgb(255, 255, 255)
        .icons
          display inline-block
          margin-right 5px
        .themetitle
          display inline-block
          line-height 50px
  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 30
    background rgba(7, 17, 27, .6)
    opacity 1
    &.fade-enter-active, &.fade-leave-active
      transitio all .5s
    &.fade-enter, &.fade-leave-active
      opacity 0
</style>
