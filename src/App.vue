<template>
  <router-view></router-view>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'App',
    mounted() {
      //跳转
      if (this._isMobile()) {
        this.$router.replace('/m_index');
      } else {
        this.$router.replace('/pc_index');
      }

      // 初始化数据
      this.$store.dispatch('init', [{
        id: 2,
        name: "学英语",
        step: 2,
        done: 2,
        allNum: 100,
        note: "没事",
        user: 1,
        cutOffWeek: 0,
        cutOffMonth: 0,
        cutOffSeason: 1,
        hold: 10
      }, {
        id: 1,
        name: "学高数",
        step: 1,
        done: 5,
        allNum: 10,
        note: "没事",
        user: 1,
        cutOffWeek: 0,
        cutOffMonth: 0,
        cutOffSeason: 1,
        hold: 5
      }])
      this.$store.dispatch('initReminders', [{
        time: "06:00",
        res: [
          '带饭', '带好吃的', '洗头', '说早安'
        ]
      }, {
        time: "11:25",
        res: [
          '吃午饭', '热饭盒', '充电瓶车'
        ]
      }, {
        time: "21:45",
        res: [
          '记账', '洗漱', '说晚安'
        ]
      }, {
        time: "5:25",
        res: [
          '买鸡蛋', '买菜', '接小美女'
        ]
      }])
      // axios.get("/api/task")
      //   .then(resp => {
      //     console.info(resp)
      //     if (resp.data.code){
      //
      //       this.$store.dispatch('init', resp.data.data)
      //     }
      //   }).catch(err => {
      //     console.info(err)
      // })
    },
    methods: {
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    }
  }
</script>

<style>
</style>
