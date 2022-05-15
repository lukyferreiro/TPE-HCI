<template>
    <div class="routine">
        <v-btn :to="{name:'AddRoutineView'}"
               class="button"
               rounded
               color="secondary"
               absolute>
            Agregar rutina
            <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
        </v-btn>

        <div v-if="routinesAmount==0">
            <h3 class="text"> No tienes rutinas creadas aún. </h3>
            <div class="imagen">
                <v-img alt="Imagen de fondo"
                       :src="require(`@/assets/withoutRoutines.png`)"
                       class="mx-auto"
                       max-width="30%"
                       max-height="30%"/>
            </div>
        </div>  

        <div v-else v-for="routine in routines"
             :key="routine">
            <v-btn @click="playRoutine(routine)"
                   plain
                   fab>
                <v-icon v-if="routine.play">mdi-pause-circle-outline</v-icon>
                <v-icon v-else> mdi-arrow-right-drop-circle-outline </v-icon>
            </v-btn>
            {{routine.name}}
        </div>
    </div>
</template>

<script>
// import EditView from "@/components/EditView";
import store from '@/store/index';
import routines from "@/api/routines";

export default {
    name: "RoutineView",
    // components:{EditView},
    data(){
        return{
            edit: false,
            roomtitle:"",
            routinerooms:[],
            click: false,
        }
    },
  computed:{
    routines(){
      return store.state.routines
    },
    routinesAmount(){
      return store.getters.routinesAmount
    }
  },
  created() {
    routines.getRoutines(routines => {
      store.commit("setRoutines", routines) })
  },

  methods: {
      playRoutine(routine){
        store.commit("playRoutine", routine)
      },
        editRoutine(routine) {
            // routine.title=routine2.title;
            this.edit = false;
            console.log('edit routine in ' + routine.title);
            console.log(routine.title);
        },
        editColor(routine) {
            console.log('edit color in ' + routine.title)
        },
        deleteRoutine(routine) {
            this.routines.splice(this.routines.indexOf(routine), 1)
        },
        selectRoom(){
            this.roomSelected=true;
            this.routinerooms.push({roomtitle: this.roomtitle, devices: []})
        },
        addDevice(){
            this.routinerooms.indexOf(this.roomtitle)
        }
    }
}
</script>


<style scoped>

    .routine{
      margin-top: 130px;
      margin-bottom: 50px;
    }

    .text{
      margin: 10px;
      padding-left: 15px;
      font-size: 30px;
      font-weight: bold;
    }

    .imagen{
      padding-top: 5vh;
    }

    .button{
      position: fixed;
      bottom: 80px;
      right: 15px;
    }

</style>