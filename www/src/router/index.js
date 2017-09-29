import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Settings from '@/components/Settings'
import Street from '@/components/Street'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // front end routes only
      path: '/',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/settings/',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/street/',
      name: 'Street',
      component: Street
    }
  ]
})
