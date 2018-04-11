import Vue from 'vue'
import router from './router'

import Blocker from './Blocker.vue'

let options = new Vue({
  el: '#blocker',
  render: (createElement) => createElement(Blocker),
  router
})