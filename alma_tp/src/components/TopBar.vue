<template>
    <v-app-bar class="toolbar"
               color="primary"
               height="120"
               app>
        <div class="logo">
            <v-btn class="d-flex align-center"
                   :to="{name:'HomeView'}"
                   depressed
                   color="transparent"
                   plain>
                <v-img alt="ALMA logo"
                       :src="require(`@/assets/alma_logo.png`)"
                       width="55"/>
                <p class="alma">ALMA</p>
            </v-btn>
        </div>

        <v-spacer></v-spacer>

        <v-btn class="menu-button"
               @click="updateRooms()"
               :to="{name:'RoomView'}"
               plain
               retain-focus-on-click
               v-ripple="false">
            Habitaciones
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn class="menu-button"
               @click="updateRoutines()"
               :to="{name:'RoutineView'}"
               plain
               retain-focus-on-click
               v-ripple="false">
            Rutinas
        </v-btn>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn :to="{name:'HelpView'}"
                       v-on="on"
                       plain
                       v-ripple="false">
                    <v-icon size="45px" color="black">mdi-help-circle-outline</v-icon>
                </v-btn>
            </template>
            <span>help</span>
        </v-tooltip>
    </v-app-bar>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "TopBar",
    methods:{
      ...mapActions("room",{
        $getAllRooms: "getAll",
      }),

      // ...mapActions("routine",{
      //   $getAllRoutines: "getAll",
      // }),

      async updateRooms(){
        await this.$getAllRooms();
      },

      // async updateRoutines(){
      //   await this.$getAllRoutines();
      // }
  }
}
</script>

<style scoped>

    .alma {
      color: black;
      font-size: 60px;
      margin-left: 10px;
      margin-top: 15px;
    }

    .toolbar{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
    }

    .menu-button{
        text-transform: none;
        font-size: x-large !important;
    }

    .menu-button:hover{
      text-decoration: underline;
      font-weight: bold;
    }


</style>