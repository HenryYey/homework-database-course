import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index.vue'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { noAuth: true },
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { noAuth: true },
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/table',
    name: 'course',
    meta: { title: 'course', icon: 'course' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'time',
        name: 'time',
        component: () => import('@/views/time/index'),
        meta: { title: 'time', icon: 'time' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/log/index'),
        meta: { title: 'log', icon: 'log' }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/shop/index'),
        meta: { title: 'shop', icon: 'log' }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/report/index'),
        meta: { title: 'report', icon: 'log' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeEach((to, form, next) => {
  
  // 判断该路由是否需要先登录
  if (!to.meta.noAuth) {
    if (window.sessionStorage.getItem('token')) {  // 获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
 
  if (!to.matched.length) {
    next({
      path: '/error/404',
      replace: true
    });
  } else {
    next();
  }
});

export default router
