<template>
    <div>
        <v-card color="primary"
                max-width="200"
                max-height="200"
                @click="addDevice()">

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
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "DeviceCard",
    props:["idType","deviceName", "roomId"],
    data(){
      return({
        deviceType: null,
        myColor: 'primary',
        // myDevice: "",
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

       async setResult(device){
         console.log(device)
       },

       async addDevice(){
           try{
               let device = {
                   type: {
                     id: this.idType,
                   },
                   name: this.deviceName,
                   meta: {
                     roomId: this.roomId,
                     actions: this.deviceType.actions,
                     image: this.image,
                     color: this.myColor,
                     selected: false
                   }
               }
               console.log('add')
               device = await this.$add(device)
               let idS = [this.roomId, device.id]
               device = await this.$addDevice(idS)
           } catch(e){
             await this.setResult(e.code)
           }
         this.$router.go(-1);
       },
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