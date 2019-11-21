 <template>
  <div id="clock">
    <span class="date">{{ date }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>
 
<script>
export default {
  name: "Clock",
  data() {
    return {
      time: "",
      date: "",
      timerId: undefined
    };
  },

  created() {
    this.timerId = setInterval(this.updateTime, 1000);
  },
  watch: {},

  methods: {
    updateTime() {
      const cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " "
    },

    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>

<style lang="scss" scoped>
#clock {
  height: 200px;
  margin: 50px 595px ;
  width: 200px;
  font-family: "Share Tech Mono", monospace;
  color: #000000;
  text-align: center;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.date {
  font-size: 25px;
  margin-left: -64px;
}

#clock .time {
  letter-spacing: 0.05em;
  font-size: 64px;
  margin: 250px 0;
}
</style>
