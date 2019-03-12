# RIPPLE
---
<common-decorator title="基本用法">
<div v-ripple style="margin:0 10px;position:relative;width:300px;height:50px;line-height:50px;background:#027be3;color:#fff;cursor:pointer;text-align:center;user-select:none;">default</div>
<div v-ripple.center style="margin:0 10px;position:relative;width:300px;height:50px;line-height:50px;background:#027be3;color:#fff;cursor:pointer;text-align:center;user-select:none;">center</div>
  <div v-ripple="{ color: 'purple' }" style="margin:0 10px;position:relative;width:300px;height:50px;line-height:50px;background:#027be3;color:#fff;cursor:pointer;text-align:center;user-select:none;">purple</div>
</common-decorator>

``` html
<div v-ripple>default</div>
<div v-ripple.center>center</div>
<div v-ripple="{ color: 'purple' }">purple</div>
```

### ATTRIBUTES

Name|Type|Required|Default|
:------:|:------:|:------:|:------:|
center|Boolean|false|false|
color|String|false|inherit|