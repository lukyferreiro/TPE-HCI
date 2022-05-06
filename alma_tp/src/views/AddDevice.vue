<template>
  <div>
      <h3>Agregar dispositivo en: </h3>
      <h1>{{room.name}}</h1>
    <v-spacer/>
    <v-row class="devices">
      <DeviceCard class="device" id="1"/>
      <DeviceCard class="device" id="2"/>
      <DeviceCard class="device" id="3"/>
      <DeviceCard class="device" id="4"/>
      <DeviceCard class="device" id="5"/>
    </v-row>


  </div>
</template>

<script>
import store from '@/store/store'
import DeviceCard from "@/components/DeviceCard";

export default {
  name: "AddDevice",
  components: {
    DeviceCard
  },
  data(){
    return {
      devices: store.devices,
      room:this.$route.params.room
    }
  },
  methods:{
    addDevice(id){
      console.log(id);
    }
  }
}
</script>

<style scoped>
.device{
  margin: 15px;
}
.devices{
  justify-content: space-between;
  justify-self: center;
}
</style>