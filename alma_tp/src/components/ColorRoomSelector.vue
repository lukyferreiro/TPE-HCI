<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="button buttonEditColor"
                   color="black"
                   v-bind="attrs"
                   v-on="on"
                   plain
                   fab
                   v-ripple="false">
                <v-icon class="mr-2" color="black">mdi-palette-outline</v-icon>
                Editar color
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(color, index) in colors"
                         :key="index">
                <v-btn color="transparent"
                       depressed
                       @click="updateColor(color.hex)">
                    <v-list-item-icon>
                        <v-icon :color="color.hex"> mdi-square</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ color.name }}</v-list-item-title>
                </v-btn>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "ColorSelector",
    props: ["room"],
    data(){
      return{
        colors: [
          {
            "hex": "#E3F2FD",
            "name": "Light Blue"
          },
          {
            "hex": "#D1C4E9",
            "name": "Light Purple"
          },
          {
            "hex": "#DCEDC8",
            "name": "Light Green"
          },
          {
            "hex": "#FFF9C4",
            "name": "Light Yellow"
          },
          {
            "hex": "#FCE4EC",
            "name": "Light Pink"
          }
        ]
      }
    },
    methods: {
      ...mapActions("room",{
        $editRoom: "edit",
        $getAll:"getAll"
      }),

      async updateColor(colorSelected){
        let room={
          name: this.room.name,
          meta: {
            colorRoom : colorSelected,
          }
        }
        let idS=[this.room.id,room]
        console.log(room.name)
        await this.$editRoom(idS)
        await this.$getAll()
      }
    }
}
</script>

<style scoped>

  .button{
    text-transform: none;
    font-size: 17px;
    color: black;
    font-weight: bold;
  }

  .buttonEditColor{
    padding-left: 65px;
  }

</style>