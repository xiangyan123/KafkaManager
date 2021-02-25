<template>
  <div class="app-container">
    <el-page-header title="返回上一级" @back="goBack"></el-page-header>
    <!-- 搜索框部分-->
    <div>
      <span style="display: flex">
        <el-button type="primary" @click="dialogFormVisible = true">创建consumer Group</el-button>
         <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="input" clearable placeholder="请输入Consumer Group Name" style="width: 400px;padding-left: 20px"
                    @clear="clearName"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchByConsumerGroup()"></el-button>
          </el-input>
        </el-col>
      </el-row>
      </span>
    </div>
    <p></p>

    <!--点击创建consumer Group，弹出的框-->
    <el-dialog :visible.sync="dialogFormVisible" title="创建consumer Group">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="conGroup" prop="Name" required>
          <el-input v-model="ruleForm.Name" autocomplete="off" maxlength="64" placeholder="0/64"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div>1. 名字只能包含字母数字下划线和短划线(-)</div>
          <div>2. 名称在3-64个字符之间, 大于64个字符自动截取</div>
          <div>3. consumer Group名称一旦创建无法修改</div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="标签" prop="label">
          <el-input v-model="ruleForm.Lable" autocomplete="off" placeholder="支持输入多个标签,以英文逗号(,)分离"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注" prop="Remark" required>
          <el-input v-model="ruleForm.Remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="submitForm('ruleForm')">创建</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>


    <!--点击消息状态，弹出的框-->
    <el-dialog :visible.sync="dialogFormVisible2" title="消息状态">
      <el-table :data="consumer.group" border style="width: 100%">
        <el-table-column label="groupName" prop="groupName" style="width: 50%"></el-table-column>
        <el-table-column label="消息堆积总量" prop="messageTotal" style="width: 50%"></el-table-column>
        <el-table-column label="近期消费时间" prop="group_lasterConsumeTime" style="width: 50%"></el-table-column>
      </el-table>
      <el-table :data="consumer.CGTopicInfoArr" border style="width: 100%">
        <el-table-column label="Topic" prop="topicName" style="width: 25%"></el-table-column>
        <el-table-column label="堆积量" prop="store" style="width: 25%"></el-table-column>
        <el-table-column label="最近消费时间" prop="topicLasterConsumeTime" style="width: 25%"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible2 = false">关闭</el-button>
      </div>
    </el-dialog>


    <!--点击重置消息位点，弹出的框-->
    <el-dialog :visible.sync="dialogFormVisible3" title="重置消息位点">
      <el-table border style="width: 100%">
        <el-table-column label="consumer group" prop="name" style="width: 50%"></el-table-column>
        <el-table-column label="group1" prop="name" style="width: 50%"></el-table-column>
      </el-table>
      <div style="display: flex; margin-top: 20px;">
        <span style="flex: 1;">Topic</span>
        <div style="flex: 4; ">
          <el-select v-model="options[0]" placeholder="全部Topic" style="width: 100%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <div style="margin-top: 20px;">
            <el-radio v-model="radio1" label="1">清除所有堆积消息，从最新位点开始消费</el-radio>
            <br><br>
            <el-radio v-model="radio1" label="2">按时间点进行消费位点重置</el-radio>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="resetInfo">确定</el-button>
        <el-button size="small" @click="dialogFormVisible3 = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible6" width="60%">
      <div slot="title" class="header-title">
        <div>分区状态</div>
      </div>
      <template>
        <el-table :data="partition1" width="80%">
          <el-table-column align="center" label="partition" prop="partition" width="80px"></el-table-column>
          <el-table-column align="center" label="currentOffset" prop="currentOffset" width="120px"></el-table-column>
          <el-table-column align="center" label="lag" prop="lag" width="80px"></el-table-column>
          <el-table-column align="center" label="consumerId" prop="consumerId" width="120px"></el-table-column>
          <el-table-column align="center" label="host" prop="host" width="180px"></el-table-column>
          <el-table-column align="center" label="clientId" prop="clientId" width="200px"></el-table-column>
        </el-table>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible6 = false">关闭</el-button>
      </div>
    </el-dialog>

    <!--  主页  -->
    <el-table v-loading="listLoading" :data="list1" element-loading-text="Loading">
      <el-table-column align="center" label="id" prop="id" width="40"></el-table-column>
      <el-table-column align="center" label="clusterId" prop="clusterId" width="100"></el-table-column>
      <el-table-column v-model="name_s" align="center" label="Consumer Group Name" prop="name" width="200"
      ></el-table-column>
      <el-table-column align="center" label="标签" prop="lable" width="70"></el-table-column>
      <el-table-column align="center" class-name="status-col" label="备注" prop="remark" width="70"></el-table-column>
      <el-table-column v-if="show" align="center" class-name="status-col" label="isDel" prop="idDel" width="100"
      ></el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime" width="200"></el-table-column>
      <el-table-column align="center" label="修改时间" prop="modifyTime" width="200"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="infoStatus(scope.row)">消息状态</el-button>
          <el-button size="small" type="primary" @click="reset(scope.row)">重置消息位点</el-button>
          <el-button size="small" type="primary" @click="partitionClickHandle1(scope.row)">分区状态</el-button>
          <el-button size="small" type="primary">更多</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import {
  getList
} from '@/api/table'

