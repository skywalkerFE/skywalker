
export default {
  props: {
    errorMessage: String,
    rules: Array
  },

  data() {
    return {
      isDirty: false,
      innerError: false,
      innerErrorMessage: void 0
    }
  },

  watch: {
    forceCheck(v) {
      if (this.rules === void 0) {
        return
      }
      this.isDirty = true
      this.validate(v)
    },
    value(v) {
      if (this.forceCheck !== void 0 || this.rules === void 0) {
        return
      }
      this.isDirty = true
      this.validate(v)
    }
  },

  computed: {
    validateValue() {
      return this.forceCheck === void 0 ? this.value : this.forceCheck
    },
    hasError() {
      return this.innerError === true
    },

    computedErrorMessage() {
      return this.errorMessage !== void 0
        ? this.errorMessage
        : this.innerErrorMessage
    }
  },

  mounted() {
    this.$on(`blur`, this.triggerValidation)
  },

  beforeDestroy() {
    this.$off(`blur`, this.triggerValidation)
  },

  methods: {
    resetValidation() {
      this.isDirty = false
      this.innerError = false
      this.innerErrorMessage = void 0
    },

    validate(val = this.validateValue) {
      if (!this.rules || this.rules.length === 0) {
        return
      }

      const update = (err, msg) => {
        if (this.innerError !== err) {
          this.innerError = err
        }

        const m = msg || void 0

        if (this.innerErrorMessage !== m) {
          this.innerErrorMessage = m
        }
        return err
      }

      return !this.rules.some(rule => {
        let res

        if (typeof rule === 'function') {
          res = rule(val)
        } else {
          return false
        }
        if (res === false || typeof res === 'string') {
          return update(true, res)
        } else {
          return update(false)
        }
      })
    },

    triggerValidation(force = true) {
      if (force === true || this.isDirty === false) {
        this.isDirty = true
        return this.validate(this.validateValue)
      }
    }
  }
}
