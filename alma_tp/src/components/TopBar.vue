<template>
    <div>
        <div class="appBar">
            <v-app-bar class="toolbar"
                       color="primary"
                       height="120"
                       elevate-on-scroll
                       scroll-target
            >
                <div class="d-flex align-center">
                    <v-img alt="ALMA logo"
                          :src="require(`@/assets/alma_logo.png`)"
                          width="70"
                    />
                    <p>ALMA</p>
                </div>
                <v-spacer></v-spacer>

<div flex>
  <v-tabs  background-color="primary" fixed-tabs >
    <v-tab :to="{name:'RoomView'}" >
      Habitaciones
    </v-tab>
    <v-tab :to="{name:'RoutineView'}" >
      Rutinas
    </v-tab>
  </v-tabs>
</div>









<!--                <v-chip :to="{name:'RoomView'}"
                        color="transparent"
                        x-large
                        label
                        display="none"
                        onclick="style.textDecoration='underline'"
                        on="style.textDecoration='none'"
                >
                    Habitaciones
                </v-chip>-->
                <v-spacer></v-spacer>
<!--                <v-chip :to="{name:'RoutineView'}"
                        color="transparent"
                        x-large
                        label
                        onclick="style.textDecoration='underline'"
                >
                    Rutinas
                </v-chip>-->
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
        </div>
    </div>
</template>

<script>
export default {
    name: "TopBar"
}
</script>

<style scoped>
.nav-links{
  display: flex;
}
.link{
  list-style: none;
  text-decoration-color: black;
}

.link:hover{
  text-decoration: underline;
}
</style>