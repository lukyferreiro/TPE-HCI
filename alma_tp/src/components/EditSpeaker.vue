<template>
    <v-card color="transparent" flat @load="reRender">
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
<!--            <v-card-actions class="cardText">-->
<!--                <v-switch v-model="closeOnClick"-->
<!--                          color="secondary"-->
<!--                          class="switcher"-->
<!--                          true-value="Reproduciendo"-->
<!--                          false-value="Detenido"-->
<!--                          :label="`${closeOnClick}`"-->
<!--                          inset-->
<!--                          hide-details-->
<!--                          @change="setOnOff()"/>-->
<!--            </v-card-actions>-->
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
                               v-ripple="false">
                            <v-icon v-if="play" color="black" size="50px" class="mr-3">mdi-pause-circle-outline</v-icon>
                            <v-icon v-else color="black" size="50px" class="mr-3"> mdi-arrow-right-drop-circle-outline </v-icon>
                        </v-btn>
                    </v-card-actions>
                  <v-card-actions class="cardText">
                    <v-btn @click="stopSpeaker()"
                           plain
                           fab
                           v-ripple="false">
                      <v-icon color="black" size="50px" class="mr-3">mdi-stop-circle-outline</v-icon>
                    </v-btn>
                  </v-card-actions>
                    <v-card-actions class="cardText">
                        <v-btn plain
                               fab
                               v-ripple="false"
                               @click="nextSong()">
                            <v-icon color="black" size="50px" class="mr-3">mdi-skip-next-circle-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-row>
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
    props:["device"],
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
        volume: this.device.state.volume,
        minVolume: 0,
        maxVolume: 10,
        selectedGenre: this.device.state.genre === 'classical' ? 'Clasica' : (
            this.device.state.genre === 'country' ? 'Country' : (
            this.device.state.genre === 'dance' ? 'Dance' : (
            this.device.state.genre === 'latina' ? 'Latino' : (
            this.device.state.genre === 'rock' ? 'Rock' : 'Pop')))),
        genre: ["Clasica", "Country", "Dance", "Latino", "Pop", "Rock"],
      });
    },

    mounted(){

      this.$getDevice(this.device.id);
        this.showSongInfo = this.device.state.status == 'stopped' ? false : true;
        this.songTitle = this.showSongInfo ? this.device.state.song.title : "";
        this.songArtist = this.showSongInfo ? this.device.state.song.artist : "";
        this.songAlbum = this.showSongInfo ? this.device.state.song.album : "";
        this.songDuration = this.showSongInfo ? this.device.state.song.duration : "";
        this.songProgress = this.showSongInfo ? this.device.state.song.progress : "";
    },

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
          if(this.volume!==this.minVolume){
            this.volume--;
          }
          await this.setVolume();
        },

        async incrementVolume () {
          if(this.volume!==this.maxVolume){
            this.volume++;
          }
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

        // setPauseReanude(){
        //   if(this.play === false){
        //     this.execute('stop');
        //   } else{
        //     this.execute('play');
        //   }
        // },

        async nextSong(){
          let idS = [this.device, 'nextSong'];
          await this.$executeAction(idS);
        },

        stopSpeaker(){
          this.play = false
          this.closeOnClick = false
          this.execute('stop');
          this.execute('play');

        },

        playSpeaker(){
          this.play = !this.play;
          if(this.play){
            this.execute('play');
          }else{
            this.execute('stop');
          }
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