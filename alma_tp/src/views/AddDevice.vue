<template>
  <h3>Agregar dispositivo en {{this.$props.name}}</h3>
<!--    <v-dialog scrollable-->
<!--              overflow="auto"-->
<!--              v-model="dialog"-->
<!--              width="1000"-->
<!--    >-->
<!--        <v-card class="popup"-->
<!--                color="secondary white&#45;&#45;text"-->
<!--        >-->
<!--            <v-card-title>-->
<!--                Agregar dispositivo en ...........-->
<!--                <v-spacer/>-->
<!--                <v-btn color="transparent"-->
<!--                       @click="dialog=false"-->
<!--                >-->
<!--                    <v-icon color="white">mdi-window-close</v-icon>-->
<!--                </v-btn>-->
<!--            </v-card-title>-->

<!--            <v-card-actions>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn class="acceptButtom"-->
<!--                       color="primary black&#45;&#45;text"-->
<!--                       @click="editRoom(room2)"-->
<!--                >-->
<!--                    Aceptar-->
<!--                </v-btn>-->
<!--            </v-card-actions>-->
<!--        </v-card>-->
<!--    </v-dialog>-->
</template>

<script>
export default {
  name: "addDevice",
  props:"room"
}
</script>

<style scoped>

</style>