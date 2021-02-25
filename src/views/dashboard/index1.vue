<template>
  <div class="dashboard-container">
    <template>
      <div>APP列表 总计：{{ amount }}</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="APPid" width="150"></el-table-column>
        <el-table-column prop="name" label="APP名称" width="250"></el-table-column>
        <el-table-column prop="isDeployed" label="是否已部署" width="150"></el-table-column>
        <el-table-column prop="groupType" label="集群类型" width="150"></el-table-column>
        <el-table-column prop="operation" label="操作" width="350">
          <template scope="scope">
            <el-button type="primary" size="small">部署</el-button>
            <el-button type="primary" size="small">释放</el-button>
            <el-button type="primary" size="small">工单</el-button>
            <el-button type="primary" size="small" @click="details(scope.row)">监控详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: [{
        id: '1',
        name: 'asdasdas',
        isDeployed: '未部署',
        groupType: 'VPC实例'
        }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    amount() {
      return this.tableData.length
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    details({id}) {
      // 把实例id传递给详情页面
      this.$router.push({name: 'instanceReview', params: {id}})
    },
    //请求数据的方法
    getData() {
      //url接口名字
      this.$reqPost("", {
        //传递参数
        id: this.id,
      }).then(res => {
        //返回的数据
        if (res.data.data) {
          //form赋值，然后页面上绑定数据
          this.tableData = res.data.data
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
