<template class="text-center">
  <barra-navegacion></barra-navegacion>
  
  <v-dialog
            v-model="MensajeStock"
            persistent
            width="1150"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <ListadoStock />
    <div class="row bg-white" >
      <div class="col-md-9" ></div>
      <div class="col-md-3" >
          <v-btn @click="CerrarOk()"  rounded="xl"  color="success"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>      
        </div>
      </div>  
        </div>
  </v-card>
  </v-dialog>
  <v-dialog
            v-model="MensajeProveedor"
            persistent
            width="1150"
  > 
  <v-card rounded="xl">

  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <Proveedores :remitoValue="nroremitoPasado" />
    
          <v-btn @click="CerrarOk()"  color="success"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>      
  </div>
</v-card>
  </v-dialog>
  <!--Componente de Asociar Medciacmentos-->
  <v-dialog
            v-model="MensajeAsociar"
            persistent
            width="1150"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <AsociarMed :remitoValue="nroremitoPasado" />
    
          <v-btn @click="CerrarOk()"  rounded="xl"  color="success"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>      
  </div>
</v-card>
  </v-dialog>
  <!--Fin asociar medicamentos-->
  <v-dialog
            v-model="MensajeCorreo"
            persistent
            width="1150"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <Asignarcorreo :remitoValue="nroremitoPasado" />
    
          <v-btn @click="CerrarOk()"  rounded="xl"  color="success"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>      
  </div>
  </v-card>
  </v-dialog>
  
  <v-dialog
            v-model="MensajeOk"
            persistent
            width="450"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    <v-row justify="center" align="center" class="my-container">
    <v-col cols="auto">
      <v-icon color="green darken-2" size="80">
        mdi-checkbox-marked-circle-outline
      </v-icon>
    </v-col>
  </v-row> 
          <v-btn @click="CerrarOk()"  rounded="xl"  color="success"  x-small  prepend-icon="mdi-close-box" block>Aceptar</v-btn>      
  </div>
</v-card>
  </v-dialog>
  <v-dialog
            v-model="VentanaAlmacenamiento"
            persistent
            width="600"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
    
    <v-textarea
    v-model="TextMedicamento" label="Alerta" variant="underlined" size="small" 
        ></v-textarea>
        <div class="row bg-white" >
          <div class="col-md-6" >
            <v-btn @click="GrabarA()"  rounded="xl" color ="primary" x-small  prepend-icon="mdi-application-export" block>Grabar</v-btn> 
          </div>
          <div class="col-md-6" >
            <v-btn @click="CerrarAlmacenamiento()"  rounded="xl"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>
          </div>
        </div>  
        
         
  </div>
  </v-card>
  </v-dialog>
  <v-dialog
            v-model="VentanaSecundario"
            persistent
            width="650"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >

    <v-textarea
           v-model="TextAlerta" label="Alerta" variant="underlined" size="small"
        ></v-textarea>
        <div class="row bg-white" >
          <div class="col-md-6" >
            <v-btn @click="GrabarE()"  rounded="xl" color ="primary" x-small  prepend-icon="mdi-application-export" block>Grabar</v-btn> 
          </div>

          <div class="col-md-6" >
            <v-btn @click="CerrarSecundario()"  rounded="xl"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>
          </div>
        </div>  
        
         
  </div>
</v-card>
  </v-dialog>
  <v-dialog
            v-model="VentanaPatologia"
            persistent
            width="650"
  > 
  <v-card rounded="xl">
  <div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >

    <v-textarea
           v-model="TextPatologia" label="Alerta" variant="underlined" size="small"
        ></v-textarea>
        <div class="row bg-white" >
          <div class="col-md-6" >
            <v-btn @click="GrabarP()"  rounded="xl" color ="primary" x-small  prepend-icon="mdi-application-export" block>Grabar</v-btn> 
          </div>

          <div class="col-md-6" >
            <v-btn @click="CerrarPatologia()"  rounded="xl"  x-small  prepend-icon="mdi-close-box" block>Cerrar</v-btn>
          </div>
        </div>  
        
         
  </div>
</v-card>
  </v-dialog>
  <v-card  class="px-4 py-2  text-center w-100 bg-light" elevation="3"  style="max-width: 1350px; ">
   
<div  class="shadow p-3  bg-light text-sm text-left" align-center style="max-width: 1350px; " >
  
 
  <v-alert
          shaped
          rounded="xl"
        color="#5f968E"
        theme="dark"
        icon="mdi-blur-radial"
        density="compact"
        elevation="4"
        border="top"
      >
       <b> Articulos:  </b> 
  
       Carga de articulos asociados a AlfaBeta
      </v-alert>
      <br>
      <!-- ingreso de datos -->
