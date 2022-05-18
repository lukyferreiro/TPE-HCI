<template>
    <div class="room">
        <div v-if="$roomsAmount==0">
            <h3 class="text"> No tienes habitaciones creadas aún. </h3>
            <div class="imagen">
                <v-img alt="Imagen de fondo"
                       :src="require(`@/assets/withoutDevices.png`)"
                       class="mx-auto"
                       max-width="60%"
                       max-height="60%"
                />
            </div>
        </div>
        <div v-else v-for="room in $rooms"
             :key="room.id"
             class="withRooms">
            <RoomCard :room="room" />
        </div>
      <AddRoomButton/>
    </div>
</template>

<script>
import AddRoomButton from "@/components/AddRoomButton";
import RoomCard from "@/components/RoomCard";
import {mapActions, mapState} from "vuex";

export default {
    name: "RoomView",
    components: {
      AddRoomButton,
      RoomCard,
    },
  mounted() {
      this.$getAllRooms()
  },
  data(){
        return{
            edit:false,
            room2:"",
            active:[],
            menu: false,
            color:'primary'
        }
    },
    computed:{
      ...mapState("room",{
            $rooms: "rooms",
            $roomsAmount: "roomsAmount"
          }
      ),

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
        margin-top: 130px;
        margin-bottom: 50px;
    }

    .text{
      margin: 10px;
      padding-left: 15px;
      font-size: 30px;
      font-weight: bold;
    }

    .imagen{
      padding-top: 5vh;
    }

    .withRooms{
      max-width: 80%;
    }

</style>