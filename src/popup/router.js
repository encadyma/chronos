import Vue from 'vue'
import VueRouter from 'vue-router'

import TabsList from './TabsList'
import AddTab from './AddTab'
import LoadState from './LoadState'
import ViewState from './ViewState'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/addtab', name: 'AddTab', component: AddTab },
    { path: '/loadstate', name: 'LoadState', component: LoadState },
    { path: '/viewstate/:id', name: 'ViewState', component: ViewState },
    { path: '/', name: 'Home', component: TabsList },
  ]
})