<!-- Nuevo-->
<div class="row bg-white">
     
          <v-text-field v-show="mostrarCampo" v-model="Identificador" label="Identificador"  variant="underlined" size="small" ></v-text-field>
    
      <div class="col-md-1">
        <v-text-field v-model="codigo"  @keyup.enter="VerificoCodigo" ref="codigoField" label="codigo" variant="underlined" size="small" ></v-text-field></div>
        <div class="col-md-1">
        <v-btn @click="VerificoCodigo24"  rounded="xl"  title="Verificr proximo codigo disponible "  x-small  prepend-icon="mdi-check" ></v-btn>
        <v-snackbar
      v-model="snackbar" color="success" rounded="pill"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      </div>
     
      <div class="col-md-5">
        <v-text-field  name="Nombre" ref="nombreField" v-model="Nombre" label="Nombre" variant="underlined" size="small" ></v-text-field></div>
    
      <div class="col-md-1">
        <v-text-field v-model="NroRegistro" label="NroRegistro" variant="underlined" size="small" ></v-text-field></div>
 
      <div class="col-md-1">
        <v-text-field v-model="troquel" label="troquel" variant="underlined" size="small" ></v-text-field></div>
        <div class="col-md-2">
          <v-text-field v-model="barra" label="barra" variant="underlined" size="small" ></v-text-field>
          </div>
          <div class="col-md-1">
            <v-text-field v-model="Precio"  label="Precio" variant="underlined" size="small" ></v-text-field>
            </div>
      
    </div>
    <div class="row bg-white">
      <div class="col-md-3">
        Selecciona un sector
      <select v-model="ValorCombo" class="form-select" id="Combo" style="border-radius: 12px;" >
        <option value="0">Seleccionar un sector...</option> 
        <option v-for="Combo in ListaCombos" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
      </select> 
        </div>
        <div class="col-md-3">
          Selecciona un Tipo de Medicamento
      <select v-model="ValorComboTipo" class="form-select" id="Combo" style="border-radius: 12px;" >
        <option value="0">Seleccionar un Tipo de Medicamento...</option> 
        <option v-for="Combo in ComboListaTipoMedicamento" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
      </select>
          </div>
          <div class="col-md-2" >
  <v-text-field v-model="stockminimo" type="number" label="stockminimo" ref="stockminimoField" variant="underlined" size="small" ></v-text-field>
</div>
<div class="col-md-2"  >
  <v-text-field v-model="stockmedio" type="number" label="stockmedio" ref="stockmedioField" variant="underlined" size="small" ></v-text-field>
</div>
<div class="col-md-2" >
  <v-text-field v-model="stockmaximo" type="number" label="stockmaximo" ref="stockmaximoField" variant="underlined" size="small" ></v-text-field>
</div>
      </div>

      <!--Fin -->

<!-- COMPONENTE Busca en AlfaBeta --> 
<div class="row bg-white" >
  <div class="col-md-4" >
    <!-- buscador de alfabeta --> -
    <v-alert
          shaped
          rounded="xl"
        color="white"
        theme="dark"
        icon="mdi-arrow-right-bold-circle"
        density="compact"
        elevation="4"
        border="top"
      >
       <b> Buscador de Medicamentos en AlfaBeta </b> <br>
       <div class="row bg-white" >
      <div class="col-12" >
        <v-text-field @keyup.enter="handleEnter" v-model="buscar" append-inner-icon="mdi-magnify"  label="Busqueda por nombre en AlfaBeta" variant="underlined" block></v-text-field>
      </div>
      
    </div>
     
      </v-alert>
    
    <!--FIN  buscador de alfabeta --> 
    
     
      
    </div>
  <div class="col-md-4" >
     <!--Cargo Dosis -->
    
      Seleccionar Dosis
      <select v-model="ValorComboDosis" class="form-select" id="Combo" style="border-radius: 12px;" >
        <option value="0">Seleccionar un dosis...</option> 
        <option v-for="Combo in ListaCombosDosis" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
      </select>  
      <br>
      Seleccionar tamaño
      <select v-model="ValorComboTamano" class="form-select" id="Combo" style="border-radius: 12px;" >
        <option value="0">Seleccionar un tamaño...</option> 
        <option v-for="Combo in ListaCombosTamano" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
      </select>  
     
    </div>
    <div class="col-md-4" >
     <!--Cargo form -->
    
      Seleccionar forma
      <select v-model="ValorComboForma" class="form-select " style="border-radius: 12px;"  id="Combo" >
        <option value="0">Seleccionar un forma...</option> 
        <option v-for="Combo in ListaCombosForma" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
      </select>  
      <br>
      Seleccionar Categoria Terapeutica
      <select v-model="ValorComboTera" class="form-select" id="Combo" style="border-radius: 12px;" >
        <option value="0">Seleccionar un Categoria...</option> 
        <option v-for="Combo in ListaCombosTera" :key="Combo.codigo"  :value="Combo.codigo">{{Combo.codigo}} -- {{Combo.nombre}}</option>
      </select>  
    
     
    </div>





<div class="row " >
  <div class="col-md-3 p-3" >
    <v-btn @click="VerAlmacenamiento()" rounded="xl" color="primary accent-4"  x-small  prepend-icon="mdi-archive-arrow-up" title="Restricción de almacenamiento, Registrar condiciones específicas de almacenamiento, como temperatura, humedad etc." block v-if="$store.state.permisos.includes(10)" >Alerta de almacenamiento</v-btn> 
  </div>
  <div class="col-md-3 p-3" >
    <v-btn @click="VerSecundario()" rounded="xl" color="primary accent-4"  small p prepend-icon="mdi-archive-arrow-up" title="Descripción Detallada: su uso, posibles efectos secundarios y precauciones" block v-if="$store.state.permisos.includes(10)" >Efectos secundarios </v-btn> 
  </div>
  <div class="col-md-3 p-3" >
    <v-btn @click="VerPatologia()" rounded="xl" color="primary accent-4" small  p prepend-icon="mdi-archive-arrow-up" title="Alertas: de medicamentos que pueden afectar alguna patología Ej Diabetes, presión alta, alergias etc. " block v-if="$store.state.permisos.includes(10)" >Alerta por patología  </v-btn> 
  </div>
  <div class="col-md-3 p-3" >
    <v-btn @click="VerProveedores()" rounded="xl" color="primary accent-4" small  p prepend-icon="mdi-archive-arrow-up" title="Vincular el medicamento con su proveedor correspondiente y almacenar
 información de contacto relevante" block v-if="$store.state.permisos.includes(10)" >Proveedores  </v-btn> 
  </div>

