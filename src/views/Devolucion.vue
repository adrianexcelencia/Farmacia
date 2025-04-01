<template >
    <barra-navegacion></barra-navegacion>
    <v-dialog
            v-model="MensajeOk"
            persistent
            width="450"
  > 
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <v-row justify="center" align="center" class="my-container">
    <v-col cols="auto">
      <v-icon color="primary" size="80">
        mdi-checkbox-marked-circle-outline
      </v-icon>
    </v-col>
  </v-row> 
          <v-btn @click="CerrarOk()"  color="success"  x-small  prepend-icon="mdi-close-box" block>Aceptar</v-btn>      
  </div>
  </v-dialog>
    <v-dialog
            v-model="Ventanainternados"
            
            width="950"
  >


  <div class="row bg-white" >
         
         <div class="col-12" >
            <ListadoInter @valor-nombre="actualizarNombre" @valor-codigo="actualizarcodigo" />
         </div>
  </div>       
    </v-dialog>
    <v-dialog
            v-model="VentanaGrabar"
            persistent
            width="500"
  > 
  <v-alert
          shaped  rounded="xl"
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
  <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1350px; " >
  <v-alert
         shaped  rounded="xl"
        color="#5f968E"
       
       theme="dark"
       icon="mdi-domain"
       density="compact"
       elevation="4"
       border="top"
     >
      <b> Devolucion:  </b> 
  
      Carga de devolucion de medicamentos
     </v-alert>
     <br>
   <spinner :visible="MostrarSpinner"></spinner>
   <div v-if="!MostrarSpinner">
     <div >
       
       
       <!--nueva prueba-->
       <div class="container-sm shadow p-3  bg-white" style="max-width: 1300px; ">
         
         <div class="row " >
         
         <div class="col-md-2" >
           <v-text-field @keyup.enter="handleEnter" ref="cantidadField" v-model="Numero" label="Ingrese numero" variant="underlined" block></v-text-field>
         </div>
         <div class="col-md-1 "> 
               <v-btn  rounded="xl" @click="handleEnter()" color="primary" prepend-icon="mdi-magnify" block></v-btn>  
         </div>
         <div class="col-md-8" >
           <v-text-field  v-model="VerDatosText" label="Datos" variant="underlined" block></v-text-field>
         </div>
         
       </div>
       <div class="row" >
        
           <v-text-field  v-model="NComprobante" readonly v-show="mostrarCampo"
             label="Nro Comprobante" variant="underlined" block></v-text-field>
        
         
         
  
  
    <div class="col-md-3" >
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
     <select v-model="ValorCombo" class="form-select" id="Combo" style="border-radius: 12px;"  >
       <option value="0">Seleccionar un sector...</option> 
       <option v-for="Combo in ListaCombos" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
     
      </select>  
      </v-alert> 
  </div>
  <div class="col-md-3" >
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
  Selecciona un tipo 
     <select v-model="ValorCombo1" class="form-select" id="Combo" style="border-radius: 12px;"  >
       <option value="0">Seleccionar un tipo...</option> 
       <option v-for="Combo in ListaCombosDevolucion" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
     </select>  
