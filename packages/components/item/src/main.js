export default {
  name: 'swItem',
  props: {
    wrap: Boolean,
    hideBefore: Boolean,
    hideDefault: Boolean,
    hideAfter: Boolean,
    to: String | Object,
    center: Boolean,
    end: Boolean
  },
  data: () => ({}),
  computed: {
    style() {
      return this.to ? { cursor: 'pointer' } : void 0
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'sw-item flex items-center',
      class: {
        'no-wrap': !this.wrap
      },
      style: this.style,
      on: {
        ...this.$listeners,
        click: e => {
          if (this.to) {
            this.$router.push(this.to)
          }
          this.$emit('click', e)
        }
      }
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
  