</div>  
</div>
<div class="row bg-white" >
  <div class="col-md-3 p-3" >
    <v-btn @click="VerCorreo()" rounded="xl" color="primary accent-4" small  p prepend-icon="mdi-archive-arrow-up" title="ASIGNAR DIRECCION DE CORREO ELCTRONICO PARA SU NOTIFICACION CUANDO SE REALIZA LA DEVOLUCION DEL MEDICAMENTO" block v-if="$store.state.permisos.includes(10)" >Alerta via e-mail  </v-btn> 
  </div>
  <div class="col-md-3 p-3" >
    <v-btn @click="VerAsociar()" rounded="xl" color="primary accent-4" small  p prepend-icon="mdi-archive-arrow-up" title="Asociar medicamentos" block v-if="$store.state.permisos.includes(10)" >Asociar Medicamento  </v-btn> 
  </div>
  <div class="col-md-3 p-3 " >
    <v-card
  elevation="2" rounded="xl"
>
<v-checkbox

      v-model="checkboxTraza"
      :label="`Acepta trazabiliadad`"
      color="primary"
    ></v-checkbox>
</v-card>
    
  </div>
  <div class="col-md-3 p-3" >
    <v-card
  elevation="2" rounded="xl"
>
    <v-checkbox
      v-model="checkboxStock"
      :label="`Acepta stock negativo`"
      color="primary"
    ></v-checkbox>
    </v-card>
  </div>
</div>  








<div >
    <div class="content" ref="scrollContainer">
      <div class="row mt-5  shadow p-3" style="font-size: 14px">
        <div class="col-md-4 shadow p-3" v-for="item in ListaFormulariosMed" v-bind:key="item.nroRegistro" @click="Mostrar(  item.nombre, item.precio, item.nroRegistro, item.presentacion,item.codBarras,item.troquel)"> 
          <div class="card mb-4 bg-primary shadow p-3">
            <div class="card-body"><v-icon start icon="mdi-arrow-right" ></v-icon>
              {{ item.nombre }} -  {{ item.presentacion }}   <br>
              Cdo. Barra: {{ item.codBarras }}   - Troquel:  {{ item.troquel }}  
                <div class="row" >
                  <div class="col-6 text-left "><strong>$</strong> {{ item.precio }} </div>
                  <div class="col-6 text-center ">
                    <strong>Vigencia</strong> {{ item.vigencia }}
                  </div>
            </div>        
         </div>
         </div>
       </div>

</div>
</div>

</div>
<AlertaMensaje  :visible = "mostrarAlertaSucesoMensaje" :mensaje = "mensajeAlertaSuceso" color="#FF0000"/>
<div class="row shadow p-3 bg-white" >
<div class="row bg-white" >

  <div class="col-md-3 p-3" >
 <v-btn @click="VerGrabar()" rounded="xl" color="primary" p prepend-icon="mdi-application-edit-outline" block>Grabar</v-btn> 
 </div>
 <div class="col-md-3 p-3" >
 <v-btn @click="Limpiar()" rounded="xl" color="primary" p prepend-icon="mdi-application-cog-outline" block>Nuevo</v-btn> 
 </div>
 <div class="col-md-3 p-3">
  <v-btn @click="mostrarConfirmacionEliminar()" rounded="xl"  color="#FF0000" p prepend-icon="mdi-trash-can-outline" block>Eliminar</v-btn> 
</div>
<div class="col-md-3 p-3">
  <v-btn @click="mostrarStock()" rounded="xl" color="success" p prepend-icon="mdi-alpha-s-box" block>Stock</v-btn> 
</div>
</div>
</div>
<br>
<!-- COMPONENTE Listado de Medicamentos 
<ListarMed />
--> 
<v-alert
          shaped rounded="xl"
        color="#5f968E"
        theme="dark"
        icon="mdi-arrow-right-bold-circle"
        density="compact"
        elevation="4"
        border="top"
      >
       <b> Listado de Articulos </b> 
  
     
      </v-alert>

<div class="row bg-white" >
              <div class="col-md-4  p-3 text-center ">
               
                </div>
                <div class="col-md-4  p-3 text-center ">
                 
                </div>
                <div class="col-md-4  p-3 text-center ">
                    <v-text-field v-model="searchQuery" label="Buscador" append-inner-icon="mdi-magnify" variant="underlined" size="small" ></v-text-field>
                </div>
          </div>
          <div class="table-responsive">
      <table class="table table-striped bg-white text-left" style="font-size: 14px;">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index" >
              <v-chip class="d-flex  darken-1 sm"   elevation="1"   > 
              {{ header.toUpperCase() }}
            </v-chip>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
            <td v-for="(header, colIndex) in headers" :key="colIndex">{{ row[header] }}</td>
            <td>
            <v-btn @click="sendRowData(row)" prepend-icon="mdi-check" small rounded="xl" class="bg-primary" ></v-btn>
          </td>
          </tr>
          
        </tbody>
      </table>
      </div>
      <div class="pagination">
        <v-btn @click="prevPage" :disabled="currentPage === 1" rounded="xl" class="bg-primary">Anterior</v-btn>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <v-btn @click="nextPage" :disabled="currentPage === totalPages" rounded="xl" class="bg-primary">Siguiente</v-btn>
      </div>
      
    </div>
 




 

    <!-- codigo anterios -->



      <spinner :visible="MostrarSpinner"></spinner>
      <div v-if="!MostrarSpinner">
          
          
          <div >
          
          <!--Titulo del Formulario-->
         
          
   
      </div>    
          
      
          
  
             
           <v-dialog
            v-model="dialog"
            persistent
            
             fullscreen
             
            >   
          </v-dialog> 
            <v-card>
             
 
 <div class="col  p-3 text-center">
            
       
             <alerta-suceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
      <!--fin alerta suceso-->
           <!-- Alerta de confirmación personalizada -->
        
      <div v-if="mostrarAlertaEliminar"  class="alert alert-primary d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
          <use xlink:href="#info-fill" />
        </svg>
        <div>
          ¿Estás seguro de que deseas eliminar este registro?
          <button class="btn btn-outline-danger btn-sm ms-3" @click="eliminarform(idConfigFormToDelete)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Confirmar</button>
          <button class="btn btn-outline-secondary btn-sm ms-2" @click="cancelarEliminacion">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
              viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
            </svg>
            Cancelar</button>
        </div>
      </div> <!--fin alerta confirmacion-->
   </div>
          
            </v-card>
       
        
  </div>

  <!-- Ventana GRABER -->
 
