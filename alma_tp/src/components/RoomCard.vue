<template>
    <v-row>
        <v-col>
            <v-expansion-panels class="expansion" hover flat>
                <v-expansion-panel>
                    <v-expansion-panel-header class="roomText blue lighten-5">
                        {{room.name}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-if="roomDevices===0" class="pt-2 pl-4 blue lighten-5" >
                        <p>No tienes ningún dispositivo vinculado.</p>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content v-else
                                               v-for="device in this.devices" :key="device.id"
                                               class="pt-2 pl-4 blue lighten-5">
                        <div class="deviceCardInRoom">
                            <v-card color="primary"
                                    max-width="120"
                                    max-height="120"
                                    :to="{name: 'EditDeviceView', params:{idType: device.type.id,
                                                              deviceName: device.name,
                                                              roomId: room.id,
                                                              device: device,
                                                              image: device.meta.image,
                                                              edit: true}}">
                                <v-card-actions class="imageDeviceInRoom">
                                    <v-img :src="device.meta.image"
                                           :alt="device.name"
                                           max-height="50%"
                                           max-width="50%"/>
                                </v-card-actions>
                                <v-card-title class="deviceText">
                                    {{device.name}}
                                </v-card-title>
                            </v-card>
                        </div>

<!--                        <v-row>-->
<!--                            <v-btn plain>-->
<!--                                {{device.name}}-->
<!--                            </v-btn>-->
<!--                            <div>-->
<!--                                <v-btn class="button"-->
<!--                                       plain-->
<!--                                       rounded-->
<!--                                       fab-->
<!--                                       :to="{name: 'EditDeviceView' , params:{idType: device.type.id,-->
<!--                                                  deviceName: device.name,-->
<!--                                                  roomId: room.id,-->
<!--                                                  device: device,-->
<!--                                                  image: device.meta.image,-->
<!--                                                  edit: true}}">-->
<!--                                    <v-icon class="ml-1">mdi-pencil-outline</v-icon>-->
<!--                                </v-btn>-->
<!--                            </div>-->
<!--                        </v-row>-->
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
                                <v-btn class="button buttonEditColor"
                                       plain
                                       rounded
                                       fab
                                       @click="editColor()"
                                       v-ripple="false"
                                >
                                    <v-icon class="mr-2">mdi-palette-outline</v-icon>
                                    Editar color
                                </v-btn>
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
</template>

<script>
import EditView from "@/components/EditView";
import {mapActions} from "vuex";

export default {
    name: "RoomCard",
    components:{
        EditView,
    },
    props: ["room"],
    data(){
        return{
            edit: false,
            menu: false,
            devices: null
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

    .expansion{
      border-radius: 0;
    }

    .roomText{
      font-size: 20px;
      font-weight: bold;
    }

    .deviceCardInRoom{
      display: inline-block;
    }

    .deviceText{
      justify-content: center;
      font-size: 15px;
      font-weight: bold;
      padding: 0;
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