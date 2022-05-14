import {Api} from "@/api/api";
class RoomApi {
    static getUrl(slug){
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}`
    }

    static async addRoom(room){
        //nos devuelve la habitacion con el id
        return await Api.post(RoomApi.getUrl(), room);
    }

    static async editRoom(room){
        //devuelve true o false si lo pudo modificar o no
        return await Api.put(RoomApi.getUrl(room.id), room);
    }

    static async deleteRoom(idRoom){
        return await Api.delete(RoomApi.getUrl(idRoom));
    }

    static async getAll(){
        return await Api.get(RoomApi.getUrl());
    }

    static async getRoom(idRoom){
        return await Api.get(RoomApi.getUrl(idRoom));
    }

    static async showRoom(idRoom){
        return await Api.put(RoomApi.getUrl(idRoom))
    }
    // showFalse(state, room){
    //   state.rooms[state.rooms.indexOf(room)].show = false;
    // },
}

export {RoomApi}