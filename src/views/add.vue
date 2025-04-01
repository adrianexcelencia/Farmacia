<template >
  <barra-navegacion></barra-navegacion>
  <v-dialog
             v-model="VentanaIndicaciones"
             persistent
             width="1350"
               rounded="xl"
       theme="dark"
       
   > 
   <v-card rounded="xl" class="bg-blue p-2">
   <div  class="shadow p-3  bg-white text-sm text-left" align-center style="max-width: 100%; " >
   <ListarIndicaciones :remitoValue="nroremitoPasado" @llamar-mostrar-datos="llamarMetodoMostrarDatos"  /> 
   <div class="row">
    <div class="col  p-3 text-center ">
     
    </div>
         <div class="col  p-3 text-center ">
          <v-btn @click="CerrarOkI()"  color="success"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn> 
         </div>
   </div>                
  </div>
   </v-card>
   </v-dialog>
  <!--EMpieza mensaje de cantidad de medicamtno-->
  <v-dialog
            v-model="MensajeOkCantidad" rounded="xl"
            persistent
            width="750"
  > 
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <v-row justify="center" align="center" class="my-container">
    <v-col cols="auto">
     
    </v-col>
  </v-row> 
  <v-row justify="center" align="center" class="my-container">
    <div class="col-md-3 p-3" >
      <v-icon color="orange darken-2" size="80">
        mdi-alert
      </v-icon>
      
    </div>
    <div class="col-md-9 p-3" >
      La cantidad ingresada es mayor al stock del medicamento, ingrese la cantidad disponible. En caso de que se nececite una cantidad mayor realice una nueva carga del medicamento 
    </div>
  </v-row> 
  <v-row justify="center" align="center" class="my-container">
    <div class="col-md-9 p-3" ></div>
    <div class="col-md-3 p-3" >
      <v-btn @click="CerrarOkCantidad()"  color="success"  x-small  prepend-icon="mdi-close-box" block>Aceptar</v-btn>
    </div>
  </v-row>
                
  </div>
  <br>
  </v-dialog>
  <!--Fin control-->
  <v-dialog
  rounded="xl"
            v-model="MensajeOk"
            persistent
            width="450"
  > 
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <v-row justify="center" align="center" class="my-container">
    <v-col cols="auto">
      <v-icon color="green darken-2" size="80">
        mdi-checkbox-marked-circle-outline
      </v-icon>
    </v-col>
  </v-row> 
          <v-btn @click="CerrarOk()"  color="success"  x-small  prepend-icon="mdi-close-box" block>Aceptar</v-btn>      
  </div>
  </v-dialog>
  <v-dialog

            v-model="Ventanainternados"
             rounded="xl"
            width="950"
  >
  <v-card rounded="xl">
  <div class="row bg-white" >
         
         <div class="col-12" >
            <ListadoInter @valor-nombre="actualizarNombre" @valor-codigo="actualizarcodigo" />
         </div>
  </div>       
</v-card>
    </v-dialog>
  
  <v-dialog
  rounded="xl"
          v-model="VentanaGrabar"
          persistent
          width="500"
> 
<v-alert
rounded="xl"
        shaped
      color="#FF0000"
      theme="dark"
      icon="mdi-alert"
      density="compact"
      elevation="4"
      border="top"
    >
    Debe ingresar un dato
<!-- Alerta de confirmación personalizada -->
    <div v-if="mostrarAlertaGrabar"  role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
              <use xlink:href="#info-fill" />
          </svg>
          <div>
              <div class="row">
                 
        <div class="col  p-3 text-center ">
        <v-btn  prepend-icon="mdi-cancel" color="#FF0000" @click="cerrarGrabar">   <v-spacer></v-spacer> Cerrar</v-btn>
      </div>
      </div>
          </div>
      </div>
      
      <!--fin alerta confirmacion obtenerValores-->
  </v-alert>
  </v-dialog>
<div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; margin: 0 auto;">  
  
<v-alert
shaped
        color="blue-grey"
        rounded="xl"
       theme="dark"
       icon="mdi-domain"
       density="compact"
       elevation="4"
       border="top"
   >
    <b> Consumo:  </b> 

    Carga de consumo de pacientes
   </v-alert>
   <br>
 <spinner :visible="MostrarSpinner"></spinner>
 <div v-if="!MostrarSpinner">
   <div >
     
     <v-card   rounded="xl" >
      <div class="row  p-3 "  >
       
       <div class="col-2" >
         <v-text-field @keyup.enter="handleEnter" ref="cantidadField" v-model="Numero" label="Ingrese numero" variant="underlined" block></v-text-field>
       </div>
       <div class="col-1 "> 
             <v-btn @click="VerDatosAfi()" color="primary" rounded="xl" prepend-icon="mdi-magnify" block></v-btn>  
       </div>
       <div class="col-8" >
         <v-text-field  v-model="VerDatosText" label="Datos" variant="underlined" block></v-text-field>
       </div>
       
     </div>
 <v-text-field  v-model="NComprobante" v-show="mostrarCampo"  label="Nro Comprobante" variant="underlined" block></v-text-field>
     <div class="row p-3" >
       
      


          <div class="col-4 p-3" >
 
 <v-card
   @click="AgregarMed()" 
   rounded="xl"
   class="mx-auto"
   elevation="2"
   prepend-icon="mdi-arrow-up-bold-box-outline" 
   color ="primary"
 >
   <template v-slot:title>
     Agregar medicamentos
   </template>

    <v-card-text>
     Carga de consumo de medicamentos
   </v-card-text>
 </v-card>            
</div>

