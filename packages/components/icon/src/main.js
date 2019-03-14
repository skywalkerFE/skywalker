export default {
  name: 'swIcon',
  
  props: {
    name: String,
    color: String,
    size: String
  },
  
  computed: {
    classes() {
      let cls
      const icon = this.name
  
      if (!icon) {
        return
      } else {
        cls = 'material-icons'
      }
  
      return {
        [cls]: true
      }
    },
  
    content() {
      return this.name || ' '
    },
  
    style() {
      return {
        fontSize: this.size || void 0,
        color: this.color || void 0
      }
    }
  },
  
  render(h) {
    return h('i', {
      staticClass: 'sw-icon',
      class: this.classes,
      style: this.style,
      attrs: { 'aria-hidden': true },
      on: this.$listeners
    }, [
      this.content,
      this.$slots.default
    ])
  }
}
  