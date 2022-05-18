import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component:() => import(/*webPackChunkName: "details" */ '../views/HomeView.vue')
  },
  {
    path: '/help',
    name: 'HelpView',
    component:() => import(/*webPackChunkName: "details" */ '../views/HelpView.vue')
  },
  {
    path: '/room',
    name: 'RoomView',
    component:() => import(/*webPackChunkName: "details" */ '../views/RoomView.vue')
  },
  {
    path: '/routine',
    name: 'RoutineView',
    component:() => import(/*webPackChunkName: "details" */ '../views/RoutineView.vue'),
  },
  {
    path: '/routine/add',
    name: 'AddRoutineView',
    component:() => import(/*webPackChunkName: "details" */ '../views/AddRoutineView.vue')
  },
  {
    path: '/room/add_devices',
    name: 'AddDeviceView',
    props: true,
    component:() => import(/*webPackChunkName: "details" */ '../views/AddDeviceView.vue'),
  },
  {
    path: '/room/edit_devices',
    name: 'EditDeviceView',
    props: true,
    component:() => import(/*webPackChunkName: "details" */ '../views/EditDeviceView.vue'),
  },
  {
    path: "/404",
    alias:"*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
