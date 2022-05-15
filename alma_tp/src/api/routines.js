import {Api} from "@/api/api";

class RoutineApi {
    static getUrl(slug){
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}`
    }

    static getUrlExecute(slug){
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}/execute`
    }

    static async addRoutine(routine){
        return await Api.post(RoutineApi.getUrl(), routine);
    }

    static async editRoutine(routine){
        return await Api.put(RoutineApi.getUrl(routine.id), routine);
    }

    static async executeRoutine(routine){
        return await Api.put(RoutineApi.getUrlExecute(routine.id), routine);
    }

    static async deleteRoutine(idRoutine){
        return await Api.delete(RoutineApi.getUrl(idRoutine));
    }

    static async getAll(){
        return await Api.get(RoutineApi.getUrl());
    }

    static async getRoutine(idRoutine){
        return await Api.get(RoutineApi.getUrl(idRoutine));
    }
}

export {RoutineApi}
