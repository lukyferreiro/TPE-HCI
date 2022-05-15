<template>
    <div>
        <v-card class="device"
                color="primary"
                max-width="200"
                max-height="200"
                :to="{name:'EditDeviceView' , params:{idType: this.idType,
                                                  deviceName: this.deviceName,
                                                  roomId: this.roomId,
                                                  device: this.device,
                                                  image: this.image,
                                                  edit: false,
                                                  }}">
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
        device: null,
      })
    },
    async created() {
      this.device = await this.$getDeviceType(this.idType)
    },
    computed: {
      name() {
        return this.device ? this.device.name : ""
      },
      image() {
        return this.device ? require(`@/assets/${this.name}.png`)  : require(`@/assets/unknown.png`)
      }
    },
   methods:{
        ...mapActions("devicesTypes",{
          $getAllTypes: "getAllTypes",
          $getDeviceType: "getDeviceType",
          $editDeviceType:"editDeviceType"
        }),
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