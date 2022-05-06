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
                    clearable
                    maxlength="50"
      />
    </v-container>

    <v-divider class="mt-6 mx-4"></v-divider>
    <div class="d-flex flex-row align-center text-align-center">
      <v-btn class="ma-8"
             color= "secondary white--text"
             rounded
             v-model="roomtitle"
             @click="selectRoom()"
      >
        Seleccionar habitación
        <v-icon color="black">mdi-menu-right</v-icon>
      </v-btn>

      <v-btn class = "button2"
             color = "secondary white--text"
             rounded
             @click="selectRoom"
             :disabled="!roomSelected"
      >
        Agregar dispositivo
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>

    <GoBack name="Cancelar" color="secondary white--text ma-8"/>

    <v-btn :to="{name:'RoutineView'}"
           color="secondary white--text"
           @click="addRoutine"
    >
      Aceptar
    </v-btn>

  </div>

</template>

<script>
import GoBack from "@/components/GoBack";
export default {
  name: "addRoutineView",
  components: {
    GoBack
  },

  // props:{
  //   add:{
  //     type: String,
  //     required: true
  //   }
  // },
  data(){
    return{
      edit: false,
      dialog: false,
      routinesAmount: 0,
      routines: [],
      roomSelected:false,
      // routinetitle: "",
      roomtitle:"",
      routinerooms:[],
      click: false,
    }
  },
  methods:{
    selectRoom(){
      this.roomSelected=true;
      this.routinerooms.push({room_title: this.roomtitle, devices: []})
    },
    addRoutine(){
      console.log('adding routine');
    }
  }
}
</script>

<style scoped>
    .routine{
        margin-top: 120px;
    }
</style>