<div class="col-4 p-3">
              <v-card
                @click="Limpiar()" 
                rounded="xl"
                class="mx-auto"
                elevation="2"
                prepend-icon="mdi-open-in-new" 
                color ="primary"
              >
                <template v-slot:title>
                  Nuevo
                </template>

                <v-card-text>
                  Cargar nuevo consumo
                </v-card-text>
              </v-card> 

       </div>
       <div class="col-4 p-3" >
        <v-card
                @click="VerIndicaciones()" 
                rounded="xl"
                class="mx-auto"
                elevation="2"
                prepend-icon="mdi-open-in-new" 
                color ="primary"
              >
                <template v-slot:title>
                  Indicaciones Medicas
                </template>

                <v-card-text>
                  Listado
                </v-card-text>
              </v-card> 
      </div>


       </div>
       <br> 
    </v-card>
     <!--nueva prueba-->
      
 </div>


 <br>   
 
 <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>

     
 <div class="shadow p-3  bg-light text-sm " style="max-width: 1350px; ">
    
<div class="row">

<ListarMed :remitoValue="nroremitoPasado" ref="listado"  /> 
   



</div>


       
       
 
     
<v-dialog
 v-model="dialog"
 persistent
 fullscreen
>

<v-card>
  <div class="row " >
    <div class="col-12" >
       <!-- Buscador-->
      
 
 <!--Empieza Buscador-->

<div >
<div class="content" ref="scrollContainer"> 
  <div class="row " >
    <div class="col-6" >
      <v-alert
          shaped
          rounded="xl"
        color="white"
        theme="dark"
        icon="mdi-arrow-right-bold-circle"
        density="compact"
        elevation="4"
        border="top"
      >
          Selecciona un sector
          <select v-model="ValorCombo" class="form-select" id="Combo"   >
            <option value="0" >Seleccionar un sector...</option> 
            <option v-for="Combo in ListaCombos" :key="Combo.codigo"  :value="Combo.codigo"  >{{Combo.codigo}} -- {{Combo.nombre}}</option>
          </select>  
     </v-alert>

    </div>
    <div class="col-6" >
      <v-text-field v-model="searchQuery" label="Buscador " append-inner-icon="mdi-magnify" variant="underlined" ></v-text-field>
  </div>
  </div>
 
<table class="table table-striped bg-white text-left"  style="font-size: 14px; color: #000000;" >
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
            <td v-for="(header, colIndex) in headers" :key="colIndex">
              <v-chip class="d-flex   darken-1 sm bg-primary" style="font-size: 14px; color: #000000;"    elevation="3"   > 
              {{ row[header] }}
            </v-chip>
            </td>
            <td>
            <v-btn @click="sendRowData(row)" class="bg-primary" ><v-icon dark>
        mdi-plus
      </v-icon></v-btn>
          </td>
          </tr>
          
        </tbody>
      </table>


</div>

</div>

 <!--Fin de Buscador-->
      </div>
      
    <div class="col-6" v-show="mostrarCampo" >
      <!--/////////////////////////////////////////////-->
       <!--Listado de Practicas cargadas-->
       <!--///////////////////////////////////////////-->
        Listado de Practicas
        
        <br>
        <table :value="customers" class="table justify-center  darken-1 "  style="font-size: 14px; color: #000000;"  >
          <thead>
            <tr>
              <th ><v-chip class="justify-center ">Identificador</v-chip></th>
            
              <th ><v-chip class="justify-center " style="font-size: 10px; " >fecha</v-chip></th>
              <th ><v-chip class="justify-center " style="font-size: 10px; " >codigo</v-chip></th> 
              <th ><v-chip class="justify-center " style="font-size: 10px; " >nombre</v-chip></th>
              <th ><v-chip class="justify-center " style="font-size: 10px; " >cantidad</v-chip></th>
              <th ><v-chip class="justify-center " style="font-size: 10px; " >editar</v-chip></th>
              <!--   <th ><v-chip class="justify-center ">eliminar</v-chip></th> -->
              
            </tr>
          </thead>
          <tbody v-for="Listaform of rows1" :key="Listaform.codigo">
            <tr>
              
              <td class="bg-white " >
                
                  <v-icon start icon="mdi-arrow-right" ></v-icon>  {{ Listaform.consumoid }}
             
            </td>
          
           <td class="bg-white ">
                
                <b> {{ Listaform.fecha }}</b>
      
               </td> 
            <td class="bg-white ">
                
                <b> {{ Listaform.codigoarticulo }}</b>
      
               </td> 
              <td class="bg-white ">
                
               <b> {{ Listaform.nomarticulo }}</b>
     
              </td>
              <td class="bg-white ">
                
                <b> {{ Listaform.cantidad }}</b>
      
               </td>
              
             
              <td class="nowrap bg-white " >
                <div class="row">
                  <div class="col-auto">
                     <v-btn @click="editar(Listaform)" color="primary" prepend-icon="mdi-check-all" class="sm"></v-btn>
                  </div>
                
                </div>
              </td>
              <!-- 
              <td class="nowrap bg-white " >
                <div class="row">
                  <div class="col-auto">
                     <v-btn @click="EliminarCampo(Listaform)" color="#FF0000" prepend-icon="mdi-trash-can-outline" class="sm"></v-btn>
                  </div>
                
                </div>
              </td> -->
            </tr>
         
         
          </tbody>
       
          
        </table>  


       <!--//////////////////////////////////////////-->
       <!--////////////////////////////////////////////////-->
       
    </div>
  </div>    

  

<div class="content"> 
<div class="row " >
  <div class="col-2" >
         <v-text-field v-model="Identificado" v-show="mostrarCampo"  label="Identificador" variant="underlined" block></v-text-field>
         <label for="fecha">Fecha:</label><br>
         <input type="date" id="fecha" v-model="Fecha" name="fecha">
        </div>
       <div class="col-2" >
         <v-text-field @keyup.enter="BuscarCodigo" v-model="MediCodigo" label="Codigo" variant="underlined" block></v-text-field>
       </div>
       <div class="col-4" >
         <v-text-field v-model="MediNOmbre" label="MedPresentacion" variant="underlined" block></v-text-field>
       </div>
       <div class="col-1" >
         <v-text-field v-model="MediPrecio" label="MedPrecio" variant="underlined" block></v-text-field>
       </div>
       <div class="col-1" >
         <v-text-field v-model="MediFecVen" label="MediFecVen" variant="underlined" block></v-text-field>
       </div>
       <div class="col-1" >
         <v-text-field v-model="MediLote" label="MediLote" variant="underlined" block></v-text-field>
       </div>
       <div class="col-1" >
         <v-text-field v-model="MediStock" label="MediStock" variant="underlined" block></v-text-field>
       </div>
       </div>
       </div>
       <div class="content"> 
