<template>
    <div class="table-responsive">
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
        <v-alert
           shaped  rounded="xl"
          color="blue-grey"
         
         theme="dark"
         icon="mdi-arrow-right"
         density="compact"
         elevation="4"
         border="top"
       >
        <b>   Asociar medicamentos  </b> 
    
        
       </v-alert>
      
    <div class="row bg-white" >
                <div class="col-md-4  p-3 text-center ">
                  <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                  </div>
                  <div class="col-md-4  p-3 text-center ">
                   
                  </div>
                  <div class="col-md-4  p-3 text-center ">
                      
                  </div>
            </div>
            <div class="row bg-white" >
              <div class="col-md-6  p-3 text-center ">
                Listado de medicamentos<br>
        <table class="table table-striped bg-white text-left">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                <v-chip class="d-flex  darken-1 sm bg-primary"   elevation="1"   > 
                {{ header }}
              </v-chip>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
              <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header] }}</td>
              <td>
              <v-btn @click="sendRowData(row)" color="primary" prepend-icon="mdi-check"  rounded="xl" ></v-btn>
            </td>
            </tr>
            
          </tbody>
        </table>
     
        <div class="pagination">
          <v-btn @click="prevPage" :disabled="currentPage === 1"  rounded="xl" class="bg-primary">Anterior</v-btn>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <v-btn @click="nextPage" :disabled="currentPage === totalPages"  rounded="xl" class="bg-primary">Siguiente</v-btn>
        </div>
  
  
  
      </div>
      <div class="col-md-6  p-3 text-center ">
          Medicamentos Asociados
          <br>
          <table class="table table-striped bg-white text-left">
            <thead >
              <tr>
                <th ><v-chip class=" bg-primary sm d-flex" elevation="1"  >codigo</v-chip></th>
                <th ><v-chip class=" bg-primary sm d-flex" elevation="1"  >nombre</v-chip></th>
               
                
              </tr>
            </thead>
            <tbody v-for="Listaform of rows1" :key="Listaform.codigo">
              <tr>
                <td class="bg-white " >
                  
                      {{ Listaform.codigo }}
               
              </td>
                <td class="bg-white ">
                  
                  {{ Listaform.nombre }}
       
                </td>
                
               
                <td class="nowrap bg-white " >
                  <div class="row">
                    <div class="col-auto">
                       <v-btn @click="editar(Listaform)"  rounded="xl" color="#FF0000" prepend-icon="mdi-trash-can-outline" class="sm"></v-btn>
                    </div>
                  
                  </div>
                </td>
              </tr>
           
           
            </tbody>
         
            
          </table>  
       
       
      </div>
      </div>
        
      </div>
       <v-text-field v-show="mostrarCampo"  v-model="CodMed" variant="underlined" block></v-text-field>
      </div>
    </template>
    
    <script>
    
    export default {
      props: {
      remitoValue: {
        type: String,
        required: true
      },
      codigoValue: {
        type: String,
        required: true
      }
      
    },
   
  
      data() {
        return {
          nombre: '',
          ListaFormulariosArticulos:'',
          rows: [],
          rows1: [],
          VentanaGrabar: false,
          mostrarCampo: false, // Cambia a 'false' para hacerlo invisible
          id : "0",
          searchQuery: '',
          Institucion:'',
          currentPage: 1,
         
          CodMed:'',
          
          itemsPerPage: 3
        };
      },
      created() {
          this.idUsuario = this.$store.state.id_usuario;
         
          
      this.fetchArticulosMed();
      this.ListaRelacion(); 
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
          //this.MostrarDatos();
          
        }
      },
      codigovalue(newVal) {
        if (newVal) {
         //alert("hola");         
        }
      },
      nombrevalue(newVal) {
        if (newVal) {
                  
        }
      }
    },
      methods: {
          async   TraeInstitucin(){
      //alert(this.idUsuario);
      let IdTipo = "";
  const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta) => {
  let data = []; //declarar la variable data
  this.datos = respuesta.data.lista
  data = respuesta.data.lista;
  data.forEach(item => { this.Institucion = item.codigo;   }); })
    .catch(err => { console.log(err); });
    },
        async  MostrarDatos(){ 
          
          const respuesta = await this.axios.get(`/api/ConfigForm/ListarDevolucionId?pTipo=${this.idUsuario}&pId=${this.remitoValue}`)
            .then((respuesta) => {
              //this.ListaFormulariosArticulos = respuesta.data.lista
              this.rows = respuesta.data.lista;
                  
            })
            .catch(err => {
              //console.log(err);
            });
        },
        ///Graba relacion Proveedores
        async sendRowData(row) {
           ////////////GRABAR//////////////
         let IdTipo = "";
  const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta1) => {
  let data = []; //declarar la variable data
  this.datos = respuesta1.data.lista
  data = respuesta1.data.lista;
  data.forEach(item => { IdTipo = item.codigo;   }); })
    .catch(err => { console.log(err); });
         //////////////////////////
        const keys = Object.keys(row);
        //alert(keys[0]); Nombre de la columna
        const entries = Object.entries(row);
        const primerpar = entries[0];  // Valor de la columna
        this.id =  primerpar[1];
      //alert("Grabar Medicamento" + this.id);
      await this.axios.post(`/api/ConfigForm/AgregarRelacionP?pTipo=2&pCodigo=${this.remitoValue}&pProveedor=${this.id}&pInstitucion=${IdTipo}`)
       
       .then(datos => {
         this.mostrarAlertaEliminar = false;
         this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
         this.mostrarAlertaSuceso = true;
          this.MensajeOk = true;
         setTimeout(() => {
                  this.mostrarAlertaSuceso = false;
               }, 5000);
       });
        
        this. ListaRelacion(); 
      },
      cerrarGrabar() {
              this.VentanaGrabar = false;
              window.location.reload();
          },
      async fetchArticulosMed() {
       
          //alert(this.remitoValue);
         //////////////////////////
         let IdTipo = "";
  const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta1) => {
  let data = []; //declarar la variable data
  this.datos = respuesta1.data.lista
  data = respuesta1.data.lista;
  data.forEach(item => { IdTipo = item.codigo;   }); })
    .catch(err => { console.log(err); });
         //////////////////////////
                
         const respuesta = await this.axios.get(`/api/ConfigForm/ListaProveedores?pTipo=5&pCodigo=0&pInstitucion=${IdTipo}`)
            .then((respuesta) => {
              //this.ListaFormulariosArticulos = respuesta.data.lista
              this.rows = respuesta.data.lista;
                 
            })
            .catch(err => {
              //console.log(err);
            });
        // this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
        },
  
  
      async  editar(Listaform){
              // alert(Listaform.codigo);  
          this.id_Field = Listaform.codigo;
           //Eliminar
        await this.axios.put(`/api/ConfigForm/EliminaCampos/18/${Listaform.codigo}`)
      
      .then(datos => {
        this.mostrarAlertaEliminar = false;
        this.mensajeAlertaSuceso = "Eliminado exitosamente";
        this.mostrarAlertaSuceso = true;
      
        //this.VentanaGrabar = true;
          // this.mostrarAlertaGrabar = true;
        //setTimeout(() => {
         //        this.mostrarAlertaSuceso = false;
           //   }, 5000);
              
      });
          this. ListaRelacion();
        },
  
  
        ///Lista Relacion
        async ListaRelacion() {
          //alert(this.remitoValue);
         //////////////////////////
         let IdTipo = "";
  const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta1) => {
  let data = []; //declarar la variable data
  this.datos = respuesta1.data.lista
  data = respuesta1.data.lista;
  data.forEach(item => { IdTipo = item.codigo;   }); })
    .catch(err => { console.log(err); });
         //////////////////////////
         //alert(this.remitoValue);
         const respuesta = await this.axios.get(`/api/ConfigForm/ListaProveedores?pTipo=4&pCodigo=${this.remitoValue}&pInstitucion=${IdTipo}`)
            .then((respuesta) => {
              //this.ListaFormulariosArticulos = respuesta.data.lista
              this.rows1 = respuesta.data.lista;
              console.table("lo que tenes     quwe mirar");
              console.table(this.rows1);
                 
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
    </style>
    
    