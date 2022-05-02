import { createApp } from 'vue'
// controllers
// models
import { createPinia } from 'pinia'
// routes
import router from './Routes'
// views
import App from './Views/App.vue'
import './Views/style/tailwind.css'

createApp(App).use(createPinia()).use( router ).mount('#app')
