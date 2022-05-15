<template>
    <div class="container">
        <h2>Agregar dispositivo en: {{room.name}} </h2>
        <v-spacer/>
        <v-row class="devices">
            <DeviceCard class="device" id="dbrlsh7o5sn8ur4i" deviceName="Grifo" :roomId="room.id"/>
            <DeviceCard class="device" id="im77xxyulpegfmv8" deviceName="Horno" :roomId="room.id"/>
            <DeviceCard class="device" id="lsf78ly0eqrjbz91" deviceName="Puerta" :roomId="room.id"/>
            <DeviceCard class="device" id="c89b94e8581855bc" deviceName="Parlante" :roomId="room.id"/>
            <DeviceCard class="device" id="rnizejqr2di0okho" deviceName="Heladera" :roomId="room.id"/>
        </v-row>
      <GoBack name="Aceptar" color="secondary"/>

    </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard";
import GoBack from "@/components/GoBack";

export default {
  name: "AddDevice",
  props: ["room"],
  components: {
    GoBack,
    DeviceCard
  },
  data(){
    return {
    }
  },
  methods:{

  }
}
</script>

<style scoped>

  .container{
    margin-top: 120px;
  }

  .device{
    margin: 15px;
  }

  .devices{
    justify-content: space-between;
    justify-self: center;
  }

</style>