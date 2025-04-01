<template>
    <spinner :visible="MostrarSpinner"></spinner>
   
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
         color="#5f968E"
        rounded="xl"
        theme="dark"
        icon="mdi-arrow-right"
        density="compact"
        elevation="4"
        border="top"
      >
       <b>   Listado de deuda  </b> 
   
       
      </v-alert>
 <br>
   <div class="row bg-white" >
               <div class="col-md-2 p-3">
                 <v-btn rounded="xl" @click="MostrarDatos" class="bg-primary" block prepend-icon="mdi-autorenew" title="Actualizar informe" >Actualizar</v-btn>
                 </div>
                 <div class="col-md-2 p-3">
                 <v-btn rounded="xl" @click="MostrarDatosMed" class="bg-primary" block prepend-icon="mdi-bookmark-box-multiple-outline" title="Actualizar informe" >Medicamentos</v-btn>
                 </div>
                 <div class="col-md-2 p-3">
                 <v-btn rounded="xl" @click="MostrarDatosDes" class="bg-primary" block prepend-icon="mdi-bookmark-box-multiple-outline" title="Actualizar informe" >Descartable</v-btn>
                 </div>
                 
                
                 <div class="col-md-2 p-3">
                  <v-btn rounded="xl" @click="exportToPDF_R" class="bg-primary" block prepend-icon="mdi-file-pdf-box" >Receta</v-btn>
                 </div>
                 <div class="col-md-3 p-3">
                  <v-btn rounded="xl" @click="exportToPDF_R" class="bg-primary" block prepend-icon="mdi-file-pdf-box" >Indicaciones Medicas</v-btn>
                 </div>
                 
           </div>
           <div class="row bg-white" >
            <div class="col-md-2 p-3">
              <v-btn rounded="xl" @click="exportToPDF_FichaDeuda" class="bg-primary" block prepend-icon="mdi-printer-outline" title="Informe a factuirar" >Ficha Deuda</v-btn>
            </div>
            <div class="col-md-2 p-3">
              <v-btn rounded="xl" @click="exportToPDF_A_Facturar" class="bg-primary" block prepend-icon="mdi-printer-outline" title="Informe a factuirar" >A Facturar</v-btn>
            </div>
            <div class="col-md-2 p-3">
                   <v-btn rounded="xl" @click="exportToExcel" class="bg-success" block prepend-icon="mdi-file-excel" >Excel</v-btn>
                 </div>
           </div>
           
       <br>
       <v-text-field v-model="TituloReceta" append-inner-icon="mdi-magnify" variant="underlined" size="small" style="display: none;"></v-text-field>
       <div class="row bg-white" >
        <div class="col-md-12 p-3">
                     <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                 </div>
       </div>
       <br>
       
       <table class="table-striped text-left" style="width: 100%;" ref="table">
  <thead>
    <tr>
      <th v-for="(header, index) in headers" :key="index">
        {{ header.toUpperCase() }}
      </th>
    </tr>
  </thead>
  <br>
  <tbody>
    <tr 
      v-for="(row, rowIndex) in paginatedRows" 
      :key="rowIndex"
     :class="{ 'red-row': Number(row['faltante']) !== 0 }"
    >
      <td v-for="(header, colIndex) in headers" :key="colIndex">
        {{ row[header] ? row[header].toString().toUpperCase() : '' }}
      </td>
    </tr>
  </tbody>
