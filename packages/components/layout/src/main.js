import Slide from '../../slide'

export default {
  name: 'swLayout',
  components: { Slide },
  props: {
    collapseTop: Boolean,
    collapseLeft: Boolean,
    collapseRight: Boolean,
    collapseBottom: Boolean,
    fitTop: Boolean,
    fitLeft: Boolean,
    fitRight: Boolean,
    fitBottom: Boolean,
    topMin: Number | String,
    leftMin: Number | String,
    rightMin: Number | String,
    bottomMin: Number | String,
    shadow: Boolean
  },
  data: () => ({}),
  computed: {
    verticalStretch() {
      return this.$scopedSlots.top !== void 0 || this.$scopedSlots.bottom !== void 0
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'sw-layout flex no-wrap',
      class: {
        shadow: this.shadow
      },
      style: {
        'flex-direction': this.verticalStretch && 'column'
      }
    }, [
      this.$scopedSlots.top !== void 0 ? h(Slide, {
        props: {
          collapsed: this.collapseTop,
          fit: this.fitTop,
          min: this.topMin
        },
        staticClass: 'sw-layout__around',
        scopedSlots: {
          default: this.$scopedSlots.top
        }
      }) : void 0,

      !this.verticalStretch && this.$scopedSlots.left !== void 0 ? h(Slide, {
        props: {
          collapsed: this.collapseLeft,
          horizontal: true,
          fit: this.fitLeft,
          min: this.leftMin
        },
        staticClass: 'sw-layout__around',
        scopedSlots: {
          default: this.$scopedSlots.left
        }
      }) : void 0,

      h('div', {
        ref: 'layoutMain',
        staticClass: 'sw-layout__main',
      }, [[this.$scopedSlots.default !== void 0
        ? this.$scopedSlots.default() : void 0]]),

      !this.verticalStretch && this.$scopedSlots.right !== void 0 ? h(Slide, {
        props: {
          collapsed: this.collapseRight,
          horizontal: true,
          fit: this.fitRight,
          min: this.rightMin
        },
        staticClass: 'sw-layout__around',
        scopedSlots: {
          default: this.$scopedSlots.right
        }
      }) : void 0,

      this.$scopedSlots.bottom !== void 0 ? h(Slide, {
        props: {
          collapsed: this.collapseBottom,
          fit: this.fitBottom,
          min: this.bottomMin
        },
        staticClass: 'sw-layout__around',
        scopedSlots: {
          default: this.$scopedSlots.bottom
        }
      }) : void 0
    ])
  }
}