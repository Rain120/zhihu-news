<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initScroll()
      this._initDots()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
  },
  activated () {
    this.slider.enable()
    let index = this.slider.getCurrentPage().pageX
    this.currentPageIndex = index
    this.slider.goToPage(index, 0, 400)
    if (this.autoPlay) {
      this._play()
    }
    window.addEventListener('resize', () => {
      if (!this.slider || !this.slider.enabled) {
        return
      }
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._changePageIndex()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refreshSlider()
      }, 60)
    })
  },
  methods: {
    refreshSlider () {
      this._setSliderWidth(true)
      this.slider.refresh()
    },
    _setSliderWidth (resize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let children = this.children[i]
        addClass(children, 'slider-item')
        width += sliderWidth
        children.style.width = `${sliderWidth}px`
        children.style.height = `${sliderWidth * 0.5}px`
      }
      if (this.loop && !resize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = `${width}px`
    },
    _initScroll () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', this._changePageIndex)
    },
    _initDots () {
      this.dots = new Array(this.children.length - 2)
      // console.log(this.dots)
    },
    _changePageIndex () {
      this.currentPageIndex = this.slider.getCurrentPage().pageX
      if (this.autoPlay) {
        this._play()
      }
    },
    _play () {
      clearTimeout(this.timer)
      if (this.autoPlay) {
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    }
  },
  deactivated () {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  destroyed () {
    this.slider.disable()
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .slider
  width 100%
  height 100%
  .slider-group
    position relative
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      text-align center
      overflow hidden
      img
        display block
        width 100%
        height 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: rgba(255, 255, 255, .5)
      &.active
        width: 20px
        border-radius: 5px
        background: rgba(255, 255, 255, .8)
</style>
