 <template>
  <div class="item">
    <div class="title-text">
      <span style="text-align: center;font-weight: 600">{{title}}</span>
      <div></div>
      <span style="padding-left: 10px;">{{start_time}}</span>
      <span style="padding-left: 10px;">至</span>
      <span style="padding-left: 10px">{{end_time}}</span>
      <div></div>
      <span>共</span>
      <span style="padding-left: 10px;font-weight: 600">{{distance}}</span>
      <span style="padding-left: 10px">天</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "TimeItem",
  props: ["title", "distance", "start_time", "end_time"],
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.item {
  border-radius: 10px;
  margin-top: 20px;
  height: 100%;
  margin-left: 3%;
  background: #ffffff;
  .title-text {
    padding: 15px;
    color: #000000;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
