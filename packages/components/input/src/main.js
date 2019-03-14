import Field from '../../field'

export default {
  name: 'swInput',
  mixins: [Field], // focused
  props: {
    value: String,
    validation: Object
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
      let self = this
  
      return h('input', {
        ref: 'input',
        staticClass: 'sw-input',
        domProps: {
          value: self.value
        },
        on: {
          ...this.$listeners,
          focus: e => {
            if (this.disabled === false && this.focused === false) {
              this.focused = true
            }
            this.$emit('focus', e)
          },
          blur: e => {
            if (this.focused === true) {
              this.focused = false
            }
            this.$emit('blur', e)
          },
          input: e => {
            self.$emit('input', e.target.value)
          }
        }
      })
    }
  }
}
  