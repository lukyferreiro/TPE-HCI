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
                    hide-details>
            <template v-slot:prepend>
              <v-icon color="black" size="25px"
                      @click="decrementVolume">
                mdi-minus </v-icon>
            </template>
            <template v-slot:append>
              <v-icon color="black" size="25px"
                      @click="incrementVolume">
                mdi-plus</v-icon>
            </template>
          </v-slider>
        </div>
      </v-card-actions>
      <v-card-actions class="cardText">
        <v-switch v-model="closeOnClick"
                  color="secondary"
                  class="switcher"
                  true-value="Reproduciendo"
                  false-value="Detenido"
                  :label="`${closeOnClick}`"
                  inset
                  hide-details
                  />
      </v-card-actions>
      <div v-if="showSongInfo">
        <v-card-actions class="cardText">
          <div class="songInformation">
            <p>{{songTitle}}</p>
            <p>{{songArtist}}</p>
            <p>{{songAlbum}}</p>
            <p>{{songDuration}}</p>
            <p>{{songProgress}}</p>
          </div>
        </v-card-actions>
        <v-row align="center"
               justify="center"
               class="pt-2">
          <v-card-actions class="cardText">
            <v-btn plain
                   fab
                   v-ripple="false"
                   @click="previousSong()">
              <v-icon color="black" size="50px" class="mr-3">mdi-skip-previous-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="cardText">
            <v-btn @click="playSpeaker()"
                   plain
                   fab
                   v-ripple="false"
                   @change="setPauseReanude()">
              <v-icon v-if="play" color="black" size="50px" class="mr-3">mdi-pause-circle-outline</v-icon>
              <v-icon v-else color="black" size="50px" class="mr-3"> mdi-arrow-right-drop-circle-outline </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="cardText">
            <v-btn plain
                   fab
                   v-ripple="false"
                   @change="nextSong()">
              <v-icon color="black" size="50px" class="mr-3">mdi-skip-next-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-row>
      </div>
      <v-card-actions class="cardText">
        <v-btn class="playlist"
               plain
               fab
               v-ripple="false" >
          <v-icon  color="black" size="40px" class="mr-3">mdi-playlist-play</v-icon>
          Playlist
        </v-btn>
      </v-card-actions>
      <v-card-actions class="cardText">
        <div class="genre">
          <v-select v-model="selectedGenre"
                    :items="genre"
                    item-text="genre"
                    class="genre"
                    color="black"
                    dense
                    label="Género"
                    @change="setGenre()"/>
        </div>
      </v-card-actions>

      <div class="acceptAndCancel">
        <div class="justify-end">
          <v-btn color="secondary white--text"
                 @click="setAction"
                 x-large>
            Aceptar
          </v-btn>
        </div>
      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "SpeakerAction",
  props:["myColor", "myactions"],
  data(){
    return({
      closeOnClick: this.device.state.status==='stopped' ? 'Detenido' : 'Reproduciendo',
      showSongInfo: "",
      songTitle: "",
      songArtist: "",
      songAlbum: "",
      songDuration: "",
      songProgress: "",
      play: true,
      volume: 5,
      minVolume: 0,
      maxVolume: 10,
      selectedGenre: 'Pop',
      genre: ["Clasica", "Country", "Dance", "Latino", "Pop", "Rock"],
    })
  },
  methods:{
    setVolume(){
      let action = {
        name: 'setVolume',
        params: [this.volume],
        meta: {}
      }
      this.$emit("setAction", action)
    },
    decrementVolume() {
      if(this.volume!==this.minVolume){
        this.volume--;
      }
    },
    incrementVolume(){
      if(this.volume!==this.maxVolume){
        this.volume++;
      }
    },
    setOnOff(){
      let action = {
        name: 'play',
        params: [],
        meta: {}
      }
      if(this.closeOnClick === 'Detenido'){
        action.name = 'stop'
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