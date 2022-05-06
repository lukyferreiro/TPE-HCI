<template>
    <v-row>
        <v-col>
          <v-expansion-panels class="expansion"
                              flat
                              popout
          >
              <v-expansion-panel>
                <v-expansion-panel-header>{{room.name}}</v-expansion-panel-header>
                <v-expansion-panel-content v-for="device in room.devices" :key="device">
                    {{device.name}}
                </v-expansion-panel-content>
              </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <v-col cols="12" md="6">
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-btn :to="{name:'AddDevice', params:{room: room} }"
                  text
                  @click="addRoom"
              >
                Agregar dispositivo
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
              <v-btn fab
                     plain
                     v-bind="attrs"
                     v-on="on"
                     @click="room.show= !room.show"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list v-if="room.show">
              <v-list-item>
                <v-list-item-action>
                  <v-btn class="button"
                         plain
                         rounded
                         fab
                         @click="edit=true"
                  >
                    <v-icon>mdi-pencil-outline</v-icon>
                    <EditView c v-if="edit"/>
                  </v-btn>
                  <v-btn class="button"
                         plain
                         rounded
                         fab
                         @click="editColor(room) "
                  >
                    <v-icon>mdi-palette-outline</v-icon>
                  </v-btn>

                  <v-btn class="button"
                         plain
                         rounded
                         fab
                         @click="deleteRoom(room)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "RoomCard",
    props: ['room'],
    data(){
        return{
            menu: false,
        }
    },
    methods: {
        addDevice(room){
            this.room.show=false
            console.log('add device in ' + room.name)
        },
        editRoom(room2){
            this.edit=false;
            console.log('edit room in ' + room2.name);
        },
        editColor(room){
            console.log('edit color in ' + room.name)
        },
        deleteRoom(room){
            this.rooms.splice(this.rooms.indexOf(room), 1);
            this.roomsAmount--;
        }
    }
}
</script>

<style scoped>

</style>