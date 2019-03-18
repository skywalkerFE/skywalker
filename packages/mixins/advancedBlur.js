
export default {
  props: {},
  data: () => ({}),
  watch: {},
  computed: {},
  methods: {
    advancedBlur(e) {
      let excluded = false

      if (this.disabled) { return }
      if (this.excludedBlurRefs) {
        this.excludedBlurRefs.some(ref => {
          if (this.$refs[ref] === void 0) { return false }
          excluded = this.$refs[ref].contains(e.target) || false
          return excluded
        })
      }
      if (excluded) {
        this.focused = true
        return
      }
      let focusedBefore = this.focused

      if (this.blurType === 'reverse' && focusedBefore) {
        this.focused = !focusedBefore
      } else {
        this.blurRefs.some(ref => {
          if (this.$refs[ref] === void 0) { return false }
          this.focused = this.$refs[ref].contains(e.target) || false
          return this.focused
        })
      }
      if (!this.focused && focusedBefore) { this.$emit(`blur`, e) }
    }
  },
  mounted() {
    if (this.blurRefs) { document.addEventListener('mouseup', this.advancedBlur, false) }
  },
  beforeDestroy() {
    if (this.blurRefs) { document.removeEventListener('mouseup', this.advancedBlur, false) }
  },
}
  