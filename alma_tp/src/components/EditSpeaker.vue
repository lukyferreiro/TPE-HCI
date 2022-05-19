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
                              prepend-icon="mdi-volume-high"
                              @change="setVolume">
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
                               @click="previousSong()"
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
                        <v-btn @click="setPauseReanude()"
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
                               @click="nextSong()">
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
                        @change="setGenre(); showPlaylist=false;"/>
            </div>
          </v-card-actions>

          <v-card-actions class="cardText">
            <v-btn class="playlist"
                   plain
                   fab
                   v-ripple="false"
                   @click="getPlaylist(); changeShowPlaylist();"
            >
              <v-icon  color="black" size="40px" class="mr-3">mdi-playlist-play</v-icon>
              Lista de Reproducción
            </v-btn>
          </v-card-actions>
          <v-card-actions  class="cardText" v-if="showPlaylist">
            <template>
              <v-card>
                <v-card-title>
                  Lista de Reproducción
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar"
                      single-line
                      hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="playlist"
                    :search="search"
                    hide-default-footer
                ></v-data-table>
              </v-card>
            </template>
          </v-card-actions>

        </div>
    </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "EditSpeaker",
  props: ["device"],
  data() {
    return ({
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
      stopButton: this.device.state.status === 'stopped',
      closeOnClick: this.device.state.status === 'stopped' ? 'Detenido' : 'Reproduciendo',
      play: this.device.state.status==='playing',
      volume: this.device.state.volume,
      minVolume: 0,
      maxVolume: 10,
      selectedGenre: this.device.state.genre === 'classical' ? 'Clásica' : (
          this.device.state.genre === 'country' ? 'Country' : (
              this.device.state.genre === 'dance' ? 'Dance' : (
                  this.device.state.genre === 'latina' ? 'Latino' : (
                      this.device.state.genre === 'rock' ? 'Rock' : 'Pop')))),
      genre: ["Clásica", "Country", "Dance", "Latino", "Pop", "Rock"],
    });
  },
  methods: {
    ...mapActions("devices", {
      $getAll: "getAll",
      $getDevice: "getDevice",
      $executeAction: "execute"
    }),


    async execute(actionName) {
      let idS = [this.device, actionName];
      await this.$executeAction(idS);
    },

    async setVolume() {
      let idS = [this.device, 'setVolume', [this.volume]];
      await this.$executeAction(idS);
    },

    setStop() {
        this.execute('stop');
        this.stopButton = true
      this.play = false
    },


    async previousSong() {
      if (this.stopButton == true) {
        this.stopButton = false
        await this.execute('play')
      } else if (this.play == false) {
        await this.execute('resume')
      }
      this.play=true
      await this.execute('previousSong')
    },


     setPauseReanude() {
      if(this.stopButton === true){
        this.execute('play')
        this.stopButton=false
      }else {
        if (this.play === true) {
          this.execute('pause');
        } else {
          this.execute('resume');
        }
      }
       this.play = !this.play
     },

    async nextSong() {
      if (this.stopButton == true) {
        this.stopButton = false
        await this.execute('play')
      } else if (this.play == false) {
        await this.execute('resume')
      }
      this.play=true
      await this.execute('nextSong')
    },

    changeShowPlaylist() {
      this.showPlaylist = !this.showPlaylist;
    },



    async setGenre() {
      let idS = [this.device, 'setGenre', []]
      if (this.selectedGenre === 'Clásica') {
        idS[2] = ['classical'];
      } else if (this.selectedGenre === 'Country') {
        idS[2] = ['country'];
      } else if (this.selectedGenre === 'Dance') {
        idS[2] = ['dance'];
      } else if (this.selectedGenre === 'Latino') {
        idS[2] = ['latina'];
      } else if (this.selectedGenre === 'Rock') {
        idS[2] = ['rock'];
      } else {
        idS[2] = ['pop'];
      }
      await this.$executeAction(idS)

    },

    async getPlaylist() {
      let idS = [this.device, 'getPlaylist']
      this.playlist = await this.$executeAction(idS)
    },

  }
}
</script>

<style scoped>

    .cardText{
      align-self: center;
      justify-content: center;
      justify-self: center;
    }

    .slider{
      width: 300px;
    }

    .genre{
      width: auto;
      max-width: 180px;
    }

</style>