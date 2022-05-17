<template>
 <v-card color="transparent" flat>
        <div>
                <v-card-actions class="cardText pt-0">
                    <v-slider v-model="volume"
                              color="black"
                              track-color="black"
                              track-fill-color="black"
                              always-dirty
                              :min="minVolume"
                              :max="maxVolume"
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
                </v-card-actions>
                <v-card-actions class="cardText">
                    <v-switch v-model="closeOnClick"
                              color="secondary"
                              class="text"
                              hide-details>
                        <template v-slot:label>
                           <span class="switchLabel">Reproducir/Detener</span>
                        </template>
                    </v-switch>
                </v-card-actions>
                <template>
                <v-row
                    align="center"
                    justify="space-around">
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
                </v-row>
                </template>
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
                              label="Genero:"
                              class="genre"
                              color="black"
                              dense
                              return-object
                              persistent-placeholder
                              placeholder="Seleccionar el genero">
                    </v-select>
                </div>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
export default {
name: "Speaker"
}
</script>

<style scoped>

</style>