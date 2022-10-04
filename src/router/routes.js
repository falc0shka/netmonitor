
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/', name: 'dashboard', component: ()=>import('../pages/DashboardPage.vue')
      },
      {
        path: '/hosts',
        name: 'hosts',
        component: ()=>import('../pages/HostsPage.vue'),
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
        component: ()=>import('../pages/HostPage.vue'),
        props: route => ({...route.params}),
        beforeEnter(to,from) {console.log(to)}
      },
      {
        path: '/hosts/:id/edit',
        name: 'host.edit',
        component: ()=>import('../pages/HostEditPage.vue'),
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

    
    ]
  },
    
  {
    path: '/:pathmatch(.*)*',
    name: 'notfound',
    component: ()=>import('../components/tech/NotFoundComponent.vue'),
    beforeEnter(to,from) {
      //console.log(from,to)
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
