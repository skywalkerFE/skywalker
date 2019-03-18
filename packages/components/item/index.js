import Field from './src/main.js'

const install = function (Vue) {
  Vue.component(Field.name, Field)
}

Field.install = install

export default Field
