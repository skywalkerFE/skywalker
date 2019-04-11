import Icon from './components/icon/index.js'
import Item from './components/item/index.js'
import Field from './components/field/index.js'
import Input from './components/input/index.js'
import Select from './components/select/index.js'
import ScrollArea from './components/scrollArea/index.js'
import Modal from './components/modal/index.js'
import Popover from './components/popover/index.js'
import Button from './components/button/index.js'
import Checkbox from './components/checkbox/index.js'
import CheckboxGroup from './components/checkboxGroup/index.js'
import Radio from './components/radio/index.js'
import RadioGroup from './components/radioGroup/index.js'
import Pagination from './components/pagination/index.js'
import Notification from './components/notification/index.js'
import Ripple from './directives/ripple/index.js'

const components = [
  Icon,
  Item,
  Field,
  Input,
  Select,
  ScrollArea,
  Modal,
  Popover,
  Button,
  Pagination,
  Notification,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup
]

const directives = [
  Ripple
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  directives.forEach(directive => {
    Vue.directive(directive.name, directive)
  })
  Vue.prototype.$notify = Notification
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Icon,
  Item,
  Field,
  Input,
  Select,
  ScrollArea,
  Popover,
  Modal,
  Button,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Ripple
}
