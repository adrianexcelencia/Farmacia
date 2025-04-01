<template>
    <div class="chart-container">
      <canvas id="myChart"></canvas>
    </div>
    <v-text-field  v-model="DatosC" readonly 
    label="Datos cantidad" variant="underlined" block></v-text-field>
    <v-text-field  v-model="DatosN" readonly 
    label="Datos Nombre" variant="underlined" block></v-text-field>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import Chart from 'chart.js/auto'
 
  export default {
    data() {
      return {
       // mostrarCampo: false, // Cambia a 'false' para hacerlo invisible
        primero:'',
        DatosC:'',
        DatosN:'',
      };
    },
    name: 'PieChart',
    //onMounted () {
   //     this.idUsuario = this.$store.state.id_usuario;
   //     this.GenerarDatos();
      
    
 // },
    created() {
        this.idUsuario = this.$store.state.id_usuario;
       this.GenerarDatos();
    
  },
  methods: {
    async GenerarDatos() {
      alert("Segundo");
      ///////////////////
        ////Trae DATOS/////
        ///////////////////
        //alert(this.idUsuario);
        let IdTipo = "";
       const respuesta24 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
       }).then((respuesta24) => {
       let data = []; //declarar la variable data
       this.datos = respuesta24.data.lista
       data = respuesta24.data.lista;

       data.forEach(item => { IdTipo = item.codigo;  }); })
       .catch(err => { console.log(err); });
//alert(IdTipo);
        ///////////////////
        ///////////////////
        ///////////////////

         ////Trae DATOS del Grafico/////
        ///////////////////
let labels_valor = "";
let labels_valor_final = "";
let data_valor = "";
let data_valor_final = "";
let primero = "";

this.axios.get(`/api/ConfigForm/ListaGrafico?pTipo=1&pInstitucion=${IdTipo}`, {
  }).then((respuesta) => {
    let dataDatos = []; //declarar la variable data
    this.datos = respuesta.data.lista;
    dataDatos = respuesta.data.lista;

    // Concatenar los valores en 'primero'
    dataDatos.forEach(item => {
      data_valor += "'"+item.cantidad +"',";  // Concatenar cada 'item.cantidad' a 'primero'
      labels_valor += "'"+item.nombre.trim() +"',";
    });

    // Asignar el valor de 'primero' a 'data_valor' dentro del bloque 'then'
    //data_valor = primero;

    // Mostrar el resultado en el alert
    data_valor_final = "["+ data_valor.substring(0, data_valor.length - 1)+"]";
    labels_valor_final = "["+ labels_valor.substring(0, labels_valor.length - 1)+"]";
    this.DatosC = data_valor_final;
    this.DatosN = labels_valor_final;
    //alert(data_valor_final);  // Esto se ejecuta después de que se resuelve la promesa
    //alert(labels_valor_final);  // Esto se ejecuta después de que se resuelve la promesa

  }).catch(err => {
    console.log(err);
  });

        ///////////////////
        ///////////////////
        ///////////////////
        this.setup;
}
  },
    setup() {
 
      alert("Primero");
      const chartRef = ref(null)
  
       onMounted(() => {
        
        const ctx = document.getElementById('myChart').getContext('2d')
  
        // Crear la instancia de Chart.js
        new Chart(ctx, {
          type: 'pie', // Gráfico de torta
          data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          
            datasets: [
              {
                label: 'Sales',
                data: [40, 39, 10, 40, 39, 80],
               
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#FF9F40',
                  '#4BC0C0',
                  '#9966FF'
                ],
                hoverOffset: 4
              }
            ]
          },
          options: {
            responsive: true, // Hacer que el gráfico sea responsivo
            maintainAspectRatio: false, // Permite personalizar el alto del canvas
            plugins: {
              legend: {
                display: true,
                position: 'top'
              },
              title: {
                display: true,
                text: 'Sales Data (2024)'
              }
            }
          }
        })
      })
  
      return {
        chartRef
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%; /* El gráfico ocupará el 100% del ancho del contenedor */
    height: 400px; /* Puedes ajustar la altura a tu gusto */
  }
  canvas {
    width: 100% !important; /* Fuerza el canvas a ocupar todo el ancho */
    height: 100% !important; /* Mantén el canvas responsivo */
  }
  </style>