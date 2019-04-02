import Pagination from './src/main.vue'

const install = function (Vue) {
  Vue.component(Pagination.name, Pagination)
}

Pagination.install = install

export default Pagination
