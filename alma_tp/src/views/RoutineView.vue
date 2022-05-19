<template>
    <div class="routine">
        <div v-if="$routinesAmount===0">
            <h3 class="text"> No tienes rutinas creadas aún. </h3>
            <div class="imagen">
                <v-img alt="Imagen de fondo"
                       :src="require(`@/assets/withoutRoutines.png`)"
                       class="mx-auto"
                       max-width="30%"
                       max-height="30%"/>
            </div>
        </div>  

        <div v-else v-for="routine in $routines"
             :key="routine.id"
             class="withRoutines">
            <v-card class="routineCard" :color="routine.meta.color">
                <v-row>
                    <v-col class="pt-1 pb-2">
                        <div class="executeRoutineButton">
                            <v-card-actions>
                              <v-btn @click="executeRoutine(routine)"
                                     class="executeRoutineText"
                                     outlined
                                     color="green"
                                     v-ripple="false"
                              >
                                Ejecutar Rutina
                              </v-btn>
                            </v-card-actions>
                        </div>
                        <div class="containerRoutineName">
                          <v-card-actions>
                            <span class="routineName">{{routine.name}} </span>
                            </v-card-actions>
                        </div>
                    </v-col>
                    <div class="routineOptions">
                        <v-btn :to="{name: 'EditRoutineView', params:{routine: routine}}"
                               class="optionsButton"
                               color="secondary"
                               outlined
                               v-ripple="false">
                            <v-icon class="mr-2" size="30">mdi-clipboard-edit-outline</v-icon>
                            Editar Rutina
                        </v-btn>
                        <v-btn @click="setRoutine(routine.id)"
                               class="optionsButton"
                               color="secondary"
                               outlined
                               v-ripple="false">
                            <v-icon class="mr-2" size="30">mdi-trash-can-outline</v-icon>
                            Eliminar Rutina
                        </v-btn>
                      <v-dialog
                          v-model="dialog"
                          persistent
                          max-width="500"
                      >
                        <v-card>
                          <v-card-title class="text">
                            ¿Está seguro que desea borrar esta rutina?
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="secondary white--text"
                                text
                                @click="deleteRoutine()"
                            >
                              Si
                            </v-btn>
                            <v-btn
                                color="secondary white--text"
                                text
                                @click="dialog = false"
                            >
                              No
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                    </div>
                </v-row>
            </v-card>
        </div>
    <v-alert type="success" outlined :value="alert">
      Ejecucion realizada con exito
    </v-alert>

        <v-btn :to="{name:'AddRoutineView'}"
               class="addRoutineButton"
               rounded elevation="5"
               color="secondary"
               absolute
               x-large>
            Agregar rutina
            <v-icon class="ml-2" color="white" size="30px">mdi-plus-circle-outline</v-icon>
        </v-btn>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "RoutineView",
    data(){
        return{
            roomtitle:"",
            routinerooms:[],
            click: false,
            alert:false,
            dialog:false,
            idDelete:''
        }
    },
  mounted() {
     this.$getAllRooms()
     this.$getAllRoutines()
  },
  computed:{
      ...mapState("routine",{
        $routines: "routines",
        $routinesAmount: "routinesAmount",
      }),

  },

  methods: {
      setRoutine(id){
        this.dialog=true
        this.idDelete = id
      },
      ...mapActions("routine",{
        $addRoutine: "add",
        $editRoutine: "edit",
        $deleteRoutine: "delete",
        $executeRoutine: "execute",
        $getRoutine: "get",
        $getAllRoutines: "getAll"
      }),
      ...mapActions("room",{
        $getAllRooms: "getAll"
      }),
      async executeRoutine(routine){
        routine.actions.forEach(action => {
          action.device = {id:action.device.id}
        })
        routine.meta.play = ! routine.meta.play
        let idS = [routine.id, routine]
        await this.$editRoutine(idS)
        await this.$executeRoutine(routine.id)
        this.alert=true
        setTimeout(()=>{
          this.alert=false
        },5000)
      },

        editRoutine(routine) {
            // routine.title=routine2.title;
            // console.log('edit routine in ' + routine.title);
            console.log(routine.title);
        },
        editColor(routine) {
          console.log(routine)
        },
        deleteRoutine() {
          this.$deleteRoutine(this.idDelete)
          this.idDelete=''
          this.dialog=false
        },
        selectRoom(){
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

.withRoutines{
  max-width: 80%;
}

.routineCard{
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
}

.addRoutineButton{
  position: fixed;
  bottom: 80px;
  right: 15px;
  font-weight: bold;
}

.executeRoutineButton{
  display: inline-block;
}

.containerRoutineName{
  display: inline-block;
  margin-left: 5%;
}

.routineName{
  font-size: 15px;
  font-weight: bold;
}

.executeRoutineText{
  font-size: 15px;
  font-weight: bold;
}

.optionsButton{
  font-size: 15px;
  font-weight: bold;
}

.optionsButton{
  margin-right: 15px;
}

.routineOptions{
  align-self: center;
}

</style>