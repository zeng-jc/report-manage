<template>
  <el-container class="layout-container">
    <!-- 菜单 -->
    <aside-menus></aside-menus>
    <el-container>
      <!-- 头部 -->
      <el-header style="box-shadow: 0 1px 4px rgb(0 21 41 / 8%); border-bottom: 1px solid rgb(0 21 41 / 8%)">
        <nav-bar> </nav-bar>
      </el-header>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from './subComp/NavBar.vue'
import AsideMenus from './subComp/AsideMenus.vue'

export default {
  name: 'Home',

  components: {
    NavBar,
    AsideMenus,
  },
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
}

.el-header {
  background-color: #fff;
}
</style>