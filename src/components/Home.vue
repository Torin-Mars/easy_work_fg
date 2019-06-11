<template>
  <el-row :gutter="10" class="fir-row">
    <el-col :md="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>备忘</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="show_time_re_add">添加</el-button>
        </div>

        <div class="time_re" v-if="inputVisible">
          <el-input
            class="input-new-tag"
            v-model="inputValue"
            ref="input_time_re"
            size="small"
            :placeholder="holder_text"
            @focus="focus_time_re()"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-alert class="time_re_alert" v-show="show_err"
                    title="时间格式不正确, 例 06:00"
                    type="error">
          </el-alert>
        </div>

        <Reminder v-for="(re, index) in reminders" :index="index" :re="re" :key="index"/>
      </el-card>

      <!--<ul class="my-ul">-->
      <!--<Reminder v-for="(re, index) in reminders" :key="index" :re="re"/>-->
      <!--</ul>-->
    </el-col>
    <el-col :md="12">

      <!--添加计划对话框-->
      <el-dialog class="my_dialog" title="表单弹框" :visible.sync="dialogVisible" width="30%">
        <el-form class="taskFrom" ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="计划名称" prop="name">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="计划步长">
            <el-input-number v-model="form.step" size="mini" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="计划总长">
            <el-input-number v-model="form.allNum" size="mini" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.note" size="mini"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTask">确 定</el-button>
          </span>
      </el-dialog>


      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>计划</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="show_task_add">添加</el-button>
        </div>

        <Item class="task_div" v-for="(item, index) in tasks" :key="index" :item="item" :index="index"/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import Item from '../components/Item'
  import Reminder from '../components/Reminder'
  import {mapState} from 'vuex'
  import my_util from "../utils/my_util"

  export default {
    name: 'Home',
    data() {
      return {
        holder_text: "",
        show_err: false,
        inputValue: "",
        inputVisible: false,
        dialogVisible:false,
        form: {
          name: '',
          step: 1,
          allNum: 10,
          note:''
        },
        rules:{
          name: [
            { required: true, message: '计划名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      addTask() {
        this.dialogVisible = false
        let from = this.form
        this.$store.dispatch("addTask",{
          name:from.name,
          allNum:from.allNum,
          step:from.step,
          note:from.note
        })
        this.form.allNum = 10
        this.form.note = ""
        this.form.step = 1
        this.form.name = ""
      },
      show_task_add() {
        this.dialogVisible = true
      },
      focus_time_re() {
        this.show_err = false
      },
      show_time_re_add() {
        this.inputVisible = true

        this.$nextTick(_ => {
          this.$refs.input_time_re.$refs.input.focus()
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          const regex = /^[012]?\d:[012345]?\d$/;
          if (regex.test(inputValue)) {
            this.$store.dispatch("push_time_re", my_util.format_time(inputValue))
            this.inputVisible = false;
            this.inputValue = '';
          } else {
            this.show_err = true
            this.inputValue = "";
            this.holder_text = inputValue
          }
        }
      }
    },
    components: {
      Item,
      Reminder
    },
    computed: {
      ...mapState(['tasks']),
      ...mapState(['reminders'])
    },
    mounted() {

    }
  }
</script>

<style scoped>

  .time_re_alert {
    position: absolute;
    left: 144px;
    top: 82px;
    width: 211px;
    height: 32px;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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
    width: 480px;
  }

  .task_div + .task_div {
    border-top: 1px solid #e2dfda;
  }
</style>
