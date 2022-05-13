<template>
  <v-dialog scrollable
            overflow="auto"
            v-model="dialog"
            width="1000"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="button"
             rounded
             color="secondary"
             v-bind="attrs"
             v-on="on"
             absolute>
        Editar Horno
      </v-btn>
    </template>

    <v-card color="black--text primary">
      <div>
        <v-card-title class="mx-auto">
          <v-dialog>
            <template v-slot:activator="{on, attrs}">
              <v-btn v-on="on"
                     v-bind = "attrs"
                     color="transparent"
                     depressed
              >
                <v-icon color="black" size="40px">mdi-palette-outline</v-icon>
              </v-btn>
            </template>
            <v-card class="colorpicker">
              <v-color-picker dot-size="3"
                              mode="hexa"
                              swatches-max-height="125"
              />
            </v-card>
          </v-dialog>

          <v-spacer/>
          <h3 class="habitacion"> NOMBRE HABITACION </h3>
          <v-spacer/>

          <v-btn class="pt-0 mt-0"
                 color="transparent"
                 @click="dialog=false"
                 depressed
          >
            <v-icon color="black" size="40px">mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
      </div>

      <div>
        <v-card-actions class="pt-0 mt-0 cardText">
          <v-avatar class="image"
                    rounded
                    size="80px">
            <v-img :src="require(`@/assets/oven.png`)"
                   alt="Horno" />
          </v-avatar>
        </v-card-actions>
        <v-card-actions class="cardText">
          <h2>
            Horno
            <v-btn color="transparent"
                   depressed>
              <v-icon color="black" size="30px">mdi-pencil-outline</v-icon>
            </v-btn>
          </h2>
        </v-card-actions>

        <v-divider/>

        <v-card-actions>
          <v-btn class="acceptButton mx-auto"
                 color="error white--text"
          >
            Borrar dispositivo
            <v-icon class="ml-2" color="white" size="25px">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: "EditHorno",
    data: () => ({
      dialog: false,
      closeOnClick: true,
    }),
}
</script>

<style scoped>

    .cardText{
      align-self: center;
      justify-content: center;
      justify-self: center;
    }

    .colorpicker {
      width: auto;
    }

</style>