<template>
  <div class="app-container">
    <el-page-header title="返回上一级" @back="goBack"></el-page-header>
    <!-- 搜索框部分-->
    <div>
      <span style="display: flex">
        <el-button type="primary" @click="dialogFormVisible = true">创建consumer Group</el-button>
<!--        <el-select v-model="value1" placeholder="consumer Group" style="padding-right: 20px;padding-left: 20px">-->
<!--          <el-option v-for="item in value1" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--        </el-select>-->
        <el-input v-model="input" placeholder="请输入consumer group name" style="width: 400px;padding-right: 30px;padding-left: 30px" clearable></el-input>
        <el-button type="primary" @click="searchByConsumerGroup()">查询</el-button>
      </span>
    </div>
    <p></p>


    <!--点击创建consumer Group，弹出的框-->
    <el-dialog title="创建consumer Group" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="conGroup" prop="Name" :label-width="formLabelWidth" required>
          <el-input v-model="ruleForm.Name" autocomplete="off" placeholder="0/64" maxlength="64"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div>1. 名字只能包含字母数字下划线和短划线(-)</div>
          <div>2. 名称在3-64个字符之间, 大于64个字符自动截取</div>
          <div>3. consumer Group名称一旦创建无法修改</div>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth" prop="label">
          <el-input v-model="ruleForm.Lable" autocomplete="off" placeholder="支持输入多个标签,以英文逗号(,)分离"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark" :label-width="formLabelWidth" required>
          <el-input v-model="ruleForm.Remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="submitForm('ruleForm')">创建</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>


    <!--点击消息状态，弹出的框-->
    <el-dialog title="消息状态" :visible.sync="dialogFormVisible2">
      <el-table :data="consumer.group" border style="width: 100%">
        <el-table-column prop="groupName" label="groupName" style="width: 50%"></el-table-column>
        <el-table-column prop="messageTotal" label="消息堆积总量" style="width: 50%"></el-table-column>
        <el-table-column prop="group_lasterConsumeTime" label="近期消费时间" style="width: 50%"></el-table-column>
      </el-table>
      <el-table :data="consumer.CGTopicInfoArr" border style="width: 100%">
        <el-table-column prop="topicName" label="Topic" style="width: 25%"></el-table-column>
        <el-table-column prop="store" label="堆积量" style="width: 25%"></el-table-column>
        <el-table-column prop="topicLasterConsumeTime" label="最近消费时间" style="width: 25%"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible2 = false">关闭</el-button>
      </div>
    </el-dialog>


    <!--点击重置消息位点，弹出的框-->
    <el-dialog title="重置消息位点" :visible.sync="dialogFormVisible3">
      <el-table border style="width: 100%">
        <el-table-column prop="name" label="consumer group" style="width: 50%"></el-table-column>
        <el-table-column prop="name" label="group1" style="width: 50%"></el-table-column>
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

    <!--  主页  -->
    <el-table v-loading="listLoading" :data="list1" element-loading-text="Loading">
      <el-table-column prop="id" align="center" label="id" width="70"></el-table-column>
      <el-table-column prop="clusterId" align="center" label="clusterId" width="100"></el-table-column>
      <el-table-column prop="name" align="center" label="Consumer Group Name" v-model="name_s" width="240"></el-table-column>
      <el-table-column prop="lable" label="标签" width="100" align="center"></el-table-column>
      <el-table-column prop="remark" class-name="status-col" label="备注" width="100" align="center"></el-table-column>
      <el-table-column v-if="show" prop="idDel" class-name="status-col" label="isDel" width="100" align="center"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="modifyTime" align="center" label="修改时间" width="150"></el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
        <el-button type="primary" @click="infoStatus(scope.row)" size="small">消息状态</el-button>
        <el-button type="primary" @click="reset(scope.row)" size="small">重置消息位点</el-button>
        <el-button type="primary" size="small">更多</el-button></template>
      </el-table-column>
    </el-table>
    <p></p>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage2" :current-page="page"
                     :page-size="pageSize" :total="total" :pager-count="7" :page-sizes="[5,10,15,20]" layout="sizes, prev, pager, next" background>
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
      value1:[],
      input: '',
      options: [],
      name_s:"",
      currentPage2: 0,
      page: 1,
      pageSize: 5,
      total: 0,
      pageNo:0,
      TotalPage:0,

      listLoading: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: '120px',
      show:false,
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
      paszi:0
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
    searchByConsumerGroup(page){
      this.$reqGet('http://219.141.189.24:8082/query_all', {
        clusterId: this.$route.query.id,
        pageNo: page ? page : this.page,
        pageSize: this.paszi,
        consumerGroup:this.input
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
    goBack() {
      this.$router.push({ path: '/dashboard'})
    },
    __init() {
      this.page = 1
      this.getList()
    },
    // 获取consumer group 列表数据
    getList(page) {
      this.$reqGet('http://219.141.189.24:8082/query_all', {
        clusterId: this.$route.query.id,
        pageNo: page ? page : this.page,
        pageSize: this.pageSize
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
            console.log(res)
            if(res.status == 200){
              this.resetForm(formName)
              this.dialogFormVisible = false
            }

          })
          // 请求成功后关闭弹框

        } else {
          console.log('创建过程中发生错误, 请重新尝试~')
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
        this.$reqPost('', {

        }).then(res => {
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
.el-page-header{
  padding-bottom: 15px;
}
</style>
