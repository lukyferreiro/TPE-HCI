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

<!--   copy paste viejo        -->
        <div class="d-flex flex-row align-center text-align-center">
          <v-col>
            <v-row>
              <div v-for="(room, index) in rooms"
                  :key="index">
              <v-chip color="secondary white--text">
                {{room.room.name}}
              </v-chip>

                <v-chip v-for="dev in rooms[index].selectedDevices"
                        :key="dev.id"
                    color="secondary white--text">
                  {{dev.name}}
                </v-chip>

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
                    Agregar Dispositivo
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
              </div>
            </v-row>


<!--            menu habitacion-->
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
          <!--                  <v-dialog scrollable-->
          <!--                            overflow="auto"-->
          <!--                            v-model="deviceSelect"-->
          <!--                            width="1000"-->
          <!--                  >-->
          <!--                    <template v-slot:activator="{ on, attrs }">-->
          <!--                      <v-btn class = "button2"-->
          <!--                             color = "secondary white&#45;&#45;text"-->
          <!--                             rounded-->
          <!--                             v-bind="attrs"-->
          <!--                             v-on="on"-->
          <!--                             @click="deviceSelect=true"-->
          <!--                             :disabled="!roomSelected"-->
          <!--                      >-->
          <!--                        {{deviceLabel.name}}-->
          <!--                        <v-icon color="white">mdi-plus-circle-outline</v-icon>-->
          <!--                      </v-btn>-->

          <!--                    </template>-->

          <!--                    <v-card class="popup"-->
          <!--                            color=" secondary white&#45;&#45;text"-->
          <!--                    >-->
          <!--                      <v-card-title>-->
          <!--                        Agregar Dispositivo en: {{roomLabel.name}}-->
          <!--                        <v-spacer/>-->
          <!--                        <v-btn color="transparent"-->
          <!--                               @click="deviceSelect=false"-->
          <!--                               depressed-->
          <!--                        >-->
          <!--                          <v-icon color="white" size="30px">mdi-window-close</v-icon>-->
          <!--                        </v-btn>-->
          <!--                      </v-card-title>-->
          <!--                      <v-card-actions v-for="device in roomLabel.devices" :key="device">-->
          <!--                        <v-btn class="acceptButtom"-->
          <!--                               color="primary black&#45;&#45;text"-->
          <!--                               @click="addDeviceToRoom(device)"-->
          <!--                        >-->
          <!--                              <img :src="require(`@/assets/${device.image}`)"-->
          <!--                                   :alt="device.name"-->
          <!--                              />-->
          <!--                            {{ device.name }}-->
          <!--                        </v-btn>-->
          <!--                      </v-card-actions>-->
          <!--                    </v-card>-->
          <!--                  </v-dialog>-->
        </div>


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
        </v-col>
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
      roomtitle:"",
      click: false,
      roomSelected:false,
      rooms: []
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
    async selectRoom(room){
      let device = await this.$getDevices(room.id)
      this.rooms.push({room:room, devices: device, selectedDevices: [],actions:[]});
      this.roomSelected=true;
    },

    addDeviceToRoom(device, indexRoom){
      let action = {
        device: {
          id: device.id
        },
        actionName: device.name,
        params: [],
        meta: device.actions
      }
      let room = this.rooms[indexRoom]
      room.selectedDevices.push(device)
      room.actions.push(action);
      this.actions.push(action)
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