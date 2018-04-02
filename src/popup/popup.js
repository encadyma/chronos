import Vue from 'vue'
import router from './router'
import Popup from './Popup.vue'

let popup = new Vue({
  el: '#popup',
  render: (createElement) => createElement(Popup),
  router
})