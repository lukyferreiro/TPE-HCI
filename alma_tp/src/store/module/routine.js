import {RoutineApi} from "@/api/routines";

export default {
    namespaced: true,
    state:{
        routines: [],
        routinesAmount: 0,
    },
    actions: {
        async getAll({commit}){
            const result =  await RoutineApi.getAll();
            commit("update", result);
            return result;
        },

        async get({dispatch}, idRoutine){
            const result = await RoutineApi.getRoutine(idRoutine);
            //para asegurarme de no perderme nada
            dispatch("getAll");
            return result;
        },

        async add({dispatch}, routine){
            const result = await RoutineApi.addRoutine(routine);
            dispatch("getAll");
            return result;
        },

        async edit({dispatch}, idS){
            const result = await RoutineApi.editRoutine(idS);
            dispatch("getAll");
            return result;
        },

        async delete({dispatch}, idRoutine){
            const result = await RoutineApi.deleteRoutine(idRoutine);
            dispatch("getAll");
            return result;
        },

        async execute({dispatch}, idRoutine){
            const result = await RoutineApi.executeRoutine(idRoutine);
            dispatch("getAll");
            return result;
        }

    },
    mutations: {
        update(state, routines){
            state.routines = routines
            state.routinesAmount = state.routines.length
        }
    },

}