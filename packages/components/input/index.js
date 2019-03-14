import Input from './src/main.js'

const install = function (Vue) {
  Vue.component(Input.name, Input)
}

Input.install = install

export default Input
