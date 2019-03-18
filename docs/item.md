# ITEM
---
### 基本用法
<common-decorator>
  <div>
    <sw-item>
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
      <div>inner</div>
    </sw-item>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({})
}
</script>

``` html
    <sw-item>
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
      <div>inner</div>
    </sw-item>
```

``` js
export default {
  data: ()=>({})
}
```

### 参数

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于default左侧的插槽|
after|false|置于default右侧的插槽|
default|false|置于中间的插槽|