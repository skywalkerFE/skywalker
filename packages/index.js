import Icon from './components/icon/index.js'
import Field from './components/field/index.js'
import Input from './components/input/index.js'
import Ripple from './directives/ripple/index.js'

const components = [
  Icon,
  Field,
  Input
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
  Field,
  Input,
  Ripple
}
