<template>
  <div class="editors-list">
    <div class="editors-header">
      <span class="back" @click="back">
        <img src="../../common/image/arrow-left.png" width="30" height="30"/>
      </span>
      <h3>{{ title }}</h3>
    </div>
    <ul class="list" ref="editorsList">
      <li class="item" @click="showEditorProfile(editor.id, editor.name)" v-for="(editor, index) in data" :key="index">
        <div class="editors-wrap">
          <img v-lazy.editorsList="changeImageUrl(editor.avatar)" />
          <span class="name">{{ editor.name }}</span>
          <span class="bio">{{ editor.bio }}</span>
          <!-- <i class="icon iconfont icon-more"></i> -->
          <span class="right">
            <img src="../../common/image/arrow_right.png" width="20" height="20">
          </span>
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
      data: [],
      title: '主编'
    }
  },
  created () {
    this._getTheme()
  },
  methods: {
    _getTheme() {
      getTheme(this.$route.params.id).then(response => {
        this.data = response.data.editors
        console.log(this.data.id)
      })
    },
    back() {
      this.$router.go(-1)
    },
    changeImageUrl (srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    showEditorProfile(id, name) {
      this.$router.push({
        name: 'editorProfile',
        params: {
          id: id,
          name: name
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .editors-list
    height 712px
    background-color #fff
    .editors-header
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
      .back
        position absolute
        left 10px
        bottom 2px
        height 40px
        img
          position absolute
          top 6px
          color #fff
    .list
      padding-top 40px
      padding-left 0
      .item
        height 50px
        width 100%
        border-bottom 1px solid #ebebeb
        .editors-wrap
          position relative
          padding 0 15px
          height 100%
          line-height 50px
          & > img
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
            color #000
          .bio
            position absolute
            top 14px
            left 70px
            font-size 12px
            color #b0b0b0
            letter-spacing 2px
          .right
            position absolute
            top 5px
            right 10px
</style>
