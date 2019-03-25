import Button from './src/main.js'

const install = function (Vue) {
  Vue.component(Button.name, Button)
}

Button.install = install

export default Button
