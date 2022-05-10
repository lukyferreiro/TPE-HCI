// const _devices = [
//     {
//             name: "Aspiradora",
//             image: "robot-vacuum.png",
//             id: 1,
//             actions:{
//                 // encender: true,
//                 // apagar: false,
//                 // pausar: false,
//                 // reanudar: false,
//                 // modo: {
//                 //     aspirar: true,
//                 //     trapear: false
//                 // },
//                 // ubicacion: 0, //aca ira el id de la habitacion
//                 // // funcion estado
//             }
//         },
//         {
//             name: "Grifo",
//             image: "grifo-de-agua.png",
//             id: 2,
//             actions:[
//
//             ]
//
//         },
//         {
//             name: "Heladera",
//             image: "refrigerator.png",
//             id: 3,
//             actions:[
//
//             ]
//         },
//         {
//             name: "Horno",
//             image: "oven.png",
//             id: 4,
//             actions:[
//
//             ]
//
//         },
//         {
//             name: "Puerta",
//             image: "door.png",
//             id: 5,
//             actions:{
//                   /*   abrir: true,
//                     cerrar: false,
//                     desbloquear:false, */
//
//             }
//         }
// ];
//
// export default {
//     getDevices(okCallback){
//         setTimeout(()=> okCallback(_devices), 100 )
//     }
// }
export default {
    devices: [
        {
            name: "Aspiradora",
            image: "robot-vacuum.png",
            id: 1,
            actions:{
                // encender: true,
                // apagar: false,
                // pausar: false,
                // reanudar: false,
                // modo: {
                //     aspirar: true,
                //     trapear: false
                // },
                // ubicacion: 0, //aca ira el id de la habitacion
                // // funcion estado
            }
        },
        {
            name: "Grifo",
            image: "grifo-de-agua.png",
            id: 2,
            actions:[

            ]

        },
        {
            name: "Heladera",
            image: "refrigerator.png",
            id: 3,
            actions:[

            ]
        },
        {
            name: "Horno",
            image: "oven.png",
            id: 4,
            actions:[

            ]

        },
        {
            name: "Puerta",
            image: "door.png",
            id: 5,
            actions:{
                  /*   abrir: true,
                    cerrar: false,
                    desbloquear:false, */

            }
        },
    ]
};