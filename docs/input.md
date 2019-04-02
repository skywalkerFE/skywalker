# Input
---
### 基本用法
<common-decorator>
  <div>
    <sw-input v-model="val0" underlined placeholder="placeholder">
    </sw-input>
    <sw-input label="disabled" v-model="val1" underlined disabled placeholder="placeholder">
    </sw-input>
    <sw-input label="bordered" bordered v-model="val2">
    </sw-input>
    <sw-input label="bordered" required bordered v-model="val3">
      <sw-icon slot="before" name="alarm"></sw-icon>
    </sw-input>
    <sw-input label="bordered" required bordered v-model="val4">
      <sw-icon slot="after" name="bookmark"></sw-icon>
    </sw-input>
    <sw-input label="bordered" required bordered :rules="rules" v-model="val5">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
    <sw-input label="bordered" required bordered disabled :rules="rules" v-model="val6">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
    <sw-input label="filled(not recommended)" required filled v-model="val7">
    </sw-input>
    <sw-item style="display:inline-block">
      <sw-item>
        <div slot="before">跳转至</div>
        <sw-input style="width:40px" mini bordered v-model="val8">
        </sw-input>
        <div slot="after">页</div>
      </sw-item>
      <sw-button class="margin-common" filled v-ripple>
      跳转
      </sw-button>
    </sw-item>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    val0:'',val1:'',val2:'',val3:'',val4:'',val5:'',val6:'',val7:'',val8:'',
    rules:[val => !!val || '必填项']
  })
}
</script>

``` html
    <sw-input v-model="val0" underlined placeholder="placeholder">
    </sw-input>
    <sw-input label="disabled" v-model="val1" underlined disabled placeholder="placeholder">
    </sw-input>
    <sw-input label="bordered" bordered v-model="val2">
    </sw-input>
    <sw-input label="bordered" required bordered v-model="val3">
      <sw-icon slot="before" name="alarm"></sw-icon>
    </sw-input>
    <sw-input label="bordered" required bordered v-model="val4">
      <sw-icon slot="after" name="bookmark"></sw-icon>
    </sw-input>
    <sw-input label="bordered" required bordered :rules="rules" v-model="val5">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
    <sw-input label="bordered" required bordered disabled :rules="rules" v-model="val6">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-input>
    <sw-input label="filled(not recommended)" required filled v-model="val7">
    </sw-input>
    <sw-item style="display:inline-block">
      <sw-item>
        <div slot="before">跳转至</div>
        <sw-input style="width:40px" mini bordered v-model="val8">
        </sw-input>
        <div slot="after">页</div>
      </sw-item>
      <sw-button class="margin-common" filled v-ripple>
      跳转
      </sw-button>
    </sw-item>
```

``` js
export default {
  data: ()=>({
    val0:'',val1:'',val2:'',val3:'',val4:'',val5:'',val6:'',val7:'',val8:'',
    rules:[val => !!val || '必填项']
  })
}
```

### 参数

Name|Type|Required|Default||
:------:|:------:|:------:|:------:|:------:|
placeholder|String|false||
v-model|String|true||
label|String|false||
required|Boolean|false|false|
underlined|Boolean|false|false|
bordered|Boolean|false|false|
filled|Boolean|false|false|不推荐，容易和disable混淆|
disabled|Boolean|false|false|
rules|Array\<Function\>|false||
mini|Boolean|false|false|缩小|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于input左侧的插槽|
after|false|置于input右侧的插槽|