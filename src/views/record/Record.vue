<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :breadcrumbItem="['报修管理', '报修记录']" />
    <el-card>
      <record-search />
      <record-list :recordList="recordList" />
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
      const { data: res } = await this.$http({
        url: '/record',
        params: this.recordParams,
      })
      if (res.status !== 200) {
        return this.$message.error('订单列表获取失败')
      }
      console.log(res.data)
      const record = res.data.record
      for (const item of record) {
        item.address = item.address + item.d_address
        const index = item.address.indexOf('/')
        if (index != -1) {
          item.address = item.address.slice(index + 1)
        }
      }
      this.recordList = record
      this.total = res.data.totalpage

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