import {Api} from "@/api/api";

class DeviceTypesApi{
    static getUrl(slug){
        return `${Api.baseUrl}/devicetypes${slug ? `/${slug}` : ''}`
    }

    static async getDeviceType(idDeviceType){
        return await Api.get(DeviceTypesApi.getUrl(idDeviceType));
    }

    static async getAllTypes(){
        return await Api.get(DeviceTypesApi.getUrl());
    }

    static async editDeviceType(device){
        return await  Api.put(DeviceTypesApi.getUrl(device.id), device)
    }

}

export {DeviceTypesApi}