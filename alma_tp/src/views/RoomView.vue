<template>
    <div class="room">
<!--        <AddRoomButton/>-->
        <v-dialog scrollable
                  overflow="auto"
                  v-model="dialog"
                  width="1000"
        >
            <template v-slot:activator="{ on, attrs }">
                 <v-btn class="button2 buttonAddRoom"
                        rounded
                        color="secondary"
                        v-bind="attrs"
                        v-on="on"
                        absolute
                 >
                       Agregar habitación
                       <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
                 </v-btn>
            </template>

            <v-card class="popup"
                    color="white--text"
            >
                <v-card-title>
                    <v-icon class="mr-2 " color="white" size="45px"> mdi-home-outline </v-icon>
                    Agregar habitación
                    <v-spacer/>
                    <v-btn color="transparent"
                           @click="dialog=false"
                           depressed
                    >
                        <v-icon color="white" size="30px">mdi-window-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-text-field outlined
                                      ref="title"
                                      v-model="room"
                                      placeholder="Escriba el nombre de la habitación"
                                      background-color="white"
                                      color="black"
                                      counter
                                      autofocus
                                      clearable
                                      maxlength="50"
                        />
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="acceptButtom"
                           color="primary black--text"
                           @click="addRoom"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
            <div  v-for="room in rooms"
                  :key="room">
              <v-row>
                <v-col>
                  <v-expansion-panels class="expansion"
                                      flat
                                      popout
                  >
                  <v-expansion-panel>
                    <v-expansion-panel-header>{{room.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content v-for="device in room.devices"
                                               :key="device">
                        {{device.name}}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>

                <v-col cols="12" md="6">
                  <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      offset-x>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn :to="{name:'AddDevice', params:{room: room} }"
                          text
                          @click="addRoom"
                      >
                        Dispositivo
                        <v-icon>mdi-plus-circle-outline</v-icon>
                      </v-btn>
                      <v-btn
                          fab
                          plain
                          v-bind="attrs"
                          v-on="on"
                          @click="room.show= !room.show"
                      >
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list v-if="room.show">
                      <v-list-item>
                        <v-list-item-action>
                          <v-btn class="button"
                                 plain
                                 rounded
                                 fab
                                 @click="edit=true"
                          >
                            <v-icon>mdi-pencil-outline</v-icon>
                            <EditView v-if="edit"/>
                          </v-btn>
                          <v-btn class="button"
                                 plain
                                 rounded
                                 fab
                                 @click="editColor(room) "
                          >
                            <v-icon>mdi-palette-outline</v-icon>
                          </v-btn>

                          <v-btn class="button"
                                 plain
                                 rounded
                                 fab
                                 @click="deleteRoom(room)"
                          >
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </div>

          </template>
        </ul>
    </div>
</template>

<script>
import EditView from "@/components/EditView";
import AddRoomButton from "@/components/AddRoomButton";

export default {
    name: "RoomView",
    components: {
      EditView,
      AddRoomButton
    },
    data(){
        return{
            edit:false,
            dialog: false,
            roomsAmount: 0,
            rooms: [],
            room:"",
            room2:"",
            click:false,
            tree:[],
            active:[],
            menu: false,
        }
    },
    methods: {
      reset(){ 
        this.$refs.title.reset();
      },
      addRoom(){
        if(this.room.length!==0){
          this.roomsAmount++;
          this.rooms.push(
              {name: this.room,
                devices: [{name:'device1', file:'png'}, {name:'device2', file:'png'}],
                show:false,
                showDevices:false
              });
        }
        this.dialog=false;
        this.reset();
        console.log('aceptar');
      },
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
        this.roomsAmount--;
      }
    }
}
</script>

<style scoped>

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