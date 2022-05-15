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

        <v-col>
            <div v-for="routine in $routines" :key="routine">
                <v-row>
                    <v-btn class="button"
                           color="secondary"
                           rounded>
                      {{routine.room.name}}
                    </v-btn>
                    <v-col>
                        <div v-for="device in routines[routines.indexOf(routine)].devices"
                             :key="device.id">
                            <v-btn class = "button"
                                   color = "secondary white--text"
                                   rounded>
                              {{device.name}}
                            </v-btn>
                        </div>

                        <v-dialog scrollable
                                  overflow="auto"
                                  v-model="routine.deviceSelect"
                                  width="1000">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class = "button2"
                                       color = "secondary white--text"
                                       rounded
                                       v-bind="attrs"
                                       v-on="on"
                                       @click="routine.deviceSelect=true"
                                       :disabled="!roomSelected">
                                    Agregar Dispositivo
                                    <v-icon color="white">mdi-plus-circle-outline</v-icon>
                                </v-btn>
                            </template>
                            <v-card class="popup"
                                    color=" secondary white--text">
                                <v-card-title>
                                    Agregar Dispositivo en: {{routine.room.name}}
                                    <v-spacer/>
                                    <v-btn color="transparent"
                                           @click="routine.deviceSelect=false"
                                           depressed
                                    >
                                        <v-icon color="white" size="30px">mdi-window-close</v-icon>
                                    </v-btn>
                                </v-card-title>
                              <v-row class="devices" align-content-md="auto">
                                <v-card-actions v-for="device in routine.room.devices"
                                                :key="device">
                                  <v-card class="device"
                                          v-on:click="addDeviceToRoom(device, routine)"
                                          color="primary"
                                          max-width="200"
                                          max-height="200" >
                                    <!--          <v-img class="mx-9 my-9"  max-height="50%" max-width="50%"
                                                     :src="require(`@/assets/${device.image}`)"
                                                     :alt="device.name"   >

                                              </v-img>-->
                                    <v-avatar class="image mr-3 ml-7 mt-5 "
                                              rounded
                                              size="70%">
                                      <img :src="require(`@/assets/${device.image}`)"
                                           :alt="device.name"/>
                                    </v-avatar>
                                    <v-card-title class="card">
                                      {{device.name}}
                                    </v-card-title>
                                  </v-card>
<!--                                    <v-btn class="acceptButtom"
                                           color="primary black&#45;&#45;text"
                                           @click="addDeviceToRoom(device, routine)">
                      &lt;!&ndash;                <img :src="require(`@/assets/${device.image}`)"&ndash;&gt;
                      &lt;!&ndash;                     :alt="device.name"&ndash;&gt;
                      &lt;!&ndash;                />&ndash;&gt;
                                        {{ device.name }}
                                    </v-btn>-->
                                </v-card-actions>
                              </v-row>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </div>
            <div>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn rounded
                               class="button"
                               color="secondary"
                               dark
                               v-bind="attrs"
                               v-on="on">
                            Seleccionar Habitacion
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(room, index) in $rooms"
                                     :key="index">
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
            </div>
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

export default {
  name: "AddRoutineView",
  components: {
    TimeSelector,
    GoBack
  },
  computed: {
    ...mapState("room",{
      $rooms: "rooms"
    }),
    ...mapState("routine",{
      $routines: "routines"
    })
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
      // routine:{
      //   name:"",
      //   rooms:[],
      //   time:null,
      //   days:[],
      //   play: false
      // },
      roomtitle:"",
      routines:[],
      click: false,
      roomSelected:false,

    }
  },
  methods:{
    ...mapActions("routine",{
      $addRoutine: "add",
      $editRoutine: "edit",
      $deleteRoutine: "delete",
      $executeRoutine: "execute",
      $getRoutine: "get",
      $getAll: "getAll"
    }),

    reset() {
      this.$refs.title.reset();
    },
    async addRoutine() {
      if (this.$refs.form.validate()) {
        let routine = {
          name: this.routinetitle,
          actions: [
            // {
            //   "device": {
            //     "id": "c39181d52abe5555"
            //   },
            //   "actionName": "turnOff",
            //   "params": [],
            //   "meta": {}
            // },
          ],
          meta: {
            routinetime: this.routinetime,
            routinedays: this.routinedays
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
    updateTime(newVal){
      this.routinetime=newVal
    },
    updateDays(newVal){
      this.routinedays=newVal
    },
    selectRoom(room){
      this.routines.push({room: room,
        devices:[],
        deviceSelect: false,
      });
      this.roomSelected=true;
    },
    addDeviceToRoom(device, routine){
      const r =this.routines[this.routines.indexOf(routine)]
      r.deviceSelect=false;
      r.devices.push(device)
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

</style>