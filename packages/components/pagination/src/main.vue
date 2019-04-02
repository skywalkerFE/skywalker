<template>
  <div class="sw-pagination">
    <div class="sw-pagination-total" v-if="layout.indexOf('total') > -1"> 
      {{`共${total}条`}}
    </div>
    <div class="sw-pagination-select" v-if="layout.indexOf('select') > -1">
      <sw-select v-model="pageSizeValue" :options="selectOption" selectedFilled bordered></sw-select>
    </div>
    <div class="sw-pagination-page">
      <span class="sw-pagination-page-item" @click="handleClickArrow('left')"><i class="material-icons sw-pagination-page-item-icon">keyboard_arrow_left</i></span>
      <span v-for="(item, index) in paginationList" :class="['sw-pagination-page-item', currentPageValue === item ? 'active' : '']" @click="handleClickPage(item, index)">
        <i v-if="item === '···'" class="material-icons sw-pagination-page-item-icon">more_horiz</i>
        <span v-else>
          {{item}}
        </span>
      </span>
      <span class="sw-pagination-page-item" @click="handleClickArrow('right')"><i class="material-icons sw-pagination-page-item-icon">keyboard_arrow_right</i></span>
    </div>
    <div class="sw-pagination-goto" v-if="layout.indexOf('goto') > -1">
      <span>前往</span>
      <div>
        <sw-input bordered v-model='inputValue' @keyup.enter.native="handleEnterGoto"></sw-input>
      </div>
      <span>页</span>
    </div>
  </div>
</template>

<script>
import swSelect from '../../select/index'
import makeResult from './pagination'
import swInput from '../../input/index'
export default {
  name: 'swPagination',
  data () {
    return {
      currentPageValue: this.currentPage,
      pageTotal: '',
      pageSizeValue: this.pageSize,
      inputValue: '1'
    }
  },
  props: {
    total: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    options: {
      type: Array
    },
    currentPage: {
      type: Number
    },
    around: {
      type: Number
    },
    layout: {
      type: String
    }
  },
  watch: {
    currentPageValue() {
      this.$emit('current-change', this.currentPageValue)
    },
    pageSizeValue() {
      this.$emit('size-change', this.pageSizeValue)
    }
  },
  computed: {
    selectOption() {
      let ary = []
      this.options.map(i=>{
        let item = {}
        item.name = `${i}条/页`
        item.value = i
        ary.push(item)
      })
      return ary
    },
    paginationList() {
      let pageTotal = this.pageTotal = this.total / this.pageSizeValue
      if (`${pageTotal}`.indexOf('.') > -1) {
        pageTotal = this.pageTotal = parseInt(pageTotal + 1)
      }
      if (this.currentPageValue > pageTotal) {
        this.currentPageValue = pageTotal
      }
      let pageList = makeResult(pageTotal, this.currentPageValue, this.around)
      return pageList
    }
  },
  components: {
    swSelect,
    swInput
  },
  methods: {
    handleEnterGoto() {
      let page = parseInt(this.inputValue)
      if (page < 1) {
        this.inputValue = '1'
      }
      if (page > this.pageTotal) {
        this.inputValue = `${this.pageTotal}`
      }
      this.currentPageValue = parseInt(this.inputValue)
      this.inputValue = `${parseInt(this.inputValue)}`
    },
    handleClickPage(item, index){
      if (item === '···') {
        if(index === 1){
          this.currentPageValue = 3
        } else {
          this.currentPageValue = this.pageTotal - 2
        }
      } else {
        this.currentPageValue = item
      }
    },
    handleClickArrow(params) {
      if (params === 'left') {
        if (this.currentPageValue !== 1) {
          this.currentPageValue = this.currentPageValue - 1
        }else{
          this.currentPageValue = 1
        }
      } else {
        if (this.currentPageValue !== this.pageTotal) {
          this.currentPageValue = this.currentPageValue + 1
        } else {
          this.currentPageValue = this.pageTotal
        }
      }
    }
  }
}
</script>

<style>

</style>
