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
            <div v-for="room in rooms" :key="room">
              <RoomCard :room="room" />
            </div>
<!--               <v-row> -->
<!--                 <v-col> -->
<!--                   <v-expansion-panels class="expansion" -->
<!--                                       flat -->
<!--                                       popout -->
<!--                   > -->
<!--                   <v-expansion-panel> -->
<!--                     <v-expansion-panel-header>{{room.name}}</v-expansion-panel-header> -->
<!--                     <v-expansion-panel-content v-for="device in room.devices" -->
<!--                                                :key="device"> -->
<!--                         {{device.name}} -->
<!--                     </v-expansion-panel-content> -->
<!--                   </v-expansion-panel> -->
<!--                   </v-expansion-panels> -->
<!--                 </v-col> -->

<!--                 <v-col cols="12" md="6"> -->
<!--                   <v-menu -->
<!--                       v-model="menu" -->
<!--                       :close-on-content-click="false" -->
<!--                       offset-x> -->
<!--                     <template v-slot:activator="{ on, attrs }"> -->
<!--                       <v-btn :to="{name:'AddDevice', params:{room: room} }" -->
<!--                           text -->
<!--                           @click="addRoom" -->
<!--                       > -->
<!--                         Dispositivo -->
<!--                         <v-icon>mdi-plus-circle-outline</v-icon> -->
<!--                       </v-btn> -->
<!--                       <v-btn -->
<!--                           fab -->
<!--                           plain -->
<!--                           v-bind="attrs" -->
<!--                           v-on="on" -->
<!--                           @click="room.show= !room.show" -->
<!--                       > -->
<!--                         <v-icon>mdi-dots-vertical</v-icon> -->
<!--                       </v-btn> -->
<!--                     </template> -->
<!--                     <v-list v-if="room.show"> -->
<!--                       <v-list-item> -->
<!--                         <v-list-item-action> -->
<!--                           <v-btn class="button" -->
<!--                                  plain -->
<!--                                  rounded -->
<!--                                  fab -->
<!--                                  @click="edit=true" -->
<!--                           > -->
<!--                             <v-icon>mdi-pencil-outline</v-icon> -->
<!--                             <EditView v-if="edit"/> -->
<!--                           </v-btn> -->
<!--                           <v-btn class="button" -->
<!--                                  plain -->
<!--                                  rounded -->
<!--                                  fab -->
<!--                                  @click="editColor(room) " -->
<!--                           > -->
<!--                             <v-icon>mdi-palette-outline</v-icon> -->
<!--                           </v-btn> -->

<!--                           <v-btn class="button" -->
<!--                                  plain -->
<!--                                  rounded -->
<!--                                  fab -->
<!--                                  @click="deleteRoom(room)" -->
<!--                           > -->
<!--                             <v-icon>mdi-trash-can-outline</v-icon> -->
<!--                           </v-btn> -->
<!--                         </v-list-item-action> -->
<!--                       </v-list-item> -->
<!--                     </v-list> -->
<!--                   </v-menu> -->
<!--                 </v-col> -->
<!--               </v-row> -->

          </template>
        </ul>
    </div>
</template>

<script>
// import EditView from "@/components/EditView";
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
            dialog: false,
          // room:{
          //   name:"",
          //   devices: [],
          //   show: false,
          // },
            roomname:"",
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
        margin-top: 120px;
    }

    .text{
    margin: 10px;
    }

    .buttonAddRoom{
    bottom: 80px;
    right: 50px;
    }

    .button2{
    margin: 8px;
    }

    .popup{
    background-color: #0F4C75;
    }

    .acceptButtom{
    background-color: #B5D9F1;
    color: #000000;
    }
    .expansion{
    margin: 5px;
    }
</style>