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
                          hide-details
                          :disabled="selectModo === 'Vacaciones'"
                          @change="setTemperature"
                />
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
                          hide-details
                          :disabled="selectModo === 'Fiesta'"
                          @change="setFreezerTemperature"
                />
            </div>
        </v-card-actions>
        <v-card-actions class="cardText">
            <div class="selectMode">
                <v-select v-model="selectModo"
                          :items="modo"
                          item-text="modo"
                          color="black"
                          dense
                          label="Modo"
                          @change="setModo"
                />
            </div>
        </v-card-actions>
    </v-card>
</template>
<script>
import {mapActions} from "vuex";

export default {
    name: "EditRefrigerator",
    props:["device", "edit"],
    data(){
      return({
        dialog: false,
        closeOnClick: true,
        temperatura: this.edit ? (this.device.state.temperature) : 2,
        temperaturaFreezer:this.edit ? (this.device.state.freezerTemperature) : -8,
        minTemperatura: 2,
        maxTemperatura: 8,
        minTemperaturaFreezer: -20,
        maxTemperaturaFreezer: -8,
        selectModo:this.edit ? (this.device.state.mode === 'vacation' ? 'Vacaciones': (this.device.state.mode === 'party' ? 'Fiesta' : 'Normal')) : 'Normal',
        modo: ["Normal", "Fiesta", "Vacaciones"],
      });
    },
  methods: {
    ...mapActions("devices", {
      $executeAction: "execute"
    }),

    async setTemperature() {
      let idS = [this.device, 'setTemperature', [this.temperatura]]
      await this.$executeAction(idS)
    },
    async setFreezerTemperature() {
      let idS = [this.device, 'setFreezerTemperature', [this.temperaturaFreezer]]
      await this.$executeAction(idS)
    },
    async setModo(){
      let idS = [this.device, 'setMode']
      if(this.selectModo === 'Normal'){
        idS[2] = ['default']
      }else if(this.selectModo === 'Fiesta'){
        idS[2] = ['party']
        this.temperaturaFreezer = this.minTemperaturaFreezer
        await this.setFreezerTemperature()
      }else{
        idS[2] = ['vacation']
        this.temperatura = this.maxTemperatura
        await this.setTemperature()
      }
      await this.$executeAction(idS)
    }
  }
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