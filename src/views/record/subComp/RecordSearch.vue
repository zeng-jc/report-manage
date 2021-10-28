<template>
  <el-row>
    <el-col :span="9">
      <el-input
        placeholder="请输入内容"
        v-model="inputValue"
        clearable
        @clear="getRecordList"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="u_name"></el-option>
          <el-option label="电话" value="u_mobile"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'RecordSearch',
  data() {
    return {
      inputValue: '',
      select: '',
    }
  },
  methods: {
    searchBtn() {
      if (this.select === '') return this.$message.warning('请选择查询选项')
      if (this.inputValue === '') return this.$message.warning('请输入查询内容')
      const obj = {}
      obj[this.select] = this.inputValue
      this.$emit('query', obj)
      this.$emit('getRecordList')
      this.$message.success('搜索成功')
    },
    getRecordList() {
      this.$emit('query', '')
      this.$emit('getRecordList')
    },
  },
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
.el-select {
  width: 90px;
}
</style>