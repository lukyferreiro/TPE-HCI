<template>
    <v-dialog scrollable
              overflow="auto"
              v-model="dialog"
              width="1000">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="button"
                   rounded
                   color="secondary"
                   v-bind="attrs"
                   v-on="on"
                   absolute>
                Agregar habitación
                <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
            </v-btn>
        </template>
      
        <v-card color="secondary white--text"
                v-click-outside="closePopup">
            <v-card-title>
                <v-icon class="mr-2" color="white" size="45px"> mdi-home-outline </v-icon>
                Agregar habitación
                <v-spacer/>
                <v-btn color="transparent"
                       @click="closePopup, dialog=false"
                       depressed>
                    <v-icon color="white" size="30px">mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-form ref="form" lazy-validation @submit="submit">
                <v-card-text>
                    <v-text-field outlined
                                  ref="title"
                                  v-model="name"
                                  placeholder="Escriba el nombre de la habitación"
                                  background-color="white"
                                  color="black"
                                  counter
                                  autofocus
                                  clearable
                                  maxlength="60"
                                  :rules="nameRules"
                                  required/>
                </v-card-text>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mb-2"
                       color="primary black--text"
                       @click="addRoom">
                  Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions,mapState} from "vuex"
export default {
    name: "AddRoomButton",
    data(){
      return{
        nameRules:[
          v => !!v || 'Campo Obligatorio',
          v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
          v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
          v => this.$rooms.find( o => o.name === v) == null || 'El nombre ingresado ya existe',
        ],
        dialog: false,
        name:"",
      }
    },
     computed:{
        ...mapState("room",{
          $rooms:"rooms"
        }),
       },
    methods: {
      reset(){
        this.$refs.title.reset();
      },
      submit(e){
        e.preventDefault();
        this.addRoom()
      },
      ...mapActions("room",{
       $addRoom: "add",
       $editRoom: "edit",
       $deleteRoom: "delete",
       $getAllRooms: "getAll",
       $getRoom : "get"
      }),
      setResult(rooms){
        console.log(rooms)
      },
      async addRoom(){
        if(this.$refs.form.validate()) {
          try{
           let room = {
             name: this.name,
             meta: {
                    show: false,
                    color: ""
             }
           }
           room = await this.$addRoom(room)
           this.setResult(room.id)
          } catch(e){
             this.setResult(e.code)
          }
          this.dialog = false;
          this.reset();
        }
      },
      closePopup(){
        this.reset();
      }
    }
}
</script>

<style scoped>

  .button{
    position: fixed;
    bottom: 80px;
    right: 15px;
  }

</style>