</table>

     
       <div class="row bg-white" >
         <div class="col-md-1" >
           
         </div>
         <div class="col-md-3" >
          
         
       </div>
       </div>
       <div class="row bg-white" >
        <div class="col-md-3" >
          
         
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
                    <v-text-field prepend-icon="mdi-currency-usd" v-model="total"  style="font-size: 14px; font-weight: bold;"  ReadOnly  variant="underlined"  ></v-text-field>
                  </v-card-text>
            </v-card> 
        
         
       </div>
       </div>
 
       <div class="pagination">
         <v-btn @click="prevPage" rounded="xl" :disabled="currentPage === 1" class="bg-primary">Anterior</v-btn>
         <span>Página {{ currentPage }} de {{ totalPages }}</span>
         <v-btn @click="nextPage" rounded="xl" :disabled="currentPage === totalPages" class="bg-primary">Siguiente</v-btn>
       </div>
       
     </div>
   </div>
   </template>
   
   <script>
   
   
    import Spinner from '@/components/Spinner.vue';
   import * as XLSX from 'xlsx';
   import jsPDF from "jspdf";
   import html2canvas from "html2canvas";
   import "jspdf-autotable";
   export default {
    components: {
      'spinner': Spinner
      
    },
     props: {
     remitoValue: {
       type: String,
       required: true
     }
   },
     data() {
       return {
        TituloReceta: '',
         nombre: '',
         MostrarSpinner: false,
         ListaFormulariosArticulos:'',
         rows: [],
         datos: null,
         datos1: null,
         VentanaGrabar: false,
         id : "0",
         searchQuery: '',
         currentPage: 1,
         total:'',
         totalmed:'',
         totaldes:'',
         cantidad: '',
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
         //alert("hola");
         this.MostrarDatos();
         
       }
     }
   },
     methods: {
      async  MostrarReceta(){ 
      //  const respuesta = await this.axios.get(`/api/ConfigForm/ListarDeudaPacienteMed?pInstitucion=${Institucion}&pInter=${this.remitoValue}&pTipo=2`)
       const respuesta = await this.axios.get(`/api/ConfigForm/ListarRecetas?pTipo=${this.idUsuario}&pId=${this.remitoValue}`)
         .then((respuesta) => {
           this.rows = respuesta.data.lista;
           let data = []; //declarar la variable data
           data = respuesta.data.lista;
           
          })
         .catch(err => {
           //console.log(err);
         });
     },
     
     async exportToPDF_R() {
  ///// Exportar solamente
  let datosII = "";
  let fechaI = "";
  let Institucion = "";
  let logo = "";
  let sector = "";

  // Obtener datos de la institución
  await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`)
    .then((respuesta) => {
      let data = respuesta.data.lista;
      this.datos = data;
      data.forEach(item => {
        Institucion = item.codigo;
        logo = item.campo;
      });
    })
    .catch(err => console.log(err));

  // Obtener datos de impresión
  await this.axios.get(`/api/ConfigForm/ListarDatosInformes?pI=${Institucion}&pN=${this.remitoValue}`)
    .then((respuesta) => {
      let data = respuesta.data.lista;
      this.datos = data;
      data.forEach(item => {
        datosII = item.detalleInternado;
        fechaI = item.fecha;
        sector = item.sector;
      });
    })
    .catch(err => console.log(err));

  ///// Clonar la tabla sin el botón
  const originalTable = this.$refs.table;
  const clonedTable = originalTable.cloneNode(true);

  ///// Función para formatear la fecha
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  ///// Crear una tabla con imagen y título
  const createTitleWithImage = (title, imageSrc, fontSize = '18px') => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';
    table.style.fontSize = '18px';
    table.style.border = '2px solid #000'; // Línea arriba de la fila "Total"

    const row = document.createElement('tr');

    const imgCell = document.createElement('td');
    imgCell.style.width = '30%';
    imgCell.style.padding = '10px';
    imgCell.style.border = 'none';
    if (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.width = '40%';
      img.style.height = 'auto';
      imgCell.appendChild(img);
    }
    row.appendChild(imgCell);

    const textCell = document.createElement('td');
    textCell.style.width = '70%';
    textCell.style.padding = '10px';
    textCell.style.border = 'none';
    textCell.style.textAlign = 'left';
    textCell.style.fontWeight = 'bold';
    textCell.style.fontSize = fontSize;
    textCell.innerText = title;
    row.appendChild(textCell);

    table.appendChild(row);
    return table;
  };

  ///// Crear una tabla con tres filas de datos
  const createAdditionalTable = () => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';
    table.style.border = '2px solid #000'; // Línea arriba de la fila "Total"

    const createRow = (content) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.style.padding = '10px';
      cell.style.border = 'none';
      cell.style.fontWeight = 'bold';
      cell.style.fontSize = '12px';
      cell.innerText = content;
      row.appendChild(cell);
      return row;
    };

    table.appendChild(createRow('FECHA: ' + fechaI));
    table.appendChild(createRow('Internación Número: ' + this.remitoValue));
    table.appendChild(createRow('Datos del paciente: ' + datosII + ' Sector: ' + sector));

    return table;
  };

// Crear la fila "Total" que aparecerá al final de ambas tablas
const createTotalRow = () => {
    const totalRow = document.createElement('tr');
    const totalCell = document.createElement('td');
    totalCell.colSpan = 4; // Ajustar según el número de columnas
    totalCell.style.width = '800px';
    totalCell.style.padding = '10px';
    totalCell.style.border = 'none';
    totalCell.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell.style.textAlign = 'right'; // Alinear a la derecha
    totalCell.innerText = ' Fecha:  ' +  formatDate(new Date()) + '   Mitre 1921 (oeste) Tel/Fal 427 2704 San Juan - Argentina ' ; // Mostrar el total
    totalCell.style.fontSize = '12px'; // Tamaño de la fuente para el título
    totalCell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow.appendChild(totalCell);

    return totalRow;
  };
//leyenda
const createTotalRow1 = () => {
    const totalRow1 = document.createElement('tr');
    const totalCell1= document.createElement('td');
    totalCell1.colSpan = 18; // Ajustar según el número de columnas
    totalCell1.style.width = '800px';
    totalCell1.style.padding = '10px';
    totalCell1.style.border = 'none';
    totalCell1.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell1.style.textAlign = 'right'; // Alinear a la derecha
    totalCell1.innerText = 'Lugar de pago o devolucion: Catamarca 446 (S) de lunes a viernes de 11:30 hs a 15:30 hs ' ; // Mostrar el total
    totalCell1.style.fontSize = '12px'; // Tamaño de la fuente para el título
    totalCell1.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow1.appendChild(totalCell1);

    return totalRow1;
  };
  // Crear una tabla adicional para Total y Leyenda
const createTotalTable = () => {
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '20px'; // Espacio antes de la tabla
  table.appendChild(createTotalRow());
  table.appendChild(createTotalRow1());
  return table;
};


  ///// Crear el contenedor temporal
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(createTitleWithImage(
    `${this.TituloReceta.toUpperCase()} DÍA: ${this.searchQuery}`,
    require(`../assets/${logo}`),
    '18px'
  ));

  tempDiv.appendChild(createAdditionalTable());
tempDiv.appendChild(clonedTable);
tempDiv.appendChild(createTotalTable());
  document.body.appendChild(tempDiv);

  ///// Preguntar al usuario
  const userChoice = confirm("¿Desea imprimir el documento o generar un PDF?\nAceptar: Imprimir\nCancelar: Generar PDF");

  if (userChoice) {
    console.log(document);
    const printWindow = window.open('', '_blank');

// Estilo para ajustar el tamaño de la fuente a 25px y garantizar que las imágenes se vean correctamente
const styles = `
  <style>
    body {
      font-size: 14px;
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td, th {
      padding: 10px;
      text-align: left;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
`;

// Escribir el contenido con los estilos en la ventana de impresión
printWindow.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Impresión</title>
      ${styles}
    </head>
    <body>
      ${tempDiv.innerHTML}
    </body>
  </html>
`);

// Asegurarse de que las imágenes se carguen antes de imprimir
printWindow.document.close();
printWindow.focus();

// Esperar un pequeño tiempo para asegurar que las imágenes se carguen antes de imprimir
setTimeout(() => {
  printWindow.print();
  printWindow.close();
  // Eliminar el contenedor temporal
  document.body.removeChild(tempDiv);
}, 500); // Ajustar el tiempo si es necesario


  } else {
    // Generar PDF con html2canvas
    html2canvas(tempDiv, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('RecetaPaciente.pdf');
      document.body.removeChild(tempDiv);
    });
  }
},
async GrabarAFacturar() {
   
    await this.axios.post(`api/ConfigForm/VerificaAFacturar/${this.remitoValue}`)
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
   },  
   
