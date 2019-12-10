import SlideObserver from '../../../mixins/slideObserver'

export default {
  name: 'swSlide',
  mixins: [SlideObserver],
  props: {
    collapsed: {
      required: false
    },
    horizontal: Boolean,
    fit: Boolean,
    min: Number | String,
    shadow: Boolean
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
      class: {
        shadow: this.shadow
      },
      style: {
        overflow: this.collapsed === void 0 ? 'inherit' : 'hidden'
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