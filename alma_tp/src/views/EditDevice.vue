<template>
    <v-card :color="colorset" class=" edit ">
        <div>
            <v-card-title>
                <!-- <v-icon color="black" size="50px" class="mL-3"> mdi-clipboard-list-outline </v-icon> -->
                Editar Dispositivo : {{ this.deviceName }}
            </v-card-title>

          <v-card-actions class="pt-0 mt-0 cardText">
            <v-avatar class="image"
                      rounded
                      size="80px">
              <v-img :src={image}
                     :alt={deviceName} />
            </v-avatar>
          </v-card-actions>

          <v-form ref="form" lazy-validation @submit="submit">
                <v-container>
                    <v-text-field outlined
                                  ref="title"
                                  v-model="devName"
                                  placeholder="Escriba el nombre del dispositivo"
                                  counter
                                  autofocus
                                  clearable
                                  color="black"
                                  maxlength="60"
                                  :rules="nameRules"
                                  required/>
                </v-container>
            </v-form>
            <div>
                <v-card-title class="mx-auto">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="transparent"
                                   v-bind="attrs"
                                   v-on="on"
                                   depressed
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
                                       @click="colorset=color.hex">
                                    <v-list-item-icon>
                                        <v-icon :color="color.hex"> mdi-square</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>{{ color.name }}</v-list-item-title>
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>
            </div>
        </div>

        <v-divider/>
        <EditDoor v-if="deviceName == 'Puerta'"/>
        <EditGrifo v-else-if="deviceName == 'Grifo'"/>
        <EditHorno v-else-if="deviceName == 'Horno'"/>
        <EditRefrigerator v-else-if="deviceName == 'Heladera'"/>
        <EditSpeaker v-else :colorset="this.colorset"/>
        <v-divider/>

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
import EditGrifo from "@/components/EditGrifo";
import EditHorno from "@/components/EditHorno";
import EditRefrigerator from "@/components/EditRefrigerator";
import EditSpeaker from "@/components/EditSpeaker";

export default {
  name: "EditDevice",
  components: {EditSpeaker, EditRefrigerator, EditHorno, EditGrifo},

  props:["id", "deviceName", "device", "roomId", "image"],
  data(){
    return({
      nameRules:[
        v => !!v || 'Campo Obligatorio',
        v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres',
        v => /^([A-Za-z0-9_ ]*$)/.test(v) || 'Caracter inválido',
      ],
      devName:"",
      colorset: "primary",
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
  methods:{

    ...mapActions("devices",{
      $add: "add",
    }),
    ...mapActions("room",{
      $addDevice: "addDevice",
      $editDevice: "editDevice"
    }),

    async setResult(device){
      console.log(device)
    },

    async addDevice(){
      try{
        let device = {
          type:{
            id: this.device.id,
          },
          name: this.devName,
          meta: {
            roomId:this.roomId,
            actions: this.device.actions
          }
        }
        device = await this.$add(device)
        let idS = [this.roomId, device.id]
        device = await this.$addDevice(idS)
        await this.setResult(idS[1])
      } catch(e){
        await this.setResult(e.code)
      }
      this.goBack()
    },
    goBack(){
      this.reset();
      this.$router.go(-2);
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