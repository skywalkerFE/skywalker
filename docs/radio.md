# Radio
---
### 基本用法
<common-decorator>
  <div>
    <h3>common radio</h3>
    <div>
      <sw-radio v-model="val" :val="1">
      </sw-radio>
    </div>
    <div>
      <sw-radio v-model="val" :val="2" label="label">
      </sw-radio>
    </div>
    <div>
      <sw-radio v-model="val" label="with val" :val="3" primary>
      </sw-radio>
    </div>
    <div>
      <sw-radio v-model="val" :val="4" label="disabled" disabled>
      </sw-radio>
    </div>
    <div>
      <sw-radio v-model="val" :val="5" label="left label" left-label color="purple" color-label>
      </sw-radio>
    </div>
    <h3>form style radio</h3>
    <sw-radio-group v-model="a" label="disabled" :rules="rules" disabled>
      <sw-radio :val="{a:1}" label="object" primary keep-color>
      </sw-radio>
      <sw-radio :val="1" label="number" negative keep-color>
      </sw-radio>
      <sw-radio :val="false" label="boolean" color="purple" keep-color>
      </sw-radio>
    </sw-radio-group>
    <sw-radio-group v-model="b" label="keep color" :rules="rules" required>
      <sw-radio :val="{a:1}" label="object" primary keep-color>
      </sw-radio>
      <sw-radio :val="1" label="number" negative keep-color>
      </sw-radio>
      <sw-radio :val="false" label="boolean" color="purple" keep-color>
      </sw-radio>
    </sw-radio-group>
    <div>{{b}}</div>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    val:1,a:1,b:1,
    rules:[v => v!==void 0 || '必填项']
  })
}
</script>

``` html
    <sw-radio v-model="val" :val="1">
    </sw-radio>
    <sw-radio v-model="val" :val="2" label="label">
    </sw-radio>
    <sw-radio v-model="val" label="with val" :val="3" primary>
    </sw-radio>
    <sw-radio v-model="val" :val="4" label="disabled" disabled>
    </sw-radio>
    <sw-radio v-model="val" :val="5" label="left label" left-label color="purple" color-label>
    </sw-radio>
    <sw-radio-group v-model="a" label="disabled" :rules="rules" disabled>
      <sw-radio :val="{a:1}" label="object" primary keep-color>
      </sw-radio>
      <sw-radio :val="1" label="number" negative keep-color>
      </sw-radio>
      <sw-radio :val="false" label="boolean" color="purple" keep-color>
      </sw-radio>
    </sw-radio-group>
    <sw-radio-group v-model="b" label="keep color" :rules="rules" required>
      <sw-radio :val="{a:1}" label="object" primary keep-color>
      </sw-radio>
      <sw-radio :val="1" label="number" negative keep-color>
      </sw-radio>
      <sw-radio :val="false" label="boolean" color="purple" keep-color>
      </sw-radio>
    </sw-radio-group>
    <div>{{b}}</div>
    </sw-radio-group>
```

``` js
export default {
  data: ()=>({
    val:1,a:1,b:1,
    rules:[v => v!==void 0 || '必填项']
  })
}
```

### 参数(radioGroup)
Name|Type|Required|Default||
:------:|:------:|:------:|:------:|:------:|
v-model|String|true||必填，覆盖内部radio的v-model|
label|String|false|||
required|Boolean|false|false||
underlined|Boolean|false|false||
bordered|Boolean|false|false||
filled|Boolean|false|false||
disabled|Boolean|false|false||
rules|Array\<Function\>|false|||
mini|Boolean|false|false|缩小|

### 参数(radio)
Name|Type|Required|Default||
:------:|:------:|:------:|:------:|:------:|
v-model|String|true|||
val|Any|true|||
label|String|false|||
disabled|Boolean|false|false||
color|String|false|false||
primary|Boolean|false|false||
negative|Boolean|false|false||
positive|Boolean|false|false||
warning|Boolean|false|false||
leftLabel|Boolean|false|false|label置左|
colorLabel|Boolean|false|false|选中后label与radio同色|
keepColor|Boolean|false|false|未选中时radio也保持颜色|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于default左侧的插槽|
after|false|置于default右侧的插槽|