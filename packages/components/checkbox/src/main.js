import Item from '../../item'
import { isDeepEqual } from '../../../utils/is'

export default {
  name: 'swCheckbox',
  components: { Item },
  props: {
    value: Boolean | Array,
    val: {
      required: false
    },
    label: String,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    leftLabel: Boolean,
    colorLabel: Boolean,
    keepColor: Boolean
  },
  data: () => ({
    parent: void 0
  }),
  computed: {
    model() {
      return this.parent === void 0 ? this.value : this.parent.value
    },
    parentDisabled() {
      return this.parent && this.parent.disabled
    },
    checked: {
      get() {
        return this.booleanMode ? this.model : this.getChecked(this.val)
      },
      set(val) {
        let self = this.parent === void 0 ? this : this.parent

        self.$emit(
          'input',
          this.formatValue(val)
        )
      }
    },
    innerValue() {
      return Array.isArray(this.model) ? this.model : [this.model]
    },
    booleanMode() {
      return this.val === void 0
    }
  },
  watch: {},
  methods: {
    getChecked(val) {
      return this.innerValue.some(x => isDeepEqual(x, val))
    },
    formatValue(checked) {
      if (this.booleanMode) { return checked }
      let res = []

      this.innerValue.forEach(x => {
        if (!isDeepEqual(x, this.val)) {
          res.push(x)
        }
      })
      if (checked) { res.push(this.val) }
      return res
    },
  },
  render(h) {
    let checked = this.checked
    let colorLabel = checked && this.colorLabel
    let colorCheckbox = checked || this.keepColor
    let getLabel = () => [h('div', {
      staticClass: 'sw-checkbox__text margin-min',
      class: {
        'color-primary': colorLabel ? this.primary : void 0,
        'color-negative': colorLabel ? this.negative : void 0,
        'color-positive': colorLabel ? this.positive : void 0,
        'color-warning': colorLabel ? this.warning : void 0
      },
      style: {
        color: colorLabel ? this.color : void 0
      }
    }, this.label)]

    return h('sw-item', {
      staticClass: 'sw-checkbox',
      ref: 'checkbox',
      class: {
        disable: this.disabled || this.parentDisabled
      },
      nativeOn: this.disabled ? void 0 : {
        click: () => {
          this.checked = !checked
        }
      },
      scopedSlots: {
        before: this.label && this.leftLabel ? getLabel : void 0,
        default: () => [h('sw-icon', {
          staticClass: 'margin-min',
          style: {
            opacity: checked ? 1 : 0.6
          },
          props: {
            size: '20px',
            name: checked ? 'check_box' : 'check_box_outline_blank',
            color: colorCheckbox ? this.color : void 0,
            primary: colorCheckbox ? this.primary : void 0,
            negative: colorCheckbox ? this.negative : void 0,
            positive: colorCheckbox ? this.positive : void 0,
            warning: colorCheckbox ? this.warning : void 0
          }
        })],
        after: this.label && !this.leftLabel ? getLabel : void 0
      }
    })
  }
}