import Ripple from './src/main.js'

/* istanbul ignore next */
const install = function (Vue) {
  Vue.directive(Ripple.name, Ripple)
}

Ripple.install = install

export default Ripple