import CheckboxGroup from './src/main.js'

const install = function (Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup)
}

CheckboxGroup.install = install

export default CheckboxGroup
