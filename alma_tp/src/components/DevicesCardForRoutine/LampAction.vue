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
        <v-btn
            :disabled="closeOnClick=='Apagado'"
            :color=btnColor
            @click="toggle = !toggle"
        >
          Color
        </v-btn>
        <v-color-picker
            :show-swatches="toggle"
            hide-canvas
            hide-sliders
            hide-inputs
            v-model="btnColor"
            @update:color="toggle = !toggle"
            :swatches="swatches"
        >
        </v-color-picker>
      </v-card-actions>
      <v-card-actions class="cardText pt-6">
        <v-slider color="black"
                  track-fill-color="black"
                  track-color="black"
                  v-model="brightness"
                  thumb-color="black"
                  thumb-label="always"
                  thumb-size="25px"
                  append-icon="mdi-white-balance-sunny"
                  prepend-icon="mdi-white-balance-sunny"
                  :disabled="closeOnClick === 'Apagado'"
                  @click:append="setLessBrightness()"
                  @click:prepend="setMoreBrightness()"
        >
        </v-slider>
      </v-card-actions>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="secondary white--text"
               @click="setAction"
               x-large>
          Aceptar
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "LampAction",
  props:["myColor", "myactions"],
  data(){
    return({
      closeOnClick: 'Apagado',
      brightness: 100 ,
      color: '#FFFFFF',
      show: false,
      showColors:false,
      btnColor:'#FFFFFF',
      swatches: [
        ['#FFFFFF', '#ff0000', '#ff4000'],
        ['#ff400e', '#ff4b00', '#ff6000'],
        ['#ff8000', '#FFBF00', '#FFFF00'],
        ['#BFFF04', '#80FF00', '#40FF00'],
        ['#BFFF00', '#80FF00', '#40FF00'],
        ['#00FF00', '#00FF40', '#00FF80'],
        ['#00FFBF', '#00FFFF', '#00bfff'],
        ['#0080ff', '#0040ff', '#0000ff'],
        ['#4000ff', '#8000ff', '#bf00ff'],
        ['#ff00ff', '#ff00bf', '#ff0080'],

      ],
      colorChangePush: false,
      toggle:false,

    })
  },
  mounted(){
    this.getSt()
  },
  methods:{
    getSt(){
      this.myactions.forEach(action => {
        if(action.actionName==='turnOff'){
          this.closeOnClick = 'Apagado'
        }else if(action.actionName==='setColor'){
          this.btnColor = action.params[0]
        } else if(action.actionName==='setBrightness'){
          this.brightness = action.params[0]
        }
      })
    },
    setAction:function (){
      this.setOnOff()
    },
    setOnOff(){
      let action = {
        name: 'turnOn',
        params: [],
        meta: {
          spanishName: this.closeOnClick,
          spanishPropName: ''
        }
      }
      if(this.closeOnClick == 'Apagado'){
        action.name='turnOff'
      }
      this.setBrightness()
      this.$emit("setAction", action)
    },
    setBrightness(){
      let action = {
        name: 'setBrightness',
        params: [this.brightness],
        meta: {
          spanishName: 'Brillo : ',
          spanishPropName: this.brightness
        }
      }
      this.setColor()
      this.$emit("setAction", action)
    },
    setColor(){
      let action = {
        name: 'setColor',
        params: [this.btnColor],
        meta: {
          spanishName: 'Color : ',
          spanishPropName: this.btnColor
        }
      }
      this.$emit("setAction", action)
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
</style>