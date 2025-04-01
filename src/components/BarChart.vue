<template>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import Chart from 'chart.js/auto'
  
  export default {
    name: 'BarChart',
    setup() {
      const chartRef = ref(null)
  
      // Esta función inicializa el gráfico cuando el componente está montado
      onMounted(() => {
        const ctx = document.getElementById('myChart').getContext('2d')
  
        // Crear la instancia de Chart.js
        new Chart(ctx, {
          type: 'bar', // Tipo de gráfico: barra
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Etiquetas del eje X
            datasets: [
              {
                label: 'Sales', // Nombre del conjunto de datos
                data: [40, 39, 10, 40, 39, 80], // Datos para cada mes
                backgroundColor: '#42A5F5' // Color de las barras
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top'
              },
              title: {
                display: true,
                text: 'Sales Data (2024)' // Título del gráfico
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
  /* Estilos opcionales */
  canvas {
    max-width: 900px;
    margin: auto;
  }
  </style>
  