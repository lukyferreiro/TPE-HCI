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
            Editar Aspiradora
          </v-btn>
        </template>

        <v-card :color="colorset">
            <div>
                <v-card-title class="mx-auto">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="transparent"
                                   v-bind="attrs"
                                   v-on="on"
                                   depressed
                            >
                               <v-icon color="black" size="40px">mdi-palette-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(color, index) in colors"
                                         :key="index"
                            >
                             <v-btn class="color-button"
                                     color="transparent"
                                     depressed
                                     @click="colorset=color.hex"
                                >
                                    <v-list-item-icon>
                                        <v-icon :color="color.hex"> mdi-square</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>{{ color.name }}</v-list-item-title>
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-spacer/>
                    <h3 class="habitacion"> NOMBRE HABITACION </h3>
                    <v-spacer/>

                    <v-btn class="pt-0 mt-0"
                           color="transparent"
                           @click="dialog=false"
                           depressed
                    >
                        <v-icon color="black" size="40px">mdi-window-close</v-icon>
                    </v-btn>
                </v-card-title>
            </div>

            <div>
                <v-card-actions class="pt-0 mt-0 cardText">
                    <v-avatar class="image"
                              rounded
                              size="80px"
                              >
                        <v-img :src="require(`@/assets/vacuum.png`)"
                               alt="Aspiradora" />
                    </v-avatar>
                </v-card-actions>
                <v-card-actions class="cardText">
                    <h2>
                        Aspiradora
                        <v-btn color="transparent"
                               depressed>
                            <v-icon color="black" size="30px">mdi-pencil-outline</v-icon>
                        </v-btn>
                    </h2>
                </v-card-actions>

                <v-divider/>

                <v-card-actions class="cardText">
                    <v-switch v-model="closeOnClick"
                              label="ENCENDER/APAGAR"
                              color="secondary"/>
                </v-card-actions>
                <v-card-actions class="cardText">
                    <v-btn @click="playVacuum()"
                           plain
                           fab
                           retain-focus-on-click
                           v-ripple="false"
                    >
                      <v-icon v-if="play" color="black" size="40px" class="mr-3">mdi-pause-circle-outline</v-icon>
                      <v-icon v-else color="black" size="40px" class="mr-3"> mdi-arrow-right-drop-circle-outline </v-icon>
                      Pausar/Reanudar
                    </v-btn>
                </v-card-actions>
                <v-card-actions class="cardText">
                    <div class="mode">
                       <v-select :items="modeType"
                                 item-text="mode"
                                 label="Modo:"
                                 class="mode"
                                 color="black"
                                 dense
                                 return-object
                                 persistent-placeholder
                                 placeholder="Seleccione un modo">
                       </v-select>
                    </div>
                </v-card-actions>
                <v-card-actions class="cardText">
                    <div class="dondeLimpiar">
                        <v-select :items="rooms"
                                  item-text="room"
                                  label="Donde limpiar:"
                                  class="dondeLimpiar"
                                  color="black"
                                  dense
                                  return-object
                                  persistent-placeholder
                                  placeholder="Donde limpiar">
                        </v-select>
                    </div>
                </v-card-actions>
                <v-card-actions class="cardText">
                    <div class="baseCarga">
                        <v-select :items="rooms"
                                  item-text="room"
                                  label="Base carga:"
                                  class="baseCarga"
                                  color="black"
                                  dense
                                  return-object
                                  persistent-placeholder
                                  placeholder="Ubicación base carga">
                        </v-select>
                    </div>
                </v-card-actions>
                <v-card-actions>
                    <v-btn class="regresarBase mx-auto mt-0"
                           color="secondary white--text">
                      Regresar a base de carga
                    </v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn class="acceptButton mx-auto"
                           color="error white--text"
                    >
                      Borrar dispositivo
                      <v-icon class="ml-2" color="white" size="25px">mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "EditVacuum",
    data: () => ({
      dialog: false,
      closeOnClick: true,
      play: true,
      modeType: [
        {mode: "Aspirar", id: 1},
        {mode: "Trapear", id: 2},
      ],
      rooms: [],
      colorset: "primary",
      colors: [
        {
          "hex": "#DC143C",
          "name": "Crimson"
        },
        {
          "hex": "#20B2AA",
          "name": "Light Sea Green"
        },
        {
          "hex": "#008B8B",
          "name": "Dark Cyan"
        },
        {
          "hex": "#4682B4",
          "name": "Steel Blue"
        }
      ]
    }),
    methods: {
      playVacuum(){
        this.play = !this.play
      },
    }
}
</script>

<style scoped>
  .cardText{
    align-self: center;
    justify-content: center;
    justify-self: center;
  }

  .colorpicker {
    width: auto;
  }

  .mode{
    width: auto;
    max-width: 180px;
  }

  .dondeLimpiar{
    width: auto;
    max-width: 180px;
  }

  .baseCarga{
    width: auto;
    max-width: 180px;
  }

</style>