<template >
  
  <barra-navegacion></barra-navegacion>
 
  <v-dialog
            v-model="VentanaP"
            persistent
            width="900"
  >
  <div class="row bg-white" >
  <ListadoProveedores @valor-nombre="actualizarNombreP" @valor-codigo="actualizarcodigoP" />
  <v-btn  prepend-icon="mdi-cancel" color="primary" @click="cerrarGrabarP">   <v-spacer></v-spacer> Cerrar</v-btn>
</div>
</v-dialog>
  <div  class="shadow p-2  bg-light text-sm " align-center style="max-width: 1300px; " >
  <v-alert
          shaped  rounded="xl"
        color="#5f968E"
        theme="dark"
        icon="mdi-domain"
        density="compact"
        elevation="4"
        border="top"
      >
       <b> Economato:  </b> 
  
       Ingreso de articulos a economato
      </v-alert>
      <div class="row bg-white" style="max-width: 1300px; ">
        <div class="col-md-3 p-3"  >
          <v-text-field  v-model="nroremito" @keyup.enter="onEnter" label="Nro Comprobante" ref="remitoField" variant="underlined" block></v-text-field>
        </diV>
        <div class="col-md-2 p-3"  >
          <v-text-field  v-model="nproveedor"  @keyup.enter="onEnterP" label="Prestador"  variant="underlined" block></v-text-field>
        </div>
        <div class="col-md-5 p-3"  >
          <v-text-field  v-model="nomproveedor"  label="Nombre Prestador" ref="remitoField" variant="underlined" block></v-text-field>
        </div>
         <div class="col-md-2 p-3"  >
          <label for="fecha">Fecha </label><br>
            <input type="date" id="Fec" v-model="Fecha" name="Fecha">
        </div>
      </div> 
      <!--Ventana de busqueda-->  
      <v-dialog
            v-model="VentanaBuscar"
            persistent
            width="1200"
  >
  <v-card rounded="xl">
  <div  class="shadow p-2  bg-primary text-sm text-left" align-center style="max-width: 1350px; " >
  <div class="row bg-white" >
    
 
  <div class="row" >
      <div class="col-9">
        <BuscarArticulos @valor-enviado="actualizarNombre" @valor-nroregistro="actualizarnroregistro" @valor-precio="actualizarprecio" @valor-codigo="actualizarcodigo"  />
      </div>
      <div class="col-3">
       
        <div class="row" >
          <div class="col-6">
            <v-text-field  v-model="nroregistro" label="nroregistro" variant="underlined" block></v-text-field>
          </div>
          <div class="col-6">
            <v-text-field  v-model="codigo" label="codigo"  ref="codigoField" variant="underlined" block></v-text-field>
          </div>
        </div>  
        
       
        <v-text-field  v-model="nombre" label="nombre" variant="underlined" block></v-text-field>
        
        
        <div class="row" >
          <div class="col-4">
            <v-text-field  v-model="precio" label="$ P.U." variant="underlined" block></v-text-field>
          </div>
          <div class="col-4">
            <v-text-field  v-model="preciocosto" label="$ P. C." variant="underlined" block></v-text-field>
          </div>
          <div class="col-4">
            <v-text-field  v-model="cantidad" label="cantidad" ref="cantidadField" variant="underlined" block></v-text-field>
          </div>

        </div>
        <div class="row" >
          <div class="col-6">
            <label for="fecha">Fecha Ven.</label>
            <input type="date" id="FecVen" v-model="FecVen" name="FecVen">
          </div>
          <div class="col-6">
            <v-text-field  v-model="Lote" label="Lote"  variant="underlined" block></v-text-field>
          </div>
        </div>
        <div class="row" >
          <div class="col-12">
            <v-card
                @click="VerGrabar()"  rounded="xl"
                class="mx-auto"
                elevation="10"
                prepend-icon="mdi-application-edit-outline" 
                color ="primary"
              >
                <template v-slot:title>
                 Agregar
                </template>

                <v-card-text>
                  Agregar articulo al remito 
                </v-card-text>
              </v-card>
            </div>
             <!-- 
            <div class="col-6">
              <v-card
                @click="Limpiar()"  rounded="xl"
                class="mx-auto"
                elevation="10"
                prepend-icon="mdi-application-cog-outline" 
                color ="primary"
              >
                <template v-slot:title>
                 Nuevo
                </template>

                <v-card-text>
                  Cargar nuevo remito 
                </v-card-text>
              </v-card>
            </div>
            -->
         </div>   
        
              <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
              <alerta-suceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
      </div>
   </div> 
   <div class="row" >
    <div class="col-9">
    </div>
    <div class="col-3">

      <v-card
                @click="Cerrar()"  rounded="xl"
                class="mx-auto"
                elevation="10"
                prepend-icon="mdi-close-box" 
                color ="primary"
              >
                <template v-slot:title>
                 Cerrar
                </template>

             
              </v-card>
              <br>
    </div>
    </div>
   
 </div>

