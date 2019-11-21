 <template>
  <div class="log">
     <el-table :data="tableData" stripe class="custom-table">
        <el-table-column prop="who" label="操作者" sort-by sortable></el-table-column>
        <el-table-column prop="time" label="操作时间" sort-by sortable></el-table-column>
        <el-table-column prop="table_name" label="操作表" sort-by sortable></el-table-column>
        <el-table-column prop="operation" label="类型" sort-by sortable></el-table-column>
        <el-table-column prop="key_value" label="keys and values" sort-by sortable></el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { getTable } from "../../api/table";
const moment = require("moment");

export default {
  name: "Log",
  data() {
    return {
      tableData: []
    };
  },

  created() {
    getTable({name: "logs"})
      .then(res => {
        console.log(res);
        this.tableData = res.data.data;
      })
      .catch(err => {
        console.log(err);
        this.$message({
          message: "查询失败",
          type: "warning"
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.custom-table {
  width: 80%;
  min-width: 600px;
  margin-left: 10%;
}
</style>
