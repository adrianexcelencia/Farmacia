<template>

  <barra-navegacion></barra-navegacion>
  <v-dialog
            v-model="MensajeOkCantidad" rounded="xl"
            persistent
            width="950"
  > 

  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
<ListarVencidosProx30 />
<v-btn  prepend-icon="mdi-cancel" color="#FF0000" @click="VerC">   <v-spacer></v-spacer> Cerrar</v-btn>
  </div>
  </v-dialog>
  <!--
Menu nuevo
<v-app-bar>
  Editor de Vue
</v-app-bar>

   
   <v-layout>
   <v-app-bar>
  Editor de Vue
</v-app-bar>
</v-layout>-->


  <v-img
          :src="require('../assets/LogoExc.png')"
          class="my-3"
          contain
          height="330"
          style="z-index: -1;"
          
        ></v-img>
        <br>
       
        <Alerta  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" />
        <div  class="p-3   text-sm " align-center style="max-width: 850px; " >
        <div v-show="isVisibleVer">
         
          <v-card
               
                class="mx-auto"
            
                prepend-icon="mdi-play"
                color ="primary"
              >
                <template v-slot:title>
                 Existen medicamentos que vencen en los proximos 30 dias
                </template>

                <v-card-text>
                  <v-btn  prepend-icon="mdi-file-multiple"  @click="Ver">   <v-spacer></v-spacer> Lista de medicamentos</v-btn>
                </v-card-text>
              </v-card>
            
        </div>
      </div>
          <div v-show="isVisible">
        <div class="row" >
            <div class="col  p-3  ">
             <v-card
                href="/TipoString" 
                class="mx-auto"
            
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de StringType
                </template>

                <v-card-text>
                  Carga de StringType
                </v-card-text>
              </v-card>
              
              </div>
              <div class="col  p-3  ">
               

              <v-card
                href="/TipoInteger" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de IntegerType
                </template>

                <v-card-text>
                  Carga de IntegerType
                </v-card-text>
              </v-card>
                
              </div>
              <div class="col  p-3  ">
                <v-card
                href="/TipoDouble" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de DoubleType
                </template>

                <v-card-text>
                  Carga de IntegerType
                </v-card-text>
              </v-card>
             
                
              </div>
        </div>
      
        <div class="row" >
            <div class="col  p-3  ">
              <v-card
                href="/TipoBoolean" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de BooleanType
                </template>

                <v-card-text>
                  Carga de BooleanType
                </v-card-text>
              </v-card>
              </div>
              <div class="col  p-3  ">
                <v-card
                href="/TipoLabel" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de LabelType
                </template>

                <v-card-text>
                  Carga de LabelType
                </v-card-text>
              </v-card>
              </div>
              <div class="col  p-3  ">
                <v-card
                href="/TipoText" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de TextType
                </template>

                <v-card-text>
                  Carga de TextType
                </v-card-text>
              </v-card>
              </div>
        </div> 
        <div class="row" >
          <div class="col  p-3  ">
                <v-card
                href="/TipoDate" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de DateType
                </template>

                <v-card-text>
                  Carga de DateType
                </v-card-text>
              </v-card>
              </div>
              <div class="col  p-3  ">
                <v-card
                href="/TipoTime" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de TimeType
                </template>

                <v-card-text>
                  Carga de TimeType
                </v-card-text>
              </v-card>
              </div>
              <div class="col  p-3  ">
                <v-card
                href="/TipoDateTime" 
                class="mx-auto"
                
                prepend-icon="mdi-play"
                color ="#003366"
              >
                <template v-slot:title>
                  Carga de DateTimeType
                </template>

                <v-card-text>
                  Carga de DateTimeType
                </v-card-text>
              </v-card>
              </div>

        </div>    
      </div> 
        

      
     
</template>
<script>
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import Alerta from '@/components/Alerta.vue';
import ListarVencidosProx30 from '@/components/ListarVencidosProx30.vue';
import BarChart from '@/components//BarChart.vue'
import PieChart from '@/components//PieChart.vue'
export default{
  components:{
    BarChart,
    PieChart,
    Alerta,
    ListarVencidosProx30,
    'barra-navegacion': BarraNavegacion,
    },
    data() {
    return {
      MensajeOkCantidad: '',
      MensajeOkCantidad: false,
      isVisible: false,
      isVisibleVer: false,
      mostrarAlertaSucesoMensaje: false,
      mensajeAlertaSuceso: "",//mensaje alerta de suceso vacio
      items: [
        { dato1: 'Dato 1', dato2: 'Dato 2', dato3: 'Dato 3' },
        { dato1: 'Dato 4', dato2: 'Dato 5', dato3: 'Dato 6' }
        // Más datos según sea necesario
      ]
    };
  },
  mounted() {
    this.setRoleAttribute();
    this.GenerarInforme();
  },
  created() {
       this.idUsuario = this.$store.state.id_usuario;
   //this.fetchArticulosMed();
 },
  methods: {
    Ver(){
    this.MensajeOkCantidad = true;
  },
  VerC(){
    this.MensajeOkCantidad = false;
  },
    setRoleAttribute() {
      if (this.$refs.table) {
        this.$refs.table.setAttribute('role', 'grid');
      }
    },
    
    async GenerarInforme() {
      
      
       let IdTipo = "";
       const respuesta24 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
       }).then((respuesta24) => {
       let data = []; //declarar la variable data
       this.datos = respuesta24.data.lista
       data = respuesta24.data.lista;

       data.forEach(item => { IdTipo = item.codigo;  }); })
       .catch(err => { console.log(err); });

       ///////////////////////////
       
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarVencidos?pTipo=2&pInstitucion=${IdTipo}&pFechaDesde=0&pFechaHasta=0&pdias=30`)
         .then((respuesta) => { 
          this.rows = respuesta.data.lista; 
          const cantidadRegistros = this.rows.length;
         //alert(cantidadRegistros);
          if (cantidadRegistros > 0) {
          this.isVisibleVer = true;  // Cambia isVisibleVer de forma reactiva
          //alert("Hay registros disponibles");  // Muestra la alerta
        }
      
            

                   
          //this.mensajeAlertaSuceso = "Hay medicamentos que vencen en los proximos 30 dias ";
          //this.mostrarAlertaSucesoMensaje = true;
        })
         .catch(err => { console.log(err);});
    //this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
     },
  }
}

</script>
<!-- Inicializaci�n de DataTables -->

<style>
.background-container {
  /* Establece la imagen de fondo */
  background-image: url('../assets/FondoEditor.jpg'); 
  
  /* Ajusta el tamaño de la imagen de fondo según tus necesidades */
  background-size: 1024px 1024px;
  
  /* Centra la imagen de fondo */
  background-position: center;
  background-repeat: no-repeat;
  /* Establece una altura y anchura mínimas para el contenedor */
  min-height: 100vh; /* Ajusta la altura mínima según tus necesidades */
  min-width: 100%; /* Ajusta la anchura mínima según tus necesidades */
  
  /* Otros estilos de diseño si es necesario */
  color: white; /* Color del texto */
  font-size: 12px; /* Tamaño de fuente del texto */
}

/* Otros estilos de CSS para tu contenido, si es necesario */
</style>
