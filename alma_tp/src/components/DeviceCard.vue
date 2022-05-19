<template>
  <div>
  <v-dialog scrollable
            overflow="auto"
            v-model="dialog"
            width="1000">

  <template v-slot:activator="{ on, attrs }">
      <v-card color="primary"
                max-width="200"
                max-height="200"
              v-bind="attrs"
              v-on="on">

            <v-card-actions class="image">
                <v-img :src="image"
                       :alt="name"
                       max-height="50%"
                       max-width="50%"/>
            </v-card-actions>
            <v-card-title class="card">
                {{deviceName}}
            </v-card-title>
        </v-card>
      </template>

  <v-card color="secondary white--text"
          v-click-outside="closePopup">
  <v-card-title>
    Agregar dispositivo de tipo {{this.deviceName}}
    <v-spacer/>
    <v-btn color="transparent"
           @click="closePopup()"
           depressed>
      <v-icon color="white" size="30px">mdi-window-close</v-icon>
    </v-btn>
  </v-card-title>
  <v-form ref="form" lazy-validation @submit="submit">
    <v-card-text>
      <v-text-field outlined
                    ref="title"
                    v-model="nameDev"
                    placeholder="Escriba el nombre del dispositivo"
                    background-color="white"
                    color="black"
                    counter
                    autofocus
                    clearable
                    maxlength="60"
                    :rules="nameRules"
                    required/>
    </v-card-text>
  </v-form>
  <v-card-actions>
    <v-spacer/>
    <v-btn class="mb-2"
           color="primary black--text"
           @click="addDevice">
      Aceptar
    </v-btn>
  </v-card-actions>


</v-card>


</v-dialog>

  <v-alert type="success" outlined :value="alert">
    Dispositivo agregado con exito
  </v-alert>

</div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "DeviceCard",
    props:["idType","deviceName", "roomId"],
    data(){
      return({
        nameRules:[
          v => !!v || 'Campo Obligatorio',
          v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
          v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
          v => this.$devices.find( o => o.name == v) == null || 'El nombre ingresado ya existe',
        ],
        dialog:false,
        deviceType: null,
        myColor: 'primary',
        nameDev:"",
        alert:false
      })
    },
    async created() {
      this.deviceType = await this.$getDeviceType(this.idType)
    },

    computed: {
      name() {
        return this.deviceType ? this.deviceType.name : ""
      },
      image() {
        return this.deviceType ? require(`@/assets/${this.name}.png`)  : require(`@/assets/unknown.png`)
      },
      ...mapState("devices",{
        $devices:"devices"
      }),
    },

    methods:{
        ...mapActions("devicesTypes",{
          $getDeviceType: "getDeviceType",
        }),
       ...mapActions("devices",{
         $add: "add",
         $editDevice: "edit",
         $getAll: "getAll",
         $getDevice: "getDevice",
         $deleteDevice: "delete"
       }),
       ...mapActions("room",{
         $addDevice: "addDevice",
       }),

      reset(){
        this.$refs.title.reset();
      },

      submit(e){
        e.preventDefault();
        this.addDevice()
      },

       async setResult(device){
         console.log(device)
       },

       async addDevice(){
          console.log(this.nameDev)
          console.log(this.$devices.find( o => o.name == this.nameDev) == null)
          if(this.$refs.form.validate()) {
            try {
              let device = {
                type: {
                  id: this.idType,
                },
                name: this.nameDev,
                meta: {
                  roomId: this.roomId,
                  actions: this.deviceType.actions,
                  image: this.image,
                  color: this.myColor,
                  selected: false,
                }
              }
              console.log('add')
              device = await this.$add(device)
              let idS = [this.roomId, device.id]
              device = await this.$addDevice(idS)
              this.alert=true
              setTimeout(()=>{
                this.alert=false
              },5000)
            } catch (e) {
              await this.setResult(e.code)
            }

            this.reset()
            this.dialog = false
          }
       },

      closePopup(){
        this.reset()
        this.dialog = false
      }

   },
}
</script>

<style scoped>

    .card{
      justify-content: center;
      font-size: 25px;
      font-weight: bold;
    }

    .image{
      justify-content: center;
    }

</style>