<template>
    <div class="help ml-15 mr-15">
        <h2>Habitaciones</h2>
        <h3>Agregar habitaciones</h3>
        <p>Ir a la pestaña de habitaciones y clicker en el boton "Agregar habitación" que se encuentra
          en la esquina inferior derecha de la sección e ingresar el nombre deseado.</p>
        <h3>Personalizar habitaciones.</h3>
        <p>El boton de configuracion de cada habitacion cuenta con las opciones de: editar el nombre de la habitacion,
          cambiar su color y poder eliminar la habitación.</p>
        <h3>Agregar dispositivos</h3>
        <p>Si contamos con una habitacion creada, podremos hacer click en el boton "Agregar dispositivo", donde
          se podra observar un listado de todos los dispositivos soportados por ALMA.</p>

        <h2>Rutinas</h2>
        <h3>Agregar rutinas</h3>
        <p> Para poder crear una nueva rutina, se debe contar con habitaciones y dispositivos previamente creados y vinculados.
          Ir a la pestaña de habitaciones y clicker en el boton "Agregar habitación" que se encuentra en la esquina inferior derecha
          de la sección. Alli se solicitara un nombre para la rutina, un horario de ejecución, los dias que desean ejecutarse,
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