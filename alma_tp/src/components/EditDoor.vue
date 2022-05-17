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
                <v-switch v-model="blockOnSwitch"
                          color="secondary"
                          class="text"
                          inset
                          false-value="Bloquear"
                          true-value="Desbloquear"
                          :label="`${blockOnSwitch}`"
                          :disabled="closeOnClick === 'Abierto'"
                          hide-details
                          @change="setLockUnlock()"
                />
            </v-card-actions>
        </div>
    </v-card>
</template>


<script>
import {mapActions} from "vuex";

export default {
    name: "EditDoor",
    props: ["device"],
    data(){
      return({
        dialog: false,
        closeOnClick: this.device.state.status==='closed' ? 'Cerrado' : 'Abierto' ,
        blockOnSwitch: this.device.state.lock==='unlocked' ? 'Desbloqueado' : 'Bloqueado' ,
        open: false,
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

    .switchLabel {
        color: black;
        font-weight: bold;
    }

</style>