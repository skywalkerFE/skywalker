export default {
  name: 'swScrollArea',
  props: {
    x: Boolean,
    y: Boolean,
    width: String,
    height: String
  },
  data: () => ({}),
  computed: {
    style() {
      return {
        'overflow-x': this.x ? 'auto' : void 0,
        'overflow-y': this.y ? 'auto' : void 0,
        width: this.width || '100%',
        'max-height': this.height || '100%'
      }
    }
  },
  methods: {},
  render(h) {
    return h('div', {
      staticClass: 'sw-scroll-area',
      style: this.style,
      on: this.$listeners
    }, this.$scopedSlots.default !== void 0 ? this.$scopedSlots.default() : void 0)
  }
}
  