<template>
      <barra-navegacion></barra-navegacion>
      <v-text-field v-model="adrian" label="Princnipal" variant="underlined" block></v-text-field>

    <economato_ingreso />
    <EditarFilaModalN />
     <!-- Componente que busca medicmanentos de AlfABeta  -->    
     <BuscarMed />
    
    </template>
    <script>
    import BuscarArticulos from '../components/BuscarArticulos.vue';
    import economato_ingreso from '../components/economato_ingreso.vue';
    import EditarFilaModalN from '../components/EditarFilaModalN.vue';
    import BarraNavegacion from '@/components/BarraNavegacion.vue';
    import BuscarMed from '../components/BuscarMed.vue';
    import grilla from '../components/grilla.vue';
    import ListarMed from '../components/ListarMed.vue';
    import AlertaSuceso from '../components/AlertaSuceso.vue';
    import Spinner from '@/components/Spinner.vue';
    export default {
    
       
    name: 'ManagerGrillaView',
    components: {
        
        'barra-navegacion': BarraNavegacion,
        
        BuscarMed,
        ListarMed,
        grilla,
        economato_ingreso,
        EditarFilaModalN,
        BuscarArticulos,
        AlertaSuceso,
        'spinner': Spinner,
    
    },
    data: function () {
 return {
 
   adrian: "",
 
 }
},
    computed: {
    },
    mounted() {
          
         
      },
      created() {
    },
        watch: {
       
      },
      methods: {
    }
    };
    
    </script>