<div class="row" >
           <div class="col-6 text-center ">
             
             <v-text-field  v-model="dosis" label="Dosis" variant="underlined" block></v-text-field>
           </div>
         
           <div class="col-1 text-center "> 
             <v-text-field  v-model="MedCantidad" @keyup.enter="Grabar" label="Cantidad"  variant="underlined" block></v-text-field>
             <v-text-field  v-model="articulosid" v-show="mostrarCampo" label="Id"  variant="underlined" block></v-text-field>
             
           </div>
           <div class="col-4 text-center "> 
            <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
           </div>
           
         </div>
         </div>
<!--Termina Buscador-->
<v-card-actions>
         <v-spacer></v-spacer>
         
         <v-btn
           color="blue-darken-1"
           variant="text"
           @click="Grabar()"
           
         >
           Grabar Medicamento
         </v-btn>
         <v-btn
           color="blue-darken-1"
           variant="text"
           @click="cerrarventana()"
           prepend-icon="mdi-close" 
         >
           Cerrar
         </v-btn>
       
       </v-card-actions>
</v-card>

</v-dialog>

 
<!-- Nueva tabla-->
<!-- Caja de texto y boton para buscar -->
<!-- Botonoes y caja de texto para buscar -->



</div>


</div>

</div>
<v-dialog
rounded="xl"
            v-model="MensajeAlerta"
            persistent
            width="1150"
  > 
  
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <AlertaMedicamento  :remitoValue="nroremitoPasado" />
    <div class="row bg-white">
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <v-btn @click="CerrarOk()"  color="success"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn> 
      </div>
    </div>
       
  </div>
  </v-dialog>
  <v-text-field v-show="mostrarCampo" v-model="Institucion" variant="underlined" block></v-text-field>
</template>
<script>

//import datos from "../assets/json/pokemones.json";
import ejemplo from '../components/ejemplo.vue';
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import Spinner from '@/components/Spinner.vue';
import AlertaSuceso from '@/components/AlertaSuceso.vue';
import AlertaMensaje from '@/components/AlertaMensaje.vue';
import EditarFilaModal from '../components/EditarFilaModalN.vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import DataTablesCore from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import ListarMed from '../components/ListarMed.vue';
import ListadoInter from '../components/ListadoInter.vue';
import AlertaMedicamento from '@/components/AlertaMedicamento.vue';
import ListarDevolucion from '../components/ListarDevolucion.vue';
import ListarIndicaciones from '@/components/ListarIndicaciones.vue';



import { ref } from 'vue';
import EditarFilaModalN from '../components/EditarFilaModalN.vue';

DataTable.use(DataTablesCore);
DataTable.use(DataTablesCore);
DataTable.use(Select);

const table = ref();
export default {
props:[],
     selected: [],
arreglobuscador: [],
name: 'TableCom',
name: "Formularios",
components: {
 'spinner': Spinner,
 'barra-navegacion': BarraNavegacion,
 EditarFilaModalN,
 ejemplo,
 ListarMed,
 AlertaMensaje,
 ListadoInter,
 ListarDevolucion,
 AlertaMedicamento,
 ListarIndicaciones,
 'alerta-suceso': AlertaSuceso,
  DataTable
},


data: function () {
 return {
 //-----------------------------
 //-----------------------------
 VentanaIndicaciones: false,
 MensajeOk: false,
 MensajeOkCantidad: false,
   MediFecVen: '',
   MediLote: '',
   MediStock: '',
   MensajeAlerta: false,
   searchQuery: '',
   nroremitoPasado: '',
   articulosid:'',
   currentPage: 1,
   itemsPerPage: 5,
   VerDatosText: '',
   ValorCombo: '',
   ValorCombo1: '',
   mostrarCampo: false,
   mensajeAlertaSuceso: "",//mensaje alerta de suceso vacio
   VentanaGrabar: false,
   docentes: [], // <-- La lista de docentes
   ListObraSocial:[],
   Institucion: '',
   codigo:'',
   nombre:'',
   valor:'',
   buscar: '',
   MediCodigo: '',
   MediNOmbre: '',
   MediPrecio: '',
   Identificado: '',
   arreglobuscador: [],
   ListaArticulosCodigo: [],
   dialog: false,  
   selectedId: -1,
   rows1: [],
   selectedRow: '',
   lengthRules: [
   value => {
       if (  /[0-9-]+/.test(value) && value?.length > 5) return true
         return 'Acepta valores numericos y mas de 5 digitos.'
     },
   ],
    //************ */
     

   titulo_Modal:"",
   Id: null, 
   datos: null,
   ListaCombos: null,
   ListaCombosOrigen: null,
   Ventanainternados: false,
   ListaFormularios: null,
   MostrarSpinner: false,
   NoHayRegistros: false,
   mostrarAlertaEliminar: false,
   mostrarAlertaSuceso: false,
   mostrarAlertaSucesoMensaje: false,
   mensajeAlertaSuceso:"",
   idConfigFormToDelete: null,
   Fecha:"",
   MedCantidad:"",
   ValorComboOrigen:"",
   Entrega:0,
   
 }
},
created() {
  this.idUsuario = this.$store.state.id_usuario;
  this.TraeInstitucin();
 this.SelectedObraSocial();
 this.MostrarCombo();
 this.MostrarComboOrigen();
 this.ValorCombo = "0";
 this.BuscarMedicamento();
 this.fetchArticulosMed();
 this.NComprobante = "0";
 
 //this.ListarConsumo();
 //this.Fecha = "01/01/1900";
 
 
},
computed: {
        
//--------------------------
//--------------------------
headers() {
        return this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
      },
filteredRows() {
        if (!this.searchQuery) {
          return this.rows;
        }
        const query = this.searchQuery.toLowerCase();
        return this.rows.filter(row => 
          Object.values(row).some(value => 
            String(value).toLowerCase().includes(query)
          )
        );
      },
     
      paginatedRows() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredRows.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredRows.length / this.itemsPerPage);
      },

