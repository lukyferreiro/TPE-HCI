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
                                  v-model="roomName"
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
                <v-btn class="acceptButtom"
                       color="primary black--text"
                       @click="addRoom"
                >
                  Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import store from "@/store";

export default {
    name: "AddRoomButton",
    data(){
      return{
        nameRules:[
          v => !!v || 'Campo Obligatorio',
          v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
            v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
        ],
        dialog: false,
        roomName:"",
        room:{
          id:"",
          name:"",
          devices:[],
          show: false
        },
      }
    },
    methods: {
      reset(){
        this.$refs.title.reset();
      },
      submit(e){
        e.preventDefault();
        this.addRoom()
      },
      addRoom(){
        if(this.$refs.form.validate()) {
          // this.room.id=
          this.room.name = this.roomName
          store.commit("addRooms", this.room)
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
    right: 8px;
  }

  .acceptButtom{
    background-color: #B5D9F1;
    color: #000000;
  }

</style>