// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Cell } from 'mint-ui';
import { Button } from 'mint-ui';
import { Progress } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Header } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Popup.name, Popup);
Vue.component(Progress.name, Progress);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store


})
