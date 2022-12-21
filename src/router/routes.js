import { useAuthStore } from '../stores/AuthStore';

const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('../pages/DashboardPage.vue'),
      },
      {
        path: '/hosts',
        name: 'hosts',
        component: () => import('../pages/HostsPage.vue'),
      },
      {
        path: '/hosts/:_id',
        name: 'host.page',
        component: () => import('../pages/HostPage.vue'),
        props: (route) => ({ ...route.params }),
      },
      {
        path: '/hosts/:_id/edit',
        name: 'host.edit',
        component: () => import('../pages/HostEditPage.vue'),
        props: (route) => ({ ...route.params }),
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../pages/AdminPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notfound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
