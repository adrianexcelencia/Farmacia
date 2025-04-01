<template>
    <v-container>
      <div class="row bg-white">
        <!-- Primera fila -->
        <div class="col-md-3">
          <v-text-field
            v-model="formData.id"
            label="ID"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-6">
          <v-text-field
            v-model="formData.descripcion"
            label="Descripción"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-3">
          <v-text-field
            v-model="formData.codigo"
            label="Código"
            dense
          ></v-text-field>
        </div>
  
        <!-- Segunda fila -->
        <div class="col-md-3">
          <v-text-field
            v-model="formData.precioVenta"
            label="Precio Venta"
            type="number"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-3">
          <v-text-field
            v-model="formData.precioCosto"
            label="Precio Costo"
            type="number"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            v-model="formData.stockMaximo"
            label="Stock Máximo"
            type="number"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            v-model="formData.stockMedio"
            label="Medio"
            type="number"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            v-model="formData.stockMinimo"
            label="Mínimo"
            type="number"
            dense
          ></v-text-field>
        </div>
  
        <!-- Tercera fila -->
        <div class="col-md-4">
          <v-select
            v-model="formData.tipo"
            :items="tiposItems"
            label="Tipo"
            dense
          ></v-select>
        </div>
        <div class="col-md-2">
          <v-checkbox
            v-model="formData.precioVentaManual"
            label="Precio Venta Manual"
            dense
          ></v-checkbox>
        </div>
        <div class="col-md-3">
          <v-text-field
            v-model="formData.troquel"
            label="Troquel"
            dense
          ></v-text-field>
        </div>
        <div class="col-md-3">
          <v-text-field
            v-model="formData.codBarras"
            label="Cód. Barras"
            dense
          ></v-text-field>
        </div>
  
        <!-- Checkboxes -->
        <div class="col-12">
          <v-checkbox
            v-model="formData.noTenerCia"
            label="No tener en Cía en listado ART"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="formData.incluirUrgencia"
            label="Incluir en Parte de Urgencia"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="formData.incluirGastos"
            label="Incluir en Gastos N. N."
            dense
          ></v-checkbox>
        </div>
  
        <!-- Consumo -->
        <div class="col-12">
          <h3>Consumo</h3>
          <div class="row">
            <div class="col-md-6">
              <h4>Amb:</h4>
              <v-checkbox
                v-model="formData.consumo.ambulatorio.sinCargo"
                label="Sin Cargo en Ambulatorio"
                dense
              ></v-checkbox>
              <v-checkbox
                v-model="formData.consumo.ambulatorio.aFacturar"
                label="A Facturar en Ambulatorio"
                dense
              ></v-checkbox>
            </div>
            <div class="col-md-6">
              <h4>Int:</h4>
              <v-checkbox
                v-model="formData.consumo.internacion.sinCargo"
                label="Sin Cargo en Internación"
                dense
              ></v-checkbox>
              <v-checkbox
                v-model="formData.consumo.internacion.aFacturar"
                label="A Facturar en Internación"
                dense
              ></v-checkbox>
            </div>
          </div>
        </div>
  
        <!-- Botones -->
        <div class="col-12 text-center mt-4">
          <v-btn color="primary" class="mr-2" @click="guardar">Grabar</v-btn>
          <v-btn color="success" class="mr-2" @click="nuevo">Nuevo</v-btn>
          <v-btn color="error" @click="anular">Anular</v-btn>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          id: '',
          descripcion: '',
          codigo: '',
          precioVenta: '',
          precioCosto: '',
          stockMaximo: '',
          stockMedio: '',
          stockMinimo: '',
          tipo: '',
          troquel: '',
          codBarras: '',
          precioVentaManual: false,
          noTenerCia: false,
          incluirUrgencia: false,
          incluirGastos: false,
          consumo: {
            ambulatorio: {
              sinCargo: false,
              aFacturar: false
            },
            internacion: {
              sinCargo: false,
              aFacturar: false
            }
          }
        },
        tiposItems: ['Tipo 1', 'Tipo 2', 'Tipo 3'] // Opciones para el select de Tipo
      }
    },
    methods: {
      guardar() {
        console.log('Guardando:', this.formData)
      },
      nuevo() {
        Object.keys(this.formData).forEach(key => {
          if (typeof this.formData[key] === 'object') {
            Object.keys(this.formData[key]).forEach(subKey => {
              this.formData[key][subKey] = false
            })
          } else {
            this.formData[key] = ''
          }
        })
      },
      anular() {
        this.nuevo()
      }
    }
  }
  </script>