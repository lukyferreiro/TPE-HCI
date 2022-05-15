<template>
    <v-card color="transparent" flat >
        <div>
            <v-card-actions class="cardText pt-0">
                <v-switch v-model="closeOnClick"
                          color="secondary"
                          class="text"
                          hide-details>
                    <template v-slot:label>
                        <span class="switchLabel">Encender/Apagar</span>
                    </template>
                </v-switch>
            </v-card-actions>
            <v-card-actions class="cardText pt-6">
                <div class="slider">
                    <v-slider v-model="temperatura"
                              color="black"
                              track-color="black"
                              track-fill-color="black"
                              :min="minTemperatura"
                              :max="maxTemperatura"
                              label="Temperatura ºC"
                              thumb-label="always"
                              thumb-size="25px"
                              hide-details/>

                </div>
            </v-card-actions>
            <v-card-actions class="cardText">
                <div class="selectorFuenteCalor">
                    <v-select :items="fuenteCalor"
                              item-text="fuenteCalor"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Fuente Calor"/>
                </div>
            </v-card-actions>
            <v-card-actions class="cardText">
                <div class="selectorModo">
                    <v-select :items="modoGrill"
                              item-text="modoGrill"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Modo Grill"/>
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
    name: "EditHorno",
    data: () => ({
      dialog: false,
      closeOnClick: true,
      temperatura: 90,
      minTemperatura: 90,
      maxTemperatura: 290,
      fuenteCalor: ["Abajo", "Arriba", "Convencional"],
      modoGrill: ["Apagado", "Economico", "Completo"],
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