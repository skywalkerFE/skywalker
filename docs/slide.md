# Slide
---
### 基本用法
<common-decorator>
  <div>
    <sw-slide horizontal :collapsed="collapse1" min="36" class="border-grey margin-medium">
      <sw-item center class="padding-medium" style="width:300px;cursor:pointer" @click="collapse1=!collapse1">
        <sw-icon slot="before" name="alarm"></sw-icon>
        <sw-icon slot="after" name="arrow_forward"></sw-icon>
        <div>click</div>
      </sw-item>
    </sw-slide>
    <sw-slide :collapsed="collapse2" min="36" class="border-grey margin-medium">
      <sw-item class="padding-medium" center style="width:300px;cursor:pointer" @click="collapse2=!collapse2">
        <sw-icon slot="before" name="alarm"></sw-icon>
        <sw-icon slot="after" name="arrow_downward"></sw-icon>
        <div>click</div>
      </sw-item>
      <sw-item center>
        <sw-icon name="mood" size="48px"></sw-icon>
      </sw-item>
    </sw-slide>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    collapse1:false,
    collapse2:true
  })
}
</script>

``` html
    <sw-slide horizontal :collapsed="collapse1" min="36" class="border-light-grey margin-medium">
      <sw-item center class="padding-medium" @click="collapse1=!collapse1">
        <sw-icon slot="before" name="alarm"></sw-icon>
        <sw-icon slot="after" name="arrow_forward"></sw-icon>
        <div>click</div>
      </sw-item>
    </sw-slide>
    <sw-slide :collapsed="collapse2" min="36" class="border-light-grey margin-medium">
      <sw-item class="padding-medium" center @click="collapse2=!collapse2">
        <sw-icon slot="before" name="alarm"></sw-icon>
        <sw-icon slot="after" name="arrow_downward"></sw-icon>
        <div>click</div>
      </sw-item>
      <sw-item center>
        <sw-icon name="mood" size="48px"></sw-icon>
      </sw-item>
    </sw-slide>
```

``` js
export default {
  data: ()=>({
    collapse1:false,
    collapse2:true
  })
}
```

### 参数

Name|Type|Required||
:------:|:------:|:------:|:------:|
collapsed|Boolean|false|默认true|
horizontal|Boolean|false|是否水平折叠|
min|Number|false|折叠后的最小高度或宽度，默认0|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
default|false|折叠内容|