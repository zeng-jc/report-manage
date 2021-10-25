<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :breadcrumbItem="['系统管理', '账户管理']" />
    <el-card> </el-card>
  </div>
</template>

<script>
/**
 * 公共组件
 */
import Breadcrumb from 'components/Breadcrumb'
export default {
  name: 'Account',
  components: {
    Breadcrumb,
  },
}
</script>

<style lang="less" scoped>
</style>