<template>
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
      El ingreso se anulo correctamente
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
        color="#5f968E"
       
       theme="dark"
       icon="mdi-arrow-right"
       density="compact"
       elevation="4"
       border="top"
     >
      <b>   Listado de ingreso de medciamentos  </b> 
  
      
     </v-alert>
  
  <div class="row bg-white"  >
              <div class="col  p-3 text-center ">
                <v-btn @click="fetchArticulosMed"  rounded="xl" class="bg-primary" prepend-icon="mdi-dialpad" >Actualizar24 </v-btn>
                </div>
                <div class="col  p-3 text-center ">
                 
                </div>
                <div class="col  p-3 text-center ">
                    <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                </div>
          </div>
      
      <table class="table table-striped bg-white text-left" style="font-size: 12px;">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              <v-chip class="d-flex  darken-1 sm"   elevation="1"   > 
                {{ header.toUpperCase() }}
            </v-chip>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
            <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header] }}</td>
            <td>
            <v-btn @click="sendRowData(row)" color="#FF0000"  rounded="xl" prepend-icon="mdi-trash-can-outline"></v-btn>
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
  </template>
  
  <script>
  
  export default {
    props: {
    idConfig: {
      type: String,
      required: true
    }
  },
  props: {
    remitoValue: {
      type: String,
      required: true
    }
  },
    data() {
      return {
        nombre: '',
        ListaFormulariosArticulos:'',
        rows: [],
        VentanaGrabar: false,
        id : "0",
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 10
      };
    },
    created() {
        this.idUsuario = this.$store.state.id_usuario;
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
        this.MostrarRemito();
      }
    }
  },
    methods: {
      async  MostrarRemito(){
        ///////
  let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////
        // alert(this.remitoValue);
         //alert("Aca estoy");
          /////////////////////////////////////////////////////////////
          //Mostrar los articulos cargados de un remito en particular//
          //////////////////////////////////////////////////////////////api/ConfigForm/ListarConsumoIngreso?pTipo=${this.idUsuario}
          const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumoIngresoRemito?pTipo=${IdInst}&pId=${this.remitoValue}`)
          .then((respuesta) => {
            //this.ListaFormulariosArticulos = respuesta.data.lista
            this.rows = respuesta.data.lista;
            console.log("IMPORTANTE Muestro Solo Remito")
            console.table(this.rows);     
          })
          .catch(err => {
            //console.log(err);
          });
        },
      async sendRowData(row) {
        let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        
      const keys = Object.keys(row);
      //alert(keys[0]); Nombre de la columna
      const entries = Object.entries(row);
      const primerpar = entries[0];  // Valor de la columna
      this.id =  primerpar[1];
      
      const lote = entries[10]; 
      const lote_valor = lote[1];
      

      const fv = entries[11]; 
      const fv_valor = fv[1];
      let [dia, mes, anio] = fv_valor.split('/');
       //Formatear la fecha en el formato YYYYMMDD
      let fechaFormateada = `${anio.trim()}${mes.trim()}${dia.trim()}`;
      
      //alert("Comprobante: " + this.remitoValue); 
      //alert("Id Articulo: " + this.id); 
      //alert("Lote: "+ lote_valor);
      //alert(" Fec Ven:  "+ fechaFormateada);
      //alert(" Institucioin:  " + IdInst);
      

      
      //console.log('Dato de la fila seleccionada:', this.id);
      //Eliminar
      await this.axios.put(`/api/ConfigForm/EliminaEconomato?pComprobante=${this.remitoValue}&pIdarticulo=${this.id}&pLote=${lote_valor}&pFecven=${fechaFormateada}&IdInstitucion=${IdInst}`)
    
       .then(datos => {
         this.mostrarAlertaEliminar = false;
         this.mensajeAlertaSuceso = "Eliminado exitosamente";
         this.mostrarAlertaSuceso = true;
         this.VentanaGrabar = true;
         this.mostrarAlertaGrabar = true;
         this.MostrarRemito();
         //setTimeout(() => {
          //        this.mostrarAlertaSuceso = false;
            //   }, 5000);
               
       })
       .catch(error => {
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Ocurrió un error al grabar los datos:", error;
        setTimeout(() => {
           this.mostrarAlertaSuceso = false;
       }, 5000);
     })
       ;
    
      
    },
    cerrarGrabar() {
            this.VentanaGrabar = false;
            window.location.reload();
        },
    async fetchArticulosMed() {
        
        //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
        //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
        //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
       const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumoIngreso?pTipo=${this.idUsuario}`)
          .then((respuesta) => {
            //this.ListaFormulariosArticulos = respuesta.data.lista
            this.rows = respuesta.data.lista;
            console.log("IMPORTANTE Muestro rows")
            console.table(this.rows);     
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
  
  