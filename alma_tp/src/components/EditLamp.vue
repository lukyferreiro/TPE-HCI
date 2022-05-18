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
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
                :color="color"
                dark
                v-on="on"
            >
              Event Color
            </v-btn>
          </template>
          <v-color-picker
              value="#7417BE"
              v-model="color"
              hide-canvas
              hide-inputs
              show-swatches
              class="mx-auto"
          ></v-color-picker>
        </v-menu>
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
      dialog: false,
      color: 'pink',
      closeOnClick: this.edit ? (this.device.state.status === 'off' ? 'Apagado' : 'Encendido') : 'Apagado',
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

    setOnOff(){
      if(this.closeOnClick == 'Apagado'){
        this.execute('turnOff', this.closeOnClick)
      }else{
        this.execute('turnOn', this.closeOnClick)
      }
    },
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