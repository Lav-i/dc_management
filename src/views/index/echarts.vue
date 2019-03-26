<template>
  <div class="chart-container">
    <el-row>
      <el-col :span="12" class="chart chart_left">
        <div id="lineChart" style="height: 650px">图表加载失败</div>
      </el-col>
      <el-col :span="12" class="chart">
        <div id="barChart" style="height: 650px">图表加载失败</div>
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
        let option = {
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330],
            type: 'line'
          }]
        }
        myChart.setOption(option)
        myChart.hideLoading()
      },
      getBarChartInit() {
        const myChart = echarts.init(document.getElementById('barChart'))
        myChart.showLoading()
        let option = {
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330],
            type: 'bar'
          }]
        }
        myChart.setOption(option)
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