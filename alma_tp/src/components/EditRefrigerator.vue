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
          <div class="selectMode">
            <v-select :items="modo"
                      item-text="modo"
                      color="black"
                      dense
                      return-object
                      persistent-placeholder
                      placeholder="Modo"/>
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
      modo: ["Normal", "Fiesta", "Vacaciones"],
    }),
}
</script>

<style scoped>

    .cardText{
      align-self: center;
      justify-content: center;
      justify-self: center;
    }

    .slider{
          width: 300px;
    }

    .selectMode{
      max-width: 120px;
    }
</style>