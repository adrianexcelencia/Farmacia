<template>
   <v-dialog
            v-model="MensajeOkCantidad" rounded="xl"
            persistent
            width="750"
  > 
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
<ListarVencidosProx30 />
hola
  </div>
  
  </v-dialog>
    <v-alert v-if="visible"
         text
         
        type="warning"
        
       >
       {{ mensaje }}
       <v-btn  prepend-icon="mdi-cancel" color="#FF0000" @click="Ver">   <v-spacer></v-spacer> Listar</v-btn>
       </v-alert>
   
       
     </template>
     
     <script>
     import ListarVencidosProx30 from './ListarVencidosProx30.vue';

     export default {
       props: {
        ListarVencidosProx30,
         visible: Boolean,
         mensaje: String,
        
       }, 
       data: function () {
        return {
          MensajeOkCantidad: '',
          MensajeOkCantidad: false,
        }
      },
      created() {
       





},
methods: {
  Ver(){
    this.MensajeOkCantidad = true;
  },
},
     };
     </script>
     