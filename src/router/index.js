import Vue from 'vue'
import Router from 'vue-router'
import PCIndex from '../components/PCIndex'
import MIndex from '../components/mobile/MIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/pc_index'
    },
    {
      path: "/pc_index", // pc端首页
      name: 'PCIndex',
      component: PCIndex
    },
    {
      path: '/m_index', // 手机端首页
      name: MIndex,
      component: MIndex
    }
  ]
})
