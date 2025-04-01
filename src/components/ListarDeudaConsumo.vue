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
        shaped rounded="xl"
       color="#5f968E"
      
      theme="dark"
      icon="mdi-arrow-right"
      density="compact"
      elevation="4"
      border="top"
    >
     <b>   Listado de consumo de medicamentos por internado  </b> 
     
     
    </v-alert>
    <div class="row bg-white" >
       <div class="col-md-2 p-3 text-center ">
           <label for="fecha"><b>Ingrese fecha desde:</b></label>
           <input type="date" id="fecha" v-model="FechaDesde" name="fecha">
       </div>
       <div class="col-md-2 p-3 text-center ">
           <label for="fecha"><b>Ingrese fecha hasta:</b></label>
           <input type="date" id="fecha" v-model="FechaHasta" name="fecha">

       </div>
       <div class="col-md-2 p-3 text-center ">
       <v-btn rounded="xl" @click="GenerarInforme" class="bg-primary" prepend-icon="mdi-checkbox-multiple-marked-circle-outline" >Generar informe</v-btn>
   </div> 
   <div class="col-md-2 p-3 text-center ">
       <v-btn rounded="xl" @click="exportToPDF" class="bg-error" block prepend-icon="mdi-file-pdf-box" >PDF</v-btn>
   </div> 
   <div class="col-md-2 p-3 text-center ">

       <v-btn rounded="xl" @click="exportToExcel" class="bg-success" block prepend-icon="mdi-file-excel" >Excel</v-btn>
   </div> 
   </div>
 <div class="row bg-white" >
             <div class="col  p-3 text-center ">
               <v-btn @click="fetchArticulosMed" rounded="xl" class="bg-primary" prepend-icon="mdi-dialpad" >Actualizar</v-btn>
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
     <div class="row bg-white" >
         <div class="col-md-1" >
           
         </div>
         <div class="col-md-3"><br>
          <v-card
                 
                  rounded="xl"
                  class="mx-auto"
                  elevation="4"
                  prepend-icon="mdi-cash-multiple" 
                  color ="primary"
                >
                  <template v-slot:title>
                    Deuda Medicamentos
                  </template>
  
                   <v-card-text>
                    <v-text-field prepend-icon="mdi-currency-usd" v-model="totalmed"  style="font-size: 14px; font-weight: bold;"  ReadOnly  variant="underlined"  ></v-text-field>
                  </v-card-text>
            </v-card> 
        </div>
        <div class="col-md-3" ><br>
          <v-card
                 
                  rounded="xl"
                  class="mx-auto"
                  elevation="4"
                  prepend-icon="mdi-cash-multiple" 
                  color ="primary"
                >
                  <template v-slot:title>
                    Deuda Descartables
                  </template>
  
                   <v-card-text>
                    <v-text-field prepend-icon="mdi-currency-usd" v-model="totaldes"  style="font-size: 14px; font-weight: bold;"  ReadOnly  variant="underlined"  ></v-text-field>
                  </v-card-text>
            </v-card> 
           
         </div>
         <div class="col-md-3" ><br>
          <v-card
                 
                  rounded="xl"
                  class="mx-auto"
                  elevation="4"
                  prepend-icon="mdi-cash-multiple" 
                  color ="primary"
                >
                  <template v-slot:title>
                    Deuda Paciente
                  </template>
  
                   <v-card-text>
                    
                    <v-text-field prepend-icon="mdi-currency-usd" v-model="tn"  style="font-size: 14px; font-weight: bold;"  ReadOnly  variant="underlined"  ></v-text-field>
                  </v-card-text>
            </v-card> 
        
         
       </div>
     </div>    
     <div class="pagination">
       <v-btn @click="prevPage" :disabled="currentPage === 1" class="bg-primary">Anterior</v-btn>
       <span>Página {{ currentPage }} de {{ totalPages }}</span>
       <v-btn @click="nextPage" :disabled="currentPage === totalPages" class="bg-primary">Siguiente</v-btn>
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
       currentPage: 1,
       FechaDesde: '',
       total1:'',
       tn:'',
       totalmed:'',
       totaldes:'',
       FechaHasta: '',
       MostrarSpinner: false,
       itemsPerPage: 10
     };
   },
   created() {
       this.idUsuario = this.$store.state.id_usuario;
       //alert("hola");
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
    async exportToPDF() {
        /////Datos de la institucion
        let datosII = "";
        let fechaI = "";
        let Institucion = "";
        let logo ="";
        let sector = "";
        const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta) => {
    let data = []; //declarar la variable data
    this.datos = respuesta.data.lista
    data = respuesta.data.lista;
    data.forEach(item => { Institucion = item.codigo; logo = item.campo; }); })
      .catch(err => { console.log(err); });
        /////////////////////////
        //Datos de Impresion 
        const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarDatosInformes?pI=${Institucion}&pN=${this.remitoValue}`, {
  }).then((respuesta_s) => {
    let data_s = []; //declarar la variable data
    this.datos = respuesta_s.data.lista
    data_s = respuesta_s.data.lista;
    data_s.forEach(item_s => { datosII = item_s.detalleInternado;fechaI = item_s.fecha; sector = item_s.sector;  }); })
      .catch(err => { console.log(err); });
        //////

    

        //////////
  // Clonar la tabla sin el botón
  const originalTable = this.$refs.table;
  const clonedTable = originalTable.cloneNode(true);
  const nombresector = "Primer Piso";

  // Función para formatear la fecha
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Ejemplo de uso
  const today = new Date();
  const formattedDate = formatDate(today);

  // Crear una tabla con imagen y título
  const createTitleWithImage = (title, imageSrc, fontSize = '50px') => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px'; // Espacio entre el título y la tabla
    table.style.fontSize = '25px'; // Tamaño de la fuente para el título

    const row = document.createElement('tr');

    // Columna para la imagen
    const imgCell = document.createElement('td');
    imgCell.style.width = '30%';
    imgCell.style.padding = '10px';
    imgCell.style.border = 'none';
    if (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.width = '40%'; // Ajustar tamaño de la imagen si es necesario
      img.style.height = 'auto'; // Mantener la proporción
      imgCell.appendChild(img);
    }
    row.appendChild(imgCell);

    // Columna para el texto
    const textCell = document.createElement('td');
    textCell.style.width = '70%';
    textCell.style.padding = '10px';
    textCell.style.border = 'none';
    textCell.style.textAlign = 'left';
    textCell.style.fontWeight = 'bold'; // Negrita para el texto
    textCell.style.fontSize = '25px'; // Tamaño de la fuente para el título
    textCell.style.fontSize = fontSize; // Tamaño de la fuente para el título
    textCell.innerText = title;
    row.appendChild(textCell);

    table.appendChild(row);
    return table;
  };

  // Crear una tabla con tres filas de datos
  const createAdditionalTable = () => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';

    const createRow = (content) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4; // Ajustar según el número de columnas
      cell.style.padding = '10px';
      cell.style.border = 'none';
      cell.style.fontWeight = 'bold'; // Negrita para el Total
      cell.style.fontSize = '25px'; // Tamaño de la fuente para el título
      cell.innerText = content;
      row.appendChild(cell);
      return row;
    };
    const fecha = new Date(); // Puedes establecer tu fecha aquí
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = fecha.getFullYear();
    // Agregar las tres filas
    table.appendChild(createRow('FECHA: ' + day +'/'+ month +'/'+ year ));
    const partes = this.FechaDesde.split("-"); // Divide la cadena por el guión "-"
    const desde = this.FechaHasta.split("-"); // Divide la cadena por el guión "-"
    //this.mes = partes[1]; // El mes está en la segunda posición
    //this.dia = partes[2]; // El día está en la tercera posición
    table.appendChild(createRow('Periodo: Desde:  ' +  partes[2] +'/'+ partes[1] +'/'+ partes[0]+ ' Hasta: '+ desde[2] +'/'+ desde[1] +'/'+ desde[0]));
    table.appendChild(createRow('________________________________________________________________________________________________________________________________________________________________________'));

    return table;
  };

  // Crear la fila "Total" que aparecerá al final de ambas tablas
  const createTotalRow = () => {
    const totalRow = document.createElement('tr');
    const totalCell = document.createElement('td');
    totalCell.colSpan = 4; // Ajustar según el número de columnas
    totalCell.style.padding = '10px';
    totalCell.style.border = 'none';
    totalCell.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell.style.textAlign = 'right'; // Alinear a la derecha
    totalCell.innerText = 'DEUDA MEDICAMENTOS $ '+ this.totalmed +' - DEUDA DESCARTABLES $ '+ this.totaldes + ' - DEUDA TOTAL $ ' + this.tn; // Mostrar el total
    totalCell.style.fontSize = '25px'; // Tamaño de la fuente para el título
    totalCell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow.appendChild(totalCell);

    return totalRow;
  };

  // Crear un contenedor temporal para la tabla clonada, título con imagen y tabla adicional
  const tempDiv = document.createElement('div');
tempDiv.appendChild(createTitleWithImage(
  "Listado de consumo de medicamentos por internado", // Título
  require('../assets/'+ logo), // Ruta de la imagen
  '35px' // Tamaño de la fuente para el título
));
  tempDiv.appendChild(createAdditionalTable());
  tempDiv.appendChild(clonedTable);

  
  // Agregar la fila "Total" al final de todas las tablas
  const totalRow = createTotalRow();
  tempDiv.appendChild(totalRow);

  document.body.appendChild(tempDiv);

  // Usar html2canvas para capturar el contenido del contenedor
  html2canvas(tempDiv, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210 - 20; // Ancho en mm para A4 menos margen de 10 mm en cada lado
    const pageHeight = 297 - 20; // Altura en mm para A4 menos margen de 10 mm en la parte superior e inferior
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 20; // Posición inicial debajo del título con margen de 10 mm

    // Añadir la imagen de la tabla y el título con imagen al PDF con márgenes
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); // Margen de 10 mm en los costados
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight); // Margen de 10 mm en los costados
      heightLeft -= pageHeight;
    }

    pdf.save('Listadodeudamedydesc.pdf');

    // Eliminar el contenedor temporal después de capturar la tabla
    document.body.removeChild(tempDiv);
  });
}



,
exportToExcel() {
      
      // Referencia a la tabla
      const table = this.$refs.table;

      // Convertir la tabla a una hoja de cálculo
      const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

      // Generar un archivo Excel
      XLSX.writeFile(workbook, "Datos-de-devolucion.xlsx");
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
       //alert("hola");
       this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
       //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
       //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarConsumoFiltrado?pFechaDesde=20240101&pFechaHasta=20241231&Usuario=42&pInstitucion=72`)
         .then((respuesta) => {
           //this.ListaFormulariosArticulos = respuesta.data.lista
           
           this.rows = respuesta.data.lista;
           console.table(this.rows);
              
         })
         .catch(err => {
           //console.log(err);
         });
      this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
     },
     async GenerarInforme() {
        
       this.MostrarSpinner = true;
       let fechaD = this.FechaDesde;
       let fechaDesdeSinGuiones = fechaD.replace(/-/g, '');
       let fechaH = this.FechaHasta;
       let fechaHastaSinGuiones = fechaH.replace(/-/g, '');
       //alert(fechaDesdeSinGuiones);
       /////Trae insttitucion ////

       let IdTipo = "";
       const respuesta24 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
       }).then((respuesta24) => {
       let data = []; //declarar la variable data
       this.datos = respuesta24.data.lista
       data = respuesta24.data.lista;

       data.forEach(item => { IdTipo = item.codigo;  }); })
       .catch(err => { console.log(err); });
       
       ///////////////////////////
       //alert(this.idUsuario);
       //alert(fechaDesdeSinGuiones);
       //alert(fechaHastaSinGuiones);
       //alert(this.idUsuario);
       //alert(IdTipo);

         const respuesta = await this.axios.get(`/api/ConfigForm/ListarDeudaGeneral_Consumo?pInstitucion=${IdTipo}&desde=${fechaDesdeSinGuiones}&hasta=${fechaHastaSinGuiones}pInstitucion=${IdTipo}`)
           .then((respuesta) => {
             //this.ListaFormulariosArticulos = respuesta.data.lista
             this.rows = respuesta.data.lista;
             let data = []; //declarar la variable data
             data = respuesta.data.lista;
             console.table(data);
             var valor_total = 0;
             var valor_totaldes = 0;
             var valor_totalmed = 0;
             var valor_total_c = 0;
             data.forEach(item => {
                valor_total_c += parseFloat(item.cantidad);
                const totalString = item.deuda.replace(',', '.'); // Reemplazar coma por punto
                const totalValue = parseFloat(totalString); // Convertir a número decimal
                if (!isNaN(totalValue)) { // Verificar que es un número válido
                  valor_total += totalValue;
                }
                //descartables
                const totaldesString = item.descartable.replace(',', '.'); // Reemplazar coma por punto
                const totaldesValue = parseFloat(totaldesString); // Convertir a número decimal
                if (!isNaN(totaldesValue)) { // Verificar que es un número válido
                    valor_totaldes += totaldesValue;
                }
                //Medicamentos
                const totalmedString = item.medicamento.replace(',', '.'); // Reemplazar coma por punto
                const totalmedValue = parseFloat(totalmedString); // Convertir a número decimal
                if (!isNaN(totaldesValue)) { // Verificar que es un número válido
                    valor_totalmed += totalmedValue;
                }
             }); 
            
             valor_total = valor_total.toFixed(2);
             
             //this.total =    valor_total;
             this.tn =    valor_total;
             
             valor_totaldes = valor_totaldes.toFixed(2);
             this.totaldes =    valor_totaldes;
             valor_totalmed = valor_totalmed.toFixed(2);
             this.totalmed =    valor_totalmed;
            
             
             
                 
           })

           
           .catch(err => {
             //console.log(err);
           });

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