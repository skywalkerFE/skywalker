# Notification
---
### 基本用法
<common-decorator>
  <sw-button @click='handleClick'>基本用法</sw-button>
  <sw-button @click='handleClick2'>自定义用法</sw-button>
</common-decorator>

<script>
export default {
  methods: {
    handleClick() {
      const h = this.$createElement
      this.$notify({
        title: '提示',
        content: '这是一段内容这是一段内容这是一段内容',
        onClose:(el)=>{
          console.log(el)
        },
        background: '#fff',
        closeColor: '#000',
        position: 'bottom-right'
      })
    },
    handleClick2() {
      const h = this.$createElement
      this.$notify({
        onClose:(el)=>{
          console.log(el)
        },
        slot: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'),
        background: '#fff',
        closeColor: '#000',
        position: 'top-right'
      })
    }
  }
}
</script>

```html
  <div>
    <sw-button @click='handleClick'>基本用法</sw-button>
    <sw-button @click='handleClick2'>自定义用法</sw-button>
  </div>
```

```js
  export default {
  methods: {
    handleClick() {
      const h = this.$createElement
      this.$notify({
        title: '提示',
        content: '这是一段内容这是一段内容这是一段内容',
        onClose:(el)=>{
          console.log(el)
        },
        background: '#fff',
        closeColor: '#000',
        position: 'bottom-right'
      })
    },
    handleClick2() {
      const h = this.$createElement
      this.$notify({
        onClose:(el)=>{
          console.log(el)
        },
        slot: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'),
        background: '#fff',
        closeColor: '#000',
        position: 'top-right'
      })
    }
  }
}
```

### Attributes
---

| 参数           | 说明          | 类型     | 可选值  | 默认值  |
| ------------- |:------------:| -------:|-------:|-------:|
| title     | 标题 | String | - | - |
| content         | 内容    |   String | - | - |
| slot         | 自定义Vnode   | Vnode | - | - |
| background         | 背景颜色   | String | - | - |
| closeColor         | 关闭按钮颜色   | String | - | - |
| position         | 显示位置   | String | top-right/bottom-right | - |


### Events
---

| 事件名称           | 说明          | 回调参数 |
| ------------- |:------------:| - |
| onClose          | 关闭的回调 | 当前关闭的vode | 