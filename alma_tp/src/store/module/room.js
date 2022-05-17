import {RoomApi} from "@/api/rooms";

export default {
    namespaced: true,
    state:{
        rooms: [],
        roomsAmount: 0,
    },
    actions:{
        async getAll({commit}){
            const result =  await RoomApi.getAll();
            commit("update", result);
            return result;
        },
        async getAllDevices({dispatch}, idRoom){
            const result =  await RoomApi.getAllDevices(idRoom);
            dispatch("getAll");
            return result;
        },
        async get({dispatch}, idRoom){
            const result = await RoomApi.getRoom(idRoom);
            //para asegurarme de no perderme nada
            dispatch("getAll");
            return result;
        },

        async add({dispatch}, room){
            const result = await RoomApi.addRoom(room);
            dispatch("getAll");
            return result;
        },

        async addDevice({dispatch}, idS){
            const result = await RoomApi.addDevice(idS);
            dispatch("getAll");
            return result;
        },
        async edit({dispatch}, room){

            const result = await RoomApi.editRoom(room);
            dispatch("getAll");
            return result;
        },

        async delete({dispatch}, idRoom){
            const result = await RoomApi.deleteRoom(idRoom);
            dispatch("getAll");
            return result;
        },

        async deleteDevice({dispatch}, idDevice){
            const result = await RoomApi.deleteDevice(idDevice);
            dispatch("getAll");
            return result;
        },

        async show({dispatch}, idRoom){
            const result = await RoomApi.showRoom(idRoom);
            //para asegurarme de no perderme nada
            dispatch("getAll");
            return result;
        },

    },
    mutations: {
        update(state, rooms){
            state.rooms = rooms
            state.roomsAmount = state.rooms.length
        }
    },
}