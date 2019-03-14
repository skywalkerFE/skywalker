import ValidateMixin from '../../../mixins/validate'

export default {
  name: 'swField',
  mixins: [ValidateMixin], // hasError,computedErrorMessage
  props: {
    required: Boolean,
    bordered: Boolean,
    disabled: Boolean,
    label: String
  },
  data: () => ({
    focused: false
  }),
  render(h) {
    return h('div', {
      staticClass: 'sw-field flex no-wrap items-center'
    }, [
      this.label !== void 0 ? h('div', {
        staticClass: 'sw-field__label flex no-wrap items-center'
      }, [
        h('div', {
          staticClass: 'sw-label flex no-wrap items-center'
        }, this.label),
        this.required ? h('div', {
          staticClass: 'sw-required flex no-wrap items-center'
        }, '*') : null
      ]) : null,

      h('div', {
        staticClass: 'sw-field__content flex no-wrap items-center sw-form',
        class: {
          border: this.bordered,
          focus: !this.hasError && this.focused,
          error: this.hasError
        },
        on: {
          click: () => {
            if (this.focus) { this.focus() }
          }
        }
      }, [
        this.$scopedSlots.before !== void 0 ? h('div', {
          staticClass: 'sw-field__before flex no-wrap items-center'
        }, this.$scopedSlots.before()) : null,
  
        this.getInner !== void 0 ? h('div', {
          staticClass: 'sw-field__inner flex no-wrap items-center'
        }, [this.getInner(h)]) : null,
  
        this.$scopedSlots.after !== void 0 ? h('div', {
          staticClass: 'sw-field__after flex no-wrap items-center'
        }, this.$scopedSlots.after()) : null,

        this.hasError ? h('div', {
          staticClass: 'sw-field__error flex no-wrap items-center'
        }, this.computedErrorMessage) : null
      ])
    ])
  }
}
  