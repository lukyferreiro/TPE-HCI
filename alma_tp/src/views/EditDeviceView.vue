<template>
    <v-card :color="myColor" class="edit">
        <div>
            <v-card-title class="titleCard">
                <p v-if="edit"> Editar dispositivo: {{ this.deviceName }} </p>
                <p v-else> Agregar dispositivo: {{ this.deviceName }} </p>
              <v-spacer/>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="transparent"
                             v-bind="attrs"
                             v-on="on"
                             depressed
                             fab
                      >
                        <v-icon color="black" size="40px">mdi-palette-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(color, index) in colors"
                                   :key="index"
                      >
                        <v-btn class="color-button"
                               color="transparent"
                               depressed
                               @click="myColor=color.hex">
                          <v-list-item-icon>
                            <v-icon :color="color.hex"> mdi-square</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{ color.name }}</v-list-item-title>
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
            </v-card-title>
          <v-card-actions class="image">
            <div >
              <v-avatar rounded
                        size="30%">
                <v-img :src="image"
                       :alt="deviceName" />
              </v-avatar>
            </div>
          </v-card-actions>
          
          <v-spacer/>

            <v-form ref="form" lazy-validation @submit="submit">
                <v-container class="pb-0">
                    <v-text-field outlined
                                  ref="title"
                                  v-model="devName"
                                  placeholder="Escriba el nombre del dispositivo"
                                  background-color="white"
                                  counter
                                  autofocus
                                  clearable
                                  color="black"
                                  maxlength="60"
                                  :rules="nameRules"
                                  required/>
                </v-container>
            </v-form>
        </div>

        <EditDoor v-if="device.type.id == 'lsf78ly0eqrjbz91'" :colorset="this.myColor" :device="device"/>
        <EditGrifo v-else-if="device.type.id == 'dbrlsh7o5sn8ur4i'" :colorset="this.myColor" :device="device"/>
        <EditHorno v-else-if="device.type.id == 'im77xxyulpegfmv8'" :colorset="this.myColor" :device="device"/>
        <EditRefrigerator v-else-if="device.type.id == 'rnizejqr2di0okho'" :colorset="this.myColor" :device="device"/>
        <EditSpeaker v-else :colorset="this.myColor" :device="device"/>

        <v-card-actions v-if="edit">
            <v-btn class="acceptButton mx-auto"
                   color="error white--text"
                   @click="deleteDevice"
            >
                Borrar dispositivo
                <v-icon class="ml-2" color="white" size="25px">mdi-trash-can-outline</v-icon>
            </v-btn>
        </v-card-actions>

        <div class="acceptAndCancel">
            <div class="mr-8">
                <v-btn color="secondary white--text"
                       @click="goBack">
                    Cancelar
                </v-btn>
            </div>
        <div>
            <v-btn color="secondary white--text"
                   @click="addDevice">
              Aceptar
            </v-btn>
        </div>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import EditGrifo from "@/components/EditFaucet";
import EditHorno from "@/components/EditOven";
import EditRefrigerator from "@/components/EditRefrigerator";
import EditSpeaker from "@/components/EditSpeaker";
import EditDoor from "@/components/EditDoor";

export default {
  name: "EditDeviceView",
  components: {EditSpeaker, EditRefrigerator, EditHorno, EditGrifo, EditDoor},
  props:["idType", "deviceName", "roomId", "device", "image", "edit"],
  data(){
    return({
      nameRules:[
        v => !!v || 'Campo Obligatorio',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
        v => this.allDevices.find( o => o.name === v) == null || 'El nombre ingresado ya existe'
      ],
      allDevices: null,
      devName:this.edit ? this.device.name : '',
      myColor: this.edit ? this.device.meta.color : 'primary' ,
      colors: [
        {
          "hex": "#BBDEFB",
          "name": "Light Blue"
        },
        {
          "hex": "#D1C4E9",
          "name": "Light Purple"
        },
        {
          "hex": "#DCEDC8",
          "name": "Light Green"
        },
        {
          "hex": "#FFF9C4",
          "name": "Light Yellow"
        },
        {
          "hex": "#FCE4EC",
          "name": "Light Pink"
        }
      ]

    })
  },
  async created() {
      this.allDevices = await this.$getAll()
      // console.log(this.allDevices)
    },

  methods:{

    ...mapActions("devices",{
      $add: "add",
      $editDevice: "edit",
      $getAll: "getAll",
      $deleteDevice: "delete"
    }),
    ...mapActions("room",{
      $addDevice: "addDevice",
    }),

    async setResult(device){
      console.log(device)
    },
    
    async deleteDevice(){
      await this.$deleteDevice(this.device.id)
      this.goBack();
    },

    async addDevice(){
      if(this.$refs.form.validate()) {
        try{
          if(!this.edit) {
            let device = {
              type: {
                id: this.device.id,
              },
              name: this.devName,
              meta: {
                roomId: this.roomId,
                actions: this.device.actions,
                image: this.image,
                color: this.myColor
              }
            }
            device = await this.$add(device)
            let idS = [this.roomId, device.id]
            device = await this.$addDevice(idS)
            await this.setResult(idS[1])
          }else{
            let device = {
              name: this.devName,
              meta: {
                roomId: this.roomId,
                actions: this.device.actions,
                image: this.image,
                color: this.myColor
              }
            }
            let idS = [this.device.id , device]
            await this.$editDevice(idS)
          }
        } catch(e){
          await this.setResult(e.code)
        }
        this.goBack()
      }
    },
    goBack(){
      this.reset();
      let num = -2;
      if(this.edit)
        num= -1

      this.$router.go(num);

    },
    reset(){
      this.$refs.title.reset();
    },
    submit(e){
      e.preventDefault();
      this.addDevice()
    },
  }
}
</script>

<style scoped>

  .titleCard{
      font-weight: bold;
      font-size: 25px;
  }

  .image{
    position: center;
    margin-left: 20%;
  }

  .ingresarNombre{
    margin-bottom: 0;
  }

  .edit{
    margin-top: 140px;
    margin-bottom: 120px;
    margin-left: 100px;
    margin-right: 100px;
  }

  .acceptAndCancel{
    margin: 8px;
    display: flex;
    justify-content: end;
  }

  .image{
    align-self: center;
    justify-content: center;
    justify-self: center;
  }

</style>