<template>
    <div class="container">
        <div class="text">
            <h2>
              <v-btn fab
                     plain
                     @click="goBack"
              >
                <v-icon size="50px" >mdi-arrow-left</v-icon>
              </v-btn>
              Agregar dispositivo en: <span>{{room.name}}</span>
            </h2>
        </div>
        <v-spacer/>
        <v-row class="devices">
            <DeviceCard class="device" idType="rnizejqr2di0okho" deviceName="Heladera" :roomId="room.id"/>
            <DeviceCard class="device" idType="im77xxyulpegfmv8" deviceName="Horno" :roomId="room.id"/>
            <DeviceCard class="device" idType="c89b94e8581855bc" deviceName="Parlante" :roomId="room.id"/>
            <DeviceCard class="device" idType="lsf78ly0eqrjbz91" deviceName="Puerta" :roomId="room.id"/>
            <DeviceCard class="device" idType="go46xmbqeomjrsjr" deviceName="Lámpara" :roomId="room.id"/>
        </v-row>

    </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard";

export default {
  name: "AddDeviceView",
  props: ["room"],
  components: {
    DeviceCard
  },
  data(){
    return {
    }
  },
  methods:{
    goBack(){
      return this.$router.go(-1)
    }
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