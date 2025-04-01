<template>
    <barra-navegacion></barra-navegacion>
    <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; " >
    <ListarEconomato />
    </div>
    </template>
    <script>
      import ListarDevolucionesInforme from '@/components/ListarDevolucionesInforme.vue';
      import ListarEconomato from '@/components/ListarEconomato.vue';
      import BarraNavegacion from '@/components/BarraNavegacion.vue';
      export default {
        components: {
            'barra-navegacion': BarraNavegacion,
            ListarEconomato
      },
    
      }
    </script>