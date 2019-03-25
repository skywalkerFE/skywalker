# Popover
---
### 基本用法

<common-decorator>
  <div>
    <sw-popover
    placement='top'
    trigger='manual'
    v-model='showPop'>
      <button slot='reference' :style="{'width': '70px', height: '44px'}" @click='handleClick'>reference</button>
    </sw-popover>
  </div>
</common-decorator>

<script>
export default {
  data() {
    return{
      showPop: false
    }
  },
  methods: {
    handleClick() {
      this.showPop = !this.showPop
    },
  }
}
</script>