////A facturar
async exportToPDF_A_Facturar() {

  //marco A Facturar
  this.GrabarAFacturar();
  //Mensaje
  //this.AlertaAFacturar();
  ///// Datos de la institución
  let datosII = "";
  let fechaI = "";
  let Institucion = "";
  let logo = "";
  let sector = "";

  // Obtener datos de la institución
  await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`)
    .then((respuesta) => {
      let data = respuesta.data.lista;
      this.datos = data;
      data.forEach(item => {
        Institucion = item.codigo;
        logo = item.campo;
      });
    })
    .catch(err => console.log(err));

  // Obtener datos de impresión
  await this.axios.get(`/api/ConfigForm/ListarDatosInformes?pI=${Institucion}&pN=${this.remitoValue}`)
    .then((respuesta) => {
      let data = respuesta.data.lista;
      this.datos = data;
      data.forEach(item => {
        datosII = item.detalleInternado;
        fechaI = item.fecha;
        sector = item.sector;
      });
    })
    .catch(err => console.log(err));

  ///// Clonar la tabla sin el botón
  const originalTable = this.$refs.table;
  const clonedTable = originalTable.cloneNode(true);

  ///// Función para formatear la fecha
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  ///// Crear una tabla con imagen y título
  const createTitleWithImage = (title, imageSrc, fontSize = '20px') => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';
    table.style.fontSize = '10px';
    table.style.border = '2px solid #000'; 

    const row = document.createElement('tr');

    const imgCell = document.createElement('td');
    imgCell.style.width = '30%';
    imgCell.style.padding = '10px';
    imgCell.style.border = 'none';
    if (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.width = '100%';
      img.style.height = 'auto';
      imgCell.appendChild(img);
    }
    row.appendChild(imgCell);

    const textCell = document.createElement('td');
    textCell.style.width = '70%';
    textCell.style.padding = '10px';
    textCell.style.border = 'none';
    textCell.style.textAlign = 'left';
    textCell.style.fontWeight = 'bold';
    textCell.style.fontSize = fontSize;
    textCell.innerText = title;
    row.appendChild(textCell);

    table.appendChild(row);
    return table;
  };

  ///// Crear una tabla con tres filas de datos
  const createAdditionalTable = () => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';
    table.style.border = '2px solid #000'; 
       //////////////////////////


    const createRow = (content) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.style.padding = '10px';
      cell.style.border = 'none';
      cell.style.fontWeight = 'bold';
      cell.style.fontSize = '12px';
      cell.innerText = content;
      row.appendChild(cell);
      return row;
    };

 

    table.appendChild(createRow('FECHA: ' + fechaI));
    table.appendChild(createRow('Internación Número: ' + this.remitoValue));
    table.appendChild(createRow('Datos del paciente: ' + datosII + ' Sector: ' + sector));

    return table;
  };


  // Crear la fila "Total" que aparecerá al final de ambas tablas
  const createTotalRow = () => {
    const totalRow = document.createElement('tr');
    const totalCell = document.createElement('td');
    totalCell.colSpan = 4; // Ajustar según el número de columnas
    totalCell.style.width = '800px';
    totalCell.style.padding = '10px';
    totalCell.style.border = 'none';
    totalCell.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell.style.textAlign = 'right'; // Alinear a la derecha
    totalCell.innerText = 'DEUDA MEDICAMENTOS $ '+ this.totalmed +' - DEUDA DESCARTABLES $ '+ this.totaldes + ' - DEUDA TOTAL $ ' + this.total + '  ' ; // Mostrar el total
    totalCell.style.fontSize = '12px'; // Tamaño de la fuente para el título
    totalCell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow.appendChild(totalCell);

    return totalRow;
  };
//leyenda
const createTotalRow1 = () => {
    const totalRow1 = document.createElement('tr');
    const totalCell1= document.createElement('td');
    totalCell1.colSpan = 18; // Ajustar según el número de columnas
    totalCell1.style.width = '800px';
    totalCell1.style.padding = '10px';
    totalCell1.style.border = 'none';
    totalCell1.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell1.style.textAlign = 'right'; // Alinear a la derecha
    totalCell1.innerText = '  ' ; // Mostrar el total
    totalCell1.style.fontSize = '12px'; // Tamaño de la fuente para el título
    totalCell1.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow1.appendChild(totalCell1);

    return totalRow1;
  };
  // Crear una tabla adicional para Total y Leyenda
const createTotalTable = () => {
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '20px'; // Espacio antes de la tabla
  table.appendChild(createTotalRow());
  table.appendChild(createTotalRow1());
  return table;
};

  this.TituloReceta = "MEDICAMENTOS A FACTURAR";
  ///// Crear el contenedor temporal
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(createTitleWithImage(
    `${this.TituloReceta.toUpperCase()} `,
    require(`../assets/${logo}`),
    '18px'
  ));


  // Agregar la fila "Total" al final de todas las tablas
  //const totalRow = createTotalRow();
  //tempDiv.appendChild(totalRow);
  // Agregar la leyenda
  //const totalRow1 = createTotalRow1();
  //tempDiv.appendChild(totalRow1);
  
  // Agregar tabla adicional y tabla de Totales/Leyenda
tempDiv.appendChild(createAdditionalTable());
tempDiv.appendChild(clonedTable);
tempDiv.appendChild(createTotalTable());
  document.body.appendChild(tempDiv);

  ///// Preguntar al usuario
  const userChoice = confirm("¿Desea imprimir el documento o generar un PDF?\nAceptar: Imprimir\nCancelar: Generar PDF");

  if (userChoice) {
    console.log(document);
    const printWindow = window.open('', '_blank');

// Estilo para ajustar el tamaño de la fuente a 25px y garantizar que las imágenes se vean correctamente
const styles = `
  <style>
    body {
      font-size: 10px;
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td, th {
      padding: 10px;
      text-align: left;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
`;

// Escribir el contenido con los estilos en la ventana de impresión
printWindow.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Impresión</title>
      ${styles}
    </head>
    <body>
      ${tempDiv.innerHTML}
    </body>
  </html>
`);

// Asegurarse de que las imágenes se carguen antes de imprimir
printWindow.document.close();
printWindow.focus();

// Esperar un pequeño tiempo para asegurar que las imágenes se carguen antes de imprimir
setTimeout(() => {
  printWindow.print();
  printWindow.close();
  // Eliminar el contenedor temporal
  document.body.removeChild(tempDiv);
}, 500); // Ajustar el tiempo si es necesario


  } else {
    // Generar PDF con html2canvas
    html2canvas(tempDiv, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('RecetaPaciente.pdf');
      document.body.removeChild(tempDiv);
    });
  }
},
////Ficha Dedua
async exportToPDF_FichaDeuda() {
  ///// Datos de la institución
  let datosII = "";
  let fechaI = "";
  let Institucion = "";
  let logo = "";
  let sector = "";

  // Obtener datos de la institución
  await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`)
    .then((respuesta) => {
      let data = respuesta.data.lista;
      this.datos = data;
      data.forEach(item => {
        Institucion = item.codigo;
        logo = item.campo;
      });
    })
    .catch(err => console.log(err));

  // Obtener datos de impresión
  await this.axios.get(`/api/ConfigForm/ListarDatosInformes?pI=${Institucion}&pN=${this.remitoValue}`)
    .then((respuesta) => {
      let data = respuesta.data.lista;
      this.datos = data;
      data.forEach(item => {
        datosII = item.detalleInternado;
        fechaI = item.fecha;
        sector = item.sector;
      });
    })
    .catch(err => console.log(err));

  ///// Clonar la tabla sin el botón
  const originalTable = this.$refs.table;
  const clonedTable = originalTable.cloneNode(true);

  ///// Función para formatear la fecha
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  ///// Crear una tabla con imagen y título
  const createTitleWithImage = (title, imageSrc, fontSize = '20px') => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';
    table.style.fontSize = '10px';
    table.style.border = '2px solid #000'; 

    const row = document.createElement('tr');

    const imgCell = document.createElement('td');
    imgCell.style.width = '30%';
    imgCell.style.padding = '10px';
    imgCell.style.border = 'none';
    //imgCell.style.border = '2px solid #000'; // Línea arriba de la fila "Total"
    if (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.style.width = '100%';
      img.style.height = 'auto';
      imgCell.appendChild(img);
    }
    row.appendChild(imgCell);

    const textCell = document.createElement('td');
    textCell.style.width = '70%';
    textCell.style.padding = '10px';
    textCell.style.border = 'none';
    textCell.style.textAlign = 'left';
  textCell.style.fontWeight = 'bold';
    textCell.style.fontSize = fontSize;
  //textCell.style.border = '2px solid #000'; // Línea arriba de la fila "Total"
  textCell.style.borde
    textCell.innerText = title;
    row.appendChild(textCell);

    table.appendChild(row);
    return table;
  };

  ///// Crear una tabla con tres filas de datos
  const createAdditionalTable = () => {
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '10px';
    table.style.border = '2px solid #000'; 
       //////////////////////////


    const createRow = (content) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 4;
      cell.style.padding = '10px';
      cell.style.border = 'none';
      cell.style.fontWeight = 'bold';
      cell.style.fontSize = '12px';
      cell.innerText = content;
      row.appendChild(cell);
      return row;
    };

 
    
    table.appendChild(createRow('FECHA: ' + fechaI));
    table.appendChild(createRow('Internación Número: ' + this.remitoValue));
    table.appendChild(createRow('Datos del paciente: ' + datosII + ' Sector: ' + sector));
       
    return table;
  };


  // Crear la fila "Total" que aparecerá al final de ambas tablas
  const createTotalRow = () => {
    const totalRow = document.createElement('tr');
    const totalCell = document.createElement('td');
    totalCell.colSpan = 4; // Ajustar según el número de columnas
    totalCell.style.width = '800px';
    totalCell.style.padding = '10px';
    totalCell.style.border = 'none';
    totalCell.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell.style.textAlign = 'right'; // Alinear a la derecha
    totalCell.innerText = 'DEUDA MEDICAMENTOS $ '+ this.totalmed +' - DEUDA DESCARTABLES $ '+ this.totaldes + ' - DEUDA TOTAL $ ' + this.total + '  ' ; // Mostrar el total
    totalCell.style.fontSize = '12px'; // Tamaño de la fuente para el título
    totalCell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow.appendChild(totalCell);

    return totalRow;
  };
//leyenda
const createTotalRow1 = () => {
    const totalRow1 = document.createElement('tr');
    const totalCell1= document.createElement('td');
    totalCell1.colSpan = 18; // Ajustar según el número de columnas
    totalCell1.style.width = '800px';
    totalCell1.style.padding = '10px';
    totalCell1.style.border = 'none';
    totalCell1.style.fontWeight = 'bold'; // Negrita para el Total
    totalCell1.style.textAlign = 'right'; // Alinear a la derecha
    totalCell1.innerText = 'LOS IMPORTES DE MEDICAMENTOS Y DESCARTABLES SE ACTUALIZAN AL MOMENTO DEL EFECTIVO PAGO ' ; // Mostrar MENSAJE
    totalCell1.style.fontSize = '12px'; // Tamaño de la fuente para el título
    totalCell1.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow1.appendChild(totalCell1);

    return totalRow1;
  };
  // Crear una tabla adicional para Total y Leyenda
const createTotalTable = () => {
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '20px'; // Espacio antes de la tabla
  table.appendChild(createTotalRow());
  table.appendChild(createTotalRow1());
  return table;
};

  this.TituloReceta = "Ficha Deuda";
  ///// Crear el contenedor temporal
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(createTitleWithImage(
    `${this.TituloReceta.toUpperCase()} `,
    require(`../assets/${logo}`),
    '18px'
  ));


  // Agregar la fila "Total" al final de todas las tablas
  //const totalRow = createTotalRow();
  //tempDiv.appendChild(totalRow);
  // Agregar la leyenda
  //const totalRow1 = createTotalRow1();
  //tempDiv.appendChild(totalRow1);
  
  // Agregar tabla adicional y tabla de Totales/Leyenda
tempDiv.appendChild(createAdditionalTable());
tempDiv.appendChild(clonedTable);
tempDiv.appendChild(createTotalTable());
document.body.appendChild(tempDiv);

  ///// Preguntar al usuario
  const userChoice = confirm("¿Desea imprimir el documento o generar un PDF?\nAceptar: Imprimir\nCancelar: Generar PDF");

  if (userChoice) {
    console.log(document);
    const printWindow = window.open('', '_blank');

// Estilo para ajustar el tamaño de la fuente a 25px y garantizar que las imágenes se vean correctamente
const styles = `
  <style>
    body {
      font-size: 10px;
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td, th {
      padding: 10px;
      text-align: left;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
`;

// Escribir el contenido con los estilos en la ventana de impresión
printWindow.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Impresión</title>
      ${styles}
    </head>
    <body>
      ${tempDiv.innerHTML}
    </body>
  </html>
`);

// Asegurarse de que las imágenes se carguen antes de imprimir
printWindow.document.close();
printWindow.focus();

// Esperar un pequeño tiempo para asegurar que las imágenes se carguen antes de imprimir
setTimeout(() => {
  printWindow.print();
  printWindow.close();
  // Eliminar el contenedor temporal
  document.body.removeChild(tempDiv);
}, 500); // Ajustar el tiempo si es necesario


  } else {
    // Generar PDF con html2canvas
    html2canvas(tempDiv, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('RecetaPaciente.pdf');
      document.body.removeChild(tempDiv);
    });
  }
},

      async exportToPDF_R_original() {
       // this.MostrarReceta(); this.TituloReceta = "Medicamentos";

        /////Datos de la institucion
        let datosII = "";
        let fechaI = "";
        let Institucion = "";
        let logo = "";
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
    textCell.style.fontSize = '50px'; // Tamaño de la fuente para el título
    //textCell.style.fontSize = fontSize; // Tamaño de la fuente para el título
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

    // Agregar las tres filas
    table.appendChild(createRow('FECHA: ' + fechaI));
    table.appendChild(createRow('Internacion Numero: ' + this.remitoValue));
    table.appendChild(createRow('Datos del paciente: ' + datosII + 'Sector: '+ sector));

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
    //totalCell.innerText = 'IMPORTE TOTAL DE LA DEUDA $ ' + this.total; // Mostrar el total
    totalCell.innerText = ' '; // Mostrar el total
    totalCell.style.fontSize = '50px'; // Tamaño de la fuente para el título
    totalCell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow.appendChild(totalCell);

    return totalRow;
  };

  // Crear un contenedor temporal para la tabla clonada, título con imagen y tabla adicional
  const tempDiv = document.createElement('div');
