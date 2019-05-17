<template>
  <section>
    <el-table :data="tableData" border borderstyle="width: 100%">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="编号" prop="id" sortable>
      </el-table-column>
      <el-table-column label="名称" prop="name" sortable>
      </el-table-column>
      <el-table-column label="桌号" prop="tableId" sortable>
      </el-table-column>
      <el-table-column label="数量" prop="count" sortable>
      </el-table-column>
      <el-table-column label="可执行操作">
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  const ERR_OK = 0

  export default {
    created() {
      this.$http.get('/api/order/findtodo').then((response) => {
        response = response.data
        if (response.code === ERR_OK) {
          console.log(response.data)
          let todoList = []
          for (let i in response.data) {
            for (let j in response.data[i].data) {
              if (!response.data[i].data[j].finish) {
                todoList.push({
                  menuId: response.data[i].id,
                  id: response.data[i].data[j].id,
                  name: response.data[i].data[j].name,
                  count: response.data[i].data[j].count,
                  tableId: response.data[i].tableId
                })
              }
            }
          }
          this.tableData = todoList
        }
      })
    },
    methods: {
      handleEdit(index, row) {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http.get('/api/order/finishitem', {
            params: {
              id: row.id,
              menuId: row.menuId
            }
          }).then((response) => {
            response = response.data
            if (response.code === ERR_OK) {
              console.log(response.data)
              this.tableData.splice(index, 1)
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