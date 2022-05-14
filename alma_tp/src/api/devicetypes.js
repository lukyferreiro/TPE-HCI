import {Api} from "@/api/api";

class DeviceTypesApi{
    static getUrl(slug){
        return `${Api.baseUrl}/devicetypes${slug ? `/${slug}` : ''}`
    }

    static async getDevice(idDevice){
        return await Api.get(DeviceTypesApi.getUrl(idDevice));
    }

    static async getAll(){
        return await Api.get(DeviceTypesApi.getUrl());
    }

}

export {DeviceTypesApi}