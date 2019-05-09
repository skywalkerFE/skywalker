import Slide from './src/main.js'

const install = function (Vue) {
  Vue.component(Slide.name, Slide)
}

Slide.install = install

export default Slide
