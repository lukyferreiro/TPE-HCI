<template>
    <div class="help">
        <h1>Habitaciones</h1>
        <h3>Agregar habitaciones:</h3>
        <p>En la pestaña habitaciones, haga click en el botón "Agregar habitación" en la esquina inferior derecha
          e ingresar el nombre deseado.</p>
        <h3>Personalizar habitaciones:</h3>
        <p>Para cada habitación se puede editar su respectivo nombre, cambiar su color de visualización y/o eliminarla.</p>
        <h3>Agregar dispositivos:</h3>
        <p>Con una habitación ya creada, haga click en el botón "Agregar dispositivo" y elija el dispositivo a agregar.</p>

        <v-divider/>
        <v-divider/>
        <v-divider/>
        <v-divider/>

        <h1>Rutinas</h1>
        <h3>Agregar rutinas:</h3>
        <p> Previamente se debe contar con al menos una habitación creada y dispositivos vinculados a ella.</p>
        <p> En la pestaña rutinas, haga click en el botón "Agregar rutina" en la esquina inferior derecha de la sección. </p>
        <p> Ingrese un nombre para la rutina y seleccione los dispositivos que participarán en la rutina.</p>
        <p> Edite manualmente los dispositivos seleccionados (en la sección de Acciones podrá observar lo que configuró)</p>
    </div>
</template>

<script>

export default {
  name: "HelpPage",
  components: {
  }

}
</script>

<style scoped>

  .help{
    margin-top: 140px;
    margin-left: 5%;
    margin-right: 5%;
  }

  h1{
    margin-top: 10px;
  }

  h3{
    padding-left: 10px;
    padding-bottom: 10px;
  }

  p{
    padding-left: 15px;
  }

</style>