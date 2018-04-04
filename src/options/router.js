import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './HomePage'
import TabsPage from './TabsPage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/tabs', name: 'TabsPage', component: TabsPage },
    { path: '/', name: 'HomePage', component: HomePage },
  ]
})