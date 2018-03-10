<template>
  <div>
    <transition name="fold">
      <div class="sidebar"  v-show="showSidebar">
        <div class="user">
          <div class="avatar"></div>
          <p class="username">Rainy</p>
        </div>
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

export default {
  data () {
    return {
      data: [],
      showSidebar: false
    }
  },
  created () {
    this.fetchData()
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
    fetchData () {
      getThemeTitle().then(res => {
        this.data = res.data.others
        // console.log(this.data)
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style socped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin.styl'

  .sidebar
    position fixed
    top 0
    left 0
    z-index 40
    width 25%
    height 100%
    background-color rgb(35, 42, 48)
    transform translate3d(0, 0, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all .5s
    &.fold-enter, &.fold-leave-active
      transform translate3d(-100%, 0, 0)
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
