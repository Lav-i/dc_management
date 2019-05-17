<template>
  <div class="chart-container">
    <el-row>
      <el-col :span="12" class="chart chart_left">
        <div id="lineChart" style="height: 420px">图表加载失败</div>
      </el-col>
      <el-col :span="12" class="chart">
        <div id="barChart" style="height: 420px">图表加载失败</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    methods: {
      // 加载用户来源图
      getLineChartInit() {
        const myChart = echarts.init(document.getElementById('lineChart'))
        myChart.showLoading()
        this.$http.get('/api/order/month', {
          params: {
            months: 5
          }
        }).then((response) => {
          response = response.data
          if (response.code === 0) {
            let xData = []
            let yData = []
            for (let i in response.data) {
              xData.push(response.data[i].monthBefore)
              yData.push(response.data[i].price)
            }
            let option = {
              xAxis: {
                type: 'category',
                data: xData.map((val) => {
                  let month = new Date().getMonth() + 13 - val
                  return month > 12 ? month % 12 + "月" : month + "月"
                }),
                name: '时间（月）'
              },
              yAxis: {
                type: 'value',
                name: '销售额（元）'
              },
              tooltip: {
                trigger: 'axis'
              },
              title: {
                text: '近半年销售业绩',
                textAlign: 'left'
              },
              series: [{
                name: "销售额（元）",
                data: yData,
                type: 'line',
                markLine: {
                  data: [{
                    type: 'average'
                  }]
                }
              }]
            }
            myChart.setOption(option)
          }
        })
        myChart.hideLoading()
      },
      getBarChartInit() {
        const myChart = echarts.init(document.getElementById('barChart'))
        myChart.showLoading()
        this.$http.get('/api/order/topitem', {
          params: {
            days: 12345
          }
        }).then((response) => {
          response = response.data
          if (response.code === 0) {
            let xData = []
            let yData = []
            for (let i in response.data) {
              xData.push(response.data[i].name)
              yData.push(response.data[i].count)
            }
            let option = {
              xAxis: {
                type: 'category',
                data: xData,
                name: '商品名'
              },
              yAxis: {
                type: 'value',
                name: '销售量（份）'
              },
              tooltip: {
                trigger: 'axis'
              },
              title: {
                text: '销售排行',
                textAlign: 'left'
              },
              series: [{
                name: "销售额（元）",
                data: yData,
                type: 'bar'
              }]
            }
            myChart.setOption(option)
          }
        })
        myChart.hideLoading()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getLineChartInit()
        this.getBarChartInit()
      })
    }
  }
</script>
<style>
  .chart {
    background-color: white;
    border-radius: 4px;
  }

  .chart_left {
    border-right: #F2F2F2 10px solid
  }
</style>