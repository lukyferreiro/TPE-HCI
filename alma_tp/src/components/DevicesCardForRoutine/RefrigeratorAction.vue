<template>
  <v-card :color="myColor" flat>
    <div>
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
                    @change="setModo(false)"
          />
        </div>
      </v-card-actions>

      <div class="acceptAndCancel">
        <div class="justify-end">
          <v-btn color="secondary white--text"
                 @click="setAction"
                 x-large>
            Aceptar
          </v-btn>
        </div>
      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "RefrigeratorAction",
  props:["myColor", "myactions"],
  data(){
    return({
      closeOnClick: true,
      temperatura: 2,
      temperaturaFreezer: -8,
      minTemperatura: 2,
      maxTemperatura: 8,
      minTemperaturaFreezer: -20,
      maxTemperaturaFreezer: -8,
      selectModo: 'Normal',
      modo: ["Normal", "Fiesta", "Vacaciones"],

    });
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    setAction:function (){
      this.setModo(true)
    },
    setModo(bool){
      let action = {
        name: 'setModo',
        params: ['default'],
        meta: {
          spanishName: 'Modo',
          spanishPropName: ': ' + this.selectModo
        }
      }

      if(this.selectModo === 'Fiesta'){
        action.params = ['party']
        this.temperaturaFreezer = this.minTemperaturaFreezer
      }else if(this.selectModo === 'Vacaciones'){
        action.params = ['vacation']
        this.temperatura = this.maxTemperatura
      }
      this.setTemperature(bool)

      if(bool){
        this.$emit("setAction", action)
      }
    },
    setTemperature(bool){
      let action = {
        name: 'setTemperature',
        params: [this.temperatura],
        meta: {
          spanishName: 'Temperatura',
          spanishPropName: ': ' + this.temperatura.toString() + '°C'
        }
      }

      this.setFreezerTemperaturerature(bool)
      if(bool){
        this.$emit("setAction", action)
      }
    },
    setFreezerTemperaturerature(bool) {
      let action = {
        name: 'setFreezerTemperature',
        params: [this.temperaturaFreezer],
        meta: {
          spanishName: 'Temperatura del Freezer',
          spanishPropName: ': ' + this.temperaturaFreezer.toString() + '°C'
        }
      }

      if(bool){
        this.$emit("setAction", action)
      }
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

.acceptAndCancel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10% 20px;
  /*margin-top: 10px;*/
  /*margin-bottom: 20px;*/
  /*margin-right: 10%;*/
  /*margin-left: 10%;*/
}

.slider{
  width: 300px;
}

</style>