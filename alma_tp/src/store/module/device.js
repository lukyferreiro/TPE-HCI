import {DeviceApi} from "@/api/devices";

export default {
    namespaced: true,
    state:{
        devices: [],
    },
    actions:{
        async getAll({commit}){
            const result =  await DeviceApi.getAll();
            commit("update", result);
            return result;
        },

        async getDevice({dispatch}, idDevice){
            const result =  await DeviceApi.getAll(idDevice);
            dispatch("getAll");
            return result;
        },
        async add({dispatch}, device){
            const result = await DeviceApi.addDevice(device);
            console.log('device added')
            dispatch("getAll");
            return result;
        },
        async edit({dispatch}, device){
            const result = await DeviceApi.editDevice(device);
            dispatch("getAll");
            return result;
        },
        async delete({dispatch}, idDevice){
            const result = await DeviceApi.deleteDevice(idDevice);
            dispatch("getAll");
            return result;
        },

    },
    mutations: {
        update(state, devices){
            state.devices = devices
        }

    }
}