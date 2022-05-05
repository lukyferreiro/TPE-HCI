<template>
    <div>
      <v-card class="device"
              v-on:click="addDevice()"
                rounded
                color="primary"
                max-width="250"
                max-height="250"
        >
          <v-avatar class="image ml-9"
                    rounded
                    size="70%">
            <img :src="require(`@/assets/${device.image}`)"
                 :alt="device.name"
            />
          </v-avatar>
          <v-card-title class="card">
            {{device.name}}
          </v-card-title>
        </v-card>
    </div>
</template>

<script>
import store from "@/store/store";

export default {
    name: "DeviceCard",
    props:["id"],
    computed:{
        device(){
            return store.devices.find(
                device => device.id==this.id
            )
        }
    },
    methods:{
      addDevice(){
        console.log(this.id)
      }
    }
}
</script>

<style scoped>

.card{
  justify-content: center;
}
</style>