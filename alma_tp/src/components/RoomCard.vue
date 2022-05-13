<template>
    <v-row class="bar">
        <v-col>
            <v-expansion-panels class="expansion"
                                flat
                                popout>
                <v-expansion-panel>
                    <v-expansion-panel-header>{{this.room.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content v-for="device in room.devices" :key="device">
                        <v-btn plain>
                            {{device.name}}
                        </v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>

        <v-col cols="12" md="6">
            <v-menu v-model="menu"
                    :close-on-content-click="false"
                    offset-x
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :to="{name:'AddDevice', params:{room: room} }"
                           text>
                        Agregar dispositivo
                        <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                   <v-btn fab
                          plain
                          v-bind="attrs"
                          v-on="on"
                          @click="showRoom"
                   >
                      <v-icon>mdi-dots-vertical</v-icon>
                   </v-btn>
                </template>
                <v-list class="menu"
                        v-if="room.show"
                        v-click-outside="showFalse"
                >
                    <v-list-item>
                        <v-list-item-action class="flex">
                            <v-btn class="button"
                                   plain
                                   rounded
                                   fab
                                   @click="edit=true"
                            >
                                Editar
                                <v-icon>mdi-pencil-outline</v-icon>
                                <EditView v-if="edit"/>
                            </v-btn>
                            <v-btn class="button"
                                   plain
                                   rounded
                                   fab
                                   @click="editColor() "
                            >
                                Editar Color
                                <v-icon>mdi-palette-outline</v-icon>
                            </v-btn>

                            <v-btn class="button"
                                   plain
                                   rounded
                                   fab
                                   @click="deleteRoom()"
                            >
                                Borrar
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
import EditView from "@/components/EditView";
import store from "@/store";

export default {
    name: "RoomCard",
    components:{
      EditView
    },
    props: ["room"],
    data(){
        return{
            edit:false,
            menu: false,
        }
    },
    methods: {
        // addDevice(){
        //     console.log('add device in ' + this.room.name)
        // },
        editRoom(room2){
            this.edit=false;
            console.log('edit room to ' + room2.name);
        },
        editColor(){
            console.log('edit color in ' + this.room.name)
        },
        deleteRoom(){
            store.commit("deleteRoom", this.room)
        },
        showRoom(){
          store.commit("showRoom", this.room);
        },
        showFalse(){
          store.commit("showFalse", this.room)
        }
    }
}
</script>

<style scoped>

    .menu{
      width: 150px;
    }

    .button{
        text-transform:none;
    }

</style>