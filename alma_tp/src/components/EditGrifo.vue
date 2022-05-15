<template>
    <v-card color="transparent" flat>
        <div>
            <v-card-actions class="cardText pt-0">
                <v-switch v-model="closeOnClick"
                          color="secondary"
                          hide-details>
                    <template v-slot:label>
                        <span class="switchLabel">Reproducir/Detener</span>
                    </template>
                </v-switch>
            </v-card-actions>
            <v-card-actions class="cardText">
                <v-btn class="openAndCloseFaucet"
                       @click="openFaucet()"
                       plain
                       fab
                       v-ripple="false" >
                       <v-icon v-if="open" color="black" size="40px" class="mr-3">mdi-water-pump</v-icon>
                       <v-icon v-else color="black" size="40px" class="mr-3"> mdi-water-pump-off </v-icon>
                       Abrir/Cerrar
                </v-btn>
            </v-card-actions>
            <v-card-actions class="cardText">
                <div class="slider">
                    <v-slider v-model="cantDispensar"
                              color="black"
                              track-color="black"
                              track-fill-color="black"
                              :min="minDispensar"
                              :max="maxDispensar"
                              label="Cantidad a dispensar"
                              thumb-label="always"
                              thumb-size="25px"
                              hide-details/>
                </div>
                <div class="sliderSelector">
                    <v-select :items="unidades"
                              item-text="unidades"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Unidades"/>
                </div>
            </v-card-actions>
            <v-card-actions class="cardText">
                <v-btn class="acceptButton mx-auto"
                       color="error white--text">
                  Borrar dispositivo
                  <v-icon class="ml-2" color="white" size="25px">mdi-trash-can-outline</v-icon>
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>


<script>
export default {
    name: "EditGrifo",
    data: () => ({
      dialog: false,
      closeOnClick: true,
      open: false,
      cantDispensar: 0,
      minDispensar: 0,
      maxDispensar: 100,
      unidades: ["Litros", "Mililitros"],
      data: () => ({
            panel: [0, 1],
            unidades: false,
          }),
    }),
    methods: {
        openFaucet(){
            this.open = !this.open;
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

    .switchLabel {
        color: black;
        font-weight: bold;
    }
    .openAndCloseFaucet{
        text-transform: none;
        color: black;
        font-weight: bold;
        font-size: 15px;
    }

    .slider{
      width: 300px;
    }

    .sliderSelector{
      margin-left: 5px;
      width: auto;
      max-width: 100px;
    }

</style>