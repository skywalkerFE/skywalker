import SlideObserver from '../../../mixins/slideObserver'

export default {
  name: 'swSlide',
  mixins: [SlideObserver],
  props: {
    collapsed: Boolean,
    horizontal: Boolean,
    fit: Boolean,
    min: Number | String,
    shadow: Boolean
  },
  data: () => ({
    innerCollapsed: true,
    overflow: 'hidden'
  }),
  watch: {
    collapsed: {
      handler() {
        this.innerCollapsed = this.collapsed
      },
      immediate: true
    }
  },
  mounted(){
    this.overflow = this.innerCollapsed ? 'hidden' : 'inherit'
    this.$refs.slide.addEventListener('transitionstart', () => {
      this.overflow = 'hidden'
    })
    this.$refs.slide.addEventListener('transitionend', () => {
      this.overflow = this.innerCollapsed ? 'hidden' : 'inherit'
    })
  },
  render(h) {
    return h('div', {
      ref: 'slide',
      staticClass: 'sw-slide__container',
      class: {
        shadow: this.shadow
      },
      style:{
        overflow: this.overflow
      }
    }, [
      h('div', {
        ref: 'observe',
        staticClass: `sw-slide__content`,
        class: {
          'min-width': this.horizontal && !this.fit,
          'fit-width': this.horizontal && this.fit,
          'min-height': !this.horizontal && !this.fit,
          'fit-height': !this.horizontal && this.fit
        }
      }, [this.$scopedSlots.default()])
    ])
  }
}