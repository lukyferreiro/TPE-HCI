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
                                  @click="showRoom"
                                  v-click-outside="showFalse"
                           >
                              <v-icon size="35" color="black">mdi-dots-vertical</v-icon>
                           </v-btn>
                        </template>
                        <div class="options">
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
                                    </v-btn>
                                </v-list-item>

                              <template>
                                <v-dialog scrollable
                                          overflow="auto"
                                          v-model="edit"
                                          width="1000"
                                >
                                  <v-card color="secondary white--text"
                                          v-click-outside="closePopup">
                                    <v-card-title>
                                      <v-icon class="mr-2" color="white" size="45px"> mdi-home-outline </v-icon>
                                      Editar habitación
                                      <v-spacer/>
                                      <v-btn color="transparent"
                                             @click="closePopup, edit=false"
                                             depressed>
                                        <v-icon color="white" size="30px">mdi-window-close</v-icon>
                                      </v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-form ref="form" lazy-validation @submit="submit">
                                        <v-text-field outlined
                                                      ref="title"
                                                      v-model="newRoomName"
                                                      placeholder="Escriba el nombre del dispositivo"
                                                      background-color="white"
                                                      color="black"
                                                      counter
                                                      autofocus
                                                      clearable
                                                      maxlength="60"
                                                      required
                                                      :rules="nameRules"/>
                                      </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn class="mb-2"
                                             color="primary black--text"
                                             @click="editRoomName()"
                                      >
                                        Aceptar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </template>


                                <v-list-item>
                                  <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn class="button buttonEditColor"
                                             color="black"
                                             v-bind="attrs"
                                             v-on="on"
                                             plain
                                             fab
                                             v-ripple="false">
                                        <v-icon class="mr-2" color="black">mdi-palette-outline</v-icon>
                                        Editar color
                                      </v-btn>
                                    </template>
                                    <v-list>
                                      <v-list-item v-for="(color, index) in colors"
                                                   :key="index">
                                        <v-btn color="transparent"
                                               depressed
                                               @click="updateColor(color.hex)">
                                          <v-list-item-icon>
                                            <v-icon :color="color.hex"> mdi-square</v-icon>
                                          </v-list-item-icon>
                                          <v-list-item-title>{{ color.name }}</v-list-item-title>
                                        </v-btn>
                                      </v-list-item>
                                    </v-list>
                                  </v-menu>

                                  <!--                                  <ColorRoomSelector :element="room" edit="true"/>-->
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

import {mapActions, mapState} from "vuex";

export default {
  name: "RoomCard",

  props: ["room"],
  data() {
    return {
      edit: false,
      menu: false,
      devices: null,
      myroomcolor: this.room.meta.colorRoom,
      colors: [
        {
          "hex": "#E3F2FD",
          "name": "Light Blue"
        },
        {
          "hex": "#D1C4E9",
          "name": "Light Purple"
        },
        {
          "hex": "#DCEDC8",
          "name": "Light Green"
        },
        {
          "hex": "#FFF9C4",
          "name": "Light Yellow"
        },
        {
          "hex": "#FCE4EC",
          "name": "Light Pink"
        }
      ],
      newRoomName: this.room.name,
      nameRules: [
        v => !!v || 'Campo Obligatorio',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
        v => this.$rooms.find( o => o.name === v && o.id != this.room.id ) == null || 'El nombre ingresado ya existe'

      ],
  }
    },

    async created() {
      this.devices = await this.$getDevices(this.room.id)
    },

    computed:{
        roomDevices(){
          return this.devices ? this.devices.length : 0
        },
        ...mapState("room",{
          $rooms:"rooms"
        })
    },

    methods: {
      ...mapActions("room",{
        $addRoom: "add",
        $editRoom: "edit",
        $deleteRoom: "delete",
        $getAllRooms: "getAll",
        $getRoom : "get",
        $getDevices: "getAllDevices",
      }),

      ...mapActions("devices",{
        $getAll: "getAll",
        $deleteDevice : "delete"
      }),

      /*editRoom(room2){
          this.edit = false;
          console.log('edit room to ' + room2.name);
      },*/

      // editColor(){
      //     console.log('edit color in ' + this.room.name);
      // },

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
          room.meta.show = !room.meta.show;
          let idS = [this.room.id, room]
          this.$editRoom(idS);
        },

      showFalse(){
          let room = this.room;
          room.meta.show = false;
          let idS = [this.room.id, room]
          this.$editRoom(idS);
      },

       async updateColor(colorSelected){
        this.myroomcolor=colorSelected
        let room = this.room
        room.meta.colorRoom = colorSelected
        let idS=[this.room.id,room]
        await this.$editRoom(idS)
      },

      async editRoomName(){
        if(this.$refs.form.validate()) {
          this.edit = false
          let room = this.room
          room.name = this.newRoomName
          let idS = [this.room.id, room]
          await this.$editRoom(idS)
        }
      },
      reset(){
        this.$refs.title.reset();
      },
      closePopup(){
        this.reset();
      },
      submit(e){
        e.preventDefault();
        this.editRoomName()
      },

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