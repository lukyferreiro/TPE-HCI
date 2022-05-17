<template>
    <v-card color="transparent" flat>
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
                              @change="setVolume">
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
                          @change="setOnOff()"/>
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
                               @change="previousSong()">
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
        </div>
    </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EditSpeaker",
  props:["device", "edit"],
  data(){
    return({
      closeOnClick: this.edit ? (this.device.state.status==='stopped' ? 'Detenido' : 'Reproduciendo') : 'Detenido',
      showSongInfo: "",
      songTitle: "",
      songArtist: "",
      songAlbum: "",
      songDuration: "",
      songProgress: "",
      // songTitle: this.edit && this.showSongInfo ? this.device.state.song.title : "hola",
      // songArtist: this.edit && this.showSongInfo ? this.device.state.song.artist : "hola",
      // songAlbum: this.edit && this.showSongInfo ? this.device.state.song.album : "hola",
      // songDuration: this.edit && this.showSongInfo ? this.device.state.song.duration : "aa",
      // songProgress: this.edit && this.showSongInfo ? this.device.state.song.progress : "aa",
      play: true,
      volume: this.edit ? (this.device.state.volume) : 5,
      minVolume: 0,
      maxVolume: 10,
      selectedGenre: this.edit ? (this.device.state.genre === 'classical' ? 'Clasica' : (
          this.device.state.genre === 'country' ? 'Country' : (
          this.device.state.genre === 'dance' ? 'Dance' : (
          this.device.state.genre === 'latina' ? 'Latino' : (
          this.device.state.genre === 'rock' ? 'Rock' : 'Pop'))))) : 'Pop',
      genre: ["Clasica", "Country", "Dance", "Latino", "Pop", "Rock"],
    });
  },
  mounted(){
    this.showSongInfo = this.edit ? (this.device.state.status == 'stopped' ? false : true) : false;
    this.songTitle= this.edit && this.showSongInfo ? this.device.state.song.title : "";
    this.songArtist= this.edit && this.showSongInfo ? this.device.state.song.artist : "";
    this.songAlbum= this.edit && this.showSongInfo ? this.device.state.song.album : "";
    this.songDuration= this.edit && this.showSongInfo ? this.device.state.song.duration : "";
    this.songProgress = this.edit && this.showSongInfo ? this.device.state.song.progress : "";
  },
  // async mounted(){
  //   await this.$getAll();
  //   await this.$getDevice(this.device.id);
  // },

  methods: {
    ...mapActions("devices", {
      $getAll: "getAll",
      $getDevice: "getDevice",
      $executeAction: "execute"
    }),

    async execute(actionName){
      let idS = [this.device, actionName];
      await this.$executeAction(idS);
    },

    async setVolume(){
      let idS = [this.device, 'setVolume', [this.volume]];
      await this.$executeAction(idS);
    },

    async decrementVolume () {
      if(this.volume===this.minVolume){
        await this.decrementVolume();
      }
      this.volume--;
      await this.setVolume();
    },

    async incrementVolume () {
      if(this.volume===this.maxVolume){
        await this.incrementVolume();
      }
      this.volume++;
      await this.setVolume();
    },

    setOnOff(){
      if(this.closeOnClick === 'Detenido'){
        this.execute('stop');
      } else{
        this.execute('play');
      }
    },

    async previousSong(){
      let idS = [this.device, 'previousSong'];
      await this.$executeAction(idS);
    },

    setPauseReanude(){
      if(this.play === false){
        this.execute('stop');
      } else{
        this.execute('play');
      }
    },

    async nextSong(){
      let idS = [this.device, 'nextSong'];
      await this.$executeAction(idS);
    },

    playSpeaker(){
      this.play = !this.play;
    },

    async setGenre(){
      let idS = [this.device, 'setGenre']
      if(this.selectedGenre === 'Clasica'){
        idS[2] = ['classical'];
      } else if(this.selectedGenre === 'Country') {
        idS[2] = ['country'];
      } else if(this.selectedGenre === 'Dance') {
        idS[2] = ['dance'];
      } else if(this.selectedGenre === 'Latino') {
        idS[2] = ['latina'];
      } else if(this.selectedGenre === 'Rock') {
        idS[2] = ['rock'];
      } else {
        idS[2] = ['pop'];
      }
      await this.$executeAction(idS)
    },
  }
}
</script>

<style scoped>

    .switcher {
      color: black;
      font-weight: bold;
      padding-bottom: 10px;
    }

    .cardText{
      align-self: center;
      justify-content: center;
      justify-self: center;
    }

    .slider{
      width: 300px;
    }

    .songInformation > p{
      justify-items: center;
      align-items: center;
    }

    .genre{
      width: auto;
      max-width: 180px;
    }

</style>