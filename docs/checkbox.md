# Checkbox
---
### 基本用法
<common-decorator>
  <div>
    <h3>common checkbox</h3>
    <div>
      <sw-checkbox v-model="val">
      </sw-checkbox>
    </div>
    <div>
      <sw-checkbox v-model="a" label="label">
      </sw-checkbox>
    </div>
    <div>
      <sw-checkbox v-model="b" label="with val" :val="{b:1}" primary>
      </sw-checkbox>
    </div>
    <div>
      <sw-checkbox v-model="c" label="disabled" disabled>
      </sw-checkbox>
    </div>
    <div>
      <sw-checkbox v-model="d" label="left label" left-label color="purple" color-label>
      </sw-checkbox>
    </div>
    <h3>form style checkbox</h3>
    <sw-checkbox-group v-model="e" label="disabled" :rules="rules" disabled>
      <sw-checkbox :val="{a:1}" label="object" primary keep-color>
      </sw-checkbox>
      <sw-checkbox :val="1" label="number" negative keep-color>
      </sw-checkbox>
      <sw-checkbox :val="false" label="boolean" color="purple" keep-color>
      </sw-checkbox>
    </sw-checkbox-group>
    <sw-checkbox-group v-model="f" label="keep color" :rules="rules" required>
      <sw-checkbox :val="{a:1}" label="object" primary keep-color>
      </sw-checkbox>
      <sw-checkbox :val="1" label="number" negative keep-color>
      </sw-checkbox>
      <sw-checkbox :val="false" label="boolean" color="purple" keep-color>
      </sw-checkbox>
    </sw-checkbox-group>
    <div>{{f}}</div>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    val:false,a:false,b:[],c:true,d:false,e:[],f:[],
    rules:[v => v.length>0 || '必填项']
  })
}
</script>

``` html
    <sw-checkbox v-model="val">
    </sw-checkbox>
    <sw-checkbox v-model="a" label="label">
    </sw-checkbox>
    <sw-checkbox v-model="b" label="with val" :val="{b:1}" primary>
    </sw-checkbox>
    <sw-checkbox v-model="c" label="disabled" disabled>
    </sw-checkbox>
    <sw-checkbox v-model="d" label="left label" left-label color="purple" color-label>
    </sw-checkbox>
    <sw-checkbox-group v-model="e" label="form style" :rules="rules" disabled>
      <sw-checkbox :val="{a:1}" label="object" primary keep-color>
      </sw-checkbox>
      <sw-checkbox :val="1" label="number" negative keep-color>
      </sw-checkbox>
      <sw-checkbox :val="false" label="boolean" color="purple" keep-color>
      </sw-checkbox>
    <sw-checkbox-group v-model="f" label="form style" :rules="rules" required>
      <sw-checkbox :val="{a:1}" label="object" primary keep-color>
      </sw-checkbox>
      <sw-checkbox :val="1" label="number" negative keep-color>
      </sw-checkbox>
      <sw-checkbox :val="false" label="boolean" color="purple" keep-color>
      </sw-checkbox>
    </sw-checkbox-group>
    <div>{{f}}</div>
    </sw-checkbox-group>
```

``` js
export default {
  data: ()=>({
    val:false,a:false,b:[],c:true,d:false,e:[],f:[],
    rules:[v => v.length>0 || '必填项']
  })
}
```

### 参数(checkboxGroup)
Name|Type|Required|Default||
:------:|:------:|:------:|:------:|:------:|
v-model|String|true||必填，覆盖内部checkbox的v-model|
label|String|false|||
required|Boolean|false|false||
underlined|Boolean|false|false||
bordered|Boolean|false|false||
filled|Boolean|false|false||
disabled|Boolean|false|false||
rules|Array\<Function\>|false|||
mini|Boolean|false|false|缩小|

### 参数(checkbox)
Name|Type|Required|Default||
:------:|:------:|:------:|:------:|:------:|
v-model|String|true|||
val|Any|false|||
label|String|false|||
disabled|Boolean|false|false||
color|String|false|false||
primary|Boolean|false|false||
negative|Boolean|false|false||
positive|Boolean|false|false||
warning|Boolean|false|false||
leftLabel|Boolean|false|false|label置左|
colorLabel|Boolean|false|false|选中后label与checkbox同色|
keepColor|Boolean|false|false|未选中时checkbox也保持颜色|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于default左侧的插槽|
after|false|置于default右侧的插槽|