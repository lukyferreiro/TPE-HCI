<template>
  <v-row>
    <v-col
        cols="11"
        sm="5"
    >
      <v-dialog
          ref="dialog"
          v-model="start"
          :return-value.sync="time"
          persistent
          width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="time"
              label="Tiempo de inicio"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
            v-if="start"
            v-model="time"
            full-width
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="start = false"
          >
            Cancel
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <v-card flat>
        Repetir:
        <v-card-text>
            <v-btn-toggle
                v-model="days"
                multiple
                rounded
            >
              <v-btn>
                D
              </v-btn>
              <v-btn>
                L
              </v-btn>
              <v-btn>
                M
              </v-btn>
              <v-btn>
                X
              </v-btn>
              <v-btn>
                J
              </v-btn>
              <v-btn>
                V
              </v-btn>
              <v-btn>
                S
              </v-btn>
            </v-btn-toggle>
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
export default {
  name: "TimeSelector",
  data () {
    return {
      time:null,
      start: false,
      days:[]
    }
  },
}
</script>

<style scoped>

</style>