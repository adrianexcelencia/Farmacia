<template >
  
    <barra-navegacion></barra-navegacion>
      <spinner :visible="MostrarSpinner"></spinner>
      <div v-if="!MostrarSpinner">
          
          
          <div >
          
          <!--Titulo del Formulario-->
         
          
      <div class="container-sm">
        <v-alert
          shaped
        color="#006699"
        theme="dark"
        icon="mdi-domain"
        density="compact"
        elevation="4"
        border="top"
      >
       <b> Tipo Primitivo Time</b><br>
  
       Altas, bajas y modificaciones de Time String
      </v-alert>
      
      <div class="shadow p-3 mb-2 bg-white rounded table-container text-sm container-sm" v-if="$store.state.permisos.includes(11) & !NoHayRegistros">
          <!-- Tabla del Formulario -->
           <div class="row" >
              <div class="col  p-3 text-center ">
                <v-btn @click="nuevo" prepend-icon="mdi-cloud-upload" color="#1E88E5" >Nuevo</v-btn>
                </div>
                <div class="col  p-3 text-center ">
                 
                </div>
                <div class="col  p-3 text-center ">
                  <v-text-field v-model="buscar" label="Buscador default_value" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                </div>
          </div>  
        </div>     
  
          
       <table :value="customers" class="table justify-center bg-blue darken-1 "  color="#006699"  >
          <thead>
            <tr>
              <th ><v-chip class="justify-center primary">time_id</v-chip></th>
              <th ><v-chip class="justify-center primary">enable_format</v-chip></th>
              <th ><v-chip class="justify-center primary">use_time_format</v-chip></th>
              <th ><v-chip class="justify-center primary">time_format</v-chip></th>
              <th ><v-chip class="justify-center primary">value_list</v-chip></th>
              <th ><v-chip class="justify-center primary">use_range</v-chip></th>
              <th  ><v-chip class="justify-center primary">Ver Datos</v-chip></th>
            </tr>
          </thead>
          <tbody v-for="Listaform of ListaFormularios" :key="Listaform.time_id">
            <tr>
              <td class="bg-white " >
                
                  <v-icon start icon="mdi-arrow-right" ></v-icon>  {{ Listaform.time_id }}
             
            </td>
              <td class="bg-white ">
                {{ Listaform.enable_format }}
              </td>
              <td  class="bg-white ">{{ Listaform.use_time_format }}</td>
              <td  class="bg-white "> <v-chip class="justify-center bg-blue darken-1 sm"  color="#FFFFFF" elevation="4"   >
               <b>{{ Listaform.time_format }}</b>
              </v-chip></td>
              <td  class="bg-white ">{{ Listaform.value_list }}</td>
              <td  class="bg-white ">{{ Listaform.use_range }}</td>
              <td class="nowrap bg-white " >
                <div class="row">
                  <div class="col-auto">
                     <v-btn @click="editar(Listaform)" color="#1E88E5" prepend-icon="mdi-open-in-new" class="sm"></v-btn>
                  </div>
                
                </div>
              </td>
            </tr>
         
         
          </tbody>
       
          
        </table>  
        </div>  
      </div>    
          
            <!-- <datatables :data="ListaFormularios" class="table" style="width:80%">
              <thead>
            <tr>
              <th >ID</th>
              <th >Titulo del formulario</th>
              <th >Descripcion</th>
              <th  >Acciones</th>
            </tr>
          </thead>
            </datatables> --> 
            <!-- Iconos
            https://vuetifyjs.com/en/components/icons/#semantic-svg-icons
  
            <v-icon icon="mdi-home" />
            <v-icon icon="mdi-arrow-left" />
            <v-icon icon="mdi-arrow-right" />
            <v-icon icon="mmdi-wrench" />
            <v-icon icon="mdi-thumb-up" />
            <v-icon icon="mdi-minus-circle" />
            <v-icon end icon="mdi-cancel"></v-icon>
            <v-icon end icon="mdi-checkbox-marked-circle"></v-icon>
            <v-icon size="large" color="green-darken-2" icon="mdi-domain" ></v-icon>
            <v-icon size="large" color="orange-darken-2" icon="mdi-arrow-up-bold-box-outline" ></v-icon>
            
            -->
  
           <p></p> <p></p>    
           <v-dialog
            v-model="dialog"
            persistent
            
             fullscreen
             
            >    
            <v-card>
              <v-card elevation="4" color="#006699">
       
      
       <b><br> -  {{ formTitle }}<br><br></b>
      </v-card>
      <br><br><br>  
      <v-form fast-fail @submit.prevent>
            <div class="container-sm" >
            <div class="row" >
              <div class="col  p-3 text-center ">
                <v-text-field  v-model="time_id" label="Ingresar time_id" variant="underlined"></v-text-field>
               </div>
              <div class="col  p-3 text-center">
                <v-checkbox
            v-model="enable_format"
            label="enable_format"
            color="primary"
            ></v-checkbox>
                
              </div>
              <div class="col  p-3 text-center">
                
                <v-checkbox
            v-model="use_time_format"
            label="use_time_format"
            color="primary"
            ></v-checkbox>  
            </div>
            <div class="col  p-3 text-center">
              <v-text-field v-model="time_format" label="Ingresar time_format" variant="underlined"></v-text-field> 
              
          </div>
          <div class="col  p-3 text-center">
              <v-text-field v-model="value_list" label="Ingresar value_list" variant="underlined"></v-text-field>  
              
          </div>
         
              
        </div>
      
        <div class="row" >
            <div class="col  p-3 text-center">
              
              <v-checkbox
            v-model="use_range"
            label="use_range"
            color="primary"
            ></v-checkbox>  
          </div>
            <div class="col  p-3 text-center">
              <v-text-field v-model="lower_time" label="Ingresar lower_time" variant="underlined"></v-text-field>  
              
          </div>
          <div class="col  p-3 text-center">
              <v-text-field v-model="upper_time" label="Ingresar upper_time" variant="underlined"></v-text-field>  
              
          </div>
          <div class="col  p-3 text-center">
              <v-text-field v-model="assume_value" label="Ingresar assume_value" variant="underlined"></v-text-field>  
              
          </div>
            <div class="col  p-3 text-center">
              
              <v-checkbox
            v-model="upper_bound"
            label="upper_bound"
            color="primary"
            ></v-checkbox>  
          </div>
          <div class="col  p-3 text-center">
              
              <v-checkbox
            v-model="lower_bound"
            label="lower_bound"
            color="primary"
            ></v-checkbox>  
          </div>
         </div>
            </div>
            <div class="col  p-3 text-center">
               
          <v-btn @click="Agregar()" prepend-icon="mdi-cloud-upload" color="primary" >  Grabar</v-btn>
          <v-btn  prepend-icon="mdi-cancel" color="#FF0000" v-on:click="mostrarConfirmacionEliminar(this.time_id)" >   <v-spacer></v-spacer> Anular</v-btn>
          </div>
          <!--alerta suceso-->
        </v-form>
 <div class="col  p-3 text-center">
            
      <br><br>
             <alerta-suceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
      <!--fin alerta suceso-->
           <!-- Alerta de confirmación personalizada -->
      <div v-if="mostrarAlertaEliminar" class="alert alert-primary d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
          <use xlink:href="#info-fill" />
        </svg>
        <div>
          ¿Estás seguro de que deseas eliminar este registro?
          <button class="btn btn-outline-danger btn-sm ms-3" @click="eliminarform(idConfigFormToDelete)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Confirmar</button>
          <button class="btn btn-outline-secondary btn-sm ms-2" @click="cancelarEliminacion">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
              viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
            </svg>
            Cancelar</button>
        </div>
      </div> <!--fin alerta confirmacion-->
   </div>
            <v-card-actions>
            <v-spacer></v-spacer>
            
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
      <div class="container-sm">
         
  <div class="row">
   
          
   
  
  
  </div>
  
          
  
  
         
          
  
   
          
            <!--
            <div class="shadow p-3 mb-5 bg-white rounded table-container text-sm" v-if="$store.state.permisos.includes(11) & !NoHayRegistros">
         
            
            {{ ListaFormularios }} 
            
         
           
            {{ ListaFormularios }} 
    </div>
    @select="editar(ListaFormularios)"
        
  <DataTable 
            
            
            :data="ListaFormularios" 
            :columns="columns" 
            ref="tableCom"
             class="Dysplay"
             
             @select="editar(ListaFormularios)"
            
             :options="{
            
             
              
              select:true,
              responsive: true,
              autoWidth:false,
              lengthMenu: [5,20,50],
              columnDefs: [
              { orderable: false, targets: [3] },
              { width: '40%', targets: [1] },
              { width: '30%', targets: [3] },
              ],
              
              language: {
                  processing: 'Procesando...',
                  lengthMenu: 'Mostrar _MENU_ registros',
                  zeroRecords: 'No se encontraron resultados',
                  emptyTable: 'Ningún dato disponible en esta tabla',
                  infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
                  infoFiltered: '(filtrado de un total de _MAX_ registros)',
                  search: 'Buscar:',
                  infoThousands: ',',
                  loadingRecords: 'Cargando...',
                  paginate: {
                  first: 'Primero',
                  last: 'Último',
                  next: 'Siguiente',
                  previous: 'Anterior',
                  },
                  aria: {
                  sortAscending: ': Activar para ordenar la columna de manera ascendente',
                  sortDescending: ': Activar para ordenar la columna de manera descendente',
                  },
                  buttons: {
                  copy: 'Copiar',
                  colvis: 'Visibilidad',
                  collection: 'Colección',
                  colvisRestore: 'Restaurar visibilidad',
                  copyKeys:
                      'Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.',
                  copySuccess: {
                      1: 'Copiada 1 fila al portapapeles',
                      _: 'Copiadas %ds fila al portapapeles',
                  },
                  copyTitle: 'Copiar al portapapeles',
                  csv: 'CSV',
                  excel: 'Excel',
                  pageLength: {
                      '-1': 'Mostrar todas las filas',
                      _: 'Mostrar %d filas',
                  },
                  pdf: 'PDF',
                  print: 'Imprimir',
                  renameState: 'Cambiar nombre',
                  updateState: 'Actualizar',
                  createState: 'Crear Estado',
                  removeAllStates: 'Remover Estados',
                  removeState: 'Remover',
                  savedStates: 'Estados Guardados',
                  stateRestore: 'Estado %d',
                  },
                  autoFill: {
                  cancel: 'Cancelar',
                  fill: 'Rellene todas las celdas con <i>%d</i>',
                  fillHorizontal: 'Rellenar celdas horizontalmente',
                  fillVertical: 'Rellenar celdas verticalmentemente',
                  },
                  decimal: ',',
                  searchBuilder: {
                  add: 'Añadir condición',
                  button: {
                      0: 'Constructor de búsqueda',
                      _: 'Constructor de búsqueda (%d)',
                  },
                  clearAll: 'Borrar todo',
                  condition: 'Condición',
                  conditions: {
                      date: {
                      after: 'Despues',
                      before: 'Antes',
                      between: 'Entre',
                      empty: 'Vacío',
                      equals: 'Igual a',
                      notBetween: 'No entre',
                      notEmpty: 'No Vacio',
                      not: 'Diferente de',
                      },
                      number: {
                      between: 'Entre',
                      empty: 'Vacio',
                      equals: 'Igual a',
                      gt: 'Mayor a',
                      gte: 'Mayor o igual a',
                      lt: 'Menor que',
                      lte: 'Menor o igual que',
                      notBetween: 'No entre',
                      notEmpty: 'No vacío',
                      not: 'Diferente de',
                      },
                      string: {
                      contains: 'Contiene',
                      empty: 'Vacío',
                      endsWith: 'Termina en',
                      equals: 'Igual a',
                      notEmpty: 'No Vacio',
                      startsWith: 'Empieza con',
                      not: 'Diferente de',
                      notContains: 'No Contiene',
                      notStartsWith: 'No empieza con',
                      notEndsWith: 'No termina con',
                      },
                      array: {
                      not: 'Diferente de',
                      equals: 'Igual',
                      empty: 'Vacío',
                      contains: 'Contiene',
                      notEmpty: 'No Vacío',
                      without: 'Sin',
                      },
                  },
                  data: 'Data',
                  deleteTitle: 'Eliminar regla de filtrado',
                  leftTitle: 'Criterios anulados',
                  logicAnd: 'Y',
                  logicOr: 'O',
                  rightTitle: 'Criterios de sangría',
                  title: {
                      0: 'Constructor de búsqueda',
                      _: 'Constructor de búsqueda (%d)',
                  },
                  value: 'Valor',
                  },
                  searchPanes: {
                  clearMessage: 'Borrar todo',
                  collapse: {
                      0: 'Paneles de búsqueda',
                      _: 'Paneles de búsqueda (%d)',
                  },
                  count: '{total}',
                  countFiltered: '{shown} ({total})',
                  emptyPanes: 'Sin paneles de búsqueda',
                  loadMessage: 'Cargando paneles de búsqueda',
                  title: 'Filtros Activos - %d',
                  showMessage: 'Mostrar Todo',
                  collapseMessage: 'Colapsar Todo',
                  },
                  
                  thousands: '.',
                  datetime: {
                  previous: 'Anterior',
                  next: 'Proximo',
                  hours: 'Horas',
                  minutes: 'Minutos',
                  seconds: 'Segundos',
                  unknown: '-',
                  amPm: ['AM', 'PM'],
                  months: {
                      0: 'Enero',
                      1: 'Febrero',
                      10: 'Noviembre',
                      11: 'Diciembre',
                      2: 'Marzo',
                      3: 'Abril',
                      4: 'Mayo',
                      5: 'Junio',
                      6: 'Julio',
                      7: 'Agosto',
                      8: 'Septiembre',
                      9: 'Octubre',
                  },
                  weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                  },
                  editor: {
                  close: 'Cerrar',
                  create: {
                      button: 'Nuevo',
                      title: 'Crear Nuevo Registro',
                      submit: 'Crear',
                  },
                  edit: {
                      button: 'Editar',
                      title: 'Editar Registro',
                      submit: 'Actualizar',
                  },
                  remove: {
                      button: 'Eliminar',
                      title: 'Eliminar Registro',
                      submit: 'Eliminar',
                      confirm: {
                      _: '¿Está seguro que desea eliminar %d filas?',
                      1: '¿Está seguro que desea eliminar 1 fila?',
                      },
                  },
                  
                  multi: {
                      title: 'Múltiples Valores',
                      info: 'Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.',
                      restore: 'Deshacer Cambios',
                      noMulti:
                      'Este registro puede ser editado individualmente, pero no como parte de un grupo.',
                  },
                  },
                  info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
                  stateRestore: {
                  creationModal: {
                      button: 'Crear',
                      name: 'Nombre:',
                      order: 'Clasificación',
                      paging: 'Paginación',
                      search: 'Busqueda',
                      select: 'Seleccionar',
                      columns: {
                      search: 'Búsqueda de Columna',
                      visible: 'Visibilidad de Columna',
                      },
                      title: 'Crear Nuevo Estado',
                      toggleLabel: 'Incluir:',
                  },
                  emptyError: 'El nombre no puede estar vacio',
                  removeConfirm: '¿Seguro que quiere eliminar este %s?',
                  removeError: 'Error al eliminar el registro',
                  removeJoiner: 'y',
                  removeSubmit: 'Eliminar',
                  renameButton: 'Cambiar Nombre',
                  renameLabel: 'Nuevo nombre para %s',
                  duplicateError: 'Ya existe un Estado con este nombre.',
                  emptyStates: 'No hay Estados guardados',
                  removeTitle: 'Remover Estado',
                  renameTitle: 'Cambiar Nombre Estado',
                  },
              },
  
              }" >
              <thead>
                  <tr>
              <th >ID</th>
              <th >Titulo del formulario</th>
              <th >Descripcion</th>
              <th >Acciones</th>
            </tr>
              </thead>
              
              
              
      </DataTable>
   --> 
          
   
      
      <!-- Nueva tabla-->
  
  
        <!-- Busqueda con tarjetas
      <div class="container cont">
  
  <div class="row">
  
    <div class="col-md-12">
    
     
      
      <input type="text" v-model="buscar" class="form-control" placeholder="Ejemplo: Charmander"/>              
  
    </div>
  
  </div>
  
  <div class="row mt-3">
  
    <div class="col-md-4" v-for="item in ListaFormularios" v-bind:key="item.idConfigForm"> 
  
      <div class="card mb-3">
        
        <div class="card-body">
          <h3 class="card-title mb-3">{{ item.titulo }}</h3>
          <p class="card-text">
            <strong>Tipo:</strong> {{ item.idConfigForm }} 
          </p>
          <p class="card-text">
            <strong>Tipo:</strong> {{ item.descripcion }} 
          </p>
          
        </div>
        <v-btn @click="Mostrar(  item.titulo, item.descripcion)" color="primary" prepend-icon="mdi-open-in-new"></v-btn>
      </div>
  
    </div>
  
  </div>
  
  </div>
      -->
  
  
  </div>    
  </div>

  <v-layout style=" max-width: 100%;">
          <v-footer class="d-flex flex-column w-100" style=" bottom:0px;max-width: 100%;">
    <v-card  class="px-4 py-2 bg-primary text-center w-100" elevation="16">
      <strong>© 2024 | Excelencia Digital Sotfware</strong>

      <v-spacer></v-spacer>

    
    </v-card>

 
  </v-footer>  
