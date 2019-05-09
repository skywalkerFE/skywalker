export default {
  name: 'swScrollArea',
  props: {
    x: Boolean,
    y: Boolean,
    width: String,
    height: String,
    stretch: Boolean
  },
  data: () => ({}),
  computed: {
    style() {
      return {
        'overflow-x': this.x ? 'auto' : 'hidden',
        'overflow-y': this.y ? 'auto' : 'hidden',
        'max-width': this.width || '100%',
        width: this.width || '100%',
        'max-height': this.height || '100%',
        height: this.stretch && (this.height || '100%')
      }
    }
  },
  methods: {},
  render(h) {
    return h('div', {
      staticClass: 'sw-scroll-area',
      style: this.style,
      on: this.$listeners
    }, this.$scopedSlots.default !== void 0 ? [this.$scopedSlots.default()] : void 0)
  }
}
  