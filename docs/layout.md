# Layout
---
### 基本用法

layout组建用于页面整体布局，会把页面分割成上下左右中间五部分。<br/>
四周的部分若是没有规定高度或宽度则会按占用空间最小的方式分配空间。<br/>
每个单独的layout只能进行水平或者垂直单个纬度的分割，但layout可以通过相互嵌套达到按需要任意分割的目的。<br/>
同时每个layout可以通过<br/>
collapseTop、collapseLeft、collapseRight、collapseBottom<br/>
控制四周部分是否折叠，默认为false不折叠。

<common-decorator>
  <div style="width:600px;height:300px">
    <sw-layout>
      <sw-item slot="right" class="bg-warning" center style="width:100%;height:100%">
      RIGHT
      </sw-item>
      <sw-layout>
        <sw-item slot="bottom" class="bg-negative" center>
          BOTTOM
        </sw-item>
        <sw-layout>
          <sw-item slot="top" class="bg-positive" center>
            TOP
          </sw-item>
          <sw-layout>
            <sw-item slot="left" class="bg-grey" center style="width:100%;height:100%">
              LEFT
            </sw-item>
            <sw-layout>
              <sw-item slot="bottom" class="bg-positive" center>
                BOTTOM
              </sw-item>
              <sw-layout>
                <sw-item slot="top" class="bg-negative" center>
                  TOP
                </sw-item>
                <sw-layout>
                  <sw-item slot="left" class="bg-warning" center style="width:100%;height:100%">
                  LEFT
                  </sw-item>
                  <sw-layout>
                    <sw-item slot="right" class="bg-grey" center style="width:100%;height:100%">
                      RIGHT
                    </sw-item>
                    <sw-item class="bg-light-grey" center style="width:100%;height:100%">CENTER</sw-item>
                  </sw-layout>
                </sw-layout>
              </sw-layout>
            </sw-layout>
          </sw-layout>
        </sw-layout>
      </sw-layout>
    </sw-layout>
  </div>
</common-decorator>

``` html
    <sw-layout>
      <sw-item slot="right" center>
      RIGHT
      </sw-item>
      <sw-layout>
        <sw-item slot="bottom" center>
          BOTTOM
        </sw-item>
        <sw-layout>
          <sw-item slot="top" center>
            TOP
          </sw-item>
          <sw-layout>
            <sw-item slot="left" center>
              LEFT
            </sw-item>
            <sw-layout>
              <sw-item slot="bottom" center>
                BOTTOM
              </sw-item>
              <sw-layout>
                <sw-item slot="top" center>
                  TOP
                </sw-item>
                <sw-layout>
                  <sw-item slot="left" center>
                  LEFT
                  </sw-item>
                  <sw-layout>
                    <sw-item slot="right" center>
                      RIGHT
                    </sw-item>
                    <sw-item center>CENTER</sw-item>
                  </sw-layout>
                </sw-layout>
              </sw-layout>
            </sw-layout>
          </sw-layout>
        </sw-layout>
      </sw-layout>
    </sw-layout>
```
所有空间都可以任意自定义或嵌套layout

<common-decorator>
  <div style="width:600px;height:300px">
    <sw-layout :collapseLeft="collapse" leftMin="48" class="border-light-grey right">
      <sw-layout slot="left">
        <sw-basic-item slot="top" class="bg-grey" mini>
          <sw-item slot="content">
            <sw-icon name="menu" style="margin-right:12px;cursor:pointer" v-ripple class="color-light-grey" @click="collapse=!collapse"></sw-icon>
            <sw-input mini filled :space-around="false" placeholder="<=try it" v-model="val">
              <sw-icon slot="after" class="color-grey" name="search"></sw-icon>
            </sw-input>
          </sw-item>
        </sw-basic-item>
        <sw-scroll-area y stretch>
          <sw-basic-item primary icon="face" content="primary" split mini mask>
            <sw-basic-item warning icon="face" content="warning" indent-level="3" mini split mask>
              <sw-basic-item negative content="negative" indent-level="6" mini split mask>
                <sw-basic-item v-for="x in 10" indent-level="6" mini>
                  <div slot="content">default</div>
                  <sw-icon slot="after" positive name="favorite"></sw-icon>
                </sw-basic-item>
              </sw-basic-item>
            </sw-basic-item>
          </sw-basic-item>
        </sw-scroll-area>
      </sw-layout>
      <sw-layout :collapseTop="collapse">
        <sw-basic-item slot="top" class="bg-primary" color="#fff" icon="fingerprint" mini>
          <sw-item slot="after">
            <sw-icon name="arrow_forward" color="#fff"></sw-icon>
          </sw-item>
          <div slot="content">SKYWALKER</div>
        </sw-basic-item>
        <sw-item class="bg-light-grey" center style="width:100%;height:100%">CENTER</sw-item>
      </sw-layout>
    </sw-layout>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    to:'icon.html',
    val:'',
    collapse:false
  })
}
</script>

``` html
    <sw-layout :collapseLeft="collapse" leftMin="48">
      <sw-layout slot="left">
        <sw-basic-item slot="top" class="bg-grey" mini>
          <sw-item slot="content">
            <sw-icon name="menu" v-ripple class="color-light-grey" @click="collapse=!collapse"></sw-icon>
            <sw-input mini filled :space-around="false" placeholder="<=try it" v-model="val">
              <sw-icon slot="after" class="color-grey" name="search"></sw-icon>
            </sw-input>
          </sw-item>
        </sw-basic-item>
        <sw-scroll-area y stretch bordered>
          <sw-basic-item primary icon="face" content="primary" split mini mask>
            <sw-basic-item warning icon="face" content="warning" indent-level="3" mini split mask>
              <sw-basic-item negative content="negative" indent-level="6" mini split mask>
                <sw-basic-item v-for="x in 10" indent-level="6" mini>
                  <div slot="content">default</div>
                  <sw-icon slot="after" positive name="favorite"></sw-icon>
                </sw-basic-item>
              </sw-basic-item>
            </sw-basic-item>
          </sw-basic-item>
        </sw-scroll-area>
      </sw-layout>
      <sw-layout :collapseTop="collapse">
        <sw-basic-item slot="top" class="bg-primary" color="#fff" icon="fingerprint" mini>
          <sw-item slot="after">
            <sw-icon name="arrow_forward" color="#fff"></sw-icon>
          </sw-item>
          <div slot="content">SKYWALKER</div>
        </sw-basic-item>
        <sw-item class="bg-light-grey" center>CENTER</sw-item>
      </sw-layout>
    </sw-layout>
```

``` js
export default {
  data: ()=>({
    to:'icon.html',
    val:'',
    collapse:false
  })
}
```

### 参数

Name|Type|Required||
:------:|:------:|:------:|:------:|
collapseTop|Boolean|false|top是否折叠,默认false|
collapseLeft|Boolean|false|left是否折叠,默认false|
collapseRight|Boolean|false|right是否折叠,默认false|
collapseBottom|Boolean|false|bottom是否折叠,默认false|
topMin|Number|0|top折叠后的最小高度，默认0|
leftMin|Number|0|left折叠后的最小宽度，默认0|
rightMin|Number|0|right折叠后的最小宽度，默认0|
bottomMin|Number|0|bottom折叠后的最小高度，默认0|

### 插槽

Name|Required|direction|
:------:|:------:|:------:|
top|false|上方插槽|
left|false|左侧插槽|
right|false|右侧插槽|
bottom|false|下方插槽|
default|false|中间插槽|