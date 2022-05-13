import Vue from 'vue'
import Vuex from 'vuex'
import room from "@/store/module/room";
import devicesTypes from "@/store/module/devicetype";
import devices from "@/store/module/device";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routines: [],
  },
  getters: {
    routinesAmount(state){
      return state.routines.length;
    },
    roomsAmount(state){
      return state.rooms.length;
    },
  },
  mutations: {
    setRoutines(state, routines){
      state.routines = routines
    },
    addRoutines(state, routines){
      state.routines.push(routines);
    },
    deleteRoutines(state, routine){
      state.routines.splice(state.routines.indexOf(routine), 1);
    },
    playRoutine(state, routine){
      state.routines[state.routines.indexOf(routine)].play = !state.routines[state.routines.indexOf(routine)].play
    },
  },
  actions: {
  },
  modules: {
    room,
    devicesTypes,
    devices,
  },
  
})
