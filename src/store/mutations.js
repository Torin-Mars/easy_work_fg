import {INIT_TASKS, INIT_REMINDERS} from "./mutation-types";
import my_util from "../utils/my_util"
import axios from 'axios'

export default {
  [INIT_TASKS](state, {data}) {
    axios.get("/task")
      .then(resp => {
        console.info(resp)
        if (resp.data.code) {
          // this.$store.dispatch('init', resp.data.data)
          state.tasks = resp.data.data
        }
      }).catch(err => {
      state.tasks = []
      console.info(err)
    })

    // state.tasks = data
  },
  [INIT_REMINDERS](state, {data}) {
    axios.get("/reminder")
      .then(resp => {
        console.info(resp)
        if (resp.data.code) {
          // this.$store.dispatch('init', resp.data.data)
          var cur = new Date()
          var cur_num = cur.getHours() * 60 + cur.getMinutes() - 10
          let res = resp.data.data
          res.sort(function (a, b) {
            return my_util.get_time_num(a.time, cur_num) - my_util.get_time_num(b.time, cur_num)
          })
          state.reminders = res
        }
      }).catch(err => {
      state.reminders = []
      console.info(err)
    })
    // var cur = new Date()
    // var cur_num = cur.getHours() * 60 + cur.getMinutes() - 10
    // data.sort(function (a, b) {
    //   return my_util.get_time_num(a.time, cur_num) - my_util.get_time_num(b.time, cur_num)
    // })
    // state.reminders = data
  },
  splice_re(state, {sub_index, index, reId}) {
    console.info(reId)
    axios.delete("/reminder/" + reId)
      .then(resp => {
        if (resp.data.code) {
          let tm = state.reminders[index]
          tm.res.splice(sub_index, 1);
          return 1
        } else {
          return 0
        }
      })
      .catch(err => {
        console.info(err)
        return err
      })
  },
  push_re(state, {inputValue, index, trId}) {
    axios.post("/reminder", {
      reminder: inputValue,
      trId: trId
    })
      .then(resp => {
        if (resp.data.code) {
          let tm = state.reminders[index]
          tm.res.push(resp.data.data)
          return 1
        } else {
          return 0
        }
      })
      .catch(err => {
        console.info(err)
        return err
      })
  },
  push_time_re(state, {inputValue}) {
    axios.post("/reminder/time", {
      time: inputValue
    })
      .then(resp => {
        if (resp.data.code) {
          var res = state.reminders
          res.push({
            id: resp.data.data.id,
            time: inputValue,
            res: []
          })
          var cur = new Date()
          var cur_num = cur.getHours() * 60 + cur.getMinutes() - 10
          res.sort(function (a, b) {
            return my_util.get_time_num(a.time, cur_num) - my_util.get_time_num(b.time, cur_num)
          })
          return 1
        } else {
          return 0
        }
      })
      .catch(err => {
        console.info(err)
        return err
      })

  },
  delete_time_re(state, {index, id}) {
    axios.delete("/reminder/time/" + id)
      .then(resp => {
        if (resp.data.code) {
          state.reminders.splice(index, 1)
          return 1
        } else {
          return 0
        }
      })
      .catch(err => {
        console.info(err)
        return err
      })

  },

  // 操作task的方法
  add_done(state, {index}) {
    let task = state.tasks[index]
    let done = task.done + task.step
    if (done >= task.allNum) {

      axios.delete("/task/" + task.id)
        .then(resp => {
          if (resp.data.code) {
            state.tasks.splice(index, 1)
            return 1
          } else {
            return 0
          }
        })
        .catch(err => {
          console.info(err)
          return err
        })
    } else {
      task.done = done
      axios.put("/task/" + task.id + "?done=" +done)
        .then(resp => {
          if (resp.data.code) {
            return 1
          } else {
            return 0
          }
        })
        .catch(err => {
          console.info(err)
          return err
        })
    }
  },
  addTask(state, form) {

    form.done = 0
    form.cutOffWeek = 0
    form.cutOffMonth = 0
    form.cutOffSeason = 0
    form.hold = 0

    axios.post("/task", form)
      .then(resp => {
        if (resp.data.code) {
          state.tasks.push(form)
          return 1
        } else {
          return 0
        }
      })
      .catch(err => {
        console.info(err)
        return err
      })
  }
}
