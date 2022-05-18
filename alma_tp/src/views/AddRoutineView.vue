<template>
    <div class="routine ml-15 mr-15">
        <h2>
            <v-icon color="black" size="50px" class="mL-3"> mdi-clipboard-list-outline </v-icon>
            Agregar rutina
        </h2>

        <v-form ref="form" lazy-validation>
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

        <TimeSelector v-bind:mydays="routinedays"
                      v-on:changeDays="updateDays($event)"
                      v-bind:mytime="routinetime"
                      v-on:changeTime="updateTime($event)"/>

        <v-divider class="mt-6 mx-4"></v-divider>

      <div v-for="(room, index) in rooms"
           :key="index">
        <v-card class="blue lighten-5">
        <v-row>
              <v-col>
                <v-expansion-panels class="expansion" hover flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="roomText blue lighten-5">
                      {{room.room.name}}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-if="rooms[index].selectedDevices.length===0"
                                               class="pt-2 pl-4 blue lighten-5" >
                      <p>No tienes ningún dispositivo vinculado.</p>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content v-else
                                               v-for="device in rooms[index].selectedDevices" :key="device.id"
                                               class="pt-2 pl-4 blue lighten-5 flex">
                      <v-row>
                        <v-col class="deviceCardInRoom" :key="device.id" md="4">
                          <v-dialog
                                    overflow="auto"
                                    v-model="dialog"
                                    >
                            <template v-slot:activator="{ on, attrs }">
                              <v-card :color="device.meta.color"
                                      max-width="190"
                                      max-height="200"
                                      v-bind="attrs"
                                      v-on="on"
                              >
                                <!--Mi idea es editar el newDevice-->
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
                              <div class="image">
                                <v-avatar rounded
                                          size="20%">
                                  <v-img :src="device.meta.image"
                                         :alt="device.name" />
                                </v-avatar>
                              </div>
                              <div>
                                <v-card-title class="titleCard mb-7">
                                  <p> Setear dispositivo: {{ device.name }} </p>
                                </v-card-title>
                              </div>

                              <v-divider/>
                                <DoorAction v-if="device.type.id === 'lsf78ly0eqrjbz91'"
                                            :myColor="device.meta.color"
                                            v-bind:myactions="actions"
                                            v-on:setAction="updateActions($event, device)"
                                />
                                <FaucetAction v-else-if="device.type.id === 'dbrlsh7o5sn8ur4i'"
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
                                <SpeakerAction v-else
                                               :myColor="device.meta.color"
                                               v-bind:myactions="actions"
                                               v-on:setAction="updateActions($event, device)"
                                />

                            </v-card>
                          </v-dialog>

                        </v-col>

                        <v-col >
                          <v-card :color="device.meta.color">
                            <v-card-title class="deviceText">Acciones:</v-card-title>

                          </v-card>
                        </v-col>

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
                        v-for="dev in rooms[index].devices"
                        :key="dev.id"
                    >
                      <v-list-item-action>
                        <v-btn class="button"
                               plain
                               @click="addDeviceToRoom(dev, index)">
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
    </div>
</template>

<script>
import GoBack from "@/components/GoBack";
import TimeSelector from "@/components/TimeSelector";
import {mapActions, mapState} from "vuex";
import DoorAction from "@/components/DevicesCardForRoutine/DoorAction";
import FaucetAction from "@/components/DevicesCardForRoutine/FaucetAction";
import OvenAction from "@/components/DevicesCardForRoutine/OvenAction";
import RefrigeratorAction from "@/components/DevicesCardForRoutine/RefrigeratorAction";
import SpeakerAction from "@/components/DevicesCardForRoutine/SpeakerAction";

export default {
  name: "AddRoutineView",
  components: {
    TimeSelector,
    GoBack,
    DoorAction,
    FaucetAction,
    OvenAction,
    RefrigeratorAction,
    SpeakerAction
  },
  data(){
    const date = new Date();
    return{
      edit: false,
      nameRules:[
        v => !!v || 'Campo Obligatorio',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
      ],
      routinetitle: "",
      routinetime: date.getHours() + ":" + date.getMinutes(),
      routinedays: [],
      actions: [],
      rooms: [],
      newDevices: [],
      dialog: false
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
    async addRoutine() {
      if (this.$refs.form.validate()) {
        let routine = {
          name: this.routinetitle,
          actions: this.actions,
          meta: {
            routinetime: this.routinetime,
            routinedays: this.routinedays
          }
        }
        console.log(routine)
        routine = await this.$addRoutine(routine.id)
        this.setResult(routine.id)
        this.$router.go(-1);
        this.reset();
      }
    },
    setResult(routine){
      console.log(routine)
    },
    updateTime(newVal){
      this.routinetime=newVal
    },
    updateDays(newVal){
      this.routinedays=newVal
    },
    updateActions(newVal, device){

      console.log('update')

      Array.from(newVal).forEach(value => {
          let action = {
            device: {
              id: device.id
            },
            actionName: value.name,
            params: value.params,
            meta: value.meta
          }
          this.actions.push(action)

      })

      this.dialog=false
      console.log(this.actions)
    },
    async selectRoom(room){
      let device =await this.$getDevices(room.id)
      this.rooms.push({room:room, devices: device, selectedDevices: [],actions:[]});
    },

    addDeviceToRoom(device, indexRoom){
      let room = this.rooms[indexRoom]
      let action = {
        device: {
          id: device.id
        },
        actionName: device.meta.actions.name,
        params: device.meta.actions.params,
        meta: device.meta.actions.meta
      }
      room.selectedDevices.push(device)
      room.actions.push(action);
      this.actions.push(action)
    },

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
      position: absolute;
      margin-left: 45.5%;
      margin-top: 15px;
    }

</style>