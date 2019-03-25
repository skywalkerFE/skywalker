# Popover
---
### 基本用法

<common-decorator>
  <div style='display: flex; justify-content: space-around; width: 100%;'>
    <sw-popover
    placement='left'
    trigger='hover'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'>
      <sw-button slot='reference' positive bordered v-ripple>
      hover激活
      </sw-button>
    </sw-popover>
    <sw-popover
    placement='top'
    trigger='click'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'>
      <sw-button slot='reference' positive bordered v-ripple>
      click激活
      </sw-button>
    </sw-popover>
    <sw-popover
    placement='bottom'
    trigger='focus'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'>
      <sw-button slot='reference' positive bordered v-ripple>
      focus激活
      </sw-button>
    </sw-popover>
    <sw-popover
    placement='right'
    trigger='manual'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'
    v-model='showPop'>
      <sw-button slot='reference' positive bordered v-ripple @click='handleClick'>
      手动激活
      </sw-button>
    </sw-popover>
  </div>
</common-decorator>

```html
  <div>
    <sw-popover
    placement='left'
    trigger='hover'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'>
      <sw-button slot='reference' positive bordered v-ripple>
      hover激活
      </sw-button>
    </sw-popover>

    <sw-popover
    placement='top'
    trigger='click'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'>
      <sw-button slot='reference' positive bordered v-ripple>
      click激活
      </sw-button>
    </sw-popover>

    <sw-popover
    placement='bottom'
    trigger='focus'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'>
      <sw-button slot='reference' positive bordered v-ripple>
      focus激活
      </sw-button>
    </sw-popover>

    <sw-popover
    placement='right'
    trigger='manual'
    title='标题'
    width='200px'
    content='这是一段内容,这是一段内容,这是一段内容,这是一段内容。'
    v-model='showPop'>
      <sw-button slot='reference' positive bordered v-ripple @click='handleClick'>
      手动激活
      </sw-button>
    </sw-popover>
  </div>
```

```js
export default {
  data() {
    return{
      showPop: false,
    }
  },
  methods: {
    handleClick() {
      this.showPop = !this.showPop
    },
  }
}
```

### 嵌套信息
<common-decorator>
  <div>
    <sw-popover
    placement='left'
    trigger='click'
    title='标题'
    width='200px'
    >
      <div>
        <p>这里是嵌套信息，这里是嵌套信息，这里是嵌套信息，这里是嵌套信息</p>
      </div>
      <sw-button slot='reference' positive bordered v-ripple>
      click激活
      </sw-button>
    </sw-popover>
  </div>
</common-decorator>

```html
  <div>
    <sw-popover
    placement='left'
    trigger='click'
    title='标题'
    width='200px'
    >
      <div>
        <p>这里是嵌套信息，这里是嵌套信息，这里是嵌套信息，这里是嵌套信息</p>
      </div>
      <sw-button slot='reference' positive bordered v-ripple>
      click激活
      </sw-button>
    </sw-popover>
  </div>
```

### 嵌套操作

<common-decorator>
  <div>
    <sw-popover
    placement='left'
    trigger='manual'
    title='标题'
    width='200px'
    v-model='visible'
    >
      <div>
        <p>这里是嵌套信息，这里是嵌套信息，这里是嵌套信息，这里是嵌套信息</p>
        <div style='display: flex; justify-content: space-around; width: 100%;'>
          <sw-button @click="visible = false">
            取消
          </sw-button>
          <sw-button @click="visible = false">
            确认
          </sw-button>
        </div>
      </div>
      <sw-button slot='reference' @click='handleClickVisible' positive bordered v-ripple>
      click激活
      </sw-button>
    </sw-popover>
  </div>
</common-decorator>

<script>
export default {
  data() {
    return{
      showPop: false,
      visible: false
    }
  },
  methods: {
    handleClickVisible() {
      this.visible = !this.visible
    },
    handleClick() {
      this.showPop = !this.showPop
    },
  }
}
</script>

```html
  <div>
    <sw-popover
    placement='left'
    trigger='manual'
    title='标题'
    width='200px'
    v-model='visible'
    >
      <div>
        <p>这里是嵌套信息，这里是嵌套信息，这里是嵌套信息，这里是嵌套信息</p>
        <div>
          <sw-button @click="visible = false">
            取消
          </sw-button>
          <sw-button @click="visible = false">
            确认
          </sw-button>
        </div>
      </div>
      <sw-button slot='reference' @click='handleClickVisible' positive bordered v-ripple>
      click激活
      </sw-button>
    </sw-popover>
  </div>
```

```js
export default {
  data() {
    return{
      visible: false
    }
  },
  methods: {
    handleClickVisible() {
      this.visible = !this.visible
    },
  }
}
```

### Attributes
---

| 参数           | 说明          | 类型     | 可选值  | 默认值  |
| ------------- |:------------:| -------:|-------:|-------:|
| trigger       | 触发方式 | String | click/focus/hover/manual | click |
| title         | 标题    |   String | - | - |
| content       | 显示的内容，也可以通过 slot 传入 DOM   | String | - | - |
| width         | 宽度  | String | - | 最小宽度150px |
| placement     | 出现位置  | String | top/top-start/bottom/bottom-start/left/left-start/right/right-start | top |

### Slot
---
| 参数           | 说明          | 
| ------------- |:------------:|
| -           | Popover 内嵌 HTML 文本 | 
| reference   |  触发 Popover 显示的 HTML 元素   | 