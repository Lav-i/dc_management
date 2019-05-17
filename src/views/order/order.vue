<template>
  <section>
    <el-table :data="tableData" border borderstyle="width: 100%">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="编号" prop="id" sortable>
      </el-table-column>
      <el-table-column label="订单状态" prop="state" sortable>
      </el-table-column>
      <el-table-column label="桌号" prop="tableId" sortable>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" sortable>
      </el-table-column>
      <el-table-column label="总金额" prop="price" sortable>
      </el-table-column>
      <el-table-column label="可执行操作" width="300%">
        <template scope="scope">
          <el-button-group>
            <el-button type="primary" size="small"
              @click="handleEdit(scope.$index, scope.row, scope.row.state.replace('（正在呼叫服务员）',''))"
              :disabled="scope.row.state.indexOf('（正在呼叫服务员）')==-1">呼叫回执 </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row, '已接收')"
              :disabled="scope.row.state.indexOf('已点餐')==-1">接收订单</el-button>
          </el-button-group>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
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
          console.log(response.data)
          for (let i in response.data) {
            let price = 0
            for (let j in response.data[i].data) {
              price += response.data[i].data[j].price * response.data[i].data[j].count
            }
            response.data[i].price = price
          }
          this.tableData = response.data.reverse()
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
      handleEdit(index, row, state) {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http.post('/api/order/state', {
            id: row.id,
            state: state
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