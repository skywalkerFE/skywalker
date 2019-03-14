

## 安装
```shell
npm install @skywalker-fe/skywalker -S
```

## 引用
``` javascript
import Vue from 'vue'
import '@skywalker-fe/skywalker/lib/skywalker.css'
import Skywalker from '@skywalker-fe/skywalker'
//we use material-icons as dependencies
import 'material-icons/iconfont/material-icons.css'

Vue.use(Skywalker)

// or
import {
  Icon
  // ...
} from '@skywalker-fe/skywalker'

Vue.component(Icon.name, Icon)
```

## 开发

```shell
git clone https://github.com/skywalkerFE/skywalker.git

npm i

npm i webpack-dev-middleware@3.6.0

# 3.6.1有bug，需要手动重装3.6.0

npm run docs:dev

# open http://localhost:8080
# 新增的样式文件约定格式[name].styl,写脚本能力有限,不要加us,匹配不到。。
# 新增样式文件后需重跑npm run docs:dev,其他时候不需要
```

## 打包

```shell
npm run dist
```