<template>
  <div>
    <mt-cell :title="task.name">
      <span>
        <mt-button size="small">{{task.hold}}</mt-button>
        <mt-button size="small">{{task.cutOffWeek}}</mt-button>
        <mt-button size="small" @click="add_done">+</mt-button>
      </span>
    </mt-cell>
    <mt-progress :value="rate" :bar-height="9"><div slot="end">{{rate}}%</div></mt-progress>
  </div>
</template>

<script>
  export default {
    name: "MTask",
    methods:{
      add_done(){
        this.$store.dispatch("add_done", this.index)
      },
    },
    props: {
      task: Object,
      index: Number
    },
    computed: {
      rate() {
        return parseInt(this.task.done * 100 / this.task.allNum)
      }
    }
  }
</script>

<style scoped>

</style>
