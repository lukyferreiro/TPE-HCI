<template>
    <div class="home">
        <div>
            <h1>Bienvenidos a ALMA :D-</h1>
        </div>
        <div class="imageDerecha">
          <v-img alt="Imagen de fondo"
                 :src="require(`@/assets/welcomeHome.png`)"
                 max-width="80%"
                 max-height="80%"
          />
        </div>

    </div>
</template>

<script>
export default {
  name: "HomeView"
}
</script>

<style scoped>

  .home{
    margin-top: 120px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .imageDerecha{
    margin-top: 30px;
  }

</style>