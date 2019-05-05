<template>
  <el-row class="container" style="height: 100%">
    <v-header :user="user"></v-header>
    <el-col :span="24" class="main">
      <el-row>
        <el-menu :default-active="$route.path" class="mar-l el-menu-vertical-demo el-col el-col-3" light router>
          <template v-for="(item,index) in $router.options.routes[0].children">
            <el-menu-item :key="index" :index="item.path"> <i class="fa" :class="item.class"></i>{{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
        <section class="contentCon">
          <el-col :span="21" :offset="3" class="content-wrapper">
            <transition>
              <router-view></router-view>
            </transition>
          </el-col>
        </section>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import header from './views/header/header.vue';
  export default {
    data() {
      return {
        user: {
          name: "name",
          identity: "炒鸡管理员"
        }
      }
    },
    beforeCreate() {
      if (this.$route.path === '/') {
        this.$router.push({
          path: '/index'
        })
      }
    },
    components: {
      'v-header': header
    },
    methods: {
      callWaiter(title, message) {
        this.$notify({
          title: title,
          message: message,
          duration: 10000
        })
      }
    },
    created() {
      setInterval(() => {
        this.$http.get('/api/order/findcall').then((response) => {
          for (let i in response.data.data) {
            this.callWaiter(response.data.data[i] + '号桌', '正在呼叫服务员')
          }
        })
      }, 10000)
    }
  };
</script>
<style>
  /* fa图标右侧需要流出空白 elementUI图标已自带样式 */
  i.fa {
    vertical-align: baseline;
    margin-right: 10px;
  }

  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    background-color: #F2F2F2;
  }

  .menu,
  .el-menu {
    height: 100%;
    background-color: #E6E6E6;
    position: fixed;
    float: left;
  }

  .container {
    padding-top: 80px;
    height: 100%;
  }

  .container .main {
    padding: 0;
  }

  .container ul li.el-menu-item {
    font-size: 100%;
  }

  .container .mar-l {
    padding: 0;
  }

  .container .content-wrapper {
    padding: 20px;
  }
</style>