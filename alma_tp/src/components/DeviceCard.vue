  <template>
      <div>
            <v-card class="device"
                    :to="{name:'EditDevice' , params:{id: this.id,
                                                      deviceName: this.deviceName,
                                                      device: this.device,
                                                      roomId: this.roomId,
                                                      edit: false
                                                      }}"
                    color="primary"
                    max-width="250"
                    max-height="250" >
              <v-avatar rounded
                        size="70%">
                <v-img class="image"
                       :src="image"
                       :alt="name"/>
              </v-avatar>
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
    props:["id","deviceName", "roomId"],
    data(){
      return({
        device: null,
      })
    },
    async created() {
      this.device = await this.$getDeviceType(this.id)
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

    }

    .image{
      justify-content: center;
    }

</style>