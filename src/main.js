import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue3Toastify from 'vue3-toastify';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const app = createApp(App)
app.use(router)
app.use(axios)
app.config.globalProperties.$axios = axios
app.use(VueAxios, axios)
app.use(Vue3Toastify, {
    "autoClose": 3000,
    "position": "bottom-right",
    "transition": "bounce",
    "dangerouslyHTMLString": true
});
app.mount('#app');
