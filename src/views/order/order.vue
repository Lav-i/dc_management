<template>
  <section>
    <el-table :data="tableData" border borderstyle="width: 100%">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="id" prop="id" sortable>
      </el-table-column>
      <el-table-column label="state" prop="state" sortable>
      </el-table-column>
      <el-table-column label="tableId" prop="tableId" sortable>
      </el-table-column>
      <el-table-column label="createTime" prop="createTime" sortable>
      </el-table-column>
      <el-table-column label="price" prop="price" sortable>
      </el-table-column>
      <el-table-column label="操作" width="300%">
        <template scope="scope">
          <el-button type="success" size="small" @click="handleCall(scope.$index, scope.row)">回执</el-button>
          <el-button type="primary" size="small" @click="handleFinish(scope.$index, scope.row)">完成</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  const ERR_OK = 0

  export default {
    created() {
      this.$http.get('/api/order').then((response) => {
        response = response.data
        if (response.code === ERR_OK) {
          for (let i in response.data) {
            let price = 0
            for (let j in response.data[i].data) {
              price += response.data[i].data[j].price * response.data[i].data[j].count
            }
            response.data[i].price = price
          }
          this.tableData = response.data
        }
      })
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http.post('/api/order/delete', {
            id: row.id
          }).then((response) => {
            response = response.data
            if (response.code === ERR_OK) {
              this.tableData.splice(index, 1)
              this.$message({
                message: "操作成功！",
                type: 'success'
              })
            }
          })
        })
      },
      handleCall(index, row) {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http.post('/api/order/state', {
            id: row.id,
            state: '已点餐'
          }).then((response) => {
            response = response.data
            if (response.code === ERR_OK) {
              console.log(response.data)
              this.tableData.splice(index, 1, response.data)
              this.$message({
                message: "操作成功！",
                type: 'success'
              })
            }
          })
        })
      },
      handleFinish(index, row) {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http.post('/api/order/state', {
            id: row.id,
            state: '已完成'
          }).then((response) => {
            response = response.data
            if (response.code === ERR_OK) {
              this.tableData.splice(index, 1, response.data)
              this.$message({
                message: "操作成功！",
                type: 'success'
              })
            }
          })
        })
      }
    },
    data() {
      return {
        tableData: []
      }
    },
  }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>