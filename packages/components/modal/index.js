import Modal from './src/main.js'

const install = function (Vue) {
  Vue.component(Modal.name, Modal)
}

Modal.install = install

export default Modal
