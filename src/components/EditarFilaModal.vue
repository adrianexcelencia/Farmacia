<template>
 
       
  <div class="modal-header">
    <h5 class="modal-title">Editar Datos </h5>
    
  </div>
  <!--<div class="modal-body">
    <div v-for="campo of dafield" :key="campo.id_Field">
      <label :for="campo.nombre">{{ campo.etiqueta }}</label>
      <input :type="campo.tipo" :placeholder="campo.marcador" :class="campo.clase" :name="campo.nombre"
        :required="campo.requerido" v-model="filaEditadaPorNombre[campo.nombre]">
    </div>
  </div>-->
  <div class="modal-body">
    <!-- Spinner: lo mostramos si loading es true -->
    <div class=" justify-content-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-if="!loading">
      <div class="row">
      <div v-for="campo of dafield" :key="campo.id_Field" :class="campo.posi" >
        <label :for="campo.nombre"><b>{{ campo.etiqueta }}</b></label>
       
       
        <select v-model="filaEditadaPorNombre[campo.nombre]" v-if="campo.tipo === 'select'"   :class="campo.clase"
        :required="campo.requerido" :identificador="campo.id_Field">
        <option value="">Seleccione {{campo.nombre}} </option>
        <option v-for="opcion in this[campo.opciones.trim()]" :value="opcion.codigo">{{opcion.nombre}}</option>
        </select>
       <!--
        <select v-if="campo.tipo === 'select'" :name="campo.nombre" :class="campo.clase" :required="campo.requerido"
          v-model="filaEditadaPorNombre[campo.nombre]">
          <option v-for="opcion in campo.opciones ? campo.opciones.split(',') : []" :value="opcion.trim()">{{
            opcion.trim() }}</option>
        </select>
        -->
        <!--
        <v-text-field 
        v-else :type="campo.tipo"
         :placeholder="campo.marcador"
          
           :name="campo.nombre"
           @keydown.enter="this[campo.opciones] && this[campo.opciones]($event)" 
          :required="campo.requerido"
          v-model="filaEditadaPorNombre[campo.nombre]"
          variant="underlined" block
          >
        </v-text-field>
         -->
         <v-text-field 
        v-else :type="campo.tipo"
         :placeholder="campo.marcador"
          
           :name="campo.nombre"
           @keydown.enter="this[campo.opciones] && this[campo.opciones]($event)" 
          :required="campo.requerido"
         v-model="filaEditadaPorNombre[campo.nombre]"
          variant="underlined" block
          >
        </v-text-field>
      </div>
      </div>
      <div class="modalFooter text-center">
        <br>
        <div class="row">
          
<div class="col  p-6 text-center ">
  <!-- Alerta de confirmacion -->
<alerta-suceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
<!-- Alerta de confirmacino de eliminacion  -->
 <!-- Alerta de confirmación personalizada -->
 <div v-if="mostrarAlertaEliminar" class="alert  d-flex align-items-center" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
              <use xlink:href="#info-fill" />
          </svg>
          <div>
              ¿Estás seguro de que deseas eliminar este registro?
              <button class="btn btn-danger btn-sm ms-3" @click="eliminar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        Confirmar</button>
              <button class="btn btn-secondary btn-sm ms-2" @click="cancelarEliminacion">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
          viewBox="0 0 16 16">
          <path
            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
        </svg>
        Cancelar</button>
          </div>
      </div><!--fin alerta confirmacion-->
</div>
<div class="col  p-3 text-center ">
<v-btn type="button"  class="btn  btn-sm " color="primary" block @click="guardarEdicion"  prepend-icon="mdi-cloud-upload" v-if="$store.state.permisos.includes(9)">Guardar</v-btn>
</div>
<div class="col  p-3 text-center ">
<v-btn type="button"  class="btn  btn-sm " color="#FF0000" block @click="mostrarEliminacion"  prepend-icon="mdi-cloud-upload" v-if="$store.state.permisos.includes(9)" >Eliminar</v-btn>
</div>

</div>


</div> 
      </div>
  </div>
 

</template>