tempDiv.appendChild(createTitleWithImage(
  "" + this.TituloReceta.toUpperCase() + " DIA: " + this.searchQuery, // Título
  require('../assets/' + logo), // Ruta de la imagen
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

    pdf.save('ResetaPaciente.pdf');

    // Eliminar el contenedor temporal después de capturar la tabla
    document.body.removeChild(tempDiv);
  });
}



,
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
    data.forEach(item => { Institucion = item.codigo; logo = item.campo;  }); })
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
    textCell.style.fontSize = '50px'; // Tamaño de la fuente para el título
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

    // Agregar las tres filas
    table.appendChild(createRow('FECHA: ' + fechaI));
    table.appendChild(createRow('Internacion Nª: ' + this.remitoValue));
    table.appendChild(createRow('Datos del paciente: ' + datosII + 'Sector: '+ sector));

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
    totalCell.innerText = 'DEUDA MEDICAMENTOS $ '+ this.totalmed +' - DEUDA DESCARTABLES $ '+ this.totaldes + ' - DEUDA TOTAL $ ' + this.total; // Mostrar el total
    totalCell.style.fontSize = '25px'; // Tamaño de la fuente para el título
    totalCell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    totalRow.appendChild(totalCell);

    return totalRow;
  };

  // Crear un contenedor temporal para la tabla clonada, título con imagen y tabla adicional
  const tempDiv = document.createElement('div');
