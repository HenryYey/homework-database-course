 <template>
  <div>
    <el-aside width="200px" class="Sidebar">
      <el-menu :default-openeds="['1', '3']" default-active="/" :router="true">
        <el-submenu index="1">
          <el-menu-item-group title="数据库-实验3">
            <el-menu-item index="/course/time">计算时间</el-menu-item>
            <el-menu-item index="/course/table">表格</el-menu-item>
            <el-menu-item index="/course/log">日志查看</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="数据库-实验4">
            <el-menu-item index="/course/shop">商家</el-menu-item>
            <el-menu-item index="/course/report">销售报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
 
<script>
export default {
  name: "Sidebar"
};
</script>

<style lang="scss" scoped>
.Sidebar {
  background: rgb(100, 200, 255);
}
</style>
