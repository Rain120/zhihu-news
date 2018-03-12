<template>
  <div class="editors-list">
    <ul class="list" ref="editorsList">
      <li class="item" v-for="(editor, index) in data" :key="index">
        <div class="editors-wrap">
          <img v-lazy.editorsList="changeImageUrl(editor.avatar)" />
          <span class="name">{{ editor.name }}</span>
          <span class="bio">{{ editor.bio }}</span>
          <i class="icon iconfont icon-more"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTheme } from 'api/news'
export default {
  data() {
    return {
      data: []
    }
  },
  created () {
    this._getTheme()
  },
  methods: {
    _getTheme() {
      getTheme(this.$route.params.id).then(response => {
        this.data = response.data.editors
        console.log(this.data)
      })
    },
    back() {
      this.$router.go(-1)
    },
    changeImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  }
}
</script>

<style lang="stylus">
  .editors-list
    .list
      padding-top 40px
      padding-left: 0
      .item
        height 50px
        width 100%
        border-bottom 1px solid #ebebeb
        .editors-wrap
          position relative
          padding 0 15px
          height 100%
          line-height 50px
          img
            position absolute
            top 50%
            left 20px
            margin-top -17.5px
            width 35px
            height 35px
            border-radius 50%
          .name
            position absolute
            top -6px
            left 70px
            font-size 16px
          .bio
            position absolute
            top 14px
            left 70px
            font-size 12px
            color #b0b0b0
            letter-spacing 2px
          .icon
            position absolute
            top 0
            right 15px
            font-size 22px
            color #ccc
</style>
