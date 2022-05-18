<template>
    <div>
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
                    <v-switch v-model="blockOnSwitch"
                              color="secondary"
                              class="text"
                              inset
                              false-value="Desbloqueado"
                              true-value="Bloqueado"
                              :label="`${blockOnSwitch}`"
                              :disabled="closeOnClick === 'Abierto'"
                              hide-details
                              @change="setLockUnlock()"
                    />
                </v-card-actions>
            </div>
        </v-card>
    </div>
</template>


<script>
import {mapActions} from "vuex";

export default {
    name: "EditDoor",
    // props: ["device", "edit"],
    props: ["device"],
    data(){
      return({
        // closeOnClick: this.edit ? (this.device.state.status==='closed' ? 'Cerrado' : 'Abierto') : 'Cerrado' ,
        // blockOnSwitch:  this.edit ? (this.device.state.lock==='unlocked' ? 'Desbloqueado' : 'Bloqueado')  : 'Desbloqueado' ,
        closeOnClick: this.device.state.status==='closed' ? 'Cerrado' : 'Abierto',
        blockOnSwitch:  this.device.state.lock==='unlocked' ? 'Desbloqueado' : 'Bloqueado',
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
            this.blockOnSwitch = 'Desbloqueado'
            this.setLockUnlock()
            this.execute('open', this.closeOnClick)
          }
        },

        setLockUnlock() {
          if (this.blockOnSwitch === 'Desbloqueado') {
            this.execute('unlock', this.blockOnSwitch)
          } else {
            this.execute('lock', this.blockOnSwitch)
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