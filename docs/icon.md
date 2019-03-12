# ICON
---
<common-decorator title="基本用法">
  <sw-icon name="alarm"></sw-icon>
  <sw-icon name="alarm" color="primary" style="color:#027be3"></sw-icon>
  <sw-icon name="alarm" size="1rem"></sw-icon>
  <sw-icon name="alarm" size="2rem"></sw-icon>
  <sw-icon name="alarm" size="3rem"></sw-icon>
  <highlight-code slot="codeText" lang="vue">
      <sw-icon name="alarm"></sw-icon>
      <sw-icon name="alarm" color="primary" style="color:#027be3"></sw-icon>
      <sw-icon name="alarm" size="1rem"></sw-icon>
      <sw-icon name="alarm" size="2rem"></sw-icon>
      <sw-icon name="alarm" size="36px"></sw-icon>
  </highlight-code>
</common-decorator>

::: tip 
组件引用[material-icon](https://material.io/tools/icons/) 作为图标库
:::

### ATTRIBUTES

Name|Type|Required|Default|
:------:|:------:|:------:|:------:|
name|String|true||
color|String|false|black|
size|String|false|14px|