export default {
  data() {
    const validateGroupName = (rule, value, callback) => {
      console.log(value)
      const reg = /^[A-Za-z0-9]+$/
      if (!reg.test(value)) {
        return callback(new Error('group中包含非法字符,请修改后再试'))
      }
      callback()
    }
    return {
      partition1: [{
        topic: '',
        partition: 0,
        currentOffset: 0,
        lag: 0,
        consumerId: '',
        host: '',
        clientId: ''
      }],
      value1: [],
      input: '',
      options: [],
      name_s: '',
      currentPage2: 0,
      page: 1,
      pageSize: 5,
      total: 0,
      pageNo: 0,
      TotalPage: 0,

      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: '120px',
      show: false,
      radio1: '1',
      list1: [{
        id: '1',
        clusterId: '1',
        name: '1',
        lable: '',
        remark: '',
        idDel: '',
        createTime: '',
        modifyTime: ''
      }],
      form: [],
      consumer: {
        group: [{
          groupName: '',
          messageTotal: '',
          group_lasterConsumeTime: ''
        }],
        CGTopicInfoArr: [{
          topicName: '',
          store: '',
          topicLasterConsumeTime: ''
        }]
      },
      ruleForm: {
        Name: '',
        Lable: '',
        Remark: ''
      },
      rules: {
        Name: [{
          required: true,
          message: '请输入实例名称',
          trigger: 'blur'
        }],
        Remark: [{
          required: true,
          message: '请输入备注信息',
          trigger: 'blur'
        }]
      },
      paszi: 0,
      dialogVisible6: false
    }
  },
  created() {
    this.paszi = this.pageSize
    this.fetchData()
  },
  mounted() {
    this.__init()
  },
  methods: {
    partitionClickHandle1(val) {
      this.dialogVisible6 = true
      this.getPartitionData1(val.topicName)
    },
    getPartitionData1(val) {
      this.$reqPost('http://219.141.189.24:8082/consumer_group_des', {
        ClusterId: this.$route.query.id,
        GroupName: val
      }).then(res => {
        if (res.data.data) {
          this.partition1 = res.data.data
        }
      })
    },
    searchByConsumerGroup(page) {
      if (this.input == '') {
        this.$message({
          message: '请输入Consumer Group Name',
          type: 'error',
          duration: 2000
        })
      } else {
        this.$reqGet('http://219.141.189.24:8082/query_all', {
          clusterId: this.$route.query.id,
          pageNo: page ? page : this.page,
          pageSize: this.paszi,
          consumerGroup: this.input
        }).then(res => {
          const data = res.data.data
          if (data.List.length > 0) {
            this.total = data.TotalCount
            this.list1 = data.List
            this.pageSize = data.pageSize
            this.pageNo = data.pageNo
            this.TotalPage = data.TotalPage
            this.$message({
              message: '查询成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '未查询到数据',
              type: 'error',
              duration: 2000
            })
          }

        })
      }
    },
    goBack() {
      this.$router.push({ path: '/dashboards' })
    },
    __init() {
      this.page = 1
      this.getList()
    },
    clearName() {
      this.getList(this.page, this.paszi)
    },
    // 获取consumer group 列表数据
    getList(page, pagezie) {
      console.log(page)
      this.$reqGet('http://219.141.189.24:8082/query_all', {
        clusterId: this.$route.query.id,
        pageNo: page ? page : this.page,
        pageSize: this.pageSize || pagezie
      }).then(res => {
        const data = res.data.data
        if (data) {
          this.total = data.TotalCount
          this.list1 = data.List
          this.pageSize = data.pageSize
          this.pageNo = data.pageNo
          this.TotalPage = data.TotalPage
        }
      })
    },
    // 更换页码
    handleCurrentChange(page) {
      this.getList(page)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求
          this.$reqPost('http://219.141.189.24:8082/create_consumer_group', {
            ClusterId: Number(this.$route.query.id),
            ...this.ruleForm
          }).then(res => {
            if (typeof res.data.data == 'string') {
              this.$message({
                message: res.data.data,
                type: 'error',
                duration: 2000
              })
              this.resetForm(formName)
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: '发送成功',
                type: 'success',
                duration: 2000
              })
              this.resetForm(formName)
              this.dialogFormVisible = false
            }
          })
        } else {
          this.$message({
            message: res.data.data,
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    infoStatus(val) {
      this.dialogFormVisible2 = true
      this.$reqPost('http://219.141.189.24:8082/consumer_gourp_tatus', {
        ClusterId: this.$route.query.id,
        GroupName: val.name
      }).then(res => {
        if (res.data.data) {
          //接口返回的数据
          const {
            groupName,
            messageTotal,
            group_lasterConsumeTime,
            CGTopicInfoArr
          } = res.data.data
          this.consumer = {
            group: [{
              groupName,
              messageTotal,
              group_lasterConsumeTime
            }],
            CGTopicInfoArr
          }
        }
      })
    },
    requestAllTopic(val) {
      console.log(val)
      this.$reqPost('http://219.141.189.24:8082/consumer_group_topics', {
        ClusterId: this.$route.query.id,
        GroupName: val
      }).then(res => {
        if (res.data.data) {
          this.options = res.data.data
        }
      })
    },
    reset(val) {
      this.dialogFormVisible3 = true
      this.requestAllTopic(val.name)
    },
    resetInfo() {
      if (this.radio1 = '1') {
        this.$reqPost('http://219.141.189.24:8082/consumer_reset_offset', {
          ClusterId: this.$route.query.id,
          GroupName: 'group_test'
        }).then(res => {
          if (res.data.data) {
            const value = res.data.data
            alert(value)
          }
        })
        this.dialogFormVisible3 = false
      } else {
        this.$reqPost('', {}).then(res => {
          //返回的数据
          if (res.data.data) {
            //接口返回的数据
            const value = res.data.data
            alert(value)
          }
        })
        this.dialogFormVisible3 = false
      }
    }
  }
}
</script>
<style scoped>
.el-page-header {
  padding-bottom: 15px;
}
</style>
