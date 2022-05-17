<template>
    <v-card class="roomCard" :color="myroomcolor">
        <v-row>
            <v-col>
                <v-expansion-panels class="expansion" hover flat>
                    <v-expansion-panel>
                        <v-expansion-panel-header class="roomText" :color="myroomcolor" >
                            {{room.name}}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content v-if="roomDevices===0" class="pt-2 pl-4" :color="myroomcolor" >
                            <p>No cuentas con ningún dispositivo vinculado.</p>
                        </v-expansion-panel-content>
                        <v-expansion-panel-content v-else
                                                   class="pt-2 pl-4"
                                                   :color="myroomcolor"
                                                   >

                          <v-row >
                              <v-col class="deviceCardInRoom" v-for="device in this.devices" :key="device.id">
                                <v-card :color="device.meta.color"
                                        max-width="190"
                                        max-height="200"
                                        :to="{name: 'EditDeviceView', params:{idType: device.type.id,
                                                                  deviceName: device.name,
                                                                  roomId: room.id,
                                                                  device: device,
                                                                  image: device.meta.image,
                                                                  edit: true}}">
                                    <v-card-actions class="imageDeviceInRoom">
                                        <v-img :src="device.meta.image"
                                               :alt="device.name"
                                               max-height="30%"
                                               max-width="30%"/>
                                    </v-card-actions>
                                    <v-card-title class="deviceText">
                                        {{device.name}}
                                    </v-card-title>
                                </v-card>
                              </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>

            <div class="roomConfiguration">
                <div class="addDeviceButton">
                    <v-btn :to="{name:'AddDeviceView', params:{room: room} }"
                           class="addDeviceButtonText pl-2"
                           color="secondary"
                           outlined
                           v-ripple="false" >
                        <v-icon class="mr-2" size="26">mdi-plus-circle-outline</v-icon>
                        Agregar dispositivo
                    </v-btn>
                </div>
                <div class="overflowButton">
                    <v-menu v-model="menu"
                            :close-on-content-click="false"
                            offset-x>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn fab
                                  v-ripple="false"
                                  plain
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="showRoom">
                              <v-icon size="35" color="black">mdi-dots-vertical</v-icon>
                           </v-btn>
                        </template>
                        <div class="options"
                             v-if="room.show"
                             v-click-outside="showFalse">
                            <v-list>
                                <v-list-item>
                                    <v-btn class="button buttonEditName"
                                           plain
                                           rounded
                                           fab
                                           @click="edit=true"
                                           v-ripple="false"
                                    >
                                        <v-icon class="mr-2">mdi-pencil-outline</v-icon>
                                        Editar nombre
                                        <EditView v-if="edit"/>
                                    </v-btn>
                                </v-list-item>
                                <v-list-item>
                                    <ColorRoomSelector :room="room"/>
                                </v-list-item>
                                <v-list-item>
                                    <v-btn class="button buttonDelete"
                                           plain
                                           rounded
                                           fab
                                           @click="deleteRoom()"
                                           v-ripple="false"
                                    >
                                        <v-icon class="mr-2">mdi-trash-can-outline</v-icon>
                                        Borrar habitación
                                    </v-btn>
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-menu>
                </div>
            </div>
        </v-row>
    </v-card>
</template>

<script>
import EditView from "@/components/EditView";
import {mapActions} from "vuex";
import ColorRoomSelector from "@/components/ColorRoomSelector";

export default {
    name: "RoomCard",
    components:{
        ColorRoomSelector,
        EditView,
    },
    props: ["room"],
    data(){
        return{
            edit: false,
            menu: false,
            devices: null,
            myroomcolor: this.room.meta.colorRoom
        }
    },

    async created() {
      this.devices = await this.$getDevices(this.room.id)
    },

    computed:{
        roomDevices(){
          return this.devices ? this.devices.length : 0
        }
    },

    methods: {
      ...mapActions("room",{
        $addRoom: "add",
        $editRoom: "edit",
        $deleteRoom: "delete",
        $getAllRooms: "getAll",
        $getRoom : "get",
        $showRoom: "show",
        $getDevices: "getAllDevices",
      }),

      ...mapActions("devices",{
        $getAll: "getAll",
        $deleteDevice : "delete"
      }),

      editRoom(room2){
          this.edit = false;
          console.log('edit room to ' + room2.name);
      },

      editColor(){
          console.log('edit color in ' + this.room.name);
      },

      setResult(room){
          console.log(room);
      },

      async deleteRoom(room){
          try {
            let devices = await this.$getDevices(this.room.id);
            console.log(devices);
            await Array.from(devices).forEach(device => {
              this.$deleteDevice(device.id);
            });
            await this.$deleteRoom(this.room.id);
            this.setResult(room);
          } catch (e){
            this.setResult(e);
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

    .roomCard{
      margin-left: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 10px;
    }

    .expansion{
      border-radius: 0;
    }

    .roomText{
      font-size: 25px;
      font-weight: bold;
    }

    .deviceCardInRoom{
    /*  display: inline-block; me parece q esto no hace falta */
    }

    .deviceText{
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      padding: 0 5px 5px;
    }

    .imageDeviceInRoom{
      justify-content: center;
    }

    .button{
      text-transform: none;
      font-size: 17px;
      color: black;
      font-weight: bold;
    }
    .buttonEditName{
      padding-left: 75px;
    }
    .buttonEditColor{
      padding-left: 65px;
    }
    .buttonDelete{
      padding-left: 91px;
    }

    p{
      font-size: 17px;
      font-weight: bold;
    }

    .roomConfiguration{
      display: flex;
      align-items: start;
    }

    .addDeviceButton{
      padding-top: 20px;
    }
    .addDeviceButtonText{
      font-size: 15px;
      font-weight: bold;
    }

    .overflowButton{
      padding-top: 10px;
    }

    .options{
      justify-content: center;
      width: 230px;
      background-color: white;
    }

</style>