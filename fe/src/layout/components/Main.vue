 <template>
  <div>
    <el-main class="Main">
      <router-view></router-view>
    </el-main>
  </div>
</template>
 
<script>
export default {
  name: "Main"
};
</script>

<style lang="scss" scoped>
.Main {
  padding: 0;
  height: 100%;
  background: rgb(245, 245, 245);
}
</style>
