import ScrollArea from './src/main.js'

const install = function (Vue) {
  Vue.component(ScrollArea.name, ScrollArea)
}

ScrollArea.install = install

export default ScrollArea