</div>

</v-card>
  </v-dialog>
    <!--FIN Ventana de busqueda--> 

   <div class="row" >
    <div class="col-9">
      <AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
      <alerta-suceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
    </div>
    <div class="col-3">
      <v-card
                @click="AgregarArticulos()"  rounded="xl"
                class="mx-auto"
                elevation="10"
                prepend-icon="mdi-application-cog-outline" 
                color ="primary"
              >
                <template v-slot:title>
                 Nuevo
                </template>

                <v-card-text>
                  Cargar nuevo articulos 
                </v-card-text>
              </v-card>
    </div>
    </div>
  
   <br>
<ListadoConsumoIngreso :remitoValue="nroremitoPasado" ref="listadoConsumo" />
</div>
<v-dialog
          v-model="VentanaGrabar"
          persistent
          width="500"
> 
<v-alert
        shaped
      color="#F5F5F5"
      theme="dark"
      icon="mdi-alert"
      density="compact"
      elevation="4"
      border="top"
    >

<!-- Alerta de confirmación personalizada -->
    <div v-if="Grabar"  role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
              <use xlink:href="#info-fill" />
          </svg>
          <div>
              <div class="row">
                <div class="col  p-3 text-center ">
        <v-btn  prepend-icon="mdi-cancel" color="#FFFFFF" @click="Grabar">   <v-spacer></v-spacer> Grabar</v-btn>
      </div>         
        <div class="col  p-3 text-center ">
        <v-btn  prepend-icon="mdi-cancel" color="#FF0000" @click="cerrarGrabar">   <v-spacer></v-spacer> Cancelar</v-btn>
      </div>
      </div>
          </div>
      </div>
      
      <!--fin alerta confirmacion obtenerValores-->
  </v-alert>
  </v-dialog>
</template>
<script>

//import datos from "../assets/json/pokemones.json";
import ListadoConsumoIngreso from  '../components/ListadoConsumoIngreso.vue';
import BuscarArticulos from '../components/BuscarArticulos.vue';
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import Spinner from '@/components/Spinner.vue';
import AlertaSuceso from '@/components/AlertaSuceso.vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import DataTablesCore from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import AlertaMensaje from '@/components/AlertaMensaje.vue';
import ListadoProveedores from '@/components/ListadoProveedores.vue';




