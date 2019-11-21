 <template>
  <div class="time">
    <box ref="box" />
    <div class="block">
      <div class="event-form">
        <span style="color: #000000; font-weight: 600">新增事件</span>
        <el-input class="event-input" v-model="input_title" placeholder="请输入标题"></el-input>
        <div>
          <span>开始时间</span>
          <br />
          <el-date-picker v-model="start_time" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div>
          <span>结束时间</span>
          <br />
          <el-date-picker v-model="end_time" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <el-button class="event-submit" @click="handleSubmit" type="success">新增</el-button>
      </div>
    </div>
    <clock />
  </div>
</template>
 
<script>
import box from "./box";
import clock from "./clock";
import { addEvent } from "../../api/time";
const moment = require("moment");

export default {
  name: "Time",
  components: { box, clock },
  data() {
    return {
      start_time: "",
      end_time: "",
      input_title: ""
    };
  },

  methods: {
    handleSubmit() {
      const moment = require("moment");
      // 日期校验
      if (moment(this.end_time).isBefore(this.start_time)) {
        this.$message({
          message: "结束时间应该晚于开始时间",
          type: "error"
        });
        this.end_time = ""
        this.start_time = ""
        return
      }

      const data = {
        name: this.input_title,
        end_time: moment(this.end_time).format("YYYY-MM-DD"),
        start_time: moment(this.start_time).format("YYYY-MM-DD")
      };

      console.log("data", data);
      addEvent(data)
        .then(res => {
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$refs.box.getList();
        })
        .catch(err => {
          console.log(err);
          this.$message({
            message: "操作失败",
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.time {
  margin-top: 50px;
}

.block {
  margin-left: 100px + 400px + 100px;
}

.event-form {
  line-height: 50px;
}

.event-input {
  width: 260px - 40px;
  display: block;
}

.event-submit {
  margin-top: 25px;
  word-spacing: 5px;
  font-size: 18px;
}
</style>
