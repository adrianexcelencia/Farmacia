<template>
  <div class=" bg-white"  >
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
           v-model="VentanaMod"
           persistent
           width="500"
 > 
 <div  class="shadow p-3  bg-light text-sm text-left" align-center  >
  <v-text-field  v-model="IdInternacion" label="Identificador" variant="underlined" block></v-text-field>
  <v-text-field  v-model="Mod_Cantidad" label="Ingrese Cantidad" variant="underlined" block></v-text-field>


  <div class="row bg-white" >
    <div class="col-md-6">
  <v-btn @click="CerrarMod()"  color="primary"  x-small  prepend-icon="mdi-check-circle" block>Modificar</v-btn> 
  </div>
    <div class="col-md-6">
  <v-btn @click="CerrarMod()"  class="bg-error"  x-small  prepend-icon="mdi-check-circle" block>Cerrar</v-btn> 
  </div>
  </div>
 </div>
 </v-dialog>
  
    <v-dialog
           v-model="VentanaGrabar"
           persistent
           width="500"
 > 
 <v-alert
         shaped rounded="xl"
       color="#FF0000"
       theme="dark"
       icon="mdi-alert"
       density="compact"
       elevation="4"
       border="top"
     >
     La medicacion se anulo correctamente 
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
   <div>
 

 <div class="row bg-white" style="max-width: 100%; " >

             <div class="col-md-4">
              <v-alert
        shaped
       color="blue-grey"
      rounded="xl"
      theme="dark"
      icon="mdi-arrow-right"
      density="compact"
      elevation="4"
      border="top"
    >
     <b>   Listado de Indicaciones Medicas   </b> 
 
     
    </v-alert>
               </div>
              
   <div class="col-4" >
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
            
               <div class="col-md-4 ">
                   <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
               </div>
         </div>
     <br>
     <div class="scroll-container">
     <table class=" table-striped  text-left" style="width: 100%;" ref="table">
       <thead>
         <tr>
           
           <th v-for="(header, index) in headers" :key="index" >
             
            {{ header.toUpperCase() }}
          
           </th>
         </tr>
       </thead>
       <br>
       <tbody>
         <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
           <td v-for="(header, colIndex) in headers" :key="colIndex">
            <v-chip class="d-flex   darken-1 sm bg-primary" style="font-size: 14px; color: #000000;"    elevation="3"   > {{ row[header] }} </v-chip> </td>
           <td>
          <v-btn @click="AnularIndicacion(row)" v-show="mostrarCampo" class="bg-error" ><v-icon dark>
        mdi-plus 
      </v-icon>Anular</v-btn>
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
   
     
     

     <div class="pagination">
       <v-btn @click="prevPage" :disabled="currentPage === 1" rounded="xl" class="bg-primary">Anterior</v-btn>
       <span>Página {{ currentPage }} de {{ totalPages }}</span>
       <v-btn @click="nextPage" :disabled="currentPage === totalPages" rounded="xl" class="bg-primary">Siguiente</v-btn>
     </div>
     
   </div>
   <div class="content"> 
<div class="row " >
  <div class="col-1" >
         <v-text-field v-model="Identificado" v-show="mostrarCampo"  label="Identificador" variant="underlined" block></v-text-field>
         <v-text-field @keyup.enter="BuscarCodigo" v-model="Fecha" label="Fecha" variant="underlined" block></v-text-field>
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
       <div class="row " >
        <div class="col-4" >
          <v-text-field  v-model="dosis" label="Dosis" variant="underlined" block></v-text-field>
        </div>
        <div class="col-1 text-center "> 
             <v-text-field  v-model="MedCantidad" @keyup.enter="Grabar" label="Cantidad"  variant="underlined" block></v-text-field>
            
             
           </div>
           <div class="col-3 text-center "> 
         
         <v-btn @click="Grabar()" class="bg-primary" ><v-icon dark>
        mdi-plus 
      </v-icon> Agregar Consumo</v-btn>
     
        </div>
        <div class="col-4" >

          <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
        </div>
        </div>
        <v-text-field  v-model="VerDatosText" v-show="mostrarCampo" label="Id"  variant="underlined" block></v-text-field>
        <v-text-field  v-model="articulosid" v-show="mostrarCampo" label="Id"  variant="underlined" block></v-text-field>
        <v-text-field v-model="Identificado" v-show="mostrarCampo"  label="Identificador" variant="underlined" block></v-text-field>
 </div>
 </template>
 
 <script>
 import AlertaMensaje from '@/components/AlertaMensaje.vue';
 import ListarMed from '../components/ListarMed.vue';
 import * as XLSX from 'xlsx';
 import jsPDF from "jspdf";
 import html2canvas from "html2canvas";
 import "jspdf-autotable";
