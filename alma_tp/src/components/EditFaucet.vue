<template>
    <v-card color="transparent" flat>
        <div>
          <v-card-actions class="cardText pt-0">
            <v-switch v-model="closeOnClick"
                      color="secondary"
                      class="text"
                      true-value="Abierto"
                      false-value="Cerrado"
                      :label="`${closeOnClick}`"
                      hide-details
                      inset
                      @change="setOpenClose()"
            />
          </v-card-actions>
            <v-card-actions class="cardText">
                <div class="slider">
                    <v-slider v-model="cantDispensar"
                              color="black"
                              track-color="black"
                              track-fill-color="black"
                              :min="minDispensar"
                              :max="maxDispensar"
                              label="Cantidad a dispensar"
                              thumb-label="always"
                              thumb-size="25px"
                              hide-details
                              @change="setDispensar()"
                    />
                </div>
                <div class="sliderSelector">
                    <v-select v-model="unidadesOnClick"
                              :items="unidades"
                              item-text="unidades"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Unidades"
                              @change="setUnidades"
                    />
                </div>
            </v-card-actions>
        </div>
    </v-card>
</template>


<script>
import {mapActions} from "vuex";

export default {
    name: "EditFaucet",
    props:["device", "edit"],
    data(){
      return({
        dialog: false,
        closeOnClick: this.edit ?  (this.device.state.status==='closed' ? 'Cerrado' : 'Abierto') : 'Cerrado' ,
        open: false,
        cantDispensar: this.edit ? this.device.type.powerUsage : 15,
        minDispensar: 0,
        maxDispensar: 100,
        unidades:  [
          "ml",
          "cl",
          "dl",
          "l",
          "dal",
          "hl",
          "kl"
        ],
        unidadesOnClick: 'l'
        // unidades: false,
      })
    },
    methods: {
      ...mapActions("devices", {
        $executeAction: "execute"
      }),
      async execute(actionName) {
        let idS = [this.device, actionName]
        await this.$executeAction(idS)
      },
      setOpenClose() {
        if (this.closeOnClick === 'Cerrado') {
          this.execute('close', this.closeOnClick)
        } else {
          this.execute('open', this.closeOnClick)
        }
      },
      async setDispensar(){
        let idS = [this.device, 'dispense', [this.cantDispensar]]
        await this.$executeAction(idS)
      },
      async setUnidades(){
        let idS = [this.device, 'unit', [this.unidadesOnClick]]
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

    .switchLabel {
        color: black;
        font-weight: bold;
    }
    .openAndCloseFaucet{
        text-transform: none;
        color: black;
        font-weight: bold;
        font-size: 15px;
    }

    .slider{
      width: 300px;
    }

    .sliderSelector{
      margin-left: 5px;
      width: auto;
      max-width: 100px;
    }

</style>