<v-dialog
            v-model="VentanaGrabar"
            persistent
            width="500"
  > 
  <v-alert
          shaped
        color="#CCCCCC"
        theme="dark"
        icon="mdi-alert"
        density="compact"
        elevation="4"
        border="top"
      >
  <!-- Alerta de confirmación personalizada -->
      <div v-if="mostrarAlertaGrabar"  role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                <use xlink:href="#info-fill" />
            </svg>
            <div>
                <div class="row">
                    <div class="col  p-3 text-center ">    
                <v-btn @click="Agregar()" prepend-icon="mdi-cloud-upload" color="#FFFFFF"  >Confirma Grabar</v-btn>
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

</v-card>

<v-text-field v-show="mostrarCampo" v-model="Institucion" variant="underlined" block></v-text-field>
<v-layout style=" max-width: 100%;">
          <v-footer class="d-flex flex-column w-100" style=" bottom:0px;max-width: 100%;">
    <v-card  class="px-4 py-2 bg-light text-center w-100" elevation="16">
      <strong>© 2024 | Excelencia Digital Sotfware</strong>

      <v-spacer></v-spacer>

    
    </v-card>

 
  </v-footer>  
</v-layout> 
  </template>
  <script>
  
  //import combobox from '../components/combobox.vue';
  import ListarMed from '../components/ListarMed.vue';
  import BuscarMed from '../components/BuscarMed.vue';
  import BarraNavegacion from '@/components/BarraNavegacion.vue';
  import Spinner from '@/components/Spinner.vue';
  import AlertaSuceso from '@/components/AlertaSuceso.vue';
  import DataTable from 'datatables.net-vue3'
  import Select from 'datatables.net-select';
  import DataTablesCore from 'datatables.net-bs5';
  import Buttons from 'datatables.net-buttons-bs5';
  import 'datatables.net-responsive-bs5';
  import AlertaMensaje from '@/components/AlertaMensaje.vue';
  import Proveedores from '@/components/Proveedores.vue';
  import Asignarcorreo from '@/components/Asignarcorreo.vue';
  import AsociarMed from '@/components/AsociarMed.vue';
  import ListadoStock from '@/components/ListadoStock.vue';

 
  
  import { ref } from 'vue';

  
 
  const table = ref();
  export default {
    ListaFormulariosArticulos:'',
        rows: [],
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 3,
    arreglobuscador: [],
    name: 'TableCom',
    name: "Formularios",
    components: {
      'spinner': Spinner,
      'barra-navegacion': BarraNavegacion,
      ListarMed,
      BuscarMed,
      Proveedores,
      AlertaMensaje,
      Asignarcorreo,
      ListadoStock,
      AsociarMed,
      'alerta-suceso': AlertaSuceso,
       DataTable
    },
    name: 'Pokemones',
    props: {
      msg: String
    },
    
    data: function () {
      return {
        checkboxTraza: false,
        checkboxStock: false,
        snackbar: false,
        text: `El codigo proximo disponible es el siguiente`,
        mostrarCampo: false, // Cambia a 'false' para hacerlo invisible
        MensajeStock: false,
        Institucion: '',
        nroarticulo:'',
        Codigo: '',
        Nombre: '',
        NroRegistro: '',
        Precio: '',
        ValorCombo: '',
        ValorComboTipo: '',
        ListaCombos: null,
        ListaCombosTipo: null,
        ListaCombosDosis: null,
        ListaCombosForma: null,
        ListaCombosTamano: null,
        ListaCombosTera: null,
        nroRegistro: '',
        nroremitoPasado: '',
        codigoPasado:'',
        nombrePasado:'',
        buscar: '',
        filter: null,
        filterOn: [],
        selected: [],
        arreglobuscador: [],
        dialog: false,  
        MensajeProveedor: false,
        MensajeAsociar: false,
        MensajeCorreo : false,
        VentanaAlmacenamiento: false,
        VentanaSecundario : false,
        VentanaAlerta : false,
        VentanaPatologia : false,
        MensajeOk: false,
        selectedId: -1,
          selectedRow: '',
          //************ */
       //***Control de texto */
       //lengthRules: [
       // value => {
       //   if (  /[0-9-]+/.test(value) && value?.length < 10) return true
        //    return 'Acepta valores numericos y hasta 10 digitos.'
       // },
      //],
       //************ */ 
       TextMedicamento:'',
       TextPatologia:'',
       ListaFormulariosArticulos:'',
       ListaArticulosSec: '',
       TextAlerta: '',
        rows: [],
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 5,
        titulo_Modal:"",
        Id: null, 
        datos: null,
        ComboListaTipoMedicamento:'',
        ListaFormularios: null,
        MostrarSpinner: false,
        NoHayRegistros: false,
        mostrarAlertaEliminar: false,
        mostrarAlertaSuceso: false,
        VentanaGrabar: false,
        mensajeAlertaSuceso:"",
        idConfigFormToDelete: null,
        idArticulo:"",
        ListaFormulariosMed: null,
        nombre: "",
        codigo: "",
        tipo_Articulo: "",
        precio_Venta: "",
        precio_Costo: "",
        VerDatos: "",
        Entrega:0,
        troquel:"",
        barra: "",
        stockminimo: "",
        stockmedio: "",
        stockmaximo: "",
        
      }
    },
    created() {
      this.idUsuario = this.$store.state.id_usuario;
      this.TraeInstitucin();
      this.ValorCombo = "0";
      this.ValorComboTipo = "0";
      this.ValorComboDosis = "0";
      this.ValorComboForma = "0";
      this.ValorComboTamano = "0";
      this.ValorComboTera = "0";
      this.Identificador = "0";
      
     
      //this.MostrarComboTipo();
      
      this.fetchArticulosMed();
      this.ComboTipoMedicamento();
      this.MostrarComboDosis();
      this.MostrarComboForma();
      this.MostrarComboTamano();
      this.MostrarComboTera();
  
      this.MostrarCombo();
      
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
              //formTitle () {
            //     return this.Entrega  === 0 ? 'Gargar nuevos datos' : 'Modificar datos'
             // },
          
           //   ListaFormularios1() {
                
             //   return this.datos.filter(item => {
        //  return item.nombre.toLowerCase().includes(this.buscar.toLowerCase());
          
       // });
      //},
           
          },
    methods: {
      mostrarStock(){
        this.MensajeStock = true;
      },
      VerCorreo(){
        alert(this.checkboxTraza);
      },
  async   TraeInstitucin(){
   
        let IdTipo = "";
  const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
  }).then((respuesta) => {
    let data = []; //declarar la variable data
    this.datos = respuesta.data.lista
    data = respuesta.data.lista;
    data.forEach(item => { this.Institucion = item.codigo;  }); })
      .catch(err => { console.log(err); });
     
      },
      async MostrarCombo() {
        ////////
        let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////
      //alert("aca"+ IdInst);
      const respuesta = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=11&pId=${IdInst}`)
        .then((respuesta) => {
          this.ListaCombos = respuesta.data.lista;
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
      async VerificoCodigo(){
                
        const respuesta = await this.axios.get(`/api/ConfigForm/VerificoCodigoArticulo?pcodigo=${this.codigo}&pinstitucion=${this.Institucion}`, {
        }).then((respuesta) => {
          let data = []; //declarar la variable data
          this.datos = respuesta.data.lista
          data = respuesta.data.lista;
          data.forEach(item => { 
            if(this.codigo != item.newID){
              this.codigo = item.newID;
              alert("El codigo ingresado existe, el proximo disponible es el siguiente"); 
              //this.snackbar = true;
            } 
            //alert(item.newID); 
            
          }); })
          .catch(err => { console.log(err); });

      },
      async VerificoCodigo24(){
        
                const respuesta = await this.axios.get(`/api/ConfigForm/VerificoCodigoArticulo?pcodigo=300560&pinstitucion=${this.Institucion}`, {
                }).then((respuesta) => {
                  let data = []; //declarar la variable data
                  this.datos = respuesta.data.lista
                  data = respuesta.data.lista;
                  data.forEach(item => { 
                    if(this.codigo != item.newID){
                      this.codigo = item.newID;
                      //alert("El codigo proximo disponible es el siguiente"); 
                      this.snackbar = true;
                    } 
                    //alert(item.newID); 
                    
                  }); })
                  .catch(err => { console.log(err); });
        
              },
      VerProveedores(){
       
        this.MensajeProveedor = true;
        this.nroremitoPasado = this.codigo;
       
      },
      VerAsociar(){
        this.MensajeAsociar = true;
       this.nroremitoPasado = this.codigo;
      },
      VerCorreo(){
       
       this.MensajeCorreo = true;
       this.nroremitoPasado = this.codigo;
      
     },
      CerrarOk(){
        this.MensajeOk = false;
        this.VentanaPatologia = false;
        this.VentanaSecundario = false;
        this.VentanaAlmacenamiento = false;
        this.MensajeProveedor = false;
        this.VentanaGrabar = false;
        this.MensajeCorreo = false;
        this.MensajeAsociar = false;
        this.MensajeStock = false;
      },

  async GrabarA(){
    ///Control de ingreso de medicamento/////
    if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 3000);
        return;
   }
    //////////////////////////////////////////
        await this.axios.post(`/api/ConfigForm/AgregarAlertas?pTipo=1&pCodigo=${this.codigo}&pNombre=${this.TextMedicamento}&pInstitucion=${this.Institucion}`)
     
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
       this.mostrarAlertaSuceso = true;
        this.MensajeOk = true;
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });

      },
      async GrabarE(){
        ///Control de ingreso de medicamento/////
    if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 3000);
        return;
   }
    //////////////////////////////////////////
        await this.axios.post(`/api/ConfigForm/AgregarAlertas?pTipo=2&pCodigo=${this.codigo}&pNombre=${this.TextAlerta}&pInstitucion=${this.Institucion}`)
     
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
       this.mostrarAlertaSuceso = true;
       this.MensajeOk = true;
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });

      },
      async GrabarP(){
        ///Control de ingreso de medicamento/////
    if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 3000);
        return;
   }
    //////////////////////////////////////////
        await this.axios.post(`/api/ConfigForm/AgregarAlertas?pTipo=3&pCodigo=${this.codigo}&pNombre=${this.TextPatologia}&pInstitucion=${this.Institucion}`)
     
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
       this.mostrarAlertaSuceso = true;
       this.MensajeOk = true;
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });

      },
      VerPatologia(){
        ///Control de ingreso de medicamento/////
    if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 3000);
        return;
   }
    //////////////////////////////////////////
        this.VentanaPatologia = true;
        this.BuscarPatologiaAlerta();
      },
      async BuscarPatologiaAlerta(){
  this.TextPatologia = "";
  
  const respuesta = await this.axios.get(`/api/ConfigForm/AlertaMedicamentos?pTipo=3&pCodigo=${this.codigo}&pInstitucion=${this.Institucion}`)
          .then((respuesta) => {
            this.ListaArticulosPato = respuesta.data.lista
            this.ListaArticulosPato.forEach(ListaArticulosPato => {
              
            this.TextPatologia = ListaArticulosPato.nombre;
        
      }); 
          })
          .catch(err => {
            //console.log(err);
          });
},
      async BuscarSecundarioAlerta(){
  this.TextAlerta = "";
  
  const respuesta = await this.axios.get(`/api/ConfigForm/AlertaMedicamentos?pTipo=2&pCodigo=${this.codigo}&pInstitucion=${this.Institucion}`)
          .then((respuesta) => {
            this.ListaArticulosSec = respuesta.data.lista
            this.ListaArticulosSec.forEach(ListaArticulosSec => {
              
            this.TextAlerta = ListaArticulosSec.nombre;
        
      }); 
          })
          .catch(err => {
            //console.log(err);
          });
},
      VerSecundario(){
        ///Control de ingreso de medicamento/////
    if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 3000);
        return;
   }
    //////////////////////////////////////////
        this.VentanaSecundario = true;
        this.BuscarSecundarioAlerta();
      },
      CerrarSecundario(){
        this.VentanaSecundario = false;
      },
      CerrarPatologia(){
        this.VentanaPatologia = false;
      },
      async BuscarMEdicamentosAlerta(){
  this.TextMedicamento = "";
  
  const respuesta = await this.axios.get(`/api/ConfigForm/AlertaMedicamentos?pTipo=1&pCodigo=${this.codigo}&pInstitucion=${this.Institucion}`)
          .then((respuesta) => {
            this.ListaArticulosCodigo = respuesta.data.lista
            this.ListaArticulosCodigo.forEach(ListaArticulosCodigo => {
            this.TextMedicamento = ListaArticulosCodigo.nombre;
        //this.MediPrecio = ListaArticulosCodigo.precio;
      }); 
          })
          .catch(err => {
            //console.log(err);
          });
},
      VerAlmacenamiento(){
        ///Control de ingreso de medicamento/////
    if (!this.codigo || this.codigo.length == 0) {
        this.$refs.codigoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un codigo de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 3000);
        return;
   }
    //////////////////////////////////////////
        this.VentanaAlmacenamiento = true;
        this.BuscarMEdicamentosAlerta();
        
      },
      CerrarAlmacenamiento(){
        this.VentanaAlmacenamiento = false;
      },
      handleEnter() {
   // Este método se activará cuando se presione la tecla "Enter"
   if (this.buscar) {
    this.BuscarMedicamento();
 } else {
     alert('Por favor ingresa un nombre antes de presionar "Enter"');
   }
   // Aquí puedes agregar la lógica que deseas ejecutar cuando se presione "Enter"
 },
      async GrabarMedicamento() {
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
   if (!this.stockmaximo || this.stockmaximo.length == 0) {
        this.$refs.stockmaximoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un stock maximo";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.stockmedio || this.stockmedio.length == 0) {
        this.$refs.stockmedioField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un stock medio";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.stockminimo || this.stockminimo.length == 0) {
        this.$refs.stockminimoField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un stock minimo";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (!this.Nombre || this.Nombre.length == 0) {
        this.$refs.nombreField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe Ingresar un nombre de medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (this.ValorComboDosis == 0) {
        //this.$refs.nombreField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe la dosis del medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
 
   if (this.ValorComboTamano == 0) {
        //this.$refs.nombreField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe el tamaño del medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (this.ValorComboForma == 0) {
        //this.$refs.nombreField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe la forma del medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
   if (this.ValorComboTera == 0) {
        //this.$refs.nombreField.$el.querySelector('input').focus();
        this.VentanaGrabar = false;
        this.mostrarAlertaEliminar = false;
        this.mostrarAlertaSucesoMensaje = true;
        this.mensajeAlertaSuceso = "Debe la  Categoria Terapeutica del medicamento";
        setTimeout(() => {
        this.mostrarAlertaSucesoMensaje = false;
        }, 5000);
        return;
   }
 ///////-------------------------------
 /////------obtener valores--------------
 //////----------------------------------
var valor_codigo = this.codigo;
//alert(valor_codigo);
var valor_nombre = this.Nombre;
//alert(valor_nombre)
var valor_nroregistro = this.NroRegistro;
//alert(valor_nroregistro);
var valor_precio = this.Precio;
//alert(valor_precio);
var valor_minimo = this.stockminimo;
//alert(valor_minimo);
var valor_medio = this.stockmedio;
//alert(valor_medio);
var valor_maximo = this.stockmaximo;
//alert(valor_maximo);
var valor_tipo = this.ValorComboTipo;
//alert(valor_tipo);
var valor_sector = this.ValorCombo;
//alert(valor_sector);
let traza = "";
if(this.checkboxTraza)
  traza = 1;
else
  traza = 0;
  let cero = "";
if(this.checkboxTraza)
  cero = 1;
else
  cero = 0;
    

 
 


     await this.axios.post(`api/ConfigForm/AgregarArticulos?pcodigo=${valor_codigo}&pnombre=${valor_nombre}&pprecio=${this.Precio}&pnroregistro=${valor_nroregistro}&idtipo=${valor_tipo}&idsector=${valor_sector}&stockminimo=${valor_minimo}&stockmedio=${valor_medio}&stockmaximo=${valor_maximo}&pusuario=42&pinstitucionid=${this.Institucion}&pDosis=${this.ValorComboDosis}&pForma=${this.ValorComboForma}&pTamano=${this.ValorComboTamano}&pCategoria=${this.ValorComboTera}&pTraza=${traza}&pStockCero=${cero}`)
     //await this.axios.post(`/api/ConfigForm/AgregarArticulos/${valor_codigo}/${valor_nombre}/${this.Precio}/${valor_nroregistro}/${valor_tipo}/${valor_sector}/${valor_minimo}/${valor_medio}/${valor_maximo}/42/0?idtipo=${valor_tipo}&idsector=${valor_sector}&stockminimo=${valor_minimo}&sockmedio=${valor_medio}&stockmaximo=${valor_maximo}&pusuario=42&pinstitucionid=0&${this.ValorComboDosis}&${this.ValorComboTamano}&${this.ValorComboForma}&${this.ValorComboTera}`)
     
     .then(datos => {
       this.mostrarAlertaEliminar = false;
       this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
       this.mostrarAlertaSuceso = true;
       
       setTimeout(() => {
                this.mostrarAlertaSuceso = false;
             }, 5000);
     });
     this.MensajeOk = true;
     this.Limpiar();
     //window.location.reload();
     this.fetchArticulosMed();
 },


      ver2024(){
alert("grabar");

    },
      VerGrabar() {
       
            this.VentanaGrabar = true;
            this.mostrarAlertaGrabar = true;
        },
        cerrarGrabar() {
            this.VentanaGrabar = false;
        },
    async sendRowData(row) {
      const keys = Object.keys(row);
      const entries = Object.entries(row);
      const primerpar = entries[0];  // Valor de la columna
      this.Identificador = primerpar[1];
      const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulosTodos?pTipo=${this.Identificador}`)
          .then((respuesta) => {
            let data = []; //declarar la variable data
            this.ListaFormulariosArticulos = respuesta.data.lista;
            data = respuesta.data.lista;
            data.forEach(item => {
              this.Nombre = item.nombre;
              this.codigo = item.codigo;
              this.NroRegistro = item.nroregistro;
              this.NroRegistro = item.nroregistro;
              this.Precio = item.precio;
              this.ValorCombo = item.sector;
              this.ValorComboTipo = item.tipomedicamentos;
              this.stockminimo = item.stockminimo;
              this.stockmedio = item.stockmedio;
              this.stockmaximo = item.stockmaximo;
              this.troquel = item.troquel;
              this.barra = item.codbarra;
              this.ValorComboDosis = item.dosis;
              this.ValorComboTamano = item.tamano;
              this.ValorComboForma = item.forma;
              this.ValorComboTera = item.categoria;
              if(item.stockcero)
              this.checkboxStock = true;
            else
            this.checkboxStock = false;
          if(item.traza)
              this.checkboxTraza = true;
            else
            this.checkboxTraza = false;
              
            });    
          })
          .catch(err => {
            //console.log(err);
          });
     
      
    },
    async ComboTipoMedicamento() {
       const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=3&pId=0")
          .then((respuesta) => {
            this.ComboListaTipoMedicamento = respuesta.data.lista;
            console.log("aca muestra los tipos");
            console.log(this.ComboListaTipoMedicamento);
            //si no hay formularios en la respuesta de la api mostrar mensaje
            if (this.ListaFormularios.length == 0) {
              this.NoHayRegistros = true
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    async fetchArticulosMed() {
       ////////
  let IdInst = "";
    const respuesta1 = await this.axios.get(`/api/ConfigForm/ListaCombo?pTipo=14&pId=${this.idUsuario}`, {
    }).then((respuesta1) => {
    let data1 = []; //declarar la variable data
    this.datos1 = respuesta1.data.lista
    data1 = respuesta1.data.lista;
    data1.forEach(item => { IdInst = item.codigo;   }); })
      .catch(err => { console.log(err); });
        //////////
        
        //this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud 
        //const respuesta = await this.axios.get("/api/ConfigForm/ListaField?pTipo=2136")
        //const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${this.idConfig}`)
       const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulos?pTipo=${IdInst}`)
          .then((respuesta) => {
            this.rows = respuesta.data.lista;
            console.log("IMPORTANTE Muestro rows")
            console.table(this.rows);     
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
      },
      
      onSelect(e, dt, type, indexes ){
       
        this.string_id = indexes;
        this.dialog = true;
        console.log("aca estoy")
            console.log(dt);
          },
          
         Limpiar(){
        
          this.Identificador = "0";
        this.nroarticulo = "0";
        this.codigo = "";
        this.Nombre = "";
        this.codigo = "";
        this.NroRegistro = "";
        this.NroRegistro = "";
        this.Precio = "";
        this.ValorCombo = "0";
        this.ValorComboTipo = "0";
        this.stockminimo = "";
        this.stockmedio = "";
        this.stockmaximo = "";
        this.troquel = "";
        this.barra = "";
        this.ValorComboDosis = "0";
        this.ValorComboTamano = "0";
        this.ValorComboForma = "0";
        this.ValorComboTera = "0";
        this.checkboxStock = false;
        this.checkboxTraza = false;
      },
     
    async MostrarComboTipo() {
      const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2130")
        .then((respuesta) => {
          this.ListaCombosTipo = respuesta.data.lista;
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async MostrarComboForma() {
      const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=8&pId=8")
        .then((respuesta) => {
          this.ListaCombosForma = respuesta.data.lista;
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async MostrarComboTamano() {
      const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=9&pId=9")
        .then((respuesta) => {
          this.ListaCombosTamano = respuesta.data.lista;
          
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async MostrarComboTera() {
      const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=10&pId=10")
        .then((respuesta) => {
          this.ListaCombosTera = respuesta.data.lista;
          
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async MostrarComboDosis() {
      const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=7&pId=7")
        .then((respuesta) => {
          this.ListaCombosDosis = respuesta.data.lista;
          //si no hay formularios en la respuesta de la api mostrar mensaje
          if (this.ListaFormularios.length == 0) {
            this.NoHayRegistros = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
      nuevo(){
        this.Entrega = 0;
        this.dialog = true;
        this.string_id = "";
        this.default_value ="";
        this.value_list ="";
        this.mask_library = "";
        this.assumed_value = "";
        this.length = "";
      },
      cerrarventana(){
       
        this.dialog = false;
        this.fetch();
      },
      editar(Listaform){
        
        this.Entrega = 1;
        this.dialog = true;
        this.idArticulo = Listaform.idArticulo;
        this.nombre = Listaform.nombre;
        this.codigo = Listaform.codigo;
        this.tipo_Articulo = Listaform.tipo_Articulo;
        this.precio_Venta = Listaform.precio_Venta;
        this.precio_Costo = Listaform.precio_Costo;
        this.stock_Maximo = Listaform.stock_Maximo;
        this.stock_Medio = Listaform.stock_Medio;
        this.stock_Minimo = Listaform.stock_Minimo;
        this.ValorCombo = "San Martin";
        
        this.troquel = Listaform.troquel;
        this.barra = Listaform.barra;
      },
      async fetch() {
        
        this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
        const respuesta = await this.axios.get("/api/ConfigForm/ListarMedicamentosClinicas?pIdClinica=1")
          .then((respuesta) => {
            this.ListaFormularios = respuesta.data.lista
            this.datos = this.ListaFormularios;
            console.log("Importante");
            console.table(this.datos);
           
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
      mostrarConfirmacionEliminar(Entrega) {
      
        this.mostrarAlertaEliminar = true;
    this.idConfigFormToDelete = this.string_id; // Guarda el idConfigForm en data
    
      },
      cancelarEliminacion() {
        this.mostrarAlertaEliminar = false;
      },
     
      async Agregar() {
        
        if(this.Identificador == "0")//Modifica
          this.GrabarMedicamento();//alert("Agrega Campo");
          else
             this.Modificar();//alert("Modiifca Campo");
         
          
      },
      async Grabar() {
       
          await this.axios.post(`/api/ConfigForm/AgregarCampos/1/0/${this.default_value}/${this.value_list}/${this.mask_library}/${this.assumed_value}/${this.length}`)
          .then(datos => {
            this.mostrarAlertaEliminar = false;
            this.mensajeAlertaSuceso = "Grabaron Correctamente los datos";
            this.mostrarAlertaSuceso = true;
            //this.fetch();
  
            setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                  }, 5000);
          });
      },
      async Modificar() {
        if(this.codbarra == "")
        this.codbarra = "000000000";
        if(this.troquel == "")
        this.troquel = "000000";
      var stock = 0;
        if(this.checkboxStock){stock = 1;}
        var traza = 0;
        if(this.checkboxTraza){traza = 1;}
        
        await this.axios.put(`/api/ConfigForm/ModificaArticulos?pId=${this.Identificador}&pcodigo=${this.codigo}&pnombre=${this.Nombre}&pprecio=${this.Precio}&pnroregistro=${this.NroRegistro}&pTroquel=${this.troquel}&pCodbarra=${this.barra}&idtipo=${this.ValorComboTipo}&idsector=${this.ValorCombo}&stockminimo=${this.stockminimo}&stockmedio=${this.stockmedio}&stockmaximo=${this.stockmaximo}&pDosis=${this.ValorComboDosis}&pForma=${this.ValorComboForma}&pTamano=${this.ValorComboTamano}&pCategoria=${this.ValorComboTera}&pTraza=${traza}&pStockCero=${stock}`)
       //await this.axios.put(`api/ConfigForm/ModificaArticulos?pId=10100&pcodigo=992429&pnombre=KETOROLAC%2520LARJAN%2520-%2520%25&pprecio=1&pnroregistro=34162&pTroquel=323957&pCodbarra=7798072511&idtipo=3&idsector=1&stockminimo=10&stockmedio=0&stockmaximo=30&pDosis=2&pForma=3&pTamano=1&pCategoria=1&pTraza=0&pStockCero=1`)
         
          .then(datos => {
            this.mostrarAlertaEliminar = false;
            this.mensajeAlertaSuceso = "Los datos se modificaron correctamente";
            this.mostrarAlertaSuceso = true;
            //this.fetch();
  
            //setTimeout(() => {
              //       this.mostrarAlertaSuceso = false;
                //  }, 5000);
                  this.MensajeOk = true;
                  window.location.reload();      
          });
      },
       async BuscarMedicamento() {
        this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
    const respuesta = await this.axios.get(`/api/ConfigForm/BuscaAlfaBetaNombre?pNombre=${this.buscar}`, {
    
 })
        .then((respuesta) => {
        this.ListaFormulariosMed = respuesta.data.lista
        this.datosMed = this.ListaFormulariosMed;
        console.log("datos de busqueda de alfabeta");
        console.log(this.ListaFormulariosMed);
        console.log("FIN");
        if (this.ListaFormulariosMed.length == 0) {
            alert("No se encontraron datos para la busqueda")
          }
        })
        .catch(err => {
          console.log(err);
        });
        this.MostrarSpinner = false; 
    },
      Mostrar(V1, V2, V3, V4, V_barra, V_troquel) {
     this.Nombre = V1 +" -  "+ V4;
     this.NroRegistro = V3;
     this.Precio = V2;
     this.barra = V_barra;
     if(V_troquel == "")
      this.troquel = "000000";
    else
    this.troquel = V_troquel;

     
        const pNombre = document.getElementsByName("Nombre")[0];
        pNombre.value = V1 +" -  "+ V4;
        
        this.ListaFormulariosMed = null;
      
    },
    
      async eliminarform(idConfigFormToDelete) {
        await this.axios.put(`/api/ConfigForm/EliminaCampos/14/${this.Identificador}`)
       
          .then(datos => {
            this.mostrarAlertaEliminar = false;
            this.mensajeAlertaSuceso = "Eliminado exitosamente";
            this.mostrarAlertaSuceso = true;
            //this.fetch();
            this.fetchArticulosMed();
            this.MensajeOk = true;
     this.Limpiar();
     
     
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
  .custom-size {
  font-size: 50px; /* Ajusta el tamaño según tus necesidades */
}
  </style>