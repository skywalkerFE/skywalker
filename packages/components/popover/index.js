import Popover from './src/main.js'

const install = function (Vue) {
  Vue.component(Modal.name, Popover)
}

Popover.install = install

export default Popover
