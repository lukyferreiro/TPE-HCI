<template>
    <v-btn @click="goBack"
           :color="color"
    >
      {{ name }}
    </v-btn>
</template>

<script>
export default {
  name: "GoBack",
  props:['name', 'color'],
  methods:{
    goBack(){
      return this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.go-back{
  display: flex;
  cursor: pointer;
}

button{
  border: 0;
}
</style>