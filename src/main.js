import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import Vue3SocialSharingPlugin from "vue3-social-sharing";
import '@fortawesome/fontawesome-free/css/all.min.css';

// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.use(Vue3SocialSharingPlugin);
app.mount('#app');