<template>
  <li class="my-li">
    <div class="item-title">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4">
          <div class="grid-content bg-purple task_name">{{item.name}}</div>
        </el-col>
        <el-col :span="20">
          <el-row type="flex" class="row-bg bt-group" justify="end">
            <!--<el-tag size="medium">next:学习数据分布</el-tag>-->
            <el-tag size="medium">连续{{item.hold}}天</el-tag>
            <el-tag size="medium">周中断{{item.cutOffWeek}}天</el-tag>
            <el-button size="mini" @click="add_done">+</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="item-progress">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="rate">
      </el-progress>
    </div>
  </li>
</template>

<script>

  export default {
    name: 'Item',
    data(){
      return{
      }
    },
    props: {
      item: Object,
      index:Number
    },
    methods: {
      add_done(){
        this.$store.dispatch("add_done", this.index)
      }
    },
    computed: {
      rate() {
        return parseInt(this.item.done * 100 / this.item.allNum)
      }
    }
  }
</script>

<style scoped>

  .item-title {
    position: relative;
  }

  .title-name {
    float: left;
  }

  .bt-sign {
    float: right;
  }

  .item-progress {
    padding: 0.7em 0;

  }

  .bt-group > span {
    margin: 0 0.3em;
  }

  .task_name {
    height: 28px;
    line-height: 28px;
  }
</style>
