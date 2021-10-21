<template>
  <section>
    <!-- 用户列表区域 -->
    <el-table :data="recordList" border stripe>
      <!-- 下标 -->
      <el-table-column type="index" width="50"> </el-table-column>
      <!-- 姓名 -->
      <el-table-column label="姓名" prop="u_name"> </el-table-column>
      <!-- 电话 -->
      <el-table-column label="电话" prop="u_mobile"> </el-table-column>
      <!-- 地址 -->
      <el-table-column label="地址" prop="address"> </el-table-column>
      <!-- 问题描述 -->
      <el-table-column label="问题描述" prop="rp_describe"> </el-table-column>
      <!-- 创建时间 -->
      <el-table-column label="创建时间" prop="rp_time"> </el-table-column>
      <!-- 状态 -->
      <el-table-column label="是否解决" width="80">
        <template v-slot:="slotProps">
          <!-- 
              elementUI对el-table-column这个元素内部设置了一个插槽(<slot>)
              并且在插槽上绑定了一个 :row 属性(v-bind动态绑定),值为当前当前表格整行的数据(值存储在子组件中)
              在当前的父级作用域中我们可以通过"slotProps"(作用域插槽)接收拿到子组件的值,变量名可自定义
            -->
          <el-switch v-model="slotProps.row.rp_state" @change="stateChange(slotProps.row)"> </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template v-slot:="editSlot">
          <!-- 编辑用户 -->
          <el-button type="primary" icon="el-icon-edit" size="small " @click="showDialog(editSlot.row)"></el-button>
          <!-- 删除用户 -->
          <el-button type="danger" icon="el-icon-delete" size="small " @click="deleteUser(editSlot.row)"></el-button>
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
    // 显示对话框（同时拿到当前用户信息）
    showDialog(curUser) {
      this.EditDialogVisible = true
      // 拿到当前修改的用户 id
      this.curUserId = curUser.id
      // 当前点击的用户信息赋给对话框中的表单
      this.editUserForm.username = curUser.username
      this.editUserForm.email = curUser.email
      this.editUserForm.mobile = curUser.mobile
    },

    // 设置用户状态
    async stateChange(userinfo) {
      const { data: result } = await this.$http({
        method: 'put',
        //这里的动态接口写法模仿的是vue的动态路由
        //这里 params 携带的是动态参数 key 需要与 api 接口中的 :id、:type 对应
        //你只需要保证携带的参数 key 需要与 api 接口中的 :xx 一致
        url: {
          name: 'userState',
          params: {
            id: userinfo.id,
            type: userinfo.mg_state,
          },
        },
      })

      if (result.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('用户状态修改失败')
      }
      this.$message.success(result.meta.msg)
    },

    // 删除用户
    async deleteUser({ id }) {
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(err => err)

      if (res !== 'confirm') {
        return this.$message.info('删除以取消')
      }

      const { data: result } = await this.$http({
        method: 'delete',
        url: {
          name: 'usersEdit',
          params: { id },
        },
      })

      if (result.meta.status !== 200) {
        return this.$message.error('系统故障，删除失败!')
      }
      //调用父组件的 getUsers 方法
      this.$emit('getUsers')
      this.$message.success('删除成功!')
    },
  },
}
</script>

<style lang="less" scoped>
.userInfoP {
  margin-bottom: 15px;
}
</style>