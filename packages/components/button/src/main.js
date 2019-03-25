import Item from '../../item'

export default {
  name: 'swButton',
  components: { Item },
  props: {
    underlined: Boolean,
    bordered: Boolean,
    filled: Boolean,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    round: Boolean,
    shadow: Boolean,
    noHover: Boolean,
    to: String | Object
  },
  data: () => ({
    mouseover: false
  }),
  render(h) {
    return h('button', {
      staticClass: 'sw-button flex no-wrap items-center',
      style: {
        color: !this.disabled && !this.filled && this.color || void 0,
        'border-color': !this.disabled && !this.filled && this.color || void 0,
        'background-color': !this.disabled && this.filled && this.color || void 0
      },
      class: {
        underline: this.underlined,
        border: this.bordered,
        fill: this.filled,
        primary: this.primary,
        negative: this.negative,
        positive: this.positive,
        warning: this.warning,
        grey: this.disabled,
        round: this.round && !this.underlined,
        'common-shadow': this.shadow && (this.bordered || this.filled)
      },
      on: this.disabled ? void 0 : {
        ...this.$listeners,
        mouseover: e => {
          this.mouseover = true
          this.$emit('mouseover', e)
        },
        mouseout: e => {
          this.mouseover = false
          this.$emit('mouseout', e)
        }
      }
    }, [
      h('sw-item', {
        staticClass: 'flex-auto',
        class: {
          'round-slot': this.$scopedSlots.round
        },
        style: {
          'z-index': 1,
          cursor: 'pointer',
        },
        props: {
          to: this.to
        },
        scopedSlots: this.$scopedSlots.round !== void 0
          ? {
            default: () => [h('div', {
              staticClass: 'flex no-wrap items-center margin-min sw-button__inner flex-auto'
            }, [this.$scopedSlots.round()])]
          } : {
            before: this.$scopedSlots.before !== void 0
              ? () => [h('div', {
                staticClass: 'flex no-wrap items-center margin-min sw-button__before'
              }, [this.$scopedSlots.before()])] : void 0,
  
            default: this.$scopedSlots.default !== void 0
              ? () => [h('div', {
                staticClass: 'flex no-wrap items-center margin-min sw-button__inner flex-auto'
              }, [this.$scopedSlots.default()])] : void 0,
  
            after: this.$scopedSlots.after !== void 0
              ? () => [h('div', {
                staticClass: 'flex no-wrap items-center margin-min sw-button__after'
              }, [this.$scopedSlots.after()])] : void 0
          }
      }),
      h('div', {
        staticClass: 'sw-mask',
        class: {
          invisible: !this.disabled && (!this.mouseover || this.noHover)
        },
        style: {
          'z-index': this.disabled ? 9 : 0,
          'background-color': this.disabled ? 'transparent' : 'currentColor'
        }
      })
    ])
  }
}
  