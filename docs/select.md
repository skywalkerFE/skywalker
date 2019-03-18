# SELECT
---
### 基本用法
<common-decorator>
  <div>
    <sw-select disabled multiple required filter selectedFilled bordered label="label" :rules="rules" :options="options0" v-model="val0">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-select>
  </div>
  <div @click="handle">{{val0}}</div>
</common-decorator>

<script>
export default {
  data: ()=>({
    val0:{a:1},
    options0:[undefined,{name:'option2',value:undefined},'option3','option4','option5','option6','option7'],
    rules:[val => val.length>0 || '必填项']
  }),
    methods:{
      handle(){
        setTimeout(()=>{this.options0 = ['option7']},1000)
      }
    }
}
</script>

``` html
    <sw-input v-model="val0" placeholder="test">
    </sw-input>
    <sw-input v-model="val1" disabled placeholder="test">
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