//--------------------------
//--------------------------
         formTitle () {
            return this.Entrega  === 0 ? 'Gargar nuevos datos' : 'Modificar datos'
         },
     //*********************** */
         ListaFormularios1() {              
           return this.datos && this.datos.filter(item => {
           return item.nombre.toLowerCase().includes(this.buscar.toLowerCase());  
         });
         },
         //********************* */

       



         //******************* */
      
     },
methods: {
 
  llamarMetodoMostrarDatos() {
   
      // Usar una referencia para acceder al método del componente hijo ListarMed
      //this.$refs.ListarMed.MostrarDatos();
      this.$refs.listado.MostrarDatos();
    },
  
  CerrarOkI(){
        this.VentanaIndicaciones = false;
        
      },

  VerIndicaciones(){
      this.nroremitoPasado = this.Numero;
      //alert("VEr Ventana");
      this.VentanaIndicaciones = true;
      
    },
  
    async EliminarCampo(row) {
      //alert("estoy");
     const keys = Object.keys(row);
     //alert(keys[0]); Nombre de la columna
     const entries = Object.entries(row);
     const primerpar = entries[0];  // Valor de la columna
     this.id =  primerpar[1];
   
     //Eliminar
     await this.axios.put(`/api/ConfigForm/EliminaCampos/15/${this.id}`)
   
      .then(datos => {
        //this.mostrarAlertaEliminar = false;
        //this.mensajeAlertaSuceso = "Eliminado exitosamente";
        //this.mostrarAlertaSuceso = true;
      
        //this.VentanaGrabar = true;
        //   this.mostrarAlertaGrabar = true;
           this.ListarConsumo();
        //setTimeout(() => {
         //        this.mostrarAlertaSuceso = false;
           //   }, 5000);
              
      });
   
     
   },
 
  async ListarConsumo() {
       
       //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
       
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumo?pTipo=${this.idUsuario}`)
         .then((respuesta) => {
           //this.ListaFormulariosArticulos = respuesta.data.lista
           this.rows1 = respuesta.data.lista;
              
         })
         .catch(err => {
           //console.log(err);
         });
     // this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
     },
     prevPage() {
       if (this.currentPage > 1) {
         this.currentPage--;
       }
     },
 
  CerrarOkCantidad(){
    this.MensajeOkCantidad = false;
  },
  CerrarOk(){
    this.MensajeAlerta = false;
    this.MensajeOk = false;
    
  },
  CerrarOkMen(){
    this.MensajeOk = false;
    
  },
  cerrarventana(){
    this.MensajeAlerta = false;
    this.$refs.listado.MostrarDatos();
  },
  Limpiar(){
    this.Numero= "";
    this.VerDatosText= "";
    this.ValorCombo = "0";
  },

//--------------------------
//--------------------------
async BuscarCodigo(){
  this.nroremitoPasado = this.MediCodigo;
  this.MediCodigo = this.MediCodigo.toString().padStart(6, '0');
  this.MediNOmbre = "";
  this.MediPrecio = "";
  const respuesta = await this.axios.get(`/api/ConfigForm/BuscarArticulosCodigo?pTipo=${this.idUsuario}&pCodigo=${this.MediCodigo}`)
  
          .then((respuesta) => {
            this.ListaArticulosCodigo = respuesta.data.lista
             
            this.ListaArticulosCodigo.forEach(ListaArticulosCodigo => {
            this.MediNOmbre = ListaArticulosCodigo.nombre;
            this.MediPrecio = ListaArticulosCodigo.precio;
            this.articulosid  = ListaArticulosCodigo.articulosid;
            if(ListaArticulosCodigo.relacion == "1")
              this.MensajeAlerta = true;
            
          }); 
          })
          .catch(err => {
            //console.log(err);
          });
          ////Muestra Fecha de Vencimiento y Lote del medicamento seleccionado////////
      this.MediFecVen = "01-01-1900";
      this.MediLote = "-";
      this.MediStock = "0";
      const respuestaLista = await this.axios.get(`/api/ConfigForm/ListaStockPorArticulos?pInstitucion=${this.Institucion}&pCodigo=${this.articulosid}&pSector=${this.ValorCombo}`)
  
  .then((respuestaLista) => {
    
    this.ListaArticulosCodigoLista = respuestaLista.data.lista
    this.ListaArticulosCodigoLista.forEach(ListaArticulosCodigoLista => {
      this.MediFecVen = ListaArticulosCodigoLista.fecven.slice(0, 10);
      this.MediLote = ListaArticulosCodigoLista.lote;
      this.MediStock = ListaArticulosCodigoLista.stock_restante;
           // Divide la fecha en día, mes y año
           const [day, month, year] = this.MediFecVen.split('/');

// Asegura que el día y el mes tengan dos dígitos
const paddedDay = day.padStart(2, '0');
const paddedMonth = month.padStart(2, '0');


// Retorna la fecha formateada
this.MediFecVen = `${paddedDay}/${paddedMonth}/${year}`;  
this.MediFecVen = this.MediFecVen.slice(0, 10)  


      
                
  }

); 
  })
  .catch(err => {
    //console.log(err);
  });
          ///////////////////////
},
actualizarNombre(valor) {
      this.VerDatosText = valor;
      this.nroremitoPasado = this.nroremito;

    },
    actualizarcodigo(valor) {
      this.Numero = valor;
      this.Ventanainternados = false;
      this.nroremitoPasado = this.Numero;
      //alert(this.nroremitoPasado);
    },
nextPage() {
   if (this.currentPage < this.totalPages) {
     this.currentPage++;
   }
 },
 prevPage() {
   if (this.currentPage > 1) {
     this.currentPage--;
   }
 },
//--------------------------
//--------------------------
 
 onSelect(e, dt, type, indexes ){
   //var rowData = dt.rows( indexes ).data().toArray();
   this.string_id = indexes;
   this.dialog = true;
   console.log("aca estoy")
       console.log(dt);
     },
     async sendRowData(row) {
      
      const keys = Object.keys(row);
      const entries = Object.entries(row);
      const artid = entries[0];  // Valor de la columna
      const primerpar = entries[1];  // Valor de la columna
      const nombre = entries[2];  // Valor de la columna
      const precio = entries[3];  // Valor de la columna
      //console.log('Dato de la fila seleccionada:', primerpar[1]);
      this.MediCodigo = primerpar[1];
      this.MediNOmbre =nombre[1];
      this.MediPrecio = precio[1];
      //this.MediPrecio = "0";
      this.articulosid = artid[1];
      /////////
      this.nroremitoPasado = this.MediCodigo;
      const respuesta = await this.axios.get(`/api/ConfigForm/BuscarArticulosCodigo?pTipo=${this.idUsuario}&pCodigo=${this.MediCodigo}`)
  
          .then((respuesta) => {
            
            this.ListaArticulosCodigo = respuesta.data.lista
            this.ListaArticulosCodigo.forEach(ListaArticulosCodigo => {
            
            if(ListaArticulosCodigo.relacion == "1")
              this.MensajeAlerta = true;
            
          }); 
          })
          .catch(err => {
            //console.log(err);
          });
      /////////
      ////Muestra Fecha de Vencimiento y Lote del medicamento seleccionado////////
      //this.Fecha = "01-01-1900";
      this.MediFecVen = "01-01-1900";
      this.MediLote = "-";
      this.MediStock = "0";
      //alert(this.Institucion);
      //alert(this.articulosid);
      //alert(this.ValorCombo);
      const respuestaLista = await this.axios.get(`/api/ConfigForm/ListaStockPorArticulos?pInstitucion=${this.Institucion}&pCodigo=${this.articulosid}&pSector=${this.ValorCombo}`)
  
          .then((respuestaLista) => {
            
            this.ListaArticulosCodigoLista = respuestaLista.data.lista
            this.ListaArticulosCodigoLista.forEach(ListaArticulosCodigoLista => {
              this.MediFecVen = ListaArticulosCodigoLista.fecven.slice(0, 10);
              this.MediLote = ListaArticulosCodigoLista.lote;
              this.MediStock = ListaArticulosCodigoLista.stock_restante;
              
                 // Divide la fecha en día, mes y año
              const [day, month, year] = this.MediFecVen.split('/');

              // Asegura que el día y el mes tengan dos dígitos
              const paddedDay = day.padStart(2, '0');
              const paddedMonth = month.padStart(2, '0');


              // Retorna la fecha formateada
              this.MediFecVen = `${paddedDay}/${paddedMonth}/${year}`;  

              this.MediFecVen = this.MediFecVen.slice(0, 10)     
             // alert(this.MediFecVen);
          }
        
        ); 
          })
          .catch(err => {
            //console.log(err);
          });
          ///////////////////////
      
    },
    async   TraeInstitucin(){
    
    let IdTipo = "";
const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
}).then((respuesta) => {
let data = []; //declarar la variable data
this.datos = respuesta.data.lista
data = respuesta.data.lista;
data.forEach(item => { this.Institucion = item.codigo;  }); })
  .catch(err => { console.log(err); });
  },
     Mostrar(V1, V2, V3){
     
       this.MediCodigo = V1;
       this.MediNOmbre =V2;
       this.MediPrecio = V3;
       
     },
 limpiar(){
   this.string_id = "";
   this.default_value ="";
   this.value_list ="";
 },
 async fetchArticulosMed() {
        
        //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
        //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
        const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idUsuario}`)
          .then((respuesta) => {
            //this.ListaFormulariosArticulos = respuesta.data.lista
            this.rows = respuesta.data.lista;
            console.log("IMPORTANTE Muestro rows ADRIAN")
            console.table(this.rows);     
          })
          .catch(err => {
            //console.log(err);
          });
      // this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
      },
 nuevo(){
   this.Entrega = 0;
   this.dialog = true;
   this.string_id = "";
   this.default_value ="";
   this.value_list ="";
 },
 cerrarventana(){
   this.dialog = false;
   //window.location.reload();
   this.nroremitoPasado = this.Numero;
   this.$refs.listado.MostrarDatos();
   
   
   
 },
 cerrarGrabar() {
          this.VentanaGrabar = false;
      },
 AgregarMed(){
  //this.Fecha = "01-01-2024";
 
  if (!this.Numero || this.Numero.length == 0) {
    this.$refs.cantidadField.$el.querySelector('input').focus();
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un numero internacion";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
     //this.ListaFormularios = null;
     this.dialog = true;
     this.MediCodigo = "";
     this.MediNOmbre = "";
     this.MediPrecio = "";
     this.MediFecVen = "";
     this.MediLote = "";
     this.MediStock = "";
   },
 editar(Listaform){
   
   this.Entrega = 1;
   this.dialog = true;
   this.string_id = Listaform.string_id;
   this.default_value = Listaform.default_value;
   this.value_list = Listaform.value_list;
   this.mask_library = Listaform.mask_library;
   this.assumed_value = Listaform.assumed_value;
   this.length = Listaform.length;
 },
 VerDatosAfi(){
   
   this.recuperodatos();
  
 },
 async recuperodatos(){
    this.VerDatosText = "";
    let Institucion = "";
    const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta) => {
    let data = []; //declarar la variable data
    this.datos = respuesta.data.lista
    data = respuesta.data.lista;
    data.forEach(item => { Institucion = item.codigo;  }); })
      .catch(err => { console.log(err); });
        /////////////////////////
        //Datos de Impresion 
        //alert(Institucion);     
        const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarDatosInternados?pI=${Institucion}&pN=${this.Numero}`, {
  }).then((respuesta_s) => {
    let data_s = []; //declarar la variable data
    this.datos = respuesta_s.data.lista
    data_s = respuesta_s.data.lista;
    data_s.forEach(item_s => { this.VerDatosText = item_s.detalleInternado;  }); })
      .catch(err => { console.log(err); });
        //////
   },
 handleEnter() {
   // Este método se activará cuando se presione la tecla "Enter"
   if (this.Numero) {
        //this.VerDatosText = "Riveros Hugo Adrian - Obra Social: Medife - Plan: Bronce";
        this.recuperodatos();
        this.nroremitoPasado = this.Numero;
   
   } else {
    this.Ventanainternados = true;
     }
   // Aquí puedes agregar la lógica que deseas ejecutar cuando se presione "Enter"
 },
 verId(){
   alert("Hola")
 },
 async BuscarMedicamento() {
  ////////
  let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////
  //if (!this.buscar || this.buscar.length == 0) {

//this.mostrarAlertaEliminar = false;
//this.mostrarAlertaSucesoMensaje = true;
//this.mensajeAlertaSuceso = "Debe Ingresar un nombre de medicamento";
//setTimeout(() => {
//this.mostrarAlertaSucesoMensaje = false;
//}, 5000);
//return;
//}
//alert("medciamento");
   //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
   const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${IdInst}`)
   //const respuesta = await this.axios.get(`/api/ConfigForm/BuscarArticulos?pTipo=${this.idUsuario}&pNombre=${this.buscar}`, {
 //timeout: 100000 // Tiempo de espera en milisegundos (10 segundos en este caso)


 
