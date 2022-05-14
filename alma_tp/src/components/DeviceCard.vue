<template>
    <div>
        <v-card class="device"
                v-on:click="addDevice()"
                color="primary"
                max-width="200"
                max-height="200" >
            <v-avatar class="image mr-3 ml-7 mt-5"
                      rounded
                      size="70%">
                <v-img :src="require(`@/assets/${myDevice.name}.png`)"
                       :alt="myDevice.name"/>
            </v-avatar>
            <v-card-title class="card">
                {{myDevice.name}}
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "DeviceCard",
    props:["id", "room"],
    data(){
        return({
            myDevice: {}
        })
    },

    async mounted(){
        this.myDevice = await this.setDevice(this.id);
    },

    // computed:{
    //   device: async function () {
    //     const resp = await this.$getDevice(this.id)
    //     console.log(resp)
    //     return resp;
    //   },
    //
    // },
    created:{
      // ...mapState("devicesTypes",{
      //       $devices: "devicesTypes",
      //     }
      // ),
      device: async function () {
        const resp = await this.$getDevice(this.id)
        console.log(resp)
        return resp;
      },
    },

    methods:{
        ...mapActions("devicesTypes",{
          $getAllTypes: "getAllTypes",
          $getDeviceType: "getDeviceType"
        }),

        ...mapActions("devices",{
          $addDevice: "add",
        }),

        async setDevice(id){
          const resp = await this.$getDeviceType(id)
          console.log(resp)
          return resp;
        },

        setResult(device){
           console.log(device)
        },

        async addDevice(){
          try{
            let device = {
              name: this.device.name,
              meta: {
                roomId:this.room.id,
                actions: this.device.actions
              }
            }
            device = await this.$addDevice(device)
            this.setResult(device.id)
          } catch(e){
            this.setResult(e.code)
          }
          this.$router.go(-1);
        },
    },
}
</script>

<style scoped>

    .card{
      justify-content: center;
    }

</style>