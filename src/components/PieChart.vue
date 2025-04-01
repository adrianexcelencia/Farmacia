<template>
  <div class="chart-container">
    <canvas id="myChart"></canvas>
  </div>


</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'PieChart',
  data() {
    return {
     
      idUsuario: null // Asegúrate de inicializar idUsuario
    };
  },
  methods: {
    async GenerarDatos() {
      let IdTipo = '';
      
      try {
        const respuesta24 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`);
        const data = respuesta24.data.lista;
        data.forEach(item => {
          IdTipo = item.codigo;
        });

        // Trae datos del gráfico
        let labels_valor = '';
        let data_valor = '';
        const id = this.$route.params.Id;
        
        const respuesta = await this.axios.get(`/api/ConfigForm/ListaGrafico?pTipo=${id}&pInstitucion=${IdTipo}`);
        const dataDatos = respuesta.data.lista;

        dataDatos.forEach(item => {
          data_valor +=  item.cantidad + ",";
          labels_valor += "'" + item.nombre.trim() + "',";
        });

        // Asignar valores
       // this.DatosC = data_valor.slice(0, -1); // Eliminar la última coma
       // this.DatosN = "[" + labels_valor.slice(0, -1) + "]";

        // Llama a la función para crear el gráfico después de obtener los datos
        this.crearGrafico(data_valor.slice(0, -1), labels_valor.slice(0, -1));

      } catch (err) {
        console.log(err);
      }
    },

    crearGrafico(data, labels) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // Convertir DatosC y DatosN a arreglos

  const dataValues = data.split(',').map(Number);
  //alert(dataValues);
  const labelValues = labels.split(','); // Asumiendo que DatosN también es una cadena

  if (!Array.isArray(dataValues) || !Array.isArray(labelValues)) {
    console.error('Datos no válidos para el gráfico');
    return;
  }

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labelValues,
      //labels: ["ALPLAX DIGEST -  caplets x 30", "KETOROLAC LARJAN -  30 mg iny.a.x 100 x 2 ml", "TELZIR SOLUCION -  50 mg/ml sol.x 225 ml", "SERTAL FEM -  cáps.blandas x 6", "ASPIRINETAScomprimidox14"],
      datasets: [
        {
          label: 'Cantidad',
          //data: [10, 8, 5, 3, 2],
          data: dataValues,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF9F40',
            '#4BC0C0',
            '#FFFF84',
            '#9966FF'
          ],
          hoverOffset: 4
        }
      ]
    },

    options: {
      
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Resultado del informe'
        }
      }
    }
  });
}

  },

  created() {
    this.idUsuario = this.$store.state.id_usuario; // Asigna el idUsuario desde el store
    this.GenerarDatos(); // Llama a GenerarDatos en created
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
