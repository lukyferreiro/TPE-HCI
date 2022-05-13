<template>
    <v-footer color="grey lighten-3"
              absolute
              app
              padless
              outlined
              height="auto"
              fixed>
        <v-card-text  tile class="flex text-center">
            <v-icon class="copyrightIcon" color="black"> mdi-copyright </v-icon>
            {{new Date().getFullYear()}} ALMA - Todos los derechos reservados.
        </v-card-text>
    </v-footer>
</template>

<script>
export default {
    name: "FooterBar"
}
</script>

<style scoped>

</style>