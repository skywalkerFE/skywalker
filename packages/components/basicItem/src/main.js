import Vue from 'vue'
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
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    collapsed: {
      type: Boolean,
      default: true
    },
    to: String | Object,
    indentLevel: Number | String,
    mask: Object | Boolean,
    ripple: Object | Boolean,
    sub: Array,
    active: {
      type: Boolean,
      default: false
    },
    callback: Function,
    subFilter: String,
    filled: {
      type: Boolean,
      default: void 0
    },
    shadow: {
      type: Boolean,
      default: void 0
    },
    split: {
      type: Boolean,
      default: void 0
    },
    mini: {
      type: Boolean,
      default: void 0
    },
    center: {
      type: Boolean,
      default: void 0
    },
    end: {
      type: Boolean,
      default: void 0
    }
  },
  data: () => ({
    collapsedBefore: true,
    mouseover: false,
    hide: false,
    eventOrigin: false,
    eventHub: void 0
  }),
  computed: {
    hasBefore() {
      return this.$scopedSlots.before !== void 0 || this.icon !== void 0
    },
    hasContent() {
      return this.$scopedSlots.content !== void 0 || this.content !== void 0 || this.subContent !== void 0
    },
    hasSub() {
      return this.$scopedSlots.default !== void 0 || this.sub !== void 0
    },
    hasAction() {
      return !this.disabled && (this.to !== void 0 || this.callback !== void 0 || this.$scopedSlots.default || this.sub !== void 0)
    },
    innerCenter() {
      return this.center !== void 0 ? this.center : this.rootParams.center
    },
    innerEnd() {
      return this.end !== void 0 ? this.end : this.rootParams.end
    },
    innerFilled() {
      return this.filled !== void 0 ? this.filled : this.rootParams.filled
    },
    innerSplit() {
      return this.split !== void 0 ? this.split : this.rootParams.split
    },
    innerMini() {
      return this.mini !== void 0 ? this.mini : this.rootParams.mini
    },
    innerShadow() {
      return this.shadow !== void 0 ? this.shadow : this.rootParams.shadow
    },
    innerMask() {
      return this.mask !== void 0 ? this.mask : this.rootParams.mask
    },
    innerRipple() {
      return this.ripple !== void 0 ? this.ripple : this.rootParams.ripple
    },
    innerIndentLevel() {
      return this.indentLevel || this.rootParams.indentLevel
    },
    innerCallback() {
      return this.callback || this.rootParams.callback
    },
    innerSubFilter() {
      return this.root === void 0 ? this.subFilter : this.root.subFilter
    },
    innerEventHub() {
      return this.eventHub || this.root.eventHub
    },
    rootParams() {
      return this.root || {}
    },
    minHeight() {
      return this.innerMini ? '36px' : '48px'
    }
  },
  inject: {
    root: {
      default() {
        return void 0
      }
    }
  },
  provide() {
    return this.root === void 0 ? {
      root: this
    } : void 0
  },
  methods: {
    subFilterChange(restore, remember) {
      const isSubContain = sub => {
        let contain = false
  
        contain = sub.some(x => {
          if (x.sub) {
            return isSubContain(x.sub)
          } else {
            return isStringContain(x.content, this.innerSubFilter)
          }
        })
        return contain
      }

      if (this.sub === void 0) {
        this.hide = !isStringContain(this.content, this.innerSubFilter)
      } else {
        if (restore) {
          this.$emit('update:collapsed', this.collapsedBefore)
          this.hide = false
          return
        }
        if (remember) {
          this.collapsedBefore = this.collapsed
        }
        this.$emit('update:collapsed', false)
        this.hide = this.root !== void 0 && !isSubContain(this.sub)
      }
    },
    initEventHub() {
      if (this.root === void 0) {
        this.eventHub = new Vue()
      }
      this.innerEventHub.$on('change:active', () => {
        if (!this.eventOrigin) {
          this.$emit('update:active', false)
        }
        this.eventOrigin = false
      })
    },
    emitActive() {
      this.eventOrigin = true
      this.$emit('update:active', true)
      this.innerEventHub.$emit('change:active')
    }
  },
  created() {
    this.initEventHub()
    if (this.content !== void 0 && this.innerSubFilter !== void 0) {
      this.$watch('innerSubFilter', (v, ov) => {
        if (v !== '' || ov !== void 0) {
          this.subFilterChange(v === '', ov === '')
        }
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
        split: this.innerSplit && !this.collapsed,
        hide: this.hide
      }
    }, [
      h('div', {
        staticClass: 'sw-basic-item__main',
        class: this.disabled ? 'disable' : this.innerFilled ? {
          'bg-primary': this.primary,
          'bg-negative': this.negative,
          'bg-positive': this.positive,
          'bg-warning': this.warning,
          'bg-dark color-white': true
        } : {
          'color-primary': this.primary,
          'color-negative': this.negative,
          'color-positive': this.positive,
          'color-warning': this.warning
        },
        style: this.disabled ? void 0 : this.innerFilled ? {
          'background-color': this.color
        } : {
          color: this.color
        }
      }, [
        h('sw-item', {
          staticClass: 'sw-basic-item__inner',
          props: {
            to: this.innerCallback ? void 0 : this.to,
            center: this.innerCenter,
            end: this.innerEnd,
            disabled: this.disabled,
            mask: this.innerMask,
            ripple: this.innerRipple,
            active: this.active
          },
          class: {
            expand: !this.collapsed
          },
          style: {
            'min-height': this.minHeight,
            'padding-left': `${this.innerIndentLevel * 12}px`,
            cursor: this.hasAction ? 'pointer' : void 0
          },
          on: this.disabled ? void 0 : {
            ...this.$listeners,
            click: () => {
              if (this.hasSub) {
                this.$emit('update:collapsed', !this.collapsed)
              } else {
                this.emitActive()
              }
              this.innerCallback && this.innerCallback(this)
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
            before: () => [h('div', {
              staticClass: 'flex items-center',
              class: {
                'space-right': this.hasBefore
              }
            }, this.$scopedSlots.before !== void 0 ? [this.$scopedSlots.before()]
              : this.icon !== void 0 ? [h('sw-icon', {
                staticClass: 'sw-basic-item__icon',
                props: {
                  name: this.icon
                }
              })] : void 0)],
  
            default: () => [h('div', {
              staticClass: 'sw-basic-item__content flex items-center',
              class: {
                'space-right': this.hasContent
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
  
            after: () => [h('div', {
              staticClass: 'flex items-center'
            }, this.$scopedSlots.after !== void 0 ? [this.$scopedSlots.after()]
              : this.hasSub ? [h('sw-icon', {
                staticClass: 'sw-basic-item__expansion color-grey',
                style: {
                  transform: !this.collapsed ? 'rotate(180deg)' : void 0,
                  color: this.mouseover ? 'currentColor' : void 0
                },
                props: {
                  name: 'keyboard_arrow_down'
                }
              })] : void 0)]
          }
        })
      ]),
      this.hasSub ? h(Slide, {
        props: {
          collapsed: this.collapsed,
          shadow: this.innerShadow
        },
        scopedSlots: {
          default: () => {
            let sub = this.sub !== void 0 ? this.sub.map(props => h('sw-basic-item', {
              props: props,
              on: {
                'update:collapsed': v => {
                  props.collapsed = v
                  this.$forceUpdate()
                },
                'update:active': v => {
                  props.active = v
                  this.$forceUpdate()
                }
              }
            })) : []

            sub.unshift(this.$scopedSlots.default ? this.$scopedSlots.default() : void 0)
            return sub
          }
        }
      }) : void 0
    ])
  }
}