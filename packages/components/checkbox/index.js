import Checkbox from './src/main.js'

const install = function (Vue) {
  Vue.component(Checkbox.name, Checkbox)
}

Checkbox.install = install

export default Checkbox
