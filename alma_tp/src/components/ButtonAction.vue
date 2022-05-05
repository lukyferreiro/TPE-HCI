<template>
  <div>
    <v-btn class="button"
           rounded
           plain
           fab

    >
      {{content}}

      <v-icon>{{icon}}</v-icon>
    </v-btn>

  </div>
</template>

<script>
export default {
  name: "ButtonAction",
  props: ["content", "icon"]

}
</script>

<style scoped>
.button{
  margin: 8px;
  width: 20px;
  height:20px;
}

</style>