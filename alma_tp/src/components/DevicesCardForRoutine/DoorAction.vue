<template>
  <v-card :color="myColor" flat>
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
        />
      </v-card-actions>
    </div>

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
  </v-card>

</template>

<script>
export default {
name: "DoorAction",
  props:["myColor", "myactions"],
  data(){
    return({
      closeOnClick: 'Cerrado' ,
      blockOnSwitch: 'Desbloqueado' ,
      actions: []
    })
  },
  methods:{
    setOpenClose() {
      if(this.closeOnClick === 'Abierto'){
        this.blockOnSwitch = 'Desbloqueado'
      }
    },
    goBack(){
      this.$router.go(-1);
    },

    setAction:function (){
      if(this.closeOnClick === "Abierto"){
        let action = {
          name: 'open',
          params: [],
          meta: {}
        }
        this.actions.push(action)
      }else{
        let action = {
          name: 'close',
          params: [],
          meta: {}
        }
        this.actions.push(action)
      }

      if(this.blockOnSwitch === "Bloqueado"){
        let action = {
          name: 'block',
          params: [],
          meta: {}
        }
        this.actions.push(action)
      }else{
        let action = {
          name: 'unblock',
          params: [],
          meta: {}
        }
        this.actions.push(action)      }

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
</style>