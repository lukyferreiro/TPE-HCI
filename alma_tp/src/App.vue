<template>
  <v-app>
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

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
p {color: black ; font-size: 80px ; margin-left: 10px ; margin-top: 30px}
</style>