import Radio from './src/main.js'

const install = function (Vue) {
  Vue.component(Radio.name, Radio)
}

Radio.install = install

export default Radio
