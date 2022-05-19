<template>
    <div class="help">
        <h1>Habitaciones</h1>
        <h3>Agregar habitaciones</h3>
        <p>En la pestaña habitaciones, clicker el boton "Agregar habitación" en la esquina inferior derecha
          e ingresar el nombre deseado.</p>
        <h3>Personalizar habitaciones.</h3>
        <p>Para cada habitación se puede editar su respectivo nombre, cambiar su color de visualización y/o eliminarla.</p>
        <h3>Agregar dispositivos</h3>
        <p>Con una habitación ya creada, se podra clicker el boton "Agregar dispositivo", elegir el dispositivo a agregar
          y luego configurarlo.</p>

        <v-divider/>
        <v-divider/>
        <v-divider/>
        <v-divider/>

        <h1>Rutinas</h1>
        <h3>Agregar rutinas</h3>
        <p> Previamente se debe contar con al menos una habitación creada y dispositivos vinculados a ella.</p>
        <p> En la pestaña rutinas, clicker el boton "Agregar rutina" en la esquina inferior derecha de la sección. </p>
        <p> Alli se solicitara un nombre para la rutina y seleccionar las habitaciones/dispositivos que manejaran la rutina.</p>
        <p> Editar manualmente los dispositivos seleccionados (en la seccion de Acciones podra observar lo que configuro)</p>
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