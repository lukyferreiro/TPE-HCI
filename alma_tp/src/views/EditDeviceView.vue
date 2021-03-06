<template>
    <v-card :color="myColor" class="edit">
            <v-card-title class="titleCard mb-7">
              <p> Editar dispositivo: {{ this.deviceName }} </p>

              <v-spacer/>

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

              <div class="ma-8">
                <v-row justify="center">
                  <v-dialog
                      v-model="dialog"
                      persistent
                      max-width="500"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs"
                             v-on="on"
                             class="optionsButton"
                             color="transparent"
                             depressed
                             v-ripple="false">
                        <v-icon class="mr-2" size="30">mdi-trash-can-outline</v-icon>
                        Eliminar Dispositivo
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
                            @click="deleteDevice"
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
            </v-card-title>

        <v-card-actions class="image">
          <v-img :src="image"
                 :alt="deviceName"
                 max-height="10%"
                 max-width="10%"/>
        </v-card-actions>


      <v-divider/>

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



      <EditDoor v-if="idType === 'lsf78ly0eqrjbz91'" :device="device"/>
      <EditOven v-else-if="idType === 'im77xxyulpegfmv8'" :device="device"/>
      <EditRefrigerator v-else-if="idType === 'rnizejqr2di0okho'" :device="device"/>
      <EditLamp v-else-if="idType === 'go46xmbqeomjrsjr'" :device="device"/>
      <EditSpeaker v-else-if="idType === 'c89b94e8581855bc'" :device="device"/>


        <v-card-actions>
          <v-spacer/>
          <v-btn color="secondary white--text"
                 @click="editDevice"
                 x-large>
              Aceptar
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";

import EditOven from "@/components/EditOven";
import EditDoor from "@/components/EditDoor";
import EditRefrigerator from "@/components/EditRefrigerator";
import EditSpeaker from "@/components/EditSpeaker";
import EditLamp from "@/components/EditLamp";

export default {
  name: "EditDeviceView",
  components: {EditLamp, EditOven, EditDoor, EditRefrigerator, EditSpeaker},
  props:["idType", "deviceName", "roomId", "device", "image"],
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
      devName: this.device.name,
      myColor: this.device.meta.color,
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
      this.$refs.title.reset();
      this.$router.go(-1);
    },
    async editDevice(){
      if(this.$refs.form.validate()) {
        try{
          let device = {
            name: this.devName,
            meta: {
              roomId: this.roomId,
              actions: this.device.actions,
              image: this.image,
              color: this.myColor,
              selected: this.device.meta.selected,
            }
          }
          let idS = [this.device.id , device]
          await this.$editDevice(idS)
          // }
        } catch(e){
          await this.setResult(e.code)
        }
        // this.goBack()
        this.$refs.title.reset();
        this.$router.go(-1);
      }
    },

    submit(e){
      e.preventDefault();
      this.editDevice()
    },
  }
}
</script>

<style scoped>

  .titleCard{
      font-weight: bold;
  }

  .edit{
    margin: 140px 100px 120px;
  }

  .image{
    align-self: center;
    justify-content: center;
    justify-self: center;
  }

  .optionsButton{
    font-size: 20px;
    font-weight: bold;
  }
</style>