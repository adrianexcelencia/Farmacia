<template>
    <barra-navegacion></barra-navegacion>
    
    <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; " >
    <ListarConsumoInforme />
    </div>
    </template>
    <script>
      import ListarDevolucionesInforme from '@/components/ListarDevolucionesInforme.vue';
      import ListarConsumoInforme from '@/components/ListarDeudaGeneral.vue';
      import BarraNavegacion from '@/components/BarraNavegacion.vue';
      export default {
        components: {
            'barra-navegacion': BarraNavegacion,
            ListarConsumoInforme
      },
    
      }
    </script>