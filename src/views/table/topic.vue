<template>
  <div class="app-container">
    <el-page-header title="返回上一级" @back="goBack"></el-page-header>
    <!-- 搜索框部分-->
    <div>
      <span style="display: flex;">
        <el-button type="primary" @click="dialogFormVisible = true">创建Topic</el-button>
        <el-select v-model="value3" clearable placeholder="Topic"
                   style="padding-left: 30px;padding-right: 30px;width: 400px" @change="change1" @clear="clearName"
        >
          <el-option v-for="item in options" :key="item.topicId" :label="item.topicName" :value="item.topicName"
          ></el-option>
        </el-select>
        <!--        <el-input v-model="input" placeholder="请输入Topic" style="width: 300px;padding-left: 20px;padding-right: 20px"></el-input>-->
        <el-button type="primary" @click="searchByTopicName()">查询</el-button>
      </span>
    </div>
    <!--  主页显示的部分  -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-if="show" label="Topic" prop="topicId" width="100px"></el-table-column>
      <el-table-column v-model="topicName" label="Topic名称" prop="topicName" width="250px"></el-table-column>
      <el-table-column label="标签" prop="lable" width="150px"></el-table-column>
      <el-table-column label="备注" prop="remark" width="150px"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="280px"></el-table-column>
      <el-table-column label="操作" prop="operate">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="sendTopicClickHandle(scope.row)">发送消息</el-button>
          <!--          <el-button type="primary" size="small" @click="partitionClickHandle(scope.row)">分区状态</el-button>-->
          <el-button size="small" type="primary" @click="searchTopicClusterInfoClickHandle(scope.row)">更多</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--点击创建Topic，弹出的框-->
    <el-dialog ref="createRef" :visible.sync="dialogFormVisible" title="创建Topic">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="Topic名称" prop="TopicName" required>
          <el-input v-model="ruleForm.TopicName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="标签" prop="Lable">
          <el-input v-model="ruleForm.Lable" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="实例" prop="ReplicationFactor" required>
          <el-input v-model.number="ruleForm.ReplicationFactor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注" prop="Remark" required>
          <el-input v-model="ruleForm.Remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="分区数" prop="Partition">
          <el-input v-model.number="ruleForm.Partition" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitHandle('ruleForm')">创建</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>


    <!--点击分区状态弹框-->
    <!--    <el-dialog :visible.sync="dialogVisible" width="60%">-->
    <!--      <div slot="title" class="header-title">-->
    <!--        <div>分区状态</div>-->
    <!--      </div>-->
    <!--      <template>-->
    <!--        <el-table :data="partition1" width="80%">-->
    <!--          <el-table-column prop="topic" label="topic" width="80px" align="center"></el-table-column>-->
    <!--          <el-table-column prop="partition" label="partition" width="80px" align="center"></el-table-column>-->
    <!--          <el-table-column prop="currentOffset" label="currentOffset" width="120px" align="center"></el-table-column>-->
    <!--          <el-table-column prop="lag" label="lag" width="80px" align="center"></el-table-column>-->
    <!--          <el-table-column prop="consumerId" label="consumerId" width="120px" align="center"></el-table-column>-->
    <!--          <el-table-column prop="host" label="host" width="180px" align="center"></el-table-column>-->
    <!--          <el-table-column prop="clientId" label="clientId" width="200px" align="center"></el-table-column>-->
    <!--        </el-table>-->
    <!--      </template>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button size="small" @click="dialogVisible = false">关闭</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

    <!--    点击发送消息弹框-->
    <el-dialog :visible.sync="dialogVisible2">
      <div slot="title" class="header-title">
        <div>发送消息</div>
      </div>
      <el-input v-model="sendMess.mes" placeholder="请输入要发送的消息"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="sendTopic()">发送</el-button>
        <el-button size="small" type="primary" @click="dialogVisible2 = false">关闭</el-button>
      </div>
    </el-dialog>

    <!--    点击更多弹框-->
    <el-dialog :visible.sync="dialogVisible3" width="90%">
      <div slot="title" class="header-title">
        <div>更多</div>
      </div>
      <el-table :data="TopicClusterInfo" row-key="id" style="width: 100%">
        <el-table-column label="id" prop="id" width="60px"></el-table-column>
        <el-table-column label="clusterId" prop="clusterId" width="100px"></el-table-column>
        <el-table-column label="name" prop="name" width="150px"></el-table-column>
        <el-table-column label="createTime" prop="createTime" width="200px"></el-table-column>
        <el-table-column label="modifyTime" prop="modifyTime" width="200px"></el-table-column>
        <el-table-column align="center" label="partitions" prop="partitions" width="500px"></el-table-column>
      </el-table>
    </el-dialog>


    <p></p>
    <div class="block">
      <el-pagination :current-page="page" :current-page.sync="currentPage2" :page-size="pageSize"
                     :page-sizes="[5,10,15,20]" :pager-count="7" :total="total" background
                     layout="sizes, prev, pager, next" @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { getList } from '@/api/table'

