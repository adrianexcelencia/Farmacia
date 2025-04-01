import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapIconsPlugin from 'bootstrap-icons-vue';
import storage from './storage';
import { refreshAccessToken } from './storage/auth';
//Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { computed , onMounted, ref } from "vue";
//import { computed } from "@vue/reactivity";

const vuetify = createVuetify({
	components,
	directives,
})

//axios.defaults.baseURL = 'http://168.226.219.57:3004/ApiCreador';
axios.defaults.baseURL = 'https://excelencia.myiphost.com:86/ApiCreador';

//axios.defaults.baseURL = 'http://localhost:5045';

var token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
import BootstrapVue from 'bootstrap-vue'

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(BootstrapIconsPlugin);
app.use(storage);

app.mount('#app');
app.use(vuetify)
