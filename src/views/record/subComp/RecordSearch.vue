<template>
  <el-row>
    <el-col :span="8">
      <el-input
        placeholder="请输入内容"
        v-model="inputValue"
        clearable
        @clear="getRecordList"
        class="input-with-select"
      >
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
    }
  },
  methods: {
    searchBtn() {
      if (this.inputValue === '') return this.$message.warning('请输入查询内容')
      this.$emit('query', this.inputValue)
      this.$emit('getRecordList')
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