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
             :key="routine.id">
          <v-card  class="roomCard" :color="routine.meta.color">
            <v-row>
              <v-card-actions>
              <v-btn @click="executeRoutine(routine)"
                     class="addDeviceButtonText"
                     color="secondary"
                     outlined
                     v-ripple="false"
              >
                Ejecutar Rutina
              </v-btn>
              <v-card-title>
                {{routine.name}}
              </v-card-title>
                <v-btn :to="{name: 'EditRoutineView', params:{routine: routine}}"
                       class="addDeviceButtonText"
                       color="secondary"
                       outlined
                       v-ripple="false"
                >
                  <v-icon>mdi-clipboard-edit-outline</v-icon>
                  Editar Rutina
                </v-btn>

<!--                  <v-btn class="addDeviceButtonText"-->
<!--                         outlined-->
<!--                         color="secondary"-->
<!--                         @click="routine.dialog = true"-->
<!--                         v-ripple="false"-->
<!--                  >-->
<!--                    <v-icon class="mr-2">mdi-trash-can-outline</v-icon>-->
<!--                    Borrar Rutina-->
<!--                  </v-btn>-->
<!--                  <v-row justify="center">-->
<!--                    <v-dialog-->
<!--                        v-model="routine.dialog"-->
<!--                        persistent-->
<!--                        max-width="500"-->
<!--                    >-->
<!--                      <v-card>-->
<!--                        <v-card-title class="text">-->
<!--                          ¿Está seguro que desea borrar esta rutina?-->
<!--                        </v-card-title>-->
<!--                        <v-card-actions>-->
<!--                          <v-spacer></v-spacer>-->
<!--                          <v-btn-->
<!--                              color="secondary white&#45;&#45;text"-->
<!--                              text-->
<!--                              @click="deleteRoutine(routine)"-->
<!--                          >-->
<!--                            Si-->
<!--                          </v-btn>-->
<!--                          <v-btn-->
<!--                              color="secondary white&#45;&#45;text"-->
<!--                              text-->
<!--                              @click="routine.dialog = false"-->
<!--                          >-->
<!--                            No-->
<!--                          </v-btn>-->
<!--                        </v-card-actions>-->
<!--                      </v-card>-->
<!--                    </v-dialog>-->
<!--                  </v-row>-->

                <v-btn @click="deleteRoutine(routine.id)"
                       class="addDeviceButtonText"
                       color="secondary"
                       outlined
                       v-ripple="false"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Eliminar Rutina

                </v-btn>

              </v-card-actions>

            </v-row>
          </v-card>

        </div>

      <v-alert type="success" outlined :value="alert">
        Ejecucion realizada con exito
      </v-alert>

      <v-btn :to="{name:'AddRoutineView'}"
             class="button"
             rounded
             color="secondary"
             absolute>
        Agregar rutina
        <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
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
        deleteRoutine(routine) {
          this.$deleteRoutine(routine.id)
          this.routine.dialog=false
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
    .addDeviceButton{
      padding-top: 20px;
    }
    .addDeviceButtonText{
      font-size: 15px;
      font-weight: bold;
    }


    .roomCard{
      margin-left: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 10px;
    }
    .roomConfiguration{
      display: flex;
      align-items: start;
    }


</style>