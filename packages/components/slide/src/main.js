import SlideObserver from '../../../mixins/slideObserver'

export default {
  name: 'swSlide',
  mixins: [SlideObserver],
  props: {
    collapsed: Boolean,
    horizontal: Boolean,
    min: Number | String
  },
  data: () => ({
    innerCollapsed: true
  }),
  watch: {
    collapsed: {
      handler() {
        this.innerCollapsed = this.collapsed
      },
      immediate: true
    }
  },
  render(h) {
    return h('div', {
      ref: 'slide',
      staticClass: 'sw-slide__container',
    }, [
      h('div', {
        ref: 'observe',
        staticClass: `sw-slide__content`,
        class: {
          'min-width': this.horizontal,
          'min-height': !this.horizontal
        }
      }, [this.$scopedSlots.default()])
    ])
  }
}