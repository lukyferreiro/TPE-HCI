<template>
    <v-card color="transparent" flat >
        <div>
            <v-card-actions class="cardText pt-0">
                <v-switch v-model="closeOnClick"
                          inset
                          color="secondary"
                          class="text"
                          true-value="Encendido"
                          false-value="Apagado"
                          :label="`${closeOnClick}`"
                          @change="setOnOff"
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
                              @change="setTemperature()"
                    />

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
                <div class="selectorModo">
                    <v-select :items="modoConveccion"
                              item-text="modoConveccion"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Modo Conveccion"/>
                </div>
            </v-card-actions>
        </div>
    </v-card>
</template>
<script>
import {mapActions} from "vuex";

export default {
    name: "EditHorno",
    props: ["device"],
    data: () => ({
      dialog: false,
      closeOnClick: 'Apagado',
      temperatura: 90,
      firstTemp: 90,
      minTemperatura: 90,
      maxTemperatura: 290,
      fuenteCalor: ["Abajo", "Arriba", "Convencional"],
      modoGrill: ["Apagado", "Economico", "Completo"],
      modoConveccion: ["Apagado", "Economico", "Convencional"]
    }),
  methods:{
      ...mapActions("devices",{
        $executeAction: "execute"
      }),
    async execute(actionName, description){
      Array.from(this.device.meta.actions).find(a => a.name == actionName).description = description
      let idS = [this.device, actionName]
      await this.$executeAction(idS)
    },
    async executeWithParams(actionName, description, prevDesc){
      let action = Array.from(this.device.meta.actions).find(a => a.name == actionName)
      action.params[0].description = description
      action.description = prevDesc
      let idS = [this.device, actionName]
      await this.$executeAction(idS)
    },
    setOnOff(){
        if(!this.closeOnClick){
          this.execute('turnOff', this.closeOnClick)
        }else{
          this.execute('turnOn', this.closeOnClick)
        }
    },
     setTemperature(){
        console.log( Array.from(this.device.meta.actions).find(a => a.name == 'setTemperature'))
       this.executeWithParams('setTemperature', this.temperatura, this.firstTemp)
       this.firstTemp = this.temperatura
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
      max-width: 180px;
    }

    .selectorModo{
      max-width: 180px;
    }

</style>