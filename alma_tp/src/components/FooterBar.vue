<template>
    <v-footer color="grey lighten-3"
              padless
              outlined
              class="mt-3 footer" >
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

  .footer{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
  }

</style>