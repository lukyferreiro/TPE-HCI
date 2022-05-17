<template>
    <v-card :color="myColor" class="edit">
        <div class="image">
            <v-avatar rounded
                      size="20%">
                <v-img :src="image"
                       :alt="deviceName" />
            </v-avatar>
        </div>
        <div>
            <v-card-title class="titleCard mb-7">
                <p v-if="edit"> Editar dispositivo: {{ this.deviceName }} </p>
                <p v-else> Agregar dispositivo: {{ this.deviceName }} </p>
                <v-spacer/>
<!--                <ColorRoomSelector :element="device" device="true" :color="myColor"/>-->
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="transparent"
                               v-bind="attrs"
                               v-on="on"
                               depressed
                               fab >
                            <v-icon color="black" size="40px">mdi-palette-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(color, index) in colors"
                                     :key="index">
                            <v-btn color="transparent"
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

        <EditDoor v-if="idType === 'lsf78ly0eqrjbz91'"  :device="device"/>
        <EditGrifo v-else-if="idType === 'dbrlsh7o5sn8ur4i'" :device="device"/>
        <EditHorno v-else-if="idType === 'im77xxyulpegfmv8'"  :device="device"/>
        <EditRefrigerator v-else-if="idType === 'rnizejqr2di0okho'" :device="device"/>
        <EditSpeaker v-else :colorset="this.myColor" :device="device"/>

        <div class="acceptAndCancel">
            <div>
                <v-btn color="secondary white--text"
                       @click="goBack"
                       x-large>
                    Cancelar
                </v-btn>
            </div>
            <div v-if="edit">
              <v-row justify="center">
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="error white--text"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                      Borrar dispositivo
                      <v-icon class="ml-2" color="white" size="25px">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text">
                      ¿Está seguro que desea borrar este dispositivo?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="secondary white--text"
                          text
                          @click="dialog = false, deleteDevice"
                      >
                        Si
                      </v-btn>
                      <v-btn
                          color="secondary white--text"
                          text
                          @click="dialog = false"
                      >
                        No
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
            <div>
                <v-btn color="secondary white--text"
                       @click="addDevice"
                       x-large>
                  Aceptar
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";
import EditGrifo from "@/components/EditFaucet";
import EditHorno from "@/components/EditOven";
import EditRefrigerator from "@/components/EditRefrigerator";
import EditSpeaker from "@/components/EditSpeaker";
import EditDoor from "@/components/EditDoor";
// import ColorRoomSelector from "@/components/ColorRoomSelector";

export default {
  name: "EditDeviceView",
  components: {EditSpeaker, EditRefrigerator, EditHorno, EditGrifo, EditDoor},
  props:["idType", "deviceName", "roomId", "device", "image", "edit"],
  data(){
    return({
      nameRules:[
        v => !!v || 'Campo obligatorio',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
        v => this.$devices.find( o => o.name === v && o.id != this.device.id ) == null || 'El nombre ingresado ya existe'
      ],
      dialog: false,
      allDevices: null,
      devName:this.edit ? this.device.name : '',
      myColor: this.edit ? this.device.meta.color : 'primary' ,
      colors: [
        {
          "hex": "#90CAF9",
          "name": "Azul"
        },
        {
          "hex": "#B39DDB",
          "name": "Violeta"
        },
        {
          "hex": "#C5E1A5",
          "name": "Verde"
        },
        {
          "hex": "#FFF59D",
          "name": "Amarillo"
        },
        {
          "hex": "#F8BBD0",
          "name": "Rosa"
        }
      ]
    })
  },
  computed:{
      ...mapState("devices",{
        $devices:"devices"
      }),
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
          } else{
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
      if(this.edit) {
        num = -1;
      }
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
    position: absolute;
    margin-left: 45.5%;
    margin-top: 15px;
  }

  .edit{
    margin: 140px 100px 120px;
    /*margin-top: 140px;*/
    /*margin-bottom: 120px;*/
    /*margin-left: 100px;*/
    /*margin-right: 100px;*/
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

  .image{
    align-self: center;
    justify-content: center;
    justify-self: center;
  }

</style>