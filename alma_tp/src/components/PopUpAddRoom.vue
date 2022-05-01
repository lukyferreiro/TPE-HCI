<!--Por ahora esto no sirve-->
<template>
     <div class="popup">
        <div class="popup-inner">
            <v-icon> mid-close </v-icon>
            <h4>
                <v-icon> mid-house-line </v-icon> Agregar habitación
             </h4>
             <input type="text" />
             <button class="popup-close"> Aceptar </button>
        </div>
     </div>
</template>


<script>
export default {
    name: "PopUpAddRoom"
}
</script>

<style scoped>
    .popup{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        botton: 0;
        z-index: 99;
        background-color: rgba(0,0,0,0.2);
        
        display: flex;
        align-items: center;
        justify-content: center;

        .popup-inner{
            background-color: #0F4C75;
            padding: 32px;
        }
    }
</style>