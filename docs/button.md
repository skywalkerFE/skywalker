# BUTTON
---
### 基本用法
<common-decorator>
  <div class="flex">
    <sw-button style="margin:10px">
    DEFAULT
    </sw-button>
    <sw-button style="margin:10px" no-hover>
    NO HOVER
    </sw-button>
    <sw-button style="margin:10px" positive round>
    ROUND
    </sw-button>
    <sw-button style="margin:10px" underlined warning v-ripple>
    UNDERLINED
    </sw-button>
    <sw-button style="margin:10px" positive bordered v-ripple>
    BORDERED
    </sw-button>
    <sw-button style="margin:10px" bordered disabled round>
    DISABLED
    </sw-button>
    <sw-button style="margin:10px" negative bordered shadow v-ripple to="ripple.html">
    GO TO RIPPLE
    </sw-button>
    <sw-button style="margin:10px" warning filled shadow v-ripple>
    FILLED
    </sw-button>
    <sw-button style="margin:10px" color="purple" filled v-ripple>
    COLORED
    </sw-button>
    <sw-button style="margin:10px" negative bordered shadow v-ripple>
    <sw-icon name="alarm" slot="before"></sw-icon>
    BEFORE SLOT
    </sw-button>
    <sw-button style="margin:10px" positive filled shadow v-ripple>
    <sw-icon name="alarm" slot="after"></sw-icon>
    AFTER SLOT
    </sw-button>
    <sw-button style="margin:10px" round negative filled shadow v-ripple>
    <sw-icon name="alarm" slot="round"></sw-icon>
    </sw-button>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({})
}
</script>

``` html
    <sw-button style="margin:10px">
    DEFAULT
    </sw-button>
    <sw-button style="margin:10px" no-hover>
    NO HOVER
    </sw-button>
    <sw-button style="margin:10px" positive round>
    ROUND
    </sw-button>
    <sw-button style="margin:10px" underlined warning v-ripple>
    UNDERLINED
    </sw-button>
    <sw-button style="margin:10px" positive bordered v-ripple>
    BORDERED
    </sw-button>
    <sw-button style="margin:10px" bordered disabled round>
    DISABLED
    </sw-button>
    <sw-button style="margin:10px" negative bordered shadow v-ripple to="ripple.html">
    GO TO RIPPLE
    </sw-button>
    <sw-button style="margin:10px" warning filled shadow v-ripple>
    FILLED
    </sw-button>
    <sw-button style="margin:10px" color="purple" filled v-ripple>
    COLORED
    </sw-button>
    <sw-button style="margin:10px" negative bordered shadow v-ripple>
    <sw-icon name="alarm" slot="before"></sw-icon>
    BEFORE SLOT
    </sw-button>
    <sw-button style="margin:10px" positive filled shadow v-ripple>
    <sw-icon name="alarm" slot="after"></sw-icon>
    AFTER SLOT
    </sw-button>
    <sw-button style="margin:10px" round negative filled shadow v-ripple>
    <sw-icon name="alarm" slot="round"></sw-icon>
    </sw-button>
```

``` js
export default {
  data: ()=>({})
}
```

### 参数

Name|Type|Required||
:------:|:------:|:------:|:------:|
to|String\|Object|false|<a>https://router.vuejs.org/zh/guide/essentials/navigation.html</a>|
underlined|Boolean|false|下划线样式，不支持圆角修饰|
bordered|Boolean|false|边框样式|
filled|Boolean|false|填充样式|
disabled|Boolean|false|禁用|
primary|Boolean|false|默认primary配色|
negative|Boolean|false|默认negative配色|
positive|Boolean|false|默认positive配色|
warning|Boolean|false|默认warning配色|
color|String|false|自定义按钮配色|
round|Boolean|false|圆角修饰，不支持下划线样式|
shadow|Boolean|false|阴影修饰，不支持默认和下划线样式|
noHover|Boolean|false|hover效果控制器|
v-ripple|Boolean|false|波纹动画，具体配置参考 自定义指令->ripple|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
before|false|置于default左侧的插槽|
after|false|置于default右侧的插槽|
default|false|置于中间的插槽|
round|false|置于中间的插槽，使用该插槽后不再识别其他插槽，用于插入长宽相等的元素后配合参数round展示为圆形按钮，不支持underlined|