 <template>
  <div class="table">
    <el-dropdown
      class="dropdown"
      split-button
      type="primary"
      @click="handleClick"
      @command="handleDrop"
    >
      选择表
      <el-dropdown-menu slot="dropdown">
        <template v-for="(item, index) in tablesName">
          <el-dropdown-item :key="index" :command="item">{{item}}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="table-name">{{tableName}}</span>
    <el-table :data="tableData" stripe class="custom-table">
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small" style="color: red">删除</el-button>
        </template>
      </el-table-column>
      <!-- 动态循环的列表 -->
      <template v-for="(item, index) in tableLabel">
        <el-table-column :key="index" :prop="item" :label="item" sort-by sortable></el-table-column>
      </template>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <div class="table-form">
        <el-form label-position="right" label-width="120px" :model="row">
          <template v-for="(item, index) in tableLabel">
            <el-form-item :key="index" :label="item">
              <el-input v-if="index === 0" v-model="row[item]" disabled :placeholder="row[index]"></el-input>
              <el-input v-else v-model="row[item]" :placeholder="row[index]"></el-input>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" @click="submitForm(row)">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { getTables, getTable, updateRow, deleteRow } from "../../api/table";
const moment = require("moment");

export default {
  name: "Tables",

  data() {
    return {
      tablesName: [],
      tableData: [],
      tableLabel: [],
      row: {},
      dialogFormVisible: false,
      infoDelVisible: false,
      tableName: ""
    };
  },

  created() {
    getTables()
      .then(res => {
        this.tablesName = res.data.data;
        this.tableName = this.tablesName[0];
        this.getTableByName(this.tablesName[0]);
      })
      .catch(err => {
        this.$message({
          message: "查询失败",
          type: "error"
        });
      });
  },

  methods: {
    getTableByName(name) {
      getTable({ name })
        .then(res => {
          console.log(res.data.data);
          res.data.data.forEach(items => {
            for (let item in items) {
              if (
                JSON.stringify(items[item]).indexOf("T") > 0 &&
                JSON.stringify(items[item]).indexOf("Z") > 0 &&
                JSON.stringify(items[item]).indexOf(":") > 0
              )
                items[item] = items[item].split("T")[0];
            }
          });
          this.tableData = res.data.data;
          // 存储字段名
          this.tableLabel = Object.keys(this.tableData[0]);
        }).catch(err => {
          this.$message({
            message: "查询失败," + err,
            type: "error"
          });
        });
    },
    handleClick() {},
    handleEdit(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.row = row;
    },

    submitForm(data) {
      console.log("data", data);
      let vals = [];

      this.tableLabel.forEach(item => {
        if (!data[item]) {
          vals.push("");
        } else {
          vals.push(data[item]);
        }
      });
      updateRow({
        name: this.tableName,
        keys: this.tableLabel,
        vals
      })
        .then(res => {
          this.getTableByName(this.tableName);
          this.dialogFormVisible = false;
          this.$message({
            message: "操作成功",
            type: "success"
          });
        })
        .catch(err => {
          this.dialogFormVisible = false;
          this.$message({
            message: "操作失败, " + err,
            type: "error"
          });
        });
    },

    handleDrop(key) {
      this.tableName = key;
      this.getTableByName(key);
    },
    handleDel(row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.submitDel(row)
        })
        .catch(() => {});
    },
    submitDel(row) {
      let vals = []
      for(let i in row) {
        vals.push(row[i]) 
      }
      const data = { name: this.tableName, keys: this.tableLabel, vals};
      console.log(data)
      deleteRow(data)
        .then(res => {
          this.getTableByName(this.tableName);
          this.infoDelVisible = false;
          this.$message({
            message: "操作成功",
            type: "success"
          });
        })
        .catch(err => {
          this.infoDelVisible = false;
          this.$message({
            message: "操作失败, " + err,
            type: "error"
          });
        });
      this.getTableByName(this.tableName);
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-table {
  width: 80%;
  min-width: 600px;
  margin-left: 10%;
}

.dropdown {
  position: relative;
  margin-left: 10%;
  margin-top: 50px;
  margin-bottom: 50px;
}

.table-name {
  color: #004b6e;
  font-size: 24px;
  vertical-align: middle;
  padding-left: 50px;
}
</style>
