<template>
  <div>
    <v-app-bar
        app
        color="light-blue lighten-4"
        height="120"

    >
      <div class="d-flex align-center">
        <v-img
            alt="alma logo"
            src="@/assets/alma_logo.png"
            width="76"
        />
        <p>ALMA</p>

      </div>

      <v-spacer></v-spacer>
      <v-btn rounded >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "TopBar"
}
</script>

<style scoped>

</style>