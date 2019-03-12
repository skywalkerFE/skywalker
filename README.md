

## 安装
```shell
npm install @skywalker-fe/skywalker -S
```

## 引用
``` javascript
import Vue from 'vue'
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

npm run docs:dev

# open http://0.0.0.0:8080
```
