<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :breadcrumbItem="['报修管理', '报修统计']" />
    <el-card>
      <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
    </el-card>
  </div>
</template>

<script>
/**
 * 公共组件
 */
import Breadcrumb from 'components/Breadcrumb'
export default {
  name: 'Statistics',
  components: {
    Breadcrumb,
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '总报修次数统计' },
        tooltip: {},
        xAxis: {
          data: ['寝室', '实训楼', '教学楼'],
        },
        yAxis: {},
        series: [
          {
            name: '报修次数',
            type: 'bar',
            data: [5, 20, 66],
          },
        ],
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>