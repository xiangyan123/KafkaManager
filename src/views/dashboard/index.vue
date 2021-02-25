<template>
  <div class="dashboard-container">
    <template>
      <div>
        实例列表 总计：{{ amount }}
        <span style="padding-left: 80%">
          <el-button type="primary" size="small" @click="dialogFormVisible = true">接入集群</el-button>
        </span>
      </div>
      <!-- 搜索框部分-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="input" clearable placeholder="请输入实例名称" @clear="getData">
            <el-button slot="append" icon="el-icon-search" @click="searchByTopicName"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="集群id" width="70"></el-table-column>
        <el-table-column prop="clusterName" label="实例名称" width="150"></el-table-column>
        <el-table-column prop="status" label="是否已部署" width="150"></el-table-column>
        <el-table-column prop="groupType" label="集群类型" width="150"></el-table-column>
        <el-table-column prop="operation" label="操作" width="600">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="details(scope.row.id)">实例详情</el-button>
            <el-button type="primary" size="small" @click="topicManage(scope.row.id)">Topic管理</el-button>
            <el-button type="primary" size="small" @click="consumerGroupManage(scope.row.id)">consumerGroup管理</el-button>
            <el-button type="primary" size="small" @click="addWaningManage(scope.row.id)">新增报警</el-button>
          </template>

        </el-table-column>
      </el-table>

      <!--点击接入集群弹框-->
      <el-dialog title="接入集群" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="集群名称" :label-width="formLabelWidth" required prop="clusterName">
            <el-input v-model="ruleForm.clusterName" autocomplete="off" placeholder="请输入集群名称"></el-input>
          </el-form-item>

          <el-form-item label="zookeeper地址" :label-width="formLabelWidth" required prop="zookeeper">
            <el-input type="textarea" v-model="ruleForm.zookeeper" autocomplete="off" placeholder="请输入zookeeper地址"></el-input>
          </el-form-item>

          <el-form-item label="bootstrapServers" :label-width="formLabelWidth" required prop="bootstrapServers">
            <el-input type="textarea" v-model="ruleForm.bootstrapServers" autocomplete="off" placeholder="请输入bootstrapServers"></el-input>
          </el-form-item>
          <el-form-item label="kafka版本" :label-width="formLabelWidth" required prop="kafkaVersion">
            <el-input v-model="ruleForm.kafkaVersion" autocomplete="off" placeholder="请输入集群名称"></el-input>
          </el-form-item>

          <el-form-item label="安全协议" :label-width="formLabelWidth" prop="securityProperties">
            <el-input type="textarea" v-model="ruleForm.securityProperties" autocomplete="off"
                      placeholder="请输入安全协议">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="accessCluster('ruleForm')">确认</el-button>
          <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      input:'',
      show:false,
      dialogFormVisible: false,
      formLabelWidth: '140px',
      ruleForm: {
        clusterName: '',
        zookeeper: '',
        bootstrapServers: '',
        kafkaVersion:'',
        securityProperties: ''
      },
      rules: {
        clusterName: [{
          required: true,
          message: '请输入集群名称',
          trigger: 'blur'
        }],
        zookeeper: [{
          required: true,
          message: '请输入zookeeper地址',
          trigger: 'blur'
        }],
        kafkaVersion: [{
          required: true,
          message: '请输入kafka版本',
          trigger: 'blur'
        }],
        bootstrapServers: [{
          required: true,
          message: '请输入bootstrapServers',
          trigger: 'blur'
        }]
      },
      tableData: [{
        id:0,
        clusterName: '',
        status: '',
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
    this.getData()
  },
  methods: {
    accessCluster(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.create1()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    create1() {
      //url接口名字
      this.$reqPost('http://219.141.189.24:8082/search', {
        ...this.ruleForm
        //传递参数，把需要传递参数拼接到这里，json格式
      }).then(res => {
        if (res.data) {
          this.resetForm()
        }
      })
      this.dialogFormVisible = false
    },
    topicManage(id){
      this.$router.push({name:'Topic',query: {id}})
    },
    consumerGroupManage(id){
      this.$router.push({name:'consumer_Group',query: {id}})
    },
    details(id) {
      this.$router.push({ name: 'detial', query: { id } })
    },
    addWaningManage(id){
      this.$router.push({ name: 'addWarning', query: { id } })
    },
    getData() {
      this.$reqGet('http://219.141.189.24:8082/cluster_list', {
        pageNo:1,
        pageSize:5,
      }).then(res => {
        if (res.data.data) {
          this.tableData = res.data.data.List
          //写死集群类型为VPC实例
          this.tableData.map(el=>{
            el["groupType"] = 'VPC实例'
          })
        }
      })
    },
    searchByTopicName(page) {
      this.$reqGet('http://219.141.189.24:8082/cluster_list', {
        pageNo:1,
        pageSize:5,
        clusterName:this.input
      }).then(res => {
        if (res.data.data) {
          this.tableData = res.data.data.List
          //写死集群类型为VPC实例
          this.tableData.map(el=>{
            el["groupType"] = 'VPC实例'
          })
        }
      })
    },
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
