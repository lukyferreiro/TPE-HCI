<template>
    <div class="room">

        <AddRoomButton/>
<!--        <EditVacuum/>-->
<!--        <EditRefrigerator/>-->
<!--        <EditHorno/>-->
<!--        <EditDoor/>-->
<!--        <EditGrifo/>-->


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
            <div v-for="room in $rooms" :key="room.id">
              <RoomCard v-bind:room="room"/>
            </div>
          </template>
        </ul>
    </div>
</template>

<script>
import AddRoomButton from "@/components/AddRoomButton";
import RoomCard from "@/components/RoomCard";
// import rooms from '@/api/rooms'
// import store from '@/store/index'
// import EditVacuum from '@/components/EditVacuum'
// import EditRefrigerator from '@/components/EditRefrigerator'
// import EditHorno from "@/components/EditHorno";
// import EditDoor from '@/components/EditDoor'
// import EditGrifo from '@/components/EditGrifo'
import {mapActions, mapState} from "vuex";

export default {
    name: "RoomView",
    components: {
      // EditView,
      AddRoomButton,
      RoomCard,
      // EditVacuum,
      // EditRefrigerator,
      // EditHorno,
      // EditDoor,
      // EditGrifo,
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
      ...mapState("room",{
            $rooms: "rooms"
          }
      ),
      roomsAmount(){
          return this.$getAllRooms().length
        }
    },
    methods: {
      ...mapActions("room",{
        $addRoom: "add",
        $editRoom: "edit",
        $deleteRoom: "delete",
        $getAllRooms: "getAll",
        $getRoom : "get",
        $showRoom: "show"
      }),
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
        setResult(room){
          console.log(room)
        },

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