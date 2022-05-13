<template>
    <v-footer color="grey lighten-3"
              padless
              outlined
              app
              class="mt-3" >
        <v-card-text class="flex text-center text">
            <v-icon size="22" color="black"> mdi-copyright </v-icon>
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

  .text{
    font-weight: bold;
    font-size: 15px;
  }

</style>