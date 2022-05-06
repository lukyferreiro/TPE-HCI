<template>
<div>
  <h1>Not Found</h1>
  <p>Oops que couldn't find that page. Try going to
    <router-link :to="{name:'/'}">home
    </router-link>
  </p>
</div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

</style>