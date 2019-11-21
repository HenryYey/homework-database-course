<template>
  <div class="layout">
    <el-container style="height: 100vh;">
      <el-header class="layout-header">管理后台</el-header>
      <el-container>
        <Sidebar />
        <Main style="width: 100vw;"/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import  Sidebar  from './components/Sidebar.vue'
import  Main  from './components/Main.vue'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Main
  },
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;
  &-header{
    text-align: center;
    padding-top: 15px;
    letter-spacing: 3px;
    font-size: 26px;
    background: rgb(102, 176, 255);
    color:white;
  }
}

</style>
