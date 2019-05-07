<template>
  <div class="sw-upload" :style="{width: width}">
    <sw-button filled :disabled="disabled" @click="clickHandler" @keydown="handleKeydown">点击上传</sw-button>
    <div class="sw-upload__file__list">
      <ul>
        <li v-for="item in uploadFilesList" v-if="item.name">
          <div>
            <sw-icon name="description" size="16px" class="icon" />{{item.name}}
            <transition name="fade">
              <span class="percent" v-if="item.status === 'uploading'">{{item.percentage}}%</span>
              <sw-icon name="close" size="16px" class="icon close" v-if="item.status === 'success' && disabled === false" @click="handleRemove(item)" />
            </transition>
          </div>
          <transition name="fade">
            <div class="progress" v-if="item.status !== 'success' && item.status !== 'fail'" :style="{ width: item.percentage + '%' }"></div>
          </transition>
        </li>
      </ul>
    </div>
    <input class="sw-upload__input" type="file" :multiple="multiple" :accept="accept" @change="handleChange" ref="input">
  </div>
</template>

<script>
  import Button from '../../button'
  import Icon from '../../icon'
  import ajax from './ajax';

  function noop() {}

  export default {
    name: 'swUpload',
    components: { Button, Icon },
    props: {
      action: {
        type: String,
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      fileList: Array,
      limit: Number,
      onExceed: Function,
      beforeUpload: Function,
      beforeRemove: Function,
      headers: Object,
      data: Object,
      accept: String,
      name: {
        type: String,
        default: 'file'
      },
      onProgress: {
        type: Function,
        default: noop
      },
      onSuccess: {
        type: Function,
        default: noop
      },
      onError: {
        type: Function,
        default: noop
      },
      httpRequest: {
        type: Function,
        default: ajax
      },
      width: {
        type: String,
        default: '360px'
      }
    },
    data: () => ({
      uploadFilesList: [],
      tempIndex: 1
    }),
    watch: {
      fileList: {
        immediate: true,
          handler(fileList) {
          this.uploadFilesList = fileList.map(item => {
            item.uid = item.uid || (Date.now() + this.tempIndex++);
            item.status = item.status || 'success';
            return item;
          });
        }
      },
    },
    methods: {
      uploadStart(rawFile) {
        rawFile.uid = Date.now() + this.tempIndex++;
        let file = {
          status: 'ready',
          name: rawFile.name,
          size: rawFile.size,
          percentage: 0,
          uid: rawFile.uid,
          raw: rawFile
        };

        this.uploadFilesList.push(file);
      },
      clickHandler() {
        if (!this.disabled) {
          this.$refs.input.value = null
          this.$refs.input.click()
        }
      },
      handleKeydown(e) {
        if (e.target !== e.currentTarget) return;
        if (e.keyCode === 13 || e.keyCode === 32) {
          this.handleClick();
        }
      },
      handleChange(e) {
        const files = e.target.files;

        if (!files) return;
        this.uploadFiles(files);
      },
      uploadFiles(files) {
        if (this.limit && this.fileList.length + files.length > this.limit) {
          this.onExceed && this.onExceed(files, this.fileList);
          return;
        }

        let postFiles = Array.prototype.slice.call(files);
        if (!this.multiple) {
          postFiles = postFiles.slice(0, 1);
        }

        if (postFiles.length === 0) {
          return;
        }

        postFiles.forEach(rawFile => {
          this.uploadStart(rawFile);
          this.upload(rawFile);
        });
      },
      upload(rawFile) {
        this.$refs.input.value = null;

        if (!this.beforeUpload) {
          return this.post(rawFile);
        }

        const before = this.beforeUpload(rawFile);
        if (before && before.then) {
          before.then(processedFile => {
            const fileType = Object.prototype.toString.call(processedFile);

            if (fileType === '[object File]' || fileType === '[object Blob]') {
              if (fileType === '[object Blob]') {
                processedFile = new File([processedFile], rawFile.name, {
                  type: rawFile.type
                });
              }
              for (const p in rawFile) {
                if (rawFile.hasOwnProperty(p)) {
                  processedFile[p] = rawFile[p];
                }
              }
              this.post(processedFile);
            } else {
              this.post(rawFile);
            }
          });
        } else if (before !== false) {
          this.post(rawFile);
        }
      },
      post(rawFile) {
        const options = {
          headers: this.headers,
          file: rawFile,
          data: this.data,
          filename: this.name,
          action: this.action,
          onProgress: e => {
            this.handleProgress(e, rawFile);
          },
          onSuccess: res => {
            this.handleSuccess(res, rawFile);
          },
          onError: err => {
            this.handleError(err, rawFile);
          }
        };
        const req = this.httpRequest(options);
        if (req && req.then) {
          req.then(options.onSuccess, options.onError);
        }
      },
      handleProgress(e, rawFile) {
        let file = this.getFile(rawFile);

        this.onProgress(e, rawFile, this.uploadFilesList);
        file.status = 'uploading';
        file.percentage = e.percent || 0;
      },
      handleSuccess(e, rawFile) {
        let file = this.getFile(rawFile)

        this.onSuccess(e, rawFile, this.uploadFilesList);
        file.status = 'success';
      },
      handleError(err, rawFile) {
        let file = this.getFile(rawFile);
        let fileList = this.uploadFilesList;

        setTimeout(() => {
          fileList.splice(fileList.indexOf(file), 1);
          file.status = 'fail';
        }, 1000)
        this.onError(err, rawFile, this.uploadFilesList);
      },
      getFile(rawFile) {
        let fileList = this.uploadFilesList;
        let target;

        fileList.every(item => {
          target = rawFile.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      },
      handleRemove(rawFile) {
        let file = this.getFile(rawFile);
        let doRemove = () => {
          let fileList = this.uploadFilesList;

          fileList.splice(fileList.indexOf(file), 1);
        }

        if (!this.beforeRemove) {
          doRemove()
        } else if (typeof this.beforeRemove === 'function') {
          const before = this.beforeRemove(file, this.uploadFilesList);

          if (before && before.then) {
            before.then(() => {
              doRemove();
            }, noop);
          } else if (before !== false) {
            doRemove();
          }
        }
      }
    }
  }
</script>