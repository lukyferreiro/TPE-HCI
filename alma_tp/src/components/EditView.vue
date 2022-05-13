<template>
    <v-dialog scrollable
              overflow="auto"
              v-model="dialog"
              width="1000"
    >
        <v-card color="secondary white--text"
                v-click-outside="closePopup">
            <v-card-title>
                <v-icon class="mr-2" color="white" size="45px"> mdi-home-outline </v-icon>
                Editar habitación
                <v-spacer/>
                <v-btn color="transparent"
                       @click="closePopup, dialog=false"
                       depressed>
                    <v-icon color="white" size="30px">mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field outlined
                              ref="title"
                              v-model="newRoomName"
                              placeholder="Escriba el nombre de la habitación"
                              background-color="white"
                              color="black"
                              counter
                              autofocus
                              clearable
                              maxlength="60"
                              required
                              :rules="nameRules"/>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mb-2"
                       color="primary black--text"
                       @click="editRoom()"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions} from "vuex"
export default {
    name: "EditView",
    data(){
        return{
            dialog: true,
            newRoomName: "",
            nameRules:[
              v => !!v || 'Campo Obligatorio',
              v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
              v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
          ],
        }
    },
    methods:{
        reset(){
          this.$refs.title.reset();
        },
        submit(e){
          e.preventDefault();
          this.editRoom()
        },
        ...mapActions("room",{
          $editRoom: "edit",
          $getAllRooms: "getAll",
          $getRoom : "get"
        }),
        setResult(rooms){
          console.log(rooms)
        },
        async editRoom(){

        },
        // editRoom(room2){
        //     // this.$refs.item.name=room2
        //     console.log("quiero cambiar el nombre de "+ this.$refs.item.name + "to" + room2)
        //     this.dialog=false;
        // },
        closePopup(){
          this.reset();
        }
    }
}
</script>

<style scoped>

</style>