</v-alert>


    </div>
  <div class="col-md-3" >
    <!--
    <v-btn @click="AgregarMed()" color="primary" p prepend-icon="mdi-cloud-upload" block>Agregar medicamentos</v-btn>         
    -->
    <v-card
                  @click="AgregarMed()"  rounded="xl"
                  class="mx-auto"
                  elevation="10"
                  prepend-icon="mdi-arrow-up-bold-box-outline" 
                  color ="primary"
                >
                  <template v-slot:title>
                    Agregar medicamentos
                  </template>
  
                  <v-card-text>
                    Carga de devolucion de medicamentos
                  </v-card-text>
                </v-card> 
  </div>
  <div class="col-md-3">
  <v-card
                @click="Limpiar()"   rounded="xl"
                class="mx-auto"
                elevation="10"
                prepend-icon="mdi-open-in-new" 
                color ="primary"
              >
                <template v-slot:title>
                  Nuevo
                </template>

                <v-card-text>
                  Cargar nuevo devolucion
                </v-card-text>
              </v-card> 

 </div>
     </div>
   
  
  
     
   
  
    
   
     </div>  
   </div> 
   <br>   
   
   <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
  
       
   <div class="shadow p-3  bg-light text-sm " style="max-width: 1350px; ">
      
  <div class="row">
  
  <ListarDevolucion :remitoValue="nroremitoPasado" />      
  
  
  
  </div>
  
  
         
         
   
       
  <v-dialog
   v-model="dialog"
   persistent
   fullscreen
  >
  <v-card>
    <div class="content" > 
    <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
   </div>
  <!--Empieza Buscador-->
  
  <div class="containerScroll">
  <div class="content" ref="scrollContainer"> 
      
  <table class="table table-striped bg-white text-left">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
              <td v-for="(header, colIndex) in headers" :key="colIndex">
                <v-chip class="d-flex  darken-1 sm bg-primary"   elevation="1"   > 
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
  
    
              
               <!--FIN-->                  
  
  <!--
               <div class="containerScroll">
   <div class="content" ref="scrollContainer">
  <div class="row mt-5">
  
  <div class="col-md-4 shadow p-3" v-for="item in ListaFormularios" v-bind:key="item.nroRegistro"> 
  
   <div class="card mb-4 bg-primary shadow p-3">
     
     <div class="card-body"><v-icon start icon="mdi-arrow-right" ></v-icon>
    {{ item.nombre }} -  {{ item.presentacion }}   
     
       
         <div class="row" >
             <div class="col-6 text-left "><strong>$</strong> {{ item.precio }} </div>
             <div class="col-6 text-center ">
               <v-btn fab  @click="Mostrar(  item.codigo, item.nombre, item.precio)" color="primary" prepend-icon="mdi-open-in-new">Seleccionar</v-btn>
             </div>
         </div>
         
  
  
       
     </div>
    
   </div>
  
  </div>
  
  </div>
  </div>
  
  </div>
  -->
  <div class="content"> 
  <div class="row " >
    <div class="col-2"  >
      <label for="fecha">Fecha</label><br>
          <input type="date" id="fecha" v-model="Fecha" name="fecha">
    </div>
         <div class="col-1" >
           
           <v-text-field v-model="MediCodigo1"  @keyup.enter="BuscarCodigo" label="Codigo" variant="underlined" block></v-text-field>
          </div>
         <div class="col-4" >
           
           <v-text-field v-model="MediNOmbre1" label="Medicamento" variant="underlined" block></v-text-field>
         </div>
         <div class="col-1" >
          
           <v-text-field v-model="MediPrecio1" v-show="mostrarCampo" label="MedPrecio"  block></v-text-field>
         </div>
         <div class="col-1" >

            <v-text-field  v-model="MedCantidad" label="Cantidad"  variant="underlined" block></v-text-field>
           
            <v-text-field v-show="mostrarCampo"  v-model="articulosid1"  label="Codigo" variant="underlined" block></v-text-field>
         </div>
         <div class="col-1" >
          <v-text-field v-model="Lote" label="Lote" variant="underlined" block></v-text-field>
         
         </div>
         <div class="col-1" >
          <label for="fecha">Fecha Ven.:</label>
          <input type="date" id="fecha" v-model="FecVen" name="fecha">
         </div>
         </div>
         </div>
         <div class="content"> 
  <div class="row" >
    <div class="col-7 text-center "> 
              <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
             </div>
             <div class="col-1 text-center ">
               
               <v-text-field  v-model="dosis" label="Dosis" variant="underlined" block v-if="mostrarDosis"></v-text-field>
             </div>
           
             <div class="col-3 text-center "> 
              <v-card
                  @click="Grabar()" 
                  class="mx-auto"
                  elevation="10"
                  prepend-icon="mdi-checkbox-multiple-marked" 
                  color ="primary"
                >
                  <template v-slot:title>
                    Agregar medicamentos
                  </template>
  
                  <v-card-text>
                    Carga de devoluion de medicamentos
                  </v-card-text>
  </v-card> 
             </div>
             
             
           </div>
           </div>
  <!--Termina Buscador-->
  



  
  <v-card-actions>
           <v-spacer></v-spacer>
           
           
           <v-btn
             color="primary"
             
             @click="cerrarventana24()"
             prepend-icon="mdi-close" 
           >
             Cerrar
           </v-btn>
         
         </v-card-actions>
  </v-card>
  
  </v-dialog>
  
   

  
  
  
  </div>
  
  
  </div>
 
  </div>
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
  import ListarDevolucion from '../components/ListarDevolucion.vue';
  import ListadoInter from '../components/ListadoInter.vue';
  import ListarDevolucionesInforme from '@/components/ListarDevolucionesInforme.vue';
  
  
  
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
   ListarDevolucion,
   AlertaMensaje,
   ListadoInter,
   ListarDevolucionesInforme,
   'alerta-suceso': AlertaSuceso,
    DataTable
  },
  
  
  data: function () {
   return {
   //-----------------------------
   //-----------------------------
   mostrarCampo: false, // Cambia a 'false' para hacerlo invisible
   mostrarDosis: false, // Cambia a true para mostrar el campo
   searchQuery: '',
     currentPage: 1,
     itemsPerPage: 5,
     VerDatosText: '',
     ValorCombo: '',
     articulosid1:'',
     ValorCombo1: '',
     MensajeOk: false,
     mensajeAlertaSuceso: "",//mensaje alerta de suceso vacio
     VentanaGrabar: false,
     Ventanainternados: false,
     docentes: [], // <-- La lista de docentes
     ListObraSocial:[],
     codigo:'',
     Lote:'',
     Lote1:'',
     FecVen:'',
     nombre:'',
     valor:'',
     buscar: '',
     MediCodigo: '',
     MediCodigo1: '',
     MediNOmbre: '',
     MediPrecio: '',
     MediPrecio1: '',
     arreglobuscador: [],
     dialog: false,  
     selectedId: -1,
     selectedRow: '',
     nroremitoPasado: '',
     NComprobante:  '',
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
     ListaCombosDevolucion: null,
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
   this.SelectedObraSocial();
   this.MostrarCombo();
   this.MostrarComboDevolucion();
   this.ValorCombo = "0";
   this.ValorCombo1 = "0";
 
   this.BuscarMedicamento();
  this.fetchArticulosMed();
   //this.NComprobante="0"
   
   
  },
  computed: {
          
  //--------------------------
  //--------------------------
  //async BuscarCodigo(){
 
//this.MediNOmbre = "";
   // this.MediPrecio = "";
 //const respuesta = await this.axios.get(`/api/ConfigForm/BuscarArticulosCodigo?pTipo=${this.idUsuario}&pCodigo=${this.MediCodigo1}`)
   //       .then((respuesta) => {
    //       this.ListaArticulosCodigo = respuesta.data.lista
     //      this.ListaArticulosCodigo.forEach(ListaArticulosCodigo => {
    //   this.MediNOmbre1 = ListaArticulosCodigo.nombre;
    //   this.MediPrecio1 = ListaArticulosCodigo.precio;
    //   this.MediCodigo1 = ListaArticulosCodigo.codigo;
     //  this.articulosid1 = ListaArticulosCodigo.articulosid;
     //}); 
     //    })
      //   .catch(err => {
      //     //console.log(err);
      //   });
//},
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
  //--------------------------
  //--------------------------
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
  CerrarOk(){
        this.MensajeOk = false;
        
      },
   onSelect(e, dt, type, indexes ){
     
     this.string_id = indexes;
     this.dialog = true;
     },
       sendRowData(row) {
        const keys = Object.keys(row);
        const entries = Object.entries(row);
        const artid = entries[0];  // Valor de la columna
        const primerpar = entries[1];  // Valor de la columna
        const nombre = entries[2];  // Valor de la columna
        const precio = entries[3];  // Valor de la columna
        this.MediCodigo1 = primerpar[1];
        this.MediNOmbre1 =nombre[1];
        this.MediPrecio1 = precio[1];
        this.articulosid1 = artid[1];
        //alert(primerpar[1]);
        //this.MediNOmbre ="HOLA";
        
      },
       Mostrar(V1, V2, V3){
       
         this.MediCodigo = V1;
         this.MediNOmbre =V2;
         this.MediPrecio = V3;
         
       },
   Limpiar(){
     this.Numero = "";
     this.VerDatosText ="";
     this.ValorCombo ="0";
     this.ValorCombo1 ="0";
   },
   async fetchArticulosMed() {
          
       ///////
  let IdInst = "";
 
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////  ///api/ConfigForm/ListarArticulosDev?pTipo=${IdInst}&pInt=${this.Numero}
          const respuesta = await this.axios.get(`/api/ConfigForm/
          
          
          ?pTipo=${IdInst}`)
            .then((respuesta) => {
             
              this.rows = respuesta.data.lista;
                
            })
            .catch(err => {
              //console.log(err);
            });
       
        },
   nuevo(){
     this.Entrega = 0;
     this.dialog = true;
     this.string_id = "";
     this.default_value ="";
     this.value_list ="";
   },
   cerrarventana(){
    alert("aca");
     this.dialog = false;
     //this.nroremitoPasado = this.Numero;
     //window.location.reload();
     // Captura el evento @keyup.enter
     const inputField = this.$refs.cantidadField;
      
      // Opción 1: Simular el evento Enter manualmente
      inputField.$el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
     
   },
   cerrarGrabar() {
            this.VentanaGrabar = false;
        },
   AgregarMed(){
    //this.BuscarMedicamento();
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
     if ( this.ValorCombo == "0") {
      this.$refs.cantidadField.$el.querySelector('input').focus();
          this.mostrarAlertaEliminar = false;
          this.mostrarAlertaSucesoMensaje = true;
          this.mensajeAlertaSuceso = "Debe seleccionar un sector";
          setTimeout(() => {
          this.mostrarAlertaSucesoMensaje = false;
          }, 5000);
          return;
     }
     if (this.ValorCombo1 == "0") {
      this.$refs.cantidadField.$el.querySelector('input').focus();
          this.mostrarAlertaEliminar = false;
          this.mostrarAlertaSucesoMensaje = true;
          this.mensajeAlertaSuceso = "Debe seleccionar un tipo de devolucion";
          setTimeout(() => {
          this.mostrarAlertaSucesoMensaje = false;
          }, 5000);
          return;
     }
      
       this.dialog = true;
       this.MediCodigo1 = "";
       this.MediNOmbre1 = "";
       this.MediPrecio1 = "";
       this.articulosid1 = "";
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
     
     this.VerDatosText = "Riveros Hugo Adrian - Obra Social: Medife - Plan: Bronce";
    
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
        
        const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarDatosInformes?pI=${Institucion}&pN=${this.Numero}`, {
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
    
   },
   verId(){
     alert("Hola")
   },
   async BuscarMedicamento() {
    ///////  alert("Busca Medicamentos");
  let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////
   
     //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulosDev?pTipo=${IdInst}&pInt=${this.Numero}`)
     const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${IdInst}`)
    .then((respuesta) => {
        
         this.ListaFormularios = respuesta.data.lista
         this.rows = respuesta.data.lista;
         console.log("aca los datos de medicamentos");
         console.log(this.rows);
         this.datos = this.ListaFormularios;       
         //si no hay formularios en la respuesta de la api mostrar mensaje
         if (this.ListaFormularios.length == 0) {
           //this.NoHayRegistros = true
           alert("No se encontraron datos para la busqueda")
         }
       })
       .catch(err => {
         console.log(err);
       });
       
           
    
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
   async MostrarComboNO() {
     
     this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
     const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`)
     //const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
       .then((respuesta) => {
         this.ListaCombos = respuesta.data.lista;
                
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
   async MostrarComboDevolucion() {
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
     const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=5&pId=${IdInst}`)
       .then((respuesta) => {
         this.ListaCombosDevolucion = respuesta.data.lista;
                 
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
               empresasArray.map(function(x){
                   me.ListObraSocial.push({text: x.valor})
                   }); 
                 
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
    
    alert("aca");
     this.dialog = false;
     //this.nroremitoPasado = this.Numero;
     //window.location.reload();
     // Captura el evento @keyup.enter
     const inputField = this.$refs.cantidadField;
      
      // Opción 1: Simular el evento Enter manualmente
      inputField.$el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));   
    //this.dialog = false;
       
       
       
      // window.location.reload();
       
       
     },
     cerrarventana24(){
    
    //alert("aca");
     this.dialog = false;
     //this.nroremitoPasado = this.Numero;
     window.location.reload();
     // Captura el evento @keyup.enter
     //const inputField = this.$refs.cantidadField;
      
      // Opción 1: Simular el evento Enter manualmente
      //inputField.$el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));   
    //this.dialog = false;
       
       
       
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
                
                   
                   if (data.length === 0) {
                       this.NoHayRegistros = true;}
  
                   // Objeto para almacenar los encabezados de columna
                   const columnHeaders = {};
                   // Objeto para almacenar las filas de la matriz
                   const matrix = {};
                 
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
                   this.dataValues = matrixArray;  //Matriz de datos
                  
                  
                   
                   
  
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
              
                   this.dataValues = matrixArray;  //Matriz de datos
                  
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
    if(this.NComprobante=="0"){
    const respuesta = await this.axios.get(`/api/ConfigForm/TraeComprobante`)
    //const respuesta = await this.axios.get(`api/ConfigForm/BuscarArticulosCodigo?pTipo=42&pCodigo=300560`)
            .then((respuesta) => {
              //this.ListaFormulariosArticulos = respuesta.data.lista
              this.rows = respuesta.data.lista;
              this.rows.forEach(row => {
              this.NComprobante = row.newID;
              //alert(row.newID);
          
        }); 
            })
            .catch(err => {
              //console.log(err);
            });
 
        }
               
  ///////////////////////////////
    if (!this.MediCodigo1 || this.MediCodigo1.length == 0) {
      
  this.mostrarAlertaEliminar = false;
  this.mostrarAlertaSucesoMensaje = true;
  this.mensajeAlertaSuceso = "Debe Ingresar un medicamento";
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
     this.NComprobante = "0";
     this.dosis = "-";

     
     
 



     


    // await this.axios.post(`/api/ConfigForm/AgregarConsumo/${this.Numero}/${this.articulosid}/${this.NComprobante}/123/${this.dosis}/24%2F07%2F2024/${this.VerDatosText}/${this.MedCantidad}/${this.ValorCombo}/${this.idUsuario}/${IdConusmo}/${this.MediLote}/${this.MediFecVen.replace(/\//g, '-')}`)
       await this.axios.post(`/api/ConfigForm/AgregarConsumo/${this.Numero}/${this.articulosid1}/${this.NComprobante}/123/${this.dosis}/${Fecha_Actual}/${this.VerDatosText}/${this.MedCantidad}/${this.ValorCombo}/${this.idUsuario}/${this.ValorCombo1}/${this.Lote}/${this.FecVen.replace(/\//g, '-')}`)
       .then(datos => {
         this.mostrarAlertaEliminar = false;
         this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
         this.mostrarAlertaSuceso = true;
        //alert("Se grabaron los datos Correctamente");
        this.MensajeOk = true;
         setTimeout(() => {
                  this.mostrarAlertaSuceso = false;
               }, 5000);
       });
       //window.location.reload();
       this.MedCantidad = "";
       this.MediCodigo1 = "";
       this.MediNOmbre1 = "";
       this.MediPrecio1 = "";
       this.Lote = "";
       this.Lote1 = "";
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
  height: 500px; /* Altura fija del contenedor */
  
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