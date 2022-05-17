<template>
    <v-card color="transparent" flat >
        <div> {{this.device.state.temperature}}
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
                    <v-select v-model="selectedFuente"
                              :items="fuenteCalor"
                              item-text="fuenteCalor"
                              color="black"
                              dense
                              label="Fuente Calor"
                              @change="setFuente()"
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
                              @change="setGrill"
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
                              @change="setConveccion"
                    />
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
        selectedFuente:'Convencional',
        selectedGrill: 'Apagado',
        selectedConveccion: 'Apagado',
        dialog: false,
        closeOnClick: 'Apagado',
        temperatura: 90,
        firstTemp: 90,
        minTemperatura: 90,
        maxTemperatura: 290,
        fuenteCalor: ["Abajo", "Arriba", "Convencional"],
        modoGrill: ["Apagado", "Económico", "Completo"],
        modoConveccion: ["Apagado", "Económico", "Convencional"]
    }),
    methods:{
        ...mapActions("devices",{
          $executeAction: "execute"
        }),




        async execute(actionName){
          // Array.from(this.device.meta.actions).find(a => a.name == actionName).description = description
          let idS = [this.device, actionName]
          await this.$executeAction(idS)
        },


/*
          async executeWithParams(actionName, description, prevDesc){
          let action = Array.from(this.device.meta.actions).find(a => a.name == actionName)
          action.params[0].description = description
          action.description = prevDesc
          let idS = [this.device, actionName]
          await this.$executeAction(idS)
        },*/

        setOnOff(){
          if(this.closeOnClick == 'Apagado'){
            this.execute('turnOff', this.closeOnClick)
          }else{
            this.execute('turnOn', this.closeOnClick)
          }
        },

        async setTemperature(){
          let idS = [this.device, 'setTemperature', [this.temperatura]]
          await this.$executeAction(idS)
        },

        async setFuente(){
          let idS = [this.device, 'setHeat', []]

          if(this.selectedFuente == 'Convencional'){
            idS[2] = ['conventional']
          }else if(this.selectedFuente == 'Abajo'){
            idS[2] = ['bottom']
          }else{
            idS[2] = ['top']
          }
          await this.$executeAction(idS)
        },

      async setGrill(){
        let idS = [this.device, 'setGrill', []]
        if(this.selectedGrill == 'Apagado'){
          idS[2] = ['off']
        }else if(this.selectedGrill == 'Económico'){
          idS[2] = ['eco']
        }else{
          idS[2] = ['large']
        }
        await this.$executeAction(idS)
      },
      async setConveccion(){
         let idS = [this.device, 'setConvection', []]
         if(this.setConveccion() == 'Apagado'){
           idS[2] = ['off']
         }else if(this.setConveccion() == 'Económico'){
           idS[2] = ['eco']
         }else{
           idS[2] = ['normal']
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

    .selectorFuenteCalor, .selectorModo{
      margin-left: 10px;
      margin-right: 10px;
      max-width: 180px;
    }

</style>