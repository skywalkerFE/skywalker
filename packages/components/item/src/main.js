export default {
  name: 'swItem',
  props: {
    wrap: Boolean,
    hideBefore: Boolean,
    hideDefault: Boolean,
    hideAfter: Boolean,
    to: String | Object,
    center: Boolean,
    end: Boolean,
    disabled: Boolean,
    mask: Object | Boolean,
    ripple: Object | Boolean,
    active: {
      required: false
    }
  },
  data: () => ({}),
  render(h) {
    return h(`${this.to !== void 0 ? 'router-link' : 'div'}`, {
      staticClass: 'sw-item flex items-center',
      class: {
        'no-wrap': !this.wrap,
        active: this.active,
        disable: this.disabled
      },
      on: this.disabled ? void 0 : {
        ...this.$listeners
      },
      props: {
        to: this.to
      },
      directives: (this.to !== void 0 || this.active !== void 0 || this.mask !== void 0 ? [
        {
          name: 'mask',
          value: {
            disabled: this.mask !== void 0 && this.mask.disabled || this.mask === void 0 && (this.to !== void 0 || this.active !== void 0),
            color: this.mask !== void 0 && this.mask.color,
            stay: this.mask !== void 0 && this.mask.stay
          }
        },
      ] : []).concat(this.ripple !== void 0 ? [
        {
          name: 'ripple',
          value: {
            disabled: this.ripple !== void 0 && this.ripple.disabled,
            color: this.ripple !== void 0 && this.ripple.color,
            center: this.ripple !== void 0 && this.ripple.center
          }
        }
      ] : [])
    }, [
      h('div', {
        staticClass: 'sw-item__content flex items-center',
        class: {
          'no-wrap': !this.wrap
        }
      }, [

        this.$scopedSlots.before !== void 0 ? h('div', {
          staticClass: 'sw-item__before flex items-center',
          class: {
            hide: this.hideBefore,
            'flex-auto': this.hideDefault,
            'no-wrap': !this.wrap
          }
        }, [this.$scopedSlots.before()]) : void 0,
  
        this.$scopedSlots.default !== void 0 ? h('div', {
          staticClass: 'sw-item__inner flex items-center items-end',
          class: {
            hide: this.hideDefault,
            'no-wrap': !this.wrap,
            'justify-center': this.center,
            'justify-end': this.end

          }
        }, [this.$scopedSlots.default()]) : void 0,
  
        this.$scopedSlots.after !== void 0 ? h('div', {
          staticClass: 'sw-item__after flex items-center',
          class: {
            hide: this.hideAfter,
            'no-wrap': !this.wrap
          }
        }, [this.$scopedSlots.after()]) : void 0
      ])
    ])
  }
}
  