//})
     .then((respuesta) => {
       this.ListaFormularios = respuesta.data.lista
       this.rows = respuesta.data.lista;
       
       console.log("Importante Lista Medicamentos");
       console.table(this.ListaFormularios);
       this.datos = this.ListaFormularios;
       //console.log("Importante Lista Datos");
       //console.table(this.datos);
      
       //si no hay formularios en la respuesta de la api mostrar mensaje
       if (this.ListaFormularios.length == 0) {
         //this.NoHayRegistros = true
         //alert("No se encontraron datos para la busqueda")
       }
     })
     .catch(err => {
       console.log(err);
     });
     
         
   //this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
 },
 async MostrarCombo() {
  ////////
  let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////
   
   this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
   const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=11&pId=${IdInst}`)
     .then((respuesta) => {
       this.ListaCombos = respuesta.data.lista;
       
       console.log("Lista Combos");
       //console.log(this.idUsuario);
       console.log(this.ListaCombos);
      
       //si no hay formularios en la respuesta de la api mostrar mensaje
       if (this.ListaFormularios.length == 0) {
         this.NoHayRegistros = true
       }
     })
     .catch(err => {
       console.log(err);
     });
     
         
   this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
 },
 async MostrarComboOrigen() {
   
   this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
   const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2135")
     .then((respuesta) => {
       this.ListaCombosOrigen = respuesta.data.lista;
       
       console.log("Lista ListaCombosOrigen");
       console.log(this.ListaCombosOrigen);
      
       //si no hay formularios en la respuesta de la api mostrar mensaje
       if (this.ListaFormularios.length == 0) {
         this.NoHayRegistros = true
       }
     })
     .catch(err => {
       console.log(err);
     });
     
         
   this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
 },
 async SelectedObraSocial(){
           let me=this;
          
           var empresasArray=[];
           const respuesta = await this.axios.get("/api/ConfigForm/ListaRespuestas/2129")
           .then((respuesta) => {
             empresasArray=respuesta.data.lista;
             console.log (empresasArray);
             empresasArray.map(function(x){
                 //me.ListObraSocial.push({text: x.valor,value:x.valor})
                 me.ListObraSocial.push({text: x.valor})
                 }); 
                 console.log("Muestro Combo");  
                 console.log (me.ListObraSocial);
           }).catch(function(error){
               console.log (error);
           });
 },
 mostrarConfirmacionEliminar(Entrega) {
   this.mostrarAlertaEliminar = true;
this.idConfigFormToDelete = this.string_id; // Guarda el idConfigForm en data

 },
 cancelarEliminacion() {
   this.mostrarAlertaEliminar = false;
 },
 cerrarventana(){
     this.dialog = false;
     this.nroremitoPasado = this.Numero;
   this.$refs.listado.MostrarDatos();
   
    // window.location.reload();
     
   },
 async Agregar() {
   if(this.Entrega == 1)//Modifica
     this.Modificar();//alert("Modiifca Campo");
     else
     this.Grabar();//alert("Agrega Campo");
 },
 async fetch() {
         //alert("hola");
         this.MostrarSpinner = true;
         const idFormulario = this.$route.params.idConfigForm;
         this.idConfigForm = idFormulario;
         await this.axios.get(`/api/ConfigForm/ListaRespuestas/2134`)
         //await this.axios.get(`/api/ConfigForm/ListarMedicamentosClinicas?pIdClinica=${idFormulario}`)
             .then((respuesta) => {
                 let data = []; //declarar la variable data
                 data = respuesta.data.lista; //signarle a data el array de objetos recibidos de la api
                 this.ListaFormularios = respuesta.data.lista
                 this.datos = this.ListaFormularios;
                
                 //this.datos = this.data
                 console.log("tabla");
                 console.log (this.datos);
                 
                 if (data.length === 0) {
                     this.NoHayRegistros = true;}

                 // Objeto para almacenar los encabezados de columna
                 const columnHeaders = {};
                 // Objeto para almacenar las filas de la matriz
                 const matrix = {};
                 //console.log(data);
                 // Itera sobre los objetos
                 data.forEach(item => {
                     const rowId = item.identificador_fila;  // Usa el identificador_fila como identificador de fila
                     const columnId = item.id_Field; // Usa el id_Field como identificador de columna
                     const columnName = item.nombre; // Usa el nombre como encabezado de columna
                     const columnValue = item.valor; // Valor que se colocará en la matriz
                     const idDeValor = item.id_Answer; //identificador del valor que servira para poder editar un valor especifico
                     const Titulo = item.titulo; //titulo
                     // Agrega el nombre de columna a los encabezados
                     columnHeaders[columnId] = columnName;

                     // Crea una fila si no existe
                     if (!matrix[rowId]) {
                         matrix[rowId] = {};
                     }
                     
                     // Asigna el valor a la columna correspondiente en la fila
                     matrix[rowId][columnName] = columnValue;

                     // Agrega también el identificador de fila
                     matrix[rowId]['identificador_fila'] = rowId;
                     matrix[rowId][`${columnName}_id_Field`] = item.id_Field;
                     matrix[rowId][`${columnName}_id_Answer`] = item.id_Answer;
                     matrix[rowId][`${columnName}_id_ConfigForm`] = item.id_ConfigForm;
                     matrix[rowId][`${columnName}_titulo`] = item.titulo;
                     

                 });
                 

                 //iteracion de los encabezados
                 const headers = [...new Set(data.map(item => item.nombre))];

                 const matrixArray = Object.values(matrix).map(row => {
                     const rowWithIds = [row.identificador_fila];

                     headers.forEach(header => {
                         const cellData = {
                             id_ConfigForm: row[`${header}_id_ConfigForm`],
                             id_Field: row[`${header}_id_Field`],
                             id_Answer: row[`${header}_id_Answer`],
                             value: row[header] || null
                         };

                         rowWithIds.push(cellData);
                     });

                     return rowWithIds;
                 });
                 
                 this.dataHeaders = headers;  //Encabezados de columna
                 console.log("headers");
                 console.log(this.dataHeaders);
                 this.dataValues = matrixArray;  //Matriz de datos
                 console.log("tabla con datos a buscar");
                 //this.datos = matrixArray;
                 console.log(this.dataValues);
                
                 
                 

             })
             .catch(err => {
                 console.log(err);
             });
             //Codigo Nuevo

             const idConfigForm = this.$route.params.idConfigForm;
         this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/2134`)
             .then((respuesta) => {
             this.daform = respuesta.data;
             //this.dafield = respuesta.data.datosField;
             //console.log("valor de la tabla");
             //console.log(this.daform);
             })
             .catch(err => {
             console.log(err);
             }).finally(() => {
             //finaliza el spinner
             // Ocultamos el spinner luego de finalizar la solicitud
             this.MostrarSpinner = false;
             });
             //Fin Codigo Nuevo
             this.MostrarSpinner = false;
     },
     //Buscador Uno buscaruno
     async buscador() {
        
         const valor = this.buscaruno;
         this.MostrarSpinner = true;
         const idFormulario = this.$route.params.idConfigForm;
         this.idConfigForm = idFormulario;
         await this.axios.get(`/api/ConfigForm/Buscar/${idFormulario}/${valor}`)
         //await this.axios.get(`/api/ConfigForm/Buscar?pIdClinica=${idFormulario}`)
             .then((respuesta) => {
                 let data = []; //declarar la variable data
                 data = respuesta.data.lista; //signarle a data el array de objetos recibidos de la api
                 this.ListaFormularios = respuesta.data.lista
                 this.datos = this.ListaFormularios;
                 //this.datos = this.data
                 console.log("tabla Buscador");
                 console.log (this.datos);
                 
                 if (data.length === 0) {
                     this.NoHayRegistros = true;}

                 // Objeto para almacenar los encabezados de columna
                 const columnHeaders = {};
                 // Objeto para almacenar las filas de la matriz
                 const matrix = {};
                 //console.log(data);
                 // Itera sobre los objetos
                 data.forEach(item => {
                     const rowId = item.identificador_fila;  // Usa el identificador_fila como identificador de fila
                     const columnId = item.id_Field; // Usa el id_Field como identificador de columna
                     const columnName = item.nombre; // Usa el nombre como encabezado de columna
                     const columnValue = item.valor; // Valor que se colocará en la matriz
                     const idDeValor = item.id_Answer; //identificador del valor que servira para poder editar un valor especifico
                     const Titulo = item.titulo; //titulo
                     // Agrega el nombre de columna a los encabezados
                     columnHeaders[columnId] = columnName;

                     // Crea una fila si no existe
                     if (!matrix[rowId]) {
                         matrix[rowId] = {};
                     }
                     
                     // Asigna el valor a la columna correspondiente en la fila
                     matrix[rowId][columnName] = columnValue;

                     // Agrega también el identificador de fila
                     matrix[rowId]['identificador_fila'] = rowId;
                     matrix[rowId][`${columnName}_id_Field`] = item.id_Field;
                     matrix[rowId][`${columnName}_id_Answer`] = item.id_Answer;
                     matrix[rowId][`${columnName}_id_ConfigForm`] = item.id_ConfigForm;
                     matrix[rowId][`${columnName}_titulo`] = item.titulo;
                     

                 });
                 

                 //iteracion de los encabezados
                 const headers = [...new Set(data.map(item => item.nombre))];

                 const matrixArray = Object.values(matrix).map(row => {
                     const rowWithIds = [row.identificador_fila];

                     headers.forEach(header => {
                         const cellData = {
                             id_ConfigForm: row[`${header}_id_ConfigForm`],
                             id_Field: row[`${header}_id_Field`],
                             id_Answer: row[`${header}_id_Answer`],
                             value: row[header] || null
                         };

                         rowWithIds.push(cellData);
                     });

                     return rowWithIds;
                 });
                 
                 this.dataHeaders = headers;  //Encabezados de columna
                 console.log("headers");
                 console.log(this.dataHeaders);
                 this.dataValues = matrixArray;  //Matriz de datos
                 console.log("tabla con datos a buscar");
                 //this.datos = matrixArray;
                 console.log(this.dataValues);
                 
                 

             })
             .catch(err => {
                 console.log(err);
             });
             //Codigo Nuevo

             const idConfigForm = this.$route.params.idConfigForm;
         this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/2134`)
             .then((respuesta) => {
             this.daform = respuesta.data;
             
             })
             .catch(err => {
             console.log(err);
             }).finally(() => {
             //finaliza el spinner
             // Ocultamos el spinner luego de finalizar la solicitud
             this.MostrarSpinner = false;
             });
             //Fin Codigo Nuevo
             this.MostrarSpinner = false;
     },
 async Grabar() {
  const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulosTodos?pTipo=${this.articulosid}`)
          .then((respuesta) => {
            let data = []; //declarar la variable data
            this.ListaFormulariosArticulos = respuesta.data.lista;
            data = respuesta.data.lista;
            data.forEach(item => {
            
              this.Identificado = item.traza;

            
            });    
          })
    .catch(err => {
            //console.log(err);
  });
  //alert(this.Identificado);
