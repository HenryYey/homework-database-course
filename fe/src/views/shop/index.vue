<template>
  <div>
    <div class="shop-top">
      <el-dropdown class="dropdown" split-button type="primary" size="small" @command="handleClick">
        选择 顾 客
        <el-dropdown-menu slot="dropdown">
          <template v-for="item in customerList">
            <el-dropdown-item :key="item.cid" :command="item.cname">{{item.cname}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
      <span>
        当前顾客：
        <b>{{cus.cname}}</b>
      </span>
      <span>
        所在城市：
        <b>{{cus.city}}</b>
      </span>
      <span>
        剁手次数：
        <b>{{cus.visits_made}}</b>
      </span>
    </div>
    <div class="shop-top">
      <el-dropdown size="small" class="dropdown" split-button type="primary" @command="handleClickE">
        选择 员 工
        <el-dropdown-menu slot="dropdown">
          <template v-for="item in empList">
            <el-dropdown-item :key="item.eid" :command="item.ename">{{item.ename}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
      <span>
        当前销售：
        <b>{{emp.ename}}</b>
      </span>
      <span>
        所在城市：
        <b>{{emp.city}}</b>
      </span>
    </div>
    <div class="shop-container">
      <el-card
        class="el-rows"
        v-for="(item, index) in tableData"
        :key="index"
        :offset="index > 0 ? 2 : 0"
      >
        <div style="padding: 14px;">
          <span class="shop-title">商品信息</span>
          <div>
            <div class="info">
              商品名称:
              <b>{{ item.pname }}</b>
            </div>
            <div class="info">
              商品库存:
              <b>{{ item.qoh }}</b>
            </div>
            <div class="info">
              库存阈值:
              <b>{{ item.qoh_threshold }}</b>
            </div>
            <div class="info">
              原价:
              <b>
                <s>{{ item.original_price }}</s>
              </b>
            </div>
            <div class="info">
              折后价:
              <b>{{ (item.original_price * (1 - item.discnt_rate)).toFixed(2) }}</b>
            </div>
            <el-input-number
              v-model="item.num"
              @change="handleChange(item.pid)"
              :min="0"
              :max="item.qoh"
              label="购买数量"
            ></el-input-number>
            <el-button type="primary" class="button" @click="handleBuy(item)">买买买！</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
 
<script>
import {
  getTables,
  getTable,
  insertRow,
  updateRow,
  deleteRow
} from "../../api/table";

export default {
  name: "Shop",

  data() {
    return {
      cus: {},
      emp: {},
      customerList: [],
      empList: [],
      tableData: [],
      tableLabel: [],
      row: {},
      newobj: {},
      updateVisble: false,
      insertVisble: false,
      infoDelVisible: false,
      tableName: ""
    };
  },

  created() {
    this.getTableByName("products");
    this.getList();
  },

  methods: {
    getList() {
      getTable({ name: "customers" })
        .then(res => {
          console.log("res.data.data");
          console.log(res.data.data);
          this.customerList = res.data.data;
          this.cus = res.data.data[0];
        })
        .catch(err => {
          this.$message({
            message: "查询失败," + err,
            type: "error"
          });
        });
      getTable({ name: "employees" })
        .then(res => {
          console.log("res.data.data");
          console.log(res.data.data);
          this.empList = res.data.data;
          this.emp = res.data.data[0];
        })
        .catch(err => {
          this.$message({
            message: "查询失败," + err,
            type: "error"
          });
        });
    },
    getTableByName(name) {
      getTable({ name })
        .then(res => {
          console.log("res.data.data");
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
            items.num = 0;
          });
          this.tableData = res.data.data;
          console.log(this.tableData);
          // 存储字段名
          this.tableLabel = Object.keys(this.tableData[0]);
        })
        .catch(err => {
          this.$message({
            message: "查询失败," + err,
            type: "error"
          });
        });
    },
    handleClick(i) {
      this.customerList.forEach(item => {
        if (i === item.cname) this.cus = item;
      });
    },    
    handleClickE(i) {
      this.empList.forEach(item => {
        if (i === item.ename) this.emp = item;
      })
    },
    handleChange(item) {
      console.log(item);
    },
    handleBuy(row) {
      console.log(row);
      const moment = require("moment");
      const name = "products";
      const keys1 = ["pid", "qoh"];
      const vals1 = [row.pid, row.qoh - row.num];
      updateRow({ name, keys: keys1, vals: vals1 }).then(res => {
        this.$message.success("购买成功！")
        // 购买成功，记录日志
        const keys2 = ["cid", "eid", "pid", "qty", "ptime", "total_price"];
        const vals2 = [
          this.cus.cid,
          this.emp.eid,
          row.pid,
          row.num,
          moment().format("YYYY-MM-DD hh:mm:ss"),
          row.num * (row.original_price * (1 - row.discnt_rate)).toFixed(2)
        ];
         insertRow({ name: "purchases", keys: keys2, vals: vals2 })
        // 顾客剁手次数+1
        const keys3 = ["cid", "visits_made", "last_visit_time"];
        const vals3 = [
          this.cus.cid,
          this.cus.visits_made + 1,
          moment().format("YYYY-MM-DD hh:mm:ss")
        ];
         updateRow({ name: "customers", keys: keys3, vals: vals3 })
        // qoh小于库存，需要去拿货
        if ((row.qoh - row.num) < row.qoh_threshold) {
          const keys4 = ["pid", "qoh"];
          const vals4 = [
            row.pid,
            row.qoh - row.num + row.qoh_threshold
          ];
          updateRow({ name: "products", keys: keys4, vals: vals4 }).then((res) => {
            this.$message.success("拿货成功！")
          }).catch(res => {
            this.$message.error("拿货失败！")
          })
        }

        this.getTableByName("products");
      }).catch(err => {
        console.log(err)
        this.$message.error("购买失败！")
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;
}

.el-rows {
  width: 300px;
  margin: 20px;
  line-height: 50px;
}

.custom-table {
  width: 80%;
  min-width: 600px;
  margin-left: 10%;
}

.dropdown {
  margin: 10px 20px;
}

.table-name {
  color: #004b6e;
  font-size: 24px;
  vertical-align: middle;
  padding-left: 50px;
}

.shop-title {
  color: #b1b1b1;
}

.shop-top span {
  padding-left: 20px;
}
</style>
