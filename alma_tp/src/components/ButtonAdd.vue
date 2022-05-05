<template>

  <v-btn class="button"
            rounded
            color="secondary"
            >
            {{content}}

                <v-icon>mdi-plus</v-icon>
            </v-btn>

</template>

<script>
export default {
name: "ButtonAdd",
props: ["content"]
}
</script>

<style scoped>
.button{
  margin: 8px;
}
</style>