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
            <v-btn
                :disabled="closeOnClick ==='Apagado'"
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
            @update:color="setColor()"
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
                  @change="setBrightness()"
        >
        </v-slider>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: "EditLamp",
  props: ["device", "edit"],
  data() {
    return ({
      toggle:this.device.state.status ==='off',
      closeOnClick: this.device.state.status ==='off' ? 'Apagado' : 'Encendido',
      brightness: this.device.state.brightness ,
      color: this.device.state.color,
      show: false,
      showColors:false,
      btnColor:this.device.state.color,
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
    })
  },

  methods: {
    ...mapActions("devices", {
      $executeAction: "execute"
    }),

    async execute(actionName){
      let idS = [this.device, actionName]
      await this.$executeAction(idS)
    },

    async setColor(){
      this.colorChangePush=true
      let idS = [this.device, 'setColor', [this.btnColor]]
      await this.$executeAction(idS)
      this.colorChangePush=false
    },


     setOnOff(){
      if(this.closeOnClick == 'Apagado'){
        this.execute('turnOff', this.closeOnClick)
      }else{
        this.execute('turnOn', this.closeOnClick)
      }
    },

    async setBrightness(){
      let idS = [this.device, 'setBrightness', [this.brightness]]
      await this.$executeAction(idS)
    },

    setMoreBrightness() {
      this.brightness = (this.brightness - 5) || 0
      this.setBrightness()
    },
    setLessBrightness() {
      this.brightness = (this.brightness + 5) || 100
      this.setBrightness()
    },
  },

}

</script>

<style scoped>
.cardText{
  align-self: center;
  justify-content: center;
  justify-self: center;
}


</style>