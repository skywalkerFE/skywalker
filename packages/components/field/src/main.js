import ValidateMixin from '../../../mixins/validate'
import AdvancedBlurMixin from '../../../mixins/advancedBlur'
import Item from '../../item'

export default {
  name: 'swField',
  mixins: [ValidateMixin, AdvancedBlurMixin], // hasError,computedErrorMessage
  components: { Item },
  props: {
    required: Boolean,
    underlined: Boolean,
    bordered: Boolean,
    filled: Boolean,
    disabled: Boolean,
    mini: Boolean,
    label: String,
    forceCheck: String | Object,
    spaceAround: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    focused: false
  }),
  computed: {
    blurRefs() {
      return ['fieldContent']
    }
  },
  watch: {
    focused() {
      if (this.focused && this.focus) { this.focus() }
      if (!this.focused && this.blur) { this.blur() }
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'sw-field flex no-wrap items-center',
      class: {
        disable: this.disabled,
        'space-around': this.spaceAround
      }
    }, [
      this.label !== void 0 ? h('div', {
        staticClass: 'sw-field__label flex no-wrap items-center'
      }, [h('div', {
        staticClass: 'sw-label flex no-wrap items-center',
        class: {
          required: this.required
        }
      }, this.label)
      ]) : void 0,

      h('div', {
        ref: 'fieldContent',
        staticClass: 'sw-field__content flex no-wrap items-center sw-form',
        class: {
          underline: this.underlined,
          border: this.bordered,
          fill: this.filled,
          focus: !this.hasError && this.focused,
          error: this.hasError,
          'padding-min': !this.mini,
          'inner-pointer': this.innerPointer
        }
      }, [
        this.disabled ? h('div', {
          staticClass: 'sw-field__disabled'
        }) : void 0,

        h('sw-item', {
          staticClass: 'flex-auto',
          scopedSlots: {
            before: this.$scopedSlots.before !== void 0
              ? () => [h('div', {
                staticClass: 'flex no-wrap items-center margin-min'
              }, [this.$scopedSlots.before()])] : void 0,

            default: this.$scopedSlots.default !== void 0 || this.getInner !== void 0
              ? () => [this.getInner !== void 0 ? this.getInner(h) : void 0, this.$scopedSlots.default !== void 0 && this.getInner === void 0 ? this.$scopedSlots.default() : void 0] : void 0,

            after: this.$scopedSlots.after !== void 0 || this.getAfter !== void 0
              ? () => [h('div', {
                staticClass: 'flex no-wrap items-center margin-min'
              }, [this.getAfter !== void 0 ? this.getAfter(h) : void 0, this.$scopedSlots.after !== void 0 && this.getAfter === void 0 ? this.$scopedSlots.after() : void 0])] : void 0
          }
        }),

        this.hasError ? h('div', {
          staticClass: 'sw-field__error flex no-wrap items-center'
        }, this.computedErrorMessage) : void 0
      ])
    ])
  }
}
  