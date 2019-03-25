# INPUT
---
### 基本用法
<common-decorator>
  <div>
    <sw-input v-model="val0" placeholder="placeholder">
    </sw-input>
    <sw-input v-model="val1" disabled placeholder="placeholder">
    </sw-input>
    <sw-input label="label" v-model="val2">
    </sw-input>
    <sw-input label="label" required v-model="val3">
    </sw-input>
    <sw-input label="label" required bordered v-model="val4">
    </sw-input>
    <sw-input label="label" required bordered v-model="val5">
      <sw-icon slot="before" name="alarm"></sw-icon>
    </sw-input>
    <sw-input label="label" required bordered v-model="val6">
      <sw-icon slot="after" name="bookmark"></sw-icon>
    </sw-input>
    <sw-input label="label" required v-model="val7">
      <div slot="before">一些文本</div>
      <sw-icon slot="after" name="bookmark"></sw-icon>
    </sw-input>
    <sw-input label="label" required bordered :rules="rules" v-model="val8">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
    <sw-input label="label" required bordered disabled :rules="rules" v-model="val9">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    val0:'',val1:'',val2:'',val3:'',val4:'',val5:'',val6:'',val7:'',val8:'',val9:'',
    rules:[val => !!val || '必填项']
  })
}
</script>

``` html
    <sw-input v-model="val0" placeholder="placeholder">
    </sw-input>
    <sw-input v-model="val1" disabled placeholder="placeholder">
    </sw-input>
    <sw-input label="label" v-model="val2">
    </sw-input>
    <sw-input label="label" required v-model="val3">
    </sw-input>
    <sw-input label="label" required bordered v-model="val4">
    </sw-input>
    <sw-input label="label" required bordered v-model="val5">
      <sw-icon slot="before" name="alarm"></sw-icon>
    </sw-input>
    <sw-input label="label" required bordered v-model="val6">
      <sw-icon slot="after" name="bookmark"></sw-icon>
    </sw-input>
    <sw-input label="label" required v-model="val7">
      <div slot="before">一些文本</div>
      <sw-icon slot="after" name="bookmark"></sw-icon>
    </sw-input>
    <sw-input label="label" required bordered :rules="rules" v-model="val8">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
    <sw-input label="label" required bordered disabled :rules="rules" v-model="val9">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
```

``` js
export default {
  data: ()=>({
    val0:'',val1:'',val2:'',val3:'',val4:'',val5:'',val6:'',val7:'',val8:'',val9:'',
    rules:[val => !!val || '必填项']
  })
}
```

### 参数

Name|Type|Required|Default|
:------:|:------:|:------:|:------:|
placeholder|String|false||
v-model|String|true||
label|String|false||
required|Boolean|false|false|
bordered|Boolean|false|false|
disabled|Boolean|false|false|
rules|Array\<Function\>|false||

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于input左侧的插槽|
after|false|置于input右侧的插槽|