</v-layout> 
  </template>
  <script>
  
  //import datos from "../assets/json/pokemones.json";
  
  import BarraNavegacion from '@/components/BarraNavegacion.vue';
  import Spinner from '@/components/Spinner.vue';
  import AlertaSuceso from '@/components/AlertaSuceso.vue';
  import DataTable from 'datatables.net-vue3'
  import Select from 'datatables.net-select';
  import DataTablesCore from 'datatables.net-bs5';
  import Buttons from 'datatables.net-buttons-bs5';
  import 'datatables.net-responsive-bs5';
  
  
  
  import { ref } from 'vue';
  //import { computed , onMounted, ref } from "vue";
  
   DataTable.use(DataTablesCore);
  DataTable.use(DataTablesCore);
  DataTable.use(Select);
  
  
  //const props = defineProps({
   ////   employees:{type: Object}, ListaFormularios:{type: Object},
  
  //});
  //const keyword = ref('');
  //const ListaFormularios = ref([]);
  //const computedListaform = computed(() => ListaFormularios.value.filter(i => i.nombre.toLowerCase().includes(keyword.value.toLowerCase())))
  const table = ref();
  export default {
    arreglobuscador: [],
    name: 'TableCom',
    name: "Formularios",
    components: {
      'spinner': Spinner,
      'barra-navegacion': BarraNavegacion,
      'alerta-suceso': AlertaSuceso,
       DataTable
    },
    name: 'Pokemones',
    props: {
      msg: String
    },
    
    data: function () {
      return {



        buscar: '',
        filter: null,
        filterOn: [],
        selected: [],
        arreglobuscador: [],
        dialog: false,  
        selectedId: -1,
          selectedRow: '',
          //************ */
       //***Control de texto */
       lengthRules: [
        value => {
          if (  /[0-9-]+/.test(value) && value?.length < 10) return true
            return 'Acepta valores numericos y hasta 10 digitos.'
        },
      ],
       //************ */ 
          
        columns:[
          {data:'idConfigForm',text: 'idConfigForm', value: 'idConfigForm', sortable: true},
          {data:'titulo',text: 'titulo', value: 'titulo', sortable: true},
          {data:'descripcion', text: 'descripcion', value: 'descripcion', sortable: true },
          {data:null,
          render: function (data, type, row, meta) {
            return `-`
          }}
        ], 
        titulo_Modal:"",
        Id: null, 
        datos: null,
        ListaFormularios: null,
        MostrarSpinner: false,
        NoHayRegistros: false,
        mostrarAlertaEliminar: false,
        mostrarAlertaSuceso: false,
        mensajeAlertaSuceso:"",
        idConfigFormToDelete: null,
        time_id:"",
        enable_format: 0,
        use_time_format: 0,
        time_format: "",
        value_list: "",
        use_range: 0,
        upper_bound: 0,
        upper_time:"",
        lower_bound:0,
        lower_time:"",
        assume_value:"",

        VerDatos: "",
        Entrega:0,
        
      }
    },
    created() {
      
      this.fetch();
      
    },
    computed: {
             
   
              formTitle () {
                 return this.Entrega  === 0 ? 'Gargar nuevos datos' : 'Modificar datos'
              },
          
              ListaFormularios() {
                
                return this.datos.filter(item => {
          return item.time_format.toLowerCase().includes(this.buscar.toLowerCase());
          
        });
      },
           
          },
    methods: {
    
      
      onSelect(e, dt, type, indexes ){
        //var rowData = dt.rows( indexes ).data().toArray();
        this.time_id = indexes;
        this.dialog = true;
        console.log("aca estoy")
            console.log(dt);
          },
          Mostrar(V1, V2){
            this.Entrega = 0;
        this.dialog = true;
            this.time_id = V1;
            this.default_value =V2;
            
          },
      limpiar(){
        this.time_id = "";
        this.default_value ="";
        this.value_list ="";
      },
      nuevo(){
        this.Entrega = 0;
        this.dialog = true;
        this.time_id = "";
        this.enable_format =0;
        this.use_time_format =0;
        this.time_format = "";
        this.value_list = "";
        this.use_range = 0;
        this.lower_time= "";
        this.upper_time ="";
        this.assume_value ="";
        this.upper_bound = 0;
        this.lower_bound = 0;
      },
      cerrarventana(){
        this.dialog = false;
        this.fetch();
      },
      editar(Listaform){
        
        this.Entrega = 1;
        this.dialog = true;
        this.time_id = Listaform.time_id;
        //this.enable_format = Listaform.enable_format;
        if(Listaform.enable_format == 0) // -asignar valor al Check false
        this.enable_format = false;
      else
        this.enable_format = true;
        //this.use_time_format = Listaform.use_time_format;
        if(Listaform.use_time_format == 0) // -asignar valor al Check false
        this.use_time_format = false;
      else
        this.use_time_format = true;
        this.time_format = Listaform.time_format;
        this.value_list = Listaform.value_list;
        //this.use_range = Listaform.use_range;
        if(Listaform.use_range == 0) // -asignar valor al Check false
        this.use_range = false;
      else
        this.use_range = true;

        //this.upper_bound = Listaform.upper_bound;
        if(Listaform.upper_bound == 0) // -asignar valor al Check false
        this.upper_bound = false;
      else
        this.upper_bound = true;
        this.upper_time = Listaform.upper_time;
        //this.lower_bound = Listaform.lower_bound;
        if(Listaform.lower_bound == 0) // -asignar valor al Check false
        this.lower_bound = false;
      else
        this.lower_bound = true;
        
        this.lower_time = Listaform.lower_time;
        this.assume_value = Listaform.assume_value;
      },
      async fetch() {
        
        this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
        const respuesta = await this.axios.get("/api/ConfigForm/ListaCamposTime?pTipo=1")
          .then((respuesta) => {
            this.ListaFormularios = respuesta.data.lista
            this.datos = this.ListaFormularios;
            console.log("Importante");
            console.table(this.datos);
           
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
      mostrarConfirmacionEliminar(Entrega) {
        this.mostrarAlertaEliminar = true;
    this.idConfigFormToDelete = this.time_id; // Guarda el idConfigForm en data
    
      },
      cancelarEliminacion() {
        this.mostrarAlertaEliminar = false;
      },
     
      async Agregar() {
        //Controlde campos antes de grabar
        //if (this.length.length > 9 && /[0-9-]+/.test(this.length) ) {
          //  alert("Hola");
           // return;
       // }
        if(this.Entrega == 1)//Modifica
          this.Modificar();//alert("Modiifca Campo");
          else
          this.Grabar();//alert("Agrega Campo");
      },
      async Grabar() {
        
        //alert("Agrega Campo");
          //await this.axios.post(`/api/ConfigForm/AgregarCampos/1/0/${this.default_value}/${this.value_list}/${this.mask_library}/${this.assumed_value}/${this.length}`)
          //pTipo:int}/{pdate_id:int}/{penable_format}/{use_date_format}/{date_format}/{value_list}/{use_range}/{upper_bound}/{upper_date}/{lower_bound}/{plower_date}/{passume_value}
          
          
          //await this.axios.post(`/api/ConfigForm/AgregarCamposDate/2/0/${this.enable_format}/1/1/1/1/1/1/1/1/1`)
          await this.axios.post(`/api/ConfigForm/AgregarCamposDate/2/0/${this.enable_format}/${this.use_time_format}/${this.time_format}/${this.value_list}/${this.use_range}/${this.upper_bound}/${this.upper_time}/${this.lower_bound}/${this.lower_time}/${this.assume_value}`)
          .then(datos => {
            this.mostrarAlertaEliminar = false;
            this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
            this.mostrarAlertaSuceso = true;
            //this.fetch();
  
            setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                  }, 5000);
          });
      },
      async Modificar() {
        //alert(this.use_time_format);
        //int pTipo, int pdate_id, int penable_format, int puse_date_format, string pdate_format, string pvalue_list, int puse_range, int pupper_bound, string pupper_date, int plower_bound, string plower_date, string passume_value
        await this.axios.put(`/api/ConfigForm/ModificarCamposDate/2/${this.time_id}/${this.enable_format}/${this.use_time_format}/${this.time_format}/${this.value_list}/${this.use_range}/${this.upper_bound}/${this.upper_bound}/${this.lower_bound}/${this.lower_time}/${this.assume_value}`)
        ////api/ConfigForm/ModificarCamposDate/2/1/1/1/9966/4455/1/1/1/1/1/1
        ///api/ConfigForm/ModificaCampos/1/2/1/1/1/1/1
        //await this.axios.put(`/api/ConfigForm/ModificarCamposDate/2/${this.time_id}/${this.enable_format}/${this.use_time_format}/${this.time_format}/${this.value_list}/${this.use_range}/${this.upper_bound}/${this.upper_time}/${this.lower_bound}/${this.lower_time}/${this.assumed_value}`)
          .then(datos => {
            this.mostrarAlertaEliminar = false;
            this.mensajeAlertaSuceso = "Los datos se modificaron correctamente";
            this.mostrarAlertaSuceso = true;
            //this.fetch();
  
            setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                  }, 5000);
          });
      },
      async eliminarform(idConfigFormToDelete) {
        await this.axios.put(`/api/ConfigForm/EliminaCampos/7/${this.idConfigFormToDelete}`)
        //await this.axios.put(`/api/ConfigForm/EliminaCampos/1/1`)
          .then(datos => {
            this.mostrarAlertaEliminar = false;
            this.mensajeAlertaSuceso = "Eliminado exitosamente";
            this.mostrarAlertaSuceso = true;
            //this.fetch();
  
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
  </style>