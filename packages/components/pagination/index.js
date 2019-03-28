import Pagination from './src/main.js'

const install = function (Vue) {
  Vue.component(Pagination.name, Pagination)
}

Pagination.install = install

export default Pagination
