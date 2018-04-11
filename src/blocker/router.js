import Vue from 'vue'
import VueRouter from 'vue-router'

import BlockPage from './BlockPage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/block', name: 'BlockPage', component: BlockPage },
    { path: '**', redirect: '/block' }
  ]
})