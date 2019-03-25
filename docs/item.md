# ITEM
---
### 基本用法
<common-decorator>
  <div>
    <sw-item :to="to">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
      <div>inner</div>
    </sw-item>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    to:'icon.html'
  })
}
</script>

``` html
    <sw-item :to="to">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
      <div>inner</div>
    </sw-item>
```

``` js
export default {
  data: ()=>({
    to:'icon.html'
  })
}
```

### 参数

Name|Type|Required||
:------:|:------:|:------:|:------:|
to|String\|Object|false|<a>https://router.vuejs.org/zh/guide/essentials/navigation.html</a>|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于default左侧的插槽|
after|false|置于default右侧的插槽|
default|false|置于中间的插槽|