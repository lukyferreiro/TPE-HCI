<template>
  <div>
    <div class="appBar">
      <v-app-bar class="toolbar"
          color="primary"
          height="120"
          elevate-on-scroll
          scroll-target
      >
        <div class="d-flex align-center">
          <v-img
              alt="ALMA logo"
              :src="require(`@/assets/alma_logo.png`)"
              width="70"
          />
          <p>ALMA</p>

        </div>

        <v-spacer></v-spacer>

        <v-btn :to="{name:'RoomView'}"
              color="transparent">
          Habitaciones
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn :to="{name:'RoutineView'}"
               color="transparent"
        >
          Rutinas
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn fab :to="{name:'HelpView'}">
          <v-icon>mdi-help</v-icon>
        </v-btn>

      </v-app-bar>
    </div>

  </div>

</template>

<script>
export default {
  name: "TopBar"
}
</script>

<style scoped>
</style>