tempDiv.appendChild(createTitleWithImage(
  "LISTADO DE DEUDA", // Título
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

    pdf.save('DeudaPaciente.pdf');

    // Eliminar el contenedor temporal después de capturar la tabla
    document.body.removeChild(tempDiv);
  });
}



,


      //////////////////////////////

      exportToPDF11() {
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

  // Crear las nuevas filas con los títulos sin líneas
  const titles = [
    'Sector: ' + nombresector,
    'Fecha: ' + formattedDate,
    'Datos del paciente: Franco Maya - Obra Social: Medife - Sector: Segundo Piso',
    'Numero de Internado: ' + this.remitoValue
  ];

  // Crear una nueva fila para cada título sin líneas
  const createTitleRow = (title, isBold) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4; // Asegúrate de que la cantidad de columnas coincida
    cell.style.textAlign = 'left';
    cell.style.padding = '10px';
    cell.style.border = 'none'; // Sin borde para los títulos
    
    // Crear texto con formato en negrita
    const span = document.createElement('span');
    span.innerText = title;
    if (isBold) {
      span.style.fontWeight = 'bold'; // Aplicar negrita
    }
    cell.appendChild(span);
    row.appendChild(cell);
    return row;
  };

  // Insertar las filas de encabezado al principio de la tabla clonada
  const tableHead = clonedTable.querySelector('thead');
  if (tableHead) {
    tableHead.insertBefore(createTitleRow(titles[0], true), tableHead.firstChild); // Negrita para el sector
    tableHead.insertBefore(createTitleRow(titles[1], true), tableHead.firstChild);
    tableHead.insertBefore(createTitleRow(titles[2], true), tableHead.firstChild);
    tableHead.insertBefore(createTitleRow(titles[3], true), tableHead.firstChild);
  } else {
    // Si no hay thead, crear uno y agregarlo
    const thead = document.createElement('thead');
    thead.appendChild(createTitleRow(titles[0], true)); // Negrita para el sector
    thead.appendChild(createTitleRow(titles[1], false));
    thead.appendChild(createTitleRow(titles[2], false));
    thead.appendChild(createTitleRow(titles[3], false));
    clonedTable.insertBefore(thead, clonedTable.firstChild);
  }

  // Crear una nueva fila con el texto "Total" al final de la tabla
  const createTotalRow = () => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4; // Asegúrate de que la cantidad de columnas coincida
    cell.innerText = 'TOTAL $ ' + this.total;
    cell.style.textAlign = 'right';
    cell.style.padding = '20px';
    cell.style.borderTop = '2px solid #000'; // Línea arriba de la fila "Total"
    cell.style.width = '100%'; // Asegura que el ancho de la celda sea el 100% del ancho de la tabla
    cell.style.fontWeight = 'bold'; // Hacer el texto en negritas
    row.appendChild(cell);
    return row;
  };

  // Insertar la fila "Total" al final de la tabla clonada
  const tableBody = clonedTable.querySelector('tbody');
  if (tableBody) {
    tableBody.appendChild(createTotalRow());
  } else {
    // Si no hay tbody, crear uno y agregar la fila "Total"
    const tbody = document.createElement('tbody');
    tbody.appendChild(createTotalRow());
    clonedTable.appendChild(tbody);
  }

  // Crear un contenedor temporal para la tabla clonada
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(clonedTable);
  document.body.appendChild(tempDiv);

  // Usar html2canvas para capturar la tabla clonada
  html2canvas(clonedTable, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210 - 20; // Ancho en mm para A4 menos margen de 10 mm en cada lado
    const pageHeight = 297 - 20; // Altura en mm para A4 menos margen de 10 mm en la parte superior e inferior
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 20; // Posición inicial debajo del título con margen de 10 mm

    // Añadir el título al PDF
    const title = "LISTADO DE DEUDA"; // Reemplaza con tu título
    pdf.setFontSize(20);
    pdf.text(title, 105, position - 10, { align: 'center' }); // Centrar el título

    // Añadir la imagen de la tabla debajo del título con márgenes
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); // Margen de 10 mm en los costados
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight); // Margen de 10 mm en los costados
      heightLeft -= pageHeight;
    }

    pdf.save('table.pdf');

    // Eliminar el contenedor temporal después de capturar la tabla
    document.body.removeChild(tempDiv);
  });
}


