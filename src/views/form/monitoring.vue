<template>
  <el-tabs v-model="activeName" class="big">
    <!--第一选项卡-->
    <el-tab-pane label="实例" name="first">
      <el-button type="primary">查看报警信息</el-button>

      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="slid" label="实例ID" width="180"></el-table-column>
        <el-table-column prop="bjx" label="是否配置报警项" width="180"></el-table-column>
        <el-table-column prop="bjqk" label="报警项情况" width="180"></el-table-column>
        <el-table-column prop="cz" label="操作">
          <el-button type="primary" @click="dialogVisible = true" size="small">查看监控</el-button>
        </el-table-column>
      </el-table>
      <br>
      <br>
      <el-container>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实际消息生产流量</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-full-screen"></i></el-button>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-refresh"></i></el-button>
          </div>
          <div id="chart1" style="width: 368px; height: 300px;"></div>

        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实际消息消费流量</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-full-screen"></i></el-button>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-refresh"></i></el-button>
          </div>
          <div id="chart2" style="width: 368px; height: 300px;"></div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实例磁盘使用率</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-full-screen"></i></el-button>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-refresh"></i></el-button>
          </div>
          <div id="chart3" style="width: 368px; height: 300px;"></div>
        </el-card>
      </el-container>

    </el-tab-pane>


    <!--第二选项卡-->
    <el-tab-pane label="Topic" name="second">
      <el-button type="primary">查看报警信息</el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="slid" label="Topic" width="180"></el-table-column>
        <el-table-column prop="slid" label="实例ID" width="180"></el-table-column>
        <el-table-column prop="bjx" label="是否配置报警项" width="180"></el-table-column>
        <el-table-column prop="bjqk" label="报警项情况" width="180"></el-table-column>
        <el-table-column prop="cz" label="操作">
          <el-button type="primary" @click="dialogVisible = true" size="small">查看监控</el-button>
        </el-table-column>
      </el-table>
      <br>
      <br>
      <el-container>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>topic消息生产流量</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-full-screen"></i></el-button>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-refresh"></i></el-button>
          </div>
          <div id="chart4" style="width: 368px; height: 300px;"></div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>topic消息消费流量</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-full-screen"></i></el-button>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-refresh"></i></el-button>
          </div>
          <div id="chart5" style="width: 368px; height: 300px;"></div>
        </el-card>
      </el-container>
    </el-tab-pane>

    <!--第三选项卡-->
    <el-tab-pane label="consumer Group" name="three">
      <el-button type="primary">查看报警信息</el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="consumerGroup" label="consumer group" width="180"></el-table-column>
        <el-table-column prop="slid" label="实例ID" width="180"></el-table-column>
        <el-table-column prop="bjx" label="是否配置报警项" width="180"></el-table-column>
        <el-table-column prop="bjqk" label="报警项情况" width="180"></el-table-column>
        <el-table-column prop="cz" label="操作">
          <el-button type="primary" @click="dialogVisible = true" size="small">查看监控</el-button>
        </el-table-column>
      </el-table>
      <br>
      <br>
      <el-container>
        <el-card class="box-card" style="width: 70%">
          <div slot="header" class="clearfix">
            <span>consumer group未消费消息总数</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-full-screen"></i></el-button>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-refresh"></i></el-button>
          </div>
          <div id="chart6" style="width: 100%; height: 300px;"></div>
        </el-card>
      </el-container>
    </el-tab-pane>

  </el-tabs>
</template>
<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [{
        slid: '5',
        bjx: '未设置',
        bjqk: '报警项未开启'
      }],
      options: [{
        value: '选项1',
        label: '所有关联应用'
      },],
      value: '',
      input2: '',
      tableDatass: [],
      dialogTableVisible: false,
      restaurants:[],
      timeout:  null
    }

  },
  mounted() {
    this.initChart()
  },
  created(){

  },
  methods: {
    // 初始化图标
    initChart() {
      let myChart1 = echarts.init(document.getElementById("chart1"));
      let myChart2 = echarts.init(document.getElementById("chart2"));
      let myChart3 = echarts.init(document.getElementById("chart3"));
      let myChart4 = echarts.init(document.getElementById("chart4"));
      let myChart5 = echarts.init(document.getElementById("chart5"));
      let option1 = {
        xAxis: {
          type: 'category',
          data: ['12.56.00', '12.58.00', '12.60.00', '1.00.00', '1.02.00', '1.04.00', '1.06.00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0.00, 0.20, 0.20, 0.10, 0.50, 1.00, 0.80],
          type: 'line'
        }]
      };

      let option2 = {
        xAxis: {
          type: 'category',
          data: ['12.56.00', '12.58.00', '12.60.00', '1.00.00', '1.02.00', '1.04.00', '1.06.00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0.00, 0.20, 0.10, 0.30, 0.20, 0.40, 0.30],
          type: 'line'
        }]
      };
      let option3 = {
        xAxis: {
          type: 'category',
          data: ['12.56.00', '12.58.00', '12.60.00', '1.00.00', '1.02.00', '1.04.00', '1.06.00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0.00, 0.20, 0.10, 0.30, 0.20, 0.40, 0.30],
          type: 'line'
        }]
      };
      let option4 = {
        xAxis: {
          type: 'category',
          data: ['12.56.00', '12.58.00', '12.60.00', '1.00.00', '1.02.00', '1.04.00', '1.06.00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0.00, 0.20, 0.10, 0.30, 0.20, 0.40, 0.30],
          type: 'line'
        }]
      };
      let option5 = {
        xAxis: {
          type: 'category',
          data: ['12.56.00', '12.58.00', '12.60.00', '1.00.00', '1.02.00', '1.04.00', '1.06.00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0.00, 0.20, 0.10, 0.30, 0.20, 0.40, 0.30],
          type: 'line'
        }]
      };
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
      myChart5.setOption(option5);
    },
  }
}


</script>
<style>
.big{
  padding-left: 30px;
}
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
  width: 410px;
}
.addHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.addHeader_left{
  width: 60%;
  display: flex;
}
.addHeader_left .use,.addHeader_left .name{
  display: flex;
  width:50%;
  /* justify-content: space-between; */
  align-items: center;
}
</style>
