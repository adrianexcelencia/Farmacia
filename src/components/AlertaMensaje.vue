<template>
 <v-alert v-if="visible"
      text
      prominent
      type="error"
     
    >
    {{ mensaje }}
    </v-alert>

    
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      mensaje: String,
    },
  };
  </script>
  