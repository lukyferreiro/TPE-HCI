<template>
    <div>
        <v-card class="device"
                v-on:click="addDevice()"
                color="primary"
                max-width="200"
                max-height="200" >
            <v-avatar class="image mr-3 ml-7 mt-5 "
                      rounded
                      size="70%">
                <img :src="require(`@/assets/${device.image}`)"
                     :alt="device.name"/>
            </v-avatar>
            <v-card-title class="card">
                {{device.name}}
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
import devices from "@/store/devices";
import store from "@/store/index";
// import devices from "@/store/devices";

export default {
    name: "DeviceCard",
    props:["id", "room"],
    computed:{
      devices(){
        return devices.devices
      },
      device(){
            return this.devices.find(
                device => device.id==this.id
            )
      },
    },
  methods:{
        addDevice(){
          store.commit("addDevice", [this.room, this.device])
          this.$router.go(-1);
        }
    }
}
</script>

<style scoped>

.card{
  justify-content: center;
}
</style>