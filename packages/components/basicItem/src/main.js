import Slide from '../../slide'

export default {
  name: 'swBasicItem',
  components: { Slide },
  props: {
    content: String,
    subContent: String,
    icon: String,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    collapsed: {
      type: Boolean,
      default: true
    },
    split: Boolean,
    mini: Boolean,
    to: String | Object,
    indentLevel: Number | String,
    center: Boolean,
    end: Boolean,
    min: Number | String,
    mask: Object | Boolean,
    ripple: Object | Boolean,
    sub: Array
  },
  data: () => ({
    innerCollapsed: true,
    mouseover: false
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
      staticClass: 'sw-basic-item',
      class: {
        split: this.split && !this.innerCollapsed
      },
      on: this.disabled ? void 0 : {
        ...this.$listeners
      }
    }, [
      h('div', {
        staticClass: 'sw-basic-item__main',
        class: {
          'color-primary': !this.disabled && this.primary,
          'color-negative': !this.disabled && this.negative,
          'color-positive': !this.disabled && this.positive,
          'color-warning': !this.disabled && this.warning,
          disable: this.disabled
        },
        style: {
          color: !this.disabled && this.color
        }
      }, [
        h('sw-item', {
          staticClass: 'sw-basic-item__inner',
          props: {
            to: this.to,
            center: this.center,
            end: this.end,
            disabled: this.disabled,
            mask: this.mask,
            ripple: this.ripple
          },
          class: {
            expand: !this.innerCollapsed
          },
          style: {
            'padding-left': `${this.indentLevel * 12}px`,
            cursor: !this.disabled && (this.to !== void 0 || this.$scopedSlots.default || this.sub !== void 0) ? 'pointer' : void 0
          },
          on: this.disabled ? void 0 : {
            ...this.$listeners,
            click: () => {
              if (this.$scopedSlots.default || this.sub !== void 0) { this.innerCollapsed = !this.innerCollapsed }
            },
            mouseover: () => {
              this.mouseover = true
            },
            mouseout: () => {
              this.mouseover = false
            }
          },
          scopedSlots: {
            before: this.$scopedSlots.before !== void 0 ? this.$scopedSlots.before
              : this.icon !== void 0 ? () => [h('sw-icon', {
                staticClass: 'sw-basic-item__icon',
                props: {
                  name: this.icon
                }
              })] : void 0,
  
            default: () => [h('div', {
              staticClass: 'sw-basic-item__content flex items-center',
              class: {
                'space-left': this.$scopedSlots.before !== void 0 || this.icon !== void 0,
                'space-right': (this.$scopedSlots.after !== void 0 || this.$scopedSlots.default !== void 0 || this.sub !== void 0) && (this.$scopedSlots.content !== void 0 || this.content !== void 0 || this.subContent !== void 0)
              },
              style: {
                'min-height': this.mini ? '36px' : '48px'
              }
            }, this.$scopedSlots.content !== void 0 ? [this.$scopedSlots.content()] : [
              h('div', {
                staticClass: 'default-content'
              }, [
                this.content !== void 0 ? h('div', {
                  staticClass: 'sw-basic-item__label'
                }, this.content) : void 0,
                this.subContent !== void 0 ? h('div', {
                  staticClass: 'sw-basic-item__sublabel'
                }, this.subContent) : void 0
              ])
            ]
            )],
  
            after: this.$scopedSlots.default || this.sub !== void 0 ? () => [h('sw-icon', {
              staticClass: 'sw-basic-item__expansion color-grey',
              style: {
                transform: !this.innerCollapsed ? 'rotate(180deg)' : void 0,
                color: this.mouseover ? 'currentColor' : void 0
              },
              props: {
                name: 'keyboard_arrow_down'
              }
            })] : this.$scopedSlots.after !== void 0 ? this.$scopedSlots.after
              : void 0
          }
        })
      ]),
      this.$scopedSlots.default || this.sub !== void 0 ? h(Slide, {
        props: {
          collapsed: this.innerCollapsed,
          min: this.min
        },
        scopedSlots: {
          default: () => {
            let sub = this.sub !== void 0 ? this.sub.map(props => {
              let color = !!props.color || !!props.primary || !!props.negative || !!props.positive || !!props.warning || false
              let position = !!props.center || !!props.end || false

              return h('sw-basic-item', {
                props: {
                  content: props.content,
                  subContent: props.subContent,
                  icon: props.icon,
                  disabled: props.disabled,
                  collapsed: props.collapsed,
                  to: props.to,
                  sub: props.sub,
                  color: color ? props.color : this.color,
                  primary: color ? props.primary : this.primary,
                  negative: color ? props.negative : this.negative,
                  positive: color ? props.positive : this.positive,
                  warning: color ? props.warning : this.warning,
                  center: position ? props.center : this.center,
                  end: position ? props.end : this.end,
                  split: props.split || this.split,
                  mini: props.mini || this.mini,
                  indentLevel: props.indentLevel || this.indentLevel,
                  min: props.min || this.min,
                  mask: props.mask || this.mask,
                  ripple: props.ripple || this.ripple
                }
              })
            }) : []

            sub.unshift(this.$scopedSlots.default ? this.$scopedSlots.default() : void 0)
            return sub
          }
        }
      }) : void 0
    ])
  }
}
  