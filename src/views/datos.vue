<template  >
  <barra-navegacion></barra-navegacion>
 

  <v-card color="#FFFFFF" class="px-4 py-2   w-100 bg-white" elevation="1"  style="height: 100%; ">

  <spinner :visible="MostrarSpinner"></spinner>
  <div  class="shadow p-3  bg-light text-sm " align-center style="max-width: 1300px; " >
  <div v-if="!MostrarSpinner">
    <div class="container-sm" style="max-width: 1300px; margin-bottom: 1%; margin-top: 1%">
          <!--CONTENDOR PRINCIPAL    -->
<!--  COmponenete que muestra los campos de cada fomrulario   -->
<EditarFilaModalN   />
    <!-- Componente modal de edición -->



<div class="row shadow p-3"   style=" max-width: 1300px; "  >
      <div class="col-6">
          <alerta-suceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
         </div>
      <div class="col-6">
        <!--    VerGrabar
        <div v-show="NoVisible_2136">  
        <v-btn style="background-color:white;" prepend-icon="mdi-note-multiple"  block title="Grabar Datos" @click="obtenerValores" v-if="$store.state.permisos.includes(10)">
          Guardar 24</v-btn>
        </div>r-->
        <!--Listado de Botones-->
   
        <v-row>
          
        <div v-for="formulariobot of dabotones" :key="formulariobot.idConfigForm">
        <v-col cols="auto" class="col-3">
        <v-btn 
        :prepend-icon="formulariobot.icono"   
        block title="Grabar Datos"  
        :color="formulariobot.color"
        @click="handleClick(formulariobot.metodo)"
        v-if="$store.state.permisos.includes(9)">
        {{ formulariobot.texto }} 
        </v-btn>
        </v-col>
        </div>
        </v-row>
    </div>
</div>
<br>
<!-- Codigo propio de cada formulario -->
<div v-show="EsVisible_2136">
  <!-- Componente que busca medicmanentos de AlfABeta  -->    
  <BuscarMed />
  <!-- Componente que Lista medicmanentos de la CLinica  -->  
  <!--Listado de Grillas-->
  
  <!-- <grilla ref="listarMed"  :idConfig="42" />  -->
  <!-- ////////////////////////////////////

    <div class="row" >
          <div class="col  p-3  "></div>
          <div class="col  p-3  ">
            <v-btn prepend-icon="mdi-note-multiple "  class="bg-primary" block title="Grabar Datos" @click="GrabarMedicamento()" v-if="$store.state.permisos.includes(10)">
              Guardar medicamentos  
            </v-btn>
          </div>
          <div class="col  p-3  "></div>
    </div>        
--> 
 </div>

<!-- FIN Codigo propio de cada formulario -->

 <!--
  </form>
  -->
  <v-dialog
          v-model="VentanaGrabar"
          persistent
          width="500"
> 
<v-alert
        shaped
      color="#CCCCCC"
      theme="dark"
      icon="mdi-alert"
      density="compact"
      elevation="4"
      border="top"
    >
