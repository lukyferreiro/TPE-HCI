const _routines=[
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
]

export default {
    getRoutines(okCallback){
        setTimeout(()=> okCallback(_routines), 100 )
    },
}