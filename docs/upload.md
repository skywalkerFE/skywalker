# Upload
---
### 基本用法
<common-decorator>
  <div>
    <sw-upload 
      :fileList="fileList" 
      multiple
      :limit="3"
      accept=".png,.jpeg"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :before-remove="beforeRemove">
    </sw-upload>
  </div>
</common-decorator>

<script>
export default {
  data: ()=>({
    fileList: [
      {
        name: 'test1.png'
      }
    ]
  }),
  methods: {
    beforeRemove(file) {
      if (confirm('确定删除' + file.name)) {
        return true
      }
      return false
    },
    handleExceed(files, fileList) {
      alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleError(err) {
      console.log(err.message)
    }
  }
}
</script>

``` html
   <div>
     <sw-upload 
       :fileList="fileList" 
       multiple
       :limit="3"
       accept=".png,.jpeg"
       :on-error="handleError"
       :on-exceed="handleExceed"
       :before-remove="beforeRemove">
     </sw-upload>
   </div>
```

``` js
export default {
  data: ()=>({
    fileList: [
      {
        name: 'test1.png'
      }
    ]
  }),
  methods: {
    beforeRemove(file) {
      if (confirm('确定删除' + file.name)) {
        return true
      }
      return false
    },
    handleExceed(files, fileList) {
      alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleError(err) {
      console.log(err.message)
    }
  }
}
```

### Attribute
参数|说明|类型|可选值|默认值
:------:|:------:|:------:|:------:|:------:|
action|必填，上传的url|string|-|-
headers|设置上传的请求头部|object|-|-
multiple|是否支持多选文件|boolean|-|false
data|上传时附带的额外参数|object|-|-
name|上传文件的字段名|string|-|-
accept|接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)|string|-|-
on-success|上传成功时的钩子|function(response, file, fileList)|-|-
on-error|上传失败时的钩子|function(err, file, fileList)|-|-
on-progress|正在上传时的钩子|function(event, file, fileList)|-|-
before-upload|上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。|function(file)|-|-
before-remove|删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。|function(file, fileList)|-|-
file-list|上传的文件列表, 例如: [{name: 'test1.png', url: 'https://xxx.cdn.com/test1.png'}]|array|-|[]
http-request|覆盖默认的上传行为，可以自定义上传的实现|function|-|-
disabled|必选参数，上传的地址|String|-|-
limit|最大允许上传的个数|number|-|-
on-exceed|文件超出个数限制时的钩子|function(files, fileList)|-|-
