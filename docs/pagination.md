# Pagination
---
### 基本用法
<common-decorator>
  <div style='width:100%'>
    <sw-pagination 
      :layout='layout'
      :total='num' 
      :page-size='pageSize' 
      :options='options' 
      @current-change="handleCurrentChange" 
      @size-change="handleSizeChange" 
      :current-page.sync="currentPage"
      :around="around">
    </sw-pagination>
  </div>
</common-decorator>

<script>
export default {
  data() {
    return{
      num: 201,
      pageSize: 20,
      options: [20,40,60,80],
      currentPage: 6,
      around: 2,  //···4，5，6，7，8···
      layout: 'total'
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