<!-- Alerta de confirmación personalizada -->
    <div v-if="mostrarAlertaGrabar"  role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
              <use xlink:href="#info-fill" />
          </svg>
          <div>
              <div class="row">
                  <div class="col  p-3 text-center ">    
              <v-btn @click="Grabar()" prepend-icon="mdi-cloud-upload" color="#FFFFFF"  >Confirma Grabar</v-btn>
        </div>
        <div class="col  p-3 text-center ">
        <v-btn  prepend-icon="mdi-cancel" color="#FF0000" @click="cerrarGrabar">   <v-spacer></v-spacer> Cancelar</v-btn>
      </div>
      </div>
          </div>
      </div>
      
      <!--fin alerta confirmacion obtenerValores-->
  </v-alert>
  </v-dialog>
  <!--
  Ventana modal donde se encuentra el boton grabar
  -->
  <v-dialog
          v-model="dialog"
          persistent
          
           fullscreen
           
  > 
  <v-card>
  <div class="row shadow p-3" >
     aca
  </div>
  
       <!-- Componente modal de edición -->hola
       <EditarFilaModalN v-if="dialog" :fila="filaAEditar" />
  <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="cerrarventana()"
            prepend-icon="mdi-close" 
          >
            CERRAR
          </v-btn>
        
        </v-card-actions>
        </v-card>
  </v-dialog>

 <br>
 <!-- aca grilla dinamica-->

 <div v-for="formulario of dagrilla" :key="formulario.idConfigForm">
    <grilla :ref="'grillaComponent' + formulario.idConfigForm"  :idConfig="formulario.metodo" /> 
  </div>
 <div v-show="NoVisible_2136">    
 </div>
      
      <!-- Alerta de confirmación personalizada -->
      <div v-if="mostrarAlertaEliminar" class="alert  d-flex align-items-center" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
              <use xlink:href="#info-fill" />
          </svg>
          <div>
              ¿Estás seguro de que deseas eliminar este registro?
              <button class="btn btn-danger btn-sm ms-3" @click="eliminarFila(idFilaAEliminar)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        Confirmar</button>
              <button class="btn btn-secondary btn-sm ms-2" @click="cancelarEliminacion">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
          viewBox="0 0 16 16">
          <path
            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
        </svg>
        Cancelar</button>
          </div>
      </div><!--fin alerta confirmacion-->
      <!-- Componente Alerta de suceso -->
      <AlertaSuceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
      </div>

     

  </div>
</div>  
</v-card>
<v-layout style=" max-width: 100%;" elevation="16">
        <v-footer class="d-flex flex-column w-100" style=" bottom:0px;max-width: 100%;">
          <v-card  class="px-4 py-2  text-center w-100" >
            <strong>© 2024 | Excelencia Digital Sotfware</strong>
            <v-spacer></v-spacer>
        </v-card>
        </v-footer>  
      </v-layout>  
</template>
<script>

