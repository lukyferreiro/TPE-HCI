<template>
    <div class="container">
        <GoBack name="Volver"/>
        <h2>Agregar dispositivo en: {{room.name}} </h2>
        <v-spacer/>
        <v-row class="devices">
            <!-- GRIFO -->
            <DeviceCard class="device" id="dbrlsh7o5sn8ur4i" :room="room"/>
<!--            &lt;!&ndash; HORNO &ndash;&gt;-->
<!--            <DeviceCard class="device" id="im77xxyulpegfmv8" :room="room"/>-->
<!--            &lt;!&ndash; PUERTA&ndash;&gt;-->
<!--            <DeviceCard class="device" id="lsf78ly0eqrjbz91" :room="room"/>-->
<!--            &lt;!&ndash; ASPIRADORA &ndash;&gt;-->
<!--            <DeviceCard class="device" id="ofglvd9gqx8yfl3l" :room="room"/>-->
<!--            &lt;!&ndash; HELADERA &ndash;&gt;-->
<!--            <DeviceCard class="device" id="rnizejqr2di0okho" :room="room"/>-->
        </v-row>
    </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard";
import GoBack from "@/components/GoBack";

export default {
  name: "AddDevice",
  components: {
    GoBack,
    DeviceCard
  },
  data(){
    return {
      room:this.$route.params.room
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