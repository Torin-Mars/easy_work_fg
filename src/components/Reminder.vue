<template>

  <div class="time_re">
    <el-tooltip class="item" effect="light" content="点击删除" placement="bottom">
      <el-tag class="my_bt" @click="delete_re" type="info">{{re.time}}</el-tag>
    </el-tooltip>
    <el-tag
      :key="ind"
      v-for="(tag,ind) in re.res"
      closable
      :disable-transitions="false"
      @close="handleClose(ind, tag.id)">
      {{tag.reminder}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
  </div>
</template>

<script>
  export default {
    name: "Reminder",
    data() {
      return {
        inputVisible: false,
        inputValue: ''
      }
    },
    props: {
      re: Object,
      index: Number
    },
    methods: {
      delete_re() {
        this.$store.dispatch("delete_time_re", {index:this.index, id:this.re.id})
      },
      handleClose(ind, id) {
        this.$store.dispatch("splice_re", {sub_index: ind, index: this.index, reId: id})
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.$store.dispatch("push_re", {inputValue: inputValue, index: this.index, trId: this.re.id})
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          console.info(this.$refs)
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
    }
  }
</script>

<style scoped>
  .my_bt {
    cursor: pointer;
  }

  .el-tag {
    margin-left: 7px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>
