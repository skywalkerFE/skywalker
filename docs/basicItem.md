# Basic Item（expandable）
---
### 基本用法
<common-decorator>
  <div>
    <div style="font-weight:bold;color:grey;margin:20px 0">添加icon、sub-content及跳转</div>
    <sw-basic-item primary icon="fingerprint" center mask content="router" sub-content="go to icon" :to="to" mini>
      <sw-item slot="after">
        <sw-icon name="arrow_forward"></sw-icon>
      </sw-item>
    </sw-basic-item>
    <div style="font-weight:bold;color:grey;margin:20px 0">添加扩展内容、自由设置缩进并分隔下拉内容</div>
    <sw-basic-item primary filled icon="alarm" content="expandable" split mask :collapsed.sync="collapsed">
      <sw-basic-item warning icon="alarm" content="not collapsed" indent-level="2" mini :collapsed="false" split mask disabled>
        <sw-basic-item negative content="custom content" indent-level="5" mini split mask :ripple="{center:true}">
          <sw-basic-item color="purple" indent-level="5" mini mask>
            <sw-icon slot="before" name="face"></sw-icon>
            <div slot="content">anything can be filled inside（currently disabled）</div>
            <sw-icon slot="after" name="favorite"></sw-icon>
          </sw-basic-item>
        </sw-basic-item>
      </sw-basic-item>
    </sw-basic-item>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    to:'icon.html',
    collapsed:false
  }),
  watch:{
    collapsed(v){
      console.log(v)
    }
  }
}
</script>

``` html
    <div>添加icon、sub-content及跳转</div>
    <sw-basic-item primary center icon="fingerprint" content="content" sub-content="sub-content" :to="to" mini>
    </sw-basic-item>
    <div>添加扩展内容、自由设置缩进并分隔下拉内容</div>
    <sw-basic-item primary icon="alarm" content="expandable" split>
      <sw-basic-item warning icon="alarm" content="not collapsed" indent-level="2" mini :collapsed="false" split>
        <sw-basic-item negative content="custom content" indent-level="5" mini split>
          <sw-basic-item color="purple" indent-level="5" mini disabled>
            <sw-icon slot="before" name="face"></sw-icon>
            <div slot="content">anything can be filled inside（currently disabled）</div>
            <sw-icon slot="after" name="favorite"></sw-icon>
          </sw-basic-item>
        </sw-basic-item>
      </sw-basic-item>
    </sw-basic-item>
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
disabled|Boolean|false|是否禁用|
primary|Boolean|false|默认primary配色|
negative|Boolean|false|默认negative配色|
positive|Boolean|false|默认positive配色|
warning|Boolean|false|默认warning配色|
color|String|false|自定义配色|
icon|String|false|自定义icon|
content|String|false|content内容|
sub-content|String|false|sub-content内容|
collapsed|Boolean|false|扩展内容是否折叠,默认true|
split|Boolean|false|扩展内容展开后是否分隔|
mini|Boolean|false|是否缩小展示，缩小后高度为36px，正常为48px|
indent-level|Number|false|缩进等级，递增12px，自由设置|
center|Boolean|false|中间部分的内容水平居中|
end|Boolean|false|中间部分的内容水平居右|
min|Number|0|扩展内容折叠后的最小高度，默认0|
active|Boolean|false|手动active|
callback|Function|false|(主要为sub)指定点击回调方法|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于content左侧的插槽|
after|false|置于content右侧的插槽|
content|false|content插槽|
default|false|扩展内容插槽|