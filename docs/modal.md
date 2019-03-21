# Modal
---
### 基本用法
Modal 弹出一个对话框，适合需要定制性更大的场景

<common-decorator>
  <div>
    <a @click="handleClick">点击打开 Modal</a>
    <sw-modal 
      :show="showModal" 
      @cancel="handleCancel"
      title='基本用法'
      width='50%'
      @confirm="hanleConfirm">
      <div slot='content'>
        <h1>静夜思</h1>
        <p>床前明月光，疑是地上霜。举头望明月，低头思故乡。</p>
      </div>
    </sw-modal>
  </div>
</common-decorator>

<script>
export default {
  data() {
    return{
      showModal: false
    }
  },
  methods: {
    handleClick() {
      this.showModal = !this.showModal
    },
    handleCancel() {
      this.showModal = false
    },
    hanleConfirm() {
      this.handleCancel()
    }
  }
}
</script>
  
```html
  <div>
    <a @click="handleClick">点击打开 Modal</a>
    <sw-modal 
      :show="showModal" 
      @cancel="handleCancel"
      title='基本用法'
      width='50%'
      @confirm="hanleConfirm">
      <div slot='content'>
        <h1>静夜思</h1>
        <p>床前明月光，疑是地上霜。举头望明月，低头思故乡。</p>
      </div>
    </sw-modal>
  </div>
```

```js
  export default {
    data() {
      return{
        showModal: false
      }
    },
    methods: {
      handleClick() {
        this.showModal = !this.showModal
      },
      handleCancel() {
        this.showModal = false
      },
      hanleConfirm() {
        this.handleCancel()
      }
    }
  }
```

### 自定义用法

```html
<common-decorator>
  <div>
    <a @click="handleClick">点击打开 Modal</a>
    <sw-modal 
      :show="show" 
      title='基本用法'
      width='50%'
      >
      <div slot='header'>
        <h4>自定义</h4>
      </div>
      <div slot='content'>
        <h1>静夜思</h1>
        <p>床前明月光，疑是地上霜。举头望明月，低头思故乡。</p>
      </div>
      <div slot='footer'>
          <button>取消</button>
          <button>确认</button>
      </div>
    </sw-modal>
  </div>
</common-decorator>
```

### Attributes
---

| 参数           | 说明          | 类型     | 可选值  | 默认值  |
| ------------- |:------------:| -------:|-------:|-------:|
| show          | 是否展示modal | Boolean | - | false |
| width         | modal的款    |   String | - | 40% |
| title         | 当不使用header插槽的时候，设置title，modal的title    | String | - | - |

### Slot
---

| name           | 说明          |
| ------------- |:------------:| 
| header          | modal的头部 | 
| content         | modal的内容    |   
| footer         | modal的按钮操作区的内容    | 

### Events
---

| 事件名称           | 说明          | 回调参数 |
| ------------- |:------------:| - |
| cancel          | modal关闭的回调 | - | 
| confirm         | modal确认按钮的回掉    | - |   