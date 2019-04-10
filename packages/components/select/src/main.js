import Field from '../../field'
import ScorllArea from '../../scrollArea'
import { isDeepEqual, isStringContain, isObject } from '../../../utils/is'

// import { deduplicate } from '../../../utils/deduplicate'

export default {
  name: 'swSelect',
  mixins: [Field], // focused,disabled
  components: {
    ScorllArea
  },
  props: {
    multiple: Boolean,
    value: {
      required: true
    },
    options: Array,
    filter: Boolean,
    placeholder: String,
    optionsHeight: {
      type: String,
      default: '200px'
    },
    selectedStyle: String
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
        return this.getExactValues(this.value)
      },
      set(val) {
        this.$emit(
          'input',
          val
        )
      }
    },
    innerOptions() {
      return this.options.reduce((a, c) => {
        let filterArr = this.filterValue.replace(/\s+/g, '').split('')

        if (isStringContain(this.getName(c), filterArr)) {
          a.push(c)
        }
        return a
      }, []) || []
    }
  },
  watch: {
    options() {
      this.innerValue = this.getExactValues(this.value)
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

      let getSelected = h => this.getExactOptions(this.innerValue).map(x => h('sw-item', {
        staticClass: 'margin-min sw-form selected-option',
        class: this.selectedStyle === void 0
          ? {
            underline: this.underlined,
            border: this.bordered,
            fill: this.filled
          } : {
            [this.selectedStyle]: true
          },
        ref: 'selected',
        refInFor: true,
        scopedSlots: {
          default: () => [h('div', {
            style: {
              padding: this.mini ? '3px 0 3px 9px' : '3px 9px',
              'white-space': this.mini ? 'nowrap' : void 0
            }
          }, String(this.getName(x)))],
          after: !this.mini ? () => [h('sw-icon', {
            class: {
              'hover-color-primary': true,
              'color-grey': true
            },
            style: {
              'border-radius': '50%',
              padding: '0 3px 0 0'
            },
            props: {
              name: this.filled && this.selectedStyle === void 0 || this.selectedStyle === 'fill' ? 'cancel' : 'clear',
              size: '14px'
            },
            nativeOn: {
              click: () => {
                this.innerValue = this.formatValue(x, 'remove')
              }
            }
          })] : void 0
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
          if (isDeepEqual(x, this.getValue(option))) {
            duplicated = true
          } else {
            res.push(x)
          }
        })
      } else if (ope === 'remove') { duplicated = true }
      if (!duplicated) {
        res.push(this.getValue(option))
      }
      return res
    },
    checkSelected(option) {
      return this.innerValue.some(x => isDeepEqual(x, this.getValue(option)))
    },
    getExactValues(value) {
      let v = Array.isArray(value) ? value : [value]

      return v.reduce((a, c) => {
        if (this.options.some(x => isDeepEqual(this.getValue(x), c))) {
          a.push(c)
        }
        return a
      }, [])
    },
    getExactOptions(value) {
      return value.reduce((a, c) => {
        this.options.forEach(x => {
          if (isDeepEqual(this.getValue(x), c)) {
            a.push(x)
          }
        })
        return a
      }, [])
    },
    getValue(option) {
      return isObject(option) && option.hasOwnProperty('value')
        ? option.value : option
    },
    getName(option) {
      return isObject(option) && option.hasOwnProperty('name')
        ? option.name : option
    }
  }
}
  