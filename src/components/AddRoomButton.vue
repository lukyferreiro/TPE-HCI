<template>
    <v-dialog scrollable
              overflow="auto"
              v-model="dialog"
              width="1000"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="button"
                   rounded
                   color="secondary"
                   v-bind="attrs"
                   v-on="on"
                   absolute
            >
                Agregar habitación
                <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
            </v-btn>
        </template>

        <v-card class="popup"
                color="white--text"
        >
            <v-card-title>
                <v-icon class="mr-2" color="white" size="45px"> mdi-home-outline </v-icon>
                Agregar habitación
                <v-spacer/>
                <v-btn color="transparent"
                       @click="dialog=false"
                       depressed
                >
                    <v-icon color="white" size="30px">mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
<!--                <v-container>-->
                    <v-text-field outlined
                                  ref="title"
                                  v-model="roomName"
                                  placeholder="Escriba el nombre de la habitación"
                                  background-color="white"
                                  color="black"
                                  counter
                                  autofocus
                                  clearable
                                  maxlength="50"
                    />
<!--                </v-container>-->
            </v-card-text>
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
        dialog: false,
        roomName:"",
        room:{
          name:"",
          devices: [],
          show: false
        },
      }
    },
    methods: {
      reset(){
        this.$refs.title.reset();
      },
      addRoom(){
        this.room.name = this.roomName
        store.commit("addRooms", this.room)
        this.dialog=false;
        this.reset();
      },
    }
}
</script>

<style scoped>

  .button{
    bottom: 80px;
    right: 50px;
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