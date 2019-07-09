import Slide from '../../slide'
import { isStringContain } from '../../../utils/is'

export default {
  name: 'swBasicItem',
  components: { Slide },
  props: {
    content: String,
    subContent: String,
    icon: String,
    disabled: Boolean,
    filled: Boolean,
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
    mask: Object | Boolean,
    ripple: Object | Boolean,
    sub: Array,
    active: Boolean,
    callback: Function,
    subFilter: String,
    subIndex: Number
  },
  data: () => ({
    innerActive: false,
    innerCollapsed: true,
    collapsedBefore: true,
    mouseover: false,
    hide: false
  }),
  methods: {
    subFilterChange(restore, remember) {
      const isSubContain = sub => {
        let contain = false
  
        contain = sub.some(x => {
          if (x.sub) {
            return isSubContain(x.sub)
          } else {
            return isStringContain(x.content, this.subFilter)
          }
        })
        return contain
      }

      if (this.sub === void 0) {
        this.hide = !isStringContain(this.content, this.subFilter)
      } else {
        if (restore) {
          this.innerCollapsed = this.collapsedBefore
          this.hide = false
          return
        }
        if (remember) {
          this.collapsedBefore = this.innerCollapsed
        }
        this.innerCollapsed = false
        this.hide = this.subIndex !== void 0 && !isSubContain(this.sub)
      }
    }
  },
  created() {
    if (this.collapsed !== void 0) {
      this.$watch('collapsed', v => {
        this.innerCollapsed = this.collapsedBefore = v === void 0 ? true : v
      }, { immediate: true })
      this.$watch('innerCollapsed', v => {
        this.$emit('update:collapsed', v)
      }, { immediate: true })
    }
    if (this.content !== void 0 && this.subFilter !== void 0) {
      this.$watch('subFilter', (v, ov) => {
        this.subFilterChange(v === '', ov === '')
      }, { immediate: true })
    }
    if (this.active !== void 0) {
      this.$watch('active', v => {
        this.innerActive = v
      }, { immediate: true })
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'sw-basic-item',
      attrs: {
        mutate: this.hide
      },
      class: {
        split: this.split && !this.innerCollapsed,
        hide: this.hide
      }
    }, [
      h('div', {
        staticClass: 'sw-basic-item__main',
        class: this.disabled ? 'disable' : {
          'color-primary': !this.filled && this.primary,
          'color-negative': !this.filled && this.negative,
          'color-positive': !this.filled && this.positive,
          'color-warning': !this.filled && this.warning,
          'bg-primary': this.filled && this.primary,
          'bg-negative': this.filled && this.negative,
          'bg-positive': this.filled && this.positive,
          'bg-warning': this.filled && this.warning,
          'bg-dark color-white': this.filled
        },
        style: this.disabled ? void 0 : {
          color: !this.filled && this.color,
          'background-color': this.filled && this.color
        }
      }, [
        h('sw-item', {
          staticClass: 'sw-basic-item__inner',
          props: {
            to: !this.callback && this.to || void 0,
            center: this.center,
            end: this.end,
            disabled: this.disabled,
            mask: this.mask,
            ripple: this.ripple,
            active: this.innerActive
          },
          class: {
            expand: !this.innerCollapsed
          },
          style: {
            'min-height': this.mini ? '36px' : '48px',
            'padding-left': `${this.indentLevel * 12}px`,
            cursor: !this.disabled && (this.to !== void 0 || this.callback !== void 0 || this.$scopedSlots.default || this.sub !== void 0) ? 'pointer' : void 0
          },
          on: this.disabled ? void 0 : {
            ...this.$listeners,
            click: () => {
              if (this.$scopedSlots.default || this.sub !== void 0) {
                this.innerCollapsed = !this.innerCollapsed
              }
              this.callback && this.callback(this)
              this.$emit('click')
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
  
            after: this.$scopedSlots.after !== void 0 ? this.$scopedSlots.after : this.$scopedSlots.default || this.sub !== void 0 ? () => [h('sw-icon', {
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
        })
      ]),
      this.$scopedSlots.default || this.sub !== void 0 ? h(Slide, {
        props: {
          collapsed: this.innerCollapsed
        },
        scopedSlots: {
          default: () => {
            let sub = this.sub !== void 0 ? this.sub.map((props, i) => {
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
                  color: props.color,
                  primary: props.primary,
                  negative: props.negative,
                  positive: props.positive,
                  warning: props.warning,
                  center: position ? props.center : this.center,
                  end: position ? props.end : this.end,
                  filled: props.filled !== void 0 ? props.filled : this.filled,
                  split: props.split !== void 0 ? props.split : this.split,
                  mini: props.mini !== void 0 ? props.mini : this.mini,
                  indentLevel: props.indentLevel !== void 0 ? props.indentLevel : this.indentLevel,
                  mask: props.mask !== void 0 ? props.mask : this.mask,
                  ripple: props.ripple !== void 0 ? props.ripple : this.ripple,
                  callback: props.callback !== void 0 ? props.callback : this.callback,
                  active: props.active,
                  subFilter: this.subFilter,
                  subIndex: i
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
  