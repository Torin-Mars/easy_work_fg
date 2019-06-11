import {INIT_TASKS, INIT_REMINDERS} from './mutation-types'


export default {
  init ({commit}, data){
    console.info("action - init")
    commit(INIT_TASKS, {data})
  },
  initReminders ({commit}, data){
    console.info("action - initReminders")
    commit(INIT_REMINDERS, {data})
  },
  splice_re ({commit}, {sub_index, index, reId}){
    commit('splice_re', {sub_index, index, reId})
  },
  push_re ({commit}, {inputValue, index, trId}){
    commit('push_re', {inputValue, index, trId})
  },
  push_time_re ({commit}, inputValue){
    commit('push_time_re', {inputValue})
  },
  delete_time_re ({commit}, {index, id}){
    commit('delete_time_re', {index, id})
  },
  add_done ({commit}, index){
    commit('add_done', {index})
  },
  addTask ({commit}, form){
    commit('addTask', form)
  }
}
