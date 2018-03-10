<template>
  <div class="header" ref="header">
    <div class="model">
      <span class="navigation" @click="showSidebar"></span>
      <h2>{{title}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '今日新闻'
    }
  },
  methods: {
    showSidebar () {
      this.$emit('showSidebar')
      console.log('ShowsideBar')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style socped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin.styl'

  .header
    position fixed
    top 0
    left 0
    font-size 0
    width 100%
    height 40px
    z-index 5
    text-align center
    .model
      background-color rgb(85, 85, 85)
      &.morning
        color rgb(51, 51, 51)
        background-color rgb(2, 143, 214)
      &.night
        color rgb(184, 184, 184)
        background-color rgb(85, 85, 85)
      & > h2
        line-height 40px
        font-size 22px
        color white
      .navigation
        position absolute
        top 10px
        width 20px
        height 20px
        font-size 0
        left 10px
        padding 5px
        bg-image('navigation')
        background-size 20px 20px
        background-repeat no-repeat
</style>
