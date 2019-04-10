
export default {
  data: () => ({}),
  watch: {},
  computed: {},
  methods: {
    shuttle(_this) {
      let self = _this || this

      self.$children.forEach(child => {
        if (child.$refs[this.shuttleRef] !== void 0) {
          child.parent = this
        } else {
          this.shuttle(child)
        }
      })
    }
  },
  mounted() {
    this.shuttle()
  }
}
