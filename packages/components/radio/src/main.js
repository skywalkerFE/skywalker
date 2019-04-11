import Item from '../../item'
import { isDeepEqual } from '../../../utils/is'

export default {
  name: 'swRadio',
  components: { Item },
  props: {
    value: {},
    val: {
      required: true
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
        return this.getChecked(this.val)
      },
      set() {
        let self = this.parent === void 0 ? this : this.parent

        self.$emit(
          'input',
          this.val
        )
      }
    }
  },
  watch: {},
  methods: {
    getChecked(val) {
      return isDeepEqual(this.model, val)
    },
  },
  render(h) {
    let checked = this.checked
    let colorLabel = checked && this.colorLabel
    let colorRadio = checked || this.keepColor
    let getLabel = () => [h('div', {
      staticClass: 'sw-radio__text margin-min',
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
      staticClass: 'sw-radio',
      ref: 'radio',
      class: {
        disable: this.disabled || this.parentDisabled
      },
      nativeOn: {
        click: () => {
          if (this.disabled || checked) { return }
          this.checked = true
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
            name: checked ? 'radio_button_checked' : 'radio_button_unchecked',
            color: colorRadio ? this.color : void 0,
            primary: colorRadio ? this.primary : void 0,
            negative: colorRadio ? this.negative : void 0,
            positive: colorRadio ? this.positive : void 0,
            warning: colorRadio ? this.warning : void 0
          }
        })],
        after: this.label && !this.leftLabel ? getLabel : void 0
      }
    })
  }
}