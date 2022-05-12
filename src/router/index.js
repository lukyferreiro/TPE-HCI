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
    // children:[
    //   {
    //     path: ':add',
    //     name: 'AddRoutine',
    //     component: () => import(/*webPackChunkName: "details" */ '../views/AddRoutine.vue'),
    //     props:true
    //   }
    // ]
  },
  {
    path: '/routine/add',
    name: 'AddRoutine',
    component:() => import(/*webPackChunkName: "details" */ '../views/AddRoutine.vue')
  },
  {
    path: '/room/add_devices',
    name: 'AddDevice',
    component:() => import(/*webPackChunkName: "details" */ '../views/AddDevice.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router