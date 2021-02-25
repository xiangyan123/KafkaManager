<template>
  <div class="app-container">
    <el-page-header title="返回上一级" @back="goBack"></el-page-header>
    <el-form ref="form" :model="form" label-width="80px">
      <el-header>
        <el-form-item label="实例详情"></el-form-item>
      </el-header>
      <el-main>
        <el-col :span="11">
          <el-form-item label="实例ID:" prop="id">
            <template slot-scope="scope">{{ form.id }}</template>
          </el-form-item>
        </el-col>
        <el-form-item label="实例名称:" prop="name">
          <template slot-scope="scope">{{ form.name }}</template>
        </el-form-item>
        <el-col :span="11">
          <el-form-item label="实例类型:" prop="type">
            <template slot-scope="scope">{{ form.type }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="集群类型:" prop="groupType">
          <template slot-scope="scope">{{ form.groupType }}</template>
        </el-form-item>
        <el-col :span="11">
          <el-form-item label="流量规格:" prop="flowSize">
            <template slot-scope="scope">{{ form.flowSize }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="磁盘大小:" prop="diskSize">
          <template slot-scope="scope">{{ form.diskSize }}</template>
        </el-form-item>
        <el-col :span="11">
          <el-form-item label="磁盘类型:" prop="diskType">
            <template slot-scope="scope">{{ form.diskType }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="实例类型:" prop="VPCType">
          <template slot-scope="scope">{{ form.VPCType }}</template>
        </el-form-item>
        <el-col :span="11">
          <el-form-item label="VPC ID:" prop="VPCiD">
            <template slot-scope="scope">{{ form.VPCiD }}</template>
          </el-form-item>
        </el-col>
        <el-form-item label="VSwitch:" prop="VSwitch">
          <template slot-scope="scope">{{ form.VSwitch }}</template>
        </el-form-item>
      </el-main>
      <el-header>
        <el-form-item label="可用区"></el-form-item>
      </el-header>
      <el-main>
        <el-col :span="11">
          <el-form-item label="Topic数量:" prop="topic_count">
            <template slot-scope="scope">{{ form.topic_count }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="consumer_group_count:" prop="consumer_group_count">
          <template slot-scope="scope">{{ form.consumer_group_count }}</template>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="分区数量:" prop="partition_count">
            <template slot-scope="scope">{{ form.partition_count }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="公网流量:" prop="publicFlow">
          <template slot-scope="scope">{{ form.publicFlow }}</template>
        </el-form-item>
        <el-col :span="11">
          <el-form-item label="大版本:" prop="bigEdition">
            <template slot-scope="scope">{{ form.bigEdition }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="小版本:" prop="smallEdition">
          <template slot-scope="scope">{{ form.smallEdition }}</template>
        </el-form-item>

        <el-form-item label="地域:" prop="region">
          <template slot-scope="scope">{{ form.region }}</template>
        </el-form-item>

      </el-main>
      <el-header>
        <el-form-item label="运行状态"></el-form-item>
      </el-header>
      <el-main>
        <el-col :span="11">
          <el-form-item label="运行状态:" prop="runningCondition">
            <template slot-scope="scope">{{ form.runningCondition }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="付费类型:" prop="payType">
          <template slot-scope="scope">{{ form.payType }}</template>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="创建时间:" prop="creatTime">
            <template slot-scope="scope">{{ form.creatTime }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="是否自动续费:" prop="isAutoRenew">
          <template slot-scope="scope">{{ form.isAutoRenew }}</template>
        </el-form-item>
      </el-main>
      <el-header>
        <el-form-item label="配置信息"></el-form-item>
      </el-header>
      <el-main>
        <el-col :span="11">
          <el-form-item label="消息保留时常:" prop="msg_retain_time">
            <template slot-scope="scope">{{ form.msg_retain_time }}</template>
          </el-form-item>
        </el-col>

        <el-form-item label="最大消息大小:" prop="msg_size">
          <template slot-scope="scope">{{ form.msg_size }}</template>
        </el-form-item>
      </el-main>

      <el-header>
        <el-form-item label="安全配置"></el-form-item>
      </el-header>
      <el-main>
        <el-form-item label="白名单:" prop="whiteList">
          <template slot-scope="scope">{{ form.whiteList }}</template>
        </el-form-item>

        <el-form-item label="说明:"></el-form-item>
        <p>
          1.VPC接入：端口范围5466546456，默认白名单设置的VSwitch的网段，VPC此VSwitch可访问，设置为0.0.0.0既VPC内可通。
          2.支持单挑增加和单条删除，一次最多保存10条，每条之间用英文逗(,)号分隔,最多可保存100条。
          3.允许删除最后一条白名单，风险是Kafka集群此端口范围不可访问，请谨慎操作。
        </p>
      </el-main>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      url:process.env.VUE_APP_URL,
      id: '',
      form: {
        id: '',
        name: '',
        type: '',
        groupType: '',
        flowSize: '',
        diskSize: '',
        diskType: '',
        VPCType: '',
        VPCiD: '',
        VSwitch: '',
        topic_count: '',
        consumer_group_count: '',
        partition_count: '',
        publicFlow: '',
        bigEdition: '',
        smallEdition: '',
        region: '',
        runningCondition: '',
        payType: '',
        creatTime: '',
        isAutoRenew: '',
        msg_retain_time: '',
        msg_size: '',
        whiteList: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/dashboards'})
    },
    onSubmit() {
      console.log('submit!')
    },
    //请求数据的方法
    getData() {
      //url接口名字
      this.$reqGet('http://219.141.189.24:8082/cluster_info', {
        //传递参数
        clusterId:this.$route.query.id
      }).then(res => {
        if (res.data.data) {
          this.form = res.data.data
          this.$message({
            message: '查询成功',
            type: 'success',
            duration: 900
          })
        }
      }).catch(err=>{
        this.$message({
          message: err,
          type: 'error',
          duration: 2000
        })
      })
    }

  }
}
</script>
<style>
.el-header, .el-footer {
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
.el-page-header{
  padding-bottom: 15px;
}
</style>
