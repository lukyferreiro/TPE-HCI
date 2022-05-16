<template>
    <v-card color="transparent" flat>
        <div>
            <v-card-actions class="cardText pt-0">
                <v-switch v-model="closeOnClick"
                          color="secondary"
                          class="text"
                          true-value="Abrir"
                          false-value="Cerrar"
                          :label="`${closeOnClick}`"
                          hide-details>

                </v-switch>
            </v-card-actions>
            <v-card-actions class="cardText">
                <v-switch v-model="blockOnSwitch"
                          color="secondary"
                          class="text"
                          true-value="Desbloquear"
                          false-value="Bloquear"
                          :label="`${blockOnSwitch}`"
                          :disabled="closeOnClick=='Abrir'"
                          hide-details>
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
      closeOnClick: 'Cerrar',
      blockOnSwitch: 'Bloquear',
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