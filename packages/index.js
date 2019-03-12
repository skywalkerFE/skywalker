import Icon from './icon/index.js'
import Ripple from './directives/ripple/index.js'

const components = [
  Icon
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
    console.log(directive)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Icon,
  Ripple
}