import BuscarMed from '../components/BuscarMed.vue';
import ListarMed from '../components/ListarMed.vue';
import grilla from '../components/grilla.vue';
import EditarFilaModalN from '../components/EditarFilaModalN.vue';
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import EditarFilaModal from '../components/EditarFilaModal.vue';
import AlertaSuceso from '../components/AlertaSuceso.vue';
import Spinner from '@/components/Spinner.vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import DataTablesCore from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
DataTable.use(DataTablesCore);
DataTable.use(DataTablesCore);
DataTable.use(Select);
export default {

 
  name: 'ManagerGrillaView',
  components: {
      
      'barra-navegacion': BarraNavegacion,
      EditarFilaModal,
      BuscarMed,
      ListarMed,
      grilla,
      EditarFilaModalN,
      AlertaSuceso,
      'spinner': Spinner,

  },
  data() {
      return {
        dagrilla: null,
        dabotones: null,
        idUsuario: null,
          MedCodigo:"",
          MedPresentacion:"",
          MedNombre:"",
          MedPrecio:"",
          ListaFormulariosMed: null,
          ListaFormulariosArticulos: null,
          datosMed: null,
          isVisible: false,
          EsVisible_2136: false,
          NoVisible_2136: true,
          dialog: false, 
          dialogMed: false,
          VentanaGrabar: false,
          dafield: [],
          daform: [],
          _daform: [],
          titulo: null,
          datos: null, //Datos del Buscador
          datosArticulos: null,
         
          idConfigForm: null, // Inicializa idConfigForm en null
          dataHeaders: [], //inicializar arreglo para almacenar los encabezados
          dataValues: [], //inicializar arreglo para almacenar los datos table
          mostrarAlertaEliminar: false, // Controla la visibilidad de la alerta
          mostrarAlertaGrabar: false, // Controla la visibilidad de la alerta Grabar
          idFilaAEliminar: null, // Almacena el ID de la fila a eliminar
          mostrarAlertaSuceso: false, // Controla la visibilidad de la alerta
          mostrarModal: false,
          mensajeAlertaSuceso: "",//mensaje alerta de suceso vacio
          NoHayRegistros: false,
          MostrarSpinner : false,
          ListaFormularios: null,
          campo:'',
          buscar: '',
          nombre:'',
          Nombre:'',
          //ListaCombos:'',
          //ListaCombos: [],
         // ListaCombosI:'',
         // ListaCombosII:'',
          ComboListaTipoMedicamento:'',
          VarImportante: 'ListaCombos',
          detalleInternado:'',
          buscaruno:'',
          NroRegistro:'',
          Codigo:'',
          VerNR:'',
          Precio:'',
         
          
          
         
        

      };
  },
  computed: {
     
   
    
    ListaFormulariosArticulos() {
      //alert("Ingreso a Filter");
      const idFormulario = this.$route.params.idConfigForm;
      if(idFormulario == 2136){
        if (!this.datosArticulos) {
      return [];
    }
        return this.datosArticulos.filter(item => {
        return item.nombre.toLowerCase().includes(this.buscar.toLowerCase());
      });
    }
    },
   
         formTitle () {
            return this.Entrega  === 0 ? 'Gargar nuevos datos' : 'Modificar datos'
         },
     
         
        
      
     },
  mounted() {
    
      //this.setRoleAttribute();
     //this.fetch();
      //this.fetch_valores();
      //this.MostrarCombo();
      //console.log("aca");
     // console.log(this.$el);
     //$el.find('table').DataTable();
      
  },
  created() {
   
    this.idUsuario = this.$store.state.id_usuario;
    
    const idFormulario = this.$route.params.idConfigForm;
    if(idFormulario == 2136){
      this.EsVisible_2136 = true;
      this.NoVisible_2136 = false;
      //this.fetchArticulos();
      
    }
    //else{
      //this.fetch();
    //}
    //if(idFormulario == 2134){
      //this.EsVisible_2134 = true;
       //this.fetch();
      
    //}
    
    
    //this.fetch_valores();
    //this.MostrarCombo();
    //this.MostrarComboI();
    //this.MostrarComboII();
    //this.MostrarComboIII();
    //this.ComboTipoMedicamento();
    this.fetch_grilla();
    this.fetch_botones();
    
  },
  watch: {
  '$route.params.idConfigForm': function(newVal, oldVal) {
      this.fetch();

      this.refrescarPagina();
  }
},
  methods: {
    
    handleClick(functionName) {
    if (typeof this[functionName] === 'function') {
      this[functionName]();
    } else {
      console.error(`Function ${functionName} does not exist`);
    }
  },
  EliminarArticulos() {
    alert("Aca codigo para eliminar articulos");
    // Acciones específicas para funcion1
  },
 
    async fetch_grilla() {
     
    const idConfigForm = this.$route.params.idConfigForm;
    
    await this.axios.get(`/api/ConfigForm/ListaGrillas?pTipo=${idConfigForm}`)
      .then((respuesta) => {
        this.dagrilla = respuesta.data.lista;
        console.log("aca grilla");
        console.log(this.dagrilla);
        })
      .catch(err => {
        console.log(err);
      }).finally(() => {
       });
  },
  async fetch_botones() {
     
     const idConfigForm = this.$route.params.idConfigForm;
     await this.axios.get(`/api/ConfigForm/ListaBotones?pTipo=${idConfigForm}`)
       .then((respuesta) => {
         this.dabotones = respuesta.data.lista;
         })
       .catch(err => {
         console.log(err);
       }).finally(() => {
        });
   },
    VerArticulos(Listaform){
      //alert(Listaform.codigo);
      const inputCodigo = document.getElementsByName("Codigo")[0];
      inputCodigo.value = Listaform.codigo;
      const inputNroRegistro = document.getElementsByName("NroRegistro")[0];
      inputNroRegistro.value = Listaform.nroregistro;
      const pPrecio = document.getElementsByName("Precio")[0];
      pPrecio.value = Listaform.precio;
      const pNombre = document.getElementsByName("Nombre")[0];
      pNombre.value = Listaform.nombre;
      //this.ListaFormulariosMed = null;
    },
   
  async fetchArticulos() {
      
      //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idUsuario}`)
        .then((respuesta) => {
          this.ListaFormulariosArticulos = respuesta.data.lista
          this.datosArticulos = this.ListaFormulariosArticulos;
          console.log("Muestro ListaFormulariosArticulos")
          console.log(datosArticulos);     
        })
        .catch(err => {
          //console.log(err);
        });
    // this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
    },
    
      VerGrabar() {
          this.VentanaGrabar = true;
          this.mostrarAlertaGrabar = true;
      },
      cerrarGrabar() {
          this.VentanaGrabar = false;
      },
      
    //async MostrarCombo() {
    //const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2129")
    //  .then((respuesta) => {
   //     this.ListaCombos = respuesta.data.lista;
   //     if (this.ListaFormularios.length == 0) {
   //       this.NoHayRegistros = true
    //    }
   //   })
   //   .catch(err => {
  //      console.log(err);
  //    });
 // },   
  //async MostrarComboI() {
  //    const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2131")
  //    .then((respuesta) => {
  //      this.ListaCombosI = respuesta.data.lista;
  //      if (this.ListaFormularios.length == 0) {
   //       this.NoHayRegistros = true
   //     }
  //    })
  //    .catch(err => {
  //      console.log(err);
  //    });
  //}, 
  //async MostrarComboII() {
  //  const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2130")
  //    .then((respuesta) => {
 //       this.ListaCombosII = respuesta.data.lista;
 //       if (this.ListaFormularios.length == 0) {
 //         this.NoHayRegistros = true
 //       }
 //     })
 //     .catch(err => {
 //       console.log(err);
 //     });
//  }, 
  //async ComboTipoMedicamento() {
   //const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2130")
  //    .then((respuesta) => {
   //     this.ComboListaTipoMedicamento = respuesta.data.lista;
        //si no hay formularios en la respuesta de la api mostrar mensaje
   //     if (this.ListaFormularios.length == 0) {
  //        this.NoHayRegistros = true
  //      }
  //    })
 //     .catch(err => {
   //     console.log(err);
  //    });
  //}, 
  async MostrarComboIII() {
    
    //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
    const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2135")
      .then((respuesta) => {
        this.ListaCombosIII = respuesta.data.lista;
        
        //console.log("Lista Combos ListaCombosI");
        //console.log(this.ListaCombosII);
       
        //si no hay formularios en la respuesta de la api mostrar mensaje
        if (this.ListaFormularios.length == 0) {
          this.NoHayRegistros = true
        }
      })
      .catch(err => {
        console.log(err);
      });
      
          
    
  }, 
      
      async refrescarPagina() {

           
      // Recarga la página actual
      window.location.reload();
  },
  //async fetch_valores() {
   // this.MostrarSpinner = true;
  //  const idConfigForm = this.$route.params.idConfigForm;
  //  await this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
  //    .then((respuesta) => {
  //      this.daform = respuesta.data;
//this.dafield = respuesta.data.datosField;
       
   //   .catch(err => {
    //    console.log(err);
   //   }).finally(() => {
       
      //  this.MostrarSpinner = false;
     // });
//  },
  async fetch() {
          
          this.MostrarSpinner = true;
          const idFormulario = this.$route.params.idConfigForm;
          this.idConfigForm = idFormulario;
          await this.axios.get(`/api/ConfigForm/ListarDatos/${idFormulario}/${this.idUsuario}`)
          //await this.axios.get(`/api/ConfigForm/ListaRespuestas/${idFormulario}`)
          //await this.axios.get(`/api/ConfigForm/ListarMedicamentosClinicas?pIdClinica=${idFormulario}`)
              .then((respuesta) => {
                  let data = []; //declarar la variable data
                  data = respuesta.data.lista; //signarle a data el array de objetos recibidos de la api
                  this.ListaFormularios = respuesta.data.lista
                  this.datos = this.ListaFormularios;
                  //this.datos = this.data
                  //console.log("tabla");
                  //console.log (this.datos);
                  
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
//datos del formulario
              const idConfigForm = this.$route.params.idConfigForm;
          this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
              .then((respuesta) => {
              this.daform = respuesta.data;
              //codigo que que sea visible
              if(idConfigForm == 2136) 
              {
                this.EsVisible_2136 = true;
                      }
             
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
          this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
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
      //Fin Buscador
      mostrarConfirmacionEliminar(id_fila) {
          this.idFilaAEliminar = id_fila;
          this.mostrarAlertaEliminar = true;
      },
      mostrarConfirmacionGrabar() {
              this.mostrarAlertaGrabar = true;
      },

      eliminarFila(id_fila) {
          //solicitud a la api mediante axios
          this.axios.put(`/api/ConfigForm/Respuestas/Eliminar/${id_fila}`, {
              headers: {
                  //tipo de contenido enviado a la api
                  'Content-Type': 'application/json'
              }
          })
              .then(response => {
                  //manejo de respuesta del servidor ok
                  this.mostrarAlertaEliminar = false;
                  this.mostrarAlertaSuceso = true;
                  this.mensajeAlertaSuceso = "Eliminado exitosamente";
                  this.fetch();
                  //sacar alerta de suceso despues de los 2000 milisegundos
                  setTimeout(() => {
                   this.mostrarAlertaSuceso = false;
                  }, 2000);

              })
              .catch(error => {
                  //manejo de respuesta del servidor error
                  console.error(error);
              });
      },
      cancelarEliminacion() {
          this.mostrarAlertaEliminar = false;
      },
      cancelarGrabar() {
          this.mostrarAlertaGrabar = false;
      },
      
      mostrardialogEdicion(Datos) {
          this.filaAEditar = Datos;
          this.dialog = true;
          const idConfigForm = this.$route.params.idConfigForm;
          const _identificador =Datos[0];   
          this.axios.post(`/api/ConfigForm/AgregarContenido/${idConfigForm}/${_identificador}`)
         .then(datos => {
         
      });
      },
      mostrarModalEdicion(Datos) {
          this.filaAEditar = Datos;
          this.mostrarModal = true;
          //this.dialog = true;
          //alert(" Identificador "+Datos[0]);
          const idConfigForm = this.$route.params.idConfigForm;
          const _identificador =Datos[0];
          //alert(" Identificador "+ this.idConfigForm);
          //alert(idConfigForm);
          //alert(_identificador);
          
          this.axios.post(`/api/ConfigForm/AgregarContenido/${idConfigForm}/${_identificador}`)
         .then(datos => {
         this.mostrarAlertaEliminar = false;
         this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
         this.mostrarAlertaSuceso = true;
      

        setTimeout(() => {
                 this.mostrarAlertaSuceso = false;
              }, 5000);
      });
      },
      guardarEdicion() {
          this.mostrarModal = false;
          this.mensajeAlertaSuceso = "Modificado Correctamente";
         this.mostrarAlertaSuceso = true;
        
                
                 this.fetch();
                 //sacar alerta de suceso despues de los 1000 milisegundos
                 setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                 }, 3000);
      },
      MostrarNombresFormulario123(){
         
          this.MostrarSpinner = true;
          const idConfigForm = this.$route.params.idConfigForm;
          this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
              .then((respuesta) => {
              this.daform = respuesta.data;
              //this.dafield = respuesta.data.datosField;
              console.log(this.dafield);
              })
              .catch(err => {
              console.log(err);
              }).finally(() => {
              //finaliza el spinner
              // Ocultamos el spinner luego de finalizar la solicitud
              this.MostrarSpinner = false;
              });

      },
      obtenerValores() {

// Obtén una referencia al contenedor de campos dinámicos
var contenedor = document.getElementById("ContenedorDeCampos");

// Encuentra todos los elementos de formulario dentro del contenedor
var campos = contenedor.querySelectorAll("input[type='text'], textarea, input[type='number'], select, input[type='password'], input[type='date'], input[type='time'], input[type='email'], input[type='checkbox']");

// Crea un objeto para almacenar los valores
var valores = [];

//recuperar valor del idConfigForm
var idConfigForm = this.$route.params.idConfigForm;

// Recorre los campos y obtén sus valores
campos.forEach(function (campo) {
valores.push({
  id_ConfigForm: idConfigForm,  // Puedes ajustar este valor según tus necesidades
  id_Field: campo.getAttribute("identificador"),  // Utiliza getAttribute para obtener el valor de key
  valor: campo.value,
});
console.log("Muestro identificador");
console.log(campo.getAttribute("identificador"));
console.log("Muestro arreglos");
console.log(campo.value);
});
//enviar valores a la api
// Realiza una solicitud POST a la API para guardar los registros
this.axios.post('/api/ConfigForm/Respuestas/Guardar', valores)
.then((respuesta) => {

  //redirigir a la grilla dinamica
  //this.$router.push(`/grilla/${idConfigForm}`);
 
 //-----------
  this.mostrarAlertaGrabar = false;
  this.mostrarAlertaEliminar = false;
  this.mensajeAlertaSuceso = "Se Grabaron Correctamente los datos";
  this.mostrarAlertaSuceso = true;
  setTimeout(() => {
                 this.mostrarAlertaSuceso = false;
              }, 5000);
  this.fetch();
   //-----------

})
.catch(err => {
  console.log('Error al guardar los registros:', err);
});


},
BuscadorEnter(event) {
  // Acceder al contenido del input "NInternado"
  //alert("metodo enter");
  const contenidoNInternado = event.target.value;
  //alert(contenidoNInternado);
  // Asignar el contenido del input "NInternado" al input "DetalleInternado"
  const inputDetalleInternado = document.getElementsByName("detalleInternado")[0];
  if (contenidoNInternado) {
    inputDetalleInternado.value = "Riveros Hugo Adrian - Obra Social: Medife - Plan: Bronce";
  }
  else {
      //alert('Por favor ingresa un número antes de presionar "Enter"');
      inputDetalleInternado.value = "";
      this.mostrarModal = false;
         this.mensajeAlertaSuceso = "Por favor ingresa un número antes de presionar Enter";
         this.mostrarAlertaSuceso = true;
        //sacar alerta de suceso despues de los 1000 milisegundos
        setTimeout(() => {
        this.mostrarAlertaSuceso = false;
        }, 3000);
    }
  },
  BuscadorEnter24(event) {
  // Acceder al contenido del input "NInternado"
  //alert("metodo enter");
  const contenidoNInternado = event.target.value;
  //alert(contenidoNInternado);
  // Asignar el contenido del input "NInternado" al input "DetalleInternado"
  const inputDetalleInternado = document.getElementsByName("detalleInternado")[0];
  if (contenidoNInternado) {
    inputDetalleInternado.value = "Hola Programador";
  }
  else {
      alert('Por favor ingresa un número antes de presionar "Enter"');
    }
  },
  
  Prueba() {
      var respuesta = confirm('¿Estás seguro de que deseas continuar?');

if (respuesta) {
alert('El usuario hizo clic en "Aceptar"');
} else {
  alert('El usuario hizo clic en "Cancelar"');
}

      },
      cerrarModalEdicion() {
          this.mostrarModal = false;
         
          
          
      },
      metodograbar(){

      this.obtenerValores();
      this.VentanaGrabar = false;
      },
      cerrarventana(){
      //    alert("hola");
      this.dialog = false;
      this.fetch();
      
    },
      editarForm(){
      
      this.dialog = true;
     
      
    },
   
  asignarValorInput(valor, precio) {
    
    const observer = new MutationObserver(() => {
      const inputDetalleInternado = document.getElementsByName("NroRegistro")[0];
      const pPrecio = document.getElementsByName("Precio")[0];
      if (inputDetalleInternado) {
        inputDetalleInternado.value = valor;
        pPrecio.value = precio;
        observer.disconnect(); // Desconectar el observer después de asignar el valor
      }
    });

    // Configura el observer para observar cambios en el cuerpo del documento
    observer.observe(document.body, { childList: true, subtree: true });
  },
  async Grabar() {
        
    this.MostrarSpinner = true;
        // Obtén una referencia al contenedor de campos dinámicos
        var contenedor = document.getElementById("ContenedorDeCampos");
        // Encuentra todos los elementos de formulario dentro del contenedor
        var campos = contenedor.querySelectorAll("input[type='text'], textarea, input[type='number'], select, input[type='password'], input[type='date'], input[type='time'], input[type='email'], input[type='checkbox']");
        // Crea un objeto para almacenar los valores
        var valores = [];
        //recuperar valor del idConfigForm
        var idConfigForm = this.$route.params.idConfigForm;
        // Recorre los campos y obtén sus valores
        campos.forEach(function (campo) {
        valores.push({
        id_ConfigForm: idConfigForm,  // Puedes ajustar este valor según tus necesidades
        Campo: campo.getAttribute("v-model"),  // Utiliza getAttribute para obtener el valor de key
        valor: campo.value,
        tipo: campo.getAttribute("type"),
        });    
        
        });
      
        var variable = "";
        var variable_valor = "";
        var valor_sql = "";
        var v = "";
        for (var i = 0; i < valores.length; i++) {
          variable = variable +","+ valores[i].Campo;
          if((valores[i].tipo == "text")|| (valores[i].tipo == "date"))
            v = "'"+ valores[i].valor.replace(",", ".") +"'";
        else
        {
        v = valores[i].valor;
        v= v.replace(",", ".");
        }
          variable_valor = variable_valor+","+v;
          
        }
        console.log(idConfigForm);
        //console.log(variable.slice(1));
        //console.log(variable_valor.slice(1));
        var pvariable = variable + ", usuario";
        var pvariable_valor = variable_valor + ","+this.idUsuario;
        //console.log(pvariable.slice(1));
        //console.log(pvariable_valor.slice(1));  
       alert(pvariable.slice(1));
       alert(pvariable_valor.slice(1));
            await this.axios.post(`api/ConfigForm/AgregarTablas/${idConfigForm}/${pvariable.slice(1)}/${pvariable_valor.slice(1)}`)
            
            .then(datos => {
              this.mostrarAlertaEliminar = false;
              this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
              this.mostrarAlertaSuceso = true;
              this.VentanaGrabar = false;
              
             setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                     //refresca la pagina Props emits
              window.location.reload();
                  }, 5000);
            });
        
            this.MostrarSpinner = false;
          },
  async GrabarMedicamento() {
 
    ///////-------------------------------
    /////------obtener valores--------------
    //////----------------------------------
   var valor_codigo = "00";
   var valor_nombre = "00";
   var valor_nroregistro = "00";
   var valor_precio = "00";
   var valor_minimo = 0;
   var valor_medio = 0;
   var valor_maximo = 0;
   var valor_tipo = 0;
   var valor_sector = 0;
    // Obtén una referencia al contenedor de campos dinámicos
    var contenedor = document.getElementById("ContenedorDeCampos");
    // Encuentra todos los elementos de formulario dentro del contenedor
    var campos = contenedor.querySelectorAll("input[type='text'], textarea, input[type='number'], select, input[type='password'], input[type='date'], input[type='time'], input[type='email'], input[type='checkbox']");
    // Crea un objeto para almacenar los valores
    var valores = [];
    //recuperar valor del idConfigForm
    var idConfigForm = this.$route.params.idConfigForm;
    // Recorre los campos y obtén sus valores
    campos.forEach(function (campo) {
    valores.push({
    id_ConfigForm: idConfigForm,  // Puedes ajustar este valor según tus necesidades
    id_Field: campo.getAttribute("identificador"),  // Utiliza getAttribute para obtener el valor de key
    valor: campo.value,
    });
    if(campo.getAttribute("identificador") == 2245){
       valor_codigo = campo.value;
    }
    if(campo.getAttribute("identificador") == 2246){
      valor_nombre = campo.value;
    }
    if(campo.getAttribute("identificador") == 2247){
      valor_nroregistro = campo.value;
    }
    if(campo.getAttribute("identificador") == 2249){
      valor_precio = campo.value.replace(",", ".");;
    }
    if(campo.getAttribute("identificador") == 3253){
      valor_minimo = campo.value;
    }
    if(campo.getAttribute("identificador") == 3254){
      valor_medio = campo.value;
    }
    if(campo.getAttribute("identificador") == 3255){
      valor_maximo = campo.value;
    }
    if(campo.getAttribute("identificador") == 3251){
      valor_tipo = campo.value;
    }
    if(campo.getAttribute("identificador") == 3252){
      valor_sector = campo.value;
    }

    
    
    });
    //alert(valor_minimo);
    //////--------------------------------------
    //http://localhost:5045/api/ConfigForm/AgregarArticulos/${valor_codigo}/${valor_nombre}/${valor_precio}/${valor_nroregistro}/1/1/20/21/22/${this.idUsuario}/0?idtipo=1&idsector=1&stockminimo=20&sockmedio=21&stockmaximo=22&pusuario=${this.idUsuario}&pinstitucionid=0
    //////----------------------------------------
        //await this.axios.post(`/api/ConfigForm/AgregarArticulos/${valor_codigo}/${valor_nombre}/${valor_precio}/${valor_nroregistro}/1/1/${this.valor_minimo}/${this.valor_medio}/${this.valor_maximo}/${this.idUsuario}/0?idtipo=1&idsector=1&stockminimo=${this.valor_minimo}&sockmedio=${this.valor_medio}&stockmaximo=${this.valor_maximo}&pusuario=${this.idUsuario}&pinstitucionid=0`)
        await this.axios.post(`api/ConfigForm/AgregarArticulos/${valor_codigo}/${valor_nombre}/${valor_precio}/${valor_nroregistro}/${valor_tipo}/${valor_sector}/${valor_minimo}/${valor_medio}/${valor_maximo}/42/0?idtipo=${valor_tipo}&idsector=${valor_sector}&stockminimo=${valor_minimo}&sockmedio=${valor_medio}&stockmaximo=${valor_maximo}&pusuario=42&pinstitucionid=0`)
        
        .then(datos => {
          this.mostrarAlertaEliminar = false;
          this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
          this.mostrarAlertaSuceso = true;
          //this.fetch();
          //this.fetchArticulos();
          //this.$refs.grilla.fetchArticulosMed();
         // if (grillaComponent && typeof grillaComponent.fetchArticulosMed === 'function') {
      //grillaComponent.fetchArticulosMed();
    //} else {
     // console.error('La referencia al componente Grilla es nula o el método fetchArticulosMed no está definido');
    //}
          setTimeout(() => {
                   this.mostrarAlertaSuceso = false;
                }, 5000);
        });
    },
  
    AgregarMed(){
      
      this.dialogMed = true;
      
    },
      
      cerrarModal() {
         
          this.mostrarModal = false;
      }
      
  }
  
};

</script>
<style>
.custom-margin-botonN{
margin-left: 1px; /* Ajusta el valor según tus necesidades */
}
.table-container {
max-height: 520px; /* ajusta la altura máxima según tus necesidades */
overflow-y: auto;
}
.modal {
display: none;
position: fixed;
z-index: 1;
width: 100%;



}

.modal-content {

margin: 8% auto;
padding: 2px;

width: 100%;
text-align: center;
}

button {
margin: 5px;
padding: 10px 20px;
border: none;
cursor: pointer;
}

button:hover {
background-color: #ddd;
}

</style>