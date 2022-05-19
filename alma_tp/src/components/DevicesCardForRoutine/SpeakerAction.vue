<template>
  <v-card color="transparent" flat >
    <div>
      <v-card-actions class="cardText pt-4">
        <div class="slider">
          <v-slider v-model="volume"
                    color="black"
                    track-color="black"
                    track-fill-color="black"
                    :min="minVolume"
                    :max="maxVolume"
                    thumb-label="always"
                    thumb-size="25px"
                    hide-details
                    prepend-icon="mdi-volume-high"
                    >
          </v-slider>
        </div>
      </v-card-actions>

      <v-row align="center"
             justify="center"
             class="pt-2">
        <v-card-actions class="cardText">
          <v-btn plain
                 fab
                 v-ripple="false"
                 disabled
          >
            <v-icon color="black" size="50px" class="mr-3">mdi-skip-previous-circle-outline</v-icon>

          </v-btn>
        </v-card-actions>
        <v-card-actions class="cardText">
          <v-btn plain
                 fab
                 v-ripple="false"
                 @click="setStop()"
          >
            <v-icon color="black" size="50px" class="mr-3">mdi-stop-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="cardText">
          <v-btn @click="setPlayPause()"
                 plain
                 fab
                 v-ripple="false"
          >
            <v-icon v-if="play" color="black" size="50px" class="mr-3">mdi-pause-circle-outline</v-icon>
            <v-icon v-else color="black" size="50px" class="mr-3"> mdi-arrow-right-drop-circle-outline </v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-actions class="cardText">
          <v-btn plain
                 fab
                 v-ripple="false"
                 disabled>
            <v-icon color="black" size="50px" class="mr-3">mdi-skip-next-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-row>
      <v-card-actions class="cardText pt-7">
        <div class="genre">
          <v-select v-model="selectedGenre"
                    :items="genre"
                    item-text="genre"
                    class="genre"
                    color="black"
                    dense
                    label="Género"
                    @change="showPlaylist=false"/>
        </div>
      </v-card-actions>

      <v-card-actions class="cardText">
        <v-btn class="playlist"
               plain
               fab
               v-ripple="false"
               @click="changeShowPlaylist();"
        >
          <v-icon  color="black" size="40px" class="mr-3">mdi-playlist-play</v-icon>
          Lista de Reproducción
        </v-btn>
      </v-card-actions>
      <v-card-actions  class="cardText" v-if="showPlaylist">
        <h5>Mostrar playlist</h5>
      </v-card-actions>
      <v-card-actions  class="cardText" v-else>
        <h5>No mostrar playlist</h5>
      </v-card-actions>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="secondary white--text"
               @click="setAction"
               x-large>
          Aceptar
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "SpeakerAction",
  props:["myColor", "myactions"],
  data(){
    return({
      songPlaying:null,
      playlist: [],
      myDevice:null,
      showPlaylist: false,
      search: '',
      headers: [
        {
          text: 'Título',
          align: 'start',
          value: 'title',
        },
        {text: 'Artista', value: 'artist'},
        {text: 'Álbum', value: 'album'},
        {text: 'Duración', value: 'duration'},
      ],
      stopButton: false,
      closeOnClick: 'Detenido',
      play: false,
      volume: 5,
      minVolume: 0,
      maxVolume: 10,
      selectedGenre: 'Pop',
      genre: ["Clásica", "Country", "Dance", "Latino", "Pop", "Rock"],
    })
  },
  mounted(){
    this.getSt()
  },
  methods:{
    getSt(){
      this.myactions.forEach(action => {
        if(action.actionName==='getPlaylist'){
          this.playlist = true
        }else if(action.actionName==='setGenre' && action.params[0] === 'country'){
          this.selectedGenre = 'Country'
        }else if(action.actionName==='setGenre' && action.params[0] === 'dance') {
          this.selectedGenre = 'Dance'
        }else if(action.actionName==='setGenre' && action.params[0] === 'latina') {
          this.selectedGenre = 'Latino'
        }else if(action.actionName==='setGenre' && action.params[0] === 'rock'){
          this.selectedGenre = 'Rock'
        }else if(action.actionName==='play'){
          this.stopButton=false
          this.play=true
        }else if(action.actionName==='resume'){
          this.stopButton=false
          this.play = true
        }else if(action.actionName==='pause'){
          this.stopButton=false
          this.play = false
        }else if(action.actionName==='nextSong'){
          this.stopButton=false
          this.play = true
        }else if(action.actionName==='previousSong'){
          this.stopButton=false
          this.play = true
        }else if(action.actionName==='stop'){
          this.stopButton=true
          this.play = false
        }else if(action.actionName==='setVolume'){
          this.volume = action.params[0]
        }
      })
    },

    ...mapActions("devices", {
      $getAll: "getAll",
      $getDevice: "getDevice",
      $executeAction: "execute"
    }),

    async setVolume() {
      let action = {
        name: 'setVolume',
        params: [this.volume],
        meta: {
          spanishName: 'Volumen : ',
          spanishPropName: this.volume
        }
      }
      this.setPlay()
      this.$emit("setAction", action)

    },

    setStop(){
      this.stopButton = true
      this.play = false
    },

    setPlayPause(){
      this.stopButton = false
      this.play = !this.play

    },

    setPlay() {
      let action = {
        name: 'play',
        params: [],
        meta: {
          spanishName: 'Reproducir',
          spanishPropName: ''
        }
      }
      if(this.play === false){
        if(this.stopButton===false){
          action.name = 'pause'
          action.meta.spanishName = 'Pausar'
        }
      }

      if(this.stopButton){
        action.name = 'stop'
        action.meta.spanishName = 'Detener'
        if(this.play){
          action.name = 'resume'
          action.meta.spanishName = 'Reiniciar'
        }
      }

      this.setGenre()
      this.$emit("setAction", action)
    },


    changeShowPlaylist() {
      this.showPlaylist = !this.showPlaylist;
    },



    async setGenre() {
      let action = {
        name: 'setGenre',
        params: ['pop'],
        meta: {
          spanishName: 'Genero : ',
          spanishPropName: this.selectedGenre
        }
      }

      if (this.selectedGenre === 'Clásica') {
        action.params = ['classical']
      } else if (this.selectedGenre === 'Country') {
        action.params = ['country'];
      } else if (this.selectedGenre === 'Dance') {
        action.params = ['dance'];
      } else if (this.selectedGenre === 'Latino') {
        action.params = ['latina'];
      } else if (this.selectedGenre === 'Rock') {
        action.params = ['rock'];
      }

      this.getPlaylist()
      this.$emit("setAction", action)
    },

    async getPlaylist() {
      let action = {
        name: 'getPlaylist',
        params: [],
        meta: {
          spanishName: 'Ver Playlist : ',
          spanishPropName: this.showPlaylist
        }
      }
      this.$emit("setAction", action)
    },


  setAction:function (){
      this.setVolume()
    }

  }
}
</script>

<style scoped>

.cardText{
  align-self: center;
  justify-content: center;
  justify-self: center;
}

.acceptAndCancel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10% 20px;
  /*margin-top: 10px;*/
  /*margin-bottom: 20px;*/
  /*margin-right: 10%;*/
  /*margin-left: 10%;*/
}

.slider{
  width: 300px;
}
</style>