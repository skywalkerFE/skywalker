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
          [`${this.color}`]: this.color,
          [cls]: true
        }
      },
  
      content() {
        return this.name || ' '
      },
  
      style() {
        if (this.size) {
          return { fontSize: this.size }
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
  