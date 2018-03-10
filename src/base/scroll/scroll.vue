<template>
  <div class="scorll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    distance: {
      type: Number,
      default: 50
    }
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll () {
      if (this.$refs.wrapper) {
        return
      }

      let options = {
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        click: true
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      if (this.pullUp) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('pullUp')
          }
        })
      }
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
