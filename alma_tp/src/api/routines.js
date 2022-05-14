// const _routines=[
    // {
    //     name:,
    //     roomsName:[ {roomName:   , devices: [{ name:
    //                                          actions: []
    //                                         }]
    //                  }
    //     ],
    //     time: ,
    //     execute: true/false(si esta en ejecucion estaria en true)
    // }
// ]
//
// export default {
//     getRoutines(okCallback){
//         setTimeout(()=> okCallback(_routines), 100 )
//     },
// }

import {Api} from "@/api/api";

class RoutineApi {
    static getUrl(slug){
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}`
    }

    static async addRoutine(routine){
        return await Api.post(RoutineApi.getUrl(), routine);
    }

    static async editRoutine(routine){
        return await Api.put(RoutineApi.getUrl(routine.id) + "/execute", routine);
    }

    static async executeRoutine(routine){
        return await Api.put(RoutineApi.getRoutine(routine.id), routine);
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
