import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/style/tailwind.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})
import '@mdi/font/css/materialdesignicons.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)

app.use(mavonEditor)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
