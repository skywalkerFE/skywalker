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
    active: Boolean,
    mask: Object | Boolean,
    ripple: Object | Boolean
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
        ...this.$listeners,
        click: () => {
          this.$emit('click')
        }
      },
      props: {
        to: this.to
      },
      directives: (this.to !== void 0 || this.active !== void 0 || this.mask ? [
        {
          name: 'mask',
          value: this.mask ? {
            disabled: this.mask.disabled,
            color: this.mask.color,
            stay: this.mask.stay
          } : { disabled: true }
        },
      ] : []).concat(this.ripple ? [
        {
          name: 'ripple',
          value: {
            disabled: this.ripple.disabled,
            color: this.ripple.color,
            center: this.ripple.center
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
          staticClass: 'sw-item__inner flex items-center',
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
  