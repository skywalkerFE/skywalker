
export default {
  data: () => ({
    observer: void 0,
    measuredWidth: void 0
  }),
  computed: {
    target() {
      return this.horizontal ? 'width' : 'height'
    },
    measureTarget() {
      return this.horizontal ? 'offsetWidth' : 'offsetHeight'
    },
    minSize() {
      return this.min !== void 0 ? `${this.min}px` : 0
    }
  },
  methods: {
    initStyle() {
      if (this.innerCollapsed) {
        this.$refs.slide.style[this.target] = this.minSize
      }
    },
    setStyle(passive) {
      let slideTarget = this.$refs.slide

      if (passive) {
        if (slideTarget.style[this.target] && !this.innerCollapsed) {
          slideTarget.style[this.target] = null
        }
        return
      }
      slideTarget.style[this.target] = `${this.$refs.observe[this.measureTarget]}px`
      if (this.innerCollapsed) {
        setTimeout(() => {
          slideTarget.style[this.target] = this.minSize
        }, 0)
      }
    },
    clearUpperStyle(upper) {
      let upperSlideTarget = upper.$refs.slide

      if (upperSlideTarget) {
        if (upperSlideTarget.style[this.target]) {
          upperSlideTarget.style[this.target] = null
        }
      }
      if (upper.$parent && upper.$parent.$refs) {
        this.clearUpperStyle(upper.$parent)
      }
    }
  },
  mounted() {
    if (!this.$refs.slide || !this.$refs.observe) { return }
    this.$watch(
      'innerCollapsed',
      () => {
        this.clearUpperStyle(this.$parent)
        this.setStyle()
      })
    this.initStyle()
    this.observer = new MutationObserver(() => {
      this.setStyle(true)
    })

    this.observer.observe(this.$refs.observe, {
      attributes: true,
      attributeFilter: ['mutate'],
      childList: true,
      subtree: true,
      characterData: true
    })
  },
  beforeDestroy() {
    this.observer && this.observer.disconnect()
  }
}
  