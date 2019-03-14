const fs = require('fs-extra')
const path = require('path')

const global = path.join(__dirname, '../packages/css')

fs.readdirSync(global).forEach(file => {

  if (file !== 'index.styl') {
    console.log(`@import './${file}'`)// eslint-disable-line no-console
  }
})

function hasStyle(dir, file) {
  return fs.lstatSync(dir).isDirectory() && fs.existsSync(path.join(dir, `src/${file}.styl`))
}

const components = path.join(__dirname, '../packages/components')

fs.readdirSync(components).forEach(file => {
  const absPath = path.join(components, file)

  if (hasStyle(absPath, file)) {
    console.log(`@import '../components/${file}/src/${file}.styl'`)// eslint-disable-line no-console
  }
})

const directives = path.join(__dirname, '../packages/directives')

fs.readdirSync(directives).forEach(file => {
  const absPath = path.join(directives, file)

  if (hasStyle(absPath, file)) {
    console.log(`@import '../directives/${file}/src/${file}.styl'`)// eslint-disable-line no-console
  }
})