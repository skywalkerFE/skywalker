import RadioGroup from './src/main.js'

const install = function (Vue) {
  Vue.component(RadioGroup.name, RadioGroup)
}

RadioGroup.install = install

export default RadioGroup
