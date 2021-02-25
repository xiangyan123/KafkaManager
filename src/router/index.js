import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/dashboard1',
    component: Layout,
    // redirect: '/dashboard1',
    children: [{
      path: 'dashboard1',
      name: 'APP概览',
      component: () => import('@/views/dashboard/index1'),
      // meta: { title: 'APP概览', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboards',
    children: [{
      path: 'dashboards',
      name: 'instanceReview',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '实例概览', icon: 'form' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '实例详情',
    // meta: { title: '', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'detial',
        component: () => import('@/views/table/instance'),
        // meta: { title: '实例详情', icon: 'el-icon-document' }
      }
    ]
  },
  {
    path: '/topic',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Topic',
        component: () => import('@/views/table/topic'),
        // meta: { title: 'Topic管理', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/consumergroup',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'consumer_Group',
        component: () => import('@/views/table/consumergroup'),
        // meta: { title: 'consumer Group管理', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '消息查询',
        component: () => import('@/views/form/selectinfo'),
        // meta: { title: '消息查询', icon: 'el-icon-s-comment' }
      }
    ]
  },
  {
    path: '/addwarning',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addWarning',
        component: () => import('@/views/form/addWarning'),
        // meta: { title: '新增报警', icon: 'monitoring' },
      }
    ]
  },
  {
    path: '/monitoring',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/form/monitoring'),
        meta: { title: '监控报警', icon: 'monitoring' },
      }
    ]
  },
  {
    path: '/monitorings',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/views/form/add'),
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// import Vue from 'vue'
// import Router from 'vue-router'
//
// Vue.use(Router)
//
// /* Layout */
// import Layout from '@/layout'
//
// export const constantRoutes = [
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: false
//   },
//
//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },
//
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard1',
//     children: [{
//       path: 'dashboard1',
//       name: 'APP概览',
//       component: () => import('@/views/dashboard/index1'),
//       meta: { title: 'APP概览', icon: 'dashboard' }
//     }]
//   },
//   {
//     path: '/dashboard',
//     component: Layout,
//     redirect: '/dashboard/index',
//     children: [{
//       path: 'dashboard',
//       name: 'instanceReview',
//       component: () => import('@/views/dashboard/index'),
//       meta: { title: '实例概览', icon: 'form' }
//     }]
//   },
//
//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/table',
//     name: '实例详情',
//     meta: { title: '', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'index',
//         name: 'detial',
//         component: () => import('@/views/table/instance'),
//         meta: { title: '实例详情', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/topic',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         name: 'Topic',
//         component: () => import('@/views/table/topic'),
//         meta: { title: 'Topic管理', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/consumergroup',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         name: 'consumer_Group',
//         component: () => import('@/views/table/consumergroup'),
//         meta: { title: 'consumer Group管理', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/form',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         name: '消息查询',
//         component: () => import('@/views/form/selectinfo'),
//         meta: { title: '消息查询', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/monitoring',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         name: '监控报警',
//         component: () => import('@/views/form/monitoring'),
//         meta: { title: '监控报警', icon: 'form' }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true }
// ]
//
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })
//
// const router = createRouter()
//
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
//
// export default router
