<template>
    <div class="routine">
          <v-btn :to="{name:'AddRoutine'}"
                 color="secondary"
                 rounded
                 class="button"
          >
            Agregar rutina
            <v-icon> mdi-plus </v-icon>
          </v-btn>

        <h3 v-if="routinesAmount==0">No tienes rutinas creadas aún</h3>

        <ul v-else >
            <div v-for="routine in routines" :key="routine">
              <v-btn @click="playRoutine(routine)"
                     plain
                     fab
              >
                <v-icon v-if="routine.play">mdi-pause-circle-outline</v-icon>
                <v-icon v-else> mdi-arrow-right-drop-circle-outline </v-icon>
              </v-btn>
              {{routine.name}}
            </div>

        </ul>
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

  .button{
      margin: 8px;
  }

  .button2{
      margin: 8px;
    width: 20px;
    height:20px;
  }

  .popup{
      background-color: #0F4C75;
  }

  .acceptButtom{
      background-color: #B5D9F1;
      color: #000000;
  }

  .chip{
      margin-left: 8px;
  }

  .routine{
    margin-top: 120px;
  }
</style>