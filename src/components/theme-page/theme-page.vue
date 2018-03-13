<template>
  <div class="theme-page">
    <div class="model">
      <m-header @showSidebar="show" :title="data.name"></m-header>
      <sidebar ref="sidebar"></sidebar>
      <div class="editors border-1px" @click="showEditorsList()">
        <span class="editor">主编</span>
        <div class="avatar" v-for="(editor, index) in editorsLimit" :key="index">
          <img :src="changeImageUrl(editor.avatar)" width="25" height="25">
        </div>
        <img src="../../common/image/arrow_right.png" width="15" height="15" />
      </div>
    </div>
    <div class="theme-news-list">
      <ul>
        <li class="new border-1px" @click="goNews(story.id)" v-for="(story, index) in data.stories" :key="index">
          <span class="title">{{ story.title }}</span>
          <span class="avatar"  v-for="(image, index) in story.images" :key="index" v-if="index < 1">
            <img v-lazy="changeImageUrl(image)" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Sidebar from 'components/Sidebar/Sidebar'
import { getTheme } from 'api/news'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: {},
      currentId: '',
      scroll: '',
      editors: [],
      editorsLimit: []
    }
  },
  watch: {
    '$route' (to, from) {
      this._getTheme()
    }
  },
  created () {
    this._getTheme()
  },
  methods: {
    _getTheme () {
      if (this.currentThemeId !== -1) {
        getTheme(this.currentThemeId).then(response => {
          this.data = response.data
          // console.log(this.data)
          this.editors = this.data.editors
          this.editorsLimit = this.editors
          if (this.editorsLimit.length > 7) {
            this.editorsLimit.splice(8, this.editorsLimit.length)
          }
        }).catch(err => {
          console.log(err)
        })

        this.currentId = this.currentThemeId
      }
    },
    goNews (id) {
      this.currentId = id
      this.$router.push({
        name: 'newsPage',
        params: {
          id: id
        }
      })
    },
    changeImageUrl(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    show () {
      this.$refs.sidebar.open()
    },
    showEditorsList () {
      this.$router.push({
        name: 'editorsList',
        params: {
          id: this.currentId
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'currentThemeId',
      'currentTheme',
      'id'
    ])
  },
  components: {
    MHeader,
    Sidebar
  }
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .theme-page
    .model
      .editors
        position relative
        top 40px
        width 100%
        height 40px
        line-height 40px
        border-1px(rgba(7, 17, 27, 0.1))
        margin 0 5px
        padding 10px 10px
        .editor
          display inline-block
          font-size 17px
          color rgb(255, 255, 255)
        .avatar
          display inline-block
          vertical-align -webkit-baseline-middle
          img
            margin-left 10px
            border-radius 50%
    .theme-news-list
      position relative
      top 40px
      width 100%
      height 120%
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
        box-shadow 0px 0px 5px rgba(0, 0, 0, 0.5)
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
