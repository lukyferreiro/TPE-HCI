<template>
  <div class="room">
    <v-dialog
        v-model="dialog"
        width="1000"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            rounded
            floating
            color="secondary"
            v-bind="attrs"
            v-on="on"
        >
          Agregar habitación
          <v-icon>mdi-plus</v-icon>

        </v-btn>

      </template>

      <v-card class="popup">
        <v-card-title>
          <v-icon> mdi-home-outline </v-icon>
           Agregar habitación
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field outlined
                   v-model="room"
                   placeholder="Escriba el nombre de la habitación"
                   counter
                   maxlength="50"
            />
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="acceptButtom"
              color="primary"
              text
              @click="addRoom"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <h3 v-if="roomsAmount==0">No tienes habitaciones creadas aun</h3>
    <ul v-else >
      <li v-for="room in rooms" :key="room">
        {{ room }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "RoomView",
  components:{},
  data(){
    return{
      dialog: false,
      roomsAmount: 0,
      rooms: [],
      room:""
    }
  },
  methods:{
    addRoom(){
      this.dialog=false;
      this.roomsAmount++;
      this.rooms.push(this.room);
    },
  }
}
</script>

<style scoped>

    .v-btn{
      margin: 20px;
      font-size: large;
    }

    .popup{
        background-color: #0F4C75;
    }

    .acceptButtom{
        background-color: #B5D9F1;
        color: #000000;
    }

</style>