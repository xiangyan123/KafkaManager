<template>
  <div class="add">
    <el-container>
      <el-header>
        <div>
          <el-page-header content="新建警告规则" title="" @back="goBack"></el-page-header>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-header>
      <el-main>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForms" style="    flex-wrap: wrap;">
          <!-- 基本信息 -->
          <el-card class="box-card">
            <div class="card-header">
              <div>基本信息</div>
            </div>

            <div style="width:100%;display:flex">
              <el-form-item label="告警规则名称:" prop="name" style="width:50%">
                <el-input v-model="ruleForm.name" placeholder="请输入告警规则名称"></el-input>
              </el-form-item>
              <!--                    <el-form-item label="所属应用:" prop="region" style="width:50%">-->
              <!--                         <el-select v-model="ruleForm.region" placeholder="" @change="selectRegion">-->
              <!--                            <el-option-->
              <!--                            v-for="item in region"-->
              <!--                            :key="item.value"-->
              <!--                            :label="item.label"-->
              <!--                            :value="item.value">-->
              <!--                            </el-option>-->
              <!--                        </el-select>-->
              <!--                    </el-form-item>-->
            </div>

          </el-card>
          <!-- 选择指标 -->
          <el-card class="box-card-index">
            <div class="card-header">
              <div>选择指标</div>
            </div>
            <el-form-item class="wrap" label="监控指标:" prop="control" style="width:100%;">
              <el-select v-model="ruleForm.control" @change="selectIndicator">
                <el-option
                  v-for="item in control"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div style="width:100%;display:flex">
              <el-form-item label="集群:" prop="group" style="width:50%">
                <el-select v-model="ruleForm.group">
                  <el-option
                    v-for="item in groupsss"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Topic:" prop="topic" style="width:50%">
                <el-select v-model="ruleForm.topic" placeholder="" @change="tipcClick">
                  <el-option
                    v-for="item in tiPC"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-card>
          <!-- 报警策略 -->
          <el-card class="box-card-celu">
            <div class="card-header">
              <div>报警策略</div>
            </div>
            <el-form ref="indicator" :model="strategy" :rules="strategyRules" class="demo-ruleForms frap">
              <el-form-item class="html_content" label="告警规则" prop="strategyData">
                <el-table
                  :data="strategyData"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    label="比较规则"
                    prop="compare"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.compare" prop="compare" @change="compareClick">
                        <el-option v-for="item in compareS" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="阈值"
                    prop="value"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.value"
                        class="input_height"
                        size="mini"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="compIup_sed"
                    label="阈值"
                    prop="value1"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.value1"
                        class="input_height"
                        size="mini"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="监控周期"
                    prop="week"
                  >
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.week" @change="weekClick">
                        <el-option v-for="item in giveWeek" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="警报级别"
                    prop="level"
                  >
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.level">
                        <el-option v-for="item in level" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item class="html_content" label="通知方式" prop="notifcVal">
                <el-select v-model="strategy.notifcVal" @change="notificationClick">
                  <el-option v-for="item in notification" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="html_content" label="通知对象" prop="notifyObject">
                <el-select v-model="strategy.notifyObject" @change="notifyObjectClick">
                  <el-option v-for="item in notifyObject" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
          <!-- 生效时间 -->
          <!-- <el-card class="box-card-celu">
              <div class="card-header">
                  <div>生效时间</div>
              </div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForms">
                  <el-form-item style="display:flex">
                      <span style="color:rgba(0,0,0,.35);margin-right:5px;font-family: PingFangSC-Regular;">在每</span>
                      <el-checkbox-group v-model="cityOptions">
                          <el-checkbox v-for="item in cityOptions" :key="item.value" :label="item.value" :checked="item.checked">{{item.value}}</el-checkbox>
                      </el-checkbox-group>
                       <span style="color:rgba(0,0,0,.35);margin-right:5px;margin-left:5px;font-family: PingFangSC-Regular;">的</span>
                       <el-time-select
                          placeholder="Select time"
                          v-model="startTime"
                          :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:59'
                          }">
                      </el-time-select>
                      <el-time-select
                          placeholder="Select time"
                          v-model="endTime"
                          :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '23:59',
                          minTime: startTime
                          }">
                      </el-time-select>
                  </el-form-item>
              </el-form>
          </el-card> -->
          <!-- 配置发送信息 -->
          <el-card class="box-card-celu">
            <div class="card-header">
              <div>配置发送信息</div>
            </div>
            <el-form ref="Alarm" :model="Alarm" :rules="AlarmRules" class="demo-ruleFormsas">
              <el-form-item class="Alarm" label="报警级别:" prop="name">
                <!-- <el-radio-group v-model="radio" > -->
                <div style="margin-right: 8px;">
                  <el-radio v-model="radio" label="1" @change="radioClick">一级警告</el-radio>
                  <svg-icon class="svg-img" icon-class="phone"/>
                  <svg-icon class="svg-img" icon-class="message"/>
                  <svg-icon class="svg-img" icon-class="mail"/>
                  <svg-icon class="svg-img" icon-class="dingding"/>
                </div>
                <div style="margin-right: 8px;">
                  <el-radio v-model="radio" label="2" @change="radioClick">二级警告</el-radio>
                  <svg-icon class="svg-img" icon-class="message"/>
                  <svg-icon class="svg-img" icon-class="mail"/>
                  <svg-icon class="svg-img" icon-class="dingding"/>
                </div>
                <div>
                  <el-radio v-model="radio" label="3" @change="radioClick">三级警告</el-radio>
                  <svg-icon class="svg-img" icon-class="mail"/>
                  <svg-icon class="svg-img" icon-class="dingding"/>
                </div>
                <!-- </el-radio-group> -->

              </el-form-item>
            </el-form>
          </el-card>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { addMonitoringInfo, searchTopicName } from '@/api/user'
