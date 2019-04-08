# Notification
---
### 基本用法
<common-decorator>
  <sw-button @click='handleClick'>按钮</sw-button>
</common-decorator>

<script>
export default {
  methods: {
    handleClick() {
      this.$notify({})
    }
  }
}
</script>