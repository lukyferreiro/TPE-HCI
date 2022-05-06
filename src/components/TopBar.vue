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
               exact-active-class-path="aa"
        >
            <v-img alt="ALMA logo"
                   :src="require(`@/assets/alma_logo.png`)"
                   width="55"
            />
            <p>ALMA</p>
        </v-btn>

        <v-spacer></v-spacer>

<!--        <div flex>
            <v-tabs  background-color="primary" fixed-tabs >
                <v-tab :to="{name:'RoomView'}" >
                    Habitaciones
                </v-tab>
                <v-tab :to="{name:'RoutineView'}" >
                    Rutinas
                </v-tab>
            </v-tabs>
        </div>-->

            <v-btn :to="{name:'RoomView'}" exact
                   class="menu-button"
                   exact-active-class="active"
                    x-large
                   plain
                   retain-focus-on-click
                   text
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
<!--            <v-chip :to="{name:'RoutineView'}"-->
<!--                    color="transparent"-->
<!--                    x-large-->
<!--                    label-->
<!--                    onclick="style.textDecoration='underline'"-->
<!--            >-->
<!--                Rutinas-->
<!--            </v-chip>-->

        <v-spacer></v-spacer>

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn fab :to="{name:'HelpView'}" v-on="on">
                    <v-icon>mdi-help</v-icon>
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
        position: fixed dense;
        left: 0;
        top: 0;
        right: 0;
    }

.menu-button{
  text-transform: none;
}

.menu-button:hover{
  text-decoration: underline;
}

.menu-button:active{
  text-decoration: underline;
}




</style>