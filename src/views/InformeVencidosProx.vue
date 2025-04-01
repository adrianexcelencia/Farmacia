<template>
    <barra-navegacion></barra-navegacion>
    <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; " >
    <ListarVencidosProx />
    </div>
    </template>
    <script>
      import ListarVencidosProx from '@/components/ListarVencidosProx.vue';
      import BarraNavegacion from '@/components/BarraNavegacion.vue';
      export default {
        components: {
            'barra-navegacion': BarraNavegacion,
            ListarVencidosProx
      },
    
      }
    </script>