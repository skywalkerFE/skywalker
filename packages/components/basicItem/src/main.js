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
    colorContent: Boolean,
    collapsed: {
      type: Boolean,
      default: true
    },
    split: Boolean,
    mini: Boolean,
    hover: Boolean,
    to: String | Object,
    indentLevel: Number | String,
    center: Boolean,
    end: Boolean,
    min: Number | String
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
      on: {
        ...this.$listeners
      }
    }, [
      h('div', {
        staticClass: 'sw-basic-item__main',
        class: {
          disable: this.disabled
        },
        style: {
          'padding-left': `${this.indentLevel * 12}px`,
          cursor: !this.disabled && (this.to !== void 0 || this.$scopedSlots.default) ? 'pointer' : void 0
        },
        on: this.disabled ? void 0 : {
          ...this.$listeners,
          click: () => {
            if (this.$scopedSlots.default) { this.innerCollapsed = !this.innerCollapsed }
          },
          mouseover: () => {
            this.mouseover = true
          },
          mouseout: () => {
            this.mouseover = false
          }
        }
      }, [
        h('sw-item', {
          staticClass: 'sw-basic-item__inner',
          props: {
            to: this.to,
            center: this.center,
            end: this.end
          },
          scopedSlots: {
            before: this.$scopedSlots.before !== void 0 ? this.$scopedSlots.before
              : this.icon !== void 0 ? () => [h('sw-icon', {
                staticClass: 'sw-basic-item__icon',
                props: {
                  name: this.icon,
                  color: !this.disabled && this.color,
                  primary: !this.disabled && this.primary,
                  negative: !this.disabled && this.negative,
                  positive: !this.disabled && this.positive,
                  warning: !this.disabled && this.warning
                }
              })] : void 0,
  
            default: () => [h('div', {
              staticClass: 'sw-basic-item__content flex items-center',
              class: {
                'color-primary': !this.disabled && this.colorContent && this.primary,
                'color-negative': !this.disabled && this.colorContent && this.negative,
                'color-positive': !this.disabled && this.colorContent && this.positive,
                'color-warning': !this.disabled && this.colorContent && this.warning,
                'space-left': this.$scopedSlots.before !== void 0 || this.icon !== void 0,
                'space-right': (this.$scopedSlots.after !== void 0 || this.$scopedSlots.default !== void 0) && (this.$scopedSlots.content !== void 0 || this.content !== void 0 || this.subContent !== void 0)
              },
              style: {
                color: !this.disabled && this.colorContent && this.color,
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
  
            after: this.$scopedSlots.after !== void 0 ? this.$scopedSlots.after
              : this.$scopedSlots.default ? () => [h('sw-icon', {
                staticClass: 'sw-basic-item__expansion color-grey',
                style: {
                  transform: !this.innerCollapsed ? 'rotate(180deg)' : void 0,
                  color: this.mouseover ? 'currentColor' : void 0
                },
                props: {
                  name: 'keyboard_arrow_down'
                }
              })] : void 0
          }
        }),
        h('div', {
          staticClass: 'sw-mask',
          class: {
            invisible: !this.hover || !this.disabled && !this.mouseover,
            'color-primary': this.primary,
            'color-negative': this.negative,
            'color-positive': this.positive,
            'color-warning': this.warning
          },
          style: {
            color: this.color,
            'z-index': this.disabled ? 9 : 0,
            'background-color': this.disabled ? 'transparent' : 'currentColor'
          }
        })
      ]),
      this.$scopedSlots.default ? h(Slide, {
        props: {
          collapsed: this.innerCollapsed,
          min: this.min
        },
        scopedSlots: {
          default: this.$scopedSlots.default
        }
      }) : void 0
    ])
  }
}
  