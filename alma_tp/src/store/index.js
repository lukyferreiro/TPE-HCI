import Vue from 'vue'
import Vuex from 'vuex'
import room from "@/store/module/room";
import devicesTypes from "@/store/module/devicetype";
import devices from "@/store/module/device";
import routine from "@/store/module/routine"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    room,
    devicesTypes,
    devices,
    routine
  },
  
})