import AlertaError from './AlertaError.vue';
 export default {
   props: {
   remitoValue: {
     type: String,
     required: true
   }
 },
 components: {

 AlertaMensaje,
 ListarMed
 
},
   data() {
     return {
       nombre: '',
       MensajeOkCantidad: false,
       ListaFormulariosArticulos:'',
       mostrarAlertaEliminar: false,
   mostrarAlertaSuceso: false,
   mostrarAlertaSucesoMensaje: false,
   mensajeAlertaSuceso:"",
       rows: [],
       VentanaGrabar: false,
       VentanaMod: false,
       ListaCombos: null,
       id : "0",
       searchQuery: '',
       currentPage: 1,
       total:'',
       cantidad: '',
       IdInternacion: '',
       Mod_Cantidad: '',
       Fecha:"",
       MediCodigo:"",
       MediFecVen: '',
       Identificado: '',
       VerDatosText: '',
       MensajeOk: false,
   MediLote: '',
   MediStock: '',
   articulosid:'',
   codigo:'',
   
       itemsPerPage: 10
     };
   },
   created() {
       this.idUsuario = this.$store.state.id_usuario;
       //alert("Ingreso al Form");
       //alert(this.remitoValue);
       this.MostrarDatos();
       this.MostrarCombo();
       this.ValorCombo = "0";
       this.TraeInstitucin();
       this.recuperodatos();
   //this.fetchArticulosMed();
 },
   computed: {
 
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
     }
   },
   watch: {
   remitoValue(newVal) {
     if (newVal) {
       //alert("hola");
       this.MostrarDatos();
       
       
     }
   }
 },
   methods: {
    emitirEvento() {
      
      // Usar una referencia para acceder al método del componente hijo ListarMed
      this.$emit("llamar-mostrar-datos");
    },

    CerrarOkCantidad(){
    this.MensajeOkCantidad = false;
  },
    CerrarOk(){
    this.MensajeAlerta = false;
    this.MensajeOk = false;
    
  },
  async recuperodatos(){
    //alert(this.idUsuario);
    //alert(this.remitoValue);
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
        const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarDatosInternados?pI=${Institucion}&pN=${this.remitoValue}`, {
  }).then((respuesta_s) => {
    let data_s = []; //declarar la variable data
    this.datos = respuesta_s.data.lista
    data_s = respuesta_s.data.lista;
    data_s.forEach(item_s => { this.VerDatosText = item_s.detalleInternado;  }); })
      .catch(err => { console.log(err); });
        //////
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
    data_s.forEach(item_s => { IdConusmo = item_s.idMovimientoStock; }); })
      .catch(err => { console.log(err); });
     ///////////////////////////////////
     ///////////////////////////////////
        // Dividir la cadena por el carácter "-"
      let partes = this.Fecha.split("-");
      // Extraer el año y el mes
      let anio = partes[0]; // "2024"
      let mes = partes[1];  // "10"
      let dia = partes[2];  // "12"
    
    
     let Fecha_Actual = dia +"-"+ mes +"-"+ anio;
     ///////////////////////////////////
     ///////////////////////////////////
    
    
     await this.axios.post(`/api/ConfigForm/AgregarConsumo/${this.remitoValue}/${this.articulosid}/${this.remitoValue}/123/${this.dosis}/${this.Fecha.replace(/\//g, '-')}/${this.VerDatosText}/${this.MedCantidad}/${this.ValorCombo}/${this.idUsuario}/${IdConusmo}/${this.MediLote}/${this.MediFecVen.replace(/\//g, '-')}`)
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
      //this.$refs.listado.MostrarDatos();
      this.emitirEvento();
     //this.ListarConsumo();
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });
     //window.location.reload();
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
  async AnularIndicacion(row){
    const keys = Object.keys(row);
    const entries = Object.entries(row);
    const artid = entries[7];  // Valor de la columna
    const id =  artid[1]
     //Eliminar
     await this.axios.put(`/api/ConfigForm/EliminaIndicaciones?pInstitucion=${this.Institucion}&pId=${id}&pIdInt=${this.remitoValue}`)
   
      .then(datos => {
        this.mostrarAlertaEliminar = false;
        this.mensajeAlertaSuceso = "Eliminado exitosamente";
        this.mostrarAlertaSuceso = true;
      
        this.VentanaGrabar = true;
           this.mostrarAlertaGrabar = true;
           this.fetchArticulosMed();
        //setTimeout(() => {
         //        this.mostrarAlertaSuceso = false;
           //   }, 5000);
              
      });
  },

    async sendRowData(row) {
      //alert("Hola");
      const keys = Object.keys(row);
      const entries = Object.entries(row);
      const artid = entries[0];  // Valor de la columna
      const primerpar = entries[1];  // Valor de la columna
      const nombre = entries[2];  // Valor de la columna
      const precio = entries[3];  // Valor de la columna
      const fecha = entries[5];  // Valor de la columna
      const dosis = entries[6];  // Valor de la columna
      const cantidad = entries[7];  // Valor de la columna
      const id_articulo = 0;
      //console.log('Dato de la fila seleccionada:', primerpar[1]);
      this.MediCodigo = primerpar[1];
      this.MediNOmbre =nombre[1]; 
      this.MediPrecio = precio[1];
      this.Fecha = fecha[1];
      this.MedCantidad = cantidad[1];
      // Divide la fecha en día, mes y año
        const [day, month, year] = this.Fecha.split('/');

        // Asegura que el día y el mes tengan dos dígitos
        const paddedDay = day.padStart(2, '0');
        const paddedMonth = month.padStart(2, '0');
       

        // Retorna la fecha formateada
        this.Fecha = `${paddedDay}/${paddedMonth}/${year}`;
      //
      this.dosis = dosis[1];
      //this.MediPrecio = "0";
      this.articulosid = artid[1];
      /////////
      this.nroremitoPasado = this.MediCodigo;
      const respuesta = await this.axios.get(`/api/ConfigForm/BuscarArticulosCodigo?pTipo=${this.idUsuario}&pCodigo=${this.MediCodigo}`)
  
          .then((respuesta) => {
            
            this.ListaArticulosCodigo = respuesta.data.lista
            this.ListaArticulosCodigo.forEach(ListaArticulosCodigo => {
              this.articulosid = ListaArticulosCodigo.articulosid;
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
      //const respuestaLista = await this.axios.get(`/api/ConfigForm/ListaStockPorArticulos?pInstitucion=${this.Institucion}&pCodigo=${this.articulosid}&pSector=${this.ValorCombo}`)
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
              this.MediFecVen = this.MediFecVen.slice(0, 10);
              
                        
          }
        
        ); 
          })
          .catch(err => {
            //console.log(err);
          });
          ///////////////////////
      
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
     exportToPDF() {
 // Clonar la tabla sin el botón
 const originalTable = this.$refs.table;
 const clonedTable = originalTable.cloneNode(true);

 // Eliminar el botón de la tabla clonada
 const buttons = clonedTable.querySelectorAll('v-btn');
 buttons.forEach(button => button.remove());

 // Crear un contenedor temporal para la tabla clonada
 const tempDiv = document.createElement('div');
 tempDiv.appendChild(clonedTable);
 document.body.appendChild(tempDiv);

 // Usar html2canvas para capturar la tabla clonada
 html2canvas(clonedTable, { scale: 2 }).then(canvas => {
   const imgData = canvas.toDataURL('image/png');
   const pdf = new jsPDF('p', 'mm', 'a4');

   const imgWidth = 210; // Ancho en mm para A4
   const pageHeight = 297; // Altura en mm para A4
   const imgHeight = (canvas.height * imgWidth) / canvas.width;
   let heightLeft = imgHeight;

   let position = 20; // Posición inicial debajo del título

   // Añadir el título al PDF
   const title = "Consumo de Medicamentos de la Internacion Numero: " + this.remitoValue; // Reemplaza con tu título
   pdf.setFontSize(10);
   pdf.text(title, imgWidth / 2, 10, { align: 'center' });

   // Añadir la imagen de la tabla debajo del título
   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
   heightLeft -= pageHeight;

   while (heightLeft >= 0) {
     position = heightLeft - imgHeight;
     pdf.addPage();
     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
     heightLeft -= pageHeight;
   }

   pdf.save('table.pdf');

   // Eliminar el contenedor temporal después de capturar la tabla
   document.body.removeChild(tempDiv);
 });
},



     
 
     exportToExcel() {
      
     // Referencia a la tabla
     const table = this.$refs.table;

     // Convertir la tabla a una hoja de cálculo
     const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

     // Generar un archivo Excel
     XLSX.writeFile(workbook, "Datos-de-devolucion.xlsx");
   },
   
     async  MostrarDatos(){ 
      let Institucion = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta1) => {
    let data = []; //declarar la variable data
    this.datos = respuesta1.data.lista
    data = respuesta1.data.lista;
    data.forEach(item => { Institucion = item.codigo;  }); })
      .catch(err => { console.log(err); });
       //alert("Listar Datos: "+ this.remitoValue);
       const respuesta = await this.axios.get(`/api/ConfigForm/ListarIndicaciones?pInstitucion=${Institucion}&pInt=${this.remitoValue}`)
         .then((respuesta) => {
           this.rows = respuesta.data.lista;
           console.log(this.rows);
           //let data = []; //declarar la variable data
           //data = respuesta.data.lista;
           //var valor_total = 0;
           //var valor_total_c = 0;
          })
         .catch(err => {
           //console.log(err);
         });
     },
     CerrarMod(){
      this.VentanaMod = false;
     }
     ,
     async VerMod(row) {
      this.VentanaMod = true;
      const keys = Object.keys(row);
     //alert(keys[0]); Nombre de la columna
     const entries = Object.entries(row);
     const primerpar = entries[0];  // Valor de la columna
    this.IdInternacion = primerpar[1];

     },
     async sendRowData111(row) {
     const keys = Object.keys(row);
     //alert(keys[0]); Nombre de la columna
     const entries = Object.entries(row);
     const primerpar = entries[0];  // Valor de la columna
     this.id =  primerpar[1];
   
     //Eliminar
     await this.axios.put(`/api/ConfigForm/EliminaCampos/15/${this.id}`)
   
      .then(datos => {
        this.mostrarAlertaEliminar = false;
        this.mensajeAlertaSuceso = "Eliminado exitosamente";
        this.mostrarAlertaSuceso = true;
      
        this.VentanaGrabar = true;
           this.mostrarAlertaGrabar = true;
           this.fetchArticulosMed();
        //setTimeout(() => {
         //        this.mostrarAlertaSuceso = false;
           //   }, 5000);
              
      });
   
     
   },
   cerrarGrabar() {
           this.VentanaGrabar = false;
           this.MostrarDatos();
           //window.location.reload();
       },
   async fetchArticulosMed() {
       
       //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
       //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
       //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumo?pTipo=${this.idUsuario}`)
         .then((respuesta) => {
           //this.ListaFormulariosArticulos = respuesta.data.lista
           this.rows = respuesta.data.lista;
              
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
     nextPage() {
       if (this.currentPage < this.totalPages) {
         this.currentPage++;
       }
     }
   }
 };
 </script>
 
 <style scoped>
 .table {
   width: 100%;
   border-collapse: collapse;
 }
 .table th, .table td {
   border: 1px solid #ddd;
   padding: 8px;
 }
 .table th {
   background-color: #f2f2f2;
   text-align: left;
 }
 .pagination {
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 20px 0;
 }
 .pagination button {
   margin: 0 5px;
 }
 tbody, td, tfoot, th, thead, tr{
       border-style: none;
   }
   tr {
       border-bottom: 2px solid #9447ff1a;
        /* Cambia el color de fondo según tu preferencia */
   }
   thead{
       box-shadow: 0px 0px 9px 0px rgb(12, 1, 61);
       border-radius:2rem;
       height: 100%;
       align-items: center;
       width:100%;
   }
   th, td {
      
       vertical-align: middle;
       align-items: center;
       padding: 8px;
       text-align: left;
       border-style: none;

   }
   .scroll-container {
    width: 100%; /* Ancho del contenedor */
    height: 350px; /* Alto del contenedor */
    overflow-y: scroll; /* Habilitar el scroll vertical */
    overflow-x: hidden; /* Evitar el scroll horizontal */
    border: 0px solid #ccc; /* Borde opcional */
    padding: 10px; /* Espaciado interno opcional */
    background-color: #f9f9f9; /* Fondo opcional */
  }
   tbody, td, tfoot, th, thead, tr{
       border-style: none;
   }
   tr {
       border-bottom: 2px solid #9447ff1a;
        /* Cambia el color de fondo según tu preferencia */
   }
   .hidden-for-pdf {
 display: none;
}
   
 </style>
 
 