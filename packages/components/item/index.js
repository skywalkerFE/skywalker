import Item from './src/main.js'

const install = function (Vue) {
  Vue.component(Item.name, Item)
}

Item.install = install

export default Item
