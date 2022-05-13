import {DeviceTypesApi} from "@/api/devicetypes";

export default {
    namespaced:true,
    state:{
        devicesTypes: [],
    },
    actions:{
        async getAll({commit}){
            const result =  await DeviceTypesApi.getAll();
            commit("update", result);
            return result;
        },
        async getDevice({dispatch}, idDevice){
            const result =  await DeviceTypesApi.getDevice(idDevice);
            dispatch("getAll", result);
            return result;
        },
    },
    mutations: {
        update(state, devices){
            state.devicesTypes = devices
        }
    }
}