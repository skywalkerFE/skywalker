import Field from '../../field'
import ShuttleMixin from '../../../mixins/shuttle'

export default {
  name: 'swRadioGroup',
  mixins: [Field, ShuttleMixin], // focused,disabled,shuttleRef
  props: {
    value: {
      required: true
    }
  },
  data: () => ({
    innerPointer: true,
    shuttleRef: 'radio'
  }),
  computed: {},
  watch: {},
  methods: {}
}