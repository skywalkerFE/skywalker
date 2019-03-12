/**
 * 扩展 VuePress 应用
 */
import VueHighlightJS from 'vue-highlight.js'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import vue from 'vue-highlight.js/lib/languages/vue'
import 'highlight.js/styles/atom-one-dark.css'
import 'material-icons/iconfont/material-icons.css'
import skywalker from '../../packages/index'

export default ({
  Vue
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(VueHighlightJS, {
	languages: {
		css,
		javascript,
		vue
	}
})
  Vue.use(skywalker)
}