<template>
    <v-dialog scrollable
              overflow="auto"
              v-model="dialog"
              width="1000"
    >
        <v-card class="popup"
                color="secondary white--text"
                v-click-outside="closePopup"
        >
            <v-card-title>
                <v-icon class="mr-2" color="white" size="45px"> mdi-home-outline </v-icon>
<!--                {{content}}-->
                Editar habitación
                <v-spacer/>
                <v-btn color="transparent"
                       @click="closePopup, dialog=false"
                       depressed
                >
                    <v-icon color="white" size="30px">mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field outlined
                              ref="title"
                              v-model="roomName"
                              placeholder="Escriba el nombre de la habitación *"
                              background-color="white"
                              color="black"
                              counter
                              autofocus
                              clearable
                              maxlength="50"
                              required
                              :rules="nameRules"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="acceptButtom"
                       color="primary black--text"
                       @click="editRoom(roomName)"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
//import store from "@/store";

export default {
    name: "EditView",
    // props: ['content'],
    data(){
        return{
            dialog:true,
            roomName:'',
            nameRules:[
              v => !!v || 'Campo Obligatorio *'
            ],
        }
    },
    methods:{
        reset(){
          this.$refs.title.reset();
        },
        submit(e){
          e.preventDefault();
          this.addRoom()
        },
        editRoom(room2){
            // this.$refs.item.name=room2
            console.log("quiero cambiar el nombre de "+ this.$refs.item.name + "to" + room2)
            this.dialog=false;
        },
        closePopup(){
          this.reset();
        }
    }
}
</script>

<style scoped>

</style>