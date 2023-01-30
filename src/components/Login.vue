<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex; justify-content: center; margin-top: 150px">
      <el-card style="width: 500px">
        <el-row type="flex" align="middle">
          <el-col :span="6">
            <el-image
              style="width: 80px; height: 80px"
              :src="require('@/assets/wg.png')"
              fit="fit"
            ></el-image>
          </el-col>
          <el-col :span="14">
            <h1>我校后台管理系统</h1>
          </el-col>
        </el-row>

        <table>
          <tr>
            <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
          </tr>
          <tr>
            <el-input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              @keydown.enter.native="doLogin"
            ></el-input>
            <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <el-button style="width: 450px" type="primary" @click="doLogin"
                >登录</el-button
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span>技术支持:微格科技 联系电话:13903925350</span>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobile: '',
      password: '',
    }
  },
  methods: {
    doLogin() {
      let url = '/loginbym'
      let sealecaData = { mobile: this.mobile, password: this.password }
      let userInfo
      this.$axios(url, { params: sealecaData }) //后端url和参数
        .then((res) => {
          if (res.data.code === 200) {
            userInfo = {
              id: res.data.data.id, //用户ID
              card: res.data.data.card, //用户身份证号
              username: res.data.data.username, //用户姓名
              permissions: res.data.data.permissions, //权限
              islisten: res.data.data.islisten, //听课节数
              mobile: res.data.data.mobile, //用户手机
              wgrole: res.data.data.wgRole, //取得用户角色
              schoolName: res.data.data.schoolName, //学校名字
              schoolNameFirst: res.data.data.schoolNameFirst, //学校名称首字母
            }
            this.$store.commit('setUserInfo', userInfo) //vuex存储用户基本信息
            this.$router.push('/home') // 跳转到首页
            //this.$router.replace({ name: 'Home' }) // 跳转到首页
          } else {
             this.$message.error(res.data.message) //用户名和密码不正确时返回提示信息
          }
        })
    },
  },
}
</script>
