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
       <b> Tipo Primitivo Integer</b><br>
  
        Altas, bajas y modificaciones de Datos Integer
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
                  <v-text-field v-model="buscar" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                </div>
          </div>  
        </div>     
  
          
       <table :value="customers" class="table justify-center bg-blue darken-1 "    >
          <thead>
            <tr>
              <th ><v-chip class="justify-center primary">integer_id</v-chip></th>
              <th ><v-chip class="justify-center primary">default_value</v-chip></th>
              <th ><v-chip class="justify-center primary">value_list</v-chip></th>
              <th ><v-chip class="justify-center primary">min_configuration</v-chip></th>
              <th ><v-chip class="justify-center primary">min_value</v-chip></th>
              <th ><v-chip class="justify-center primary">max_configuration</v-chip></th>
              <th ><v-chip class="justify-center primary">max_value</v-chip></th>
              <th ><v-chip class="justify-center primary">assumed_value</v-chip></th>
              <th  ><v-chip class="justify-center primary">Ver Datos</v-chip></th>
            </tr>
          </thead>
          <tbody v-for="Listaform of ListaFormularios" :key="Listaform.integer_id">
            <tr>
              <td class="bg-white " >
                
                  <v-icon start icon="mdi-arrow-right" ></v-icon>  {{ Listaform.integer_id }}
             
            </td>
              <td class="bg-white "> {{ Listaform.default_value }}</td>
              <td  class="bg-white ">
                <v-chip class="justify-center bg-blue darken-1 sm"  color="#FFFFFF" elevation="4"   >
                    <b> {{ Listaform.value_list }}</b>
                </v-chip>
            </td>
              <td  class="bg-white ">{{ Listaform.min_configuration }}</td>
              <td  class="bg-white ">{{ Listaform.min_value }}</td>
              <td  class="bg-white ">{{ Listaform.max_configuration }}</td>
              <td  class="bg-white ">{{ Listaform.max_value }}</td>
              <td  class="bg-white ">{{ Listaform.assumed_value }}</td>
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
            <div class="container-sm" >
            <div class="row" >
              <div class="col  p-3 text-center ">
                <v-text-field  v-model="integer_id" label="Ingresar integer_id" variant="underlined"></v-text-field>
               </div>
              <div class="col  p-3 text-center">
                <v-text-field v-model="default_value" label="Ingresar default_value" variant="underlined"></v-text-field>
              </div>
              <div class="col  p-3 text-center">
                <v-text-field v-model="value_list" label="Ingresar value_list" variant="underlined"></v-text-field>
              </div>
              
        </div>
        <div class="row" >
          <div class="col  p-3 text-center">
              <v-text-field v-model="min_configuration" label="Ingresar min_configuration" variant="underlined"></v-text-field> 
              
          </div>
          <div class="col  p-3 text-center">
              <v-text-field v-model="min_value" label="Ingresar min_value" variant="underlined"></v-text-field>  
              
          </div>
          <div class="col  p-3 text-center">
              <v-text-field v-model="max_configuration" label="Ingresar max_configuration" variant="underlined"></v-text-field>  
            
          </div>
        </div>
        <div class="row" >
          <div class="col  p-3 text-center">
              <v-text-field v-model="max_value" label="Ingresar max_value" variant="underlined"></v-text-field> 
              
          </div>
          <div class="col  p-3 text-center">
              <v-text-field v-model="assumed_value" label="Ingresar assumed_value" variant="underlined"></v-text-field>  
              
          </div>
          <div class="col  p-3 text-center">
               
            
          </div>
        </div>
            </div>
            <div class="col  p-3 text-center">
          <v-btn @click="Agregar()" prepend-icon="mdi-cloud-upload" color="primary" >  Grabar</v-btn>
            
  
      
          <v-btn  prepend-icon="mdi-cancel" color="#FF0000" v-on:click="mostrarConfirmacionEliminar(this.string_id)" >   <v-spacer></v-spacer> Anular</v-btn>
             <!--alerta suceso-->
      
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
  
  import BarraNavegacion from '@/components/BarraNavegacion.vue';
  import Spinner from '@/components/Spinner.vue';
  import AlertaSuceso from '@/components/AlertaSuceso.vue';
  import DataTable from 'datatables.net-vue3'
  import Select from 'datatables.net-select';
  import DataTablesCore from 'datatables.net-bs5';
  import Buttons from 'datatables.net-buttons-bs5';
  import 'datatables.net-responsive-bs5';
  import { ref } from 'vue';

  
  DataTable.use(DataTablesCore);
  DataTable.use(DataTablesCore);
  DataTable.use(Select);

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

        integer_id:"",
        default_value:"",
        value_list:"",
        min_configuration:"",
        min_value:"",
        max_configuration:"",
        max_value:"",
        assumed_value:"",


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
          return item.value_list.toLowerCase().includes(this.buscar.toLowerCase());
          
        });
      },
           
          },
    methods: {
    
      
      onSelect(e, dt, type, indexes ){
        //var rowData = dt.rows( indexes ).data().toArray();
        this.string_id = indexes;
        this.dialog = true;
        console.log("aca estoy")
            console.log(dt);
          },
          Mostrar(V1, V2){
            this.Entrega = 0;
        this.dialog = true;
            this.string_id = V1;
            this.default_value =V2;
            
          },
      limpiar(){
        this.string_id = "";
        this.default_value ="";
        this.value_list ="";
      },
      nuevo(){
        this.Entrega = 0;
        this.dialog = true;
        this.integer_id = "";
        this.default_value ="";
        this.value_list ="";
        this.min_configuration ="";
        this.min_value ="";
        this.max_configuration ="";
        this.max_value ="";
        this.assumed_value ="";

      },
      cerrarventana(){
        this.dialog = false;
        this.fetch();
      },
      editar(Listaform){
        
        this.Entrega = 1;
        this.dialog = true;
        this.integer_id = Listaform.integer_id;
        this.default_value = Listaform.default_value;
        this.value_list = Listaform.value_list;
        this.min_configuration = Listaform.min_configuration;
        this.min_value = Listaform.min_value;
        this.max_configuration = Listaform.max_configuration;
        this.max_value = Listaform.max_value;
        this.assumed_value = Listaform.assumed_value;
      },
      async fetch() {
        
        this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
        const respuesta = await this.axios.get("/api/ConfigForm/ListaCamposInteger?pTipo=1")
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
    this.idConfigFormToDelete = this.integer_id; // Guarda el idConfigForm en data
    
      },
      cancelarEliminacion() {
        this.mostrarAlertaEliminar = false;
      },
     
      async Agregar() {
        if(this.Entrega == 1)//Modifica
          this.Modificar();//alert("Modiifca Campo");
          else
          this.Grabar();//alert("Agrega Campo");
      },
      async Grabar() {
        ///alert("Agrega Campo");
          //await this.axios.post(`/api/ConfigForm/AgregarCamposInteger/1/0/3000/1/1/1/1/1/1`)
          //Funciona Correcto
          //creo arreglo
           const arregloDatos = ref({}); 
           arregloDatos.value.default_value = this.default_value
           arregloDatos.value.value_list = this.value_list
           arregloDatos.value.min_configuration = this.min_configuration
           

          await this.axios.post(`/api/ConfigForm/AgregarCamposInteger/1/0/${this.default_value}/${this.value_list}/${this.min_configuration}/${this.min_value}/${this.max_configuration}/${this.max_value}/${this.assumed_value}`)
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
        
          await this.axios.put(`/api/ConfigForm/ModificaCamposInteger/1/${this.integer_id}/${this.default_value}/${this.value_list}/${this.min_configuration}/${this.min_value}/${this.max_configuration}/${this.max_value}/${this.assumed_value}`)
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
        await this.axios.put(`/api/ConfigForm/EliminaCampos/2/${this.idConfigFormToDelete}`)
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