<template>
  <section>
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="searchBox" class="demo-form-inline">
          <el-form-item label="id">
            <el-input v-model="searchBox.id" placeholder="id" style="width: 140px "></el-input>
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="searchBox.name" placeholder="name" style="width: 140px "></el-input>
          </el-form-item>
          <el-form-item label="category">
            <el-select v-model="searchBox.category" placeholder="请选择">
              <el-option v-for="(item, index) in searchBox.options" :label="item.label" :value="item.value"
                :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <a href="javascript: " id="download"
            style="background-color:#409EFF color: #fff padding: 12px 10px!important margin-left: 10px!important border-radius:4px "
            @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!--表格-->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="id" label="id" sortable>
          </el-table-column>
          <el-table-column prop="name" label="name" sortable>
          </el-table-column>
          <el-table-column prop="category" label="category" sortable>
          </el-table-column>
          <el-table-column prop="depict" label="depict" sortable>
          </el-table-column>
          <el-table-column prop="price" label="price" sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-wid th="80px">
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="category">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="depict">
          <el-input v-model="form.depict"></el-input>
        </el-form-item>
        <el-form-item label="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
      return {
        searchBox: {
          id: '',
          name: '',
          category: 'all',
          options: [],
        },
        tableData: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          name: '',
          category: '',
          depict: '',
          price: ''
        }
      }
    },
    created() {
      this.$http.get('/api/menu').then((response) => {
        response = response.data
        if (response.code === ERR_OK) {
          this.tableData = response.data
        }
      })
      this.$http.get('/api/menu/getcategory').then((response) => {
        response = response.data
        if (response.code === ERR_OK) {
          this.searchBox.options = response.data.map((currentValue, index, arr) => {
            return {
              "label": currentValue,
              "value": currentValue
            }
          })
          this.searchBox.options.unshift({
            "label": "all",
            "value": "all"
          })
        }
      })
    },
    methods: {
      onSubmit() {
        console.log(this.searchBox)
      },
      handleDelete(index, row) {
        this.$http.post('/api/menu/delete', {
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
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.form = Object.assign({}, row)
        this.table_index = index
      },
      handleSave() {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.$http.post('/api/menu/update', this.form).then((response) => {
            response = response.data
            if (response.code === ERR_OK) {
              this.editLoading = true
              this.tableData.splice(this.table_index, 1, this.form)
              this.$message({
                message: "操作成功！",
                type: 'success'
              })
              this.editLoading = false
              this.dialogFormVisible = false
            }
          })
        })
      },
      download() {
        let obj = document.getElementById('download')
        let str = "id,name,category,depict,price\n"
        for (let i = 0; i < this.tableData.length; i++) {
          let item = this.tableData[i]
          str += item.id + ',' + item.name + ',' + item.category + ',' + item.depict + ',' + item.price
          str += "\n"
        }
        str = encodeURIComponent(str)
        obj.href = "data:text/csv charset=utf-8,\ufeff" + str
        obj.download = "download.csv"
      }
    }
  }
</script>
<style>
  .el-pagination {
    text-align: center;
    margin-top: 30px
  }
</style>