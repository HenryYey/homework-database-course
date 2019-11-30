<template>
  <div>
    <div class="demonstration">
    <span class="demonstration-info">选择范围</span>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
    <keep-alive>
      <div :id="cusdata.htmldiv" class="report-box"></div>
    </keep-alive>
    <keep-alive>
      <div :id="empdata.htmldiv" class="report-box"></div>
    </keep-alive>
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
const echarts = require("echarts");
const moment = require("moment");

export default {
  name: "Report",
  data() {
    return {
      cusdata: {
        htmldiv: "cusReport",
        text: "测试",
        subtext: "哈哈哈",
        xAxisData: [],
        data: []
      },
      empdata: {
        htmldiv: "empReport",
        text: "测试",
        subtext: "哈哈哈",
        xAxisData: [],
        data: []
      },
      cusList: {},
      empList: {},
      value1: '',
    };
  },

  created() {
    this.getList(moment("1970-1-1").format(), moment("2070-1-1").format());
  },
  watch: {
    value1() {
      this.filters()
    }
  },
  methods: {
    getList(start, end) {
      this.cusList = {}
      getTable({ name: "purchases" })
        .then(res => {
          console.log("res.data.data");
          console.log(res.data.data);
          res.data.data.forEach(item => {
            if (!this.cusList[item.cid]) {
              this.cusList[item.cid] = 0
              this.empList[item.eid] = 0
            }
            if(moment(item.ptime).diff(moment(start),'day') > 0 && moment(item.ptime).diff(moment(end),'day') < 0) {            
              this.cusList[item.cid] += item.total_price;
              this.empList[item.eid] += item.total_price;
              console.log(this.cusList[item.cid])
            }
          });

          this.cusdata = {
            htmldiv: "cusReport",
            text: "顾客消费情况",
            subtext: "Y轴为消费总额， X轴为消费者id",
            xAxisData: Object.keys(this.cusList),
            data: this.cusList
          };
          let data = []
          Object.keys(this.cusList).forEach(item => {
            data.push(this.cusList[item])
          })
          // 计算Y轴数据
          let y = []
          let total2 = 0
         data.forEach((item, i)=> {
            y.push(total2 / (this.cusList.length - i))
          })
          const option1 = {
            title: {
              text: this.cusdata.text,
              textStyle: { color: "#333" },
              subtext: this.cusdata.subtext,
              subtextStyle: { color: "#aaa" },
              x: "center"
            },
            xAxis: {
              type: "category",
              data: this.cusdata.xAxisData,
              axisLine: {
                lineStyle: {
                  color: "#000"
                }
              }
            },
            yAxis: {
            },
            grid: {
              bottom: 20,
              left: 40,
              right: 20,
              top: 50
            },
            series: [
              {
                data,
                type: "bar"
              }
            ]
          };
          this.empdata = {
            htmldiv: "empReport",
            text: "员工销售情况",
            subtext: "Y轴为销售总额， X轴为销售者id",
            xAxisData: Object.keys(this.empList),
            data: this.empList
          };
          let data2 = []
          Object.keys(this.empList).forEach(item => {
            data2.push(this.empList[item])
          })
          // 计算Y轴数据
          let y2 = []
          let total = 0
         data2.forEach((item, i)=> {
            y2.push(total / (this.empList.length - i))
          })
          const option2 = {
            title: {
              text: this.empdata.text,
              textStyle: { color: "#333" },
              subtext: this.empdata.subtext,
              subtextStyle: { color: "#aaa" },
              x: "center"
            },
            xAxis: {
              type: "category",
              data: this.empdata.xAxisData,
              axisLine: {
                lineStyle: {
                  color: "#000"
                }
              }
            },
            yAxis: {
            },
            grid: {
              bottom: 20,
              left: 40,
              right: 20,
              top: 50
            },
            series: [
              {
                data: data2,
                type: "bar"
              }
            ]
          };
          const myChart1 = echarts.init(
            document.getElementById(this.cusdata.htmldiv)
          );
          myChart1.setOption(option1);
          console.log("123")
          const myChart2 = echarts.init(
            document.getElementById(this.empdata.htmldiv)
          );
          console.log("123")
          myChart2.setOption(option2);
          window.onresize = echarts
            .getInstanceByDom(document.getElementById(this.cusdata.htmldiv))
            .resize();
          window.onresize = echarts
            .getInstanceByDom(document.getElementById(this.empdata.htmldiv))
            .resize();
        })
        .catch(err => {
          this.$message({
            message: "查询失败," + err,
            type: "error"
          });
        });
    },
    filters() {
      const start = this.value1[0]
      const end = this.value1[1]
      this.getList(start, end)
    }
  }
};
</script>

<style lang="scss" scoped>
  .report-box {
    width: 60%;
    min-height: 300px;
    margin-left: 20%;
  }
  .demonstration {
    margin-left: 20%;
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .demonstration-info {
    padding-right: 25px;
    color: #444444;
  }
</style>
