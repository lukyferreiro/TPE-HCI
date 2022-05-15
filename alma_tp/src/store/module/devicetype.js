import {DeviceTypesApi} from "@/api/devicetypes";

export default {
    namespaced:true,
    state:{
        devicesTypes: [],
    },
    actions:{
        async getAllTypes({commit}){
            const result =  await DeviceTypesApi.getAllTypes();
            commit("update", result);
            return result;
        },
        async getDeviceType({dispatch}, idDeviceType){
            const result =  await DeviceTypesApi.getDeviceType(idDeviceType);
            dispatch("getAllTypes", result);
            return result;
        },
        async editDeviceType({dispatch}, deviceType){
            const result =  await DeviceTypesApi.editDeviceType(deviceType);
            dispatch("getAllTypes", result);
            return result;
        }
    },
    mutations: {
        update(state, devices){
            state.devicesTypes = devices
        }
    }
}