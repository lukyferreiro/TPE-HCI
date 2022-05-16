<template>
    <v-card color="transparent" flat>
        <div>
            <v-card-actions class="cardText pt-4">
                <div class="slider">
                    <v-slider v-model="volume"
                              color="black"
                              track-color="black"
                              track-fill-color="black"
                              always-dirty
                              :min="minVolume"
                              :max="maxVolume"
                              thumb-label="always"
                              thumb-size="25px"
                              hide-details
                          >
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
                          class="text"
                          true-value="Reproducir"
                          false-value="Detener"
                          :label="`${closeOnClick}`"
                          hide-details>

                </v-switch>
            </v-card-actions>
            <v-card-actions class="cardText">
                <v-btn class="pauseAndReanude"
                       @click="playSpeaker()"
                       plain
                       fab
                       v-ripple="false">
                    <v-icon v-if="play" color="black" size="40px" class="mr-3">mdi-pause-circle-outline</v-icon>
                    <v-icon v-else color="black" size="40px" class="mr-3"> mdi-arrow-right-drop-circle-outline </v-icon>
                    Pausar/Reanudar
                </v-btn>
            </v-card-actions>
            <v-card-actions class="cardText">
                <v-btn class="nextSong"
                        plain
                        fab
                        v-ripple="false" >
                    <v-icon color="black" size="40px" class="mr-3">mdi-skip-next-circle-outline</v-icon>
                    Siguiente
                </v-btn>
            </v-card-actions>
            <v-card-actions class="cardText">
                 <v-btn class="backSong"
                        plain
                        fab
                        v-ripple="false" >
                    <v-icon  color="black" size="40px" class="mr-3">mdi-skip-previous-circle-outline</v-icon>
                    Anterior
                </v-btn>
            </v-card-actions>
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
                    <v-select :items="genres"
                              item-text="genre"
                              label="Género:"
                              class="genre"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Seleccionar el género">
                    </v-select>
                </div>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "EditSpeaker",
    props:["colorset"],
    data: () => ({
        closeOnClick: 'Detener',
        play: true,
        volume: 0,
        minVolume: 0,
        maxVolume: 10,
        genres: [
            {genre: "Pop", id: 1},
            {genre: "Trap", id: 2},
        ],
    }),
    methods: {
      decrementVolume () {
        if(this.volume===this.minVolume){
          return;
        }
        this.volume--;
      },
      incrementVolume () {
        if(this.volume===this.maxVolume){
          return;
        }
        this.volume++;
      },
      playSpeaker(){
        this.play = !this.play;
      },
    }
}
</script>

<style scoped>

    .switchLabel {
        color: black;
        font-weight: bold;
      }

    .cardText{
        align-self: center;
        justify-content: center;
        justify-self: center;
    }

    .slider{
      width: 300px;
    }

    .pauseAndReanude{
        color: black;
        font-weight: bold;
        font-size: 15px;
    }

     .genre{
        width: auto;
        max-width: 180px;
    }

</style>