if(this.Identificado == "1"){
  if(parseInt(this.MedCantidad, 10) > parseInt(this.MediStock, 10) )
            {
              this.MensajeOkCantidad = true;
              return;
            }
          }
  //Trae el numero de comprobante
  ///////////////////////////////
  //alert(this.NComprobante);
  if(this.NComprobante=="0"){
    const respuesta = await this.axios.get(`/api/ConfigForm/TraeComprobante`)
    //const respuesta = await this.axios.get(`api/ConfigForm/BuscarArticulosCodigo?pTipo=42&pCodigo=300560`)
            .then((respuesta) => {
              //this.ListaFormulariosArticulos = respuesta.data.lista
              this.rows = respuesta.data.lista;
              this.rows.forEach(row => {
              this.NComprobante = row.newID;
              //alert(" Id Consumo: " + this.NComprobante ); 
          
        }); 
            })
            .catch(err => {
              //console.log(err);
            });
 }        
  ///////////////////////////////
  if (!this.MediCodigo || this.MediCodigo.length == 0) {
    
this.mostrarAlertaEliminar = false;
this.mostrarAlertaSucesoMensaje = true;
this.mensajeAlertaSuceso = "Debe Ingresar un medicamento";
setTimeout(() => {
this.mostrarAlertaSucesoMensaje = false;
}, 5000);
return;
}
if (!this.dosis || this.dosis.length == 0) {

this.mostrarAlertaEliminar = false;
this.mostrarAlertaSucesoMensaje = true;
this.mensajeAlertaSuceso = "Debe Ingresar dosis";
setTimeout(() => {
this.mostrarAlertaSucesoMensaje = false;
}, 5000);
return;
}
if (!this.MedCantidad || this.MedCantidad.length == 0) {

this.mostrarAlertaEliminar = false;
this.mostrarAlertaSucesoMensaje = true;
this.mensajeAlertaSuceso = "Debe Ingresar una cantidad";
setTimeout(() => {
this.mostrarAlertaSucesoMensaje = false;
}, 5000);
return;
}
  //Recuoero Id COnsumo
  let IdConusmo = "";
  const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarTipoMovimiento?pTipo=2&pId=${this.idUsuario}`, {
  }).then((respuesta_s) => {
    let data_s = []; //declarar la variable data
    this.datos = respuesta_s.data.lista
    data_s = respuesta_s.data.lista;
    data_s.forEach(item_s => { IdConusmo = item_s.idMovimientoStock; 
     }); })
      .catch(err => { console.log(err); });
     ///////////////////////////////////
     ///////////////////////////////////
        // Dividir la cadena por el carácter "-"
      let partes = this.Fecha.split("-");
      // Extraer el año y el mes
      let anio = partes[0]; // "2024"
      let mes = partes[1];  // "10"
      let dia = partes[2];  // "12"
    
     //let Fecha_Actual = "10-10-2024";
     let Fecha_Actual = dia +"-"+ mes +"-"+ anio;
     ///////////////////////////////////
     ///////////////////////////////////
    
     await this.axios.post(`/api/ConfigForm/AgregarConsumo/${this.Numero}/${this.articulosid}/${this.NComprobante}/123/${this.dosis}/${Fecha_Actual}/${this.VerDatosText}/${this.MedCantidad}/${this.ValorCombo}/${this.idUsuario}/${IdConusmo}/${this.MediLote}/${this.MediFecVen.replace(/\//g, '-')}`)
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
       this.mostrarAlertaSuceso = true;
      //alert("Se grabaron los datos Correctamente");
      this.MensajeOk = true;
      this.MedCantidad = "";
      this.MediCodigo = "";
      this.MediNOmbre = "";
      this.MediPrecio = "";
      this.dosis = "";
      this.MediFecVen = "";
      this.MediLote = "";
      this.MediStock = "";
      this.$refs.listado.MostrarDatos();
      this.ListarConsumo();
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });
     //window.location.reload();
 },
 async Modificar() {
   
     await this.axios.put(`/api/ConfigForm/ModificaCampos/1/${this.string_id}/${this.default_value}/${this.value_list}/${this.mask_library}/${this.assumed_value}/${this.length}`)
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Los datos se modificaron correctamente";
       this.mostrarAlertaSuceso = true;
     

       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });
 },
 async eliminarform(idConfigFormToDelete) {
   await this.axios.put(`/api/ConfigForm/EliminaCampos/1/${this.idConfigFormToDelete}`)
   //await this.axios.put(`/api/ConfigForm/EliminaCampos/1/1`)
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Eliminado exitosamente";
       this.mostrarAlertaSuceso = true;
     
       window.location.reload();
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });
 },

},
}
</script>
<style>
@import 'datatables.net-dt';
.custom-margin-botonN{
margin-left: 115px; /* Ajusta el valor según tus necesidades */
}
.table-container {
max-height: 420px; /* ajusta la altura máxima según tus necesidades */
overflow-y: auto;
}
tr.v-data-table__selected {
background: #7d92f5 !important;
}
.containerScroll {
width: 100%; /* Ancho del contenedor */
height: 100px; /* Altura fija del contenedor */

overflow-y: auto; /* Habilita el desplazamiento vertical cuando el contenido excede la altura */
}
.content {
padding: 10px; /* Espacio interno */
}
.pagination {
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
}

.pagination button {
margin: 0 5px;
padding: 5px 10px;
}

</style>