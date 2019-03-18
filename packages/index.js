import Icon from './components/icon/index.js'
import Item from './components/item/index.js'
import Field from './components/field/index.js'
import Input from './components/input/index.js'
import Select from './components/select/index.js'
import ScrollArea from './components/scrollArea/index.js'
import Ripple from './directives/ripple/index.js'

const components = [
  Icon,
  Item,
  Field,
  Input,
  Select,
  ScrollArea
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
  Ripple
}
