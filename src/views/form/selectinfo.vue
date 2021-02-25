<template>
  <div class="big">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="left: 30px">
      <el-tab-pane label="按位点查询" name="first">
        <el-select v-model="value1" placeholder="Topic" style="padding-right: 30px">
          <el-option v-for="item in options" :key="item.topicId" :label="item.topicName" :value="item.topicName"></el-option>
        </el-select>
        <el-input v-model="input" placeholder="输入分区" style="width: 300px;padding-right: 20px"></el-input>
        <el-input v-model="input1" placeholder="输入位点" style="width: 300px;padding-right: 20px"></el-input>
        <el-button type="primary" @click="searchByTopicName()">查询</el-button>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="partitionName" label="分区" width="250"></el-table-column>
          <el-table-column prop="site" label="位点" width="300"></el-table-column>
          <el-table-column prop="createTime" label="时间" width="300"></el-table-column>
          <el-table-column prop="cz" label="操作">
            <el-button type="primary" @click="dialogVisible = true" size="small">消息详情</el-button>
          </el-table-column>
        </el-table>

        <!--点击消息详情，弹出的框-->
        <el-dialog title="信息" :visible.sync="dialogVisible" width="30%">
          <el-table :data="tableData" style="width: 400px">
            <el-table-column prop="key" label="Key(大小:3B)" width="180"></el-table-column>
            <el-table-column prop="value" label="Value(大小:3B)" width="160"></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="downLoadMsg">下载消息</el-button>
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>

      <!--第二选项卡开始-->
      <el-tab-pane label="按位点查询" name="second">
        <el-select v-model="value2" placeholder="Topic" style="padding-right: 30px">
          <el-option v-for="item in options1" :key="item.topicId" :label="item.topicName" :value="item.topicName"></el-option>
        </el-select>
        <el-input v-model="input2" placeholder="输入分区" style="width: 300px;padding-right: 20px"></el-input>
        <el-input v-model="input3" placeholder="输入时间，如输入：2021-01-21" style="width: 300px;padding-right: 20px"></el-input>
        <el-button type="primary" @click="searchByTopicTime()">查询</el-button>

        <el-table :data="tableData1" style="width: 100%">
          <el-table-column prop="partitionName" label="分区" width="250"></el-table-column>
          <el-table-column prop="site" label="位点" width="300"></el-table-column>
          <el-table-column prop="createTime" label="时间" width="300"></el-table-column>
          <el-table-column prop="cz" label="操作">
            <el-button type="primary" @click="dialogVisible1 = true" size="small">消息详情</el-button>
          </el-table-column>
        </el-table>

        <!--点击消息详情，弹出的框-->
        <el-dialog title="信息" :visible.sync="dialogVisible1" width="30%">
          <el-table :data="tableData1" style="width: 400px">
            <el-table-column prop="key" label="Key(大小:3B)" width="180"></el-table-column>
            <el-table-column prop="value" label="Value(大小:3B)" width="160"></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="downLoadMsg">下载消息</el-button>
            <el-button size="small" @click="dialogVisible1 = false">取 消</el-button>
            <el-button size="small" type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1:'--选择实例名称--',
        value2:'--选择实例名称--',
        value3:'',
        value4:'',
        input3:'',
        input2:'',
        input1:'',
        input:'',

        currentPage2: 0,
        page: 1,
        pageSize: 5,
        pageSize1: 5,
        total: 0,
        pageNo: 1,
        TotalPage: 0,

        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        options1: [{
          value: '选项1',
          label: '黄金糕'
        }],
        activeName: 'first',
        tableData: [{
          partitionName: '',
          site: '',
          createTime: '',
          key:'',
          value:''
        }],
        tableData1: [{
          partitionName: '',
          site: '',
          createTime: '',
          key:'',
          value:''
        }],
        dialogVisible: false,
        dialogVisible1: false,
      }
    },
    created() {
      this.options = JSON.parse(sessionStorage.getItem('options'))
      this.options1 = JSON.parse(sessionStorage.getItem('options'))
    },
    methods: {
      searchByTopicTime(page){
        if(this.value2 !== '--选择实例名称--') {
          this.$reqGet('http://219.141.189.24:8082/collectInformationTime', {
            topicName: this.value2,
            time: this.input3,
            partitionName: this.input,
            pageNo: page ? page : this.page,
            pageSize: 5,
          }).then(res => {
            const data = res.data.data
            if (data) {

              this.tableData1 = data.List
            }
          })
        }else {
          alert('请选择实例名称！')
        }
      },
      downLoadMsg(){
        this.$reqGet('http://219.141.189.24:8082/downloadInformation', {
          topicName: this.value1,
          site: this.input1,
          partitionName: this.input,
        }).then(res => {
          const code = res.data.code
          if (code == 200) {
            alert('下载成功！')
          }
        })
      },
      searchByTopicName(page) {
        if(this.value1 !== '--选择实例名称--') {
          this.$reqGet('http://219.141.189.24:8082/collectInformationSite', {
            topicName: this.value1,
            site: this.input1,
            partitionName: this.input,
            pageNo: page ? page : this.page,
            pageSize: 5,
          }).then(res => {
            const data = res.data.data
            if (data) {

              this.tableData = data.List
            }
          })
        }else {
          alert('请选择实例名称！')
        }
      },
      handleClick(tab, event) {

      },
      // //请求数据的方法
      // getData() {
      //   //url接口名字
      //   this.$reqPost("", {
      //
      //     id: this.id //传递参数
      //   }).then(res => {
      //     //返回的数据
      //     if (res.data.data) {
      //       //form赋值，然后页面上绑定数据
      //       this.tableData = res.data.data
      //     }
      //   });
      // }

    }
  }
</script>
<style>
  .big {
    padding-left: 30px;
  }
</style>
