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

        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn
                :color="color"
                v-on="on"
                :disabled="closeOnClick === 'Apagado'"
                @click="setColor()"
            >
            </v-btn>
            Event Color
          </template>
          <v-color-picker
              :value="color"
              v-model="color"
              hide-canvas
              hide-inputs
              show-swatches
              class="mx-auto"
              mode="hexa"
              @change="setColor()"
          ></v-color-picker>
        </v-menu>
      </v-card-actions>
      <v-card-actions class="cardText pt-4 ma-2">
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
                  @click:append="setMoreBrightness()"
                  @click:prepend="setLessBrightness()"
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
      closeOnClick: this.device.state.status ==='off' ? 'Apagado' : 'Encendido',
      brightness: this.device.state.brightness ,
      color: this.device.state.color,
      show: false,

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
      let idS = [this.device, 'setColor', [this.color]]
      await this.$executeAction(idS)
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