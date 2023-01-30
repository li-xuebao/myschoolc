<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">{{ schoolName }}{{ username }} 你好</el-col>
      <el-col :span="8">您的身份证号为： {{ userCard }}</el-col>
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          ref="upload"
          accept=".xls, .xlsx"
          action="#"
          name="file"
          :limit="1"
          :multiple="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :http-request="uploadHttpRequest"
          :on-change="handleChange"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="block">
          <el-date-picker
            v-model="yearandmonth"
            type="month"
            placeholder="选择年月"
            format="yyyy 年 M 月"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6"> </el-col>
      <el-col :span="6"> </el-col>
      <el-col :span="6">
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delAllSelect"
          :disabled="multipleSelection.length === 0"
        >
        </el-button
      ></el-col>
    </el-row>

    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        :row-key="
          (row) => {
            return row.idsalary
          }
        "
      >
        <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column>
        <el-table-column prop="idsalary" label="ID" width="60">
        </el-table-column>

        <el-table-column prop="schoolName" label="学校名称" width="120">
        </el-table-column>

        <el-table-column prop="monthId" label="月序" width="50">
        </el-table-column>

        <el-table-column prop="wgYear" label="年份" width="60">
        </el-table-column>

        <el-table-column prop="wgMonth" label="月份" width="50">
        </el-table-column>

        <el-table-column prop="userName" label="姓名" width="80">
        </el-table-column>

        <el-table-column prop="grade" label="年级" width="60">
        </el-table-column>

        <el-table-column prop="card" label="身份证号" width="180">
        </el-table-column>

        <el-table-column prop="subject" label="科目" width="60">
        </el-table-column>

        <el-table-column prop="baseWage" label="基本工资" width="60">
        </el-table-column>

        <el-table-column prop="classPay" label="课时工资" width="60">
        </el-table-column>

        <el-table-column prop="meritPay" label="绩效工资" width="60">
        </el-table-column>

        <el-table-column prop="jobSubsidies" label="岗位津贴" width="60">
        </el-table-column>

        <el-table-column prop="otherWage" label="其它补助" width="60">
        </el-table-column>

        <el-table-column prop="deduct" label="扣除部分" width="60">
        </el-table-column>

        <el-table-column prop="schoolTotal" label="校发合计" width="60">
        </el-table-column>

        <el-table-column prop="insurannce" label="五险个人" width="60">
        </el-table-column>

        <el-table-column prop="funds" label="公积个人" width="60">
        </el-table-column>

        <el-table-column prop="succour" label="大病救助" width="60">
        </el-table-column>

        <el-table-column prop="cash" label="现金已发" width="60">
        </el-table-column>

        <el-table-column prop="insurannceTotal" label="五险一金" width="60">
        </el-table-column>

        <el-table-column prop="personalTax" label="个所得税" width="60">
        </el-table-column>

        <el-table-column prop="bonus" label="金额" width="60">
        </el-table-column>

        <el-table-column prop="bonusTax" label="个税" width="60">
        </el-table-column>

        <el-table-column prop="actualAmount" label="银行实发" width="60">
        </el-table-column>
      </el-table>
    </el-row>
    <!--底部导航-->
  </div>
</template>

<script>


export default {
  name: "SalaryImport",
  components: {},
  data() {
    return {
      username: '', //用户名
      userCard: '', //用户身份证号
      wgrole: '', //用户角色
      schoolName: '', //学校名字
      yearandmonth: '', //年份与月份选择

      file: '', //导入文件
      fileList: [], //导入文件数组

      tYear: 0, //年份选项值
      tMonth: 0, //年份选项值

      tableData: [], //表格显示数据

      multipleSelection: [], //选中的行所有数据集合
    }
  },
  watch: {
    //监视年月变化
    yearandmonth(val) {
      this.tYear = val.getFullYear()
      this.tMonth = val.getMonth() + 1
      console.log(this.tYear)
      console.log(this.tMonth)
      this.selectSalaryByMonth(this.schoolName, this.tYear, this.tMonth)
    },
  },
  mounted() {
    this.username = this.$store.state.userInfo.username //用户姓名
    this.userCard = this.$store.state.userInfo.card //用户身份证号
    this.wgrole = this.$store.state.userInfo.wgrole //用户角色
    this.schoolName = this.$store.state.userInfo.schoolName //学校名称
  },
  methods: {
    //按年月查询工资项
    selectSalaryByMonth(schoolName, wgYear, wgMonth) {
      this.$axios({
        method: 'GET',
        url: '/salarybymonth',
        params: { schoolName, wgYear, wgMonth },
      }).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        } else {
          this.tableData = []
          this.$toast(res.data.message)
        }
      })
    },

    // 点击上传：手动上传到服务器，此时会触发组件的http-request
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(fileList.length)
      this.fileList = fileList
    },
    // 文件上传成功时的钩子
    handleSuccess() {
      this.$message.success('文件上传成功')
    },
    // 文件上传失败时的钩子
    handleError() {
      this.$message.error('文件上传失败')
    },
    handlePreview(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]] // 展示最后一次选择的文件
      }
    },
    // 上传文件之前的钩子：判断上传文件格式、大小等，若返回false则停止上传
    beforeUpload(file) {
      //文件类型
      const isType = file.type === 'application/vnd.ms-excel'
      const isTypeComputer =
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const fileType = isType || isTypeComputer
      if (!fileType) {
        this.$message.error('上传文件只能是xls/xlsx格式！')
      }
    },
    // 自定义上传方法，param是默认参数，可以取得file文件信息，具体信息如下图
    uploadHttpRequest(param) {
      if (this.fileList.length === 0) {
        this.$toast('请上传文件')
      } else {
        let form = new FormData()

        form.append('salaryExcelFile', param.file)
        this.$axios({
          method: 'Post',
          url: '/salaryimport',
          // 请求头比较重要
          headers: {
            'Content-type': 'multipart/form-data',
          },
          data: form,
        }).then((res) => {
          this.fileList = []
          if (res.data.code == 200) {
            param.onSuccess()
            console.log(res.data.message)
            this.$toast('文件上传成功')
            this.fileList = []
          } else {
            param.onError() //上传失败的文件会从文件列表中删除
            this.$toast('文件上传失败')
          }
        })
      }
    },

    //选择按钮事件
    handleSelectionChange(val) {
      //console.log(val) //打印选中的行所有数据集合
      this.multipleSelection = val
    },

    //点击行触发，选中或不选中复选框
    handleRowClick(row, column, event) {
      this.$refs.handSelectTest_multipleTable.toggleRowSelection(row)
      console.log(row) //打印的时当前选中的行
      console.log(column) //打印的时当前选中的行
      console.log(event) //打印的时当前选中的行
    },
    //点击批量删除

    delAllSelect() {
      //遍历点击选择的对象集合，拿到每一个对象的id添加到新的集合中
      let idList = this.multipleSelection.map((item) => item.idsalary)
      //this.multipleSelection.forEach((row) => idList.push(row.idsalary))
      let params = { idList }
      console.log(idList)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios({
            method: 'delete',
            url: '/salarydeletebyid',
            params,
            
          }).then((res) => {
            if (res.data.code == 200) {
              this.$toast(res.data.message)
            } else {
              this.$toast(res.data.message)
            }
            this.selectSalaryByMonth(this.schoolName, this.tYear, this.tMonth) //重新加载查询月份的数据
          })
        })
        .catch(() => {
          this.$toast('已取消删除!')
        })
    },
  },
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
