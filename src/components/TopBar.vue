<template>
  <div>
    <header>
    <v-app-bar class="toolbar"
               color="primary"
               height="120"
               app
    >
        <v-btn class="d-flex align-center"
               :to="{name:'HomeView'}"
               depressed
               color="transparent"
               plain
        >
            <v-img alt="ALMA logo"
                   :src="require(`@/assets/alma_logo.png`)"
                   width="55"
            />
            <p>ALMA</p>
        </v-btn>

        <v-spacer></v-spacer>

            <v-btn :to="{name:'RoomView'}"
                   class="menu-button"
                   x-large
                   plain
                   retain-focus-on-click
                   v-ripple="false"
            >
                Habitaciones
            </v-btn>

        <v-spacer></v-spacer>
      <v-btn :to="{name:'RoutineView'}"
             class="menu-button"
             x-large
             label
             plain
             retain-focus-on-click
             text
             v-ripple="false"
      >
        Rutinas
      </v-btn>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn fab
                       :to="{name:'HelpView'}"
                       v-on="on"
                        plain
                >
                    <v-icon>mdi-help-circle-outline</v-icon>
                </v-btn>
            </template>
            <span>help</span>
        </v-tooltip>
    </v-app-bar>
    </header>
  </div>
</template>

<script>
export default {
    name: "TopBar"
}
</script>

<style scoped>

    header{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
    }

.menu-button{
  text-transform: none;
   font-size: large !important;
}

.menu-button:hover{
  text-decoration: underline;
}


</style>