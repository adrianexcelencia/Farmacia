<template>
    <div class=" bg-white" >
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
          shaped
         color="blue-grey"
        rounded="xl"
        theme="dark"
        icon="mdi-arrow-right"
        density="compact"
        elevation="4"
        border="top"
      >
       <b>   Listado de Movimientos  </b> 
   
       
      </v-alert>
  <br>
   <div class="row bg-white" >
               <div class="col-md-2">
                 <v-btn @click="fetchArticulosMed" rounded="xl" class="bg-primary" block prepend-icon="mdi-autorenew" >Actualizar</v-btn>
                 </div>
                 <div class="col-md-2 ">
                   <v-btn @click="exportToPDF" rounded="xl" class="bg-error" block prepend-icon="mdi-file-pdf-box" >PDF</v-btn>
                 </div>
                 <div class="col-md-2">
                   <v-btn @click="exportToExcel"  rounded="xl" class="bg-success" block prepend-icon="mdi-file-excel" >Excel</v-btn>
                 </div>
                 <div class="col-md-2"></div>
                 <div class="col-md-4 ">
                     <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                 </div>
           </div>
       <br>
       
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
             <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header] }}</td>
             <td>
             <v-btn @click="sendRowData(row)" color="#FF0000" prepend-icon="mdi-trash-can-outline" ></v-btn>
           </td>
           </tr>
           
         </tbody>
       </table>
     
       <div class="row bg-white" >
         <div class="col-md-7" >
           
         </div>
         <div class="col-md-5" >
       
       </div>
       </div>
       <div class="row bg-white" >
         <div class="col-md-7" >
           
         </div>
         <div class="col-md-5" >
         
         
       </div>
       </div>
  
       <div class="pagination">
         <v-btn @click="prevPage" :disabled="currentPage === 1" rounded="xl" class="bg-primary">Anterior</v-btn>
         <span>Página {{ currentPage }} de {{ totalPages }}</span>
         <v-btn @click="nextPage" :disabled="currentPage === totalPages" rounded="xl" class="bg-primary">Siguiente</v-btn>
       </div>
       
     </div>
   </div>
   </template>
   
   <script>
   import * as XLSX from 'xlsx';
   import jsPDF from "jspdf";
   import html2canvas from "html2canvas";
   import "jspdf-autotable";
   export default {
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
         total:'',
         cantidad: '',
         itemsPerPage: 10
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
         //alert(newVal);
         this.MostrarDatos();
         
       }
     }
   },
     methods: {
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
     const title = "Devolucion de Medicamentos de la Internacion Numero: " + this.remitoValue; // Reemplaza con tu título
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
         //alert(this.idUsuario);
         //alert(this.remitoValue);
         const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumoId?pTipo=${this.idUsuario}&pId=${this.remitoValue}`)
           .then((respuesta) => {
             //this.ListaFormulariosArticulos = respuesta.data.lista
             this.rows = respuesta.data.lista;
             let data = []; //declarar la variable data
             data = respuesta.data.lista;
             var valor_total = 0;
             var valor_total_c = 0;
             //data.forEach(item => {
              // valor_total_c += parseFloat(item.cantidad);
              // const totalString = item.total.replace(',', '.'); // Reemplazar coma por punto
   //const totalValue = parseFloat(totalString); // Convertir a número decimal
   //if (!isNaN(totalValue)) { // Verificar que es un número válido
   //  valor_total += totalValue;
   //}
             //}); 
             //valor_total = valor_total.toFixed(2);
             //this.total =   "        Importe Total $: "+ valor_total;
            //this.cantidad = "       Cantidad de Medicamentos: " + valor_total_c;
             //alert(valor_total);
                 
           })
           .catch(err => {
             //console.log(err);
           });
       },
       async sendRowData(row) {
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
       ///////////////////////////////
      ///////Recuepra institucion////

    let Institucion = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { Institucion = item.codigo;  }); })
      .catch(err => { console.log(err); });
        /////////////////////////
      //////////////////////////////
      //////////////////////////////
         
         //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
         //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
         //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
        const respuesta = await this.axios.get(`/api/ConfigForm/ListarMov?pInstitucion=${Institucion}`)
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
   
   