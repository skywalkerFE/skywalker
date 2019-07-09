import Field from '../../field'

export default {
  name: 'swInput',
  mixins: [Field], // focused,disabled
  props: {
    value: String,
    placeholder: String,
    autocomplete: Boolean
  },
  data: () => ({}),
  computed: {},
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    getInner(h) {
      return [h('input', {
        ref: 'input',
        staticClass: 'sw-input margin-min',
        attrs: {
          autocomplete: this.autocomplete ? 'on' : 'off'
        },
        domProps: {
          value: this.value,
          placeholder: this.placeholder || '',
          disabled: this.disabled
        },
        on: {
          ...this.$listeners,
          blur: e => {
            this.$emit('blur', e.target.value)
          },
          input: e => {
            this.$emit('input', e.target.value)
          }
        }
      })]
    }
  }
}
  