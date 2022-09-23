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
    path: '/hosts/:id/edit',
    name: 'host.edit',
    component: ()=>import('../components/HostEdit.vue'),
    props: route => ({...route.params,testProp: 'testing prop'}),
    beforeEnter(to,from) {
      if (to.params.id > 3) {
        console.log(to)
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
    component: ()=>import('../components/tech/NotFoundComponent.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active-link'
})

export default router