<template>
    <barra-navegacion></barra-navegacion>
   
    
    <div  class="shadow p-3   text-sm text-center" align-center style="max-width: 1200px; " >
      <div class="row" >
        <div class="col-4" >
      <v-chip class="d-flex  darken-1 sm"  color="#000000" elevation="1"   >   
       <b>   Crea un nuevo usuario</b> 
 </v-chip>
 </div>
 </div>
          <form @submit.prevent="crearUsuario">
            <div class="row" >
        <div class="col-6" >
          <!-- Usuario, Pass, INstotuciones -->
          <v-text-field type="text" id="usuario" label="Usuario" v-model="usuario" required variant="underlined" block clearable autocomplete="off"></v-text-field>
          <v-text-field type="text" id="clave"  label="Contraseña" v-model="clave" required variant="underlined" block clearable autocomplete="off"></v-text-field>  
          <v-chip class="d-flex  darken-1 sm"  color="#000000" elevation="1"   >
          Seleccionar una Instituciones
          </v-chip>
       
          <select v-model="ValorCombo" class="form-select" id="Combo" >
       
          <option v-for="Combo in ListaCombos" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.nombre}}</option>
        </select> 
        
 
        </div>
          <div class="col-6" >
            <!-- ROles -->
<!-- Permisos input -->
<div class="form-group">
  <v-chip class="d-flex  darken-1 sm"  color="#000000" elevation="1"   >
            <label for="permisos">Permisos:</label>
          </v-chip>
            <br>
            <div class="permisos-check">
            <div class="form-check" v-for="(permiso, index) in permisos" :key="index">
              <input
                type="checkbox"
                :id="permiso"
                class="form-check-input"
                :value="index+1"
                v-model="permisosSeleccionados"
              />
              <label :for="permiso" class="form-check-label"> {{ permiso }}</label>
              </div>
            </div>
          </div>
          </div>
          </div>
      <div class="row" >
        <div class="col-4" >
          <!-- Usuario input -->
          
            
           
        
        </div>
        <div class="col-4" >
          <!-- Contraseña input -->
         
          <!--<div class="form-outline mb-4">
            <label class="form-label" for="clave">Contraseña</label>
            <input type="password" id="clave" class="form-control" v-model="clave" required />
          </div> -->
          </div>
          <div class="col-4" >
          <!-- Select Insttituciones -->
          
      </div>
      </div>
        
        <!-- Submit button -->
        <br>
        <div>
              <button type="reset" class="btn btn-outline-secondary btn-sm m-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
              Cancelar</button>
              <button v-show="!loading" type="submit" class="btn btn-outline-success btn-sm m-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill"
                viewBox="0 0 16 16">
                <path
                  d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5v-13Z" />
                <path
                  d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V16Zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V0ZM9 1h2v4H9V1Z" />
              </svg>
              Guardar</button>
          <div class="loadingLineal" v-show="loading">
            <h1>Linear loader</h1>
            <div class="bar-loadinglineal">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import BarraNavegacion from '@/components/BarraNavegacion.vue';
  export default {
    name: 'acceso',
    components:{
      'barra-navegacion':BarraNavegacion,
    },
    data() {
      return {
        usuario: '',
        codigo: '',
        nombre: '',
        ListaCombos: null,
        ValorCombo: '',
        clave: '',
        permisos: [
        'Crear usuarios',
          'Editar usuarios',
          'Ver usuarios',
          'Editar permisos',
          'Eliminar usuarios',
          'Crear formularios',
          'Ver formularios',
          'Eliminar formularios',
          'Responder formularios',
          'Editar respuestas',
          'Ver respuestas',
          'Eliminar respuestas'
      ], 
        permisosSeleccionados:[],
        loading: false,
        error: null // Agregamos una variable para el mensaje de error
      };
    },
    created() {
       this.MostrarCombo();
 },
    methods: {
      async MostrarCombo() {
      
      this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
      const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=2&pId=0")
        .then((respuesta) => {
          this.ListaCombos = respuesta.data.lista;
          
          console.log("Lista Combos");
          console.log(this.ListaCombos);
         
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
        
            
      this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
    },
      async crearUsuario() {
        
        var payload = {
        username: this.usuario,
        password: this.clave,
        roleID: this.ValorCombo,
        permisos: this.permisosSeleccionados.map(permisoId => ({ permisoId:permisoId }))
      };
        console.log(payload)
 
        // Realizamos la solicitud POST
        await this.axios.post('/api/Usuarios/guardarUsuario', payload)
          .then(response => {
            
            this.$router.push('/usuarios');
            alert("guardado con exito");
          })
          .catch(error => {
            // Verificamos si el error es debido a que el usuario ya existe
            if (error.response && error.response.status === 400) {
              this.error = 'Este usuario ya existe';
            } else {
              console.log('Error en el registro:', error);
            }
          });
  
        this.loading = false;
      }
    }
  };
  </script>
  
    <style>
    .permisos-check {
  max-height: 210px; /* ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}   
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 70vh;
    }
    
    .form-container {
      width: 300px; /* Ancho form*/
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    </style>