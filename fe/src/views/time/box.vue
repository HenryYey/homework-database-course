 <template>
  <div class="box">
    <div class="title">
      <span>倒计时</span>
    </div>

    <tr>
      <td v-for="(item, index) in items" v-bind:key="index">
        <item
          :title="items[index].title"
          :start_time="items[index].start_time"
          :end_time="items[index].end_time"
          :distance="items[index].distance"
        />
      </td>
    </tr>
  </div>
</template>
 
<script>
import item from "./item";
import { getEvents } from "../../api/time";
const moment = require("moment");

export default {
  name: "Box",
  components: {
    item
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      getEvents().then(res => {
        let data = res.data.data;
        let arr = [];
        data.forEach(item => {
          arr.push({
            title: item.name,
            id: item.id,
            start_time: item.start_time
              ? moment(item.start_time).format("YYYY-MM-DD")
              : moment().format("YYYY-MM-DD"),
            end_time: moment(item.end_time).format("YYYY-MM-DD"),
            distance: this.getDistance(item.end_time, item.start_time)
          });
        });
        this.items = arr;
      });
    },

    getDistance(end, start) {
      console.log(start);
      start = start === null ? moment().format() : start;
      console.log(start);
      return moment(end).diff(start, "days");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
  position: absolute;
  background: rgb(225, 225, 225);
  width: 400px;
  min-height: 600px;
  max-height: 750px;
  border: 1px solid #005b77;
  border-radius: 10px;
  margin-left: 100px;
  overflow: auto;
}

.box::-webkit-scrollbar {
  //设置整个滚动条宽高
  width: 0;
  height: 100%;
}
.box::-webkit-scrollbar-thumb {
  //设置滑块
  width: 0;
}

.title {
  position: absolute;
  z-index: 1;
  line-height: 50px;
  background: #289af8;
  width: 100%;
  height: 50px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  text-align: center;
  letter-spacing: 5px;
  span {
    color: #ffffff;
    font-size: 24px;
  }
}

tr {
  display: block;
  width: 100%;
  margin-top: 70px;
}

td {
  width: 94%;
  margin-left: 2%;
  text-align: center;
  display: block;
}
</style>