,





       exportToPDF2() {
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
     const title = "Listado deduda paciente: " + this.remitoValue; // Reemplaza con tu título
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
     async AlertaAFacturar() {
      //alert(this.remitoValue);
      let Institucion = "";
     const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=19&pId=${this.remitoValue}`, {
        }).then((respuesta1) => {
            let data1 = []; //declarar la variable data
            //this.datos1 = respuesta1.data.lista
            data1 = respuesta1.data.lista;
            console.log("hola");
            console.log(data1);
                data1.forEach(item => { Institucion = item.nombre;   }); })
            .catch(err => { console.log(err); });
            
   },
       async  MostrarDatos(){ 
        
        this.MostrarSpinner = true; 
        this.AlertaAFacturar();
        ///////Recuperar Institucion
        /////////////////////////
        let Institucion = "";
        const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
        }).then((respuesta1) => {
            let data1 = []; //declarar la variable data
            //this.datos1 = respuesta1.data.lista
            data1 = respuesta1.data.lista;
                data1.forEach(item => { Institucion = item.codigo;  }); })
            .catch(err => { console.log(err); });
        ///////////////////////
        /////////////////////////////
        
         const respuesta = await this.axios.get(`/api/ConfigForm/ListarDeudaPaciente?pInstitucion=${Institucion}&pInter=${this.remitoValue}&pTipo=1`)
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
                if (item.tipo.replace(/\s+/g, '') === "DESCARTABLES") {
                  valor_totaldes += totalValue;
                } else {
                  valor_totalmed += totalValue;
                }
             }); 
             valor_total = valor_total.toFixed(2);
             this.total =    valor_total;
             valor_totaldes = valor_totaldes.toFixed(2);
             this.totaldes =    valor_totaldes;
             valor_totalmed = valor_totalmed.toFixed(2);
             this.totalmed =    valor_totalmed;
            
             
             //alert(valor_total);
                 
           })
           .catch(err => {
             //console.log(err);
           });
           this.MostrarSpinner = false; 
       },
       async  MostrarDatosMed(){ 
        this.TituloReceta = "Medicamentos";
        
        this.MostrarSpinner = true; 
        ///////Recuperar Institucion
        /////////////////////////
        let Institucion = "";
        const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
        }).then((respuesta1) => {
            let data1 = []; //declarar la variable data
            //this.datos1 = respuesta1.data.lista
            data1 = respuesta1.data.lista;
                data1.forEach(item => { Institucion = item.codigo;  }); })
            .catch(err => { console.log(err); });
        ///////////////////////
        /////////////////////////////
         
         const respuesta = await this.axios.get(`/api/ConfigForm/ListarDeudaPacienteMed?pInstitucion=${Institucion}&pInter=${this.remitoValue}&pTipo=2`)
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
                if (item.tipo.replace(/\s+/g, '') === "DESCARTABLES") {
                  valor_totaldes += totalValue;
                } else {
                  valor_totalmed += totalValue;
                }
             }); 
             valor_total = valor_total.toFixed(2);
             this.total =    valor_total;
             valor_totaldes = valor_totaldes.toFixed(2);
             this.totaldes =    valor_totaldes;
             valor_totalmed = valor_totalmed.toFixed(2);
             this.totalmed =    valor_totalmed;
            
             
             //alert(valor_total);
                 
           })
           .catch(err => {
             //console.log(err);
           });
           this.MostrarSpinner = false; 
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
          //setTimeout(() => {
           //        this.mostrarAlertaSuceso = false;
             //   }, 5000);
                
        });
     
       
     },
     async  MostrarDatosDes(){ 
      this.TituloReceta = "Descartables";
        this.MostrarSpinner = true; 
        ///////Recuperar Institucion
        /////////////////////////
        let Institucion = "";
        const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
        }).then((respuesta1) => {
            let data1 = []; //declarar la variable data
            //this.datos1 = respuesta1.data.lista
            data1 = respuesta1.data.lista;
                data1.forEach(item => { Institucion = item.codigo;  }); })
            .catch(err => { console.log(err); });
        ///////////////////////
        /////////////////////////////
         
         const respuesta = await this.axios.get(`/api/ConfigForm/ListarDeudaPacienteMed?pInstitucion=${Institucion}&pInter=${this.remitoValue}&pTipo=3`)
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
                if (item.tipo.replace(/\s+/g, '') === "DESCARTABLES") {
                  valor_totaldes += totalValue;
                } else {
                  valor_totalmed += totalValue;
                }
             }); 
             valor_total = valor_total.toFixed(2);
             this.total =    valor_total;
             valor_totaldes = valor_totaldes.toFixed(2);
             this.totaldes =    valor_totaldes;
             valor_totalmed = valor_totalmed.toFixed(2);
             this.totalmed =    valor_totalmed;
            
             
             //alert(valor_total);
                 
           })
           .catch(err => {
             //console.log(err);
           });
           this.MostrarSpinner = false; 
       },
     cerrarGrabar() {
             this.VentanaGrabar = false;
             this.MostrarDatos();
             //window.location.reload();
         },
     async fetchArticulosMed() {
         
         //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
         //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
         //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
        const respuesta = await this.axios.get(`/api/ConfigForm/ListarDevolucion?pTipo=${this.idUsuario}`)
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
 .custom-text-field .v-input__control {
    font-size: 25px;
    font-weight: bold;
}
.red-row {
  background-color: rgb(248, 244, 244); /* Cambia el color según sea necesario */
  
}
     
   </style>
   
   