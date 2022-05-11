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
            format="24hs"
            @input="changeTime()"
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
              @change="changeDays"
          >
            <div v-for="day in weekDays"
                 :key="day.slug">
              <DayButton :day=day.slug></DayButton>
            </div>
          </v-btn-toggle>
        </v-card-text>
      </v-card>

    </v-col>

  </v-row>

</template>

<script>
import DayButton from "@/components/DayButton";
import days from "@/store/days";
export default {
  name: "TimeSelector",
  props:["mydays", "mytime"],
  components: {
    DayButton
  },

  data () {
    const date = new Date();
    return {
      time: date.getHours() + ":" + date.getMinutes(),
      start: false,
      days: []
    }
  },
  computed:{
    weekDays(){
      return days.days
    },
  },
  methods:{
    changeTime:function(){
      this.$emit("changeTime", this.time)
    },
    changeDays:function(){
      this.$emit("changeDays", this.days)
    }
  }
}
</script>

<style scoped>

</style>