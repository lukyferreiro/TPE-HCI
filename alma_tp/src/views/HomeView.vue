<template>
    <div class="home">
        <div class="text">
            <h1>Bienvenido/a a ALMA</h1>
            <p>
                <v-icon color="black" size="30px" class="pb-1 mr-2">mdi-devices</v-icon>
                Controla tus dispositivos remotamente.
            </p>
            <p>
                <v-icon color="black" size="30px" class="pb-1 mr-2">mdi-web</v-icon>
                Automatiza con facilidad.
            </p>
            <h2> Comienza agregando tu primera habitación:</h2>
            <div class="habsButton">
                <v-btn color="secondary"
                       @click="updateRooms()"
                       :to="{name:'RoomView'}"
                       x-large
                       rounded elevation="5"
                       retain-focus-on-click>
                    Haz click aquí
                </v-btn>
            </div>
        </div>
        <div class="image">
            <v-img alt="Imagen de fondo"
                   :src="image"/>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "HomeView",
    data() {
      return {
        image: require(`@/assets/welcomeHome.png`),
      }
    },
    methods: {
      ...mapActions("room", {
        $getAllRooms: "getAll",
      }),

      async updateRooms() {
        await this.$getAllRooms();
      },
    }
}

</script>

<style scoped>

  .home{
    margin-top: 120px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .text{
    font-weight: bold;
  }

  h1{
    font-size: 50px;
    margin-bottom: 15px;
  }

  p, h2{
    padding-top: 20px;
    padding-bottom: 20px;
  }

  p{
    font-size: 25px;
    padding-left: 15px;
    margin: 0;
  }

  h2{
    font-size: 30px;
  }

  .image{
    height: 78vh;
    max-width: 40%;
  }

  .habsButton, .image, h1, p, h2{
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>