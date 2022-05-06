<template>
    <div class="routine">
          <v-btn :to="{name:'AddRoutine'}"
                 color="secondary"
                 rounded
                 class="button2"
          >
            Agregar rutina
            <v-icon> mdi-plus </v-icon>
          </v-btn>

        <h3 v-if="routinesAmount==0">No tienes rutinas creadas aún</h3>

        <ul v-else >
            <div>
                <v-list class="d-flex flex-row align-center"
                        v-for="routine in routines"
                        :key="routine"
                        width="50px"
                        rounded
                >
                    <v-list-group :value="true"
                                  no-action
                                  sub-group
                                  v-model="click"
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title> {{routine.title}} </v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </v-list-group>

                    <v-btn class="button"
                           plain
                           rounded
                           fab
                           @click="edit=true"
                    >
                        <v-icon>mdi-pencil-outline</v-icon>
                        <EditView v-if="edit"/>
                    </v-btn>
                    <v-btn class="button"
                           plain
                           rounded
                           fab
                           @click="editColor()"
                    >
                        <v-icon>mdi-palette-outline</v-icon>
                    </v-btn>

                    <v-btn class="button"
                           plain
                           rounded
                           fab
                           @click="deleteRoutine()"
                    >
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-list>
            </div>
        </ul>
    </div>
</template>

<script>
import EditView from "@/components/EditView";

export default {
    name: "RoutineView",
    components:{EditView},
    data(){
        return{
            edit: false,
            dialog: false,
            routinesAmount: 0,
            routines: [],
            routinetitle: "",
            roomtitle:"",
            routinerooms:[],
            click: false,
        }
    },
    methods: {
        reset() {
            this.$refs.title.reset();
        },
        addRoutine(){
            if(this.routinetitle.length != 0){
              this.routinesAmount++;
              this.routines.push(
                  {title: this.routinetitle,
                    rooms: this.routinerooms, //rooms=[{roomtitle: titulo, device:[]}]
                  });
            }
            this.dialog = false;
            this.reset();
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
      width: 20px;
      height:20px
  }

  .button2{
      margin: 8px;
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