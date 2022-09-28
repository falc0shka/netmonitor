import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  {path: '/', name: 'dashboard', component: ()=>import('../components/Dashboard.vue')},
  {
    path: '/hosts',
    name: 'hosts',
    component: ()=>import('../components/Hosts.vue'),
    // children: [
    //   {
    //     path: ':id',
    //     name: 'host.page',
    //     component: ()=>import('../components/HostPage.vue'),
    //     props: route => ({...route.params})
    //   }
    // ]

  },
  {
    path: '/hosts/:id',
    name: 'host.page',
    component: ()=>import('../components/HostPage.vue'),
    props: route => ({...route.params}),
    beforeEnter(to,from) {console.log(to)}
  },
  {
    path: '/hosts/:id/edit',
    name: 'host.edit',
    component: ()=>import('../components/HostEdit.vue'),
    props: route => ({...route.params}),
    beforeEnter(to,from) {
      console.log(to)
      if (parseInt(to.params.id) < 1) {
        return {
          name: 'notfound',
          query: to.query,
          hash: to.hash,
          params: {
            pathmatch: to.path.split('/').slice(1)
          }
        }
      }
    }
  },

  {
    path: '/:pathmatch(.*)*',
    name: 'notfound',
    component: ()=>import('../components/tech/NotFoundComponent.vue'),
    beforeEnter(to,from) {
      //console.log(from,to)
    }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active-link'
})

export default router