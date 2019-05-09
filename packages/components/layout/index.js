import Layout from './src/main.js'

const install = function (Vue) {
  Vue.component(Layout.name, Layout)
}

Layout.install = install

export default Layout
