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
                  @change="setOpenClose(false)"
                  hide-details
                  inset
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


    <v-card-actions>
        <v-spacer/>
        <v-btn color="secondary white--text"
               @click="setAction"
               x-large>
          Aceptar
        </v-btn>
    </v-card-actions>
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
    setOpenClose(bool) {
      let action = {
        name: 'close',
        params: [],
        meta: {
          spanishName: this.closeOnClick,
          spanishPropName: ''
        }
      }
      if(this.closeOnClick === 'Abierto'){
        action.name= 'open'
        this.blockOnSwitch = 'Desbloqueado'
      }
      this.setBlockUnblock(bool)
      if(bool) {
        this.$emit("setAction", action)
      }
    },

    setBlockUnblock(bool){
      let action = {
        name: 'lock',
        params: [],
        meta: {
          spanishName: this.blockOnSwitch,
          spanishPropName: ''
        }
      }
      if(this.blockOnSwitch === 'Desbloqueado'){
        action.name = 'unlock'
      }
      if(bool) {
        this.$emit("setAction", action)
      }
    },
    goBack(){
      this.$router.go(-1);
    },

    setAction:function (){
      this.setOpenClose(true)
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