<template>
    <v-dialog scrollable
              overflow="auto"
              v-model="dialog"
              width="1000"
    >
        <v-card class="popup"
                color="secondary white--text"
        >
            <v-card-title>
                Agregar dispositivo en ...........
                <v-spacer/>
                <v-btn color="transparent"
                       @click="dialog=false"
                >
                    <v-icon color="white">mdi-window-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="acceptButtom"
                       color="primary black--text"
                       @click="editRoom(room2)"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "addDevice"
}
</script>

<style scoped>

</style>