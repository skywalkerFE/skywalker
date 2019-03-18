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

Name|Type|Required|Default|
:------:|:------:|:------:|:------:|
v-model|String|true||
label|String|false||
required|Boolean|false|false|
bordered|Boolean|false|false|
disabled|Boolean|false|false|
rules|Array\<Function\>|false||

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于input左侧的插槽,color默认置灰|
after|false|置于input右侧的插槽,color默认置灰|