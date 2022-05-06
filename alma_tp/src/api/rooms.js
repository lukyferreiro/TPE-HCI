const _rooms=[
    {   name: 'room1',
        devices: [{name:'device1', file:'png'}, {name:'device2', file:'png'}],
        show:false,
        showDevices:false
    },
    {   name: 'room2',
        devices: [{name:'device1', file:'png'}, {name:'device2', file:'png'}],
        show:false,
        showDevices:false
    },
]

export default{
    getRooms(okCallback){
        setTimeout(()=> okCallback(_rooms), 100 )
    },
    getRoom(room, okCallback, errorCallback){
        setTimeout(() => {
            Math.random() > 0.5 ?  okCallback() : errorCallback()
        },100)
    }
}