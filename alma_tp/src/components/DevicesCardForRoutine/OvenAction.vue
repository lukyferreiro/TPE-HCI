<template>
  <v-card :color="myColor" flat>
    <div>
      <v-card-actions class="cardText pt-0">
        <v-switch v-model="closeOnClick"
                  inset
                  color="secondary"
                  class="text"
                  true-value="Encendido"
                  false-value="Apagado"
                  :label="`${closeOnClick}`"
                  @change="setTurnOnOff(false)"
                  hide-details>
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
                    hide-details
                    :disabled="closeOnClick === 'Apagado'"
          />
        </div>
      </v-card-actions>
      <v-card-actions class="cardText">
        <div class="selectorFuenteCalor">
          <v-select v-model="selectedFuente"
                    :items="fuenteCalor"
                    item-text="fuenteCalor"
                    color="black"
                    dense
                    label="Fuente Calor"
          />
        </div>
      </v-card-actions>
      <v-card-actions class="cardText">
        <div class="selectorModo">
          <v-select v-model="selectedGrill"
                    :items="modoGrill"
                    item-text="modoGrill"
                    color="black"
                    dense
                    label="Modo Grill"
                    :disabled="closeOnClick === 'Apagado'"
          />
        </div>
      </v-card-actions>
      <v-card-actions class="cardText">
        <div class="selectorModo">
          <v-select v-model="selectedConveccion"
                    :items="modoConveccion"
                    item-text="modoConveccion"
                    color="black"
                    dense
                    label="Modo Convección"
                    :disabled="closeOnClick === 'Apagado'"
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
  name: "OvenAction",
  props:["myColor", "myactions"],
  data(){
    return({
      selectedFuente:  'Convencional',
      selectedGrill: 'Apagado',
      selectedConveccion: 'Convencional',
      dialog: false,
      closeOnClick: 'Apagado',
      temperatura:  90,
      firstTemp: 90,
      minTemperatura: 90,
      maxTemperatura: 290,
      fuenteCalor: ["Abajo", "Arriba", "Convencional"],
      modoGrill: ["Apagado", "Económico", "Completo"],
      modoConveccion: ["Apagado", "Económico", "Convencional"],
      actions: []
    })
  },
  methods:{
    setTurnOnOff(bool){
      let action = {
        name: 'turnOn',
        params: [],
        meta: {
          spanishName: this.closeOnClick,
          spanishPropName: ''
        }
      }
      if(this.closeOnClick === "Apagado"){
        action.name='turnOff'
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

      this.setConveccion(bool)

      if(bool){
        this.$emit("setAction", action)
      }else{
        this.temperatura = 0
      }
    },
    setConveccion(bool){
      let action = {
        name: 'setConvection',
        params: ['normal'],
        meta: {
          spanishName: 'Modo Conveccion',
          spanishPropName:': ' + this.selectedConveccion
        }
      }
      if(this.selectedConveccion == 'Apagado'){
        action.params = ['off']
      }else if(this.selectedConveccion == 'Económico'){
        action.params = ['eco']
      }
        this.setModoGrill(bool)

        if(bool){
          this.$emit("setAction", action)
        }else{
          action.params = ['off']
        }
      },
    setModoGrill(bool){
      let action = {
        name: 'setGrill',
        params: ['large'],
        meta: {
          spanishName: 'Modo Grill',
          spanishPropName:': ' + this.selectedGrill
        }
      }
      if(this.selectedGrill == 'Apagado'){
        action.params = ['off']
      }else if(this.selectedGrill == 'Económico'){
        action.params = ['eco']
      }

      if(bool){
        this.setHeat()
        this.$emit("setAction", action)
      }else{
        action.params = ['off']
      }
    },
    setHeat(){
      let action = {
        name: 'setHeat',
        params: ['conventional'],
        meta: {
          spanishName: 'Fuente de Calor',
          spanishPropName: ': ' + this.selectedFuente
        }
      }
      if(this.selectedFuente == 'Abajo'){
        action.params = ['bottom']
      }else if(this.selectedFuente == 'Arriba') {
        action.params = ['top']
      }

      this.$emit("setAction", action)

      },
    setAction:function (){
        this.setTurnOnOff(true)
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

.selectorFuenteCalor, .selectorModo{
  margin-left: 10px;
  margin-right: 10px;
  max-width: 180px;
}
</style>