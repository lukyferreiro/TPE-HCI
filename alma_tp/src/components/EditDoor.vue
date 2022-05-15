<template>
    <v-card color="transparent" flat>
        <div>
            <v-card-actions class="cardText pt-0">
                <v-switch v-model="closeOnClick"
                          color="secondary"
                          class="text"
                          hide-details>
                    <template v-slot:label>
                        <span class="switchLabel">Abrir/Cerrar</span>
                    </template>
                </v-switch>
            </v-card-actions>
            <v-card-actions class="cardText">
                <v-switch v-model="closeOnClick"
                          color="secondary"
                          class="text"
                          hide-details>
                    <template v-slot:label>
                        <span class="switchLabel">Bloquear/Desbloquear</span>
                    </template>
                </v-switch>
            </v-card-actions>
        </div>
    </v-card>
</template>


<script>
export default {
    name: "EditDoor",
    data: () => ({
      dialog: false,
      closeOnClick: true,
      open: false,
    }),
}
</script>

<style scoped>

    .cardText{
      align-self: center;
      justify-content: center;
      justify-self: center;
    }

    .switchLabel {
        color: black;
        font-weight: bold;
    }

</style>