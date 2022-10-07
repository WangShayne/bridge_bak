import { constantRoutes } from '@/router'
import Layout from '@/layout'
// import components from '@/router/modules/components'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // let defaultPath = '/bridge'
    // console.log(state.routes)
    // state.routes.forEach(item => {
    //   if(item.path === defaultPath) {
    //     item.children.forEach((child,index) => {
    //       if(index === 0){
    //         console.log(router)
    //         // router.push(defaultPath+child.path)
    //         router.push({path:'/bridge/9757595045'})
    //         console.log(123)
    //       }
    //     })
    //   }
    // })
  }
}

const actions = {
  generateRoutes({ commit, dispatch }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      dispatch('bridge/getList', {}, { root: true }).then((res) => {
        const temRoute = [
          {
            path: '/bridges',
            component: Layout,
            name: 'Bridges',
            meta: {
              title: '桥梁列表',
              icon: 'el-icon-s-grid'
            },
            alwaysShow: true,
            redirect: res.length ? '/bridges/' + res[0].id : '/bridge',
            children: res.map((item, index) => {
              if (index === 0) {
                item.defaultActive = true
              }
              return {
                path: `${item.id}`,
                component: () => import('@/views/bridge/index'),
                name: `Bridge${item.gateId}`,
                meta: { title: item.name, gateId: item.gateId, id: item.id, isWarning: item.isWarning }
              }
            })
            //   .concat(bridge.map(item => {
            //   return {
            //     path: `${item.id}/iview`,
            //     component: () => import('@/views/bridge/iview'),
            //     name: `Bridge${item.id}Iview`,
            //     meta: { title: item.name, id: item.id, activeMenu: `/bridge/${item.id}` },
            //     hidden: true
            //   }
            // }))
          },
          { path: '*', redirect: '/404', hidden: true }
        ]

        const accessedRoutes = temRoute
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
