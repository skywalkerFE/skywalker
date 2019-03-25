import Field from '../../field'
import ScorllArea from '../../scrollArea'
import { isDeepEqual, isStringContain, isObject } from '../../../utils/is'
import { deduplicate } from '../../../utils/deduplicate'

export default {
  name: 'swSelect',
  mixins: [Field], // focused,disabled
  components: {
    ScorllArea
  },
  props: {
    multiple: Boolean,
    value: String | Array,
    options: Array,
    filter: Boolean,
    placeholder: String,
    optionsHeight: {
      type: String,
      default: '200px'
    },
    selectedFilled: Boolean
  },
  data: () => ({
    blurType: 'reverse',
    filterValue: ''
  }),
  computed: {
    excludedBlurRefs() {
      return this.filter ? ['input', 'selected', 'selectOptions'] : ['selected', 'selectOptions']
    },
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
      return this.options.reduce((a, c) => {
        let filterArr = this.filterValue.replace(/\s+/g, '').split('')

        if (isStringContain(this.getName(c), filterArr)) { a.push(c) }
        return a
      }, []) || []
    }
  },
  watch: {
    options() {
      this.innerValue = this.findOptions(deduplicate(this.value))
    }
  },
  methods: {
    focus() {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    blur() {
      this.$refs.input.blur()
    },
    clearFilter() {
      this.filterValue = ''
    },
    triggerBlur(e) {
      this.focused = false
      this.$emit(`blur`, e)
    },
    getInner(h) {
      let getOptions = h => {
        if (this.innerOptions.length) {
          return this.innerOptions.map(option => h('sw-item', {
            class: {
              selected: this.checkSelected(option)
            },
            nativeOn: {
              click: e => {
                this.innerValue = this.formatValue(option)
                this.clearFilter()
                if (!this.multiple) {
                  this.triggerBlur(e)
                } else {
                  this.focus()
                }
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

      let getSelected = h => this.innerValue.map(x => h('sw-item', {
        staticClass: 'margin-min',
        ref: 'selected',
        refInFor: true,
        props: {
          formStyle: true,
          bordered: this.bordered,
          filled: this.selectedFilled
        },
        scopedSlots: {
          default: () => [h('div', {
            style: {
              padding: '0 3px'
            }
          }, String(this.getName(x)))],
          after: () => [h('sw-icon', {
            class: {
              'hover-color-primary': true,
              'color-grey': true
            },
            style: {
              'border-radius': '50%'
            },
            props: {
              name: this.selectedFilled ? 'cancel' : 'clear',
              size: '15px'
            },
            nativeOn: {
              click: () => {
                this.innerValue = this.formatValue(x, 'remove')
              }
            }
          })]
        }
      }))

      return [h('sw-item', {
        staticClass: 'flex-auto',
        props: {
          wrap: true,
          hideDefault: this.innerValue.length > 0 && (!this.focused || !this.filter)
        },
        scopedSlots: {
          before: this.innerValue.length > 0 ? () => getSelected(h) : void 0,
          default: () => [h('input', {
            ref: 'input',
            staticClass: 'sw-input margin-min',
            style: {
              cursor: !this.filter ? 'pointer' : void 0
            },
            domProps: {
              value: this.filterValue,
              placeholder: this.placeholder || '',
              disabled: !this.filter
            },
            on: {
              ...this.$listeners,
              input: e => {
                this.filterValue = e.target.value
              }
            }
          })]
        }
      }), this.focused ? h('div', {
        ref: 'selectOptions',
        staticClass: 'sw-select__options common-shadow',
        style: {
          'max-height': this.optionsHeight
        }
      }, [h('sw-scroll-area', {
        props: {
          y: true,
          height: this.optionsHeight
        },
        scopedSlots: {
          default: () => getOptions(h)
        }
      })
      ]) : void 0]
    },
    getAfter(h) {
      return [h('sw-icon', {
        props: {
          name: this.focused ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
          size: '20px'
        },
        staticClass: 'color-grey hover-color-primary'
      })]
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
  