<template>
    <barra-navegacion></barra-navegacion>
    <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; " >
    <ListarVencidos />
    </div>
    </template>
    <script>
      import ListarVencidos from '@/components/ListarVencidos.vue';
      import BarraNavegacion from '@/components/BarraNavegacion.vue';
      export default {
        components: {
            'barra-navegacion': BarraNavegacion,
            ListarVencidos
      },
    
      }
    </script>