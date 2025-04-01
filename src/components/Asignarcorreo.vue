<template>
    <div class="table-responsive">
        <v-dialog
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
              v-model="VentanaGrabar"
              persistent
              width="500"
    > 
    <v-alert
            shaped
          color="#FF0000"
          theme="dark"
          icon="mdi-alert"
          density="compact"
          elevation="4"
          border="top"
        >
        La notificacion se anulo correctamente
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
           shaped
          color="blue-grey"
         
         theme="dark"
         icon="mdi-arrow-right"
         density="compact"
         elevation="4"
         border="top"
       >
        <b>   Listado de personal que sera notificado  </b> 
    
        
       </v-alert>
       <div class="row bg-white" >
        <div class="col-md-5  p-3 text-center ">
            <v-text-field v-model="Nombre" label="Nombre" append-inner-icon="mdi-account" variant="underlined" size="small" ></v-text-field>
        </div>
        <div class="col-md-5  p-3 text-center ">
            <v-text-field v-model="Correo"  label="Correo" append-inner-icon="mdi-email-check-outline" variant="underlined" size="small" ></v-text-field>
        </div>
        <div class="col-md-2  p-3 text-center ">
            <v-btn @click="Grabar" prepend-icon="mdi-check" class="bg-primary" >Agregar</v-btn>
            </div>
      </div>  
    <div class="row bg-white" >
                <div class="col-md-4  p-3 text-center ">
                  
                  </div>
                  <div class="col-md-4  p-3 text-center ">
                   
                  </div>
                  <div class="col-md-4  p-3 text-center ">
                    <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>  
                  </div>
            </div>
            <div class="row bg-white" >
              <div class="col-md-12  p-1 text-center ">
        <table class="table table-striped bg-white text-left">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                <v-chip class="d-flex  darken-1 sm"   elevation="1"   > 
                {{ header }}
              </v-chip>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
              <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header] }}</td>
              <td>
              <v-btn @click="sendRowData(row)" color="primary" prepend-icon="mdi-check" ></v-btn>
            </td>
            </tr>
            
          </tbody>
        </table>
     
        <div class="pagination">
          <v-btn @click="prevPage" :disabled="currentPage === 1" class="bg-primary">Anterior</v-btn>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <v-btn @click="nextPage" :disabled="currentPage === totalPages" class="bg-primary">Siguiente</v-btn>
        </div>
  
  
  
      </div>
      
      </div>
        
      </div>
       <v-text-field   v-show="mostrarCampo"  v-model="CodMed" variant="underlined" block></v-text-field>
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
         rules: {
            email: (v) => /.+@.+\..+/.test(v) || "El correo electrónico no es válido",
          },
          nombre: '',
          MensajeOk : false,
          ListaFormulariosArticulos:'',
          rows: [],
          rows1: [],
          VentanaGrabar: false,
          id : "0",
          searchQuery: '',
          Institucion:'',
          Nombre: '',
          Corre: '',
          mostrarCampo: false, // Cambia a 'false' para hacerlo invisible
          currentPage: 1,
         
          CodMed:'',
          
          itemsPerPage: 3
        };
      },
      created() {
          this.idUsuario = this.$store.state.id_usuario;
         
          
      this.fetchArticulosMed();
      
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
        const keys = Object.keys(row);
        //alert(keys[0]); Nombre de la columna
        const entries = Object.entries(row);
        const primerpar = entries[0];  // Valor de la columna
        this.id =  primerpar[1];
      //alert("Grabar Proveedor" + this.id);
      await this.axios.put(`/api/ConfigForm/EliminaCampos/17/${this.id}`)
      
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
        this.MensajeOk = true;
        this. fetchArticulosMed(); 
      },
      async Grabar(){
        
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
        await this.axios.post(`/api/ConfigForm/AgregarAlertaCorreo?pnombre=${this.Nombre}&pcorreo=${this.Correo}&pcodigo=${this.remitoValue}&pinstitucionid=${IdTipo}`)
       
       .then(datos => {
         this.mostrarAlertaEliminar = false;
         this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
         this.mostrarAlertaSuceso = true;
          this.MensajeOk = true;
         setTimeout(() => {
                  this.mostrarAlertaSuceso = false;
               }, 5000);
       });
       this.MensajeOk = true;
       this.fetchArticulosMed();
       this.Nombre = "";
       this.Correo = "";
      },
      CerrarOk(){
        this.MensajeOk = false;
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
                
         const respuesta = await this.axios.get(`/api/ConfigForm/ListaProveedores?pTipo=3&pCodigo=${this.remitoValue}&pInstitucion=${IdTipo}`)
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
                 
          this.id_Field = Listaform.codigo;
           //Eliminar
        await this.axios.put(`/api/ConfigForm/EliminaCampos/16/${Listaform.codigo}`)
      
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
         const respuesta = await this.axios.get(`/api/ConfigForm/ListaProveedores?pTipo=2&pCodigo=${this.remitoValue}&pInstitucion=${IdTipo}`)
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
    
    