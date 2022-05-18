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

</style>