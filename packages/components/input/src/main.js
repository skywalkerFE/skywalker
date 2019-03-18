import Field from '../../field'

export default {
  name: 'swInput',
  mixins: [Field], // focused,disabled
  props: {
    value: String,
    placeholder: String
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
      return h('input', {
        ref: 'input',
        staticClass: 'sw-input margin-min',
        domProps: {
          value: this.value,
          placeholder: this.placeholder,
          disabled: this.disabled
        },
        on: {
          ...this.$listeners,
          input: e => {
            this.$emit('input', e.target.value)
          }
        }
      })
    }
  }
}
  