const _rooms=[
    // {   name: 'room1',
    //     devices: [{name:'device1', file:'png'}, {name:'device2', file:'png'}],
    //     show:false,
    // }
]

export default{
    getRooms(okCallback){
        setTimeout(()=> okCallback(_rooms), 100 )
    },
}