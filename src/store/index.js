import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
  },
  getters: {
    roomsAmount(state){
      return state.rooms.length;
    },
  },
  mutations: {
    setRooms(state, rooms){
      state.rooms = rooms
    },
    addRooms(state, room){
      state.rooms.push(room);
    },
    deleteRoom(state, room){
      state.rooms.splice(state.rooms.indexOf(room), 1);
    },
    showRoom(state, room){
      state.rooms[state.rooms.indexOf(room)].show = !state.rooms[state.rooms.indexOf(room)].show
      console.log(state.rooms[state.rooms.indexOf(room)].show)
    }
  },
  actions: {
  },
  modules: {
  }
})
