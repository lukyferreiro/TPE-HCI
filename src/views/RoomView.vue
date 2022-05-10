<template>
    <div class="room">

        <AddRoomButton/>

        <div v-if="roomsAmount==0">
            <h3 class="text"> No tienes habitaciones creadas aún. </h3>
            <v-layout align-content-center>
                <v-img alt="Imagen de fondo"
                       :src="require(`@/assets/withoutDevices.png`)"
                       class="mx-auto"
                       max-width="60%"
                       max-height="60%"
                />
            </v-layout>
        </div>

        <ul v-else>
          <template>
            <div v-for="room in rooms" :key="room.id">
              <RoomCard :room="room" />
            </div>
          </template>
        </ul>
    </div>
</template>

<script>
import AddRoomButton from "@/components/AddRoomButton";
import RoomCard from "@/components/RoomCard";
import rooms from '@/api/rooms'
import store from '@/store/index'

export default {
    name: "RoomView",
    components: {
      // EditView,
      AddRoomButton,
      RoomCard,
    },
    data(){
        return{
            edit:false,
            room2:"",
            active:[],
            menu: false,
        }
    },
    computed:{
        rooms(){
          return store.state.rooms
        },
        roomsAmount(){
          return store.getters.roomsAmount
        }
    },
    created() {
         rooms.getRooms(rooms => {
             store.commit("setRooms", rooms) })
    },
    methods: {
        addDevice(room){
            this.room.show=false
            console.log('add device in ' + room.name)
        },
        editRoom(room2){
            this.edit=false;
            console.log('edit room in ' + room2.name);
        },
        editColor(room){
            console.log('edit color in ' + room.name)
        },
        deleteRoom(room){
            this.rooms.splice(this.rooms.indexOf(room), 1);
        }
    }
}
</script>

<style scoped>

    .room{
        margin-top: 150px;
    }

    .text{
    margin: 10px;
    }

</style>