import { ref } from 'vue';
const table = ref();
export default {
  arreglobuscador: [],
  name: 'TableCom',
  name: "Formularios",
  components: {
    'spinner': Spinner,
    'barra-navegacion': BarraNavegacion,
    'alerta-suceso': AlertaSuceso,
    BuscarArticulos,
    ListadoProveedores,
    AlertaMensaje,
    ListadoConsumoIngreso,
     DataTable
  },
  name: 'Pokemones',
  props: {
    msg: String
  },
  
  data: function () {
    return {
      datos: null,
      VentanaGrabar: false,
      VentanaP: false,
      VentanaBuscar: false,
      Fecha:'',
      Lote:'',
      valor:'',
      buscar: '',
      nombre: "",
      codigo: "",
      fecha: "",
      FecVen: "",
      Fec: "",
      cantidad: "",
      nproveedor: "",
      //IdTipo: "",
      mostrarAlertaSuceso: false,
      mensajeAlertaSuceso:"",
      mostrarAlertaEliminar: false,
      nroremitoPasado: '',
      
    
    
      
    }
  },
  created() {
    
    this.idUsuario = this.$store.state.id_usuario;
    //this.ver();
    
  },
  computed: {
           
 
          
   
         
        },
  methods: {
    Cerrar(){
      this.VentanaBuscar = false;
    },
    AgregarArticulos(){
      if (!this.Fecha || this.Fecha.length == 0) {
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar una Fecha ";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.nroremito || this.nroremito.length == 0) {
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un numero de comprobante ";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.nproveedor || this.nproveedor.length == 0) {
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe seleccionar un proveedor (enter para habilitar buscador) ";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
        this.VentanaBuscar = true;
    },

    actualizarNombreP(valor) {
      this.nomproveedor = valor;
      //this.nroremitoPasado = this.nroremito;

    },
    actualizarcodigoP(valor) {
      this.nproveedor = valor;
      this.VentanaP = false;
      //this.nroremitoPasado = this.Numero;
      //alert(this.nroremitoPasado);
    },
    cerrarGrabarP(){
      this.VentanaP = false;
    },
    async recuperodatos(){
      
    this.VerDatosText = "";
    let Institucion = "";
    const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta) => {
    let data = []; //declarar la variable data
    this.datos = respuesta.data.lista
    data = respuesta.data.lista;
    data.forEach(item => { Institucion = item.codigo;  }); })
      .catch(err => { console.log(err); });
        /////////////////////////
       
        //Datos de Impresion 
        
        const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarDatosEconomato?pI=${Institucion}&pN=${this.nroremito}`, {
  }).then((respuesta_s) => {
    let data_s = []; //declarar la variable data
    this.datos = respuesta_s.data.lista
    data_s = respuesta_s.data.lista;
    data_s.forEach(item_s => { this.nomproveedor = item_s.nompres; this.nproveedor = item_s.proveedor;this.Fecha = item_s.Fecha;  }); })
      .catch(err => { console.log(err); });
        //////
   },
    onEnter() {
      this.recuperodatos();
      this.nroremitoPasado = this.nroremito;

    },
    onEnterP() {
      this.VentanaP = true;

    },
  async ver() {
  let IdTipo = "";
  const respuesta = await this.axios.get(`/api/ConfigForm/ListarTipoMovimiento?pTipo=1&pId=${this.idUsuario}`, {
  }).then((respuesta) => {
    let data = []; //declarar la variable data
    this.datos = respuesta.data.lista
    data = respuesta.data.lista;
    data.forEach(item => { IdTipo = item.idMovimientoStock; }); })
      .catch(err => { console.log(err); });
    },
    Limpiar(){
      this.nombre = "";
      this.codigo = "";
      this.cantidad = "";
      this.precio = "";
      this.nroremito = "";
      this.nroregistro = "";
      this.Lote = "";
    },
    VerGrabar() {
       
       this.VentanaGrabar = true;
       this.mostrarAlertaGrabar = true;
   },
   cerrarGrabar() {
       this.VentanaGrabar = false;
   },
    actualizarNombre(valor) {
      this.nombre = valor;
    },
    actualizarnroregistro(valor) {
      this.nroregistro = valor;
    },
    actualizarprecio(valor) {
      this.precio = valor;
    },
    actualizarcodigo(valor) {
      this.codigo = valor;
    },
    async Grabar(){
      
      this.mostrarAlertaSucesoMensaje = false;
      if (!this.nroremito || this.nroremito.length == 0) {
        this.$refs.remitoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un numero de remito";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
      if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.cantidad || this.cantidad.length == 0) {
        this.$refs.cantidadField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar cantidad";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.cantidad || isNaN(this.cantidad) || this.cantidad <= 0) {
    this.$refs.cantidadField.$el.querySelector('input').focus();
    this.VentanaGrabar = false;
    this.mostrarAlertaEliminar = false;
    this.mostrarAlertaSucesoMensaje = true;
    this.mensajeAlertaSuceso = "Debe ingresar una cantidad válida (número mayor a 0)";
    setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
    }, 5000);
    return;
}
   if (!this.cantidad || this.cantidad.length == 0) {
        this.$refs.cantidadField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar cantidad";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.cantidad || this.cantidad.length == 0 || this.cantidad <= 0) {
    this.VentanaGrabar = false;
    this.$refs.cantidadField.$el.querySelector('input').focus();
    this.mostrarAlertaEliminar = false;
    this.mostrarAlertaSucesoMensaje = true;
    this.mensajeAlertaSuceso = "Debe ingresar una cantidad mayor que 0";
    setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
    }, 5000);
    return;
}
if (!this.preciocosto || this.preciocosto.length == 0 || this.preciocosto <= 0) {
    this.VentanaGrabar = false;
    this.$refs.cantidadField.$el.querySelector('input').focus();
    this.mostrarAlertaEliminar = false;
    this.mostrarAlertaSucesoMensaje = true;
    this.mensajeAlertaSuceso = "Debe ingresar un precio costo mayor que 0";
    setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
    }, 5000);
    return;
}
if (!this.preciocosto || isNaN(this.preciocosto) || this.preciocosto <= 0) {
    this.$refs.cantidadField.$el.querySelector('input').focus();
    this.VentanaGrabar = false;
    this.mostrarAlertaEliminar = false;
    this.mostrarAlertaSucesoMensaje = true;
    this.mensajeAlertaSuceso = "Debe ingresar una precio de costo válida (número mayor a 0)";
    setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
    }, 5000);
    return;
}
if (!this.Lote || this.Lote.length == 0) {
        this.$refs.cantidadField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar Lote";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.FecVen || this.FecVen.length == 0) {
        this.VentanaGrabar = false;
        this.$refs.cantidadField.$el.querySelector('input').focus();
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar Fecha de Vencimiento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   
   //Institucion
   ///////
  let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { 
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Ocurrió un error al inentar recuperar el IdInst";
        setTimeout(() => {
           this.mostrarAlertaSuceso = false;
       }, 5000);
       });
        //////////
   //Recuoero Tipo de Movimiento
   let IdTipo = "";
  const respuesta = await this.axios.get(`/api/ConfigForm/ListarTipoMovimiento?pTipo=1&pId=${IdInst}`, {
  }).then((respuesta) => {
    let data = []; //declarar la variable data
    this.datos = respuesta.data.lista
    data = respuesta.data.lista;
    data.forEach(item => { IdTipo = item.idMovimientoStock;  }); })
      .catch(err => { 
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Ocurrió un error al inentar recuperar el IdTipo";
        setTimeout(() => {
           this.mostrarAlertaSuceso = false;
       }, 5000);

      });
   ///////////////////////////////////
    //Recuoero Sector
    let IdSector = "";
  const respuesta_s = await this.axios.get(`/api/ConfigForm/ListarTipoMovimiento?pTipo=3&pId=${IdInst}`, {
  }).then((respuesta_s) => {
    let data_s = []; //declarar la variable data
    this.datos = respuesta_s.data.lista
    data_s = respuesta_s.data.lista;
    data_s.forEach(item_s => { IdSector = item_s.idMovimientoStock;  }); })
      .catch(err => {
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Ocurrió un error al inentar recuperar el IdSector";
        setTimeout(() => {
           this.mostrarAlertaSuceso = false;
       }, 5000);
       });
   ///////////////////////////////////
   this.VentanaGrabar = true;
   //alert(this.Fecha);
   //alert(this.nproveedor);
  
   await this.axios.post(`/api/ConfigForm/AgregarEconomato/0/${this.nroregistro}/${this.nroremito}/0/0/${this.Fecha}/0/${this.cantidad}/${IdSector}/${this.idUsuario}/${IdTipo}/${this.nproveedor}/${this.FecVen}/${this.Lote}/${this.precio}/${this.preciocosto}`)
   //await this.axios.post(`/api/ConfigForm/AgregarEconomato/0/${this.nroregistro}/${this.nroremito}/0/0/${this.Fecha}/0/${this.cantidad}/${IdSector}/${this.idUsuario}/${IdTipo}/${this.nproveedor}/2024-01-01/0/123/123`)  
   .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
       this.mostrarAlertaSuceso = true;
       ///Limpiar los datos
       this.$refs.listadoConsumo.MostrarRemito();
       this.VentanaGrabar = false;
       this.nombre = "";
       this.codigo = "";
       this.cantidad = "";
       this.precio = "";
       this.Lote = "";
       this.nroregistro = "";
       /////////
     

       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
            })
   .catch(error => {
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Ocurrió un error al grabar los datos:", error;
        setTimeout(() => {
           this.mostrarAlertaSuceso = false;
       }, 5000);
     });
    


    },
 
  
   
  },
}
</script>
<style>
@import 'datatables.net-dt';
.custom-margin-botonN{
  margin-left: 115px; /* Ajusta el valor según tus necesidades */
}
 .table-container {
  max-height: 420px; /* ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}
tr.v-data-table__selected {
  background: #7d92f5 !important;
}
</style>