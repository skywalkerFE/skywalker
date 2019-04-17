import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import VuePlugin from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

export default {
  input: 'packages/index.js',
  output: [{
    file: `lib/skywalker.esm.${process.env.NODE_ENV === 'production' ? 'min.' : ''}js`,
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
    format: 'esm'
  }, {
    file: `lib/skywalker.common.${process.env.NODE_ENV === 'production' ? 'min.' : ''}js`,
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
    format: 'umd',
    name: 'skywalker',
    globals: {
      vue: 'Vue'
    }
  }],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    VuePlugin(),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && terser()),
    postcss({
      plugins: [autoprefixer],
      extract: `lib/skywalker.${process.env.NODE_ENV === 'production' ? 'min.' : ''}css`,
      minimize: process.env.NODE_ENV === 'production'
    })
  ],
  external: ['vue']
}