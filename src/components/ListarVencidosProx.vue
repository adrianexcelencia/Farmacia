<template>
    <spinner :visible="MostrarSpinner"></spinner>
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
        shaped
       color="#5f968E"
      
      theme="dark" rounded="xl"
      icon="mdi-arrow-right"
      density="compact"
      elevation="4"
      border="top"
    >
     <b>   Listado de medicamentos proximos a vencer  </b> 
     
     
    </v-alert>
    <div class="row bg-white" >
       <div class="col-md-2 p-3 text-center ">
          
       </div>
       <div class="col-md-2 p-3 text-center ">
           

       </div>
       <div class="col-md-2 p-3 text-center ">
        <v-text-field v-model="cantidad" label="Cantidad de dias" variant="underlined" block></v-text-field>
       </div>
       <div class="col-md-2 p-3 text-center ">
       <v-btn @click="GenerarInforme" rounded="xl" class="bg-primary" prepend-icon="mdi-checkbox-multiple-marked-circle-outline" >Generar informe</v-btn>
   </div> 
   <div class="col-md-2 p-3 text-center ">
       <v-btn @click="exportToPDF" rounded="xl" class="bg-error" block prepend-icon="mdi-file-pdf-box" >PDF</v-btn>
   </div> 
   <div class="col-md-2 p-3 text-center ">

       <v-btn @click="exportToExcel" rounded="xl" class="bg-success" block prepend-icon="mdi-file-excel" >Excel</v-btn>
   </div> 
   
   </div>
 <div class="row bg-white" >
             <div class="col  p-3 text-center ">
               <v-btn rounded="xl" @click="fetchArticulosMed" class="bg-primary" prepend-icon="mdi-dialpad" >Actualizar</v-btn>
               </div>
               <div class="col  p-3 text-center ">
                
               </div>
               <div class="col  p-3 text-center ">
                   <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
               </div>
         </div>
     
     <table class="table table-striped bg-white text-left"  ref="table" >
       <thead>
         <tr>
           <th v-for="(header, index) in headers" :key="index">
             
             {{ header.toUpperCase() }}
      
           </th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
           <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header] }}</td>
           
         </tr>
         
       </tbody>
     </table>
     
     <div class="pagination">
       <v-btn @click="prevPage" :disabled="currentPage === 1" rounded="xl" class="bg-primary">Anterior</v-btn>
       <span>Página {{ currentPage }} de {{ totalPages }}</span>
       <v-btn @click="nextPage" :disabled="currentPage === totalPages" rounded="xl" class="bg-primary">Siguiente</v-btn>
     </div>
     
   </div>
 </template>
 
 <script>
  import * as XLSX from 'xlsx';
 import jsPDF from "jspdf";
 import html2canvas from "html2canvas";
 import "jspdf-autotable";
 import Spinner from '@/components/Spinner.vue';
 export default {
   components: {
     'spinner': Spinner
     
   },
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
       cantidad: '',
       currentPage: 1,
       FechaDesde: '',
       FechaHasta: '',
       MostrarSpinner: false,
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

   let position = 25; // Posición inicial debajo del título

   // Añadir el título al PDF
   const title = "Informe de Devolucion de Articulos "; // Reemplaza con tu título
   pdf.setFontSize(16);
   pdf.text(title, imgWidth / 2, 10, { align: 'center' });
    // Añadir el título al PDF
    let fecha = this.FechaDesde;

// Separar la fecha en componentes
let [año, mes, dia] = fecha.split('-');

// Crear una cadena con el formato "Día Mes Año"
let fechaFormateada = `${dia}-${mes}-${año}`;
//-----------------------------
let fechaH = this.FechaHasta;

// Separar la fecha en componentes
let [añoH, mesH, diaH] = fechaH.split('-');

// Crear una cadena con el formato "Día Mes Año"
let fechaFormateadaH = `${diaH}-${mesH}-${añoH}`;
//-----------------------------
    const Sutitle = "Fecha desde: " + fechaFormateada + " Fecha hasta: " + fechaFormateadaH ; // Reemplaza con tu título
   pdf.setFontSize(10);
   pdf.text(Sutitle, imgWidth / 2, 15, { align: 'center' });
   //-----------------------------------------
   // Obtener la fecha en formato YYYY-MM-DD
   //const ahora = new Date();
   //const año = ahora.getFullYear();
   //const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
   //const dia = String(ahora.getDate()).padStart(2, '0');
   //const fechaActual = `${año}-${mes}-${dia}`;
   const Sutitle2 = "______________________________________________________________________________________ " ; // Reemplaza con tu título
  pdf.setFontSize(10);
  pdf.text(Sutitle2, imgWidth / 2, 20, { align: 'center' });
   //------------------------------------

   // Añadir la imagen de la tabla debajo del título
   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
   heightLeft -= pageHeight;

   while (heightLeft >= 0) {
     position = heightLeft - imgHeight;
     pdf.addPage();
     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
     heightLeft -= pageHeight;
   }

   pdf.save('Listado-Medicamentos-Vencidos-Proximamente.pdf');

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
      XLSX.writeFile(workbook, "Listado-Medicamentos-Vencidos-Proximamente.xlsx");
    },
     async  MostrarRemito(){
        //alert(this.remitoValue);
         /////////////////////////////////////////////////////////////
         //Mostrar los articulos cargados de un remito en particular//
         //////////////////////////////////////////////////////////////api/ConfigForm/ListarConsumoIngreso?pTipo=${this.idUsuario}
         const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumoIngresoRemito?pTipo=${this.idUsuario}&pId=${this.remitoValue}`)
         .then((respuesta) => {
           //this.ListaFormulariosArticulos = respuesta.data.lista
           this.rows = respuesta.data.lista;
              
         })
         .catch(err => {
           //console.log(err);
         });
       },
     async sendRowData(row) {
      
       const entries = Object.entries(row);
       const primerpar = entries[0];
       const nombre = entries[1];
       this.$emit('valor-nombre', nombre[1]);
       this.$emit('valor-codigo', primerpar[1]);
     
   
     
   },
   cerrarGrabar() {
           this.VentanaGrabar = false;
           window.location.reload();
       },
   async fetchArticulosMed() {
       
       this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
       //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
       //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarDevolucionFiltrado?pFechaDesde=20240101&pFechaHasta=20241231&Usuario=42&pInstitucion=72`)
         .then((respuesta) => {
           //this.ListaFormulariosArticulos = respuesta.data.lista
           this.rows = respuesta.data.lista;
              
         })
         .catch(err => {
           //console.log(err);
         });
      this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
     },
     async GenerarInforme() {
       if(this.cantidad == "") 
       this.cantidad = "0";
       this.MostrarSpinner = true;
       
    

       let IdTipo = "";
       const respuesta24 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
       }).then((respuesta24) => {
       let data = []; //declarar la variable data
       this.datos = respuesta24.data.lista
       data = respuesta24.data.lista;

       data.forEach(item => { IdTipo = item.codigo;  }); })
       .catch(err => { console.log(err); });

       ///////////////////////////
       
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarVencidos?pTipo=2&pInstitucion=${IdTipo}&pFechaDesde=0&pFechaHasta=0&pdias=${this.cantidad}`)
         .then((respuesta) => { this.rows = respuesta.data.lista; })
         .catch(err => { console.log(err);});
    this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
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