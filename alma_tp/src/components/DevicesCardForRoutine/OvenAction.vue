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
          />
        </div>
      </v-card-actions>

      <div class="acceptAndCancel">
        <div>
          <v-btn color="secondary white--text"
                 @click="goBack"
                 x-large>
            Cancelar
          </v-btn>
        </div>
        <v-spacer/>
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
    goBack(){
      this.$router.go(-1);
    },

    setAction:function (){
      console.log('acepta')
      if(this.closeOnClick === "Apagado"){
        let action = {
          name: 'turnOff',
          params: [],
          meta: {}
        }
        this.actions.push(action)
      }else{
        let action = {
          name: 'turnOn',
          params: [],
          meta: {}
        }
        this.actions.push(action)
      }

      let action = {
        name: 'setTemperature',
        params: [this.temperatura],
        meta: {}
      }
      this.actions.push(action)


      if(this.selectedFuente == 'Convencional'){
        let action = {
          name: 'setHeat',
          params: ['conventional'],
          meta: {}
        }
        this.actions.push(action)

      }else if(this.selectedFuente == 'Abajo'){
        let action = {
          name: 'setHeat',
          params: ['bottom'],
          meta: {}
        }
        this.actions.push(action)
      }else{
        let action = {
          name: 'setHeat',
          params: ['top'],
          meta: {}
        }
        this.actions.push(action)
      }

      this.$emit("setAction", this.actions)
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