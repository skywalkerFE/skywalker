import BasicItem from './src/main.js'

const install = function (Vue) {
  Vue.component(BasicItem.name, BasicItem)
}

BasicItem.install = install

export default BasicItem
