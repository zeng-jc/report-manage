<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb :breadcrumbItem="['报修管理', '报修处理']" />
    <el-card>
      <el-button type="primary" plain size="small" @click="$router.back('/report/record')" style="margin-bottom: 10px">
        返回
      </el-button>
      <el-form ref="formRef" :model="form" label-width="130px" :rules="formRules">
        <el-form-item label="姓名：">
          <el-input placeholder="暂无数据" v-model="form.u_name" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="身份：">
          <el-input placeholder="暂无数据" v-model="form.u_identity" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input placeholder="暂无数据" v-model="form.u_mobile" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input placeholder="暂无数据" v-model="form.address" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="问题描述：">
          <el-input placeholder="暂无数据" v-model="form.rp_describe" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="处理日期：">
          <el-input placeholder="暂无数据" v-model="form.hd_time" :disabled="true"> </el-input>
        </el-form-item>

        <el-form-item label="处理结果：" prop="rp_result">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="重复提交会覆盖上一次的处理结果（必填）"
            v-model="form.rp_result"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="处理人：" prop="rp_handler">
          <el-input placeholder="请输入处理真实姓名（必填）" v-model="form.rp_handler"> </el-input>
        </el-form-item>
        <el-form-item label="是否解决：">
          <el-switch v-model="form.rp_state" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">表单提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/**
 * 公共组件
 */
import Breadcrumb from 'components/Breadcrumb'
/**
 * 公共工具
 */
import { dateFormart } from 'common/utils.js'

export default {
  name: 'RpHandle',
  data() {
    return {
      u_id: '',
      // 表单数据对象
      form: {
        u_name: '',
        u_mobile: '',
        address: '',
        rp_describe: '',
        u_identity: '',
        rp_handler: '',
        rp_state: '',
        rp_result: '',
        hd_time: '',
      },
      //表单的验证规则对象
      formRules: {
        rp_handler: [{ required: true, message: '请输入处理人姓名', trigger: 'blur' }],
        rp_result: [{ required: true, message: '请输处理结果', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getReportInfo()
  },
  methods: {
    // 获取单个用户信息
    async getReportInfo() {
      this.u_id = this.$route.params.id
      const { data: res } = await this.$http({
        url: '/record/' + this.u_id,
      })

      if (res.status !== 200) {
        return this.$message.error('用户信息获取失败')
      }
      this.form.u_name = res.data.u_name
      this.form.u_mobile = res.data.u_mobile
      this.form.address = res.data.address + '/' + res.data.d_address
      this.form.rp_describe = res.data.rp_describe
      this.form.u_identity = res.data.u_identity
      this.form.hd_time = dateFormart(res.data.hd_time)
      this.form.rp_handler = res.data.rp_handler
      this.form.rp_result = res.data.rp_result
      this.form.rp_state = res.data.rp_state === 0 ? false : true
    },
    // 提交修改
    onSubmit() {
      this.$refs.formRef.validate(async boo => {
        if (!boo) return
        const { data: res } = await this.$http({
          method: 'put',
          url: 'record/' + this.u_id,
          data: {
            rp_result: this.form.rp_result,
            rp_handler: this.form.rp_handler,
            hd_time: Date.parse(new Date()),
            rp_state: this.form.rp_state === false ? 0 : 1,
          },
        })

        if (res.status !== 200) {
          return this.$message.error('用户信息获取失败')
        }
        this.$message.success('编辑成功')
      })
    },
  },
  components: {
    Breadcrumb,
  },
}
</script>

<style>
</style>