import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './HomePage'
import TabsPage from './TabsPage'
import StatesPage from './StatesPage'
import ProfilesPage from './ProfilesPage'

import ViewProfile from './ViewProfile'
import AddProfile from './AddProfile'

import QuickStart from './QuickStart'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/help/quickstart', name: 'QuickStart', component: QuickStart }, 
    { path: '/profile/view/:id', name: 'ViewProfile', component: ViewProfile },
    { path: '/profile/add', name: 'AddProfile', component: AddProfile },
    { path: '/profiles', name: 'ProfilesPage', component: ProfilesPage },
    { path: '/states', name: 'StatesPage', component: StatesPage },
    { path: '/tabs', name: 'TabsPage', component: TabsPage },
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '**', redirect: '/' }
  ]
})