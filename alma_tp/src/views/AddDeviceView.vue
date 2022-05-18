<template>
    <div class="container">
        <div class="text">
            <h2>Agregar dispositivo en: <span>{{room.name}}</span> </h2>
        </div>
        <v-spacer/>
        <v-row class="devices">
            <DeviceCard class="device" idType="rnizejqr2di0okho" deviceName="Heladera" :roomId="room.id"/>
            <DeviceCard class="device" idType="im77xxyulpegfmv8" deviceName="Horno" :roomId="room.id"/>
            <DeviceCard class="device" idType="c89b94e8581855bc" deviceName="Parlante" :roomId="room.id"/>
            <DeviceCard class="device" idType="lsf78ly0eqrjbz91" deviceName="Puerta" :roomId="room.id"/>
            <DeviceCard class="device" idType="go46xmbqeomjrsjr" deviceName="Lámpara" :roomId="room.id"/>

        </v-row>
        <v-card-actions class="backButton mt-5">
            <GoBack name="Volver" color="secondary"/>
        </v-card-actions>
    </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard";
import GoBack from "@/components/GoBack";

export default {
  name: "AddDeviceView",
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
    margin-top: 130px;
    margin-bottom: 50px;
  }

  .text{
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 20px;
    background-color: #0D47A1;
    color: white;
    border-radius: 5px;
    /*text-decoration-line: underline;*/
    /*text-decoration-color: #0D47A1;*/
  }

  span{
    text-decoration-line: underline;
  }

  .device{
    margin: 15px;
  }

  .devices{
    justify-content: space-between;
    justify-self: center;
  }

  .backButton{
    justify-content: center;
  }

</style>