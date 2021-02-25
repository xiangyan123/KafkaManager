<template>
  <el-tabs v-model="activeName" class="big" @tab-click="handleClick">
    <el-page-header title="返回上一级" @back="goBack"></el-page-header>
    <el-header class="addHeader">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="input2" clearable placeholder="请输入Topic名称" style="width: 400px" @clear="showAdd">
            <el-button slot="append" icon="el-icon-search" @click="showAdd1"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-button type="primary" @click="add">新增规则</el-button>
      <!-- <el-button type="primary" @click="dialogFormVisible = true">新增规则</el-button> -->
    </el-header>
    <el-main>
      <el-table :data="tableDatass" border style="width: 100%">
        <el-table-column label="监控规则名称" prop="policyName"></el-table-column>
        <!--        <el-table-column label="所属应用id" prop="appId"></el-table-column>-->
        <el-table-column label="Topic名称" prop="topicName"></el-table-column>
        <el-table-column label="监控指标" prop="monitorItem"></el-table-column>
        <el-table-column label="报警级别" prop="alarmLevel"></el-table-column>
        <el-table-column label="监控时间" prop="monitoringTime"></el-table-column>
        <el-table-column label="通知方式" prop="informWay"></el-table-column>
        <el-table-column label="通知用户组id" prop="informGroup"></el-table-column>
        <el-table-column label="阈值比较类型" prop="compareRules"></el-table-column>
        <el-table-column label="阈值" prop="firstThreshold"></el-table-column>
      </el-table>
    </el-main>
    <p></p>
    <div class="block">
      <el-pagination :current-page="queryInfo.PageNo" :page-size="queryInfo.PageSize"
                     :page-sizes="[1,2,5,10]" :total="TotalCount"
                     background layout="total,sizes,prev,pager,next,jumper"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange" style="padding-left: 20px"
      ></el-pagination>
    </div>

  </el-tabs>
</template>
<script>

export default {
  data() {
    return {
      queryInfo: {
        PageNo: 1,
        PageSize: 5
      },
      TotalCount: 0,
      activeName: 'first',
      tableData: [{
        slid: '5',
        bjx: '未设置',
        bjqk: '报警项未开启'
      }],
      options: [{
        value: '选项1',
        label: '所有关联应用'
      }],
      value: '',
      input2: '',
      tableDatass: [],
      dialogTableVisible: false,
      restaurants: [],
      ovjs: [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
      ],
      timeout: null
    }

  },
  mounted() {
    if (this.$route.query.name == 'add') {
      this.activeName = 'add'
    } else {
      this.activeName = 'first'
    }
    this.restaurants = this.loadAll()
  },
  created() {
    this.showAdd()
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/dashboard'})
    },
    handleSizeChange(newSize) {
      this.queryInfo.PageSize = newSize
      this.showAdd()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.PageNo = newPage
      this.showAdd()
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
      ]
    },
    // 初始化新增
    showAdd() {
      this.$reqGet('http://219.141.189.24:8082/searchMonitoringInfo', {
        clusterId: this.$route.query.id,
        pageNo: this.queryInfo.PageNo,
        pageSize: this.queryInfo.PageSize
      }).then(res => {
        this.tableDatass = res.data.data.List
        this.queryInfo = res.data.data
        this.TotalCount = res.data.data.TotalCount
      }).catch(err => {
        return err
      })
    },
    showAdd1() {
      this.$reqGet('http://219.141.189.24:8082/searchMonitoringInfo', {
        clusterId: this.$route.query.id,
        pageNo: this.queryInfo.PageNo,
        pageSize: this.queryInfo.PageSize,
        topicName: this.input2
      }).then(res => {
        this.tableDatass = res.data.data.List
        this.queryInfo = res.data.data
        this.TotalCount = res.data.data.TotalCount
      }).catch(err => {
        return err
      })
    },
    querySearchAsync(queryString, cb) {
      let restaurants = this.ovjs
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    formatter(row, column) {
      return row.address
    },
    handleClick(tab, event) {

    },
    add() {
      let id = this.$route.query.id
      this.$router.push({ path: '/monitorings/add', query: { id: id } })
    }
  }
}


</script>
<style>
.big {
  padding-left: 30px;
}

.addHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.addHeader_left {
  width: 60%;
  display: flex;
}

.addHeader_left .use, .addHeader_left .name {
  display: flex;
  width: 50%;
  /* justify-content: space-between; */
  align-items: center;
}
</style>
