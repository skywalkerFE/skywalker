import Field from '../../field'
import ShuttleMixin from '../../../mixins/shuttle'

export default {
  name: 'swCheckboxGroup',
  mixins: [Field, ShuttleMixin], // focused,disabled,shuttleRef
  props: {
    value: Boolean | Array
  },
  data: () => ({
    innerPointer: true,
    shuttleRef: 'checkbox'
  }),
  computed: {},
  watch: {},
  methods: {
    getInner() {
      if (this.$scopedSlots.default !== void 0) {
        return this.$scopedSlots.default()
      } else {
        return void 0
      }
    }
  }
}