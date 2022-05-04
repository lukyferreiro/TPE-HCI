<template>
  <div class="routine">
    <v-dialog
        scrollable
        overflow="auto"
        v-model="dialog"
        width="1000"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="button2"
          rounded
          color="secondary"
          v-bind="attrs"
          v-on="on"
      >
        Agregar rutina
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>


      <v-card class="popup"
              color="secondary white--text"
      >
        <v-card-title>
          <v-icon color="white"> mdi-clipboard-list-outline </v-icon>
          Agregar rutina
          <v-spacer/>
          <v-btn
              color="transparent"
              @click="dialog=false"
          >
            <v-icon color="white">mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>


        <v-card-text>
          <v-container>
            <v-text-field outlined
                          ref="title"
                          v-model="routine"
                          placeholder="Escriba el nombre de la nueva rutina*"
                          counter
                          clearable
                          maxlength="50"
            />
            <div class="text-h6 white--text">
              *Campo obligatorio
            </div>
          </v-container>
          <v-divider class="mt-6 mx-4"></v-divider>

          <v-chip
              label
              color="primary"
              text-color="black"
          >Seleccionar habitación
            <v-btn class="button"
                   plain
                   rounded
                   fab
                   @click="selectRoom()"
            >
              <v-icon>mdi-menu-right</v-icon>
            </v-btn>
          </v-chip>

          <v-chip
              label
              color="primary"
              text-color="black"
          >Agregar dispositivo
            <v-btn class="button"
                   plain
                   rounded
                   fab
                   @click="addDevice()"
            >
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-chip>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
              color="primary black--text"
              @click="dialog=false"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              class="acceptButtom"
              color="primary black--text"
              @click="addRoutine"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>


    <h3 v-if="routinesAmount==0">No tienes rutinas creadas aún</h3>

    <ul v-else >
      <div>
        <v-list class="d-flex flex-row align-center"
                v-for="routine in routines"
                :key="routine"
                width="50px"
                rounded
        >
          <v-list-group
              :value="true"
              no-action
              sub-group
              v-model="click"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title >{{routine.title}}</v-list-item-title>
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
                 @click="editColor(room)"
          >
            <v-icon>mdi-palette-outline</v-icon>
          </v-btn>

          <v-btn class="button"
                 plain
                 rounded
                 fab
                 @click="deleteRoutine(room)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list>

      </div>
    </ul>
  </div>

</template>

<script>
import EditView from "@/views/EditView";

export default {
  name: "RoutineView",
  components:{EditView},
  data(){
    return{
      edit:false,
      dialog: false,
      routinesAmount: 0,
      routines: [],
      routine:"",
      click:false,
    }
  },
  methods: {
    reset() {
      this.$refs.title.reset();
    },
    addRoutine(){
      if(this.routine.length!=0){
        this.routinesAmount++;
        this.routines.push(
            {title: this.routine,
             // device: [{title:'pruebo'},{title:'pruebo'}]
            });
      }
      this.dialog=false;
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

</style>