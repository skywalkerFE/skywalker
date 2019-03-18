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
    filterValue: '',
    excludedBlurRefs: ['selectOptions']
  }),
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
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
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
              default: () => h('div', {
                staticClass: 'sw-select__option'
              }, this.getName(option))
            }
          }))
        } else {
          return h('sw-item', {
            scopedSlots: {
              default: () => h('div', {
                staticClass: 'sw-select__option no-options'
              }, '无结果')
            }
          })
        }
      }

      let getSelected = h => this.innerValue.map(x =>
        h('sw-item', {
          staticClass: 'margin-min',
          props: {
            formStyle: true,
            bordered: this.bordered,
            filled: this.selectedFilled
          },
          scopedSlots: {
            default: () => String(this.getName(x)),
            after: () => h('sw-icon', {
              class: {
                'hover-color-primary': true,
                'color-grey': true
              },
              style: {
                'border-radius': '50%'
              },
              props: {
                name: 'cancel',
                size: '20px'
              },
              nativeOn: {
                click: () => {
                  this.innerValue = this.formatValue(x, 'remove')
                }
              }
            })
          }
        }))

      return [h('sw-item', {
        props: {
          wrap: true,
          hideDefault: this.innerValue.length > 0 && !this.focused
        },
        scopedSlots: {
          before: this.innerValue.length > 0 ? () => getSelected(h) : void 0,
          default: () => h('input', {
            ref: 'input',
            staticClass: 'sw-input margin-min',
            style: {
              cursor: !this.filter ? 'pointer' : void 0
            },
            domProps: {
              value: this.filterValue,
              placeholder: this.placeholder,
              disabled: !this.filter
            },
            on: {
              ...this.$listeners,
              input: e => {
                this.filterValue = e.target.value
              }
            }
          }),
          after: () => h('sw-icon', {
            props: {
              name: this.focused ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
              size: '20px'
            }
          })
        }
      }), this.focused ? h('div', {
        ref: 'selectOptions',
        staticClass: 'sw-select__options common-shadow',
        style: {
          'max-height': this.optionsHeight
        }
      }, [
        h('sw-scroll-area', {
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
  