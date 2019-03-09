import Icon from './src/main.js'

/* istanbul ignore next */
const install = function (Vue) {
  Vue.component(Icon.name, Icon)
}

Icon.install = install

export default Icon
