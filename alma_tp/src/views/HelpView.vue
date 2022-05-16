<template>
    <div class="help ml-15 mr-15">
        <h1>Habitaciones</h1>
        <h3>Agregar habitaciones</h3>
        <p>En la pestaña habitaciones, clicker el boton "Agregar habitación" en la esquina inferior derecha
          e ingresar el nombre deseado.</p>
        <h3>Personalizar habitaciones.</h3>
        <p>Para cada habitación se puede editar su respectivo nombre, cambiar su color de visualización y/o eliminarla.</p>
        <h3>Agregar dispositivos</h3>
        <p>Con una habitación ya creada, se podra clicker el boton "Agregar dispositivo", elegir el dispositivo a agregar
          y luego configurarlo.</p>

        <h1>Rutinas</h1>
        <h3>Agregar rutinas</h3>
        <p> Previamente se debe contar con al menos una habitación creada y dispositivos vinculados a ella.
          En la pestaña rutinas, clicker el boton "Agregar rutina" en la esquina inferior derecha de la sección.
          Alli se solicitara un nombre para la rutina, un horario de ejecución, los dias que desean ejecutarse,
          y seleccionar las habitaciones/dispositivos que manejaran la rutina.</p>
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
  }

</style>