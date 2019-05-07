import Upload from './src/main.vue'

const install = function (Vue) {
  Vue.component(Upload.name, Upload)
}

Upload.install = install

export default Upload
