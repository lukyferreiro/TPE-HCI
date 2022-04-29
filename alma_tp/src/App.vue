<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>

    <v-app>
      <TopBar/>
      <v-main>
        <HelloWorld/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  components: {TopBar},
}
</script>

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