import Mask from './src/main.js'

const install = function (Vue) {
  Vue.directive(Mask.name, Mask)
}

Mask.install = install

export default Mask