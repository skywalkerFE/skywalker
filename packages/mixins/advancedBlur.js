
export default {
  props: {},
  data: () => ({}),
  watch: {},
  computed: {},
  methods: {
    advancedBlur(e) {
      let excluded = false
      let getRefs = refNames => {
        let getDoms = els => {
          els = Array.isArray(els) ? els : [els]
          return els.reduce((accumulator, el) => {
            accumulator.push(el && (el.$el || el))
            return accumulator
          }, [])
        }

        return refNames.reduce((accumulator, ref) => accumulator.concat(getDoms(this.$refs[ref])), [])
      }
      
      if (this.disabled) { return }
      if (this.excludedBlurRefs) {
        let refs = getRefs(this.excludedBlurRefs)

        refs.some(ref => {
          if (ref === void 0) { return false }
          excluded = ref.contains(e.target) || false
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
        let refs = getRefs(this.blurRefs)

        refs.some(ref => {
          if (ref === void 0) { return false }
          this.focused = ref.contains(e.target) || false
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
  