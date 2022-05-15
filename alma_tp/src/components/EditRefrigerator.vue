<template>
    <v-card color="transparent" flat >
        <v-card-actions class="cardText">
            <div class="slider">
                <v-slider v-model="temperatura"
                          color="black"
                          track-color="black"
                          track-fill-color="black"
                          :min="minTemperatura"
                          :max="maxTemperatura"
                          label="Temperatura Heladera ºC"
                          thumb-label="always"
                          thumb-size="25px"
                          hide-details/>
            </div>
        </v-card-actions>
        <v-card-actions class="cardText pt-6">
            <div class="slider">
                <v-slider v-model="temperaturaFreezer"
                          color="black"
                          track-color="black"
                          track-fill-color="black"
                          :min="minTemperaturaFreezer"
                          :max="maxTemperaturaFreezer"
                          label="Temperatura Freezer ºC"
                          thumb-label="always"
                          thumb-size="25px"
                          hide-details/>
            </div>
        </v-card-actions>
        <v-card-actions class="cardText">
            <v-btn class="acceptButton mx-auto"
                   color="error white--text">
              Borrar dispositivo
              <v-icon class="ml-2" color="white" size="25px">mdi-trash-can-outline</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: "EditRefrigerator",
    data: () => ({
      dialog: false,
      closeOnClick: true,
      temperatura: 5,
      temperaturaFreezer: -2,
      minTemperatura: 2,
      maxTemperatura: 8,
      minTemperaturaFreezer: -8,
      maxTemperaturaFreezer: -2,
    }),
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

    .slider{
          width: 300px;
    }

    .selectorFuenteCalor, .selectorModo{
      margin-left: 10px;
      margin-right: 10px;
    }

    .selectorFuenteCalor{
      max-width: 140px;
    }

    .selectorModo{
      max-width: 120px;
    }
</style>