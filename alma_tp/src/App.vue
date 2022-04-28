<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>

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
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
p {color: black ; font-size: 80px ; margin-left: 10px ; margin-top: 30px}

</style>