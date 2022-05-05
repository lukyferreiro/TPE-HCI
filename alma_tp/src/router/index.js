import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    component:() => import(/*webPackChunkName: "details" */ '../views/RoutineView.vue')
  },
  {
    path: '/routine/add',
    name: 'AddRoutine',
    component:() => import(/*webPackChunkName: "details" */ '../views/AddRoutine.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