import axios from 'axios'

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        control: '',
        group: '',
        topic: ''
        // strategyData:'',
        // compare:'',
        // value:'',
        // value1:''
      },
      rules: {
        name: [
          { required: true, message: '告警规则名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '所属应用', trigger: 'change' }
        ],
        control: [
          { required: true, message: '请选择监控指标', trigger: 'change' }
        ],
        group: [
          { required: true, message: '请选择集群', trigger: 'change' }
        ],
        topic: [
          { required: true, message: '请选择Topic', trigger: 'change' }
        ],
        compare: [
          { required: true, message: '请选择比较规则', trigger: 'change' }
        ]
      },
      Alarm: {
        name: ''
      },
      startTime: '',
      endTime: '',
      value: '周期发生-happen',
      suvue: '等于',
      intFocusFalge: false,
      intFocusFalgea: false,
      intFocusFalgeaa: false,
      intFocusFalges: true,
      intFocusFalgess: true,
      intFocusFalgesss: true,

      AlarmRules: {
        name: [
          { required: true, message: '报警级别', trigger: 'blur' }
        ]
      },
      strategy: {
        strategyData: '',
        notifcVal: '',
        notiObjVal: ''
      },
      groupsss: [
        {
          value: 1,
          label: 1
        }
      ],
      region: [
        {
          value: 10019,
          label: 'KM管理员'
        }
      ],
      strategyData: [
        {
          compare: '',
          value: '',
          value1: '',
          week: '',
          level: ''
        }
      ],
      strategyRules: {
        week: [
          { required: true, message: '监控指标', trigger: 'change' }
        ],
        svu: [
          { required: true, message: '监控指标', trigger: 'change' }
        ],
        input_one: [
          { required: true, message: '监控指标', trigger: 'blur' }
        ],
        input_two: [
          { required: true, message: '监控指标', trigger: 'blur' }
        ],
        input_three: [
          { required: true, message: '监控指标', trigger: 'blur' }
        ],
        notifcVal: [
          { required: true, message: '请选择通知方式', trigger: 'change' }
        ],
        notiObjVal: [
          { required: true, message: '请选择通知对象', trigger: 'change' }
        ]
      },
      compareS: [
        {
          value: 1,
          label: '>'
        },
        {
          value: 2,
          label: '>='
        },
        {
          value: 3,
          label: '<'
        },
        {
          value: 4,
          label: '<='
        },
        {
          value: 5,
          label: '='
        },
        {
          value: 6,
          label: '!='
        }
      ],
      week: [
        {
          value: 1,
          label: '周期发生-happen'
        },
        {
          value: 2,
          label: '连续发生-all'
        },
        {
          value: 3,
          label: '同比变化率-c_avg_rate_abs'
        },
        {
          value: 4,
          label: '突增突降值-diff'
        },
        {
          value: 5,
          label: '突增突降率-pdiff'
        },
        {
          value: 6,
          label: '求和-sum'
        }
      ],
      giveWeek: [
        {
          value: 1,
          label: '1分钟'
        },
        {
          value: 2,
          label: '5分钟'
        },
        {
          value: 3,
          label: '15分钟'
        },
        {
          value: 4,
          label: '30分钟'
        },
        {
          value: 5,
          label: '60分钟'
        }
      ],
      level: [
        {
          value: 1,
          label: '低'
        },
        {
          value: 2,
          label: '中'
        },
        {
          value: 3,
          label: '高'
        }
      ],
      svu: [
        {
          value: 1,
          label: '大于'
        },
        {
          value: 2,
          label: '小于'
        },
        {
          value: 3,
          label: '等于'
        },
        {
          value: 4,
          label: '大于等于'
        },
        {
          value: 5,
          label: '小于等于'
        },
        {
          value: 6,
          label: '不等于'
        }
      ],
      num: 0,
      cityOptions: [
        {
          value: '周一',
          checked: false
        },
        {
          value: '周二',
          checked: false
        },
        {
          value: '周三',
          checked: false
        },
        {
          value: '周四',
          checked: false
        },
        {
          value: '周五',
          checked: false
        },
        {
          value: '周六',
          checked: false
        },
        {
          value: '周日',
          checked: false
        }
      ],
      radio: '1',
      control: [
        {
          value: 1001,
          label: 'online-kafka-topic-msgIn'
        },
        {
          value: 1002,
          label: 'online-kafka-topic-bytesIn'
        },
        {
          value: 1006,
          label: 'online-kafka-topic-fetch-throttled'
        },
        {
          value: 1008,
          label: 'online-kafka-consumer-maxDelayTime'
        }
      ],
      notification: [{
        value: 1,
        label: 'QQ群'
      }],
      notifyObject: [{
        value: 1,
        label: 'kafka告警处理'
      }],
      group: [],
      topic: [],
      nowjin: true,
      strategyNum: true,
      strategyNums: true,
      strategyNumss: false,
      pingjun: false,
      percentage: false,
      selectVal: '',
      selectVals: '',
      selectValr: '',
      selectValradio: '',
      tipcVal: '',
      tiPC: [],
      vpt: '',
      vpt1: '',
      compVal: '',
      compIup_sed: false,
      weekVal: '',
      notifcVal: '',
      notiObjVal: '',
      zhiyu: '',
      zhiyu1: '',
      ovjvalue: []
    }
  },
  created() {
    this.groupsss.map(el=>{
      el.label = this.$route.query.id
    })
    this.$reqGet('http://219.141.189.24:8082/searchTopicName', {
      clusterId: this.$route.query.id
    }).then(res => {
      this.ovjvalue = res.data.data
      this.tiPC = this.ovjvalue
    }).catch(err => {
      return err
    })
  },
  methods: {
    //  返回
    goBack() {
      this.$router.push({ path: '/addwarning/index', query: { name: 'add', id: this.$route.query.id } })
    },
    strategyWeek(val) {
      this.selectVal = val
      if (val == '2' || val == '4' || val == '6') {
        this.strategyNum = false
        this.strategyNums = false
        this.pingjun = false
        this.strategyNumss = false
      } else if (val == '3') {
        this.pingjun = true
        this.strategyNum = true
        this.strategyNums = false
        this.strategyNumss = true
      } else if (val == '5') {
        this.percentage = true
        this.strategyNum = false
        this.strategyNums = false
        this.pingjun = false
        this.strategyNumss = false
      } else {
        this.nowjin = true,
          this.strategyNum = true,
          this.strategyNums = true,
          this.strategyNumss = false,
          this.pingjun = false,
          this.percentage = false
      }
    },
    // 集群ID
    selectIndicator(val) {
      this.selectVals = val
    },
    //所属应用id
    selectRegion(val) {
      this.selectValr = val
    },
    //报警级别
    radioClick(val) {
      this.selectValradio = Number(val)
    },
    //tipc名称
    tipcClick(val) {
      this.tipcVal = val
    },
    //比较规则
    compareClick(val) {
      this.compVal = val
    },
    //监控时间
    weekClick(val) {
      this.weekVal = val
    },
    //通知方式
    notificationClick(val) {
      this.notifcVal = val
    },
    //通知对象
    notifyObjectClick(val) {
      this.notiObjVal = val
    },
    //创建
    submitForm(formName) {
      this.strategyData.map(el => {
        this.zhiyu = Number(el.value)
        this.zhiyu1 = Number(el.value1)
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$reqPost('http://219.141.189.24:8082/addMonitoringInfo', {
              'PolicyName': this.ruleForm.name,	//监控规则名称
              'AppId': 0,					//所属应用id
              'ClusterId': Number(this.$route.query.id),					//集群ID
              'TopicName': this.tipcVal,//Topic名称
              'MonitorItem': this.selectVals,//监控指标
              'AlarmLevel': this.selectValradio || Number(this.radio),//报警级别，1：低级别，2：中级别，3：高级别
              'MonitoringTime': this.weekVal,		//监控时间，1:1分钟,2:5分钟,3:15分钟，4:30分钟,5:,60分钟'
              'InformWay': this.notifcVal,				//通知方式，1：QQ群
              'InformGroup': 'this.notiObjVal',			//通知用户组id 默认写 kafka告警处理，传入1就行
              'CompareRules': this.compVal,		//	阈值比较类型：1：大于,2：大于等于，3：小于,4：小于等于，5：等于，6：不等于，7：between
              'FirstThreshold': this.zhiyu	//阈值,between的第一个操作数，其它比较规则（操作符）的阈值（操作数），只存这一个字段
              // second_threshold:this.zhiyu1 || 0	//比较规则为between时，第二个阈值操作数
            }
          ).then(res => {
            this.form = res.data.data
            this.$router.push({ path: '/addwarning/index', query: { name: 'add', id: this.$route.query.id } })
          }).catch(err => {
            return err
          })
        } else {
          this.$notify.error({
            message: '请填写正确必填项',
            position: 'top-left'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.add {
  height: 100%;
  background: #f3f4f5;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.el-header > div {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
}

.el-page-header {
  width: 77%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
}

.el-form {
  width: 23%;
  height: 100%;
  display: flex;
  align-items: center;
}

.demo-ruleForm .el-form-item, .demo-ruleFormsas {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.demo-ruleFormsas {
  flex-wrap: wrap;
}

.el-page-header__left::after {
  background: #fff;
}

.el-page-header__left i, .el-page-header__content {
  color: rgba(0, 0, 0, .85);
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
}

.card-header {
  border-left: 2px solid #3a8ee6;
  padding-left: 8px;
  font-size: 14px;
}

.demo-ruleForms, .demo-ruleFormsa, .demo-ruleFormsas {
  width: 100%;
  margin-top: 15px;
  border-top: 1px solid #e8e8e8;
}

.demo-ruleForms .el-form-item {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
}

.box-card {
  width: 100%;
}

.box-card-index, .box-card-celu {
  width: 100%;
  margin-top: 15px;
}

.box-card-celu .dashen {
  width: 100%;
  border: 1px dashed #e29864;
  padding: 20px 0 20px 10px;
  margin-bottom: 20px;
  display: flex;
  margin-top: 15px;
}

.box-card-index .demo-ruleForms {
  flex-wrap: wrap;
}

.el-radio {
  margin-right: 8px;
}

.svg-img {
  margin-right: 5px;
}

.Alarm {
  width: 100%;
}

.html_content {
  /* justify-content: space-between; */
}

.input_height {
  height: 40px;
}

.frap {
  flex-wrap: wrap;
}
</style>
<style>
.el-page-header__left {
  margin: 0 20px 0 26px;
}

.demo-ruleForm .el-form-item__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  top: 17%
}

.el-form-item__content {
  display: flex;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100px;
}

.Alarm .el-form-item__label {
  width: 12.5%;
  text-align: left;
}

.html_content .el-form-item__label {
  width: 15%;
  text-align: left;
}

.html_content .el-form-item__content {
  width: 50%;
}

.input_height .el-input__inner {
  height: 100%;
}
</style>
