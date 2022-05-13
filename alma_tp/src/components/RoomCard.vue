<template>
    <v-row class="bar">
        <v-col>
            <v-expansion-panels class="expansion" hover flat>
                <v-expansion-panel>
                    <v-expansion-panel-header class="roomText blue lighten-5">
                        {{this.room.name}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-for="device in room.devices" :key="device">
                        <v-btn plain>
                            {{device.name}}
                        </v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>

        <v-col col="12" md="3">
            <v-menu v-model="menu"
                    :close-on-content-click="false"
                    offset-x
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :to="{name:'AddDevice', params:{room: room} }"
                           class="addButton"
                           color="secondary"
                           outlined
                           v-ripple="false" >
                        Agregar dispositivo
                        <v-icon class="ml-2" size="26">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                   <v-btn fab
                          v-ripple="false"
                          plain
                          v-bind="attrs"
                          v-on="on"
                          @click="showRoom"
                   >
                      <v-icon size="35" color="black">mdi-dots-vertical</v-icon>
                   </v-btn>
                </template>
                <div class="options"
                     v-if="room.show"
                     v-click-outside="showFalse">
                    <v-card-actions class="options">
                        <v-btn class="button"
                               plain
                               rounded
                               fab
                               @click="edit=true"
                               v-ripple="false"
                        >
                            Editar nombre
                            <v-icon class="ml-1">mdi-pencil-outline</v-icon>
                            <EditView v-if="edit"/>
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions class="options">
                        <v-btn class="button"
                               plain
                               rounded
                               fab
                               @click="editColor()"
                               v-ripple="false"
                        >
                            Editar color
                            <v-icon class="ml-2">mdi-palette-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions class="options">
                        <v-btn class="button"
                               plain
                               rounded
                               fab
                               @click="deleteRoom()"
                               v-ripple="false"
                        >
                            Borrar habitación
                            <v-icon class="ml-2">mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script>
import EditView from "@/components/EditView";
import {mapActions} from "vuex";

export default {
    name: "RoomCard",
    components:{
      EditView
    },
    props: ["room"],
    data(){
        return{
            edit: false,
            menu: false,
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

      editRoom(room2){
            this.edit=false;
            console.log('edit room to ' + room2.name);
      },
      editColor(){
            console.log('edit color in ' + this.room.name)
      },
      setResult(room){
        console.log(room)
        // this.$getRoom(room)
      },
      async deleteRoom(room){
        try {
          await this.$deleteRoom(this.room.id);
          this.setResult(room)
        }catch (e){
          this.setResult(e)
        }
      },
      showRoom(){
          let room = this.room;
          room.show = !room.show;
          this.$showRoom(room.id);
        },
        showFalse(){
          let room = this.room;
          room.show = false;
          this.$showRoom(room.id);
        }
    }
}
</script>

<style scoped>

    .expansion{
      border-radius: 0;
    }

    .options{
      justify-content: center;
      width: 230px;
      background-color: white;
    }

    .roomText{
      font-size: 20px;
      font-weight: bold;
    }

    .addButton{
      font-size: 15px;
      font-weight: bold;
    }

    .button{
      text-transform: none;
      font-size: 17px;
      color: black;
      font-weight: bold;
    }

</style>