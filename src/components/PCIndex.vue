<template>

  <el-container class="container">
    <el-header>
      <div></div>
    </el-header>
    <el-main>
      <Home/>
    </el-main>
    <el-footer class="footer">
      <div></div>
    </el-footer>
  </el-container>
</template>

<script>
  import Home from './Home'
  export default {
    name: "PCIndex",
    components: {
      Home
    }
  }
</script>

<style scoped>
  .container{
    margin:0 10%;
  }
  .biaobai{
    text-align: center;
    font-size: 51px;
    color: #F56C6C;
    font-weight: bold;
    margin: 0 auto;
    line-height: 60px;
    height: 60px;
  }

</style>
