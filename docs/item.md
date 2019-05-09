# Item
---
### 基本用法
<common-decorator>
  <div style="width:300px">
    <sw-item :to="to">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <sw-icon slot="after" name="arrow_forward"></sw-icon>
      <div>go to icon</div>
    </sw-item>
    <sw-item :to="to" center>
      <sw-icon slot="before" name="alarm"></sw-icon>
      <sw-icon slot="after" name="arrow_forward"></sw-icon>
      <div>go to icon</div>
    </sw-item>
    <sw-item :to="to" end>
      <sw-icon slot="before" name="alarm"></sw-icon>
      <sw-icon slot="after" name="arrow_forward"></sw-icon>
      <div>go to icon</div>
    </sw-item>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    to:'icon.html',
    collapse1:false,
    collapse2:false
  })
}
</script>

``` html
    <sw-item :to="to">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <sw-icon slot="after" name="arrow_forward"></sw-icon>
      <div>go to icon</div>
    </sw-item>
    <sw-item :to="to" center>
      <sw-icon slot="before" name="alarm"></sw-icon>
      <sw-icon slot="after" name="arrow_forward"></sw-icon>
      <div>go to icon</div>
    </sw-item>
    <sw-item :to="to" end>
      <sw-icon slot="before" name="alarm"></sw-icon>
      <sw-icon slot="after" name="arrow_forward"></sw-icon>
      <div>go to icon</div>
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
center|Boolean|false|中间部分的内容水平居中|
end|Boolean|false|中间部分的内容水平居右|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于default左侧的插槽|
after|false|置于default右侧的插槽|
default|false|置于中间的插槽|