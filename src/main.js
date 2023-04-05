import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import axios from 'axios';
axios.defaults.baseURL = 'https://data.jsdelivr.com/v1/';

createApp(App).mount('#app')
