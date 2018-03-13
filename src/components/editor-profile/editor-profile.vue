<template>
  <div class="editor-profile">
    <div class="editor-header">
      <span class="back" @click="back ">
        <img src="../../common/image/arrow-left.png" width="30" height="30"/>
      </span>
      <h3>{{ title }}</h3>
    </div>
    <div class="html-content" v-html="this.data"></div>
    <div class="empty"></div>
  </div>
</template>

<script>
import { getEditorProfile } from 'api/news'
export default {
  data () {
    return {
      data: '',
      html: '',
      title: ''
    }
  },
  created () {
    this._getEditorProfile()
  },
  methods: {
    _getEditorProfile () {
      this.title = this.$route.params.name
      getEditorProfile(this.$route.params.id).then(response => {
        this.data = this.changeBodyContent(response.data)
        // console.log(this.data)
      })
    },
    changeBodyContent (body) {
      return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=')
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
  .editor-profile
    .editor-header
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
    .html-content
      padding-top: 40px
    .empty
      height 260px
      overflow hidden
      background-color rgb(255, 255, 255)
</style>
