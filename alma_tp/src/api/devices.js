import {Api} from "@/api/api";

class DeviceApi {
    static getUrl(slug, slugAction){
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ''}${slugAction ? `/${slugAction}` : ''}`
    }
    
    static async addDevice(device){
        //nos devuelve la habitacion con el id
        return await Api.post(DeviceApi.getUrl(), device);
    }

    static async editDevice(device){
        //devuelve true o false si lo pudo modificar o no
        return await Api.put(DeviceApi.getUrl(device[0]), device[1]);
    }

    static async deleteDevice(idDevice){
        return await Api.delete(DeviceApi.getUrl(idDevice));
    }

    static async getAll(){
        return await Api.get(DeviceApi.getUrl());
    }

    static async getDevice(idDevice){
        return await Api.get(DeviceApi.getUrl(idDevice));
    }

    // GET /devices/events
    // static async getAllEvents(device){
    //     return await Api.get(DeviceApi.getUrl() + `/events`);
    // }

    // GET /devices/{deviceId}/state
    // static async getEvent(device){
    //     return await Api.get(DeviceApi.getUrl(device.id) + `/state`);
    // }

    // GET /devices/{deviceId}/events
    // static async getEvent(device){
    //     return await Api.get(DeviceApi.getUrl(device.id) + `/events`);
    // }

    //PUT /devices/{deviceId}/{actionName}
    static async executeAction(idS){
        //idS = [device, actionName]
        return await Api.put(DeviceApi.getUrl(idS[0].id, idS[1]) , idS[2]);
    }

}

export {DeviceApi}