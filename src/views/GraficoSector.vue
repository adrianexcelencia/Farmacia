<template>
    <barra-navegacion></barra-navegacion>
    <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; " >
        <v-alert
         shaped
        color="#5f968E"
       rounded="xl"
       theme="dark"
       icon="mdi-domain"
       density="compact"
       elevation="4"
       border="top"
     >
      <b> Grafico sector:  </b> 
  
      Consumo de sectores con mayor consumo de medicamentos
     </v-alert>
       <br>
  <!-- Grafico de Barra  
<BarChart /> -->
    <PieChart /> 
   
    </div>
    </template>
    <script>
     
      import BarraNavegacion from '@/components/BarraNavegacion.vue';
     
      import BarChart from '@/components//BarChart.vue'
    import PieChart from '@/components//PieChart.vue'
      export default {
        components: {
            BarChart,
            PieChart,
            
            'barra-navegacion': BarraNavegacion,
            
      },
    
      }
    </script>