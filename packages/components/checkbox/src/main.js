import Field from '../../field'
import { isDeepEqual, isObject } from '../../../utils/is'
import { deduplicate } from '../../../utils/deduplicate'

export default {
  name: 'swCheckbox',
  mixins: [Field], // focused,disabled
  props: {
    multiple: Boolean,
    value: String | Array,
    options: Array
  },
  data: () => ({}),
  computed: {
    innerValue: {
      get() {
        let value = this.findOptions(deduplicate(this.value))

        return value
      },
      set(val) {
        this.$emit(
          'input',
          deduplicate(val.map(x => this.getValue(x)))
        )
      }
    },
    innerOptions() {
      return this.options
    }
  },
  watch: {
    options() {
      this.innerValue = this.findOptions(deduplicate(this.value))
    }
  },
  methods: {
    getInner(h) {
      let getOptions = h => {
        if (this.innerOptions.length) {
          return this.innerOptions.map(option => h('sw-item', {
            class: {
              selected: this.checkSelected(option)
            },
            nativeOn: {
              click: () => {
                this.innerValue = this.formatValue(option)
              }
            },
            scopedSlots: {
              default: () => [h('div', {
                staticClass: 'sw-select__option'
              }, String(this.getName(option)))]
            }
          }))
        } else {
          return [h('sw-item', {
            scopedSlots: {
              default: () => [h('div', {
                staticClass: 'sw-select__option no-options'
              }, 'no options')]
            }
          })]
        }
      }

      return [h('sw-item', {
        staticClass: 'flex-auto',
        props: {
          wrap: true
        },
        scopedSlots: {
          default: () => []
        }
      }), h('div', {
        ref: 'selectOptions',
        staticClass: 'sw-select__options common-shadow'
      }, [h('sw-scroll-area', {
        scopedSlots: {
          default: () => getOptions(h)
        }
      })
      ])]
    },
    formatValue(option, ope) {
      let duplicated = false
      let res = []

      if (this.multiple) {
        this.innerValue.forEach(x => {
          if (this.realEqual(x, option)) {
            duplicated = true
          } else {
            res.push(x)
          }
        })
      } else if (ope === 'remove') { duplicated = true }
      return duplicated ? res : res.concat(option)
    },
    checkSelected(option) {
      let selected = false

      this.innerValue.forEach(x => {
        if (this.realEqual(x, option)) {
          selected = true
        }
      })
      return selected
    },
    findOptions(value) {
      let res = []

      value.forEach(y => {
        let options = []
    
        this.options.forEach(x => {
          if (isDeepEqual(this.getValue(x), y)) { options.push(x) }
        })

        if (options.length > 0) { res = res.concat(options) }
      })
      return res
    },
    getValue(option) {
      return isObject(option) && option.hasOwnProperty('value')
        ? option.value : option
    },
    getName(option) {
      return isObject(option) && option.hasOwnProperty('name')
        ? option.name : option
    },
    realEqual(a, b, fn = this.getValue) {
      /* eslint-disable no-self-compare */
      return isDeepEqual(fn(a), fn(b))
    }
  }
}