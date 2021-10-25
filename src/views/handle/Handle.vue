<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :breadcrumbItem="['报修管理', '报修处理']" />
    <el-card>
      <el-button type="primary" plain size="small" @click="$router.back('/report/record')">返回</el-button>
    </el-card>
  </div>
</template>

<script>
/**
 * 公共组件
 */
import Breadcrumb from 'components/Breadcrumb'
/**
 * 子组件组件
 */

export default {
  name: 'RpHandle',
  data() {
    return {
      u_id: '',
    }
  },
  created() {
    this.getReportInfo()
  },
  methods: {
    async getReportInfo() {
      this.u_id = this.$route.params.id
      // const { data: res } = await this.$http({
      //   url: '/record' + this.u_id,
      // })
      // if (res.status !== 200) {
      //   return this.$message.error('订单列表获取失败')
      // }
      // this.recordList = res.data.record
      // this.total = res.data.total
    },
  },
  components: {
    Breadcrumb,
  },
}
</script>

<style>
</style>