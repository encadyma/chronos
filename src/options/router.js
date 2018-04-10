import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './HomePage'
import TabsPage from './TabsPage'
import StatesPage from './StatesPage'
import ProfilesPage from './ProfilesPage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/profiles', name: 'ProfilesPage', component: ProfilesPage },
    { path: '/states', name: 'StatesPage', component: StatesPage },
    { path: '/tabs', name: 'TabsPage', component: TabsPage },
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '**', redirect: '/' }
  ]
})