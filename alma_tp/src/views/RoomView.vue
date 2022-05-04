<template>
    <div class="room">
        <v-dialog scrollable
                  overflow="auto"
                  v-model="dialog"
                  width="1000"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="button2"
                       rounded
                       color="secondary"
                       v-bind="attrs"
                       v-on="on"
                >
                    Agregar habitación
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
      
            <v-card class="popup"
                    color="secondary white--text"
            >
                <v-card-title>
                    <v-icon color="white"> mdi-home-outline </v-icon>
                    Agregar habitación
                    <v-spacer/>
                    <v-btn color="transparent"
                           @click="dialog=false"
                    >
                        <v-icon color="white">mdi-window-close</v-icon>
                    </v-btn>
                </v-card-title>
              
                <v-card-text>
                    <v-container>
                        <v-text-field outlined
                                      ref="title"
                                      v-model="room"
                                      placeholder="Escriba el nombre de la habitación"
                                      counter
                                      clearable
                                      maxlength="50"
                        />
                    </v-container>
                </v-card-text>
        
                <v-divider></v-divider>
        
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="acceptButtom"
                           color="primary black--text"
                           @click="addRoom"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  
        <h3 v-if="roomsAmount==0"> No tienes habitaciones creadas aún. </h3>
        
        <ul v-else>
          <template>
            <v-treeview
                v-model="tree"
                activatable
                :items="rooms"
                :active.sync="active"
                item-key="name"
                open-on-click
            >
              <template v-slot:append="{item}">
                <v-btn class="button"
                       plain
                       rounded
                       fab
                       v-if="item"
                       @click="addDevice(room)"
                >
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>

                <v-btn class="button"
                       plain
                       rounded
                       fab
                       @click="edit=true"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                  <EditView v-if="edit"/>
                </v-btn>

                <v-btn class="button"
                       plain
                       rounded
                       fab
                       @click="editColor(room)"
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
              </template>
            </v-treeview>

          </template>
        </ul>
    </div>
</template>

<script>
// import EditView from "@/views/EditView";
export default {
    name: "RoomView",
    components:{},
    data(){
        return{
            edit:false,
            dialog: false,
            roomsAmount: 0,
            rooms: [],
            room:"",
            click:false,
            tree:[],
            active:[]
        }
    },
    methods: {
      reset(){ 
        this.$refs.title.reset();
      },
      addRoom(){
        if(this.room.length!=0){
          this.roomsAmount++;
          this.rooms.push(
              {name: this.room,
                children: [{name:'device1', file:''}, {name:'device2', file:''}]
              });
        }
        this.dialog=false;
        this.reset();
        console.log('aceptar');
      },
      addDevice(room){
        console.log('add device in ' + room.title)
      },
      editRoom(room){
        // room.title=room2.title;
        this.edit=false;
        console.log('edit room in ' + room.title);
        console.log(room.title);
      },
      editColor(room){
        console.log('edit color in ' + room.title)
      },
      deleteRoom(room){
        this.rooms.splice(this.rooms.indexOf(room), 1)
      }
    }
}
</script>

<style scoped>
  .button{
    margin: 8px;
    width: 20px;
    height:20px
  }
  
  .button2{
    margin: 8px;
  }
  
  .popup{
    background-color: #0F4C75;
  }
  
  .acceptButtom{
    background-color: #B5D9F1;
    color: #000000;
  }
</style>





