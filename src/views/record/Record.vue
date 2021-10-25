<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :breadcrumbItem="['报修管理', '报修记录']" />
    <el-card>
      <record-search @getRecordList="getRecordList" @query="recordParams.query = $event" />
      <record-list :recordList="recordList" @getRecordList="getRecordList" />
      <pagination
        :total="total"
        :currentpage.sync="recordParams.currentpage"
        :pagesize.sync="recordParams.pagesize"
        @getDate="getRecordList"
        :pageSizeName="pageSizeName"
      />
    </el-card>
  </div>
</template>

<script>
/**
 * 公共工具
 */
import { dateFormart } from 'common/utils.js'
/**
 * 公共组件
 */
import Breadcrumb from 'components/Breadcrumb'
import Pagination from 'components/Pagination'
/**
 * 子组件组件
 */
import RecordSearch from './subComp/RecordSearch'
import RecordList from './subComp/RecordList'

export default {
  name: 'Record',
  data() {
    return {
      recordParams: {
        query: '',
        currentpage: 1,
        pagesize: 4,
      },
      recordList: [],
      total: 0,
      pageSizeName: 'record',
    }
  },
  created() {
    this.getRecordList()
  },
  methods: {
    // 获取报修记录列表
    async getRecordList() {
      console.log(this.recordParams.query)
      const { data: res } = await this.$http({
        url: '/record',
        params: this.recordParams,
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('订单列表获取失败')
      }
      this.recordList = res.data.record
      this.total = res.data.total

      this.recordList.forEach(item => {
        item.rp_time = dateFormart(item.rp_time)
      })
    },
  },
  components: {
    RecordSearch,
    Breadcrumb,
    RecordList,
    Pagination,
  },
}
</script>

<style lang="less" scoped>
</style>