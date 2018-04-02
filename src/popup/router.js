import Vue from 'vue'
import VueRouter from 'vue-router'

import TabsList from './TabsList'
import AddTab from './AddTab'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/addtab', name: 'AddTab', component: AddTab },
    { path: '/', name: 'Home', component: TabsList }
  ]
})