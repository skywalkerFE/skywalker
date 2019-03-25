# Select
---
### 单例展示
```html
options可以为以下形式，
:options="[ 2, 'BMW', 'Samsung Phone' ]"
:options="[ { name: 'BMW', value: 'car' }, { name: 'Samsung Phone', value: 'phone' } ]"

也可混合使用，
:options="[ 2, 'BMW', { name: 'BMW', value: 'car' } ] //此时options[0]默认等价于{ name: xx, value: 2 }

option为{ name: xx, value: xx }时value也可设置为对象，数组，undefined，NaN等形式
v-model返回去重后的value组成的数组，因为兼容undefined，所以单选时返回的也是数组形式
```
<common-decorator>
  <div style="width:400px">
    <sw-select multiple required filter selectedFilled bordered label="label" placeholder="placeholder" :rules="rules" :options="options" v-model="val">
    </sw-select>
    <div>val:{{val}}</div>
  </div>
</common-decorator>

``` html
<div>(undefined和NaN被展示为null了,可以看控制台的输出)</div>
```

``` html
    <sw-select
      multiple
      required
      filter
      selectedFilled
      bordered
      label="label"
      placeholder="placeholder"
      :rules="rules"
      :options="options"
      v-model="val">
    </sw-select>
```

```js
export default {
  data: ()=>({
    val:[],
    options:[
      undefined,
      {name:'option-undefined',value:undefined},
      2,
      {name:'option-string-2',value:'2'},
      {name:'option-object',value:{type:'option',objectKeysOrder:[1,2,3]}},
      {name:'option-object-same',value:{objectKeysOrder:[1,2,3],type:'option'}},
      {name:'option-object-with-different-array-order',value:{objectKeysOrder:[1,3,2],type:'option'}},
      NaN,
      {name:'option-NaN',value:NaN}
    ],
    rules:[val => val.length>0 || '必填项']
  }),
  watch:{
    val(v){
      console.log(v)
    }
  }
}
```

### 基本用法
<common-decorator>
  <div style="width:400px">
    <sw-select :options="options" v-model="val0">
    </sw-select>
    <sw-select label="label" :options="options" v-model="val1">
    </sw-select>
    <sw-select required label="label" :options="options" v-model="val2">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-select>
    <sw-select disabled required label="label" :options="options" v-model="val3">
    </sw-select>
    <sw-select multiple required placeholder="placeholder" label="label" :options="options" v-model="val4">
    </sw-select>
    <sw-select multiple required filter label="label" :options="options" v-model="val5">
    </sw-select>
    <sw-select multiple required filter bordered label="label" :options="options" v-model="val6">
    </sw-select>
    <sw-select multiple required filter selectedFilled bordered label="label" :options="options" v-model="val7">
    </sw-select>
    <sw-select multiple required filter selectedFilled bordered label="label" :rules="rules" :options="options" v-model="val8">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-select>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    val0:[],val1:[],val2:[],val3:[],val4:[],val5:[],val6:[],val7:[],val8:[],val:[],
    options:[
      undefined,
      {name:'option-undefined',value:undefined},
      2,
      {name:'option-string-2',value:'2'},
      {name:'option-object',value:{type:'option',objectKeysOrder:[1,2,3]}},
      {name:'option-object-same',value:{objectKeysOrder:[1,2,3],type:'option'}},
      {name:'option-object-with-different-array-order',value:{objectKeysOrder:[1,3,2],type:'option'}},
      NaN,
      {name:'option-NaN',value:NaN}
    ],
    rules:[val => val.length>0 || '必填项']
  }),
  watch:{
    val(v){
      console.log(v)
    }
  }
}
</script>

``` html
    <sw-select :options="options" v-model="val0">
    </sw-select>
    <sw-select label="label" :options="options" v-model="val1">
    </sw-select>
    <sw-select required label="label" :options="options" v-model="val2">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-select>
    <sw-select disabled required label="label" :options="options" v-model="val3">
    </sw-select>
    <sw-select multiple required label="label" placeholder="placeholder" :options="options" v-model="val4">
    </sw-select>
    <sw-select multiple required filter label="label" :options="options" v-model="val5">
    </sw-select>
    <sw-select multiple required filter bordered label="label" :options="options" v-model="val6">
    </sw-select>
    <sw-select multiple required filter selectedFilled bordered label="label" :options="options" v-model="val7">
    </sw-select>
    <sw-select multiple required filter selectedFilled bordered label="label" :rules="rules" :options="options" v-model="val8">
      <sw-icon slot="before" name="alarm"></sw-icon>
      <div slot="after">一些文本</div>
    </sw-select>
```

``` js
export default {
  data: ()=>({
    val0:[],val1:[],val2:[],val3:[],val4:[],val5:[],val6:[],val7:[],val8:[],val:[],
    options:[
      undefined,
      {name:'option-undefined',value:undefined},
      2,
      {name:'option-string-2',value:'2'},
      {name:'option-object',value:{type:'option',objectKeysOrder:[1,2,3]}},
      {name:'option-object-same',value:{objectKeysOrder:[1,2,3],type:'option'}},
      {name:'option-object-with-different-array-order',value:{objectKeysOrder:[1,3,2],type:'option'}},
      NaN,
      {name:'option-NaN',value:NaN}
    ],
    rules:[val => val.length>0 || '必填项']
  }),
  watch:{
    val(v){
      console.log(v)
    }
  }
}
```

### 参数
Name|Type|Required|Default|
:------:|:------:|:------:|:------:|
placeholder|String|false||
v-model|String|true||
options|Array|true|[]|
label|String|false||
required|Boolean|false|false|
bordered|Boolean|false|false|
disabled|Boolean|false|false|
multiple|Boolean|false|false|
filter|Boolean|false|false|
selectedFilled|Boolean|false|false|
rules|Array\<Function\>|false||

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于select左侧的插槽|
after|false|置于select右侧的插槽|