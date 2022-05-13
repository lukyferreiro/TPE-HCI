<template>
    <div id="app">
        <v-app>
            <TopBar />
            <router-view :key="$route.path"/>
            <FooterBar/>
        </v-app>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import FooterBar from "@/components/FooterBar";

export default {
  components: {
    TopBar,
    FooterBar
  },
}
</script>

<style lang="scss">

//nav {
//  padding: 30px;
//
//  a {
//    font-weight: bold;
//    color: #2c3e50;
//
//    &.router-link-exact-active {
//      color: #42b983;
//    }
//  }
//}
//
//  p {
//    color: black;
//    font-size: 80px;
//    margin-left: 10px;
//    margin-top: 30px
//  }

</style>