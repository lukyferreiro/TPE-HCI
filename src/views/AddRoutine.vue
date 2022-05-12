<template>
    <div class="routine">
        <h2>
            <v-icon> mdi-clipboard-list-outline </v-icon>
            Agregar rutina
        </h2>

        <v-form ref="form" lazy-validation>
            <v-container>
                <v-text-field outlined
                              ref="title"
                              v-model="routinetitle"
                              placeholder="Escriba el nombre de la nueva rutina*"
                              counter
                              autofocus
                              clearable
                              maxlength="50"
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
            <div v-for="routine in routines" :key="routine">
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
                                <v-card-actions v-for="device in routine.room.devices"
                                                :key="device">
                                    <v-btn class="acceptButtom"
                                           color="primary black--text"
                                           @click="addDeviceToRoom(device, routine)">
                      <!--                <img :src="require(`@/assets/${device.image}`)"-->
                      <!--                     :alt="device.name"-->
                      <!--                />-->
                                        {{ device.name }}
                                    </v-btn>
                                </v-card-actions>
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
                        <v-list-item v-for="(room, index) in rooms"
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

      <!--    <div class="d-flex flex-row align-center text-align-center">-->
      <!--      <v-menu offset-y>-->
      <!--        <template v-slot:activator="{ on, attrs }">-->
      <!--          <v-btn-->
      <!--              rounded-->
      <!--              class="button"-->
      <!--              color="secondary"-->
      <!--              dark-->
      <!--              v-bind="attrs"-->
      <!--              v-on="on"-->
      <!--          >-->
      <!--            {{roomLabel.name}}-->
      <!--          </v-btn>-->
      <!--        </template>-->
      <!--        <v-list>-->
      <!--          <v-list-item-->
      <!--              v-for="(room, index) in rooms"-->
      <!--              :key="index"-->
      <!--          >-->
      <!--            <v-list-item-action>-->
      <!--              <v-btn class="button"-->
      <!--                      plain-->
      <!--                     @click="selectRoom(room)">-->
      <!--                {{ room.name }}-->
      <!--              </v-btn>-->
      <!--            </v-list-item-action>-->
      <!--          </v-list-item>-->
      <!--        </v-list>-->
      <!--      </v-menu>-->
      <!--    <v-dialog scrollable-->
      <!--              overflow="auto"-->
      <!--              v-model="deviceSelect"-->
      <!--              width="1000"-->
      <!--    >-->
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <v-btn class = "button2"-->
      <!--               color = "secondary white&#45;&#45;text"-->
      <!--               rounded-->
      <!--               v-bind="attrs"-->
      <!--               v-on="on"-->
      <!--               @click="deviceSelect=true"-->
      <!--               :disabled="!roomSelected"-->
      <!--        >-->
      <!--          {{deviceLabel.name}}-->
      <!--          <v-icon color="white">mdi-plus-circle-outline</v-icon>-->
      <!--        </v-btn>-->

      <!--      </template>-->

      <!--      <v-card class="popup"-->
      <!--              color=" secondary white&#45;&#45;text"-->
      <!--      >-->
      <!--        <v-card-title>-->
      <!--&lt;!&ndash;          Agregar Dispositivo en: {{roomLabel.name}}&ndash;&gt;-->
      <!--          <v-spacer/>-->
      <!--          <v-btn color="transparent"-->
      <!--                 @click="deviceSelect=false"-->
      <!--                 depressed-->
      <!--          >-->
      <!--            <v-icon color="white" size="30px">mdi-window-close</v-icon>-->
      <!--          </v-btn>-->
      <!--        </v-card-title>-->
      <!--        <v-card-actions v-for="device in roomLabel.devices" :key="device">-->
      <!--          <v-btn class="acceptButtom"-->
      <!--                 color="primary black&#45;&#45;text"-->
      <!--                 @click="addDeviceToRoom(device)"-->
      <!--          >-->
      <!--&lt;!&ndash;                <img :src="require(`@/assets/${device.image}`)"&ndash;&gt;-->
      <!--&lt;!&ndash;                     :alt="device.name"&ndash;&gt;-->
      <!--&lt;!&ndash;                />&ndash;&gt;-->
      <!--              {{ device.name }}-->
      <!--          </v-btn>-->
      <!--        </v-card-actions>-->
      <!--      </v-card>-->
      <!--    </v-dialog>-->
      <!--    </div>-->

        <v-divider></v-divider>

        <GoBack name="Cancelar"
                color="secondary white--text ma-8"/>

        <v-btn color="secondary white--text"
               @click="addRoutine">
            Aceptar
        </v-btn>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack";
import store from "@/store";
import TimeSelector from "@/components/TimeSelector";

export default {
  name: "addRoutineView",
  components: {
    TimeSelector,
    GoBack
  },
  computed: {
    rooms() {
      return store.state.rooms
    },
  },
  data(){
    const date = new Date();
    return{
      edit: false,
      nameRules:[
        v => !!v || 'Campo Obligatorio'
      ],
      roomSelected:false,
      routinetitle: "",
      routinetime: date.getHours() + ":" + date.getMinutes(),
      routinedays: [],
      routine:{
        name:"",
        rooms:[],
        time:null,
        days:[],
        play: false
      },
      roomtitle:"",
      routines:[],
      click: false,
    }
  },
  methods:{
    reset() {
      this.$refs.title.reset();
    },
    addRoutine(){
      if(this.$refs.form.validate()) {
        this.routine.name = this.routinetitle;
        this.routine.time = this.routinetime;
        this.routine.days = this.routinedays;
        store.commit("addRoutines", this.routine);
        this.$router.go(-1);
        this.reset();
      }
    },
    updateTime(newVal){
      this.routinetime=newVal
    },
    updateDays(newVal){
      this.routinedays=newVal
    },
    selectRoom(room){
      console.log(room.name)
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
        margin-top: 150px;
    }
    .button{
      width: 500px;
      margin: 10px;
    }
</style>