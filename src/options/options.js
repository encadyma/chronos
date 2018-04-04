import Vue from 'vue'
import router from './router'

import Options from './Options.vue'

let options = new Vue({
  el: '#options',
  render: (createElement) => createElement(Options),
  router
})