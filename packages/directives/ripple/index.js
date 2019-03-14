import Ripple from './src/main.js'

const install = function (Vue) {
  Vue.directive(Ripple.name, Ripple)
}

Ripple.install = install

export default Ripple