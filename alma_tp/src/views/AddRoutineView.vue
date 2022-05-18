<template>
    <div class="routine ml-15 mr-15" >
      <v-card :color="colorSelected">
        <v-card-title>
          <h2>
              <v-icon color="black" size="50px" class="mL-3"> mdi-clipboard-list-outline </v-icon>
              Agregar rutina
          </h2>
          <v-spacer/>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="transparent"
                     v-bind="attrs"
                     v-on="on"
                     depressed
                     fab >
                <v-icon color="black" size="40px">mdi-palette-outline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(color, index) in colors"
                           :key="index">
                <v-btn color="transparent"
                       depressed
                       @click="colorSelected=color.hex">
                  <v-list-item-icon>
                    <v-icon :color="color.hex"> mdi-square</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ color.name }}</v-list-item-title>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
      <v-form ref="form" lazy-validation @submit="submit">
            <v-container>
                <v-text-field outlined
                              ref="title"
                              v-model="routinetitle"
                              placeholder="Escriba el nombre de la rutina"
                              counter
                              autofocus
                              clearable
                              color="black"
                              maxlength="60"
                              :rules="nameRules"
                              required/>
            </v-container>
        </v-form>


        <v-divider class="mt-6 mx-4"></v-divider>

      <div v-for="(room, indexRoom) in rooms"
           :key="indexRoom">
        <v-card :color="room.room.meta.colorRoom">
        <v-row>
              <v-col>
                <v-expansion-panels class="expansion" hover flat >
                  <v-expansion-panel>
                    <v-expansion-panel-header class="roomText" :color="room.room.meta.colorRoom">
                      {{room.room.name}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-if="rooms[indexRoom].selectedDevices.length===0"
                                               :color="room.room.meta.colorRoom">
                      No tienes ningún dispositivo vinculado
                    </v-expansion-panel-content>

                    <v-expansion-panel-content v-else
                                               v-for="device in rooms[indexRoom].selectedDevices" :key="device.id"
                                               :color="room.room.meta.colorRoom">

                      <v-row>
                        <v-col class="deviceCardInRoom" :key="device.id" md="4">
                          <v-dialog overflow="auto"
                                    v-model="device.meta.selected"
                                    >
                            <template v-slot:activator="{ on, attrs }">
                              <v-card :color="device.meta.color"
                                      max-width="190"
                                      max-height="200"
                                      v-bind="attrs"
                                      v-on="on"
                              >
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
                            </template>

                            <v-card :color="device.meta.color">
                              <v-card-actions>
                                  <v-col>
                                  <div>
                                    <v-card-title class="titleCard">
                                      Setear dispositivo: {{ device.name }}
                                      <v-spacer/>
                                      <v-btn color="transparent"
                                             @click="device.meta.selected=false"
                                             fab
                                             depressed>
                                        <v-icon size="30px">mdi-window-close</v-icon>
                                      </v-btn>
                                    </v-card-title>
                                  </div>
                                </v-col>
                              </v-card-actions>
                                <div class="image">
                                  <v-avatar rounded
                                            size="20%">
                                    <v-img :src="device.meta.image"
                                           :alt="device.name"
                                           contain
                                           height="150px"
                                           width="150px"
                                    />
                                  </v-avatar>
                                </div>

                              <v-divider/>


                                <DoorAction v-if="device.type.id === 'lsf78ly0eqrjbz91'"
                                            :myColor="device.meta.color"
                                            v-bind:myactions="actions"
                                            v-on:setAction="updateActions($event, device)"
                                />
                                <OvenAction v-else-if="device.type.id === 'im77xxyulpegfmv8'"
                                            :myColor="device.meta.color"
                                            v-bind:myactions="actions"
                                            v-on:setAction="updateActions($event, device)"
                                />
                                <RefrigeratorAction v-else-if="device.type.id === 'rnizejqr2di0okho'"
                                                    :myColor="device.meta.color"
                                                    v-bind:myactions="actions"
                                                    v-on:setAction="updateActions($event, device)"
                                />
                                <SpeakerAction v-else-if="device.type.id === 'c89b94e8581855bc'"
                                               :myColor="device.meta.color"
                                               v-bind:myactions="actions"
                                               v-on:setAction="updateActions($event, device)"
                                />
                              <LampAction v-else-if="device.type.id === 'go46xmbqeomjrsjr'"
                                          :myColor="device.meta.color"
                                          v-bind:myactions="actions"
                                          v-on:setAction="updateActions($event, device)"
                              />

                            </v-card>
                          </v-dialog>

                        </v-col>

                        <v-col>
                          <v-card :color="device.meta.color">
                            <v-card-title class="deviceText">Acciones:</v-card-title>
                              <v-list-item v-for="(actions, index) in getDeviceActions(device.id)"
                                           :key="index">
                                <v-list-item-content>
                                  <v-list-item-title>{{ actions.name }} {{actions.props}}</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                          </v-card>

                        </v-col>
                        <v-btn color="transparent"
                               depressed
                               fab
                               @click="deleteRoutineDevice(device,indexRoom)"
                        >
                          <v-icon  color="black" size="30px">mdi-trash-can-outline</v-icon>
                        </v-btn>

                      </v-row>

                    </v-expansion-panel-content>

                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>

              <v-col>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        rounded
                        class="button"
                        color="secondary"
                        v-bind="attrs"
                        v-on="on"
                    >
                      Agregar Dispositivo
                      <v-icon class="ml-2" size="26">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                        v-for="dev in rooms[indexRoom].devices"
                        :key="dev.id"
                    >
                      <v-list-item-action>
                        <v-btn class="button"
                               plain
                               @click="addDeviceToRoom(dev, indexRoom)">
                          {{ dev.name }}
                        </v-btn>

                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
        </v-card>
      </div>


<!--            menu habitacion-->
      <v-col>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        rounded
                        class="button"
                        color="secondary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                      Seleccionar Habitación
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                        v-for="room in $rooms"
                        :key="room.id"
                    >
                      <v-list-item-action>
                        <v-btn class="button"
                               plain
                               @click="selectRoom(room)">
                          {{ room.name }}
                        </v-btn>

                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-menu>
          </v-col>


          <v-divider></v-divider>

        <div class="acceptAndCancel">
            <div>
                <GoBack name="Cancelar"
                        color="secondary white--text ma-8"/>
            </div>
            <div>
                <v-btn color="secondary white--text"
                       @click="addRoutine">
                    Aceptar
                </v-btn>
            </div>
        </div>
      </v-card>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack";
import {mapActions, mapState} from "vuex";
import DoorAction from "@/components/DevicesCardForRoutine/DoorAction";
import OvenAction from "@/components/DevicesCardForRoutine/OvenAction";
import RefrigeratorAction from "@/components/DevicesCardForRoutine/RefrigeratorAction";
import SpeakerAction from "@/components/DevicesCardForRoutine/SpeakerAction";
import LampAction from "@/components/DevicesCardForRoutine/LampAction";

export default {
  name: "AddRoutineView",
  components: {
    LampAction,
    GoBack,
    DoorAction,
    OvenAction,
    RefrigeratorAction,
    SpeakerAction
  },
  data(){
    return{
      nameRules:[
        v => !!v || 'Campo Obligatorio',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
      ],
      routinetitle: "",
      actions: [],
      rooms: [],
      dialog: false,
      colorSelected:"#E3F2FD",
      colors: [
        {
          "hex": "#E3F2FD",
          "name": "Azul"
        },
        {
          "hex": "#D1C4E9",
          "name": "Violeta"
        },
        {
          "hex": "#DCEDC8",
          "name": "Verde"
        },
        {
          "hex": "#FFF9C4",
          "name": "Amarillo"
        },
        {
          "hex": "#FCE4EC",
          "name": "Rosa"
        }
      ],
    }
  },
  computed: {
    ...mapState("room",{
      $rooms: "rooms"
    }),
    ...mapState("routine",{
      $routines: "routines"
    }),

  },
  methods:{
    ...mapActions("devices",{
      $addDevice: "add",
      $editDevice: "edit",
      $getAllDevices: "getAll",
      $deleteDevice: "delete"
    }),
    ...mapActions("routine",{
      $addRoutine: "add",
      $editRoutine: "edit",
      $deleteRoutine: "delete",
      $executeRoutine: "execute",
      $getRoutine: "get",
      $getAll: "getAll"
    }),

    ...mapActions("room",{
      $getDevices: "getAllDevices"
    }),

    reset() {
      this.$refs.title.reset();
    },

    submit(e){
      e.preventDefault();
      this.addRoutine()
    },

    async addRoutine() {
      if (this.$refs.form.validate()) {
        let routine = {
          name: this.routinetitle,
          actions: this.actions,
          meta: {
            play: false,
            color: this.colorSelected,
            rooms: this.rooms,
          }
        }
        routine = await this.$addRoutine(routine)
        this.setResult(routine.id)
        this.$router.go(-1);
        this.reset();
      }
    },
    setResult(routine){
      console.log(routine)
    },
    updateActions(newVal, device){
        let action = {
          device: {id:device.id},
          actionName: newVal.name,
          params: newVal.params,
          meta: newVal.meta
        }
          this.actions.push(action)
          device.meta.selected = false
    },

    async selectRoom(room){
      let device =await this.$getDevices(room.id)
      console.log(device)
      this.rooms.push({room:room, devices: device, selectedDevices: [],actions:[]});
    },

    addDeviceToRoom(device, indexRoom){
      let room = this.rooms[indexRoom]
      room.devices.splice(device.id)
      room.selectedDevices.push(device)
    },

    deleteRoutineDevice(device, indexRoom){
      let room = this.rooms[indexRoom]
      room.selectedDevices.splice(device.id)
      room.devices.push(device)
      this.actions.splice(device.id)
    },

    getDeviceActions(deviceId){
      let myAction = []
      this.actions.forEach(action => {
        if(action.device.id === deviceId){
          let newAction = {
            name:action.meta.spanishName,
            props: action.meta.spanishPropName
          }
          myAction.push(newAction)
        }
      })
      return myAction
    }

  }
}
</script>

<style scoped>
    .routine{
        margin-top: 140px;
    }

    .button{
      width: 500px;
      margin: 10px;
    }

    .acceptAndCancel{
      display: flex;
      justify-content: center;
      align-items: center;
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

    .image{
      display: flex;
      justify-content: center;
      align-items: center;
    }

</style>