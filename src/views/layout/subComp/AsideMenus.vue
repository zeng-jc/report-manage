<template>
  <!-- 侧边栏 -->
  <el-aside :width="isCollapse ? '66px' : '220px'">
    <el-header class="logo">
      <img src="@/assets/logo.png" />
    </el-header>
    <div @click="toggleCollapse" class="toggleBtn">
      <p ref="collapseRef">|||</p>
    </div>
    <!-- 菜单 -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      unique-opened
      :default-active="activePath"
    >
      <el-menu-item index="/welcome" @click="setActiveMenu('/welcome')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 一级菜单 -->
      <el-submenu :index="i + ''" v-for="(item, i) in menus" :key="item.id">
        <!-- 文本、图标区域 -->
        <template slot="title">
          <i :class="icons[i]" id="menuIcon"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="`/${subItem.path}`"
          v-for="subItem in item.children"
          :key="subItem.id"
          @click="setActiveMenu(`/${subItem.path}`)"
        >
          <i class="el-icon-menu"></i>
          <span>{{ subItem.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import menus from 'common/menus'
export default {
  name: 'AsideMenus',
  data() {
    return {
      // 左侧菜单列表
      menus: null,
      // 菜单图标
      icons: [
        'iconfont icon-users',
        'iconfont icon-tijikongjian',
        'iconfont icon-shangpin',
        'iconfont icon-danju',
        'iconfont icon-baobiao',
      ],
      isCollapse: false,
      //当前活跃的地址
      activePath: '',
      total: '',
    }
  },

  created() {
    this.getMenus()
    //组件被创建的时候从 sessionStorage 中取出上一步存入的“活跃菜单地址”
    this.activePath = sessionStorage.getItem('activePath') || '/welcome'
  },

  methods: {
    //获取左侧菜单列表
    async getMenus() {
      // const { data: result } = await this.$http({
      //   url: 'menus',
      // })
      // if (result.status !== 200) {
      //   return this.$message.error(result.meta.msg)
      // }
      this.menus = menus
    },

    //展开折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.$refs.collapseRef.style = 'transform: rotate(90deg) translateX(2px)'
      } else {
        this.$refs.collapseRef.style = 'transform: rotate(0deg)'
      }
    },
    //设置当前活跃的菜单，并将其存入 sessionStorage 中
    setActiveMenu(activePath) {
      this.activePath = activePath
      sessionStorage.setItem('activePath', activePath)
    },
  },
}
</script>

<style lang="less" scoped>
// 侧边栏样式 --------------------------------
.el-aside {
  user-select: none; //双击不会选中文字
  .logo {
    background-color: #373d41;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      border-radius: 50%;
    }
  }
  .toggleBtn {
    background-color: #4a5064;
    color: #fff;
    cursor: pointer;
    letter-spacing: 0.2em;
    overflow: hidden;
    p {
      text-align: center;
      line-height: 20px;
      height: 24px;
      margin: 5px;
      transition: 0.5s;
      font-size: 14px;
    }
  }

  #menuIcon {
    margin-right: 10px;
    font-size: 20px;
  }
}
</style>