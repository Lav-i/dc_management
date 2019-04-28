<template>
  <section>
    <el-table :data="tableData" borderstyle="width: 100%">
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
      <el-table-column label="操作">
        <template scope="scope">
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
      },
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