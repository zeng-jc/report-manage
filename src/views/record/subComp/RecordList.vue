<template>
  <section>
    <!-- 用户列表区域 -->
    <el-table :data="recordList" border stripe>
      <!-- 下标 -->
      <el-table-column type="expand" width="50">
        <template v-slot:="props">
          <el-form label-position="left" label-width="100px">
            <el-form-item label="提交时间：">
              <span>{{ props.row.rp_time }}</span>
            </el-form-item>
            <el-form-item label="详细描述：">
              <span>{{ props.row.rp_describe }}</span>
            </el-form-item>
            <el-form-item label="是否解决">
              <el-link type="danger" v-if="props.row.rp_state === 0" @click="toHandle(props.row)">
                未解决，点击处理
              </el-link>
              <el-link type="success" v-else @click="toHandle(props.row)">已解决，点击查看</el-link>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 提交时间 -->
      <el-table-column label="提交时间" prop="rp_time" sortable width="150">
        <template v-slot:="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.rp_time.slice(0, 11) }}</span>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column label="姓名" sortable prop="u_name"> </el-table-column>
      <!-- 电话 -->
      <el-table-column label="电话" prop="u_mobile"> </el-table-column>
      <!-- 身份 -->
      <el-table-column label="身份" prop="u_identity"> </el-table-column>
      <!-- 地址 -->
      <el-table-column label="地址" prop="address"> </el-table-column>
      <!-- 状态 -->
      <el-table-column label="是否解决">
        <template v-slot:="scope">
          <el-tag type="danger" v-if="Number(scope.row.rp_state) === 0">
            <el-link type="danger" @click="toHandle(scope.row)">未解决</el-link>
          </el-tag>
          <el-tag type="success" v-else>
            <el-link type="success" @click="toHandle(scope.row)">已解决</el-link>
          </el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template v-slot:="scope">
          <!-- 编辑 -->
          <!-- <el-button type="primary" icon="el-icon-edit" size="small "></el-button> -->
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" size="small " @click="deleteRecord(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  name: 'RecordList',
  props: {
    // 所有用户数据
    recordList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      //当前用户ID
      curUserId: '',
    }
  },
  methods: {
    // 删除用户
    async deleteRecord({ u_id }) {
      const isDel = await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(err => err)

      if (isDel !== 'confirm') {
        return this.$message.info('删除以取消')
      }

      const { data: res } = await this.$http({
        method: 'delete',
        url: 'record/' + u_id,
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error('系统故障，删除失败!')
      }

      //调用父组件的 getUsers 方法
      this.$emit('getRecordList')
      this.$message.success('删除成功!')
    },

    toHandle({ u_id }) {
      this.$router.push('/report/handle/' + u_id)
    },
  },
}
</script>

<style lang="less" scoped>
.userInfoP {
  margin-bottom: 15px;
}

.el-form-item {
  margin-left: 15px;
  margin-bottom: 0;
  width: 50%;
}
</style>