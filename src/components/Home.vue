<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">{{ schoolName }} {{ username }} 你好</el-col>
      <el-col :span="8"
        >您的身份证号为：{{ userCard.substr(0, 3) }} ******
        {{ userCard.substr(-2) }}
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-menu :router="true">
          <el-menu-item index="/uers">用户管理</el-menu-item>
          <el-menu-item index="/teachers">教师管理</el-menu-item>
          <el-menu-item index="/uers">用户管理</el-menu-item>
          <el-menu-item index="/teachers">教师管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: '', //用户名
      userCard: '', //用户身份证号
      wgrole: '', //用户角色
      schoolName: '', //学校名字
    }
  },
  mounted() {
    this.username = this.$store.state.userInfo.username //用户姓名
    this.userCard = this.$store.state.userInfo.card //用户身份证号
    this.wgrole = this.$store.state.userInfo.wgrole //用户角色
    this.schoolName = this.$store.state.userInfo.schoolName //学校名称
  },
}
</script>

<style></style>