export default {
  show: false,
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      topicName: '',
      input: '',
      value3: '--选择实例名称--',

      currentPage2: 0,
      page: 1,
      pageSize: 5,
      pageSize1: 5,
      total: 0,
      pageNo: 1,
      TotalPage: 0,

      list: null,
      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      show: false,
      ruleForm: {
        TopicName: '',
        Lable: '',
        ReplicationFactor: '',
        Remark: '',
        Partition: ''
      },
      rules: {
        TopicName: [{
          required: true,
          message: '请输入topic',
          trigger: 'blur'
        },
          {
            min: 3,
            max: 64,
            message: '长度在3-64个字符之间',
            trigger: 'blur'
          }
        ],
        ReplicationFactor: [{
          required: true,
          message: '请输入instance',
          trigger: 'blur'
        }],
        Remark: [{
          required: true,
          message: '请输入note',
          trigger: 'blur'
        }]
      },
      formLabelWidth: '120px',
      // partition1: [{
      //   topic: '',
      //   partition: 0,
      //   currentOffset: 0,
      //   lag: 0,
      //   consumerId: '',
      //   host: '',
      //   clientId: ''
      // }],
      tableData: [{
        topicId: '5',
        topicName: 'dianqukafka_post-cn-nif10y',
        lable: '1',
        remark: '2',
        createTime: '2020年12月10日 12:00:00'
      }],
      sendMess: {
        mes: ''
      },
      TopicClusterInfo: [{
        id: '',
        clusterId: '',
        name: '',
        isInternal: '',
        isDel: '',
        createTime: '',
        modifyTime: '',
        partitions: [{
          id: '',
          leader: '',
          replicas: '',
          isr: '',
          offlineReplicas: ''
        }]
      }],
      options: [{
        topicId: '',
        topicName: ''
      }],
      searchName: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    change1(val) {
      this.searchName = val
    },
    clearName() {
      this.getList()
    },
    goBack() {
      this.$router.push({ path: '/dashboards' })
    },
    searchByTopicName(page, val) {
      if (this.searchName == '') {
        this.$message({
          message: '请选择实例名称',
          type: 'error',
          duration: 2000
        })
      } else {
        this.$reqGet('http://219.141.189.24:8082/searchTopicInfo', {
          clusterId: this.$route.query.id,
          pageNo: page ? page : this.page,
          pageSize: 5,
          topicName: this.searchName
        }).then(res => {
          const data = res.data.data
          if (data) {
            this.total = data.TotalCount
            this.pageSize1 = data.pageSize1
            this.pageNo = data.pageNo
            this.TotalPage = data.TotalPage
            this.tableData = data.List
            for (let t in this.tableData) {
              this.options[t] = this.tableData[t]
            }
            this.$message({
              message: '查询成功',
              type: 'success',
              duration: 1200
            })
          }
        })
      }
    },
    // getPartitionData(val) {
    //   this.$reqPost('http://219.141.189.24:8082/consumer_group_des', {
    //     ClusterId: this.$route.query.id,
    //     GroupName: val
    //   }).then(res => {
    //     if (res.data.data) {
    //       this.partition1 = res.data.data
    //     }
    //   })
    // },
    // 更换页码
    handleCurrentChange(page) {
      this.getList(page)
    },
    getList(page) {
      this.$reqGet('http://219.141.189.24:8082/searchTopicInfo', {
        clusterId: this.$route.query.id,
        pageNo: page ? page : this.page,
        pageSize: this.pageSize
      }).then(res => {
        const data = res.data.data
        if (data) {
          this.total = data.TotalCount
          this.pageSize = 5
          this.pageNo = data.pageNo
          this.TotalPage = data.TotalPage
          this.tableData = data.List
          for (let t in this.tableData) {
            this.options[t] = this.tableData[t]
          }
          sessionStorage.setItem('options', JSON.stringify(this.options))
        }
      })
    },
    sendTopicClickHandle(val) {
      this.topicName = val.topicName
      this.dialogVisible2 = true
    },
    searchTopicClusterInfoClickHandle(val) {
      this.topicName = val.topicName
      this.dialogVisible3 = true
      this.searchTopicClusterInfo()
    },
    sendTopic() {
      this.$reqGet('http://219.141.189.24:8082/sendTopic', {
        clusterId: this.$route.query.id,
        mes: this.sendMess.mes,
        topicName: this.topicName
      }).then(res => {
        if (typeof res.data.data == 'string') {
          this.$message({
            message: res.data.data,
            type: 'error',
            duration: 2000
          })
        } else {
          this.$message({
            message: '发送成功',
            type: 'success',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error',
          duration: 2000
        })
      })
      this.dialogVisible2 = false
      this.sendMess.mes = ''
    },
    searchTopicClusterInfo() {
      this.$reqGet('http://219.141.189.24:8082/searchTopicClusterInfo', {
        //传递参数
        clusterId: this.$route.query.id,
        topicName: this.topicName
      }).then(res => {
        //返回的数据
        if (res.data.data) {
          this.TopicClusterInfo = res.data.data
        }
      })
    },
    // 分区状态点击
    // partitionClickHandle(val) {
    //   this.dialogVisible = true
    //   this.getPartitionData(val.topicName)
    // },
    // 重置表单
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
    //创建
    submitHandle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createTopic()
        } else {
          return false
        }
      })
    },
    // 发送创建topic请求
    createTopic() {
      this.$reqPost('http://219.141.189.24:8082/createTopic', {
        ClusterId: this.$route.query.id,
        ...this.ruleForm
      }).then(res => {
        if (res.data.data) {
          console.log(typeof res.data.data)
          if (typeof res.data.data == 'string') {
            this.$message({
              message: res.data.data,
              type: 'error',
              duration: 3000
            })
          } else {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 3000
            })
          }
          this.resetForm()
        }
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error',
          duration: 3000
        })
      })
      this.dialogFormVisible = false
      this.getList()
    }
  }
}
</script>
<style>
.el-page-header {
  padding-bottom: 15px;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
