import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
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
    setRooms(state, rooms){
      state.rooms = rooms
    },
    addRoutines(state, routines){
      state.routines.push(routines);
    },
    addRooms(state, rooms){
      state.rooms.push(rooms);
    },
    deleteRoutines(state, routine){
      state.routines.splice(state.routines.indexOf(routine), 1);
    },
    deleteRoom(state, room){
      state.rooms.splice(state.rooms.indexOf(room), 1);
    },
    showRoom(state, room){
      state.rooms[state.rooms.indexOf(room)].show = !state.rooms[state.rooms.indexOf(room)].show
    },
    showFalse(state, room){
      state.rooms[state.rooms.indexOf(room)].show = false;  
    },
    playRoutine(state, routine){
      state.routines[state.routines.indexOf(routine)].play = !state.routines[state.routines.indexOf(routine)].play
    }
  },
  actions: {
  },
  modules: {
  }
})
