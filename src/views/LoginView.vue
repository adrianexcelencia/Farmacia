<template class="text-center">
  <v-card  class="px-4 py-2  text-center w-100" color="#5f968E" elevation="5"  style="height: 100%;">
    <v-card>
      <v-layout>
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  
        <v-app-bar
       
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
          <v-toolbar-title>
            <img :src="require('../assets/LogoBistel.png')" style="max-width: 50%; margin-bottom: 0%; margin-top: 1%"  />
          </v-toolbar-title>
  
        
  
  
          <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          location="bottom"
          temporary
        >
          <v-list
            :items="items"
          ></v-list>
        </v-navigation-drawer>
  
        <v-main style="height: 100%;">
          <v-card-text>
            
         
      
    
    <div class="card border border-1  mx-auto   shadow-lg p-1 mb-2" style="max-width: 650px; margin-bottom: 5%; margin-top: 5%" >
      
      <v-alert
          shaped
          
        color="#5f968E"
        icon="mdi-arrow-up-bold-box-outline"
        density="compact"
        elevation="2"
        border="top"
      >
    <b> Acceso al sistema</b>
   </v-alert>
      
      <div class="row" >
              <div class="col  p-3 text-center "><img :src="require('../assets/LogoVerticalMM.png')" style="max-width: 50%; margin-bottom: 0%; margin-top: 1%"  /></div>
              <div class="col  p-3 text-center ">
  <!-- Parte de Login  -->
  <form @submit.prevent="iniciarSesion()">
        
          
        
        <!-- Usuario input -->
        <div class="form-outline mb-2" >
          <v-text-field append-inner-icon="mdi-account-circle"  v-model="usuario" label="Ingresar Usuario" type="text" id="usuario"  variant="underlined"></v-text-field> 
          
          
        </div>
  
        <!-- Contraseña input -->
        <div class="form-outline mb-2">
          <v-text-field append-inner-icon="mdi-lock"  v-model="clave" label="Ingresar Contraseña" type="password" id="clave"  variant="underlined"></v-text-field> 
          
         
        </div>
        
        <!-- 2 column grid layout for inline styling -->
        <div class="row mb-2 mx-auto ">
          <div class="row d-flex justify-content-center">
            
            <v-btn v-show="!loading" type="submit"  prepend-icon="mdi-checkbox-marked" >  Ingresar </v-btn>
            <!-- Simple link -->
           
         
          </div>
          
        </div>
  
        <!-- Submit button -->
        <div>
          <!-- Loading Lineal -->
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
        <!-- Register buttons -->
        
        <alerta-error :visible = "mostrarAlertaError" :mensaje = "mensajeAlertaError"/>
        <alerta-informacion :visible = "mostrarAlertaInfo" :mensaje = "mensajeAlertaInfo" />
      </form>
  
              </div>
             
      </div>        
     
      <div class="text-center">
          <p><a href="#!" @click="MensajeOlvidoClave()" >Olvidaste tu contraseña?</a> | No tienes una cuenta? <a href="/registro">Registrate</a></p>
        </div>
    <div align-center>
        <img  :src="require('../assets/LogoExc_Chico.png')" style="max-width: 20%; margin-bottom: 0%; margin-top: 1%; align-center"  />
        

        
      </div>  
    </div>
 
  </v-card-text>
        </v-main>
  </v-layout>
    </v-card>
  
      
      </v-card>
   
  </template>
  
  <script>
  import AlertaError from '@/components/AlertaError.vue';
  import AlertaInformacion from '@/components/AlertaInformacion.vue';
  export default {
    name: 'acceso',
    components:{
      'alerta-error': AlertaError,
      'alerta-informacion': AlertaInformacion
    },
    data() {
      return {
        id_usuario: '',
        usuario: '',
        clave: '',
        loading: false,
        mostrarAlertaError: false,
        mensajeAlertaError: "",
        mostrarAlertaInfo: false,
        mensajeAlertaInfo:""
      }
    },
    methods: {
      iniciarSesion() {
        var payload = {
          username: this.usuario,
          password: this.clave
          
        };
      
        this.loading = true;
        this.axios.post('/api/Autenticacion/validar', payload)
          .then(response => {
  
            localStorage.setItem('token', response.data.token);
            
            this.$store.commit('setAuthenticated', true);
  
            this.$store.commit('setUsuario', response.data.usuario);
            this.$store.commit('setIdUsuario', response.data.id_usuario);
  
            // Establece los permisos en Vuex
            this.$store.commit('setPermisos', response.data.permisos);
  
            this.$store.commit('setRol', response.data.rol);
  
            window.location.href = '/movimed/Inicio';
          })
          .catch(response => {
            this.mensajeAlertaError = "El usuario no existe o es incorrecto";
            this.mostrarAlertaError = true;
            
            setTimeout(() => {
                       this.mostrarAlertaError = false;
                      }, 3000);
          });
        this.loading = false;
      },
      MensajeOlvidoClave(){
        this.mostrarAlertaInfo = true;
        this.mensajeAlertaInfo = "Contacta al administrador"
        setTimeout(() => {
                       this.mostrarAlertaInfo = false;
                      }, 5000);
      }
    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  /*
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #182a3f;
    min-height: 100vh;
  }
  body{
    margin: 0; 
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #182a3f;
    min-height: 100vh;
  }*/
  .form-container {
    width: 300px;
    /* Ancho form*/
    padding: 20px;
    
    border-radius: 10px;
    
  }
  
  @import url(https://fonts.googleapis.com/css?family=Lato:300,400);
  
  .loadingLineal {
    padding: 0;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: 'Lato';
    color: #fff;
  }
  
  /* linear loading */
  .bar-loadinglineal {
    align-items: center;
    position: relative;
    height: 5px;
    width: 100%;
    background-color: #bdbdbd;
  }
  
  .bar {
    content: "";
    display: inline;
    position: absolute;
    height: 5px;
    width: 0;
    right: 0;
  }
  
  .bar:nth-child(1) {
    background-color: #006495;
    animation: linear_loader 3s linear 1s infinite;
  }
  
  .bar:nth-child(2) {
    background-color: #006495;
    animation: linear_loader 3s linear 2s infinite;
  }
  
  .bar:nth-child(3) {
    background-color: #006495;
    animation: linear_loader 3s linear 3s infinite;
  }
  
  @keyframes linear_loader {
    0% {
      right: 100%;
      width: 10%;
    }
  
    30% {
      right: 0%;
      width: 40%;
    }
  
    50% {
      right: 0%;
      width: 0%;
    }
  
    80% {
      right: 0%;
      width: 0%;
    }
  
    100% {
      right: 0%;
      width: 0%;
    }
  }
  
  /* end linear loading */
  </style>