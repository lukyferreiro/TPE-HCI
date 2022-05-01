<template>
  <div class="footer">
    <footer>
      <v-icon class="copyrightIcon"> mdi-copyright </v-icon>
      {{new Date().getFullYear()}} ALMA - Todos los derechos reservados.
    </footer>
  </div>
</template>

<script>
export default {
    name: "FooterBar"
}
</script>

<style scoped>

    footer{
        padding: 30px 30px 0;
        text-align: center;
    }
    .copyrightIcon{
        width: 25px
    }
</style>