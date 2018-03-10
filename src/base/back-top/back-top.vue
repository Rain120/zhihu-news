<template>
  <div class="back-top">
    <button class="back-btn" @click="pageBackTop" ref="btn">
      <svg fill="currentColor" viewBox="0 0 24 24" width="30" height="30"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isTop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.needScroll()
  },
  methods: {
    needScroll () {
      let clientHeight = document.documentElement.clientHeight
      window.onscroll = function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        if (osTop >= clientHeight) {
          this.$refs.btn.style.display = 'block'
        } else {
          this.$refs.btn.style.display = 'none'
        }
        if (!this.isTop) {
          clearInterval(this.timer)
        }
        this.isTop = false
      }
    },
    goTop () {
      this.timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(this.timer)
        }
      }, 30)
    }
  }
}
</script>

<style  lang="stylus">
  .back-top
    .back-btn
      position absolute
      right 5%
      bottom 5%
      background-color rgba(255, 255, 255, .2)
</style>
