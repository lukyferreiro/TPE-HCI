<template>
  <div class="routine">
    <h2>
      <v-icon> mdi-clipboard-list-outline </v-icon>
      Agregar rutina
    </h2>

    <v-container>
      <v-text-field outlined
                    ref="title"
                    v-model="routinetitle"
                    placeholder="Escriba el nombre de la nueva rutina*"
                    counter
                    autofocus
                    clearable
                    maxlength="50"
      />
    </v-container>

    <TimeSelector time="routinetime" days="routinedays"/>

    <v-divider class="mt-6 mx-4"></v-divider>
    <div class="d-flex flex-row align-center text-align-center">
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
            {{roomLabel.name}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(room, index) in rooms"
              :key="index"
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

    <v-dialog scrollable
              overflow="auto"
              v-model="deviceSelect"
              width="1000"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class = "button2"
               color = "secondary white--text"
               rounded
               v-bind="attrs"
               v-on="on"
               @click="deviceSelect=true"
               :disabled="!roomSelected"
        >
          {{deviceLabel.name}}
          <v-icon color="white">mdi-plus-circle-outline</v-icon>
        </v-btn>

      </template>

      <v-card class="popup"
              color=" secondary white--text"
      >
        <v-card-title>
          Agregar Dispositivo en: {{roomLabel.name}}
          <v-spacer/>
          <v-btn color="transparent"
                 @click="deviceSelect=false"
                 depressed
          >
            <v-icon color="white" size="30px">mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions v-for="device in roomLabel.devices" :key="device">
          <v-btn class="acceptButtom"
                 color="primary black--text"
                 @click="addDeviceToRoom(device)"
          >
<!--                <img :src="require(`@/assets/${device.image}`)"-->
<!--                     :alt="device.name"-->
<!--                />-->
              {{ device.name }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>

    <v-divider></v-divider>

    <GoBack name="Cancelar" color="secondary white--text ma-8"/>

    <v-btn color="secondary white--text"
           @click="addRoutine"
    >
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
    return{
      edit: false,
      roomLabel: {name:"Seleccionar Habitación"},
      deviceLabel: {name:"Agregar Dispositivo"},
      roomSelected:false,
      deviceSelect: false,
      routinetitle: "",
      routinetime: null,
      routinedays: [], //0=domingo, 1=lunes ....
      routine:{
        name:"",
        rooms:[],
        time:null,
        days:[],
        play: false
      },
      roomtitle:"",
      routinerooms:[],
      click: false,
    }
  },
  methods:{
    reset() {
      this.$refs.title.reset();
    },
    addRoutine(){
      this.routine.name=this.routinetitle;
      this.routine.time=this.routinetime;
      this.routine.days=this.routinedays;
      store.commit("addRoutines", this.routine);
      this.reset();
      this.$router.go(-1);
    },
    selectRoom(room){
      this.roomLabel = room
      this.roomSelected=true;
      // this.routinerooms.push({room_title: this.roomtitle, devices: []})
    },
    addDeviceToRoom(device){
      this.deviceLabel=device;
      this.deviceSelect=false;
      console.log('adding device' + device)
    }
  }
}
</script>

<style scoped>
    .routine{
        margin-top: 120px;
    }
    .button{
      width: 500px;
      margin: 10px;
    }
</style>