<script>
import AlertaSuceso from "../components/AlertaSuceso.vue";
export default {
name: 'EditarFilaModal',
components: {
AlertaSuceso,
},
props: {
fila: Object,
campoTexto: String,
},
data() {
return {
  idconfigform:'',
  valornuevo:'',
  primero:'',
ListaCombos: [],
ListaCombosI:'',
ListaCombosII:'',
ComboListaTipoMedicamento:'',
mostrarAlertaEliminar: false, // Controla la visibilidad de la alerta
filaEditadaPorNombre: {}, // Objeto para mostrar en el formulario HTML
filaEditadaPorIdAnswer: {}, // Objeto para enviar a la API
dafield: [],
id_DelFormulario: null,
id_DeFila: null,
loading: false, // Agregamos la variable de loading para controlar el spinner
datosDeLaFila: null, // Agregar esta línea
mostrarAlertaSuceso: false, // visibilidad alerta de suceso

mensajeAlertaSuceso: ""  //mensaje de alerta de suceso vacio
};
},
created() {
this.fetch();
this.MostrarCombo();
this.MostrarComboI();
this.MostrarComboII();
this.MostrarComboIII();
this.ComboTipoMedicamento();
},

methods: {
async ComboTipoMedicamento() {
const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=3&pId=0")
  .then((respuesta) => {
    this.ComboListaTipoMedicamento = respuesta.data.lista;
    //si no hay formularios en la respuesta de la api mostrar mensaje
    if (this.ListaFormularios.length == 0) {
      this.NoHayRegistros = true
    }
  })
  .catch(err => {
    console.log(err);
  });
},
async MostrarCombo() {

//this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2129")
  .then((respuesta) => {
    this.ListaCombos = respuesta.data.lista;
    
    //console.log("Lista Combos ListaCombos");
    //console.log(this.ListaCombos);
   
    //si no hay formularios en la respuesta de la api mostrar mensaje
    if (this.ListaFormularios.length == 0) {
      this.NoHayRegistros = true
    }
  })
  .catch(err => {
    console.log(err);
  });
  
      
//this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
},   
cancelarEliminacion() {
          this.mostrarAlertaEliminar = false;
      },
      mostrarEliminacion() {
         this.mostrarAlertaEliminar = true;
      },
async MostrarComboI() {

//this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=4&pId=0")
  .then((respuesta) => {
    this.ListaCombosI = respuesta.data.lista;
    
    //console.log("Lista Combos ListaCombosI");
    //console.log(this.ListaCombosI);
   
    //si no hay formularios en la respuesta de la api mostrar mensaje
    if (this.ListaFormularios.length == 0) {
      this.NoHayRegistros = true
    }
  })
  .catch(err => {
    console.log(err);
  });
  
      
//this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
}, 
async MostrarComboII() {

//this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2130")
  .then((respuesta) => {
    this.ListaCombosII = respuesta.data.lista;
    
    //console.log("Lista Combos ListaCombosI");
    //console.log(this.ListaCombosII);
   
    //si no hay formularios en la respuesta de la api mostrar mensaje
    if (this.ListaFormularios.length == 0) {
      this.NoHayRegistros = true
    }
  })
  .catch(err => {
    console.log(err);
  });
  
      
//this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
}, 
async ComboTipoMedicamento() {
       const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=3&pId=0")
          .then((respuesta) => {
            this.ComboListaTipoMedicamento = respuesta.data.lista;
            //si no hay formularios en la respuesta de la api mostrar mensaje
            if (this.ListaFormularios.length == 0) {
              this.NoHayRegistros = true
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
async MostrarComboIII() {

//this.MostrarSpinner = true; //abrir spinner mientras realiza la solicitud
const respuesta = await this.axios.get("/api/ConfigForm/ListaCombo?pTipo=1&pId=2135")
  .then((respuesta) => {
    this.ListaCombosIII = respuesta.data.lista;
    
    //console.log("Lista Combos ListaCombosI");
    //console.log(this.ListaCombosII);
   
    //si no hay formularios en la respuesta de la api mostrar mensaje
    if (this.ListaFormularios.length == 0) {
      this.NoHayRegistros = true
    }
  })
  .catch(err => {
    console.log(err);
  });
  
      
//this.MostrarSpinner = false;//cerrar spinner cuando termine de realizar la solicitud
}, 
async fetch() {
const entries = Object.entries(this.fila);
const primerpar = entries[0];  // Valor de la columna
this.loading = true;
this.id_DelFormulario = this.$route.params.idConfigForm;
this.id_DeFila = this.fila[0];

// Solicitud que trae los datos para construir el formulario
await this.axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${this.id_DelFormulario}`)
  .then((estructuraDelFormulario) => {
    //console.log("Muestra los datos EDITAR");
    this.dafield = estructuraDelFormulario.data.datosField;
    //console.log(this.dafield);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // Finaliza el spinner
    this.loading = false;
  });
  ///////////////////////////////////////////////
  //////////Recupero los datos de la Api mostrar un registro en particular////
  ////////////////////////////////////////////
  var url = "";
  const idConfigForm = this.$route.params.idConfigForm;
    await this.axios.get(`/api/ConfigForm/ListaGrillas?pTipo=${idConfigForm}`)
      .then((respuesta) => {
        this.dagrilla = respuesta.data.lista;
        let data = [];
        
        data = respuesta.data.lista;
        data.forEach(item => {
          url = item.urlmodi;
        });
       
        })
      .catch(err => {
        console.log(err);
      }).finally(() => {
       });
       ///////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////
// Solicitud que trae los datos de la fila seleccionada
//lista sectores

const respuesta = await this.axios.get(`${url}${primerpar[1]}`)
//lista articulos
//const respuesta = await this.axios.get(`/api/ConfigForm/ListarArticulosTodos?pTipo=${primerpar[1]}`)
.then((DatosFila) => {
    this.datosDeLaFila = DatosFila.data.lista; // Asignar a datosDeLaFila
    this.filaEditadaPorNombre = {};
    this.filaEditadaPorIdAnswer = {};
    this.datosDeLaFila.forEach(fila => {
      for (let clave in fila) {
          console.log(`Clave: ${clave}, Valor: ${fila[clave]}`);
          //this.filaEditadaPorNombre[clave] = fila[clave].trim();
          let valor = fila[clave];
        if (typeof valor === 'string') {
            this.filaEditadaPorNombre[clave] = valor.trim();
        } else {
            this.filaEditadaPorNombre[clave] = valor;
        }
          
          
      }
  });
    

  })
  .catch(err => {
    console.log(err);
  });
},
BuscadorEnter(event) {
// Acceder al contenido del input "NInternado"
//alert("metodo enter");
const contenidoNInternado = event.target.value;
//alert(contenidoNInternado);
// Asignar el contenido del input "NInternado" al input "DetalleInternado"
const inputDetalleInternado = document.getElementsByName("detalleInternado")[0];
if (contenidoNInternado) {
inputDetalleInternado.value = "Riveros Hugo Adrian - Obra Social: Medife - Plan: Bronce";
}
else {
  alert('Por favor ingresa un número antes de presionar "Enter"');
}
},
BuscadorEnter24(event) {
// Acceder al contenido del input "NInternado"
//alert("metodo enter");
const contenidoNInternado = event.target.value;
//alert(contenidoNInternado);
// Asignar el contenido del input "NInternado" al input "DetalleInternado"
const inputDetalleInternado = document.getElementsByName("detalleInternado")[0];
if (contenidoNInternado) {
inputDetalleInternado.value = "Hola Programador";
}
else {
  alert('Por favor ingresa un número antes de presionar "Enter"');
}
},
cerrarModal() {
this.$emit('cerrar-modal');
},


async eliminar() {
 
  var primero ="";
for (let clave in this.filaEditadaPorNombre) {
    if (this.filaEditadaPorNombre.hasOwnProperty(clave)) {
        
       primero = primero +  `${clave} = ${this.filaEditadaPorNombre[clave]}`;
       break;
    }

    
}
console.log("where para eliminar");
console.log(primero);
this.valornuevo=primero;
await this.axios.put(`/api/ConfigForm/EliminarTabla/${this.$route.params.idConfigForm}/${this.valornuevo}/${this.valornuevo}`)
    //await this.axios.put(`/api/ConfigForm/ModificarTabla/2136/${this.valornuevo}/${this.primero}`)
          .then(datos => {
           this.mostrarAlertaEliminar = false;
           this.mensajeAlertaSuceso = "El artivulo se elimino correctamente";
          this.mostrarAlertaSuceso = true;
           
  
            setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                 }, 5000);
          });
          window.location.reload();
    /////////FIN/////////////////////////
    this.loading = false;

},
async guardarEdicion() {
  this.loading = true;
  var contenedor = document.getElementById("ContenedorDeCampos");
        // Encuentra todos los elementos de formulario dentro del contenedor
        var campos = contenedor.querySelectorAll("input[type='text'], textarea, input[type='number'], select, input[type='password'], input[type='date'], input[type='time'], input[type='email'], input[type='checkbox']");
        // Crea un objeto para almacenar los valores
        var valores = [];
        //recuperar valor del idConfigForm
        var idConfigForm = this.$route.params.idConfigForm;
        // Recorre los campos y obtén sus valores
        //campos.forEach(function (campo) {
        //valores.push({
        //id_ConfigForm: idConfigForm,  // Puedes ajustar este valor según tus necesidades
       // Campo: campo.getAttribute("v-model"),  // Utiliza getAttribute para obtener el valor de key
       // valor: campo.value,
        //tipo: campo.getAttribute("type"),
        //});    
        
       // });
        //valores[0] = this.filaEditadaPorNombre;
        valores.push(this.filaEditadaPorNombre);
        console.log("ACA los valores valores 123");
       //console.log(valores.length);
        var variable = "";
        var variable_valor = "";
        var valor_sql = "";
        var v = "";
       
        //Object.entries(this.filaEditadaPorNombre).forEach(([clave, valor]) => {
    ///console.log(`Clave: ${clave}, Valor: ${valor}`);
    //variable = variable + {clave};

//});
var primero ="";
for (let clave in this.filaEditadaPorNombre) {
    if (this.filaEditadaPorNombre.hasOwnProperty(clave)) {
        
       primero = primero +  `${clave} = ${this.filaEditadaPorNombre[clave]}`;
       break;
    }

    
}
//console.log(variable);
//console.log(variable_valor);
////////////////////////////
//console.log("aca campos");
//console.log(campos);
const BuscaValor = (abuscar) => {
  let variable = '';
  Object.entries(this.filaEditadaPorNombre).forEach(([clave, valor]) => {
    if(abuscar == `${clave}`){
      variable = `${valor}`
    }
    //variable += `${clave} = ${valor} ,`;
  });
  return variable;
};
campos.forEach((campo) => {
  const variable = BuscaValor(campo.getAttribute("v-model"));

  valores.push({
    id_ConfigForm: idConfigForm,
    Campo: campo.getAttribute("v-model"),
    valor: variable,
    cadenaFormateada: variable.trim(),
    tipo: campo.getAttribute("type")
  });
});
        ////////////////////////////
        ////////////////////////////
        ////////////////////////////
        //////

        ///////
        var datos_enviar = [];
        console.log("aca valores");
        console.log(valores);
        var variable = "";
        var variable_valor = "";
        var valor_sql = "";
        var v = "";
        var campo_nuevo = "";
        for (var i = 0; i < valores.length; i++) {
          if( i > 0){
          variable = valores[i].Campo;
          if((valores[i].tipo == "text")|| (valores[i].tipo == "date")|| (valores[i].tipo == ""))
           v = "'"+ valores[i].valor.replace(",", ".").trim() +"'";
          
           else
           {
           v = valores[i].valor;//v= v.replace(",", ".");
          }
          valor_sql = valor_sql + variable +" = "+ v +" , ";  
          //alert(variable+" = "+ v );
          campo_nuevo =  variable +" = "+ v;      
          datos_enviar.push({
            Campo: campo_nuevo,
          });
        }
      }
      console.log("aca arreglo a enviar");
      console.log(datos_enviar);
        //var pvariable = variable + ", usuario";
        //var pvariable_valor = variable_valor + ","+this.idUsuario;
        const nuevoValor = valor_sql.trim().substring(0, valor_sql.trim().length - 1);
        //console.log(nuevoValor);
        //console.log(primero);
        //console.log(pvariable.slice(1));
        //console.log(pvariable_valor );  
    ///////////////////////////////////////////////
    //alert(this.$route.params.idConfigForm);
    //alert(primero);
    //alert(nuevoValor);
    //alert(this.valornuevo);
    this.idconfigform = "1";
    //this.valornuevo="codigo = %27300607' , nombre = 'ASPIRINETAS -  comp.x 98' , nroregistro = '43571' , precio = '5058' , troquel = '' , codbarra = '' , tipomedicamentos = 1 , sector = 2 , stockminimo = 200 , stockmedio = 250 , stockmaximo = 300";
    //this.valornuevo="nombre = %27Campo MOD'";
    this.valornuevo=nuevoValor.replace("'", "%27");
    //this.valornuevo=nuevoValor.replace(/'/g, '%27');
    //this.valornuevo=nuevoValor.replace(/\s+/g, '');
    //alert(this.valornuevo);
    let primeraParte = "";
    let segundaParte = "";
    let segunda = "";
    let final = "";
   //alert(this.valornuevo.length);
    if(this.valornuevo.length > 180){
      // Obtener los primeros 196 caracteres
      primeraParte = this.valornuevo.slice(0, 180);

      // Obtener el resto de la cadena
      segundaParte = this.valornuevo.slice(180);
    }
    else
    {
      // Obtener los primeros 196 caracteres
      primeraParte = this.valornuevo;

      // Obtener el resto de la cadena
      segundaParte = "";
    }
    // alert("primero SI: "+ primeraParte);
    // alert("segundo SI: "+segundaParte);
     segunda = segundaParte +" where "+ primero
     this.primero=segundaParte +" where "+ primero;
    final = primeraParte + segunda;
    //alert(final);
    //alert("FINAL "+this.primero);
     //alert(segunda);
    this.primero=primero.replace(/\s+/g, ''); //ORIGINAL
    ///////////////
    //Modificacion
    ///////////////
    this.valornuevo = primeraParte.replace(/\s+/g, '');
    //alert(this.valornuevo);
    this.primero = segunda;
    //alert(this.primero);
    final = this.valornuevo + this.primero;
    //alert(final);
    let datosReemplazados = final.replace(/'/g, '%27');
    

   // alert(this.$route.params.idConfigForm);
    await this.axios.put(`/api/ConfigForm/ModificarTabla/${this.$route.params.idConfigForm}/${this.valornuevo}/${this.primero}`)
    //await this.axios.put(`/api/ConfigForm/ModificarTabla/2136/${this.valornuevo}/${this.primero}`)
          .then(datos => {
           this.mostrarAlertaEliminar = false;
           this.mensajeAlertaSuceso = "Los datos se modificaron correctamente";
          this.mostrarAlertaSuceso = true;
           
  
            setTimeout(() => {
                   this.mostrarAlertaSuceso = false;
                }, 5000);
          });
          //window.location.reload();
    /////////FIN/////////////////////////
    this.loading = false;
    },
async guardarEdicionOriginal() {



if (this.datosDeLaFila) {
  const ediciones = [];
  for (const campoNombre in this.filaEditadaPorNombre) {
    const campo = this.datosDeLaFila.find(item => item.nombre === campoNombre);
    
    if (campo) {
      const id_Answer = campo.id_Answer;
      ediciones.push({
      id_Answer: id_Answer,
      valor: this.filaEditadaPorNombre[campo.nombre].toString()
      }
    );
    }
  }
  //console.log("Muestra los datos a modificar");
  //console.log(ediciones);
  await this.axios
    .post("/api/ConfigForm/Respuestas/Editar", ediciones)
    .then((response) => {
      // Procesar la respuesta del servidor si es necesario
      //this.$emit('edicion-guardada');
      this.mostrarAlertaEliminar = false;
      this.mensajeAlertaSuceso = "Se Grabaron Correctamente los datos";
      this.mostrarAlertaSuceso = true;
      //this.fetch();

      setTimeout(() => {
               this.mostrarAlertaSuceso = false;
            }, 5000);
    })
    .catch((err) => {
      console.error("Error al guardar las ediciones:", err);
      // Manejar el error apropiadamente
    });
}


}

}
}
</script>

<style scoped>
/* Estilos específicos para el componente EditarFilaModal */
.modal {



display: flex;


}
.modal-body
{

width: 100%;
}
.modal-dialog {


width: 100%;
}
.modal-content{

background: hsl(180, 20%, 99%);
width: 100%;
}
/* Estilos para el formulario y botones dentro del modal */
.form-group {
margin-bottom: 1px;
}

/* Estilos para el pie del formulario (botones) */
.modalFooter{
margin-top: 1px;
}

/* ...otros estilos... */</style>