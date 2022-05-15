import {Api} from "@/api/api";
class RoomApi {
    static getUrl(slug){
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}`
    }

    static getUrlDevices(slug, deviceSlug){
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ''}/devices${deviceSlug ? `/${deviceSlug}` : ''}`
    }

    static async addRoom(room){
        //nos devuelve la habitacion con el id
        return await Api.post(RoomApi.getUrl(), room);
    }

    static async addDevice(idS){
        return await Api.post(RoomApi.getUrlDevices(idS[0], idS[1]));
    }

    static async editRoom(room){
        //devuelve true o false si lo pudo modificar o no
        return await Api.put(RoomApi.getUrl(room.id), room);
    }

    static async editDevice(idS){
        return await Api.put(RoomApi.getUrlDevices(idS[0], idS[1].id), idS[1]);
    }

    static async deleteRoom(idRoom){
        return await Api.delete(RoomApi.getUrl(idRoom));
    }

    static async deleteDevice(idDevice){
        return await Api.delete(RoomApi.getUrl(null,idDevice));
    }

    static async getAll(){
        return await Api.get(RoomApi.getUrl());
    }

    static async getAllDevices(idRoom){
        return await Api.get(RoomApi.getUrlDevices(idRoom));
    }
    //
    // static async getDevice(idRoom, idDevice){
    //     return await Api.get(RoomApi.getUrlDevices(idRoom, idDevice));
    // }

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