import Select from './src/main.js'

const install = function (Vue) {
  Vue.component(Select.name, Select)
}

Select.install = install

export default Select
