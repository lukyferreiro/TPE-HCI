<template>
  <v-dialog
      scrollable
      overflow="auto"
      v-model="dialog"
      width="1000"
  >

    <v-card class="popup"
            color="secondary white--text"
    >
      <v-card-title>
        <v-icon color="white"> mdi-home-outline </v-icon>
        Editar habitación
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
                        v-model="room2"
                        placeholder="Escriba el nombre de la habitación *"
                        counter
                        clearable
                        maxlength="50"
          />
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            class="acceptButtom"
            color="primary black--text"
            @click="editRoom(room2)"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: "EditView",
  data(){
    return{
      dialog:true,
      room2:'',
    }
  },
  methods:{
    editRoom(room2){
      this.$refs.room=room2
      this.dialog=false;
    }
  }
}
</script>

<style scoped>

</style>