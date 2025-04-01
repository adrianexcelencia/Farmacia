<template>
  <v-chip class="d-flex  darken-1 sm "  color="#000000" elevation="1"   >Buscador de Medicamentos en AlfaBeta</v-chip>

<div class="content bg-white">  
     <div class="row shadow p-3" >
            <div class="col-9 text-center ">
              
              <v-text-field  v-model="buscar" label="Busqueda por nombre de medicamento de AlfaBeta" variant="underlined" block></v-text-field>
            </div>
            <div class="col-3 text-left "> 
              <!--
              <v-btn @click="BuscarMedicamento()" class="bg-primary" p prepend-icon="mdi-cloud-upload" block>Buscar en AlfaBeta</v-btn> 
           
            -->
            <v-card
                @click="BuscarMedicamento()" 
                class="mx-auto"
                elevation="10"
                prepend-icon="mdi-cloud-upload" 
                color ="primary"
              >
                <template v-slot:title>
                 Buscar
                </template>

                <v-card-text>
                  Buscar medicamento en AlfaBeta
                </v-card-text>
              </v-card>
            </div>
          </div>
</div>
<div >
  <div class="content" ref="scrollContainer">
    <div class="row mt-5">
      <div class="col-md-4 " v-for="item in ListaFormulariosMed" v-bind:key="item.nroRegistro" > 
        <div class="card mb-4 ">
         <!--Nueva Card-->
         <v-card
                @click="Mostrar(  item.nombre, item.precio, item.nroRegistro, item.presentacion,item.codBarras,item.troquel)" 
                
                elevation="10"
                prepend-icon="mdi-arrow-right" 
                color ="primary"
              >
                <template v-slot:title>
                  {{ item.nombre }}   
              
               
                </template>

                <v-card-text>
                 
                  <div class="col-12 text-left "> {{ item.presentacion }}</div>
                  <div class="col-12 text-left ">Cdo. Barra: {{ item.codBarras }} - Troquel:  {{ item.troquel }}  </div>
                  <div class="col-12 text-left "><strong>Precio: $</strong> {{ item.precio }} </div>
                  
                </v-card-text>
              </v-card>

            <!--FIN Nueva Card-->
          <!-- 
          <div class="card-body"><v-icon start icon="mdi-arrow-right" ></v-icon>
            {{ item.nombre }} -  {{ item.presentacion }}   <br>
            Cdo. Barra: {{ item.codBarras }}   - Troquel:  {{ item.troquel }}    
              <div class="row" >
                <div class="col-6 text-left "><strong>$</strong> {{ item.precio }} </div>
                <div class="col-6 text-center ">
                <v-btn class="bg-primary" fab  @click="Mostrar(  item.nombre, item.precio, item.nroRegistro, item.presentacion,item.codBarras,item.troquel)"  prepend-icon="mdi-open-in-new">Seleccionar</v-btn>
                </div>
          </div>        
       </div>
-->

       </div>
     </div>

</div>
</div>

</div>


</template>
<script>
import AlertaSuceso from "../components/AlertaSuceso.vue";
export default {
name: 'EditarFilaModalN',
components: {
  AlertaSuceso,
},
props: {
  fila: Object,
  campoTexto: String,
},
data() {
  return {
          buscar: '',
          ListaFormulariosMed: null,
      };
  },
  computed: {
  },
  mounted() {
  },
  created() {
     

  },
 methods: {
  Mostrar(V1, V2, V3, V4, V_barra, V_troquel) {
  
    const inputDetalleInternado = document.getElementsByName("nroregistro")[0];
      inputDetalleInternado.value = V3;
      const pPrecio = document.getElementsByName("precio")[0];
      pPrecio.value = V2;
      const pNombre = document.getElementsByName("nombre")[0];
      pNombre.value = V1 +" -  "+ V4;
      const pTroquel = document.getElementsByName("troquel")[0];
      pTroquel.value = V_troquel;
      const codbarra = document.getElementsByName("codbarra")[0];
      codbarra.value = V_barra;
      this.ListaFormulariosMed = null;
    
  },
  async BuscarMedicamento() {
  const respuesta = await this.axios.get(`/api/ConfigForm/BuscaAlfaBetaNombre?pNombre=${this.buscar}`, {
  
})
      .then((respuesta) => {
      this.ListaFormulariosMed = respuesta.data.lista
      this.datosMed = this.ListaFormulariosMed;
      if (this.ListaFormulariosMed.length == 0) {
          //this.NoHayRegistros = true
          alert("No se encontraron datos para la busqueda")
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
},

}
</script>