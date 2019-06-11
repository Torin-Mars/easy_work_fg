<template>
  <div class="m_time_re">

    <mt-button size="small" type="primary"
      @click="delete_re">
      {{re.time}}
    </mt-button>
    <mt-button v-for="(r, index1) in re.res"
               :key="index1"
               size="small"
               @click="handleClose(index1, r.id)">
      {{r.reminder}}
    </mt-button>
    <mt-button v-show="add_input" size="small">
      <input ref="add_input"
             v-model="input_value"
             @keyup.enter="handleInputConfirm"
             @blur="handleInputConfirm"
             class="my_input"/>
    </mt-button>
    <mt-button v-show="!add_input" size="small" @click="show_add_input">
      +
    </mt-button>
  </div>
</template>

<script>
  export default {
    name: "MReminder",
  data(){
      return{
        add_input : false,
        name:"",
        input_value:""
      }
  },
  methods:{
    delete_re() {
      this.$store.dispatch("delete_time_re", {index:this.index, id:this.re.id})
    },
    handleClose(ind, id) {
      this.$store.dispatch("splice_re", {sub_index: ind, index: this.index, reId:id})
    },
    show_add_input(){
      this.add_input = true
      this.$nextTick(_ =>{
        this.$refs.add_input.focus()
      })
    },
    handleInputConfirm(){
      console.info("handleInputConfirm")
      let input_value = this.input_value
      this.input_value = '';
      if (input_value){
        this.$store.dispatch("push_re", {inputValue: input_value, index: this.index, trId: this.re.id})
      }
      this.add_input = false
    }
  },
    props: {
      re: Object,
      index: Number
    }
  }
</script>

<style scoped>
  .my_input{
    background:none;
    outline:none;
    border:0px;
    width : 54px;
  }
  .m_time_re>button{
    margin: 0 10px 5px 0;
  }

</style>
