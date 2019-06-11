<template>
  <mt-tab-container v-model="active">
    <mt-tab-container-item id="tab-container1">
      <ul class="m_ul">
        <li class="m_time_re">
          <mt-cell title="备忘"><mt-button size="small" @click="show_time_re_add">添加</mt-button></mt-cell>
          <div class="m_time_re1" v-show="show_time_re_add_div">
            <mt-button size="small">
              <input ref="add_time_re"
                     v-model="input_value"
                     @keyup.enter="add_time_re"
                     @blur="add_time_re"
                     class="my_input1"/>
            </mt-button>
          </div>
          <MReminder v-for="(re, index) in reminders" :key="index" :index="index" :re="re"/>
        </li>
        <li class="m_tasks">
          <mt-cell title="计划"><mt-button size="small" @click="show_task_add(true)">添加</mt-button></mt-cell>
          <MTask v-for="(task, index) in tasks" :key="index" :index="index" :task="task"/>
        </li>
      </ul>
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2">
      <div class="my_form">
        <mt-field label="计划名" ref="task_name" v-model="form.name"></mt-field>
        <mt-field label="计划步长" type="number" v-model="form.step"></mt-field>
        <mt-field label="计划总长" type="number" v-model="form.allNum"></mt-field>
        <mt-field label="备注" rows="4" v-model="form.note"></mt-field>
      </div>
      <div>
        <mt-button @click="add_task">确认</mt-button>
        <mt-button @click="show_task_add(false)">取消</mt-button>
      </div>
    </mt-tab-container-item>
  </mt-tab-container>

</template>

<script>
  import MReminder from "./MReminder"
  import MTask from "./MTask"
  import {mapState} from "vuex"
  import my_util from "../../utils/my_util"
  import { Toast } from 'mint-ui';

  export default {
    name: "MIndex",
    data(){
      return{
        input_value:"",
        show_time_re_add_div:false,
        holder_text:"",
        show_err:false,
        active: 'tab-container1',
        form: {
          name: '',
          step: 1,
          allNum: 10,
          note:''
        }
      }
    },
    methods:{
      add_task(){
        let from = this.form

        if (from.name){
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

          this.active = 'tab-container1'
        }else {
          Toast("计划名称不能为空")
        }


      },
      show_task_add(flag){
        if (flag){
          this.active = 'tab-container2'
          this.$nextTick(_=>{
            this.$refs.task_name.$refs.input.focus()
          })
        }else {
          this.active = 'tab-container1'

          this.form.allNum = 10
          this.form.note = ""
          this.form.step = 1
          this.form.name = ""
        }
      },
      show_time_re_add(){
        this.show_time_re_add_div = true
        this.$nextTick(_=>{
          this.$refs.add_time_re.focus()
        })
      },
      add_time_re(){
        let input_value = this.input_value
        if (input_value) {
          const regex = /^[012]?\d:[012345]?\d$/;
          if (regex.test(input_value)) {
            this.$store.dispatch("push_time_re", my_util.format_time(input_value))
            this.show_time_re_add_div = false;
            this.input_value = '';
          } else {
            Toast("时间格式不正确, 例 06:00")
            this.$nextTick(_=>{
              this.$refs.add_time_re.focus()
            })

            this.input_value = "";
            this.holder_text = input_value
          }
        }
      }

    },
    components: {
      MReminder,
      MTask
    },
    computed:{
      ...mapState(["reminders"]),
      ...mapState(["tasks"])
    }
  }
</script>

<style scoped>
  .m_ul {
    list-style: none;
    padding: 0;
  }
  .my_input1{
    background:none;
    outline:none;
    border:0px;
    width : 54px;
  }
  .m_time_re1>button{
    margin: 0 10px 5px 0;
  }
</style>
